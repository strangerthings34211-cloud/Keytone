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
          {/* Elegant Ambient Glow Aura */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            {/* Subtle Pulse Aura */}
            <div className="w-72 h-72 sm:w-96 sm:h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse" />
          </div>

          {/* Center Logo Stage (Clean Logo) */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative z-10 flex flex-col items-center px-4"
          >
            {/* Authentic Keytone Official Logo */}
            <Keytone3DLogo className="w-64 sm:w-80 max-w-[80vw]" is3D={false} glow={true} />

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
