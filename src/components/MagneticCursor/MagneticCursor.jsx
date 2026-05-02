import { useEffect, useRef, useState } from "react";
import styles from "./MagneticCursor.module.css";

export default function MagneticCursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const outerPos = useRef({ x: -100, y: -100 });
  const animRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      document.body.classList.remove(styles.hideCursor);
      return;
    }

    document.body.classList.add(styles.hideCursor);

    const onMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseOver = (e) => {
      const el = e.target.closest("a, button, [role='button'], input, textarea, select");
      setIsHovering(!!el);
    };

    const animate = () => {
      // Lerp for outer ring (0.12s lag effect)
      const lerp = 0.15;
      outerPos.current.x += (pos.current.x - outerPos.current.x) * lerp;
      outerPos.current.y += (pos.current.y - outerPos.current.y) * lerp;

      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${outerPos.current.x}px, ${outerPos.current.y}px) translate(-50%, -50%)`;
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }

      animRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseover", onMouseOver);
    animRef.current = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove(styles.hideCursor);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(animRef.current);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      <div
        ref={outerRef}
        className={`${styles.outer} ${isHovering ? styles.outerHover : ""} ${isClicking ? styles.outerClick : ""}`}
      />
      <div
        ref={innerRef}
        className={`${styles.inner} ${isClicking ? styles.innerClick : ""}`}
      />
    </>
  );
}
