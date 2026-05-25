import React, { useCallback, useEffect, useState } from "react";
import { EDNEX_SLIDES } from "../../data/ednexContent";
import navigate from "../action/navigate";

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((n) => {
    setCurrent((n + EDNEX_SLIDES.length) % EDNEX_SLIDES.length);
  }, []);

  const change = useCallback((dir) => goTo(current + dir), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % EDNEX_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleActionClick = (e, href) => {
    if (href?.startsWith("#")) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <div className="ednex-hero-slider" id="home">
      {EDNEX_SLIDES.map((slide, i) => (
        <div key={i} className={`ednex-slide ${i === current ? "active" : ""}`}>
          <div className="ednex-slide-bg">
            <img src={slide.image} alt={slide.eyebrow} />
          </div>
          <div className="ednex-slide-content">
            <div className="ednex-slide-eyebrow">{slide.eyebrow}</div>
            <div
              className="ednex-slide-h1"
              dangerouslySetInnerHTML={{ __html: slide.titleHtml }}
            />
            <div className="ednex-slide-actions">
              {slide.actions.map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className={`ednex-btn-hero ednex-btn-hero-${action.variant}`}
                  onClick={(e) => handleActionClick(e, action.href)}
                >
                  {action.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      ))}

      <div className="ednex-slider-arrows">
        <button
          type="button"
          className="ednex-slider-arrow prev"
          aria-label="Previous slide"
          onClick={() => change(-1)}
        >
          ←
        </button>
        <button
          type="button"
          className="ednex-slider-arrow next"
          aria-label="Next slide"
          onClick={() => change(1)}
        >
          →
        </button>
      </div>

      <div className="ednex-slider-dots">
        {EDNEX_SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`ednex-dot ${i === current ? "active" : ""}`}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
