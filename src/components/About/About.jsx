import styles from "./About.module.css";
import ScrollReveal from "../ScrollReveal/ScrollReveal";

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={`container ${styles.grid}`}>
        <ScrollReveal direction="left" className={styles.imageCol}>
          <div className={styles.imageWrapper}>
            <img
              src="https://images.unsplash.com/photo-1556217477-d325251ece38?w=600&h=700&fit=crop"
              alt="Baker crafting artisan bread"
              className={styles.mainImage}
            />
            <div className={styles.accentCard}>
              <span className={styles.accentNumber}>10+</span>
              <span className={styles.accentText}>Years of<br/>Baking Love</span>
            </div>
          </div>
        </ScrollReveal>

        <div className={styles.textCol}>
          <ScrollReveal>
            <span className="section-label">Our Story</span>
            <h2 className="section-title">Baked With Passion,<br/>Served With Love</h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className={styles.text}>
              Sweet Crumbs was born from a simple dream — to bring the warmth of
              homemade baking to every doorstep. What started as a small kitchen
              experiment in 2015 has blossomed into a beloved artisan bakery
              trusted by thousands.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <p className={styles.text}>
              Every loaf, every pastry, every cake is handcrafted with the finest
              ingredients — real European butter, stone-ground flour, and
              seasonal fruits. We never use preservatives or artificial colours.
              Just honest, delicious food.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.35}>
            <div className={styles.highlights}>
              <div className={styles.highlight}>
                <span className={styles.highlightIcon}>🌾</span>
                <div>
                  <h4>Premium Ingredients</h4>
                  <p>Sourced from trusted local farms and international suppliers</p>
                </div>
              </div>
              <div className={styles.highlight}>
                <span className={styles.highlightIcon}>🤲</span>
                <div>
                  <h4>Handmade Daily</h4>
                  <p>Every item is crafted fresh each morning by our expert bakers</p>
                </div>
              </div>
              <div className={styles.highlight}>
                <span className={styles.highlightIcon}>💛</span>
                <div>
                  <h4>Made With Love</h4>
                  <p>Passion and care in every step, from dough to delivery</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
