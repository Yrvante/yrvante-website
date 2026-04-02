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
            {/* === AFTER - Professional, expanded modern website === */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#fafafa] via-white to-[#f5f5f5] dark:from-[#0a0a0a] dark:via-[#111] dark:to-[#0a0a0a]">
              <div className="h-full flex flex-col">
                {/* Premium navigation */}
                <div className="flex items-center justify-between px-6 sm:px-10 py-3.5 bg-white/90 dark:bg-black/90 backdrop-blur-xl border-b border-gray-100/80 dark:border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                      <span className="text-white text-[11px] font-black tracking-tight">DV</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold tracking-tight text-gray-900 dark:text-white leading-none">DeVries</span>
                      <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-medium uppercase tracking-[0.15em]">Bouwgroep</span>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-6">
                    {(language === "nl" ? ["Projecten", "Diensten", "Over ons", "Blog"] : ["Projects", "Services", "About", "Blog"]).map((t) => (
                      <span key={t} className="text-[11px] text-gray-500 dark:text-gray-400 font-medium cursor-default">{t}</span>
                    ))}
                    <div className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold rounded-full shadow-lg shadow-emerald-600/25 transition-all">
                      {language === "nl" ? "Gratis offerte" : "Free quote"}
                    </div>
                  </div>
                </div>

                {/* Hero with image grid */}
                <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 py-5">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                    <div className="lg:flex-1 lg:max-w-[55%]">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 rounded-full mb-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[9px] uppercase tracking-[0.15em] text-emerald-700 dark:text-emerald-400 font-semibold">
                          {language === "nl" ? "Nu beschikbaar" : "Now available"}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl lg:text-[2.5rem] font-black text-gray-900 dark:text-white leading-[1.05] tracking-tight mb-3">
                        {language === "nl" ? (
                          <><span className="block">Wij bouwen jouw</span><span className="block bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">droomproject.</span></>
                        ) : (
                          <><span className="block">We build your</span><span className="block bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">dream project.</span></>
                        )}
                      </h3>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 max-w-xs mb-4 leading-relaxed">
                        {language === "nl"
                          ? "Al 25+ jaar de betrouwbare partner voor nieuwbouw, renovatie en verbouwingen in heel Nederland."
                          : "For 25+ years the reliable partner for new builds, renovations and remodeling across the Netherlands."}
                      </p>
                      <div className="flex gap-2">
                        <div className="px-5 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] font-bold rounded-full shadow-lg">
                          {language === "nl" ? "Bekijk projecten" : "View projects"}
                        </div>
                        <div className="px-5 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[10px] font-bold rounded-full text-gray-700 dark:text-gray-300 shadow-sm">
                          {language === "nl" ? "Neem contact op" : "Get in touch"}
                        </div>
                      </div>
                      {/* Trust bar */}
                      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-white/5">
                        <div className="flex -space-x-2">
                          {["bg-emerald-400", "bg-teal-400", "bg-cyan-400", "bg-sky-400"].map((c, i) => (
                            <div key={i} className={`w-6 h-6 rounded-full ${c} border-2 border-white dark:border-gray-900`} />
                          ))}
                        </div>
                        <div>
                          <div className="flex gap-0.5">
                            {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-400 text-[10px]">&#9733;</span>)}
                          </div>
                          <p className="text-[8px] text-gray-400">
                            {language === "nl" ? "350+ tevreden klanten" : "350+ satisfied clients"}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Project showcase grid */}
                    <div className="hidden lg:grid grid-cols-2 gap-2 lg:flex-1">
                      {[
                        { bg: "from-amber-100 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/20", label: language === "nl" ? "Villa Bloemendaal" : "Villa Bloemendaal", tag: language === "nl" ? "Nieuwbouw" : "New Build" },
                        { bg: "from-sky-100 to-blue-50 dark:from-sky-900/30 dark:to-blue-900/20", label: language === "nl" ? "Kantoor Amsterdam" : "Office Amsterdam", tag: language === "nl" ? "Renovatie" : "Renovation" },
                        { bg: "from-emerald-100 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/20", label: language === "nl" ? "Woning Utrecht" : "Home Utrecht", tag: "Verbouwing" },
                        { bg: "from-purple-100 to-violet-50 dark:from-purple-900/30 dark:to-violet-900/20", label: language === "nl" ? "Penthouse Den Haag" : "Penthouse The Hague", tag: "Aanbouw" },
                      ].map((p, i) => (
                        <div key={i} className={`bg-gradient-to-br ${p.bg} rounded-2xl p-3 border border-white/50 dark:border-white/5`}>
                          <div className="w-full aspect-[4/3] bg-white/40 dark:bg-white/5 rounded-xl mb-2" />
                          <p className="text-[10px] font-bold text-gray-800 dark:text-gray-200 leading-none">{p.label}</p>
                          <span className="text-[8px] text-gray-500 dark:text-gray-500">{p.tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Services bar */}
                <div className="grid grid-cols-4 gap-2 px-6 sm:px-10 pb-5">
                  {(language === "nl"
                    ? [{ t: "Nieuwbouw", s: "Vanaf ontwerp" }, { t: "Renovatie", s: "Met garantie" }, { t: "Verduurzaming", s: "Energielabel A" }, { t: "Interieur", s: "Totaalconcept" }]
                    : [{ t: "New Build", s: "From design" }, { t: "Renovation", s: "Guaranteed" }, { t: "Sustainability", s: "Energy label A" }, { t: "Interior", s: "Full concept" }]
                  ).map((s, i) => (
                    <div key={i} className="bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm rounded-xl p-3 border border-gray-100/80 dark:border-white/5 hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors group">
                      <p className="text-[10px] font-bold text-gray-800 dark:text-gray-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">{s.t}</p>
                      <p className="text-[8px] text-gray-400 mt-0.5">{s.s}</p>
                    </div>
                  ))}
                </div>

                {/* After label */}
                <div className="absolute bottom-3 right-3 px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow-lg shadow-emerald-500/30">
                  {language === "nl" ? "Na — Professioneel" : "After — Professional"}
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
