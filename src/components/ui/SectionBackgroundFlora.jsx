import { memo } from 'react'

/**
 * SectionBackgroundFlora - Elegant, modern moving flowers, floating botanical petals,
 * and glowing bio-organic particle effects for webpage section backgrounds.
 *
 * @param {'light' | 'dark' | 'white' | 'ocean' | 'gold'} variant - Color scheme preset
 * @param {boolean} withPetals - Whether to render moving flowers and floating petals
 * @param {boolean} withRipples - Whether to render subtle water ripple concentric rings
 * @param {boolean} withLeaves - Whether to render botanical leaf silhouettes
 * @param {string} className - Additional container styling
 */
function SectionBackgroundFlora({
  variant = 'light',
  withPetals = true,
  withRipples = true,
  withLeaves = true,
  className = '',
}) {
  const isDark = variant === 'dark' || variant === 'ocean'

  // Variant color tokens
  const glowColor1 = isDark
    ? 'rgba(14, 165, 196, 0.14)'
    : variant === 'gold'
    ? 'rgba(245, 158, 11, 0.08)'
    : 'rgba(34, 197, 94, 0.06)'

  const glowColor2 = isDark
    ? 'rgba(34, 197, 94, 0.10)'
    : 'rgba(14, 165, 196, 0.06)'

  // High quality flower colors with gentle gradients and opacity
  const flowerFill1 = isDark
    ? 'fill-teal-400/25 stroke-teal-300/40'
    : variant === 'gold'
    ? 'fill-amber-400/20 stroke-amber-400/35'
    : 'fill-teal-500/18 stroke-teal-400/30'

  const flowerFill2 = isDark
    ? 'fill-emerald-400/20 stroke-emerald-300/35'
    : variant === 'gold'
    ? 'fill-yellow-400/20 stroke-amber-500/30'
    : 'fill-emerald-500/15 stroke-emerald-400/30'

  const flowerFill3 = isDark
    ? 'fill-cyan-300/20 stroke-cyan-200/35'
    : 'fill-teal-600/15 stroke-teal-500/25'

  const centerFill = isDark
    ? 'fill-teal-200/60 shadow-sm'
    : variant === 'gold'
    ? 'fill-amber-500/50'
    : 'fill-emerald-500/40'

  const leafColor = isDark
    ? 'fill-emerald-400/15 stroke-emerald-300/25'
    : 'fill-emerald-500/12 stroke-emerald-400/25'

  const rippleStroke = isDark ? 'stroke-teal-400/15' : 'stroke-teal-600/10'

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* ── 1. Soft Ambient Glowing Orbs ── */}
      <div
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl"
        style={{ background: glowColor1 }}
      />
      <div
        className="absolute -bottom-24 -right-24 w-[28rem] h-[28rem] rounded-full blur-3xl"
        style={{ background: glowColor2 }}
      />

      {/* ── 2. Subtle Water Ripple Concentric Rings ── */}
      {withRipples && (
        <svg
          className="absolute -right-20 -top-20 w-80 h-80 animate-spin-slow opacity-60"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle
            cx="100"
            cy="100"
            r="30"
            className={rippleStroke}
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <circle
            cx="100"
            cy="100"
            r="60"
            className={rippleStroke}
            strokeWidth="1.2"
          />
          <circle
            cx="100"
            cy="100"
            r="90"
            className={rippleStroke}
            strokeWidth="0.8"
            strokeDasharray="6 6"
          />
        </svg>
      )}

      {/* ── 3. Animated Moving Flower 1 (Top Left Floating & Rotating) ── */}
      {withPetals && (
        <div className="absolute top-8 left-8 sm:left-14 animate-flower-move-1 opacity-80">
          <svg className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-md" viewBox="0 0 100 100">
            <g transform="translate(50,50)">
              {/* 6-Petal Lotus Bloom */}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <path
                  key={i}
                  d="M0 0 C-12 -20 -18 -36 0 -46 C18 -36 12 -20 0 0"
                  className={flowerFill1}
                  strokeWidth="1.5"
                  transform={`rotate(${angle})`}
                />
              ))}
              {/* Inner Petal Ring */}
              {[30, 90, 150, 210, 270, 330].map((angle, i) => (
                <path
                  key={`in-${i}`}
                  d="M0 0 C-7 -12 -10 -22 0 -28 C10 -22 7 -12 0 0"
                  className={flowerFill2}
                  strokeWidth="1"
                  transform={`rotate(${angle})`}
                />
              ))}
              {/* Pollen Center with glow */}
              <circle cx="0" cy="0" r="7" className={centerFill} />
              <circle cx="0" cy="0" r="3" className="fill-white/80" />
            </g>
          </svg>
        </div>
      )}

      {/* ── 4. Animated Moving Flower 2 (Bottom Right Floating & Gliding) ── */}
      {withPetals && (
        <div className="absolute bottom-12 right-10 sm:right-20 animate-flower-move-2 opacity-85">
          <svg className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-md" viewBox="0 0 100 100">
            <g transform="translate(50,50)">
              {/* 8-Petal Aquatic Flora Bloom */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <path
                  key={i}
                  d="M0 0 C-10 -16 -16 -32 0 -42 C16 -32 10 -16 0 0"
                  className={flowerFill2}
                  strokeWidth="1.5"
                  transform={`rotate(${angle})`}
                />
              ))}
              {/* Center Corona */}
              <circle cx="0" cy="0" r="8" className={centerFill} />
              <circle cx="0" cy="0" r="4" className="fill-white/80" />
            </g>
          </svg>
        </div>
      )}

      {/* ── 5. Animated Moving Flower 3 (Top Right Continuous Spin & Float) ── */}
      {withPetals && (
        <div className="absolute top-16 right-1/4 animate-flower-spin-float opacity-75 hidden sm:block">
          <svg className="w-14 h-14 drop-shadow-sm" viewBox="0 0 100 100">
            <g transform="translate(50,50)">
              {/* 5-Petal Flower */}
              {[0, 72, 144, 216, 288].map((angle, i) => (
                <path
                  key={i}
                  d="M0 0 C-14 -18 -18 -30 0 -40 C18 -30 14 -18 0 0"
                  className={flowerFill3}
                  strokeWidth="1.3"
                  transform={`rotate(${angle})`}
                />
              ))}
              <circle cx="0" cy="0" r="6" className={centerFill} />
            </g>
          </svg>
        </div>
      )}

      {/* ── 6. Animated Moving Flower 4 (Center-Left Horizontal Glide) ── */}
      {withPetals && (
        <div className="absolute top-1/2 left-6 sm:left-24 -translate-y-1/2 animate-flower-glide opacity-70">
          <svg className="w-16 h-16 drop-shadow-sm" viewBox="0 0 100 100">
            <g transform="translate(50,50) scale(0.95)">
              {/* 6-Petal Symmetrical Water Bloom */}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <path
                  key={i}
                  d="M0 0 C-11 -15 -14 -28 0 -38 C14 -28 11 -15 0 0"
                  className={flowerFill1}
                  strokeWidth="1.4"
                  transform={`rotate(${angle})`}
                />
              ))}
              <circle cx="0" cy="0" r="6.5" className={centerFill} />
            </g>
          </svg>
        </div>
      )}

      {/* ── 7. Tumbling & Drifting Individual Petals Across Screen ── */}
      {withPetals && (
        <>
          {/* Petal 1 (Drifting Top-Center to Right) */}
          <div className="absolute top-12 left-1/3 animate-petal-move-1 opacity-80">
            <svg className="w-9 h-9" viewBox="0 0 40 40">
              <path
                d="M20 4 C10 14 8 26 20 36 C32 26 30 14 20 4 Z"
                className={flowerFill1}
                strokeWidth="1.2"
              />
            </svg>
          </div>

          {/* Petal 2 (Drifting Center-Right to Bottom) */}
          <div className="absolute top-2/3 right-1/3 animate-petal-move-2 opacity-75">
            <svg className="w-11 h-11" viewBox="0 0 40 40">
              <path
                d="M20 4 C10 14 8 26 20 36 C32 26 30 14 20 4 Z"
                className={flowerFill2}
                strokeWidth="1.2"
              />
            </svg>
          </div>

          {/* Petal 3 (Breathing Bloom Bottom-Left) */}
          <div className="absolute bottom-16 left-1/4 animate-flower-bloom opacity-70">
            <svg className="w-8 h-8" viewBox="0 0 40 40">
              <path
                d="M20 4 C10 14 8 26 20 36 C32 26 30 14 20 4 Z"
                className={flowerFill3}
                strokeWidth="1.2"
              />
            </svg>
          </div>
        </>
      )}

      {/* ── 8. Elegant Botanical Aquatic Leaf Branches ── */}
      {withLeaves && (
        <div className="absolute top-1/4 -left-6 opacity-40">
          <svg className="w-28 h-28" viewBox="0 0 120 120" fill="none">
            <path
              d="M10 110 Q40 60 100 20"
              className={isDark ? 'stroke-teal-400/25' : 'stroke-emerald-600/15'}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M45 68 C35 55 45 42 60 52 C55 65 48 70 45 68 Z"
              className={leafColor}
              strokeWidth="1"
            />
            <path
              d="M70 45 C65 30 78 22 90 32 C82 45 75 48 70 45 Z"
              className={leafColor}
              strokeWidth="1"
            />
          </svg>
        </div>
      )}

      {/* ── 9. Bioluminescent Aquatic Spores / Dust Particles ── */}
      <div className="absolute inset-0">
        {[
          { top: '15%', left: '20%', size: 'w-1.5 h-1.5', delay: '0s' },
          { top: '25%', right: '15%', size: 'w-2 h-2', delay: '1.5s' },
          { top: '65%', left: '12%', size: 'w-1 h-1', delay: '2.5s' },
          { top: '75%', right: '25%', size: 'w-2.5 h-2.5', delay: '0.8s' },
          { top: '45%', right: '8%', size: 'w-1.5 h-1.5', delay: '3.2s' },
          { top: '85%', left: '40%', size: 'w-2 h-2', delay: '1.9s' },
        ].map((dot, index) => (
          <div
            key={index}
            className={`absolute rounded-full animate-pulse ${dot.size} ${
              isDark
                ? 'bg-teal-300/40 shadow-[0_0_8px_rgba(45,212,191,0.5)]'
                : 'bg-emerald-400/30'
            }`}
            style={{
              top: dot.top,
              left: dot.left,
              right: dot.right,
              animationDelay: dot.delay,
              animationDuration: '4s',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default memo(SectionBackgroundFlora)
