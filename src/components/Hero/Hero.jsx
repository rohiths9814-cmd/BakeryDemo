import { motion } from "framer-motion";
import styles from "./Hero.module.css";
import FlourParticles from "./FlourParticles";

// Staggered word reveal variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 40, rotate: 5 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] },
  },
});

function SplitWords({ text, className }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          style={{ display: "inline-block", marginRight: "0.3em" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.bgOverlay}></div>
      <div className={styles.bgPattern}></div>

      {/* Flour particles canvas */}
      <FlourParticles />

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

      <motion.div
        className={`container ${styles.heroContent}`}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.span className={styles.badge} variants={fadeUp(0)}>
          ✨ Artisan Bakery Since 2015
        </motion.span>

        {/* Staggered word-by-word hero headline */}
        <motion.h1 className={styles.title} variants={containerVariants}>
          <SplitWords text="Freshly Baked" />
          <br />
          <SplitWords text="Happiness" className={styles.titleAccent} />
        </motion.h1>

        <motion.p className={styles.subtitle} variants={fadeUp(0.8)}>
          Handcrafted with love using the finest ingredients. From artisan
          sourdough to decadent cakes — every bite tells a story of passion
          and perfection.
        </motion.p>

        <motion.div className={styles.heroCtas} variants={fadeUp(1.2)}>
          <a href="#menu" className="btn-primary">
            <span>🛒</span> View Menu
          </a>
          <a href="#about" className="btn-secondary">
            Our Story →
          </a>
        </motion.div>

        <motion.div className={styles.heroStats} variants={fadeUp(1.5)}>
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
        </motion.div>
      </motion.div>

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
