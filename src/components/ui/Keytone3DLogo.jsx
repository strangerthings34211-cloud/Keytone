import { cn } from '@/utils/cn'

/**
 * Keytone3DLogo - Official Keytone Life Sciences Logo Display
 */
export default function Keytone3DLogo({
  className = "w-64 max-w-[85vw]",
  glow = true,
}) {
  return (
    <div className={cn("relative flex items-center justify-center select-none", className)}>
      {/* Ambient Radial Backlight Glow */}
      {glow && (
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400/30 via-cyan-400/25 to-blue-500/30 blur-2xl rounded-full scale-110 pointer-events-none" />
      )}

      {/* Official Keytone Life Sciences Logo Image */}
      <div className="relative z-10 flex items-center justify-center">
        <img
          src="/images/keytone-official-logo.png"
          alt="Keytone Life Sciences"
          className="w-full h-auto max-h-32 sm:max-h-40 object-contain drop-shadow-[0_10px_20px_rgba(0,180,216,0.35)] brightness-105"
        />
      </div>
    </div>
  )
}
