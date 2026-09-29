import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utils/cn'
import Keytone3DLogo from './Keytone3DLogo'

export default function KeytonePreloader({
  onFinish,
  minDuration = 1200,
  fullScreen = true,
  isSuspense = false,
}) {
  const [progress, setProgress] = useState(15)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    if (isSuspense) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 92 ? prev + Math.random() * 18 : prev))
      }, 120)
      return () => clearInterval(interval)
    }

    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const calculated = Math.min(Math.floor((elapsed / minDuration) * 100), 100)

      setProgress(calculated)

      if (elapsed >= minDuration) {
        clearInterval(timer)
        setIsDone(true)
        setTimeout(() => {
          onFinish?.()
        }, 300)
      }
    }, 35)

    return () => clearInterval(timer)
  }, [minDuration, onFinish, isSuspense])

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className={cn(
            'flex flex-col items-center justify-center overflow-hidden z-[99999]',
            fullScreen
              ? 'fixed inset-0 min-h-screen bg-ocean-950 select-none'
              : 'relative w-full min-h-[400px] bg-ocean-950/90 rounded-3xl p-8'
          )}
          style={{
            background: 'radial-gradient(ellipse at 50% 45%, #0d3b75 0%, #061D4A 60%, #020b1c 100%)',
          }}
        >
          {/* 3D Holographic Orbiting Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            {/* Outer Cyan Ring */}
            <div className="w-[360px] h-[360px] sm:w-[460px] sm:h-[460px] rounded-full border border-cyan-400/25 animate-spin-slow" />
            
            {/* Inner Emerald Ring */}
            <div
              className="absolute w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] rounded-full border border-teal-400/35 border-dashed"
              style={{ animation: 'spin 14s linear infinite reverse' }}
            />

            {/* Glowing Bio Pulse Aura */}
            <div className="absolute w-56 h-56 bg-teal-500/25 rounded-full blur-3xl animate-pulse" />

            {/* Water Ripple Ring */}
            <div className="absolute w-[520px] h-[520px] rounded-full border border-white/10 animate-ping opacity-20" />
          </div>

          {/* Center 3D Logo Stage (Only Logo) */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Authentic 3D Keytone Logo */}
            <Keytone3DLogo className="w-72 sm:w-88 max-w-[85vw]" is3D={true} glow={true} />

            {/* Glowing Minimalist Progress Bar */}
            <div className="mt-8 w-56 sm:w-72 flex flex-col items-center">
              <div className="w-full h-1.5 bg-ocean-900/90 rounded-full overflow-hidden p-0.5 border border-cyan-400/35 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 rounded-full shadow-[0_0_10px_rgba(45,212,191,0.8)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.1 }}
                />
              </div>

              {/* Minimalist Percentage Indicator */}
              <div className="mt-2 text-[11px] font-mono font-bold text-teal-300/90 tracking-wider">
                {Math.round(progress)}%
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
