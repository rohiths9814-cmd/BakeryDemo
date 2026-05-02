import styles from "./WaveDivider.module.css";

export default function WaveDivider({ fillColor = "var(--cream-dark)", flip = false }) {
  return (
    <div
      className={styles.wrapper}
      style={flip ? { transform: "rotate(180deg)" } : undefined}
    >
      <svg
        className={styles.wave}
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={styles.wavePath}
          d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
}
