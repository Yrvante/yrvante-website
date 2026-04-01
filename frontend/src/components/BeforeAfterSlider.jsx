import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../App";
import { GripVertical } from "lucide-react";

const BeforeAfterSlider = () => {
  const { language } = useLanguage();
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.min(Math.max((x / rect.width) * 100, 5), 95);
    setSliderPos(pct);
  }, []);

  const onMouseDown = () => { dragging.current = true; };
  const onMouseMove = (e) => { if (dragging.current) handleMove(e.clientX); };
  const onMouseUp = () => { dragging.current = false; };
  const onTouchMove = (e) => { handleMove(e.touches[0].clientX); };

  return (
    <section data-testid="before-after-section" className="py-24 lg:py-32">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 mb-4">(11)</p>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter dark:text-white mb-4">
            {language === "nl" ? "VOOR & NA" : "BEFORE & AFTER"}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            {language === "nl"
              ? "Sleep de slider om het verschil te zien. Van verouderd naar modern."
              : "Drag the slider to see the difference. From outdated to modern."}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden border border-gray-200 dark:border-neutral-700 cursor-col-resize select-none shadow-xl"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchMove={onTouchMove}
            data-testid="before-after-slider"
          >
            {/* AFTER - modern website (full background) */}
            <div className="absolute inset-0 bg-white dark:bg-neutral-900">
              <div className="h-full p-6 sm:p-10 flex flex-col">
                {/* Modern nav */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gray-800 dark:bg-gray-200" />
                    <span className="text-sm font-bold text-gray-800 dark:text-gray-200">DeVries Bouw</span>
                  </div>
                  <div className="hidden sm:flex gap-4">
                    {["Home", "Diensten", "Over", "Contact"].map((t) => (
                      <span key={t} className="text-xs text-gray-500">{t}</span>
                    ))}
                  </div>
                  <div className="w-20 h-8 bg-gray-800 dark:bg-gray-200 rounded-full" />
                </div>
                {/* Modern hero */}
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                    {language === "nl" ? "Vakwerk sinds 1998" : "Craftsmanship since 1998"}
                  </p>
                  <h3 className="text-2xl sm:text-4xl font-black text-gray-900 dark:text-white leading-tight mb-4">
                    {language === "nl" ? "Bouw met vertrouwen" : "Build with confidence"}
                  </h3>
                  <div className="flex gap-3">
                    <div className="px-5 py-2.5 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 text-xs font-bold rounded-full">
                      {language === "nl" ? "Offerte aanvragen" : "Request quote"}
                    </div>
                    <div className="px-5 py-2.5 border border-gray-300 dark:border-neutral-600 text-xs font-bold rounded-full text-gray-600 dark:text-gray-400">
                      {language === "nl" ? "Projecten" : "Projects"}
                    </div>
                  </div>
                </div>
                {/* Modern stats */}
                <div className="flex gap-6 mt-auto">
                  {[
                    { n: "250+", l: language === "nl" ? "Projecten" : "Projects" },
                    { n: "15+", l: language === "nl" ? "Jaar ervaring" : "Years experience" },
                    { n: "4.9", l: "Google" },
                  ].map((s) => (
                    <div key={s.l}>
                      <p className="text-lg font-black text-gray-900 dark:text-white">{s.n}</p>
                      <p className="text-xs text-gray-400">{s.l}</p>
                    </div>
                  ))}
                </div>
                {/* Label */}
                <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-green-500 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                  {language === "nl" ? "Na" : "After"}
                </div>
              </div>
            </div>

            {/* BEFORE - outdated website (clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <div
                className="h-full bg-gray-100 dark:bg-neutral-800"
                style={{ width: containerRef.current ? containerRef.current.offsetWidth : "100%" }}
              >
                <div className="h-full p-6 sm:p-10 flex flex-col" style={{ minWidth: "100%" }}>
                  {/* Old nav */}
                  <div className="flex items-center justify-between mb-6 border-b-2 border-gray-300 dark:border-neutral-600 pb-3">
                    <span className="text-lg font-bold text-gray-600 dark:text-gray-400" style={{ fontFamily: "Times New Roman, serif" }}>
                      De Vries Bouw
                    </span>
                    <div className="flex gap-3">
                      {["HOME", "OVER ONS", "DIENSTEN", "CONTACT"].map((t) => (
                        <span key={t} className="text-[10px] text-gray-500 underline">{t}</span>
                      ))}
                    </div>
                  </div>
                  {/* Old content */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h3
                      className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-3"
                      style={{ fontFamily: "Times New Roman, serif" }}
                    >
                      {language === "nl" ? "Welkom bij De Vries Bouw" : "Welcome to De Vries Construction"}
                    </h3>
                    <div className="space-y-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-3 bg-gray-300 dark:bg-neutral-600 rounded" style={{ width: `${80 - i * 15}%` }} />
                      ))}
                    </div>
                    <div className="mt-6 px-4 py-2 bg-gray-400 text-white text-xs inline-block rounded-sm w-fit" style={{ fontFamily: "Arial" }}>
                      {language === "nl" ? "KLIK HIER" : "CLICK HERE"}
                    </div>
                  </div>
                  {/* Old counter */}
                  <div className="mt-auto">
                    <div className="h-px bg-gray-300 dark:bg-neutral-600 mb-3" />
                    <p className="text-xs text-gray-400" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                      {language === "nl" ? "U bent bezoeker nummer 12.847" : "You are visitor number 12,847"}
                    </p>
                  </div>
                  {/* Label */}
                  <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-gray-500 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                    {language === "nl" ? "Voor" : "Before"}
                  </div>
                </div>
              </div>
            </div>

            {/* Slider handle */}
            <div
              className="absolute top-0 bottom-0 z-10"
              style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
            >
              <div className="w-0.5 h-full bg-white shadow-lg" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-200">
                <GripVertical size={18} className="text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;
