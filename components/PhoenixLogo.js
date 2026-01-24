'use client'

export default function PhoenixLogo({ className = "w-16 h-16", showText = false }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="phoenixGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#FFB347', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#FF6B00', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#FF4500', stopOpacity: 1 }} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* X-SHAPED WINGS DESIGN - Wings that cross to form an X */}
        
        {/* TOP LEFT WING - Sweeping from top-left down to bottom-right */}
        <path
          d="M 15 15 Q 20 18 25 22 L 35 32 Q 40 37 45 43 L 48 46 L 42 40 Q 38 35 32 30 L 22 20 Q 18 16 15 15 Z"
          fill="url(#phoenixGradient)"
          filter="url(#glow)"
          opacity="0.95"
        />
        <path
          d="M 20 12 Q 25 15 30 20 L 40 30 Q 45 36 50 42 L 52 44 L 46 38 Q 42 33 36 28 L 26 18 Q 22 14 20 12 Z"
          fill="url(#phoenixGradient)"
          filter="url(#glow)"
          opacity="0.9"
        />
        <path
          d="M 25 10 Q 30 13 35 18 L 45 28 Q 50 34 55 40 L 56 42 L 51 36 Q 47 31 41 26 L 31 16 Q 27 12 25 10 Z"
          fill="url(#phoenixGradient)"
          filter="url(#glow)"
          opacity="0.85"
        />
        
        {/* BOTTOM LEFT WING - Sweeping from bottom-left up to top-right */}
        <path
          d="M 15 85 Q 20 82 25 78 L 35 68 Q 40 63 45 57 L 48 54 L 42 60 Q 38 65 32 70 L 22 80 Q 18 84 15 85 Z"
          fill="url(#phoenixGradient)"
          filter="url(#glow)"
          opacity="0.95"
        />
        <path
          d="M 20 88 Q 25 85 30 80 L 40 70 Q 45 64 50 58 L 52 56 L 46 62 Q 42 67 36 72 L 26 82 Q 22 86 20 88 Z"
          fill="url(#phoenixGradient)"
          filter="url(#glow)"
          opacity="0.9"
        />
        <path
          d="M 25 90 Q 30 87 35 82 L 45 72 Q 50 66 55 60 L 56 58 L 51 64 Q 47 69 41 74 L 31 84 Q 27 88 25 90 Z"
          fill="url(#phoenixGradient)"
          filter="url(#glow)"
          opacity="0.85"
        />
        
        {/* TOP RIGHT WING - Sweeping from top-right down to bottom-left */}
        <path
          d="M 85 15 Q 80 18 75 22 L 65 32 Q 60 37 55 43 L 52 46 L 58 40 Q 62 35 68 30 L 78 20 Q 82 16 85 15 Z"
          fill="url(#phoenixGradient)"
          filter="url(#glow)"
          opacity="0.95"
        />
        <path
          d="M 80 12 Q 75 15 70 20 L 60 30 Q 55 36 50 42 L 48 44 L 54 38 Q 58 33 64 28 L 74 18 Q 78 14 80 12 Z"
          fill="url(#phoenixGradient)"
          filter="url(#glow)"
          opacity="0.9"
        />
        <path
          d="M 75 10 Q 70 13 65 18 L 55 28 Q 50 34 45 40 L 44 42 L 49 36 Q 53 31 59 26 L 69 16 Q 73 12 75 10 Z"
          fill="url(#phoenixGradient)"
          filter="url(#glow)"
          opacity="0.85"
        />
        
        {/* BOTTOM RIGHT WING - Sweeping from bottom-right up to top-left */}
        <path
          d="M 85 85 Q 80 82 75 78 L 65 68 Q 60 63 55 57 L 52 54 L 58 60 Q 62 65 68 70 L 78 80 Q 82 84 85 85 Z"
          fill="url(#phoenixGradient)"
          filter="url(#glow)"
          opacity="0.95"
        />
        <path
          d="M 80 88 Q 75 85 70 80 L 60 70 Q 55 64 50 58 L 48 56 L 54 62 Q 58 67 64 72 L 74 82 Q 78 86 80 88 Z"
          fill="url(#phoenixGradient)"
          filter="url(#glow)"
          opacity="0.9"
        />
        <path
          d="M 75 90 Q 70 87 65 82 L 55 72 Q 50 66 45 60 L 44 58 L 49 64 Q 53 69 59 74 L 69 84 Q 73 88 75 90 Z"
          fill="url(#phoenixGradient)"
          filter="url(#glow)"
          opacity="0.85"
        />
        
        {/* Center Phoenix Head/Body */}
        <circle
          cx="50"
          cy="50"
          r="10"
          fill="url(#phoenixGradient)"
          filter="url(#glow)"
        />
        
        {/* Crown/Flame on top */}
        <path
          d="M 45 42 Q 48 35 50 32 Q 52 35 55 42 Z"
          fill="url(#phoenixGradient)"
          filter="url(#glow)"
          opacity="0.9"
        />
      </svg>
      
      {showText && (
        <span className="text-2xl font-bold text-gradient">ATHENIX</span>
      )}
    </div>
  )
}