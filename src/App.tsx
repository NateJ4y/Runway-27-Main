import { useMemo, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDownRight, ArrowRight, ArrowUpRight, CalendarDays, Check, Clock3, Instagram, MapPin, Menu as MenuIcon, Sparkles, UtensilsCrossed, X, Phone, Plane, Users, Bike, Ticket } from 'lucide-react';
import runwayLogo from './image-removebg-preview (2).png';
import MenuBlock from './components/ui/menu-1';
import { events, menuItems } from './data';

const fadeUp = { hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: 'easeOut' } } };
const sectionMotion = { hidden: { opacity: 0, y: 54, scale: 0.985 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.72, ease: 'easeOut' } } };
const categories = ['All', 'Plates', 'Small bites', 'Drinks'] as const;

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.25 });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

function ParallaxImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : -28, reduceMotion ? 0 : 28]);
  return <div className={`parallax-frame ${className}`}><motion.img src={src} alt={alt} loading="lazy" style={{ y: reduceMotion ? 0 : y }} /></div>;
}

export default function App() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroScale = useTransform(heroProgress, [0, 1], reduceMotion ? [1, 1] : [1, 1.16]);
  const heroImageY = useTransform(heroProgress, [0, 1], reduceMotion ? [0, 0] : [0, 90]);
  const heroContentY = useTransform(heroProgress, [0, 1], reduceMotion ? [0, 0] : [0, -70]);
  const heroContentOpacity = useTransform(heroProgress, [0, 0.72], [1, 0]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuCategory, setMenuCategory] = useState<(typeof categories)[number]>('All');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingSent, setBookingSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', date: '', time: '19:00', guests: '2', notes: '' });
  const filteredMenu = useMemo(() => menuCategory === 'All' ? menuItems : menuItems.filter((item) => item.category === menuCategory), [menuCategory]);
  const closeNav = () => setMenuOpen(false);
  const openBooking = () => { setBookingSent(false); setBookingOpen(true); closeNav(); };
  const submitBooking = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); setBookingSent(true); };

  return <div className="site-shell">
    <ScrollProgress />
    <div className="announcement"><span className="announcement-dot" /> GOOD TIMES. GOOD FOOD. <span className="announcement-line" /> <span>GERMISTON, SOUTH AFRICA</span></div>
    <header className="site-header">
      
      <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'} aria-label="Main navigation">
        <a href="#experience" onClick={closeNav}>The experience</a><a href="#specials" onClick={closeNav}>Specials</a><a href="#menu" onClick={closeNav}>Menu</a><a href="#events" onClick={closeNav}>What’s on</a><a href="#contact" onClick={closeNav}>Find us</a>
        <button className="mobile-book" onClick={openBooking}>Book a table <ArrowUpRight size={15}/></button>
      </nav>
      <button className="header-book" onClick={openBooking}>Book a table <ArrowUpRight size={15}/></button>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X/> : <MenuIcon/>}</button>
    </header>

    <main>
      <section className="hero" id="home" ref={heroRef}>
        <motion.div className="hero-image-layer" style={{ scale: heroScale, y: heroImageY }} aria-hidden="true" />
        <div className="hero-video-wrap" aria-hidden="true">
          <video className="hero-video" autoPlay muted playsInline loop preload="none" poster="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=75">
            <source src="https://videos.pexels.com/video-files/36083260/15302798_1920_1080_60fps.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-vignette" />
        <div className="hero-topline"><span>26° 12' S — 28° 02' E</span><span className="topline-center"><i/> A PLACE TO ARRIVE</span><span>EST. MMXXVII</span></div>
        <motion.div className="hero-content" style={{ y: heroContentY, opacity: heroContentOpacity }} initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }}>
          <motion.img className="hero-logo" src={runwayLogo} alt="Runway 27 Kitchen & Bar" variants={fadeUp} />
          <motion.p className="eyebrow" variants={fadeUp}><span className="eyebrow-rule"/> YOUR TABLE WITH A VIEW</motion.p>
          <motion.h1 variants={fadeUp}>Good times.<br/><em>Good food.</em></motion.h1>
          <motion.p className="hero-copy" variants={fadeUp}>Good food, family-friendly fun and front-row views of the runway. Your next favourite spot is in Germiston.</motion.p>
          <motion.div className="hero-actions" variants={fadeUp}><a className="button button-gold" href="https://wa.me/27665760223" target="_blank" rel="noreferrer">Come through <ArrowUpRight size={17}/></a><a className="text-link" href="#experience">Explore Runway27 <ArrowDownRight size={16}/></a></motion.div>
        </motion.div>
        <div className="hero-bottomline"><span>DINING / LOUNGE / EVENTS</span><span className="scroll-cue"><span/> SCROLL TO DISCOVER</span><span>YOUR NIGHT, REDEFINED</span></div>
        <div className="hero-stamp"><Sparkles size={14}/><span>MADE FOR<br/>THE MOMENT</span></div>
      </section>

      <motion.section className="intro section-pad" id="experience" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.06 }} variants={sectionMotion}>
        <motion.div className="section-kicker" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}><span>01 / THE EXPERIENCE</span><span>YOUR NEW FAVOURITE PLACE</span></motion.div>
        <div className="intro-grid">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>Big plates.<br/><em>Big little moments.</em></motion.h2>
          <motion.div className="intro-aside" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}><p>Bring the kids, bring your crew, bring your appetite. We’ve got good food, cold drinks, pool tables and a runway-side seat for the show.</p><a href="#story" className="circle-link" aria-label="Read our story"><ArrowUpRight size={22}/></a></motion.div>
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
      </motion.section>


      <motion.section className="promotions-section section-pad" id="specials" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.06 }} variants={sectionMotion}>
        <div className="section-kicker"><span>02 / WHAT'S ON AT RUNWAY27</span><span>GOOD DEALS. GREAT DAYS.</span></div>
        <div className="promos-heading"><div><h2>Make room<br/><em>for a special.</em></h2></div><p>From generous Sunday lunches to weekday favourites, there’s always something worth coming in for.</p></div>
        <div className="promo-feature-grid">
          <motion.article className="promo-card promo-buffet" initial="hidden" whileInView="visible" viewport={{once:true,amount:.15}} variants={fadeUp}>
            <div className="promo-image"><img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=85" alt="A generous spread of lunch dishes" loading="lazy"/><span className="promo-tag">FEATURED EVENT</span><span className="promo-price">R149 <small>/ adult</small></span></div>
            <div className="promo-body"><div className="promo-meta"><span><CalendarDays size={14}/> SUN · 01 NOV 2026</span><span><Clock3 size={14}/> 12:00–17:00</span></div><h3>Biggest Sunday Lunch Buffet</h3><p className="promo-subtitle">Eat as much as you can.</p><p>Bring the whole family for a generous Sunday spread, kids’ play area and views of aircraft taking off while you dine.</p><div className="promo-pills"><span>Kids under 10: R99</span><span>2 hours per seating</span><span>Runway views</span></div><a className="button button-gold" href="https://wa.me/27665760223?text=Hi%20Runway27%2C%20I%27d%20like%20to%20enquire%20about%20the%20Sunday%20Lunch%20Buffet%20on%201%20November%202026." target="_blank" rel="noreferrer">Enquire on WhatsApp <ArrowUpRight size={16}/></a></div>
          </motion.article>
          <motion.article className="promo-card promo-kids" initial="hidden" whileInView="visible" viewport={{once:true,amount:.15}} variants={fadeUp}>
            <div className="promo-image"><img src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1000&q=85" alt="Children playing outdoors" loading="lazy"/><span className="promo-tag">EVERY SATURDAY</span><span className="promo-sticker">KIDS<br/>EAT FREE</span></div>
            <div className="promo-body"><div className="promo-meta"><span><Users size={14}/> FAMILY SPECIAL</span></div><h3>Saturday Kids Eat for Free</h3><p>For every R250 spent, one child under 10 eats free from the kids’ menu. Bring the family, enjoy the aircraft view and let the little ones play.</p><div className="promo-pills"><span>Kids under 10</span><span>Kids menu only</span><span>Pool tables</span></div><a className="promo-text-link" href="https://wa.me/27665760223" target="_blank" rel="noreferrer">Ask us about the offer <ArrowRight size={15}/></a></div>
          </motion.article>
        </div>
        <div className="weekday-block"><div className="weekday-heading"><div><span className="eyebrow">MONDAY — THURSDAY</span><h3>Weekday specials</h3></div><span className="sit-down-note">SIT-DOWN ONLY</span></div>
          <div className="weekday-grid">
            <motion.article className="weekday-card" whileHover={{y:-5}}><span className="weekday-day">MONDAY <i>01</i></span><h4>Steak & draught</h4><p>500g T-bone steak with a 300ml draught beer.</p><strong>R199 <small>ONLY</small></strong></motion.article>
            <motion.article className="weekday-card" whileHover={{y:-5}}><span className="weekday-day">TUESDAY <i>02</i></span><h4>Pizza, pasta & steak</h4><p>50% off all pizza and pasta, plus 300g Portuguese steak.</p><strong>50% <small>OFF PIZZA & PASTA</small></strong></motion.article>
            <motion.article className="weekday-card" whileHover={{y:-5}}><span className="weekday-day">WEDNESDAY <i>03</i></span><h4>Sushi & steakhouse</h4><p>50% off all sushi, plus 350g ribeye, pork chops and 300g bitoque steak.</p><strong>50% <small>OFF SUSHI</small></strong></motion.article>
            <motion.article className="weekday-card" whileHover={{y:-5}}><span className="weekday-day">THURSDAY <i>04</i></span><h4>Burgers & T-bone</h4><p>50% off all burgers, plus a 500g T-bone steak.</p><strong>50% <small>OFF BURGERS</small></strong></motion.article>
          </div><p className="promo-terms">Weekday specials are sit-down only. Ask the team about availability and terms.</p>
        </div>
        <div className="promo-bottom-grid">
          <motion.article className="secondary-promo biker-promo" whileInView={{opacity:1,y:0}} initial={{opacity:0,y:20}} viewport={{once:true}}><div className="secondary-icon"><Bike size={24}/></div><span className="promo-tag">BIKERS WELCOME</span><h3>Brothers by the road,<br/><em>family by the heart.</em></h3><p>All bikers welcome. Wear your cut or bring your helmet and get <strong>10% off</strong>. Great food, cold drinks, good company and aircraft taking off while you dine.</p><small>*Discount excludes specials.</small><a className="promo-text-link" href="https://wa.me/27665760223" target="_blank" rel="noreferrer">Plan your stop <ArrowRight size={15}/></a></motion.article>
          <motion.article className="secondary-promo venue-promo" whileInView={{opacity:1,y:0}} initial={{opacity:0,y:20}} viewport={{once:true}}><div className="secondary-icon"><Ticket size={24}/></div><span className="promo-tag">VENUE HIRE</span><h3>Your celebration.<br/><em>Our runway-side setting.</em></h3><p>Year-end functions, weddings, birthdays and all celebrations. Enjoy <strong>free venue hire</strong> with a <strong>free DJ on request</strong>.</p><a className="promo-text-link" href="https://wa.me/27665760223?text=Hi%20Runway27%2C%20I%27d%20like%20to%20enquire%20about%20free%20venue%20hire." target="_blank" rel="noreferrer">Enquire about venue hire <ArrowRight size={15}/></a></motion.article>
        </div>
        <div className="amenities-strip"><span><Users size={17}/> Family friendly</span><span><Sparkles size={17}/> Kids play area</span><span><Plane size={18}/> Aircraft & runway views</span><span><span className="pool-icon">8</span> Pool tables</span></div>
      </motion.section>

      <MenuBlock />

      <motion.section className="quote-band" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.06 }} variants={sectionMotion}><div className="quote-orb">R<span>27</span></div><p>“The best nights don’t need a reason.<br/><em>Just the right place.”</em></p><span className="quote-caption">YOUR TABLE IS WAITING</span></motion.section>

      <motion.section className="events-section section-pad" id="events" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.06 }} variants={sectionMotion}>
        <div className="section-kicker"><span>04 / ON THE CALENDAR</span><span>GOOD THINGS ARE HAPPENING</span></div>
        <div className="events-heading"><h2>Make a night<br/><em>of it.</em></h2><p>From intimate dinners to high-energy nights, there’s always another reason to come through.</p></div>
        <div className="events-grid">{events.map((event, i) => <motion.article className="event-card" key={event.title} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }} variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: .6, delay: i * .12 } } }}><div className="event-image"><img src={event.image} alt="" loading="lazy"/><span className="event-date">{event.date}</span><span className="event-arrow"><ArrowUpRight/></span></div><div className="event-meta">{event.type}</div><h3>{event.title}</h3><p>{event.description}</p><button className="event-link" onClick={openBooking}>Enquire about this event <ArrowRight size={15}/></button></motion.article>)}</div>
        <p className="menu-disclaimer">Event names and dates are illustrative placeholders, not confirmed listings.</p>
      </motion.section>

      <motion.section className="story-section" id="story" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.06 }} variants={sectionMotion}>
        <div className="story-image"><ParallaxImage src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85" alt="Atmospheric restaurant interior"/><div className="story-image-label">THE ART OF A GOOD NIGHT</div></div>
        <div className="story-copy"><div className="section-kicker"><span>05 / THE RUNWAY WAY</span></div><h2>Every detail has<br/>a <em>feeling.</em></h2><p>We believe a great venue is more than a room. It’s the welcome at the door, the first sip, the playlist you Shazam and the conversation that runs past closing time.</p><p>Runway27 brings those little things together, so the ordinary evening gets a chance to become something else.</p><div className="story-signoff"><span className="signoff-line"/><span>THE RUNWAY27 PROMISE</span></div></div>
      </motion.section>

      <motion.section className="reservation-band" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.06 }} variants={sectionMotion}>
        <div className="reservation-glow"/><div className="section-kicker"><span>06 / YOUR EVENING STARTS HERE</span><span>MAKE IT YOURS</span></div>
        <h2>We’ll save<br/><em>you a place.</em></h2><p>Date night, catch-up, celebration or just because. We’ll see you there.</p><button className="button button-gold" onClick={openBooking}>Reserve a table <ArrowUpRight size={17}/></button>
        <span className="reservation-footnote">RESERVATIONS ARE FREE · GOOD COMPANY IS ESSENTIAL</span>
      </motion.section>
    </main>

    <footer className="site-footer">
      <div className="footer-top"><a href="#home" className="brand footer-brand"><img className="brand-logo" src={runwayLogo} alt="Runway 27 Kitchen & Bar" /></a><p>Runway 27 Kitchen &amp; Bar.<br/>Good food, family fun and runway views.</p><a href="#home" className="back-top">BACK TO TOP <ArrowUpRight size={14}/></a></div>
      <div className="footer-bottom"><span>© 2026 RUNWAY 27 KITCHEN &amp; BAR</span><div><a href="#experience">EXPERIENCE</a><a href="#menu">MENU</a><a href="#events">EVENTS</a></div><div className="footer-social"><a href="#contact" aria-label="Instagram"><Instagram size={16}/></a><a href="mailto:hello@runway27.example" aria-label="Email Runway27"><ArrowUpRight size={16}/></a></div></div>
      <div id="contact" className="footer-contact"><a href="https://www.google.com/maps/search/?api=1&query=Transvaal+Aviation+Building%2C+Dakota+Crescent%2C+Germiston" target="_blank" rel="noreferrer"><MapPin size={14}/> Transvaal Aviation Building, Dakota Crescent, Germiston <ArrowUpRight size={13}/></a><a href="tel:+27665760223"><Phone size={14}/> 066 576 0223</a><a href="https://wa.me/27665760223" target="_blank" rel="noreferrer"><Phone size={14}/> WhatsApp Runway27 <ArrowUpRight size={13}/></a><span><UtensilsCrossed size={13}/> Dining · Family fun · Events</span></div>
    </footer>

    <AnimatePresence>{bookingOpen && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => { if (e.target === e.currentTarget) setBookingOpen(false); }}><motion.div className="booking-modal" initial={{ opacity: 0, y: 24, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .98 }} transition={{ duration: .25 }} role="dialog" aria-modal="true" aria-labelledby="booking-title"><button className="modal-close" onClick={() => setBookingOpen(false)} aria-label="Close reservation form"><X/></button>{bookingSent ? <div className="booking-success"><div className="success-icon"><Check size={25}/></div><span className="eyebrow">REQUEST PREVIEW</span><h2>Looking good.</h2><p>Your form passed the demo checks. No reservation has been created or sent to Runway27 yet.</p><button className="button button-gold" onClick={() => setBookingOpen(false)}>Back to the experience <ArrowRight size={16}/></button></div> : <><span className="eyebrow"><CalendarDays size={14}/> RESERVATIONS</span><h2 id="booking-title">Save your <em>seat.</em></h2><p className="modal-intro">Tell us a little about your evening.</p><form className="booking-form" onSubmit={submitBooking}><label>Full name<input required autoComplete="name" value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="Your name"/></label><label>Email address<input required type="email" autoComplete="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} placeholder="you@example.com"/></label><div className="form-row"><label>Date<input required type="date" min={new Date().toISOString().slice(0,10)} value={form.date} onChange={e => setForm({...form, date:e.target.value})}/></label><label>Time<select value={form.time} onChange={e => setForm({...form, time:e.target.value})}>{['17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00'].map(t=><option key={t}>{t}</option>)}</select></label></div><label>Guests<select value={form.guests} onChange={e => setForm({...form, guests:e.target.value})}>{['1','2','3','4','5','6','7','8'].map(n=><option key={n} value={n}>{n} {n === '1' ? 'guest' : 'guests'}</option>)}</select></label><label>Anything we should know? <span className="optional">(optional)</span><textarea rows={2} value={form.notes} onChange={e => setForm({...form, notes:e.target.value})} placeholder="Celebration, dietary needs, seating request…"/></label><button className="button button-gold booking-submit" type="submit">Preview reservation request <ArrowUpRight size={16}/></button><p className="form-note">Demo only · No data is sent or stored.</p></form></>}</motion.div></motion.div>}</AnimatePresence>
  </div>;
}
