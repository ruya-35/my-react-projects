
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="hero">
      <p className="eyebrow">WELCOME TO ADDIS EATS</p>

      <h1>
        Discover the Taste
        <br />
        of Ethiopia
      </h1>
      <p className="hero-description">
        Enjoy delicious Ethiopian dishes, from traditional Doro Wot
        to fresh vegetarian meals, all in one place.
      </p>
      <Link href="/menu" className="primary-button">Our Menu</Link>
    </section>
  );
}
