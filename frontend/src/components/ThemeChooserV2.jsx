import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, useLanguage } from "../App";

const ICON = "/yrvante-logo-code.png";

const ThemeChooserV2 = () => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(null);
  const { setTheme } = useTheme();
  const { language } = useLanguage();

  useEffect(() => {
    const hasChosen = localStorage.getItem("theme_chosen");
    if (!hasChosen) {
      const timer = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const choose = (mode) => {
    setTheme(mode);
    localStorage.setItem("theme_chosen", "true");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999]"
            style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%)", backdropFilter: "blur(12px)" }}
            onClick={() => choose("light")}
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 250, damping: 22, delay: 0.15 }}
            className="fixed z-[10000] inset-0 flex items-center justify-center pointer-events-none px-5"
            data-testid="theme-chooser"
          >
            <div className="pointer-events-auto w-full max-w-[440px]">
              {/* Main visual card */}
              <div className="rounded-[32px] overflow-hidden shadow-2xl" style={{ boxShadow: "0 25px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08)" }}>
                <div className="flex" style={{ height: 340 }}>

                  {/* ═══ SUN / LIGHT ═══ */}
                  <motion.button
                    onClick={() => choose("light")}
                    onMouseEnter={() => setHovered("light")}
                    onMouseLeave={() => setHovered(null)}
                    animate={{ flex: hovered === "light" ? 1.4 : hovered === "dark" ? 0.6 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="relative overflow-hidden cursor-pointer border-0 outline-none"
                    style={{ background: "linear-gradient(170deg, #7EC8E3 0%, #A8D8EA 25%, #FEE9B2 70%, #FDDFA8 100%)" }}
                  >
                    {/* Floating clouds */}
                    <motion.div
                      animate={{ x: [-5, 18, -5], y: [0, -3, 0] }}
                      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute rounded-full"
                      style={{ top: "14%", left: "-8%", width: 90, height: 32, background: "radial-gradient(ellipse, rgba(255,255,255,0.85) 50%, transparent 100%)" }}
                    />
                    <motion.div
                      animate={{ x: [5, -12, 5] }}
                      transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                      className="absolute rounded-full"
                      style={{ top: "60%", right: "-5%", width: 70, height: 24, background: "radial-gradient(ellipse, rgba(255,255,255,0.6) 50%, transparent 100%)" }}
                    />
                    <motion.div
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                      className="absolute rounded-full"
                      style={{ top: "80%", left: "10%", width: 55, height: 20, background: "radial-gradient(ellipse, rgba(255,255,255,0.45) 50%, transparent 100%)" }}
                    />

                    {/* Sun content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      {/* Rotating rays */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="absolute"
                        style={{
                          width: 160, height: 160,
                          background: "conic-gradient(from 0deg, transparent 0%, rgba(255,210,80,0.25) 5%, transparent 10%, transparent 15%, rgba(255,210,80,0.25) 20%, transparent 25%, transparent 30%, rgba(255,210,80,0.25) 35%, transparent 40%, transparent 45%, rgba(255,210,80,0.25) 50%, transparent 55%, transparent 60%, rgba(255,210,80,0.25) 65%, transparent 70%, transparent 75%, rgba(255,210,80,0.25) 80%, transparent 85%, transparent 90%, rgba(255,210,80,0.25) 95%, transparent 100%)",
                          borderRadius: "50%",
                          top: "50%", left: "50%", transform: "translate(-50%, -58%)",
                        }}
                      />
                      {/* Sun body */}
                      <motion.div
                        animate={{ scale: [1, 1.06, 1] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <div
                          className="w-[88px] h-[88px] rounded-full flex items-center justify-center"
                          style={{
                            background: "radial-gradient(circle at 40% 35%, #FFE599 0%, #FFD54F 35%, #FFAB00 100%)",
                            boxShadow: "0 0 50px rgba(255,171,0,0.45), 0 0 100px rgba(255,171,0,0.15), inset 0 -4px 12px rgba(200,130,0,0.2)",
                          }}
                        >
                          <img
                            src={ICON}
                            alt="Y"
                            className="w-11 h-11 object-contain"
                            style={{ filter: "brightness(0.15) sepia(1) saturate(5) hue-rotate(10deg)" }}
                          />
                        </div>
                      </motion.div>

                      {/* Label */}
                      <motion.span
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-6 text-[13px] font-semibold tracking-[0.15em] uppercase"
                        style={{ color: "rgba(120,70,0,0.75)" }}
                      >
                        {language === "nl" ? "Licht" : "Light"}
                      </motion.span>
                    </div>
                  </motion.button>

                  {/* ═══ Subtle center divider ═══ */}
                  <div className="w-[1px] relative z-10" style={{ background: "linear-gradient(180deg, transparent 5%, rgba(255,255,255,0.15) 50%, transparent 95%)" }} />

                  {/* ═══ MOON / DARK ═══ */}
                  <motion.button
                    onClick={() => choose("dark")}
                    onMouseEnter={() => setHovered("dark")}
                    onMouseLeave={() => setHovered(null)}
                    animate={{ flex: hovered === "dark" ? 1.4 : hovered === "light" ? 0.6 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="relative overflow-hidden cursor-pointer border-0 outline-none"
                    style={{ background: "linear-gradient(170deg, #070B1E 0%, #0E1538 40%, #141C42 70%, #1A2050 100%)" }}
                  >
                    {/* Stars */}
                    {[
                      { t: "8%", l: "18%", d: 0, s: 2.5, dur: 2.8 },
                      { t: "15%", l: "68%", d: 1.2, s: 1.5, dur: 3.2 },
                      { t: "25%", l: "40%", d: 2.5, s: 2, dur: 2.4 },
                      { t: "32%", l: "82%", d: 0.6, s: 1, dur: 3.5 },
                      { t: "45%", l: "12%", d: 1.8, s: 1.5, dur: 2.9 },
                      { t: "52%", l: "58%", d: 3.2, s: 2, dur: 3.1 },
                      { t: "60%", l: "30%", d: 0.3, s: 1, dur: 2.6 },
                      { t: "68%", l: "75%", d: 2.0, s: 2.5, dur: 3.4 },
                      { t: "78%", l: "48%", d: 1.0, s: 1.5, dur: 2.7 },
                      { t: "82%", l: "20%", d: 2.8, s: 1, dur: 3.0 },
                      { t: "88%", l: "88%", d: 0.8, s: 2, dur: 3.3 },
                      { t: "20%", l: "90%", d: 1.5, s: 1.5, dur: 2.5 },
                      { t: "72%", l: "5%", d: 3.5, s: 2, dur: 2.8 },
                      { t: "38%", l: "50%", d: 0.2, s: 1, dur: 3.6 },
                    ].map((s, i) => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.15, 0.9, 0.15] }}
                        transition={{ duration: s.dur, repeat: Infinity, delay: s.d, ease: "easeInOut" }}
                        className="absolute rounded-full bg-white"
                        style={{ top: s.t, left: s.l, width: s.s, height: s.s }}
                      />
                    ))}

                    {/* Moon content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      {/* Moon outer glow ring */}
                      <motion.div
                        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute rounded-full"
                        style={{
                          width: 110, height: 110,
                          border: "1px solid rgba(200,210,230,0.15)",
                          top: "50%", left: "50%", transform: "translate(-50%, -58%)",
                          boxShadow: "0 0 40px rgba(180,195,220,0.08)",
                        }}
                      />
                      {/* Moon body */}
                      <motion.div
                        animate={{ scale: [1, 1.04, 1] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <div
                          className="w-[88px] h-[88px] rounded-full flex items-center justify-center relative"
                          style={{
                            background: "radial-gradient(circle at 38% 32%, #CFD8DC 0%, #90A4AE 40%, #607D8B 85%, #455A64 100%)",
                            boxShadow: "0 0 45px rgba(176,190,197,0.3), 0 0 90px rgba(176,190,197,0.08), inset 0 2px 8px rgba(255,255,255,0.12)",
                          }}
                        >
                          {/* Craters */}
                          <div className="absolute w-4 h-4 rounded-full" style={{ background: "radial-gradient(circle, rgba(69,90,100,0.3), transparent)", top: "14%", left: "20%" }} />
                          <div className="absolute w-2.5 h-2.5 rounded-full" style={{ background: "radial-gradient(circle, rgba(69,90,100,0.25), transparent)", bottom: "20%", right: "16%" }} />
                          <div className="absolute w-2 h-2 rounded-full" style={{ background: "radial-gradient(circle, rgba(69,90,100,0.2), transparent)", top: "55%", left: "12%" }} />
                          <img
                            src={ICON}
                            alt="Y"
                            className="w-11 h-11 object-contain relative z-10"
                            style={{ filter: "brightness(0) invert(1) drop-shadow(0 0 6px rgba(255,255,255,0.5))" }}
                          />
                        </div>
                      </motion.div>

                      {/* Label */}
                      <motion.span
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mt-6 text-[13px] font-semibold tracking-[0.15em] uppercase"
                        style={{ color: "rgba(176,190,210,0.7)" }}
                      >
                        {language === "nl" ? "Donker" : "Dark"}
                      </motion.span>
                    </div>
                  </motion.button>
                </div>

                {/* Bottom strip */}
                <div
                  className="py-3.5 text-center"
                  style={{ background: "linear-gradient(90deg, #FEF3D0 0%, #E3E7F0 50%, #D0D6E8 100%)" }}
                >
                  <p className="text-[10px] font-medium tracking-[0.25em] uppercase" style={{ color: "rgba(80,80,100,0.5)" }}>
                    {language === "nl" ? "Kies je ervaring" : "Choose your experience"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ThemeChooserV2;
