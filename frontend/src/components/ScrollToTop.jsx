import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      data-testid="scroll-to-top"
      className="fixed bottom-6 right-6 z-50 w-10 h-10 bg-gray-900/80 dark:bg-white/80 text-white dark:text-gray-900 rounded-full shadow-lg backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform"
      aria-label="Terug naar boven"
    >
      <ChevronUp size={20} />
    </button>
  );
};

export default ScrollToTop;
