import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Send, CheckCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import Toast from '@/components/ui/Toast'

const INQUIRY_TYPES = [
  'Product Query',
  'Distributorship',
  'Export / International',
  'Technical Support',
  'Sample Request',
  'General Enquiry',
  'Other',
]

const CATEGORIES = [
  'Enzymes',
  'Growth Promoters',
  'Immune Enhancers',
  'Probiotics & Prebiotics',
  'Vitamins & Minerals',
  'Water Quality Enhancers',
  'White Gut Reducer',
  'Multiple Products',
]

export default function ContactForm({ prefillProduct, className }) {
  const [submitted, setSubmitted] = useState(false)
  const [toast, setToast] = useState({ visible: false, type: 'success', message: '' })

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      inquiryType: prefillProduct ? 'Product Query' : '',
    },
  })

  const inquiryType = watch('inquiryType')
  const showCategory = inquiryType === 'Product Query' || inquiryType === 'Technical Support'

  const onSubmit = async (data) => {
    // Simulate API submission
    await new Promise((res) => setTimeout(res, 1200))
    console.info('Form submitted:', data)
    setSubmitted(true)
    reset()
    setToast({
      visible: true,
      type: 'success',
      message: 'Your message has been sent! We\'ll get back to you within 24 hours.',
    })
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-8 bg-white rounded-3xl shadow-card">
        <div className="w-16 h-16 rounded-full bg-seafoam-500/10 flex items-center justify-center mb-5">
          <CheckCircle size={32} className="text-seafoam-500" />
        </div>
        <h3 className="font-display font-bold text-xl text-ocean-900 mb-2">Message Sent!</h3>
        <p className="text-slate-500 text-sm mb-6 max-w-xs">
          Thank you for reaching out. Our team will respond within 24 business hours.
        </p>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setSubmitted(false)}
        >
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={className}
        noValidate
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div className="sm:col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="name">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your full name"
              {...register('name', { required: 'Full name is required' })}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-colors"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="sm:col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="email">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register('email', {
                required: 'Email address is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
              })}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-colors"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="phone">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              {...register('phone')}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-colors"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="country">
              Country
            </label>
            <input
              id="country"
              type="text"
              placeholder="India"
              {...register('country')}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-colors"
            />
          </div>

          {/* Inquiry Type */}
          <div className={showCategory ? '' : 'sm:col-span-2'}>
            <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="inquiryType">
              Inquiry Type <span className="text-red-500">*</span>
            </label>
            <select
              id="inquiryType"
              {...register('inquiryType', { required: 'Please select an inquiry type' })}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 bg-white focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-colors"
            >
              <option value="">Select inquiry type...</option>
              {INQUIRY_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            {errors.inquiryType && (
              <p className="text-red-500 text-xs mt-1">{errors.inquiryType.message}</p>
            )}
          </div>

          {/* Product Category (conditional) */}
          {showCategory && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="category">
                Product Category
              </label>
              <select
                id="category"
                {...register('category')}
                defaultValue={prefillProduct || ''}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 bg-white focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-colors"
              >
                <option value="">Select category...</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          )}

          {/* Message */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="message">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Tell us about your farm, the product you're interested in, or how we can help you..."
              {...register('message', {
                required: 'Message is required',
                minLength: { value: 20, message: 'Please write at least 20 characters' },
              })}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-colors resize-none"
            />
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isSubmitting}
            rightIcon={<Send size={16} />}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
          <p className="text-center text-xs text-slate-400 mt-3">
            We respond within 24 business hours.
          </p>
        </div>
      </form>

      <Toast
        visible={toast.visible}
        type={toast.type}
        message={toast.message}
        onClose={() => setToast((t) => ({ ...t, visible: false }))}
      />
    </>
  )
}
