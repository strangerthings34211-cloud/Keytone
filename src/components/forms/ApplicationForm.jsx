import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Send, Upload } from 'lucide-react'
import Button from '@/components/ui/Button'
import Toast from '@/components/ui/Toast'

export default function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false)
  const [toast, setToast] = useState({ visible: false })

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    await new Promise((res) => setTimeout(res, 1200))
    console.info('Application:', data)
    setSubmitted(true)
    reset()
    setToast({ visible: true })
  }

  if (submitted) {
    return (
      <div className="text-center py-12 px-8 bg-white rounded-3xl shadow-card">
        <div className="text-4xl mb-4">🎉</div>
        <h3 className="font-display font-bold text-xl text-ocean-900 mb-2">Application Submitted!</h3>
        <p className="text-slate-500 text-sm max-w-xs mx-auto">
          Thank you for your interest in joining the Keytone team. We'll review your application and get back to you soon.
        </p>
      </div>
    )
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-3xl shadow-card p-7"
        noValidate
      >
        <h3 className="font-display font-bold text-xl text-ocean-900 mb-6">
          Submit Your Application
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Your full name"
                {...register('name', { required: 'Required' })}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-colors"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="you@email.com"
                {...register('email', { required: 'Required' })}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-colors"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              {...register('phone')}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Position Applying For
            </label>
            <input
              type="text"
              placeholder="e.g. Sales Executive, R&D Scientist..."
              {...register('position')}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-colors"
            />
          </div>

          {/* Resume upload placeholder */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Resume / CV <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-ocean-300 transition-colors cursor-pointer">
              <Upload size={24} className="mx-auto text-slate-300 mb-2" />
              <p className="text-sm text-slate-500 font-medium">Click to upload or drag & drop</p>
              <p className="text-xs text-slate-400 mt-1">PDF, DOC up to 5MB</p>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                {...register('resume', { required: 'Resume is required' })}
                className="sr-only"
              />
            </div>
            {errors.resume && <p className="text-red-500 text-xs mt-1">{errors.resume.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Cover Letter (Optional)
            </label>
            <textarea
              rows={4}
              placeholder="Tell us why you'd like to join Keytone Life Sciences and what you can bring to the team..."
              {...register('coverLetter')}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-colors"
            />
          </div>
        </div>

        <div className="mt-6">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            size="lg"
            loading={isSubmitting}
            rightIcon={<Send size={16} />}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        </div>
      </form>

      <Toast
        visible={toast.visible}
        type="success"
        message="Application submitted successfully!"
        onClose={() => setToast({ visible: false })}
      />
    </>
  )
}
