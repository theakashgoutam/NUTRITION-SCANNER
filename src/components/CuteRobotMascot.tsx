import React from 'react';
import { motion } from 'motion/react';

/**
 * 3D-styled Cute Orange Companion Robot Mascot
 * Matches the friendly AI Health Assistant in the reference UI.
 */
export const CuteRobotMascot: React.FC<{
  size?: number;
  className?: string;
  onClick?: () => void;
}> = ({ size = 200, className = '', onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      className={`relative inline-block cursor-pointer select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl"
      >
        <defs>
          {/* Main Orange Body Gradient (3D Glossy Spherical) */}
          <radialGradient id="botOrangeGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FED7AA" />
            <stop offset="35%" stopColor="#FB923C" />
            <stop offset="75%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#9A3412" />
          </radialGradient>

          {/* Dark Glass Visor Screen Gradient */}
          <linearGradient id="visorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="70%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          {/* Eye Glow Cyan Gradient */}
          <radialGradient id="eyeGlow" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#67E8F9" />
            <stop offset="60%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#0891B2" />
          </radialGradient>

          {/* Metallic Ear / Joint Gradient */}
          <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          {/* Specular Highlight Gradient */}
          <linearGradient id="specular" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Soft Ground Shadow */}
          <radialGradient id="botShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7C2D12" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#7C2D12" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#7C2D12" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Soft Drop Shadow at feet */}
        <ellipse cx="120" cy="225" rx="75" ry="12" fill="url(#botShadow)" />

        {/* Left Arm (Relaxed / Waving) */}
        <g>
          <motion.g
            animate={{ rotate: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '55px 145px' }}
          >
            <ellipse cx="48" cy="160" rx="14" ry="24" fill="url(#botOrangeGrad)" transform="rotate(20 48 160)" />
            <circle cx="42" cy="180" r="10" fill="url(#metalGrad)" />
          </motion.g>
        </g>

        {/* Right Arm (Friendly Waving) */}
        <g>
          <motion.g
            animate={{ rotate: [0, 15, -5, 12, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '185px 145px' }}
          >
            <ellipse cx="192" cy="140" rx="14" ry="24" fill="url(#botOrangeGrad)" transform="rotate(-35 192 140)" />
            <circle cx="204" cy="122" r="11" fill="url(#metalGrad)" />
            {/* Glossy highlight on hand */}
            <circle cx="202" cy="120" r="3" fill="#FFFFFF" opacity="0.8" />
          </motion.g>
        </g>

        {/* Lower Torso / Rounded Sitting Body */}
        <path
          d="M 70 145 C 70 120, 170 120, 170 145 C 170 195, 160 215, 120 215 C 80 215, 70 195, 70 145 Z"
          fill="url(#botOrangeGrad)"
        />

        {/* Belly Plate / Heart Indicator */}
        <ellipse cx="120" cy="165" rx="30" ry="24" fill="#FFF7ED" opacity="0.95" />
        <circle cx="120" cy="165" r="14" fill="#F97316" />
        <path
          d="M 120 160 C 117 156, 112 157, 112 161 C 112 166, 120 171, 120 171 C 120 171, 128 166, 128 161 C 128 157, 123 156, 120 160 Z"
          fill="#FFFFFF"
        />

        {/* Neck Ring */}
        <rect x="102" y="118" width="36" height="12" rx="6" fill="url(#metalGrad)" />

        {/* Little Legs / Feet */}
        <ellipse cx="92" cy="216" rx="20" ry="10" fill="url(#metalGrad)" />
        <ellipse cx="148" cy="216" rx="20" ry="10" fill="url(#metalGrad)" />

        {/* Antenna */}
        <rect x="117" y="18" width="6" height="22" rx="3" fill="url(#metalGrad)" />
        <circle cx="120" cy="18" r="9" fill="url(#botOrangeGrad)" />
        <circle cx="120" cy="18" r="5" fill="#67E8F9" className="animate-pulse" />
        <circle cx="118" cy="16" r="2.5" fill="#FFFFFF" />

        {/* Head (Big Spherical Orange Helmet) */}
        <rect x="52" y="36" width="136" height="96" rx="46" fill="url(#botOrangeGrad)" />

        {/* Head 3D Specular Highlight Arc */}
        <path
          d="M 66 60 C 75 46, 105 40, 138 42"
          stroke="url(#specular)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Ear Muff Caps (Side Sensors) */}
        <rect x="42" y="65" width="14" height="38" rx="7" fill="url(#metalGrad)" />
        <circle cx="48" cy="84" r="5" fill="#F97316" />

        <rect x="184" y="65" width="14" height="38" rx="7" fill="url(#metalGrad)" />
        <circle cx="192" cy="84" r="5" fill="#F97316" />

        {/* Dark Visor / Screen Face */}
        <rect x="66" y="52" width="108" height="66" rx="30" fill="url(#visorGrad)" />
        {/* Visor Bezel / Inner Ring */}
        <rect x="66" y="52" width="108" height="66" rx="30" stroke="#475569" strokeWidth="2" fill="none" />

        {/* Visor Glare Sweep */}
        <path
          d="M 78 56 L 142 56 L 126 78 L 74 78 Z"
          fill="#FFFFFF"
          opacity="0.12"
        />

        {/* Cute Glowing Cyan Oval Eyes */}
        <g>
          {/* Left Eye */}
          <ellipse cx="98" cy="84" rx="13" ry="16" fill="url(#eyeGlow)" />
          {/* Left Eye Highlight */}
          <circle cx="94" cy="78" r="4.5" fill="#FFFFFF" />
          <circle cx="102" cy="88" r="2" fill="#FFFFFF" opacity="0.8" />

          {/* Right Eye */}
          <ellipse cx="142" cy="84" rx="13" ry="16" fill="url(#eyeGlow)" />
          {/* Right Eye Highlight */}
          <circle cx="138" cy="78" r="4.5" fill="#FFFFFF" />
          <circle cx="146" cy="88" r="2" fill="#FFFFFF" opacity="0.8" />

          {/* Cute digital blush cheeks */}
          <ellipse cx="84" cy="98" rx="6" ry="3" fill="#F43F5E" opacity="0.65" />
          <ellipse cx="156" cy="98" rx="6" ry="3" fill="#F43F5E" opacity="0.65" />

          {/* Friendly Smile Curved Mouth */}
          <path
            d="M 112 96 Q 120 104 128 96"
            stroke="#67E8F9"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>
    </motion.div>
  );
};
