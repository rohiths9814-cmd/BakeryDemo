import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./Stats.module.css";

const stats = [
  { number: 500, suffix: "+", label: "Happy Customers", icon: "😊" },
  { number: 50, suffix: "+", label: "Menu Items", icon: "🧁" },
  { number: 5, suffix: "+", label: "Years of Baking", icon: "🎂" },
  { number: 100, suffix: "%", label: "Fresh Daily", icon: "🌿" },
];

function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

function AnimatedCounter({ target, suffix, duration = 2000, start }) {
  const [count, setCount] = useState(0);
  const startTimeRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    if (!start) return;

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);

      setCount(Math.round(easedProgress * target));

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      }
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [start, target, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={`container ${styles.grid}`}>
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className={styles.statBlock}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: i * 0.1,
              ease: [0.215, 0.61, 0.355, 1],
            }}
          >
            <span className={styles.icon}>{stat.icon}</span>
            <h3 className={styles.number}>
              <AnimatedCounter
                target={stat.number}
                suffix={stat.suffix}
                start={isInView}
              />
            </h3>
            <div
              className={`${styles.underline} ${isInView ? styles.underlineActive : ""}`}
              style={{ transitionDelay: `${0.8 + i * 0.15}s` }}
            />
            <p className={styles.label}>{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
