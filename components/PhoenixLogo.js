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
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Phoenix Bird Body - inspired by user's logo */}
        
        {/* Left Wing - Upper */}
        <path
          d="M 50 50 Q 25 40 15 35 Q 10 32 8 28 Q 7 25 10 24 Q 15 25 20 30 Q 30 40 40 45 Z"
          fill="url(#phoenixGradient)"
          filter="url(#glow)"
          opacity="0.95"
        />
        
        {/* Left Wing - Middle */}
        <path
          d="M 50 50 Q 28 50 18 48 Q 12 47 8 44 Q 6 42 8 40 Q 12 40 18 43 Q 30 48 42 50 Z"
          fill="url(#phoenixGradient)"
          filter="url(#glow)"
          opacity="0.9"
        />
        
        {/* Left Wing - Lower */}
        <path
          d="M 50 50 Q 30 58 20 62 Q 14 65 10 66 Q 7 67 8 64 Q 10 60 16 58 Q 28 54 42 52 Z"
          fill="url(#phoenixGradient)"
          filter="url(#glow)"
          opacity="0.85"
        />
        
        {/* Right Wing - Upper */}
        <path
          d="M 50 50 Q 75 40 85 35 Q 90 32 92 28 Q 93 25 90 24 Q 85 25 80 30 Q 70 40 60 45 Z"
          fill="url(#phoenixGradient)"
          filter="url(#glow)"
          opacity="0.95"
        />
        
        {/* Right Wing - Middle */}
        <path
          d="M 50 50 Q 72 50 82 48 Q 88 47 92 44 Q 94 42 92 40 Q 88 40 82 43 Q 70 48 58 50 Z"
          fill="url(#phoenixGradient)"
          filter="url(#glow)"
          opacity="0.9"
        />
        
        {/* Right Wing - Lower */}
        <path
          d="M 50 50 Q 70 58 80 62 Q 86 65 90 66 Q 93 67 92 64 Q 90 60 84 58 Q 72 54 58 52 Z"
          fill="url(#phoenixGradient)"
          filter="url(#glow)"
          opacity="0.85"
        />
        
        {/* Center Body/Head */}
        <ellipse
          cx="50"
          cy="50"
          rx="8"
          ry="12"
          fill="url(#phoenixGradient)"
          filter="url(#glow)"
        />
        
        {/* Head Crown/Crest */}
        <path
          d="M 45 40 Q 48 30 50 28 Q 52 30 55 40 Z"
          fill="url(#phoenixGradient)"
          filter="url(#glow)"
          opacity="0.9"
        />
        
        {/* Tail Feathers */}
        <path
          d="M 50 60 Q 48 75 45 85 Q 44 88 45 90 Q 46 88 47 85 Q 49 75 50 65 Z"
          fill="url(#phoenixGradient)"
          filter="url(#glow)"
          opacity="0.8"
        />
        <path
          d="M 50 60 Q 50 78 50 88 Q 50 92 50 92 Q 50 92 50 88 Q 50 78 50 65 Z"
          fill="url(#phoenixGradient)"
          filter="url(#glow)"
          opacity="0.85"
        />
        <path
          d="M 50 60 Q 52 75 55 85 Q 56 88 55 90 Q 54 88 53 85 Q 51 75 50 65 Z"
          fill="url(#phoenixGradient)"
          filter="url(#glow)"
          opacity="0.8"
        />
      </svg>
      
      {showText && (
        <span className="text-2xl font-bold text-gradient">ATHENIX</span>
      )}
    </div>
  )
}