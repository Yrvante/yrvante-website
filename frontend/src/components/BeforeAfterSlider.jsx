import React, { useState, useRef, useCallback } from "react";
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
    const pct = Math.min(Math.max((x / rect.width) * 100, 2), 98);
    setSliderPos(pct);
  }, []);

  const onMouseDown = () => { dragging.current = true; };
  const onMouseMove = (e) => { if (dragging.current) handleMove(e.clientX); };
  const onMouseUp = () => { dragging.current = false; };
  const onTouchStart = () => { dragging.current = true; };
  const onTouchMove = (e) => { if (dragging.current) handleMove(e.touches[0].clientX); };

  return (
    <section data-testid="before-after-section" className="py-24 lg:py-32">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 mb-4">&nbsp;</p>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter dark:text-white mb-3">
            {language === "nl" ? "VOOR & NA" : "BEFORE & AFTER"}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm">
            {language === "nl"
              ? "Sleep de slider om het verschil te zien."
              : "Drag the slider to see the difference."}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div
            ref={containerRef}
            className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden border border-gray-200 dark:border-neutral-700 cursor-col-resize select-none shadow-2xl"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onMouseUp}
            data-testid="before-after-slider"
          >
            {/* === AFTER - Extremely beautiful modern website (full background) === */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
              <div className="h-full flex flex-col">
                {/* Modern sleek navigation */}
                <div className="flex items-center justify-between px-6 sm:px-10 py-4 border-b border-gray-100 dark:border-neutral-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 flex items-center justify-center">
                      <span className="text-white dark:text-gray-900 text-[10px] font-black">DV</span>
                    </div>
                    <span className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">DeVries</span>
                    <span className="text-sm text-gray-400 font-light">Bouw</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-5">
                    {(language === "nl" ? ["Home", "Projecten", "Over ons", "Contact"] : ["Home", "Projects", "About", "Contact"]).map((t) => (
                      <span key={t} className="text-[11px] text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-default transition-colors">{t}</span>
                    ))}
                    <div className="px-4 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] font-bold rounded-full">
                      {language === "nl" ? "Offerte" : "Quote"}
                    </div>
                  </div>
                </div>

                {/* Modern hero section */}
                <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 py-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="lg:flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500">
                          {language === "nl" ? "Beschikbaar voor projecten" : "Available for projects"}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl lg:text-4xl font-black text-gray-900 dark:text-white leading-[1.1] tracking-tight mb-3">
                        {language === "nl" ? (
                          <><span className="block">Vakmanschap</span><span className="block text-gray-400">sinds 1998</span></>
                        ) : (
                          <><span className="block">Craftsmanship</span><span className="block text-gray-400">since 1998</span></>
                        )}
                      </h3>
                      <p className="text-xs text-gray-500 max-w-xs mb-4 leading-relaxed">
                        {language === "nl"
                          ? "Van renovatie tot nieuwbouw. Wij bouwen met oog voor detail en passie voor kwaliteit."
                          : "From renovation to new builds. We build with attention to detail and passion for quality."}
                      </p>
                      <div className="flex gap-2">
                        <div className="px-5 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] font-bold rounded-full">
                          {language === "nl" ? "Bekijk projecten" : "View projects"}
                        </div>
                        <div className="px-5 py-2 border border-gray-300 dark:border-neutral-600 text-[10px] font-bold rounded-full text-gray-600 dark:text-gray-400">
                          {language === "nl" ? "Neem contact op" : "Get in touch"}
                        </div>
                      </div>
                    </div>
                    {/* Stats cards */}
                    <div className="hidden lg:grid grid-cols-2 gap-2 max-w-[200px]">
                      {[
                        { n: "250+", l: language === "nl" ? "Projecten" : "Projects" },
                        { n: "15+", l: language === "nl" ? "Jaar" : "Years" },
                        { n: "4.9", l: "Google" },
                        { n: "100%", l: language === "nl" ? "Garantie" : "Guarantee" },
                      ].map((s) => (
                        <div key={s.l} className="bg-gray-50 dark:bg-neutral-800 rounded-xl p-3 text-center">
                          <p className="text-lg font-black text-gray-900 dark:text-white leading-none">{s.n}</p>
                          <p className="text-[8px] text-gray-400 mt-0.5 uppercase tracking-wider">{s.l}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modern services bar */}
                <div className="flex gap-2 px-6 sm:px-10 pb-6">
                  {(language === "nl"
                    ? ["Nieuwbouw", "Renovatie", "Verbouwing", "Aanbouw"]
                    : ["New Build", "Renovation", "Extension", "Remodel"]
                  ).map((s, i) => (
                    <div key={i} className="flex-1 bg-gray-50 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl p-3 border border-gray-100 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-500 transition-colors">
                      <p className="text-[10px] font-bold text-gray-800 dark:text-gray-200">{s}</p>
                      <div className="h-1 w-1/2 bg-gray-200 dark:bg-neutral-600 rounded mt-1.5" />
                    </div>
                  ))}
                </div>

                {/* After label */}
                <div className="absolute bottom-3 right-3 px-3 py-1 bg-green-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow-lg">
                  {language === "nl" ? "Na — Yrvante" : "After — Yrvante"}
                </div>
              </div>
            </div>

            {/* === BEFORE - Truly ugly outdated website (clipped) === */}
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
              <div className="h-full bg-gradient-to-b from-[#f5f0e8] to-[#e8e0d0] dark:from-[#2a2520] dark:to-[#1a1510]" style={{ width: containerRef.current ? containerRef.current.offsetWidth : "100vw", minWidth: "100%" }}>
                <div className="h-full flex flex-col">
                  {/* Ugly old navigation with gradient */}
                  <div className="px-4 py-2" style={{ background: "linear-gradient(to bottom, #4a4a4a, #2a2a2a)" }}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-yellow-300 font-bold" style={{ fontFamily: "Times New Roman, serif", textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}>
                        De Vries Bouw
                      </span>
                      <div className="flex gap-2">
                        {["HOME", "OVER ONS", "DIENSTEN", "CONTACT"].map((t) => (
                          <span key={t} className="text-[8px] text-gray-300 underline px-1 hover:text-yellow-200" style={{ fontFamily: "Arial, sans-serif" }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Ugly marquee */}
                  <div className="bg-yellow-400 px-3 py-0.5 overflow-hidden">
                    <p className="text-[9px] text-black font-bold whitespace-nowrap animate-pulse" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                      {language === "nl" ? "*** NIEUW! Bel nu voor een GRATIS offerte! Tel: 06-12345678 ***" : "*** NEW! Call now for a FREE quote! Tel: 06-12345678 ***"}
                    </p>
                  </div>

                  {/* Old content area */}
                  <div className="flex-1 px-4 py-4 flex flex-col">
                    {/* Ugly centered heading */}
                    <div className="text-center mb-3">
                      <h3 className="text-lg text-[#333] dark:text-[#cba]" style={{ fontFamily: "Times New Roman, serif" }}>
                        {language === "nl" ? "Welkom bij De Vries Bouw!" : "Welcome to De Vries Construction!"}
                      </h3>
                      <div className="w-32 h-0.5 bg-yellow-600 mx-auto mt-1" />
                    </div>

                    {/* Ugly misaligned content */}
                    <div className="flex gap-3 flex-1">
                      <div className="flex-1">
                        <p className="text-[10px] text-gray-600 dark:text-gray-500 mb-2 leading-relaxed" style={{ fontFamily: "Arial, sans-serif" }}>
                          {language === "nl"
                            ? "Wij zijn een familiebedrijf gespecialiseerd in allerlei bouwwerkzaamheden. Neem gerust contact met ons op voor meer informatie of een vrijblijvende offerte."
                            : "We are a family business specialized in all kinds of construction work. Feel free to contact us for more information or a free quote."}
                        </p>
                        {/* Ugly table */}
                        <div className="border border-gray-400 text-[8px]" style={{ fontFamily: "Courier New, monospace" }}>
                          <div className="flex bg-gray-300 dark:bg-gray-600">
                            <div className="flex-1 p-1 border-r border-gray-400 font-bold text-gray-700 dark:text-gray-300">{language === "nl" ? "Dienst" : "Service"}</div>
                            <div className="flex-1 p-1 font-bold text-gray-700 dark:text-gray-300">{language === "nl" ? "Prijs" : "Price"}</div>
                          </div>
                          {[
                            [language === "nl" ? "Renovatie" : "Renovation", language === "nl" ? "Bel voor prijs" : "Call for price"],
                            [language === "nl" ? "Nieuwbouw" : "New Build", language === "nl" ? "Offerte" : "Quote"],
                            [language === "nl" ? "Verbouw" : "Remodel", "???"],
                          ].map(([s, p], i) => (
                            <div key={i} className="flex border-t border-gray-400">
                              <div className="flex-1 p-1 border-r border-gray-400 text-gray-600 dark:text-gray-400">{s}</div>
                              <div className="flex-1 p-1 text-gray-600 dark:text-gray-400">{p}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Ugly sidebar */}
                      <div className="hidden sm:block w-28 flex-shrink-0 space-y-2">
                        <div className="bg-red-600 text-white text-center p-2 rounded-sm animate-pulse">
                          <p className="text-[8px] font-bold" style={{ fontFamily: "Impact, sans-serif" }}>ACTIE!</p>
                          <p className="text-[7px]">10% KORTING</p>
                        </div>
                        <div className="bg-gray-200 dark:bg-gray-700 p-2 text-center">
                          <p className="text-[8px] text-gray-500" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                            {language === "nl" ? "Bezoeker #12.847" : "Visitor #12,847"}
                          </p>
                          <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-sm mx-auto mt-1" />
                        </div>
                        <div className="bg-blue-900 text-white p-1.5 text-center">
                          <p className="text-[7px]" style={{ fontFamily: "Arial" }}>
                            {language === "nl" ? "KLIK HIER VOOR INFO" : "CLICK HERE FOR INFO"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Ugly footer */}
                    <div className="mt-auto pt-2 border-t border-gray-400">
                      <div className="flex justify-between items-center">
                        <p className="text-[8px] text-gray-500" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                          {language === "nl" ? "Laatst bijgewerkt: 14 maart 2009" : "Last updated: March 14, 2009"}
                        </p>
                        <div className="flex gap-1">
                          <div className="w-4 h-4 bg-blue-800 rounded-sm" />
                          <div className="w-4 h-4 bg-red-600 rounded-sm" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Before label */}
                  <div className="absolute bottom-3 left-3 px-3 py-1 bg-gray-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow-lg">
                    {language === "nl" ? "Voor" : "Before"}
                  </div>
                </div>
              </div>
            </div>

            {/* Slider handle */}
            <div className="absolute top-0 bottom-0 z-10" style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}>
              <div className="w-0.5 h-full bg-white shadow-[0_0_8px_rgba(0,0,0,0.3)]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-200 hover:scale-110 transition-transform">
                <GripVertical size={16} className="text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;
