import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product, index, onOpen }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const targetTilt = useRef({ rotateX: 0, rotateY: 0 });
  const animFrame = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    targetTilt.current = {
      rotateX: ((y - centerY) / centerY) * -8,
      rotateY: ((x - centerX) / centerX) * 8,
    };

    // Lerp animation
    if (!animFrame.current) {
      const lerpAnimate = () => {
        setTilt((prev) => {
          const newX = prev.rotateX + (targetTilt.current.rotateX - prev.rotateX) * 0.15;
          const newY = prev.rotateY + (targetTilt.current.rotateY - prev.rotateY) * 0.15;
          return { rotateX: newX, rotateY: newY };
        });
        animFrame.current = requestAnimationFrame(lerpAnimate);
      };
      animFrame.current = requestAnimationFrame(lerpAnimate);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (animFrame.current) {
      cancelAnimationFrame(animFrame.current);
      animFrame.current = null;
    }
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={styles.card}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(product)}
      role="button"
      tabIndex={0}
      aria-label={`View ${product.name} details`}
      style={{
        transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      <div className={styles.imageWrapper}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.image}
          loading="lazy"
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

      {/* Order button slides up on hover */}
      <div className={styles.hoverAction}>
        <span className={styles.hoverActionText}>🛒 Quick Order</span>
      </div>
    </motion.div>
  );
}
