type Dish = { name: string; detail: string; price: string; note?: string };
type Course = { title: string; dishes: Dish[] };

const courses: Course[] = [
  { title: "Antipasti", dishes: [
    { name: "Focaccia Romana", detail: "Rosemary, sea salt, new season olive oil", price: "7", note: "Vegan" },
    { name: "Burrata e Pomodorini", detail: "Whole burrata, confit tomatoes, basil oil", price: "13", note: "Vegetarian" },
    { name: "Olive Ascolane", detail: "Stuffed, fried, lemon and parsley", price: "9" },
    { name: "Prosciutto e Melone", detail: "24 month San Daniele, cantaloupe, black pepper", price: "14" },
  ]},
  { title: "Pizza", dishes: [
    { name: "Margherita DOP", detail: "San Marzano tomato, fior di latte, basil", price: "14", note: "Vegetarian" },
    { name: "Marinara", detail: "Tomato, garlic, oregano, no cheese", price: "12", note: "Vegan" },
    { name: "Diavola", detail: "Spicy salame, chilli honey, mozzarella", price: "17" },
    { name: "Salsiccia e Friarielli", detail: "Fennel sausage, broccoli rabe, smoked provola", price: "18" },
    { name: "Bufala e Pistacchio", detail: "Buffalo mozzarella, pistachio pesto, lemon zest", price: "19", note: "Vegetarian" },
  ]},
  { title: "Dolci", dishes: [
    { name: "Tiramisu", detail: "Mascarpone, savoiardi, espresso from the bar", price: "9" },
    { name: "Panna Cotta", detail: "Vanilla bean, amarena cherries", price: "8", note: "Gluten free" },
    { name: "Affogato", detail: "Vanilla gelato drowned in hot espresso", price: "7", note: "Gluten free" },
  ]},
  { title: "Drinks", dishes: [
    { name: "Negroni Sbagliato", detail: "Campari, red vermouth, prosecco, orange", price: "13" },
    { name: "Aperol Spritz", detail: "Aperol, prosecco, soda, green olive", price: "12" },
    { name: "Chianti Classico", detail: "Sangiovese, Tuscany, by the glass", price: "11" },
    { name: "Limonata della Casa", detail: "Amalfi lemons, pressed each morning", price: "5", note: "Vegan" },
  ]},
];

export default function MenuBlock() {
  return (
    <section id="menu" className="menu-block">
      <div className="menu-block-inner">
        <div className="menu-block-heading">
          <p className="menu-block-kicker">03 / FROM OUR KITCHEN</p>
          <h2>The <em>Menu</em></h2>
          <p className="menu-block-intro">A few favourites for a long lunch, an easy dinner, or one more round with good people.</p>
        </div>
        <div className="menu-block-grid">
          {courses.map((course) => (
            <section key={course.title} className="menu-block-course">
              <h3>{course.title}</h3>
              <ul>
                {course.dishes.map((dish) => (
                  <li key={dish.name}>
                    <div className="menu-block-dishline">
                      <span className="menu-block-dishname">{dish.name}</span>
                      <span className="menu-block-dots" aria-hidden="true" />
                      <span className="menu-block-price">{dish.price}</span>
                    </div>
                    <p>{dish.detail}{dish.note ? <span className="menu-block-note"> · {dish.note}</span> : null}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <p className="menu-block-footnote">Tell us about allergies before you order and the kitchen will walk you through every dish.</p>
      </div>
    </section>
  );
}
