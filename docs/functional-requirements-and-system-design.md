# Runway27 — Functional Requirements & System Design

Status: initial implementation plan for the prototype. Items marked Phase 2 are not implemented by the current frontend.

## Product areas
1. Public website: cinematic home, dining/menu, lounge, events, contact and venue details.
2. Reservations: shared seating, free booking, guest count, date/time, contact details, special requests and status updates.
3. Events: published event listings and detail pages; optional paid ticketing can be enabled per event.
4. Staff operations: reservation search, status changes, seating/capacity management and guest notes.
5. Admin: manage menu, event listings, ticket inventory, venue settings, staff roles and audit history.

## Roles & permission matrix

| Capability | Guest | Host / Staff | Event Manager | Admin |
|---|---:|---:|---:|---:|
| Browse public menu/events | Yes | Yes | Yes | Yes |
| Submit a reservation request | Yes | Yes | Yes | Yes |
| View all reservations / guest contact data | No | Yes | Limited | Yes |
| Confirm, seat, cancel a reservation | No | Yes | No | Yes |
| Manage event details and ticket inventory | No | No | Yes | Yes |
| Manage menu and opening hours | No | No | No | Yes |
| Manage users and roles | No | No | No | Yes |
| View audit log / system settings | No | No | No | Yes |

All staff access must be enforced server-side. Hiding a button in the browser is not authorization.

## Reservation lifecycle
Requested → Confirmed → Seated → Completed
Alternative terminal states: Cancelled, Declined, NoShow.

- Check date/time validity, party-size limits and operating hours on the server.
- Prevent overbooking with a transaction/locking strategy and configurable capacity per time slot.
- Save status transitions with actor and timestamp in an audit record.
- Send confirmation/cancellation emails only after the database transaction commits.
- The public form must not imply confirmation until the API confirms it.

## Suggested SQL Server data model

### Users
Id (uniqueidentifier PK), Email (unique, normalized), DisplayName, PasswordHash / external identity, Role, IsActive, CreatedAtUtc, LastLoginAtUtc.

### Reservations
Id (uniqueidentifier PK), Reference (unique), GuestName, GuestEmail, GuestPhone, PartySize, StartsAtUtc, EndsAtUtc, Status, SpecialRequests, InternalNotes, CreatedAtUtc, UpdatedAtUtc, CreatedByUserId (nullable FK), RowVersion.

### Events
Id (uniqueidentifier PK), Slug (unique), Title, Summary, Description, StartsAtUtc, EndsAtUtc, VenueLabel, ImageUrl, Status, TicketingEnabled, CreatedAtUtc, UpdatedAtUtc.

### TicketTypes
Id (uniqueidentifier PK), EventId (FK), Name, PriceMinorUnits, Currency, QuantityTotal, QuantitySold, SalesStartUtc, SalesEndUtc, IsActive. Never store card details.

### Orders / Tickets
Orders: Id, Reference, BuyerEmail, BuyerName, Status, TotalMinorUnits, Currency, PaymentProvider, ProviderCheckoutId, CreatedAtUtc.
Tickets: Id, OrderId (FK), EventId (FK), TicketTypeId (FK), CodeHash (unique), Status, IssuedAtUtc, CheckedInAtUtc.
Ticket/order writes must be idempotent around payment-provider webhooks.

### MenuCategories / MenuItems
MenuCategories: Id, Name, SortOrder, IsActive.
MenuItems: Id, CategoryId (FK), Name, Description, PriceMinorUnits, Currency, ImageUrl, DietaryLabels, IsAvailable, SortOrder.

### AuditLog
Id, ActorUserId (nullable FK), Action, EntityType, EntityId, MetadataJson, OccurredAtUtc, CorrelationId. Avoid storing secrets or unnecessary sensitive guest data in metadata.

## API outline (Phase 2)
- GET /api/menu — published menu only
- GET /api/events and GET /api/events/{slug} — published events
- POST /api/reservations — validate and create a requested reservation; rate-limited
- GET /api/admin/reservations?from=&to=&status= — staff/admin only
- PATCH /api/admin/reservations/{id}/status — staff/admin only; audited
- POST/PATCH/DELETE /api/admin/events and /api/admin/menu-items — appropriate staff role only
- POST /api/ticket-checkout — create provider checkout session; only for ticket-enabled events
- POST /api/webhooks/{provider} — signature-verified, idempotent provider callbacks

## Security and operations
- Use a managed identity provider or ASP.NET Core Identity with MFA for admin accounts.
- Enforce role-based authorization, CSRF protection where cookie auth is used, strict input validation, rate limits, secure headers and request-size limits.
- Store secrets in the deployment platform, never in Git.
- Use UTC timestamps in storage and convert to venue-local time for display.
- Define retention/deletion rules for guest data and publish a privacy notice before collecting real bookings.
- Add structured logs, health checks, backups, restore tests, error monitoring and automated dependency updates.
- Keep payment data with the PCI-compliant payment provider; verify webhook signatures and idempotency keys.
- Configure consent-aware analytics and accessible keyboard/focus states. Respect reduced-motion preferences.

## Delivery priorities
- P0 — prototype: responsive brand experience, menu/event presentation, navigation, demo reservation validation.
- P1 — launch essentials: approved business content, real API + database, capacity rules, staff authentication, reservation notifications, privacy/terms, accessibility and automated tests.
- P2 — operations: admin dashboard, menu/event management, reporting, audit log, backups and monitoring.
- P3 — commerce: ticket inventory, provider checkout/webhooks, QR tickets and check-in tooling.

## Known prototype limitations
The current frontend uses illustrative event/menu content and stock imagery. Reservation submission only displays a local demo acknowledgement; it does not persist or transmit data. Ticket actions are enquiries/placeholders, not checkout. There is no backend, database, authentication or admin dashboard in this first commit series.
