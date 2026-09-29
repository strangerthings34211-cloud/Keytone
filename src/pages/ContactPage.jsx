import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react'
import HeroSection from '@/components/sections/HeroSection'
import ContactForm from '@/components/forms/ContactForm'
import SectionHeader from '@/components/ui/SectionHeader'

const CONTACT_CHANNELS = [
  {
    icon: Phone,
    title: 'Call Us',
    value: '+91 9959 002 666',
    meta: 'Mon – Sat, 9:00 AM – 6:00 PM IST',
    href: 'tel:+919959002666',
    color: 'ocean',
  },
  {
    icon: Mail,
    title: 'Email Us',
    value: 'info@keytonelifesciences.com',
    meta: 'We respond within 24 business hours',
    href: 'mailto:info@keytonelifesciences.com',
    color: 'teal',
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp',
    value: '+91 9959 002 666',
    meta: 'Quick responses for urgent queries',
    href: 'https://wa.me/919959002666',
    color: 'green',
  },
]

const COLOR_MAP = {
  ocean: { bg: 'bg-ocean-50',  border: 'border-ocean-200',  icon: 'bg-ocean-700 text-white',  hover: 'hover:border-ocean-400' },
  teal:  { bg: 'bg-teal-50',   border: 'border-teal-200',   icon: 'bg-teal-500 text-white',   hover: 'hover:border-teal-400' },
  green: { bg: 'bg-green-50',  border: 'border-green-200',  icon: 'bg-[#25D366] text-white',  hover: 'hover:border-green-400' },
}

export default function ContactPage() {
  return (
    <>
      <HeroSection
        backgroundImage="/images/banner-3.jpg"
        overlay="gradient"
        size="small"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]}
        tag="Contact Us"
        headline="Let's Talk Aquaculture"
        subheadline="Whether you're a farmer, distributor, or partner — our team is here to help."
      />

      {/* Contact Channels */}
      <section className="section-py section-light">
        <div className="container-xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
            {CONTACT_CHANNELS.map((channel) => {
              const colors = COLOR_MAP[channel.color]
              const Icon = channel.icon
              return (
                <a
                  key={channel.title}
                  href={channel.href}
                  target={channel.href.startsWith('http') ? '_blank' : undefined}
                  rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`flex items-start gap-4 rounded-2xl border p-6 transition-all duration-200 hover:shadow-card hover:-translate-y-0.5 ${colors.bg} ${colors.border} ${colors.hover}`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${colors.icon}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="font-display font-bold text-ocean-900">{channel.title}</p>
                    <p className="text-sm font-semibold text-slate-700 mt-0.5">{channel.value}</p>
                    <p className="text-xs text-slate-400 mt-1">{channel.meta}</p>
                  </div>
                </a>
              )
            })}
          </div>

          {/* Form + Info */}
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Form — wider */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-card p-7 md:p-9">
                <SectionHeader
                  tag="Send a Message"
                  title="How Can We Help You?"
                  align="left"
                  className="mb-7"
                />
                <ContactForm />
              </div>
            </div>

            {/* Info sidebar */}
            <div className="lg:col-span-2 space-y-5">
              {/* Office info */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-card">
                <h3 className="font-display font-bold text-ocean-900 mb-5">Office Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-ocean-50 flex items-center justify-center shrink-0">
                      <MapPin size={16} className="text-ocean-700" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">Address</p>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        Keytone Life Sciences Pvt. Ltd.<br />
                        Hyderabad, Telangana,<br />
                        India — 500 XXX
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-ocean-50 flex items-center justify-center shrink-0">
                      <Clock size={16} className="text-ocean-700" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">Office Hours</p>
                      <p className="text-sm text-slate-700">Monday – Saturday</p>
                      <p className="text-sm text-slate-500">9:00 AM – 6:00 PM IST</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-ocean-50 flex items-center justify-center shrink-0">
                      <Phone size={16} className="text-ocean-700" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">Phone</p>
                      <a href="tel:+919959002666" className="text-sm text-ocean-700 font-semibold hover:text-teal-600 transition-colors">
                        +91 9959 002 666
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-ocean-50 flex items-center justify-center shrink-0">
                      <Mail size={16} className="text-ocean-700" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">Email</p>
                      <a href="mailto:info@keytonelifesciences.com" className="text-sm text-ocean-700 font-semibold hover:text-teal-600 transition-colors break-all">
                        info@keytonelifesciences.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map embed placeholder */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
                <div className="h-56 bg-ocean-50 flex items-center justify-center relative">
                  <div className="text-center">
                    <MapPin size={36} className="text-ocean-300 mx-auto mb-2" />
                    <p className="text-slate-400 text-sm font-medium">Hyderabad, Telangana, India</p>
                    <a
                      href="https://maps.google.com/?q=Hyderabad,Telangana,India"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-xs text-ocean-700 font-semibold hover:text-teal-600 transition-colors"
                    >
                      Open in Google Maps →
                    </a>
                  </div>
                  {/* Note: Replace this placeholder with actual Google Maps embed iframe */}
                </div>
              </div>

              {/* Quick contacts by type */}
              <div className="bg-ocean-50 border border-ocean-100 rounded-2xl p-5">
                <h4 className="font-semibold text-ocean-900 text-sm mb-3">Quick Contacts</h4>
                <div className="space-y-2">
                  {[
                    { label: 'Product Enquiries', contact: 'sales@keytonelifesciences.com' },
                    { label: 'Export / International', contact: 'exports@keytonelifesciences.com' },
                    { label: 'Technical Support', contact: 'support@keytonelifesciences.com' },
                    { label: 'HR / Careers', contact: 'hr@keytonelifesciences.com' },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col">
                      <span className="text-xs text-slate-400 font-medium">{item.label}</span>
                      <a href={`mailto:${item.contact}`} className="text-xs text-ocean-700 font-semibold hover:text-teal-600 transition-colors">
                        {item.contact}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
