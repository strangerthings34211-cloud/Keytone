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
        className="flex gap-1 overflow-x-auto scrollbar-hide border-b border-slate-200 mb-6"
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={active === index}
            onClick={() => setActive(index)}
            className={cn(
              'px-5 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200',
              'border-b-2 -mb-px',
              active === index
                ? 'border-ocean-700 text-ocean-700'
                : 'border-transparent text-slate-500 hover:text-ocean-700 hover:border-ocean-200'
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
          className={cn(active === index ? 'block' : 'hidden')}
        >
          {tab.content}
        </div>
      ))}
    </div>
  )
}
