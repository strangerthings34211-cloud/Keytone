import { useState } from 'react'
import { cn } from '@/utils/cn'

/**
 * Accessible tabs component.
 *
 * @param {Array<{label: string, content: ReactNode}>} tabs
 * @param {string} className
 */
export default function Tabs({ tabs = [], className }) {
  const [active, setActive] = useState(0)

  return (
    <div className={cn('w-full', className)}>
      {/* Tab list */}
      <div
        role="tablist"
        className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 border-b border-slate-200 mb-6 touch-pan-x"
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={active === index}
            onClick={() => setActive(index)}
            className={cn(
              'px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer',
              active === index
                ? 'bg-gradient-to-r from-ocean-800 to-ocean-900 text-white shadow-md shadow-ocean-900/20 scale-[1.02]'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-ocean-900'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      {tabs.map((tab, index) => (
        <div
          key={index}
          role="tabpanel"
          hidden={active !== index}
          className={cn(active === index ? 'block animate-fadeIn' : 'hidden')}
        >
          {tab.content}
        </div>
      ))}
    </div>
  )
}
