import { motion } from "framer-motion";
import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <motion.div
      className={styles.loader}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className={styles.content}>
        {/* Animated croissant SVG — stroke-dashoffset "bake in" */}
        <div className={styles.iconWrapper}>
          <svg
            className={styles.croissantSvg}
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Croissant body */}
            <path
              className={styles.svgStroke}
              d="M50 85 C25 85 10 65 15 45 C18 32 28 22 40 20 C42 15 46 12 50 12 C54 12 58 15 60 20 C72 22 82 32 85 45 C90 65 75 85 50 85Z"
              stroke="var(--caramel)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Inner detail lines */}
            <path
              className={`${styles.svgStroke} ${styles.svgStrokeDelay1}`}
              d="M35 55 C38 40 44 30 50 28 C56 30 62 40 65 55"
              stroke="var(--caramel)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              className={`${styles.svgStroke} ${styles.svgStrokeDelay2}`}
              d="M28 65 C32 48 40 35 50 32 C60 35 68 48 72 65"
              stroke="var(--caramel)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Fill shape — appears after stroke */}
            <path
              className={styles.svgFill}
              d="M50 85 C25 85 10 65 15 45 C18 32 28 22 40 20 C42 15 46 12 50 12 C54 12 58 15 60 20 C72 22 82 32 85 45 C90 65 75 85 50 85Z"
              fill="var(--caramel)"
            />
          </svg>
        </div>

        <motion.h2
          className={styles.text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Sweet Crumbs
        </motion.h2>
        <motion.p
          className={styles.subtext}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Freshly Baked Happiness
        </motion.p>

        <div className={styles.bar}>
          <motion.div
            className={styles.barFill}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
