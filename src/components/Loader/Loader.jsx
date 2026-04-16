import { motion } from "framer-motion";
import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <motion.div
      className={styles.loader}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.content}>
        <motion.div
          className={styles.icon}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          🧁
        </motion.div>
        <motion.h2
          className={styles.text}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Sweet Crumbs
        </motion.h2>
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
