import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Floating geometric shapes component
export const FloatingShapes = () => {
  const shapes = [
    { type: 'circle', size: 6, x: '10%', y: '20%', duration: 20 },
    { type: 'square', size: 8, x: '85%', y: '15%', duration: 25 },
    { type: 'circle', size: 4, x: '75%', y: '60%', duration: 18 },
    { type: 'square', size: 5, x: '15%', y: '70%', duration: 22 },
    { type: 'circle', size: 7, x: '90%', y: '80%', duration: 28 },
    { type: 'line', size: 30, x: '5%', y: '40%', duration: 24, rotation: 45 },
    { type: 'line', size: 25, x: '95%', y: '35%', duration: 26, rotation: -30 },
    { type: 'circle', size: 3, x: '50%', y: '10%', duration: 19 },
    { type: 'square', size: 4, x: '30%', y: '85%', duration: 21 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: shape.x,
            top: shape.y,
          }}
          animate={{
            y: [0, -20, 0, 20, 0],
            x: [0, 10, 0, -10, 0],
            rotate: shape.type === 'line' ? [shape.rotation, shape.rotation + 10, shape.rotation] : 0,
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {shape.type === 'circle' && (
            <div
              className="rounded-full border border-gray-200"
              style={{ width: shape.size, height: shape.size, opacity: 0.4 }}
            />
          )}
          {shape.type === 'square' && (
            <div
              className="border border-gray-200"
              style={{ width: shape.size, height: shape.size, opacity: 0.3 }}
            />
          )}
          {shape.type === 'line' && (
            <div
              className="bg-gray-200"
              style={{ 
                width: shape.size, 
                height: 1, 
                opacity: 0.3,
                transform: `rotate(${shape.rotation}deg)` 
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

// Code-inspired decorations
export const CodeDecorations = () => {
  const decorations = [
    { text: '{', x: '3%', y: '25%', size: 48, opacity: 0.06 },
    { text: '}', x: '96%', y: '30%', size: 48, opacity: 0.06 },
    { text: '//', x: '8%', y: '55%', size: 14, opacity: 0.08 },
    { text: '</>', x: '92%', y: '65%', size: 16, opacity: 0.07 },
    { text: '( )', x: '5%', y: '80%', size: 20, opacity: 0.05 },
    { text: ';', x: '94%', y: '85%', size: 32, opacity: 0.06 },
    { text: '[ ]', x: '88%', y: '12%', size: 18, opacity: 0.05 },
    { text: '/*', x: '12%', y: '92%', size: 14, opacity: 0.07 },
    { text: '*/', x: '18%', y: '94%', size: 14, opacity: 0.07 },
    { text: '=>', x: '85%', y: '45%', size: 16, opacity: 0.06 },
    { text: '&&', x: '7%', y: '35%', size: 12, opacity: 0.05 },
    { text: '{ }', x: '93%', y: '55%', size: 14, opacity: 0.05 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {decorations.map((dec, i) => (
        <motion.span
          key={i}
          className="absolute font-mono text-black select-none"
          style={{
            left: dec.x,
            top: dec.y,
            fontSize: dec.size,
            opacity: dec.opacity,
          }}
          animate={{
            opacity: [dec.opacity, dec.opacity * 1.5, dec.opacity],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {dec.text}
        </motion.span>
      ))}
    </div>
  );
};

// Dot grid pattern
export const DotGrid = () => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    />
  );
};

// Combined background component
const BackgroundDecorations = ({ showShapes = true, showCode = true, showDots = false }) => {
  return (
    <>
      {showDots && <DotGrid />}
      {showShapes && <FloatingShapes />}
      {showCode && <CodeDecorations />}
    </>
  );
};

export default BackgroundDecorations;
