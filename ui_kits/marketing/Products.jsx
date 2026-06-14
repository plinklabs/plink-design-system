/* Plink Labs marketing — the products grid. Flat hairline instrument cards, mono numbers. */

const PL_PRODUCTS = [
  { num: '01', name: 'Timer', tag: 'Classroom', desc: 'Big, readable countdowns for activities and transitions. Plinks gently when time is up.' },
  { num: '02', name: 'Picker', tag: 'Fairness', desc: 'Random name and group picker. Transparent shuffle, no repeats until everyone has had a turn.' },
  { num: '03', name: 'Planner', tag: 'Lessons', desc: 'Lay out a lesson as simple timed blocks. Drag to reorder, run it as a calm checklist.' },
  { num: '04', name: 'Attendance', tag: 'Roll', desc: 'A quiet roll call. Tap to mark present and export a clean register — nothing leaves the room.' },
  { num: '05', name: 'Flashcards', tag: 'Review', desc: 'Spaced-repetition cards for quick review. Build your own decks, flip with a keypress.' },
  { num: '06', name: 'Whiteboard', tag: 'Canvas', desc: 'A plain, fast whiteboard. Hairline grid, one ink colour, no clutter — readable from the back row.' },
];

function ProductCard({ p }) {
  const { Card, Badge, Ping } = window.PlinkLabsDesignSystem_59a0ef;
  return (
    <Card num={p.num} interactive className="mk-product">
      <span className="mk-product__mark"><Ping mode="static" size={20} /></span>
      <h3 className="mk-product__name">{p.name}</h3>
      <p className="mk-product__desc">{p.desc}</p>
      <div className="mk-product__foot">
        <Badge variant="outline">{p.tag}</Badge>
        <span className="mk-product__open">Open →</span>
      </div>
    </Card>
  );
}

function Products() {
  return (
    <section className="mk-products" id="products">
      <div className="mk-section-head">
        <span className="mk-section-num">02 / Products</span>
        <h2 className="mk-section-title">Six small tools, <span className="mk-spark">one</span> lab.</h2>
        <p className="mk-section-lede">Each does one thing precisely. All free, all open source, all built to be read from the back of the room.</p>
      </div>
      <div className="mk-product-grid">
        {PL_PRODUCTS.map((p) => <ProductCard key={p.num} p={p} />)}
      </div>
    </section>
  );
}

window.Products = Products;
