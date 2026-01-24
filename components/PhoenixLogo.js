'use client'

export default function PhoenixLogo({ className = "w-16 h-16", showText = false }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg 
        viewBox="0 0 200 200" 
        role="img" 
        aria-label="Athenix Winged X logo" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 2px 6px rgba(255,110,0,.3))' }}
      >
        <defs>
          {/* Elegant gradient */}
          <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFB347"/>
            <stop offset="50%" stopColor="#FF7A18"/>
            <stop offset="100%" stopColor="#E5391A"/>
          </linearGradient>
          
          {/* Glow effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* X CORE - Bold and centered */}
        <g filter="url(#glow)">
          {/* Left diagonal of X */}
          <path 
            fill="url(#wingGradient)" 
            d="M 60 50 L 100 100 L 60 150 L 50 140 L 82 100 L 50 60 Z"
          />
          
          {/* Right diagonal of X */}
          <path 
            fill="url(#wingGradient)" 
            d="M 140 50 L 150 60 L 118 100 L 150 140 L 140 150 L 100 100 Z"
          />
        </g>

        {/* LEFT WING - Flowing from top-left corner of X */}
        <g opacity="0.95">
          {/* Wing layer 1 - outermost */}
          <path 
            fill="url(#wingGradient)" 
            opacity="0.9"
            d="M 50 60 Q 40 55 30 52 Q 20 50 15 48 L 12 45 Q 18 47 28 50 Q 38 53 48 58 Z"
          />
          {/* Wing layer 2 */}
          <path 
            fill="url(#wingGradient)" 
            opacity="0.85"
            d="M 52 65 Q 42 60 32 57 Q 22 55 17 53 L 15 50 Q 20 52 30 55 Q 40 58 50 63 Z"
          />
          {/* Wing layer 3 - innermost */}
          <path 
            fill="url(#wingGradient)" 
            opacity="0.8"
            d="M 54 70 Q 44 65 34 62 Q 24 60 19 58 L 18 55 Q 22 57 32 60 Q 42 63 52 68 Z"
          />
        </g>

        {/* RIGHT WING - Flowing from top-right corner of X */}
        <g opacity="0.95">
          {/* Wing layer 1 - outermost */}
          <path 
            fill="url(#wingGradient)" 
            opacity="0.9"
            d="M 150 60 Q 160 55 170 52 Q 180 50 185 48 L 188 45 Q 182 47 172 50 Q 162 53 152 58 Z"
          />
          {/* Wing layer 2 */}
          <path 
            fill="url(#wingGradient)" 
            opacity="0.85"
            d="M 148 65 Q 158 60 168 57 Q 178 55 183 53 L 185 50 Q 180 52 170 55 Q 160 58 150 63 Z"
          />
          {/* Wing layer 3 - innermost */}
          <path 
            fill="url(#wingGradient)" 
            opacity="0.8"
            d="M 146 70 Q 156 65 166 62 Q 176 60 181 58 L 182 55 Q 178 57 168 60 Q 158 63 148 68 Z"
          />
        </g>

        {/* BOTTOM LEFT WING - Flowing from bottom-left corner of X */}
        <g opacity="0.95">
          {/* Wing layer 1 */}
          <path 
            fill="url(#wingGradient)" 
            opacity="0.9"
            d="M 50 140 Q 40 145 30 148 Q 20 150 15 152 L 12 155 Q 18 153 28 150 Q 38 147 48 142 Z"
          />
          {/* Wing layer 2 */}
          <path 
            fill="url(#wingGradient)" 
            opacity="0.85"
            d="M 52 135 Q 42 140 32 143 Q 22 145 17 147 L 15 150 Q 20 148 30 145 Q 40 142 50 137 Z"
          />
          {/* Wing layer 3 */}
          <path 
            fill="url(#wingGradient)" 
            opacity="0.8"
            d="M 54 130 Q 44 135 34 138 Q 24 140 19 142 L 18 145 Q 22 143 32 140 Q 42 137 52 132 Z"
          />
        </g>

        {/* BOTTOM RIGHT WING - Flowing from bottom-right corner of X */}
        <g opacity="0.95">
          {/* Wing layer 1 */}
          <path 
            fill="url(#wingGradient)" 
            opacity="0.9"
            d="M 150 140 Q 160 145 170 148 Q 180 150 185 152 L 188 155 Q 182 153 172 150 Q 162 147 152 142 Z"
          />
          {/* Wing layer 2 */}
          <path 
            fill="url(#wingGradient)" 
            opacity="0.85"
            d="M 148 135 Q 158 140 168 143 Q 178 145 183 147 L 185 150 Q 180 148 170 145 Q 160 142 150 137 Z"
          />
          {/* Wing layer 3 */}
          <path 
            fill="url(#wingGradient)" 
            opacity="0.8"
            d="M 146 130 Q 156 135 166 138 Q 176 140 181 142 L 182 145 Q 178 143 168 140 Q 158 137 148 132 Z"
          />
        </g>

        {/* Center glow accent */}
        <circle 
          cx="100" 
          cy="100" 
          r="8" 
          fill="url(#wingGradient)"
          opacity="0.6"
          filter="url(#glow)"
        />
      </svg>
      
      {showText && (
        <span className="text-2xl font-bold text-gradient">ATHENIX</span>
      )}
    </div>
  )
}