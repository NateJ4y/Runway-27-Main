type MenuFeature = { title: string; detail: string; note: string };
const menuFeatures: MenuFeature[] = [
  { title: 'Grill & steaks', detail: 'From classic steaks to hearty grill favourites.', note: 'STEAKHOUSE' },
  { title: 'Pizza & pasta', detail: 'Comfort-food favourites for a relaxed lunch or dinner.', note: 'ITALIAN FAVOURITES' },
  { title: 'Sushi & burgers', detail: 'A mix of casual favourites for every kind of craving.', note: 'CROWD PLEASERS' },
  { title: 'Drinks & cocktails', detail: 'Draught beer, signature cocktails, spirits and more.', note: 'FROM THE BAR' },
];

export default function MenuBlock() {
  return (
    <section id="menu" className="menu-block">
      <div className="menu-block-inner">
        <div className="menu-block-heading">
          <p className="menu-block-kicker">03 / FOOD & DRINK</p>
          <h2>Good food.<br /><em>Good pours.</em></h2>
          <p className="menu-block-intro">From the grill to pizza, pasta, sushi and burgers, there is something for the table. Stay for draughts, cocktails and a full range of bar favourites.</p>
        </div>
        <div className="menu-block-grid">
          {menuFeatures.map((feature) => (
            <article key={feature.title} className="menu-block-course">
              <p className="menu-block-kicker">{feature.note}</p>
              <h3>{feature.title}</h3>
              <p>{feature.detail}</p>
            </article>
          ))}
        </div>
        <div className="menu-block-actions">
          <a className="button button-gold" href="https://wa.me/27665760223?text=Hi%20Runway%2027%2C%20please%20send%20me%20your%20current%20food%20and%20drinks%20menu." target="_blank" rel="noreferrer">Ask for the current menu <span aria-hidden="true">↗</span></a>
          <a className="menu-block-email" href="mailto:bookings@runway27.co.za">Or email bookings@runway27.co.za</a>
        </div>
        <p className="menu-block-footnote">Menu items, prices and availability can change. Contact the team for the latest menu and allergy information.</p>
      </div>
    </section>
  );
}
