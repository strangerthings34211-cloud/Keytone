import { cn } from '@/utils/cn'

/**
 * Keytone3DLogo - Official Keytone Life Sciences Logo with 3D Float & Ambient Lighting
 */
export default function Keytone3DLogo({
  className = "w-64 max-w-[85vw]",
  is3D = true,
  glow = true,
}) {
  return (
    <div className={cn("relative flex items-center justify-center select-none", className)}>
      {/* 3D Ambient Radial Backlight Glow */}
      {glow && (
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400/40 via-cyan-400/35 to-blue-500/40 blur-3xl rounded-full scale-125 animate-pulse pointer-events-none" />
      )}

      {/* Official Keytone Life Sciences Logo Image with 3D Elevation */}
      <div className={cn(
        "relative z-10 flex items-center justify-center transition-transform duration-500",
        is3D && "transform hover:scale-105"
      )}>
        <img
          src="/images/keytone-official-logo.png"
          alt="Keytone Life Sciences"
          className="w-full h-auto max-h-36 sm:max-h-44 object-contain drop-shadow-[0_15px_30px_rgba(0,180,216,0.45)] brightness-110"
        />
      </div>
    </div>
  )
}
