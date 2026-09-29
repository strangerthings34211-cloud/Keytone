import { Link } from 'react-router-dom'
import Breadcrumb from '@/components/ui/Breadcrumb'

const SECTIONS = [
  {
    id: 'who-we-are',
    title: '1. Who We Are',
    content: `Keytone Life Sciences Pvt. Ltd. operates the website https://keytonelifesciences.com. We are a manufacturer and distributor of aquaculture feed supplements headquartered in Hyderabad, Telangana, India.`,
  },
  {
    id: 'information-we-collect',
    title: '2. Information We Collect',
    content: `We collect information you voluntarily provide when you:

• Submit a contact or enquiry form (name, email, phone, message)
• Subscribe to our newsletter (email address)
• Submit a job application (name, email, phone, resume, cover letter)
• Leave a comment on our blog (name, email, message)

We also automatically collect technical data such as your IP address, browser type, pages visited, and time spent on the site through standard web analytics tools.`,
  },
  {
    id: 'how-we-use',
    title: '3. How We Use Your Information',
    content: `We use the information we collect to:

• Respond to your enquiries and provide customer support
• Process and fulfil product orders and distributor requests
• Send relevant product information and newsletters (with your consent)
• Review and process job applications
• Improve our website content and user experience
• Comply with legal and regulatory obligations

We do not sell, trade, or rent your personal information to third parties.`,
  },
  {
    id: 'cookies',
    title: '4. Cookies',
    content: `Our website uses cookies to enhance your browsing experience. Cookies are small text files stored on your device that help us remember your preferences and understand how you use our site.

Types of cookies we use:
• Essential cookies — required for the website to function correctly
• Analytics cookies — help us understand how visitors interact with our site
• Preference cookies — remember your settings and choices

You can control cookie settings through your browser. Disabling certain cookies may affect website functionality.`,
  },
  {
    id: 'data-retention',
    title: '5. How Long We Retain Your Data',
    content: `We retain personal data for as long as necessary to fulfil the purposes for which it was collected, including:

• Contact form submissions: up to 2 years
• Job applications: up to 1 year after the hiring decision
• Newsletter subscriptions: until you unsubscribe
• Legal or compliance records: as required by applicable law

You may request deletion of your data at any time by contacting us.`,
  },
  {
    id: 'your-rights',
    title: '6. Your Rights',
    content: `Depending on your location, you may have the following rights regarding your personal data:

• Right to access — request a copy of the personal data we hold about you
• Right to rectification — request correction of inaccurate data
• Right to erasure — request deletion of your personal data
• Right to restrict processing — request that we limit how we use your data
• Right to data portability — request your data in a structured, portable format
• Right to withdraw consent — for any processing based on your consent

To exercise any of these rights, please contact us at privacy@keytonelifesciences.com.`,
  },
  {
    id: 'third-parties',
    title: '7. Third-Party Services',
    content: `We may share data with trusted third-party service providers who assist us in operating our website and business, such as:

• Email delivery services (for newsletters and notifications)
• Analytics platforms (e.g., Google Analytics)
• Cloud hosting providers

All third-party providers are bound by confidentiality agreements and are prohibited from using your data for their own purposes.

Our website may contain links to external websites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies.`,
  },
  {
    id: 'security',
    title: '8. Data Security',
    content: `We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. These include encrypted data transmission (HTTPS), access controls, and regular security reviews.

While we take reasonable precautions, no method of transmission over the internet is 100% secure. We encourage you to use strong passwords and keep your account credentials confidential.`,
  },
  {
    id: 'contact',
    title: '9. Contact Us',
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your personal data, please contact us:

Email: privacy@keytonelifesciences.com
Phone: +91 9959 002 666
Address: Keytone Life Sciences Pvt. Ltd., Hyderabad, Telangana, India

We will respond to all privacy-related requests within 30 days.`,
  },
  {
    id: 'updates',
    title: '10. Updates to This Policy',
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. We will post the updated policy on this page with a revised "Last Updated" date. We encourage you to review this page periodically.`,
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-100 py-10">
        <div className="container-md">
          <Breadcrumb
            items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
            className="mb-4"
          />
          <h1 className="font-display font-extrabold text-3xl text-ocean-900 mb-2">
            Privacy Policy
          </h1>
          <p className="text-slate-500 text-sm">
            Last updated: <strong>September 2026</strong>
          </p>
        </div>
      </div>

      <div className="container-md py-12">
        <div className="grid lg:grid-cols-4 gap-10">
          {/* Table of Contents — sticky sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                Contents
              </p>
              <nav className="space-y-1">
                {SECTIONS.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block text-sm text-slate-500 hover:text-ocean-700 py-1 transition-colors leading-snug"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <main className="lg:col-span-3">
            {/* Intro */}
            <div className="bg-ocean-50 border border-ocean-100 rounded-2xl p-6 mb-10">
              <p className="text-slate-600 leading-relaxed">
                At Keytone Life Sciences, we respect and protect the privacy of everyone who
                visits our website or interacts with our business. This Privacy Policy explains
                what information we collect, how we use it, and the rights you have over your data.
                Please read it carefully.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-10">
              {SECTIONS.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-24">
                  <h2 className="font-display font-bold text-xl text-ocean-900 mb-3 pb-2 border-b border-slate-100">
                    {section.title}
                  </h2>
                  <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>

            {/* Footer note */}
            <div className="mt-12 pt-8 border-t border-slate-100 text-center">
              <p className="text-slate-400 text-sm">
                Questions? Contact us at{' '}
                <a href="mailto:privacy@keytonelifesciences.com" className="text-ocean-700 font-semibold hover:text-teal-600 transition-colors">
                  privacy@keytonelifesciences.com
                </a>
              </p>
              <Link
                to="/contact-us"
                className="inline-block mt-3 text-sm text-ocean-700 font-semibold hover:text-teal-600 transition-colors"
              >
                ← Back to Contact Us
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
