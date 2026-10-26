import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDownRight, ArrowRight, ArrowUpRight, CalendarDays, Check, ChevronDown, Clock3, Instagram, MapPin, Menu as MenuIcon, Sparkles, UtensilsCrossed, X } from 'lucide-react';
import Scene from './Scene';
import { events, menuItems } from './data';

const fadeUp = { hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } } };
const categories = ['All', 'Plates', 'Small bites', 'Drinks'] as const;

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuCategory, setMenuCategory] = useState<(typeof categories)[number]>('All');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingSent, setBookingSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', date: '', time: '19:00', guests: '2', notes: '' });
  const filteredMenu = useMemo(() => menuCategory === 'All' ? menuItems : menuItems.filter((item) => item.category === menuCategory), [menuCategory]);
  const closeNav = () => setMenuOpen(false);
  const openBooking = () => { setBookingSent(false); setBookingOpen(true); closeNav(); };
  const submitBooking = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); setBookingSent(true); };

  return <div className="site-shell">
    <div className="announcement"><span className="announcement-dot" /> THE CITY AFTER DARK, REIMAGINED <span className="announcement-line" /> <span>DINING · LOUNGE · EXPERIENCES</span></div>
    <header className="site-header">
      <a href="#home" className="brand" onClick={closeNav} aria-label="Runway27 home"><span className="brand-mark">R<span>27</span></span><span className="brand-name">RUNWAY<span>27</span></span></a>
      <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'} aria-label="Main navigation">
        <a href="#experience" onClick={closeNav}>The experience</a><a href="#menu" onClick={closeNav}>Menu</a><a href="#events" onClick={closeNav}>What’s on</a><a href="#story" onClick={closeNav}>Our story</a>
        <button className="mobile-book" onClick={openBooking}>Book a table <ArrowUpRight size={15}/></button>
      </nav>
      <button className="header-book" onClick={openBooking}>Book a table <ArrowUpRight size={15}/></button>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X/> : <MenuIcon/>}</button>
    </header>

    <main>
      <section className="hero" id="home">
        <Scene />
        <div className="hero-vignette" />
        <div className="hero-topline"><span>26° 12' S — 28° 02' E</span><span className="topline-center"><i/> A PLACE TO ARRIVE</span><span>EST. MMXXVII</span></div>
        <motion.div className="hero-content" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }}>
          <motion.p className="eyebrow" variants={fadeUp}><span className="eyebrow-rule"/> MORE THAN A NIGHT OUT</motion.p>
          <motion.h1 variants={fadeUp}>Take the night<br/><em>somewhere.</em></motion.h1>
          <motion.p className="hero-copy" variants={fadeUp}>A table worth gathering around. A lounge that comes alive. A night that becomes a story.</motion.p>
          <motion.div className="hero-actions" variants={fadeUp}><button className="button button-gold" onClick={openBooking}>Reserve your moment <ArrowUpRight size={17}/></button><a className="text-link" href="#experience">Explore Runway27 <ArrowDownRight size={16}/></a></motion.div>
        </motion.div>
        <div className="hero-bottomline"><span>DINING / LOUNGE / EVENTS</span><span className="scroll-cue"><span/> SCROLL TO DISCOVER</span><span>YOUR NIGHT, REDEFINED</span></div>
        <div className="hero-stamp"><Sparkles size={14}/><span>MADE FOR<br/>THE MOMENT</span></div>
      </section>

      <section className="intro section-pad" id="experience">
        <motion.div className="section-kicker" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}><span>01 / THE EXPERIENCE</span><span>YOUR NEW FAVOURITE PLACE</span></motion.div>
        <div className="intro-grid">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>Come for the flavour.<br/><em>Stay for the feeling.</em></motion.h2>
          <motion.div className="intro-aside" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}><p>Runway27 is where the evening finds its rhythm. Thoughtful plates, considered cocktails, music in the air and space to make a moment your own.</p><a href="#story" className="circle-link" aria-label="Read our story"><ArrowUpRight size={22}/></a></motion.div>
        </div>
        <div className="experience-grid">
          <motion.article className="experience-card experience-dining" whileHover={{ y: -5 }} transition={{ duration: .3 }}>
            <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1300&q=85" alt="Elegant restaurant table set for dinner" loading="lazy"/>
            <div className="card-shade"/><span className="card-number">01 — GATHER</span><div className="experience-card-bottom"><div><h3>Dining</h3><p>Beautifully made. Better shared.</p></div><a href="#menu" aria-label="Explore the menu"><ArrowUpRight/></a></div>
          </motion.article>
          <motion.article className="experience-card experience-lounge" whileHover={{ y: -5 }} transition={{ duration: .3 }}>
            <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1000&q=85" alt="Warm, intimate cocktail lounge" loading="lazy"/>
            <div className="card-shade"/><span className="card-number">02 — UNWIND</span><div className="experience-card-bottom"><div><h3>The lounge</h3><p>One more round. One more song.</p></div><a href="#events" aria-label="Explore lounge events"><ArrowUpRight/></a></div>
          </motion.article>
          <motion.article className="experience-card experience-events" whileHover={{ y: -5 }} transition={{ duration: .3 }}>
            <img src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1000&q=85" alt="Live music and lights at a night event" loading="lazy"/>
            <div className="card-shade"/><span className="card-number">03 — COME ALIVE</span><div className="experience-card-bottom"><div><h3>Events</h3><p>Make the night a little legendary.</p></div><a href="#events" aria-label="See upcoming events"><ArrowUpRight/></a></div>
          </motion.article>
        </div>
      </section>

      <section className="menu-section section-pad" id="menu">
        <div className="menu-photo"><img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85" alt="Freshly prepared seasonal dish" loading="lazy"/><div className="photo-caption"><span>FRESH THINKING.</span><span>FEARLESS FLAVOUR.</span></div></div>
        <div className="menu-content">
          <div className="section-kicker"><span>02 / FROM OUR KITCHEN</span><span>THE MENU</span></div>
          <h2>A little unexpected.<br/><em>Always memorable.</em></h2>
          <p className="menu-intro">Seasonal ingredients, generous flavour and the kind of menu that makes choosing the next bite part of the fun.</p>
          <div className="menu-tabs" role="tablist" aria-label="Menu categories">{categories.map(c => <button key={c} role="tab" aria-selected={menuCategory === c} className={menuCategory === c ? 'menu-tab active' : 'menu-tab'} onClick={() => setMenuCategory(c)}>{c}</button>)}</div>
          <div className="menu-list">{filteredMenu.map((item, i) => <motion.div className="menu-item" key={item.name} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .25, delay: i * .025 }}><div><h3>{item.name}</h3><p>{item.description}</p></div><span className="menu-price">{item.price}</span></motion.div>)}</div>
          <p className="menu-disclaimer">Sample menu for design preview. Final menu and prices to be confirmed.</p>
          <button className="button button-outline" onClick={openBooking}>Join us at the table <ArrowUpRight size={16}/></button>
        </div>
      </section>

      <section className="quote-band"><div className="quote-orb">R<span>27</span></div><p>“The best nights don’t need a reason.<br/><em>Just the right place.”</em></p><span className="quote-caption">YOUR TABLE IS WAITING</span></section>

      <section className="events-section section-pad" id="events">
        <div className="section-kicker"><span>03 / ON THE CALENDAR</span><span>GOOD THINGS ARE HAPPENING</span></div>
        <div className="events-heading"><h2>Make a night<br/><em>of it.</em></h2><p>From intimate dinners to high-energy nights, there’s always another reason to come through.</p></div>
        <div className="events-grid">{events.map((event, i) => <motion.article className="event-card" key={event.title} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }} variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: .6, delay: i * .12 } } }}><div className="event-image"><img src={event.image} alt="" loading="lazy"/><span className="event-date">{event.date}</span><span className="event-arrow"><ArrowUpRight/></span></div><div className="event-meta">{event.type}</div><h3>{event.title}</h3><p>{event.description}</p><button className="event-link" onClick={openBooking}>Enquire about this event <ArrowRight size={15}/></button></motion.article>)}</div>
        <p className="menu-disclaimer">Event names and dates are illustrative placeholders, not confirmed listings.</p>
      </section>

      <section className="story-section" id="story">
        <div className="story-image"><img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85" alt="Atmospheric restaurant interior" loading="lazy"/><div className="story-image-label">THE ART OF A GOOD NIGHT</div></div>
        <div className="story-copy"><div className="section-kicker"><span>04 / THE RUNWAY WAY</span></div><h2>Every detail has<br/>a <em>feeling.</em></h2><p>We believe a great venue is more than a room. It’s the welcome at the door, the first sip, the playlist you Shazam and the conversation that runs past closing time.</p><p>Runway27 brings those little things together, so the ordinary evening gets a chance to become something else.</p><div className="story-signoff"><span className="signoff-line"/><span>THE RUNWAY27 PROMISE</span></div></div>
      </section>

      <section className="reservation-band">
        <div className="reservation-glow"/><div className="section-kicker"><span>05 / YOUR EVENING STARTS HERE</span><span>MAKE IT YOURS</span></div>
        <h2>We’ll save<br/><em>you a place.</em></h2><p>Date night, catch-up, celebration or just because. We’ll see you there.</p><button className="button button-gold" onClick={openBooking}>Reserve a table <ArrowUpRight size={17}/></button>
        <span className="reservation-footnote">RESERVATIONS ARE FREE · GOOD COMPANY IS ESSENTIAL</span>
      </section>
    </main>

    <footer className="site-footer">
      <div className="footer-top"><a href="#home" className="brand footer-brand"><span className="brand-mark">R<span>27</span></span><span className="brand-name">RUNWAY<span>27</span></span></a><p>Good food. Great energy.<br/>A night worth remembering.</p><a href="#home" className="back-top">BACK TO TOP <ArrowUpRight size={14}/></a></div>
      <div className="footer-bottom"><span>© 2026 RUNWAY27 · CONCEPT WEBSITE</span><div><a href="#experience">EXPERIENCE</a><a href="#menu">MENU</a><a href="#events">EVENTS</a></div><div className="footer-social"><a href="#contact" aria-label="Instagram"><Instagram size={16}/></a><a href="mailto:hello@runway27.example" aria-label="Email Runway27"><ArrowUpRight size={16}/></a></div></div>
      <div id="contact" className="footer-contact"><span><MapPin size={13}/> Address to be confirmed</span><span><Clock3 size={13}/> Hours to be confirmed</span><span><UtensilsCrossed size={13}/> Dining · Lounge · Events</span></div>
    </footer>

    <AnimatePresence>{bookingOpen && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => { if (e.target === e.currentTarget) setBookingOpen(false); }}><motion.div className="booking-modal" initial={{ opacity: 0, y: 24, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .98 }} transition={{ duration: .25 }} role="dialog" aria-modal="true" aria-labelledby="booking-title"><button className="modal-close" onClick={() => setBookingOpen(false)} aria-label="Close reservation form"><X/></button>{bookingSent ? <div className="booking-success"><div className="success-icon"><Check size={25}/></div><span className="eyebrow">REQUEST PREVIEW</span><h2>Looking good.</h2><p>Your form passed the demo checks. No reservation has been created or sent to Runway27 yet.</p><button className="button button-gold" onClick={() => setBookingOpen(false)}>Back to the experience <ArrowRight size={16}/></button></div> : <><span className="eyebrow"><CalendarDays size={14}/> RESERVATIONS</span><h2 id="booking-title">Save your <em>seat.</em></h2><p className="modal-intro">Tell us a little about your evening.</p><form className="booking-form" onSubmit={submitBooking}><label>Full name<input required autoComplete="name" value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="Your name"/></label><label>Email address<input required type="email" autoComplete="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} placeholder="you@example.com"/></label><div className="form-row"><label>Date<input required type="date" min={new Date().toISOString().slice(0,10)} value={form.date} onChange={e => setForm({...form, date:e.target.value})}/></label><label>Time<select value={form.time} onChange={e => setForm({...form, time:e.target.value})}>{['17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00'].map(t=><option key={t}>{t}</option>)}</select></label></div><label>Guests<select value={form.guests} onChange={e => setForm({...form, guests:e.target.value})}>{['1','2','3','4','5','6','7','8'].map(n=><option key={n} value={n}>{n} {n === '1' ? 'guest' : 'guests'}</option>)}</select></label><label>Anything we should know? <span className="optional">(optional)</span><textarea rows={2} value={form.notes} onChange={e => setForm({...form, notes:e.target.value})} placeholder="Celebration, dietary needs, seating request…"/></label><button className="button button-gold booking-submit" type="submit">Preview reservation request <ArrowUpRight size={16}/></button><p className="form-note">Demo only · No data is sent or stored.</p></form></>}</motion.div></motion.div>}</AnimatePresence>
  </div>;
}
