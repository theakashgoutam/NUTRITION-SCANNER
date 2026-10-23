import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

/**
 * Realistic Citrus Slice SVG Vector Component
 * Renders an appetizing fresh-cut orange wheel with translucent pulp, rind, and highlights.
 */
export const CitrusSlice: React.FC<{
  size?: number;
  className?: string;
  rotation?: number;
}> = ({ size = 160, className = '', rotation = 0 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none pointer-events-none drop-shadow-xl ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <defs>
        {/* Outer Rind Gradient */}
        <radialGradient id="rindGrad" cx="50%" cy="50%" r="50%">
          <stop offset="85%" stopColor="#EA580C" />
          <stop offset="93%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#C2410C" />
        </radialGradient>

        {/* Inner White Pith */}
        <radialGradient id="pithGrad" cx="50%" cy="50%" r="50%">
          <stop offset="88%" stopColor="#FFFBEB" />
          <stop offset="97%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#FDBA74" />
        </radialGradient>

        {/* Juicy Pulp Segment Gradient */}
        <radialGradient id="pulpGrad" cx="50%" cy="50%" r="50%">
          <stop offset="15%" stopColor="#FDBA74" />
          <stop offset="60%" stopColor="#F97316" />
          <stop offset="95%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#C2410C" />
        </radialGradient>

        {/* Highlight Gradient */}
        <linearGradient id="shineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* Drop Shadow filter */}
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#EA580C" floodOpacity="0.25" />
        </filter>
      </defs>

      <g filter="url(#softGlow)">
        {/* Outer Orange Peel */}
        <circle cx="100" cy="100" r="96" fill="url(#rindGrad)" />

        {/* White Albedo / Pith Ring */}
        <circle cx="100" cy="100" r="88" fill="url(#pithGrad)" />

        {/* Deep Orange Background Behind Segments */}
        <circle cx="100" cy="100" r="82" fill="#FED7AA" />

        {/* 10 Citrus Segments with Natural Curves */}
        {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((angle, idx) => (
          <g key={idx} transform={`rotate(${angle} 100 100)`}>
            <path
              d="M 100 86 C 114 86, 126 76, 134 56 C 137 49, 138 38, 135 28 C 122 22, 110 20, 100 20 C 90 20, 78 22, 65 28 C 62 38, 63 49, 66 56 C 74 76, 86 86, 100 86 Z"
              fill="url(#pulpGrad)"
              transform="scale(0.92) translate(8.7, 8.7)"
            />
            {/* Pulp vesicle texture lines */}
            <path
              d="M 97 28 Q 100 48 99 74"
              stroke="#FFEDD5"
              strokeWidth="0.8"
              strokeOpacity="0.75"
              strokeLinecap="round"
            />
            <path
              d="M 93 32 Q 95 50 94 70"
              stroke="#FEF3C7"
              strokeWidth="0.6"
              strokeOpacity="0.6"
            />
            <path
              d="M 104 30 Q 103 52 102 72"
              stroke="#FEF3C7"
              strokeWidth="0.6"
              strokeOpacity="0.6"
            />
            {/* Small Seed Accent in alternate segments */}
            {idx % 3 === 0 && (
              <ellipse
                cx="100"
                cy="68"
                rx="2"
                ry="4"
                fill="#FEF3C7"
                opacity="0.85"
                transform="rotate(10 100 68)"
              />
            )}
          </g>
        ))}

        {/* Central Core (Center Star) */}
        <circle cx="100" cy="100" r="13" fill="#FFFBEB" />
        <circle cx="100" cy="100" r="6" fill="#FDBA74" />

        {/* Glassy Surface Arc Highlight */}
        <path
          d="M 24 100 A 76 76 0 0 1 154 36"
          stroke="url(#shineGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="60" cy="50" r="4" fill="#FFFFFF" opacity="0.8" />
        <circle cx="70" cy="42" r="2" fill="#FFFFFF" opacity="0.6" />
      </g>
    </svg>
  );
};

/**
 * Mint Leaf Vector Component
 */
export const MintLeaf: React.FC<{
  size?: number;
  className?: string;
  rotation?: number;
}> = ({ size = 60, className = '', rotation = 0 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none pointer-events-none drop-shadow-md ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <defs>
        <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4ADE80" />
          <stop offset="60%" stopColor="#16A34A" />
          <stop offset="100%" stopColor="#15803D" />
        </linearGradient>
      </defs>
      <path
        d="M 50 10 C 75 25, 90 55, 80 85 C 50 85, 25 75, 10 50 C 25 25, 40 10, 50 10 Z"
        fill="url(#leafGrad)"
      />
      {/* Central vein */}
      <path
        d="M 50 15 Q 50 50 78 82"
        stroke="#DCFCE7"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.8"
      />
      {/* Side veins */}
      <path d="M 48 30 Q 60 38 72 36" stroke="#DCFCE7" strokeWidth="1" opacity="0.6" />
      <path d="M 52 46 Q 66 52 76 56" stroke="#DCFCE7" strokeWidth="1" opacity="0.6" />
      <path d="M 36 44 Q 46 48 54 62" stroke="#DCFCE7" strokeWidth="1" opacity="0.6" />
    </svg>
  );
};

/**
 * Cherry Tomato Vector Accent
 */
export const CherryTomato: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 32, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none pointer-events-none drop-shadow-lg ${className}`}
    >
      <defs>
        <radialGradient id="tomatoGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#F87171" />
          <stop offset="40%" stopColor="#EF4444" />
          <stop offset="85%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#991B1B" />
        </radialGradient>
      </defs>
      <circle cx="30" cy="32" r="24" fill="url(#tomatoGrad)" />
      {/* Highlight */}
      <ellipse cx="22" cy="22" rx="6" ry="3" fill="#FFFFFF" opacity="0.75" transform="rotate(-30 22 22)" />
      {/* Calyx (green stem star) */}
      <path
        d="M 30 10 L 32 18 L 38 15 L 34 20 L 40 24 L 32 23 L 30 29 L 28 23 L 20 24 L 26 20 L 22 15 L 28 18 Z"
        fill="#15803D"
      />
      <circle cx="30" cy="20" r="2.5" fill="#166534" />
    </svg>
  );
};

/**
 * Complete Website Background as shown in the reference image:
 * Warm sunlit peach canvas with artistic floating citrus orange wheels,
 * fresh mint leaves, and subtle warm sun rays.
 */
export const WebsiteBackground: React.FC = () => {
  const { scrollY } = useScroll();
  const yParallaxSlow = useTransform(scrollY, [0, 1600], [0, -70]);
  const yParallaxMedium = useTransform(scrollY, [0, 1600], [0, 90]);
  const yParallaxFast = useTransform(scrollY, [0, 1600], [0, -130]);
  const rotateParallax = useTransform(scrollY, [0, 1600], [0, 30]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
    >
      {/* Base Warm Sunny Peach Ambient Gradient Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF9] via-[#FFF7ED] to-[#FFEDE1]" />

      {/* Sunlit Radial Glows matching reference image */}
      <div className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full bg-gradient-to-br from-amber-200/45 via-orange-300/35 to-transparent blur-[120px]" />
      <div className="absolute top-10 -right-28 w-[720px] h-[720px] rounded-full bg-gradient-to-bl from-orange-300/40 via-amber-200/35 to-transparent blur-[130px]" />
      <div className="absolute top-[45%] -left-32 w-[580px] h-[580px] rounded-full bg-gradient-to-tr from-orange-200/30 via-rose-200/20 to-transparent blur-[110px]" />
      <div className="absolute bottom-0 -right-24 w-[700px] h-[700px] rounded-full bg-gradient-to-tl from-amber-300/40 via-orange-300/30 to-transparent blur-[130px]" />

      {/* FLOATING CITRUS ORANGE ELEMENTS (Positioned exactly matching reference image with scroll parallax) */}

      {/* 1. Top Left Floating Orange Half & Slice */}
      <motion.div
        style={{ y: yParallaxSlow }}
        className="absolute -top-12 -left-12"
      >
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [0, 4, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="opacity-85 hover:opacity-100 transition-opacity"
        >
          <CitrusSlice size={210} rotation={25} />
        </motion.div>
      </motion.div>

      {/* Top Left Mint Leaf */}
      <motion.div
        style={{ y: yParallaxFast }}
        className="absolute top-28 left-28"
      >
        <motion.div
          animate={{ y: [0, -5, 0], rotate: [-10, 5, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="opacity-80"
        >
          <MintLeaf size={65} rotation={-35} />
        </motion.div>
      </motion.div>

      {/* 2. Top Right Citrus Elements (Behind Hero Food Bowl) */}
      <motion.div
        style={{ y: yParallaxMedium, rotate: rotateParallax }}
        className="absolute top-8 right-8 lg:right-24"
      >
        <motion.div
          animate={{ y: [0, 10, 0], rotate: [12, -8, 12] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="opacity-75"
        >
          <CitrusSlice size={175} rotation={-45} />
        </motion.div>
      </motion.div>

      {/* Far Right Edge Cut Orange Slice */}
      <motion.div
        style={{ y: yParallaxSlow }}
        className="absolute top-80 -right-16"
      >
        <motion.div
          animate={{ x: [0, 6, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="opacity-80"
        >
          <CitrusSlice size={190} rotation={80} />
        </motion.div>
      </motion.div>

      {/* Floating Cherry Tomato & Mint on Top Center */}
      <motion.div
        style={{ y: yParallaxFast }}
        className="absolute top-20 left-[46%] hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          className="opacity-75"
        >
          <CherryTomato size={38} />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: yParallaxMedium }}
        className="absolute top-28 left-[43%] hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 6, 0], rotate: [0, 12, 0] }}
          transition={{ duration: 6.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="opacity-70"
        >
          <MintLeaf size={50} rotation={45} />
        </motion.div>
      </motion.div>

      {/* 3. Middle Section Floating Accents */}
      <motion.div
        style={{ y: yParallaxSlow }}
        className="absolute top-[950px] -left-14"
      >
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [0, 6, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="opacity-70"
        >
          <CitrusSlice size={180} rotation={-20} />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: yParallaxFast }}
        className="absolute top-[1080px] left-16 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          className="opacity-75"
        >
          <MintLeaf size={55} rotation={75} />
        </motion.div>
      </motion.div>

      {/* 4. Bottom Right Warm Sliced Orange Accent */}
      <motion.div
        style={{ y: yParallaxSlow }}
        className="absolute -bottom-16 -right-12"
      >
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
          className="opacity-85"
        >
          <CitrusSlice size={230} rotation={15} />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: yParallaxFast }}
        className="absolute bottom-28 right-36 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 7, 0], rotate: [-15, 5, -15] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
          className="opacity-80"
        >
          <MintLeaf size={60} rotation={-50} />
        </motion.div>
      </motion.div>

      {/* Bottom Left Cherry Tomato & Leaf Accent */}
      <motion.div
        style={{ y: yParallaxMedium }}
        className="absolute bottom-16 left-8 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          className="opacity-75"
        >
          <CherryTomato size={36} />
        </motion.div>
      </motion.div>

      {/* Subtle Warm Vignette Overlay */}
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-orange-950/[0.02]" />
    </div>
  );
};
