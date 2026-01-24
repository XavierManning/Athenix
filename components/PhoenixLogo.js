'use client'

export default function PhoenixLogo({ className = "w-16 h-16", showText = false }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg 
        viewBox="0 0 200 200" 
        role="img" 
        aria-label="Athenix Wing X logo" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 2px 8px rgba(255,110,0,.25))' }}
      >
        <defs>
          {/* Elegant gradient */}
          <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFB347"/>
            <stop offset="50%" stopColor="#FF7A18"/>
            <stop offset="100%" stopColor="#E5391A"/>
          </linearGradient>
          
          {/* Subtle inner glow */}
          <radialGradient id="innerGlow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#FFE5CC" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#FF6B00" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* LEFT WING - Top to bottom diagonal */}
        <g opacity="0.95">
          {/* Outer feather */}
          <path 
            fill="url(#wingGradient)" 
            d="M 30 40 Q 35 45 45 55 L 80 90 Q 85 95 90 100 L 95 105 L 85 95 Q 75 85 65 75 L 40 50 Q 32 42 30 40 Z"
          />
          {/* Middle feather */}
          <path 
            fill="url(#wingGradient)" 
            opacity="0.92"
            d="M 40 50 Q 45 55 55 65 L 85 95 Q 90 100 95 105 L 98 108 L 90 100 Q 82 92 72 82 L 48 58 Q 42 52 40 50 Z"
          />
          {/* Inner feather */}
          <path 
            fill="url(#wingGradient)" 
            opacity="0.88"
            d="M 50 60 Q 55 65 65 75 L 90 100 Q 94 104 98 108 L 100 110 L 94 104 Q 88 98 78 88 L 58 68 Q 52 62 50 60 Z"
          />
        </g>

        {/* RIGHT WING - Top to bottom diagonal (mirrored) */}
        <g opacity="0.95">
          {/* Outer feather */}
          <path 
            fill="url(#wingGradient)" 
            d="M 170 40 Q 165 45 155 55 L 120 90 Q 115 95 110 100 L 105 105 L 115 95 Q 125 85 135 75 L 160 50 Q 168 42 170 40 Z"
          />
          {/* Middle feather */}
          <path 
            fill="url(#wingGradient)" 
            opacity="0.92"
            d="M 160 50 Q 155 55 145 65 L 115 95 Q 110 100 105 105 L 102 108 L 110 100 Q 118 92 128 82 L 152 58 Q 158 52 160 50 Z"
          />
          {/* Inner feather */}
          <path 
            fill="url(#wingGradient)" 
            opacity="0.88"
            d="M 150 60 Q 145 65 135 75 L 110 100 Q 106 104 102 108 L 100 110 L 106 104 Q 112 98 122 88 L 142 68 Q 148 62 150 60 Z"
          />
        </g>

        {/* LOWER LEFT WING - Bottom to top diagonal */}
        <g opacity="0.95">
          {/* Outer feather */}
          <path 
            fill="url(#wingGradient)" 
            d="M 30 160 Q 35 155 45 145 L 80 110 Q 85 105 90 100 L 95 95 L 85 105 Q 75 115 65 125 L 40 150 Q 32 158 30 160 Z"
          />
          {/* Middle feather */}
          <path 
            fill="url(#wingGradient)" 
            opacity="0.92"
            d="M 40 150 Q 45 145 55 135 L 85 105 Q 90 100 95 95 L 98 92 L 90 100 Q 82 108 72 118 L 48 142 Q 42 148 40 150 Z"
          />
          {/* Inner feather */}
          <path 
            fill="url(#wingGradient)" 
            opacity="0.88"
            d="M 50 140 Q 55 135 65 125 L 90 100 Q 94 96 98 92 L 100 90 L 94 96 Q 88 102 78 112 L 58 132 Q 52 138 50 140 Z"
          />
        </g>

        {/* LOWER RIGHT WING - Bottom to top diagonal (mirrored) */}
        <g opacity="0.95">
          {/* Outer feather */}
          <path 
            fill="url(#wingGradient)" 
            d="M 170 160 Q 165 155 155 145 L 120 110 Q 115 105 110 100 L 105 95 L 115 105 Q 125 115 135 125 L 160 150 Q 168 158 170 160 Z"
          />
          {/* Middle feather */}
          <path 
            fill="url(#wingGradient)" 
            opacity="0.92"
            d="M 160 150 Q 155 145 145 135 L 115 105 Q 110 100 105 95 L 102 92 L 110 100 Q 118 108 128 118 L 152 142 Q 158 148 160 150 Z"
          />
          {/* Inner feather */}
          <path 
            fill="url(#wingGradient)" 
            opacity="0.88"
            d="M 150 140 Q 145 135 135 125 L 110 100 Q 106 96 102 92 L 100 90 L 106 96 Q 112 102 122 112 L 142 132 Q 148 138 150 140 Z"
          />
        </g>

        {/* Center core - subtle */}
        <circle 
          cx="100" 
          cy="100" 
          r="12" 
          fill="url(#wingGradient)"
          opacity="0.85"
        />
        
        {/* Center highlight */}
        <circle 
          cx="100" 
          cy="100" 
          r="8" 
          fill="url(#innerGlow)"
        />

        {/* Small crown accent on top */}
        <path 
          fill="url(#wingGradient)" 
          opacity="0.9"
          d="M 95 85 Q 98 78 100 75 Q 102 78 105 85 Z"
        />
      </svg>
      
      {showText && (
        <span className="text-2xl font-bold text-gradient">ATHENIX</span>
      )}
    </div>
  )
}