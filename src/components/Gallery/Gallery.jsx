import { motion } from "framer-motion";
import styles from "./Gallery.module.css";
import ScrollReveal from "../ScrollReveal/ScrollReveal";
import galleryImages from "../../data/gallery";

export default function Gallery() {
  return (
    <section id="gallery" className={styles.section}>
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-label">Gallery</span>
            <h2 className="section-title">A Feast for the Eyes</h2>
            <p className="section-subtitle">
              Peek inside our kitchen and discover the art behind every creation.
            </p>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.id}
              className={styles.item}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <div className={styles.imageWrapper}>
                <motion.img
                  src={img.src}
                  alt={img.alt}
                  className={styles.image}
                  loading="lazy"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className={styles.overlay}>
                  <span className={styles.overlayIcon}>🔍</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
