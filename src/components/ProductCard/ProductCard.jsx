import { motion } from "framer-motion";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product, index, onOpen }) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      onClick={() => onOpen(product)}
      role="button"
      tabIndex={0}
      aria-label={`View ${product.name} details`}
    >
      <div className={styles.imageWrapper}>
        <motion.img
          src={product.image}
          alt={product.name}
          className={styles.image}
          loading="lazy"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4 }}
        />
        <div className={styles.imageOverlay}>
          <span className={styles.viewBtn}>View Details</span>
        </div>
        <span className={styles.category}>{product.category}</span>
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{product.name}</h3>
        <div className={styles.priceLine}>
          <span className={styles.price}>₹{product.price}</span>
          <motion.button
            className={styles.addBtn}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onOpen(product);
            }}
            aria-label={`Order ${product.name}`}
          >
            +
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
