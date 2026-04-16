import { motion } from "framer-motion";
import styles from "./Hero.module.css";
import ScrollReveal from "../ScrollReveal/ScrollReveal";

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.bgOverlay}></div>
      <div className={styles.bgPattern}></div>

      {/* Floating decorative elements */}
      <motion.div
        className={`${styles.floater} ${styles.floater1}`}
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        🥐
      </motion.div>
      <motion.div
        className={`${styles.floater} ${styles.floater2}`}
        animate={{ y: [0, 15, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        🍰
      </motion.div>
      <motion.div
        className={`${styles.floater} ${styles.floater3}`}
        animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        🧁
      </motion.div>

      <div className={`container ${styles.heroContent}`}>
        <ScrollReveal delay={0.2}>
          <span className={styles.badge}>✨ Artisan Bakery Since 2015</span>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <h1 className={styles.title}>
            Freshly Baked
            <br />
            <span className={styles.titleAccent}>Happiness</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <p className={styles.subtitle}>
            Handcrafted with love using the finest ingredients. From artisan
            sourdough to decadent cakes — every bite tells a story of passion
            and perfection.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.8}>
          <div className={styles.heroCtas}>
            <a href="#menu" className="btn-primary">
              <span>🛒</span> View Menu
            </a>
            <a href="#about" className="btn-secondary">
              Our Story →
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={1.0}>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>10K+</span>
              <span className={styles.statLabel}>Happy Customers</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>50+</span>
              <span className={styles.statLabel}>Unique Recipes</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>8+</span>
              <span className={styles.statLabel}>Years of Love</span>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <motion.div
        className={styles.scrollIndicator}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span>↓</span>
      </motion.div>
    </section>
  );
}
