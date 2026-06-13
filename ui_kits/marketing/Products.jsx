/* Plink Labs marketing — the products grid. Flat hairline instrument cards, mono numbers. */

const PL_PRODUCTS = [
  { num: '01', name: 'Metronome', tag: 'Rhythm', desc: 'A precise, projector-legible metronome. Tap tempo, subdivisions, a visual ping on every beat.' },
  { num: '02', name: 'Tuner', tag: 'Pitch', desc: 'Chromatic tuner with a calm needle. Works fully offline — no mic data ever leaves the room.' },
  { num: '03', name: 'Timer', tag: 'Classroom', desc: 'Big, readable countdowns for activities and transitions. Plinks gently when time is up.' },
  { num: '04', name: 'Noise Meter', tag: 'Room', desc: 'A friendly volume gauge that pulses when the room gets loud. No recording, just a level.' },
  { num: '05', name: 'Picker', tag: 'Fairness', desc: 'Random name and group picker. Transparent shuffle, no repeats until everyone has had a turn.' },
  { num: '06', name: 'Sampler', tag: 'Sound', desc: 'A tiny pad of classroom sounds and cues. Map your own clips, trigger with a keypress.' },
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
        <h2 className="mk-section-title">Six small instruments, <span className="mk-spark">one</span> lab.</h2>
        <p className="mk-section-lede">Each does one thing precisely. All free, all open source, all built to be read from the back of the room.</p>
      </div>
      <div className="mk-product-grid">
        {PL_PRODUCTS.map((p) => <ProductCard key={p.num} p={p} />)}
      </div>
    </section>
  );
}

window.Products = Products;
