import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { X, Send } from 'lucide-react'
import Button from '@/components/ui/Button'
import Toast from '@/components/ui/Toast'
import { cn } from '@/utils/cn'

/**
 * Product enquiry modal / inline form.
 * @param {object}   product     — product data object
 * @param {boolean}  isOpen      — controls visibility as modal
 * @param {function} onClose     — close handler (modal mode)
 * @param {boolean}  modal       — render as modal overlay
 */
export default function EnquiryForm({
  product,
  isOpen = true,
  onClose,
  modal = false,
}) {
  const [done, setDone] = useState(false)
  const [toast, setToast] = useState({ visible: false })

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    await new Promise((res) => setTimeout(res, 1000))
    console.info('Enquiry:', { product: product?.name, ...data })
    setDone(true)
    reset()
    setToast({ visible: true })
    if (modal && onClose) setTimeout(onClose, 2500)
  }

  const formContent = (
    <div className={cn('bg-white rounded-3xl overflow-hidden', modal ? 'shadow-2xl' : 'shadow-card')}>
      {/* Header */}
      <div className="bg-gradient-ocean p-6 relative">
        {modal && onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Close enquiry form"
          >
            <X size={16} />
          </button>
        )}
        <p className="text-teal-300 text-xs font-semibold uppercase tracking-widest mb-1">
          Product Enquiry
        </p>
        <h3 className="font-display font-bold text-xl text-white">
          {product?.name ?? 'Enquire About Our Products'}
        </h3>
        {product?.tagline && (
          <p className="text-white/60 text-sm mt-1">{product.tagline}</p>
        )}
      </div>

      {done ? (
        <div className="p-8 text-center">
          <div className="text-4xl mb-3">✅</div>
          <h4 className="font-display font-bold text-ocean-900 mb-2">Enquiry Received!</h4>
          <p className="text-slate-500 text-sm">
            Our sales team will contact you within 24 business hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4" noValidate>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Your name"
              {...register('name', { required: 'Required' })}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-colors"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              {...register('phone', { required: 'Required' })}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-colors"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
            <input
              type="email"
              placeholder="you@email.com"
              {...register('email')}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
            <textarea
              rows={3}
              placeholder="Any specific requirements, quantity, or questions..."
              {...register('message')}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-colors"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={isSubmitting}
            rightIcon={<Send size={14} />}
          >
            {isSubmitting ? 'Sending...' : 'Submit Enquiry'}
          </Button>
        </form>
      )}
    </div>
  )

  if (modal) {
    if (!isOpen) return null
    return (
      <>
        <div
          className="fixed inset-0 bg-ocean-950/60 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div
            className="w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {formContent}
          </div>
        </div>
        <Toast
          visible={toast.visible}
          type="success"
          message="Your enquiry has been submitted!"
          onClose={() => setToast({ visible: false })}
        />
      </>
    )
  }

  return formContent
}
