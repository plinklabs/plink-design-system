/* Plink Labs marketing — top navigation */

function Nav() {
  const { Logo, Button } = window.PlinkLabsDesignSystem_59a0ef;
  return (
    <nav className="mk-nav">
      <Logo size={26} />
      <div className="mk-nav__links">
        <a href="#products">Products</a>
        <a href="#mission">Mission</a>
        <a href="#source">GitHub</a>
        <Button as="a" href="#products" variant="secondary" size="sm">Browse products</Button>
      </div>
    </nav>
  );
}

window.Nav = Nav;
