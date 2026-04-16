import { useState } from "react";
import styles from "./FeaturedProducts.module.css";
import ProductCard from "../ProductCard/ProductCard";
import ScrollReveal from "../ScrollReveal/ScrollReveal";
import products from "../../data/products";

const categories = ["All", ...new Set(products.map((p) => p.category))];

export default function FeaturedProducts({ onOpenProduct }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section id="menu" className={styles.section}>
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-label">Our Menu</span>
            <h2 className="section-title">Handcrafted Delights</h2>
            <p className="section-subtitle">
              Every item is baked fresh daily with premium ingredients and a whole
              lot of love. Discover our signature collection.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className={styles.filters}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {filtered.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              onOpen={onOpenProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
