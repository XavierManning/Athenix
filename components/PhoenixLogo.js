'use client'

export default function PhoenixLogo({ className = "w-16 h-16", showText = false }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg 
        viewBox="0 0 500 500" 
        role="img" 
        aria-label="Wing X logo" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 4px 8px rgba(255,110,0,.3))' }}
      >
        <defs>
          {/* Fire gradient */}
          <linearGradient id="fire" x1="120" y1="80" x2="380" y2="430" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#FFB347"/>
            <stop offset="0.45" stopColor="#FF7A18"/>
            <stop offset="1" stopColor="#E5391A"/>
          </linearGradient>

          {/* Dark cut line (negative space look) */}
          <linearGradient id="cut" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0a0a0a" stopOpacity="0.95"/>
            <stop offset="1" stopColor="#0a0a0a" stopOpacity="0.80"/>
          </linearGradient>
        </defs>

        {/* LEFT WING (3 layers) */}
        <path fill="url(#fire)" d="
          M 78 140
          L 210 72
          L 250 118
          L 150 215
          Q 120 185 78 140
          Z" />
        <path fill="url(#fire)" opacity=".92" d="
          M 104 200
          L 216 130
          L 244 158
          L 168 235
          Q 140 220 104 200
          Z" />
        <path fill="url(#fire)" opacity=".86" d="
          M 132 252
          L 214 198
          L 234 222
          L 186 276
          Q 160 268 132 252
          Z" />

        {/* RIGHT WING (mirror) */}
        <path fill="url(#fire)" d="
          M 422 140
          L 290 72
          L 250 118
          L 350 215
          Q 380 185 422 140
          Z" />
        <path fill="url(#fire)" opacity=".92" d="
          M 396 200
          L 284 130
          L 256 158
          L 332 235
          Q 360 220 396 200
          Z" />
        <path fill="url(#fire)" opacity=".86" d="
          M 368 252
          L 286 198
          L 266 222
          L 314 276
          Q 340 268 368 252
          Z" />

        {/* CENTER X (two blades) */}
        <path fill="url(#fire)" d="
          M 178 392
          L 262 155
          L 304 178
          L 220 414
          Q 201 410 178 392
          Z" />
        <path fill="url(#fire)" d="
          M 322 392
          L 238 155
          L 196 178
          L 280 414
          Q 299 410 322 392
          Z" />

        {/* Optional "cuts" to mimic the thin dark gaps */}
        <path fill="url(#cut)" opacity=".55" d="M 154 214 L 248 122 L 250 128 L 164 220 Z"/>
        <path fill="url(#cut)" opacity=".55" d="M 346 214 L 252 122 L 250 128 L 336 220 Z"/>
      </svg>
      
      {showText && (
        <span className="text-2xl font-bold text-gradient">ATHENIX</span>
      )}
    </div>
  )
}