import { useState, useMemo, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageCircle,
  X,
  ShoppingBag,
  Send,
  ChevronRight,
  ArrowLeft,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  ExternalLink,
  Search,
  Sparkles,
  PhoneCall,
  FileText,
  User,
  Phone,
  MapPin,
  MessageSquare,
  HelpCircle,
  RefreshCw
} from 'lucide-react'
import { CATEGORIES, PRODUCTS } from '@/data/products'

const WHATSAPP_NUMBER = '919959002666'
const COMPANY_NAME = 'Keytone Life Sciences'

// WhatsApp SVG Icon
function WhatsAppIcon({ className = 'w-6 h-6', fill = 'currentColor' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={fill}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.888 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.71 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function WhatsAppChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [view, setView] = useState('home') // 'home' | 'categories' | 'products' | 'cart' | 'checkout' | 'success'
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [cart, setCart] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPackSizes, setSelectedPackSizes] = useState({})
  const [hasPrompted, setHasPrompted] = useState(false)
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState('')

  const [customer, setCustomer] = useState({
    name: '',
    mobile: '',
    location: '',
    notes: '',
  })
  const [errors, setErrors] = useState({})

  const chatBodyRef = useRef(null)

  // Scroll to top of content when view changes
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = 0
    }
  }, [view, selectedCategory])

  // Show a welcome tooltip bubble after 3 seconds on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasPrompted(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  // Cart item count and total products
  const totalCartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0)
  }, [cart])

  // Filtered products for active category and search query
  const categoryProducts = useMemo(() => {
    if (!selectedCategory) return []
    let list = PRODUCTS.filter((p) => p.categoryId === selectedCategory.id)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    }
    return list
  }, [selectedCategory, searchQuery])

  // Helper to handle pack size selection for each product card
  const getProductPackSize = (product) => {
    return (
      selectedPackSizes[product.id] ||
      (product.packSizes && product.packSizes[0]) ||
      'Standard Pack'
    )
  }

  const setProductPackSize = (productId, size) => {
    setSelectedPackSizes((prev) => ({ ...prev, [productId]: size }))
  }

  // Cart Management
  const addToCart = (product) => {
    const packSize = getProductPackSize(product)
    const cartItemId = `${product.id}_${packSize}`

    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId)
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [
        ...prev,
        {
          cartItemId,
          productId: product.id,
          name: product.name,
          categoryName: selectedCategory ? selectedCategory.label : 'Keytone Aquaculture',
          packSize,
          image: product.image,
          quantity: 1,
        },
      ]
    })
  }

  const updateQuantity = (cartItemId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter(Boolean)
    )
  }

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId))
  }

  const getItemQuantityInCart = (productId, packSize) => {
    const item = cart.find(
      (c) => c.productId === productId && c.packSize === packSize
    )
    return item ? item.quantity : 0
  }

  // Reset form and cart
  const resetAll = () => {
    setView('home')
    setSelectedCategory(null)
    setCart([])
    setSearchQuery('')
    setCustomer({ name: '', mobile: '', location: '', notes: '' })
    setErrors({})
  }

  // Build clean WhatsApp message and send
  const handleSendOrderToWhatsApp = (e) => {
    e.preventDefault()

    const newErrors = {}
    if (!customer.name.trim()) newErrors.name = 'Please enter your name'
    if (!customer.mobile.trim()) {
      newErrors.mobile = 'Please enter your mobile number'
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(customer.mobile.trim())) {
      newErrors.mobile = 'Please enter a valid phone number'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})

    const itemsText = cart
      .map(
        (item, index) =>
          `${index + 1}. *${item.name}* (${item.categoryName})\n   ▫️ Pack Size: ${item.packSize}\n   ▫️ Qty: ${item.quantity}`
      )
      .join('\n\n')

    const dateStr = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })

    const message = `*🛒 NEW PRODUCT ORDER / INQUIRY*
---------------------------------------
🏢 *${COMPANY_NAME}*
📅 *Date:* ${dateStr}

👤 *CUSTOMER DETAILS:*
• *Name:* ${customer.name.trim()}
• *Mobile:* ${customer.mobile.trim()}${
      customer.location.trim()
        ? `\n• *Farm / Location:* ${customer.location.trim()}`
        : ''
    }

📦 *ORDERED PRODUCTS (${totalCartCount} items):*
${itemsText}
${
  customer.notes.trim()
    ? `\n💬 *Customer Note / Questions:*\n"${customer.notes.trim()}"`
    : ''
}

---------------------------------------
_Sent via Keytone Aquaculture Chat & Order System_`

    const encoded = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`
    setLastWhatsAppUrl(whatsappUrl)

    // Open WhatsApp in new window
    window.open(whatsappUrl, '_blank')
    setView('success')
  }

  // Direct WhatsApp general message
  const handleDirectWhatsApp = (customText = '') => {
    const text =
      customText ||
      `Hello ${COMPANY_NAME}! I visited your website and would like to inquire about your aquaculture biotechnology formulations and pricing.`
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      text
    )}`
    window.open(url, '_blank')
  }

  return (
    <>
      {/* ── Trigger / Floating Button ── */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
        {/* Tooltip / Prompt bubble on first load (if closed) */}
        <AnimatePresence>
          {!isOpen && hasPrompted && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="mb-3 mr-1 bg-white text-slate-800 px-4 py-2.5 rounded-2xl shadow-xl border border-teal-100 flex items-center gap-3 cursor-pointer group hover:border-teal-300"
              onClick={() => setIsOpen(true)}
            >
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-ocean-900 leading-tight flex items-center gap-1.5">
                  Need Help or Want to Order?
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Chat & Order products directly on WhatsApp!
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setHasPrompted(false)
                }}
                className="text-slate-400 hover:text-slate-600 p-1 -mr-1"
                aria-label="Dismiss prompt"
              >
                <X size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Trigger Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`relative flex items-center justify-center rounded-full shadow-2xl transition-all duration-300 ${
            isOpen
              ? 'w-14 h-14 bg-slate-800 text-white hover:bg-slate-900 ring-4 ring-slate-800/20'
              : 'w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] text-white hover:bg-[#20ba5a] ring-4 ring-[#25D366]/30 hover:ring-[#25D366]/50'
          }`}
          aria-label={isOpen ? 'Close chat' : 'Open WhatsApp chat'}
        >
          {isOpen ? (
            <X size={26} className="transition-transform rotate-0" />
          ) : (
            <>
              <WhatsAppIcon className="w-8 h-8 sm:w-9 sm:h-9" />
              {/* Online Pulse Indicator */}
              <span className="absolute top-0.5 right-0.5 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 border-2 border-white"></span>
              </span>

              {/* Cart badge if items exist */}
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -left-1.5 bg-gold-500 text-slate-900 font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-md animate-bounce">
                  {totalCartCount}
                </span>
              )}
            </>
          )}
        </motion.button>
      </div>

      {/* ── Chat Modal Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-20 sm:bottom-24 right-3 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[410px] h-[580px] max-h-[calc(100vh-6.5rem)] bg-slate-50 rounded-3xl shadow-2xl border border-slate-200/80 flex flex-col overflow-hidden font-sans"
          >
            {/* ── Top Header ── */}
            <div className="bg-gradient-to-r from-ocean-900 via-ocean-800 to-teal-800 text-white px-4 py-3.5 flex items-center justify-between shrink-0 shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-inner">
                    <WhatsAppIcon className="w-6 h-6" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-ocean-900" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display font-bold text-sm tracking-wide">
                      {COMPANY_NAME}
                    </h3>
                    <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-medium px-1.5 py-0.5 rounded border border-emerald-400/30">
                      Support
                    </span>
                  </div>
                  <p className="text-[11px] text-teal-200/90 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Online • Instant Order & Chat
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Cart View Trigger */}
                {totalCartCount > 0 && (
                  <button
                    onClick={() => setView(view === 'cart' ? 'home' : 'cart')}
                    className="relative p-2 rounded-full hover:bg-white/10 transition-colors text-white"
                    title="View Cart"
                  >
                    <ShoppingBag size={18} />
                    <span className="absolute -top-1 -right-1 bg-gold-500 text-slate-900 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                      {totalCartCount}
                    </span>
                  </button>
                )}

                {/* Reset button */}
                <button
                  onClick={resetAll}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors text-teal-200 hover:text-white"
                  title="Restart Chat"
                >
                  <RefreshCw size={16} />
                </button>

                {/* Close modal */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
                  title="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* ── Sub-nav Bar (Breadcrumbs & Cart summary) ── */}
            {view !== 'home' && (
              <div className="bg-white px-4 py-2 border-b border-slate-200/80 flex items-center justify-between text-xs text-slate-600 shrink-0">
                <button
                  onClick={() => {
                    if (view === 'products') setView('categories')
                    else if (view === 'cart') setView('products')
                    else if (view === 'checkout') setView('cart')
                    else setView('home')
                  }}
                  className="inline-flex items-center gap-1 text-teal-700 font-medium hover:text-teal-900"
                >
                  <ArrowLeft size={14} /> Back
                </button>

                <span className="font-semibold text-slate-700 capitalize">
                  {view === 'categories' && 'Product Categories'}
                  {view === 'products' && selectedCategory?.label}
                  {view === 'cart' && `Cart (${totalCartCount} items)`}
                  {view === 'checkout' && 'Booking Details'}
                  {view === 'success' && 'Order Forwarded'}
                </span>

                {totalCartCount > 0 && view !== 'cart' && view !== 'checkout' && (
                  <button
                    onClick={() => setView('cart')}
                    className="text-teal-700 font-bold hover:underline flex items-center gap-1"
                  >
                    Cart ({totalCartCount})
                  </button>
                )}
                {totalCartCount === 0 && <span />}
              </div>
            )}

            {/* ── Chat Body Content ── */}
            <div
              ref={chatBodyRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
            >
              {/* ────────────────── VIEW: HOME / WELCOME ────────────────── */}
              {view === 'home' && (
                <div className="space-y-4">
                  {/* Assistant Message */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-teal-700 text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-sm">
                      K
                    </div>
                    <div className="bg-white p-3.5 rounded-2xl rounded-tl-sm shadow-sm border border-slate-200 text-slate-800 text-xs leading-relaxed max-w-[85%]">
                      <p className="font-medium text-ocean-900 mb-1">
                        👋 Hi there! Welcome to Keytone Life Sciences.
                      </p>
                      <p className="text-slate-600">
                        We are ISO 9001:2015 & GMP certified manufacturers of
                        premium biotechnology aquaculture formulations for shrimp
                        & fish farming.
                      </p>
                      <p className="text-slate-600 mt-2 font-medium text-teal-800">
                        How can we help you today?
                      </p>
                    </div>
                  </div>

                  {/* Main Action Menu Options */}
                  <div className="pl-9 space-y-2">
                    {/* 1. Products Buying / Order Products */}
                    <button
                      onClick={() => setView('categories')}
                      className="w-full text-left bg-gradient-to-r from-teal-50 to-emerald-50 hover:from-teal-100 hover:to-emerald-100 border border-teal-200 hover:border-teal-400 p-3 rounded-xl transition-all shadow-sm flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                          <ShoppingBag size={18} />
                        </div>
                        <div>
                          <div className="font-semibold text-ocean-900 text-xs flex items-center gap-1.5">
                            🛒 Order / Buy Products
                            <span className="bg-teal-600 text-white text-[9px] px-1.5 py-0.2 rounded-full font-bold">
                              Select & Send
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Browse categories, select items & order via WhatsApp
                          </p>
                        </div>
                      </div>
                      <ChevronRight
                        size={16}
                        className="text-teal-600 group-hover:translate-x-0.5 transition-transform"
                      />
                    </button>

                    {/* 2. Direct WhatsApp Support */}
                    <button
                      onClick={() => handleDirectWhatsApp()}
                      className="w-full text-left bg-white hover:bg-slate-50 border border-slate-200 hover:border-emerald-400 p-3 rounded-xl transition-all shadow-sm flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                          <WhatsAppIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800 text-xs">
                            💬 Direct WhatsApp Chat
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Chat directly with our aquaculture sales expert
                          </p>
                        </div>
                      </div>
                      <ExternalLink
                        size={15}
                        className="text-slate-400 group-hover:text-emerald-600 transition-colors"
                      />
                    </button>

                    {/* 3. Technical / Dosage Consultation */}
                    <button
                      onClick={() =>
                        handleDirectWhatsApp(
                          'Hello Keytone Team, I need technical consultation & dosage guidance for my shrimp/fish pond.'
                        )
                      }
                      className="w-full text-left bg-white hover:bg-slate-50 border border-slate-200 hover:border-teal-300 p-2.5 rounded-xl transition-all shadow-sm flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-ocean-100 text-ocean-700 flex items-center justify-center shrink-0">
                          <PhoneCall size={14} />
                        </div>
                        <div>
                          <div className="font-medium text-slate-800 text-xs">
                            🧪 Pond Dosage Consultation
                          </div>
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-slate-400" />
                    </button>

                    {/* 4. Request Product Catalog */}
                    <button
                      onClick={() =>
                        handleDirectWhatsApp(
                          'Hello Keytone Team, please share your complete Product Catalog and wholesale price list.'
                        )
                      }
                      className="w-full text-left bg-white hover:bg-slate-50 border border-slate-200 hover:border-teal-300 p-2.5 rounded-xl transition-all shadow-sm flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-gold-100 text-gold-700 flex items-center justify-center shrink-0">
                          <FileText size={14} />
                        </div>
                        <div>
                          <div className="font-medium text-slate-800 text-xs">
                            📋 Request Full Product Catalog
                          </div>
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-slate-400" />
                    </button>
                  </div>
                </div>
              )}

              {/* ────────────────── VIEW: CATEGORIES ────────────────── */}
              {view === 'categories' && (
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-teal-700 text-white flex items-center justify-center shrink-0 text-[10px] font-bold">
                      K
                    </div>
                    <div className="bg-white p-3 rounded-2xl rounded-tl-sm shadow-sm border border-slate-200 text-slate-800 text-xs leading-snug">
                      <p className="font-semibold text-ocean-900">
                        Please choose a category to view products:
                      </p>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        Select a category below to explore formulations & add
                        items to your order.
                      </p>
                    </div>
                  </div>

                  {/* Categories Grid */}
                  <div className="grid grid-cols-1 gap-2 pt-1">
                    {CATEGORIES.map((cat) => {
                      const count = PRODUCTS.filter(
                        (p) => p.categoryId === cat.id
                      ).length
                      return (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setSelectedCategory(cat)
                            setSearchQuery('')
                            setView('products')
                          }}
                          className="w-full text-left bg-white hover:bg-teal-50/60 p-3 rounded-xl border border-slate-200 hover:border-teal-400 transition-all shadow-sm flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{cat.icon}</span>
                            <div>
                              <div className="font-semibold text-xs text-ocean-900 group-hover:text-teal-800">
                                {cat.label}
                              </div>
                              <p className="text-[11px] text-slate-500 line-clamp-1">
                                {cat.tagline}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded-full border border-slate-200">
                              {count} items
                            </span>
                            <ChevronRight
                              size={14}
                              className="text-slate-400 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-transform"
                            />
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* ────────────────── VIEW: PRODUCTS LIST ────────────────── */}
              {view === 'products' && selectedCategory && (
                <div className="space-y-3">
                  {/* Category Header Banner */}
                  <div className="bg-gradient-to-r from-teal-800 to-ocean-900 text-white p-3 rounded-2xl shadow-sm flex items-center justify-between">
                    <div>
                      <span className="text-xs text-teal-200 font-medium">
                        Category:
                      </span>
                      <h4 className="font-display font-bold text-sm text-white flex items-center gap-1.5">
                        <span>{selectedCategory.icon}</span>{' '}
                        {selectedCategory.label}
                      </h4>
                    </div>
                    <button
                      onClick={() => setView('categories')}
                      className="text-[11px] bg-white/20 hover:bg-white/30 text-white px-2.5 py-1 rounded-lg transition-colors"
                    >
                      Change Category
                    </button>
                  </div>

                  {/* Search inside category */}
                  <div className="relative">
                    <Search
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={`Search ${selectedCategory.label}...`}
                      className="w-full pl-8 pr-3 py-1.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 shadow-sm"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Products list */}
                  <div className="space-y-2.5 pt-1">
                    {categoryProducts.length === 0 ? (
                      <div className="text-center py-6 bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
                        No products found matching "{searchQuery}".
                      </div>
                    ) : (
                      categoryProducts.map((product) => {
                        const currentPack = getProductPackSize(product)
                        const qtyInCart = getItemQuantityInCart(
                          product.id,
                          currentPack
                        )

                        return (
                          <div
                            key={product.id}
                            className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm hover:border-teal-300 transition-all space-y-2.5"
                          >
                            <div className="flex gap-3 items-start">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-14 h-14 object-contain rounded-xl bg-slate-50 border border-slate-100 p-1 shrink-0"
                                onError={(e) => {
                                  e.currentTarget.src =
                                    '/images/Keytone-Enzymes.png'
                                }}
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h5 className="font-display font-bold text-xs text-ocean-950 truncate">
                                    {product.name}
                                  </h5>
                                  {product.featured && (
                                    <span className="text-[9px] bg-gold-500/10 text-gold-700 font-semibold px-1.5 py-0.2 rounded border border-gold-400/30">
                                      ★ Popular
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">
                                  {product.tagline}
                                </p>
                              </div>
                            </div>

                            {/* Pack Sizes & Quantity / Add Controls */}
                            <div className="flex items-center justify-between pt-1 border-t border-slate-100 gap-2">
                              {/* Pack Size Selector */}
                              {product.packSizes &&
                              product.packSizes.length > 1 ? (
                                <div className="flex items-center gap-1">
                                  <span className="text-[10px] text-slate-400 font-medium">
                                    Pack:
                                  </span>
                                  <select
                                    value={currentPack}
                                    onChange={(e) =>
                                      setProductPackSize(
                                        product.id,
                                        e.target.value
                                      )
                                    }
                                    className="text-[11px] font-semibold bg-slate-100 text-slate-700 rounded-lg px-2 py-1 border border-slate-200 focus:outline-none focus:border-teal-500"
                                  >
                                    {product.packSizes.map((size) => (
                                      <option key={size} value={size}>
                                        {size}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              ) : (
                                <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                                  {product.packSizes?.[0] || 'Standard Pack'}
                                </span>
                              )}

                              {/* Add / Stepper Button */}
                              {qtyInCart > 0 ? (
                                <div className="flex items-center gap-1.5 bg-teal-50 border border-teal-300 rounded-xl px-2 py-0.5">
                                  <button
                                    onClick={() =>
                                      updateQuantity(
                                        `${product.id}_${currentPack}`,
                                        -1
                                      )
                                    }
                                    className="text-teal-800 hover:text-teal-950 p-1"
                                    title="Decrease quantity"
                                  >
                                    <Minus size={12} />
                                  </button>
                                  <span className="text-xs font-bold text-teal-900 min-w-4 text-center">
                                    {qtyInCart}
                                  </span>
                                  <button
                                    onClick={() => addToCart(product)}
                                    className="text-teal-800 hover:text-teal-950 p-1"
                                    title="Increase quantity"
                                  >
                                    <Plus size={12} />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => addToCart(product)}
                                  className="inline-flex items-center gap-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs px-3 py-1.5 rounded-xl transition-colors shadow-sm"
                                >
                                  <Plus size={13} /> Add to Order
                                </button>
                              )}
                            </div>
                          </div>
                        )
                      })
                    )}
                  </div>
                </div>
              )}

              {/* ────────────────── VIEW: CART / ORDER SUMMARY ────────────────── */}
              {view === 'cart' && (
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <div>
                        <h4 className="font-bold text-xs text-ocean-950">
                          Selected Products ({totalCartCount})
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          Review items before entering contact details
                        </p>
                      </div>
                      <button
                        onClick={() => setCart([])}
                        className="text-[11px] text-red-500 hover:text-red-700 hover:underline flex items-center gap-1"
                      >
                        <Trash2 size={12} /> Clear all
                      </button>
                    </div>

                    {cart.length === 0 ? (
                      <div className="text-center py-8 text-slate-500 text-xs space-y-2">
                        <ShoppingBag
                          size={32}
                          className="mx-auto text-slate-300"
                        />
                        <p>Your order cart is empty.</p>
                        <button
                          onClick={() => setView('categories')}
                          className="inline-flex items-center gap-1 bg-teal-600 text-white text-xs px-3 py-1.5 rounded-xl font-medium"
                        >
                          <Plus size={13} /> Browse Products
                        </button>
                      </div>
                    ) : (
                      <div className="divide-y divide-slate-100 mt-2 space-y-2">
                        {cart.map((item) => (
                          <div
                            key={item.cartItemId}
                            className="pt-2 flex items-center justify-between gap-2"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-10 h-10 object-contain rounded-lg bg-slate-50 border border-slate-100 p-0.5 shrink-0"
                                onError={(e) => {
                                  e.currentTarget.src =
                                    '/images/Keytone-Enzymes.png'
                                }}
                              />
                              <div className="min-w-0">
                                <h5 className="font-semibold text-xs text-slate-800 truncate">
                                  {item.name}
                                </h5>
                                <p className="text-[10px] text-slate-500">
                                  Pack: {item.packSize} • {item.categoryName}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.cartItemId, -1)
                                  }
                                  className="w-5 h-5 flex items-center justify-center text-slate-600 hover:bg-white rounded"
                                >
                                  <Minus size={11} />
                                </button>
                                <span className="text-xs font-bold px-1.5 text-slate-800">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(item.cartItemId, 1)
                                  }
                                  className="w-5 h-5 flex items-center justify-center text-slate-600 hover:bg-white rounded"
                                >
                                  <Plus size={11} />
                                </button>
                              </div>

                              <button
                                onClick={() => removeFromCart(item.cartItemId)}
                                className="text-slate-400 hover:text-red-500 p-1"
                                title="Remove item"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Add more items button */}
                  {cart.length > 0 && (
                    <button
                      onClick={() => setView('categories')}
                      className="w-full py-2 bg-white hover:bg-slate-50 border border-dashed border-teal-300 text-teal-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Plus size={14} /> Add More Products / Categories
                    </button>
                  )}
                </div>
              )}

              {/* ────────────────── VIEW: CHECKOUT / BOOKING DETAILS ────────────────── */}
              {view === 'checkout' && (
                <div className="space-y-3">
                  <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-200 space-y-3">
                    <div>
                      <h4 className="font-bold text-xs text-ocean-950 flex items-center gap-1.5">
                        <User size={14} className="text-teal-600" /> Enter Your
                        Contact Information
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Our aquaculture technical sales team will receive your
                        order directly on WhatsApp for stock & price confirmation.
                      </p>
                    </div>

                    {/* Order summary pill */}
                    <div className="bg-teal-50/70 border border-teal-200 p-2.5 rounded-xl text-xs text-teal-900 flex items-center justify-between">
                      <span className="font-medium">
                        Ordering {totalCartCount} item(s) ({cart.length} unique)
                      </span>
                      <button
                        onClick={() => setView('cart')}
                        className="text-[11px] font-bold text-teal-700 underline"
                      >
                        Edit Cart
                      </button>
                    </div>

                    {/* Form Fields */}
                    <form onSubmit={handleSendOrderToWhatsApp} className="space-y-2.5">
                      {/* Full Name */}
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          Full Name / Farm Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User
                            size={14}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                          />
                          <input
                            type="text"
                            value={customer.name}
                            onChange={(e) =>
                              setCustomer({ ...customer, name: e.target.value })
                            }
                            placeholder="e.g. Ramesh Reddy / Sri Sai Farms"
                            className={`w-full pl-8 pr-3 py-2 bg-slate-50 rounded-xl border text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white ${
                              errors.name
                                ? 'border-red-400 focus:border-red-500 bg-red-50/30'
                                : 'border-slate-200 focus:border-teal-500'
                            }`}
                          />
                        </div>
                        {errors.name && (
                          <p className="text-[10px] text-red-500 mt-0.5">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Mobile / WhatsApp Number */}
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          Mobile / WhatsApp Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone
                            size={14}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                          />
                          <input
                            type="tel"
                            value={customer.mobile}
                            onChange={(e) =>
                              setCustomer({
                                ...customer,
                                mobile: e.target.value,
                              })
                            }
                            placeholder="e.g. 9876543210"
                            className={`w-full pl-8 pr-3 py-2 bg-slate-50 rounded-xl border text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white ${
                              errors.mobile
                                ? 'border-red-400 focus:border-red-500 bg-red-50/30'
                                : 'border-slate-200 focus:border-teal-500'
                            }`}
                          />
                        </div>
                        {errors.mobile && (
                          <p className="text-[10px] text-red-500 mt-0.5">
                            {errors.mobile}
                          </p>
                        )}
                      </div>

                      {/* Location / Pond location */}
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          Farm / Delivery Location (Optional)
                        </label>
                        <div className="relative">
                          <MapPin
                            size={14}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                          />
                          <input
                            type="text"
                            value={customer.location}
                            onChange={(e) =>
                              setCustomer({
                                ...customer,
                                location: e.target.value,
                              })
                            }
                            placeholder="e.g. Nellore, Andhra Pradesh"
                            className="w-full pl-8 pr-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-teal-500"
                          />
                        </div>
                      </div>

                      {/* Special requirements / notes */}
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          Any Specific Requirements / Questions? (Optional)
                        </label>
                        <div className="relative">
                          <MessageSquare
                            size={14}
                            className="absolute left-3 top-2.5 text-slate-400"
                          />
                          <textarea
                            rows={2}
                            value={customer.notes}
                            onChange={(e) =>
                              setCustomer({
                                ...customer,
                                notes: e.target.value,
                              })
                            }
                            placeholder="e.g. Requesting price quote for bulk order..."
                            className="w-full pl-8 pr-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-teal-500 resize-none"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* ────────────────── VIEW: SUCCESS SCREEN ────────────────── */}
              {view === 'success' && (
                <div className="text-center py-6 px-3 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 size={36} />
                  </div>

                  <div>
                    <h4 className="font-display font-bold text-base text-ocean-950">
                      Order Inquiry Generated!
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto leading-relaxed">
                      Your order inquiry has been formatted and forwarded to our
                      official WhatsApp support at <strong>+91 99590 02666</strong>.
                    </p>
                  </div>

                  {lastWhatsAppUrl && (
                    <div className="pt-2">
                      <a
                        href={lastWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs rounded-2xl shadow-lg transition-all"
                      >
                        <WhatsAppIcon className="w-5 h-5" /> Open WhatsApp to
                        Send Message
                      </a>
                      <p className="text-[11px] text-slate-400 mt-1.5">
                        (If WhatsApp didn't open automatically, tap the button above)
                      </p>
                    </div>
                  )}

                  <div className="pt-3 border-t border-slate-200 flex gap-2">
                    <button
                      onClick={resetAll}
                      className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
                    >
                      Start New Order
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="flex-1 py-2 bg-ocean-900 hover:bg-ocean-800 text-white font-semibold text-xs rounded-xl transition-colors"
                    >
                      Done / Close
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ── Fixed Bottom Actions Footer ── */}
            {view === 'products' && (
              <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between gap-2 shrink-0">
                <button
                  onClick={() => setView('categories')}
                  className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Categories
                </button>
                <button
                  onClick={() => setView('cart')}
                  disabled={totalCartCount === 0}
                  className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    totalCartCount > 0
                      ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-md'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <ShoppingBag size={14} /> View Order Cart (
                  {totalCartCount} items)
                </button>
              </div>
            )}

            {view === 'cart' && cart.length > 0 && (
              <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setView('products')}
                  className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Back
                </button>
                <button
                  onClick={() => setView('checkout')}
                  className="flex-1 py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  Proceed to Book Order <ChevronRight size={14} />
                </button>
              </div>
            )}

            {view === 'checkout' && (
              <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setView('cart')}
                  className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSendOrderToWhatsApp}
                  className="flex-1 py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4" /> Book & Send to WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
