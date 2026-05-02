import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import FeaturedProducts from "./components/FeaturedProducts/FeaturedProducts";
import About from "./components/About/About";
import Stats from "./components/Stats/Stats";
import Gallery from "./components/Gallery/Gallery";
import Testimonials from "./components/Testimonials/Testimonials";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import ProductModal from "./components/ProductModal/ProductModal";
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton";
import Loader from "./components/Loader/Loader";
import ScrollProgress from "./components/ScrollProgress/ScrollProgress";
import WaveDivider from "./components/WaveDivider/WaveDivider";
import MagneticCursor from "./components/MagneticCursor/MagneticCursor";

export default function App() {
  // sessionStorage: only show loader once per session
  const [loading, setLoading] = useState(() => {
    if (sessionStorage.getItem("sweet-crumbs-loaded")) return false;
    return true;
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Loading timer
  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("sweet-crumbs-loaded", "true");
    }, 2200);
    return () => clearTimeout(timer);
  }, [loading]);

  // Dark mode
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProduct]);

  return (
    <>
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <MagneticCursor />
          <ScrollProgress />
          <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />

          <main>
            <Hero />
            <WaveDivider fillColor="var(--cream)" />

            <FeaturedProducts onOpenProduct={setSelectedProduct} />
            <WaveDivider fillColor="var(--cream-dark)" />

            <About />
            <WaveDivider fillColor="var(--dark-brown)" flip={false} />

            <Stats />
            <WaveDivider fillColor="var(--cream)" flip={true} />

            <Gallery />
            <WaveDivider fillColor="var(--cream-dark)" />

            <Testimonials />
            <WaveDivider fillColor="var(--cream)" />

            <Contact />
          </main>

          <Footer />
          <WhatsAppButton />

          <AnimatePresence>
            {selectedProduct && (
              <ProductModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
}
