import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppChatAssistant from '@/components/chat/WhatsAppChatAssistant'

/**
 * Root layout wrapper — Navbar + main content + Footer + WhatsApp chat assistant.
 * Scroll-to-top is handled here on every route change.
 */
export default function Layout({ children }) {
  const { pathname } = useLocation()

  // Scroll to top on every navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {children}
      </main>

      <Footer />

      {/* Interactive WhatsApp Chat & Order Assistant */}
      <WhatsAppChatAssistant />
    </div>
  )
}

