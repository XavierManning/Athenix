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
          <linearGradient id="phoenixGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#FFB347', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#FF6B00', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#D32F2F', stopOpacity: 1 }} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Left Wing */}
        <path
          d="M 20 70 Q 15 55 18 45 Q 20 35 25 30 Q 30 25 35 28 Q 32 40 30 50 Q 28 60 30 70 Z"
          fill="url(#phoenixGradient)"
          filter="url(#glow)"
          opacity="0.9"
        />
        <path
          d="M 25 68 Q 22 58 24 48 Q 26 38 30 33 Q 34 30 37 32 Q 35 42 33 52 Q 32 62 33 68 Z"
          fill="url(#phoenixGradient)"
          filter="url(#glow)"
          opacity="0.95"
        />
        <path
          d="M 30 66 Q 28 58 30 50 Q 32 42 36 38 Q 39 35 41 37 Q 39 45 38 53 Q 37 61 38 66 Z"
          fill="url(#phoenixGradient)"
          filter="url(#glow)"
        />
        
        {/* Right Wing */}
        <path
          d="M 80 70 Q 85 55 82 45 Q 80 35 75 30 Q 70 25 65 28 Q 68 40 70 50 Q 72 60 70 70 Z"
          fill="url(#phoenixGradient)"
          filter="url(#glow)"
          opacity="0.9"
        />
        <path
          d="M 75 68 Q 78 58 76 48 Q 74 38 70 33 Q 66 30 63 32 Q 65 42 67 52 Q 68 62 67 68 Z"
          fill="url(#phoenixGradient)"
          filter="url(#glow)"
          opacity="0.95"
        />
        <path
          d="M 70 66 Q 72 58 70 50 Q 68 42 64 38 Q 61 35 59 37 Q 61 45 62 53 Q 63 61 62 66 Z"
          fill="url(#phoenixGradient)"
          filter="url(#glow)"
        />
        
        {/* Center X Cross */}
        <path
          d="M 40 35 L 60 65 M 60 35 L 40 65"
          stroke="url(#phoenixGradient)"
          strokeWidth="5"
          strokeLinecap="round"
          filter="url(#glow)"
        />
        
        {/* Top Flame */}
        <circle cx="50" cy="25" r="6" fill="url(#phoenixGradient)" filter="url(#glow)" opacity="0.8" />
      </svg>
      
      {showText && (
        <span className="text-2xl font-bold text-gradient">ATHENIX</span>
      )}
    </div>
  )
}