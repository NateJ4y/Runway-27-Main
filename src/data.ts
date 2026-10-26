export type MenuItem = { name: string; description: string; price: string; category: 'Plates' | 'Small bites' | 'Drinks' };
export const menuItems: MenuItem[] = [
  { name: 'Charred lemon chicken', description: 'Herb jus, crispy potatoes, garden greens', price: 'R185', category: 'Plates' },
  { name: 'Slow-braised short rib', description: 'Silky mash, red wine glaze, seasonal veg', price: 'R245', category: 'Plates' },
  { name: 'Wild mushroom risotto', description: 'Porcini, parmesan, fresh thyme', price: 'R165', category: 'Plates' },
  { name: 'Crispy calamari', description: 'Smoked paprika, lemon aioli', price: 'R110', category: 'Small bites' },
  { name: 'Runway sliders', description: 'Beef, aged cheddar, caramelised onion', price: 'R125', category: 'Small bites' },
  { name: 'Burrata & heirloom tomato', description: 'Basil oil, toasted sourdough', price: 'R135', category: 'Small bites' },
  { name: 'Violet hour', description: 'Gin, blackberry, citrus, sparkling finish', price: 'R115', category: 'Drinks' },
  { name: 'Golden hour spritz', description: 'Aperitif, bubbles, orange', price: 'R105', category: 'Drinks' },
  { name: 'Zero-proof sunset', description: 'Blood orange, rosemary, tonic', price: 'R75', category: 'Drinks' },
];
export const events = [
  { date: 'FRI · 31 OCT', title: 'Afterglow Sessions', type: 'LIVE MUSIC', image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=85', description: 'A late-night soundtrack, signature cocktails, and a room made for staying a little longer.' },
  { date: 'SAT · 08 NOV', title: 'The Velvet Table', type: 'DINING EXPERIENCE', image: 'https://images.unsplash.com/photo-1515003197210-e0cd7184f8b5?auto=format&fit=crop&w=1200&q=85', description: 'A curated multi-course evening celebrating bold flavours and beautiful company.' },
  { date: 'SAT · 15 NOV', title: 'Rhythm & Rooftops', type: 'LOUNGE NIGHT', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=85', description: 'Resident selectors, atmospheric lighting, and a dance floor that finds its own rhythm.' },
];