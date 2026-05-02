import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Testimonials.module.css";
import ScrollReveal from "../ScrollReveal/ScrollReveal";
import testimonials from "../../data/testimonials";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = testimonials.length;

  // Touch swipe
  const touchStartX = useRef(0);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 60) next();
    else if (diff < -60) prev();
  };

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  // Auto-slide with hover pause
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

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

        <div
          className={styles.slider}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button className={styles.navBtn} onClick={prev} aria-label="Previous testimonial">
            ←
          </button>

          <div className={styles.cardWrapper}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                className={styles.card}
                initial={{ opacity: 0, scale: 0.95, x: 40 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -40 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Decorative quote mark */}
                <span className={styles.decorativeQuote}>"</span>

                {/* Animated stars */}
                <div className={styles.stars}>
                  {Array.from({ length: t.rating }, (_, i) => (
                    <motion.span
                      key={i}
                      className={styles.star}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.15 + i * 0.1, duration: 0.3, type: "spring" }}
                    >
                      ★
                    </motion.span>
                  ))}
                </div>

                <motion.p
                  className={styles.quote}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  "{t.text}"
                </motion.p>

                <motion.div
                  className={styles.author}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <img src={t.avatar} alt={t.name} className={styles.avatar} />
                  <div>
                    <h4 className={styles.authorName}>{t.name}</h4>
                    <span className={styles.authorLabel}>Verified Customer</span>
                  </div>
                </motion.div>
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
