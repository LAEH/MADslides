import "../../shared/design-tokens.css";
import "./styles/global.css";
import "./styles/ddn-colors.css";
import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { Routes, Route } from "react-router-dom";
import Layout, { usePresentationMode } from "./components/Layout";
import Slide from "./components/Slide";
import { slides } from "./slides";

function SlidesContent() {
  const presentation = usePresentationMode();
  const totalSlides = slides.length;

  useEffect(() => {
    if (presentation) {
      presentation.setTotalSlides(totalSlides);
    }
  }, [presentation, totalSlides]);

  return (
    <>
      {slides.map((SlideComponent, index) => (
        <Slide key={index} index={index}>
          <SlideComponent />
        </Slide>
      ))}
    </>
  );
}

export default function TemplateEntry() {
  const params = new URLSearchParams(window.location.search);
  const isStatic = params.get("static") === "true";
  const isEmbedded = params.get("embedded") === "true";
  const themeParam = params.get("theme");

  useEffect(() => {
    // Default to dark theme, only use light if explicitly requested
    const theme = themeParam === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", theme);

    // Also add class for Tailwind
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    return () => {
      document.documentElement.removeAttribute("data-theme");
      document.documentElement.classList.remove("dark");
    };
  }, [themeParam]);

  useEffect(() => {
    if (!isStatic) return;
    document.documentElement.classList.add('static-mode');
    return () => {
      document.documentElement.classList.remove('static-mode');
    };
  }, [isStatic]);

  useEffect(() => {
    if (!isEmbedded) return;
    document.documentElement.classList.add('embedded-mode');
    return () => {
      document.documentElement.classList.remove('embedded-mode');
    };
  }, [isEmbedded]);

  return (
    <MotionConfig reducedMotion={isStatic ? "always" : "never"}>
      <Layout>
        <Routes>
          <Route path="*" element={<SlidesContent />} />
        </Routes>
      </Layout>
    </MotionConfig>
  );
}
