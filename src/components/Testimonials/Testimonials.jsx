import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Testimonials.module.css";
import ScrollReveal from "../ScrollReveal/ScrollReveal";
import testimonials from "../../data/testimonials";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  return (
    <section id="testimonials" className={styles.section}>
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-label">Testimonials</span>
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">
              Don't just take our word for it — hear from the people who make our
              bakery special.
            </p>
          </div>
        </ScrollReveal>

        <div className={styles.slider}>
          <button className={styles.navBtn} onClick={prev} aria-label="Previous testimonial">
            ←
          </button>

          <div className={styles.cardWrapper}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                className={styles.card}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
              >
                <div className={styles.stars}>
                  {Array.from({ length: t.rating }, (_, i) => (
                    <span key={i} className={styles.star}>★</span>
                  ))}
                </div>
                <p className={styles.quote}>"{t.text}"</p>
                <div className={styles.author}>
                  <img src={t.avatar} alt={t.name} className={styles.avatar} />
                  <div>
                    <h4 className={styles.authorName}>{t.name}</h4>
                    <span className={styles.authorLabel}>Verified Customer</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button className={styles.navBtn} onClick={next} aria-label="Next testimonial">
            →
          </button>
        </div>

        <div className={styles.dots}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
              onClick={() => setCurrent(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
