import React from 'react';
import { motion } from 'framer-motion';

// Bewegende lijnen die secties verbinden
const MovingLines = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Verticale lijn links */}
      <div className="absolute left-[8%] top-0 bottom-0 w-px">
        <motion.div
          className="absolute w-full bg-gray-200"
          style={{ height: '60px' }}
          animate={{
            top: ['0%', '100%'],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Verticale lijn rechts */}
      <div className="absolute right-[8%] top-0 bottom-0 w-px">
        <motion.div
          className="absolute w-full bg-gray-200"
          style={{ height: '80px' }}
          animate={{
            top: ['100%', '0%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Subtiele vaste lijnen als guides */}
      <div 
        className="absolute left-[8%] top-0 bottom-0 w-px bg-gray-100"
        style={{ opacity: 0.5 }}
      />
      <div 
        className="absolute right-[8%] top-0 bottom-0 w-px bg-gray-100"
        style={{ opacity: 0.5 }}
      />

      {/* Horizontale bewegende lijn bovenaan */}
      <div className="absolute top-[20%] left-0 right-0 h-px">
        <motion.div
          className="absolute h-full bg-gray-200"
          style={{ width: '100px' }}
          animate={{
            left: ['0%', '100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Horizontale bewegende lijn midden */}
      <div className="absolute top-[50%] left-0 right-0 h-px">
        <motion.div
          className="absolute h-full bg-gray-200"
          style={{ width: '80px' }}
          animate={{
            left: ['100%', '0%'],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Horizontale bewegende lijn onderaan */}
      <div className="absolute top-[80%] left-0 right-0 h-px">
        <motion.div
          className="absolute h-full bg-gray-200"
          style={{ width: '120px' }}
          animate={{
            left: ['0%', '100%'],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Subtiele vaste horizontale lijnen */}
      <div 
        className="absolute top-[20%] left-[8%] right-[8%] h-px bg-gray-100"
        style={{ opacity: 0.3 }}
      />
      <div 
        className="absolute top-[50%] left-[8%] right-[8%] h-px bg-gray-100"
        style={{ opacity: 0.3 }}
      />
      <div 
        className="absolute top-[80%] left-[8%] right-[8%] h-px bg-gray-100"
        style={{ opacity: 0.3 }}
      />

      {/* Kleine accent punten op kruispunten */}
      <motion.div
        className="absolute w-1 h-1 bg-gray-300 rounded-full"
        style={{ left: '8%', top: '20%', transform: 'translate(-50%, -50%)' }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-1 h-1 bg-gray-300 rounded-full"
        style={{ right: '8%', top: '20%', transform: 'translate(50%, -50%)' }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-1 h-1 bg-gray-300 rounded-full"
        style={{ left: '8%', top: '50%', transform: 'translate(-50%, -50%)' }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-1 h-1 bg-gray-300 rounded-full"
        style={{ right: '8%', top: '50%', transform: 'translate(50%, -50%)' }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3.2, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-1 h-1 bg-gray-300 rounded-full"
        style={{ left: '8%', top: '80%', transform: 'translate(-50%, -50%)' }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3.8, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-1 h-1 bg-gray-300 rounded-full"
        style={{ right: '8%', top: '80%', transform: 'translate(50%, -50%)' }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4.2, repeat: Infinity }}
      />
    </div>
  );
};

// Combined background component
const BackgroundDecorations = () => {
  return <MovingLines />;
};

export default BackgroundDecorations;
