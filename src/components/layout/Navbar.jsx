import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  Menu, X, Phone, ChevronDown, ChevronRight,
  Download, FlaskConical, Globe,
} from 'lucide-react'
import { cn } from '@/utils/cn'
import Button from '@/components/ui/Button'
import { NAV_LINKS, CONTACT_CTA } from '@/data/navigation'

const ICON_MAP = { Download, FlaskConical, Globe }

/* ─── Mega Menu (Products) ──────────────────────────────────── */
function MegaMenu({ item, onClose }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[720px] max-w-[95vw] z-50">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="grid grid-cols-3 gap-0">
          {/* Categories column */}
          <div className="col-span-2 p-6 border-r border-slate-100">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Product Categories
            </p>
            <div className="grid grid-cols-2 gap-1">
              {item.categories.map((cat) => (
                <Link
                  key={cat.href}
                  to={cat.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-start gap-3 p-3 rounded-xl transition-colors',
                    'hover:bg-ocean-50 group'
                  )}
                >
                  <span className="text-xl mt-0.5">{cat.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 group-hover:text-ocean-700 leading-tight">
                      {cat.label}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{cat.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <Link
                to="/products"
                onClick={onClose}
                className="text-sm font-semibold text-ocean-700 hover:text-teal-600 flex items-center gap-1 transition-colors"
              >
                View All Products <ChevronRight size={14} />
              </Link>
            </div>
          </div>

          {/* Quick links column */}
          <div className="p-6 bg-slate-50">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Quick Links
            </p>
            <div className="space-y-2">
              {item.quickLinks.map((ql) => {
                const Icon = ICON_MAP[ql.icon]
                return (
                  <Link
                    key={ql.href}
                    to={ql.href}
                    onClick={onClose}
                    className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-white transition-colors group"
                  >
                    {Icon && (
                      <div className="w-8 h-8 rounded-lg bg-ocean-700/10 flex items-center justify-center shrink-0">
                        <Icon size={15} className="text-ocean-700" />
                      </div>
                    )}
                    <span className="text-sm text-slate-700 group-hover:text-ocean-700 font-medium transition-colors">
                      {ql.label}
                    </span>
                  </Link>
                )
              })}
            </div>

            {/* CTA card */}
            <div className="mt-5 p-4 bg-gradient-teal rounded-xl">
              <p className="text-white text-sm font-semibold leading-snug">
                Need Expert Guidance?
              </p>
              <p className="text-white/80 text-xs mt-1 mb-3">
                Talk to our aquaculture specialists
              </p>
              <Link
                to="/contact-us"
                onClick={onClose}
                className="inline-flex items-center gap-1 bg-white text-ocean-700 text-xs font-bold px-3 py-1.5 rounded-full hover:bg-ocean-50 transition-colors"
              >
                Contact Us <ChevronRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Dropdown Menu (Research & Quality) ────────────────────── */
function DropdownMenu({ item, onClose }) {
  return (
    <div className="absolute top-full left-0 pt-3 w-52 z-50">
      <div className="bg-white rounded-xl shadow-xl border border-slate-100 py-2 overflow-hidden">
        {item.dropdown.map((link) => (
          <NavLink
            key={link.href}
            to={link.href}
            onClick={onClose}
            className={({ isActive }) =>
              cn(
                'block px-4 py-2.5 text-sm transition-colors',
                isActive
                  ? 'text-ocean-700 bg-ocean-50 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-ocean-700'
              )
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

/* ─── Mobile Menu ───────────────────────────────────────────── */
function MobileMenu({ isOpen, onClose }) {
  const [openAccordion, setOpenAccordion] = useState(null)
  const location = useLocation()

  useEffect(() => {
    onClose()
  }, [location.pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-ocean-950/60 z-40 transition-opacity duration-300 lg:hidden',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white z-50',
          'flex flex-col shadow-2xl transition-transform duration-300 ease-out lg:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <Link to="/" onClick={onClose} className="flex items-center">
            <img
              src="/images/keytone-official-logo.png"
              alt="Keytone Life Sciences"
              className="h-9 w-auto object-contain logo-dark-navy"
            />
          </Link>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {NAV_LINKS.map((item) => {
            if (item.mega) {
              return (
                <div key={item.label}>
                  <button
                    onClick={() =>
                      setOpenAccordion(openAccordion === item.label ? null : item.label)
                    }
                    className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-left text-base font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
                  >
                    {item.label}
                    <ChevronDown
                      size={18}
                      className={cn(
                        'transition-transform duration-200',
                        openAccordion === item.label ? 'rotate-180' : ''
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      'overflow-hidden transition-all duration-300',
                      openAccordion === item.label ? 'max-h-[500px]' : 'max-h-0'
                    )}
                  >
                    <div className="pl-3 pb-2 space-y-1">
                      {item.categories.map((cat) => (
                        <Link
                          key={cat.href}
                          to={cat.href}
                          onClick={onClose}
                          className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:bg-ocean-50 hover:text-ocean-700 transition-colors"
                        >
                          <span>{cat.icon}</span>
                          {cat.label}
                        </Link>
                      ))}
                      <Link
                        to="/products"
                        onClick={onClose}
                        className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-ocean-700"
                      >
                        View All Products <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            }

            if (item.dropdown) {
              return (
                <div key={item.label}>
                  <button
                    onClick={() =>
                      setOpenAccordion(openAccordion === item.label ? null : item.label)
                    }
                    className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-left text-base font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
                  >
                    {item.label}
                    <ChevronDown
                      size={18}
                      className={cn(
                        'transition-transform duration-200',
                        openAccordion === item.label ? 'rotate-180' : ''
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      'overflow-hidden transition-all duration-300',
                      openAccordion === item.label ? 'max-h-64' : 'max-h-0'
                    )}
                  >
                    <div className="pl-3 pb-2 space-y-1">
                      {item.dropdown.map((link) => (
                        <NavLink
                          key={link.href}
                          to={link.href}
                          onClick={onClose}
                          className={({ isActive }) =>
                            cn(
                              'block px-3 py-2.5 rounded-xl text-sm transition-colors',
                              isActive
                                ? 'bg-ocean-50 text-ocean-700 font-semibold'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-ocean-700'
                            )
                          }
                        >
                          {link.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              )
            }

            return (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'block px-3 py-3 rounded-xl text-base font-semibold transition-colors',
                    isActive
                      ? 'bg-ocean-50 text-ocean-700'
                      : 'text-slate-800 hover:bg-slate-50 hover:text-ocean-700'
                  )
                }
              >
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        {/* Drawer footer */}
        <div className="px-4 pb-6 pt-4 border-t border-slate-100 space-y-3">
          <Link
            to="/contact-us"
            onClick={onClose}
            className="block w-full text-center bg-ocean-700 text-white font-semibold py-3 rounded-full hover:bg-ocean-800 transition-colors"
          >
            Contact Us
          </Link>
          <a
            href="tel:+919959002666"
            className="flex items-center justify-center gap-2 text-sm text-slate-600 font-medium"
          >
            <Phone size={15} />
            +91 9959 002 666
          </a>
        </div>
      </div>
    </>
  )
}

/* ─── Main Navbar ───────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [activeMenu, setActiveMenu]   = useState(null)
  const menuRef                       = useRef(null)
  const location                      = useLocation()

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menus on route change
  useEffect(() => {
    setActiveMenu(null)
    setMobileOpen(false)
  }, [location.pathname])

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenu(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-nav py-0'
            : 'bg-transparent py-1'
        )}
      >
        <div className="container-xl">
          <div className="flex items-center justify-between h-16 lg:h-18">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
              <img
                src="/images/keytone-official-logo.png"
                alt="Keytone Life Sciences"
                className={cn(
                  "h-10 sm:h-12 w-auto object-contain transition-all duration-300 group-hover:scale-105",
                  scrolled ? "logo-dark-navy drop-shadow-none" : "brightness-110 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                )}
              />
            </Link>

            {/* Desktop nav */}
            <nav ref={menuRef} className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((item) => {
                const hasMenu = item.mega || item.dropdown
                const isActive = activeMenu === item.label

                return (
                  <div key={item.label} className="relative">
                    {hasMenu ? (
                      <button
                        onClick={() => setActiveMenu(isActive ? null : item.label)}
                        onMouseEnter={() => setActiveMenu(item.label)}
                        className={cn(
                          'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                          scrolled
                            ? 'text-slate-700 hover:text-ocean-700 hover:bg-slate-50'
                            : 'text-white/90 hover:text-white hover:bg-white/10',
                          isActive && (scrolled ? 'text-ocean-700 bg-slate-50' : 'text-white bg-white/10')
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          size={15}
                          className={cn(
                            'transition-transform duration-200',
                            isActive ? 'rotate-180' : ''
                          )}
                        />
                      </button>
                    ) : (
                      <NavLink
                        to={item.href}
                        className={({ isActive: navActive }) =>
                          cn(
                            'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                            scrolled
                              ? navActive
                                ? 'text-ocean-700 bg-ocean-50'
                                : 'text-slate-700 hover:text-ocean-700 hover:bg-slate-50'
                              : navActive
                                ? 'text-white bg-white/15'
                                : 'text-white/90 hover:text-white hover:bg-white/10'
                          )
                        }
                      >
                        {item.label}
                      </NavLink>
                    )}

                    {/* Menus */}
                    {hasMenu && isActive && (
                      <div onMouseLeave={() => setActiveMenu(null)}>
                        {item.mega ? (
                          <MegaMenu item={item} onClose={() => setActiveMenu(null)} />
                        ) : (
                          <DropdownMenu item={item} onClose={() => setActiveMenu(null)} />
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>

            {/* Desktop right actions */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+919959002666"
                className={cn(
                  'flex items-center gap-1.5 text-sm font-medium transition-colors',
                  scrolled ? 'text-slate-600 hover:text-ocean-700' : 'text-white/80 hover:text-white'
                )}
              >
                <Phone size={14} />
                +91 9959 002 666
              </a>
              <Button
                href={CONTACT_CTA.href}
                variant={scrolled ? 'primary' : 'ghost'}
                size="sm"
              >
                {CONTACT_CTA.label}
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className={cn(
                'lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-colors',
                scrolled
                  ? 'text-slate-700 hover:bg-slate-100'
                  : 'text-white hover:bg-white/10'
              )}
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
