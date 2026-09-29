import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-ocean flex items-center justify-center px-4 pt-16">
      <div className="text-center max-w-lg">
        {/* Large number */}
        <div className="font-display font-extrabold text-[120px] leading-none text-white/10 mb-2 select-none">
          404
        </div>
        <div className="-mt-10 mb-6">
          <span className="text-6xl">🐟</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl text-white mb-3">
          Page Not Found
        </h1>
        <p className="text-white/70 text-lg mb-8 leading-relaxed">
          Looks like this page swam away. Let's get you back to familiar waters.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button href="/" variant="light" size="lg" leftIcon={<Home size={16} />}>
            Go to Home
          </Button>
          <Button
            variant="ghost"
            size="lg"
            leftIcon={<ArrowLeft size={16} />}
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </div>

        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          {[
            { label: 'Products', href: '/products' },
            { label: 'About Us', href: '/about-us' },
            { label: 'Contact', href: '/contact-us' },
            { label: 'Blog', href: '/blog' },
          ].map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-white/60 hover:text-white text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
