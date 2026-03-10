import React from 'react';
import { motion } from 'framer-motion';

const BackgroundDecorations = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Animated gradient blobs */}
      <div className="absolute inset-0">
        {/* Large moving gradient blob 1 */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          animate={{
            x: ['-20%', '60%', '30%', '-20%'],
            y: ['-10%', '30%', '60%', '-10%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Large moving gradient blob 2 */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(0,0,0,0.025) 0%, transparent 70%)',
            filter: 'blur(50px)',
            right: 0,
          }}
          animate={{
            x: ['20%', '-40%', '0%', '20%'],
            y: ['80%', '20%', '50%', '80%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Medium blob 3 */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(0,0,0,0.02) 0%, transparent 70%)',
            filter: 'blur(30px)',
            top: '40%',
            left: '30%',
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: ['0%', '20%', '-10%', '0%'],
            y: ['0%', '-20%', '10%', '0%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Flowing wave lines */}
      <svg 
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.15 }}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#000" stopOpacity="0" />
            <stop offset="50%" stopColor="#000" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Wave 1 */}
        <motion.path
          d="M0,100 Q250,50 500,100 T1000,100 T1500,100 T2000,100"
          fill="none"
          stroke="url(#waveGradient)"
          strokeWidth="1"
          animate={{
            d: [
              "M0,100 Q250,50 500,100 T1000,100 T1500,100 T2000,100",
              "M0,100 Q250,150 500,100 T1000,100 T1500,100 T2000,100",
              "M0,100 Q250,50 500,100 T1000,100 T1500,100 T2000,100",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Wave 2 */}
        <motion.path
          d="M0,200 Q250,150 500,200 T1000,200 T1500,200 T2000,200"
          fill="none"
          stroke="url(#waveGradient)"
          strokeWidth="1"
          animate={{
            d: [
              "M0,200 Q250,150 500,200 T1000,200 T1500,200 T2000,200",
              "M0,200 Q250,250 500,200 T1000,200 T1500,200 T2000,200",
              "M0,200 Q250,150 500,200 T1000,200 T1500,200 T2000,200",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Wave 3 */}
        <motion.path
          d="M0,350 Q250,300 500,350 T1000,350 T1500,350 T2000,350"
          fill="none"
          stroke="url(#waveGradient)"
          strokeWidth="1"
          animate={{
            d: [
              "M0,350 Q250,300 500,350 T1000,350 T1500,350 T2000,350",
              "M0,350 Q250,400 500,350 T1000,350 T1500,350 T2000,350",
              "M0,350 Q250,300 500,350 T1000,350 T1500,350 T2000,350",
            ],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>

      {/* Animated circles */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-gray-200"
            style={{
              width: `${150 + i * 100}px`,
              height: `${150 + i * 100}px`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0.1 - i * 0.015,
            }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full bg-black"
          style={{
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
            left: `${10 + (i * 7)}%`,
            top: `${10 + ((i * 13) % 80)}%`,
            opacity: 0.08,
          }}
          animate={{
            y: [0, -30, 0, 30, 0],
            x: [0, 15, 0, -15, 0],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Mesh gradient overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(0,0,0,0.02) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(0,0,0,0.015) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.01) 0%, transparent 60%)
          `,
        }}
        animate={{
          opacity: [1, 0.7, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default BackgroundDecorations;
