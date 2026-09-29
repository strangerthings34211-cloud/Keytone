export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  {
    label: 'Products',
    href: '/products',
    mega: true,
    categories: [
      { label: 'Enzymes',                href: '/products/enzymes',                icon: '🧪', desc: 'Digestive enzyme blends' },
      { label: 'Growth Promoters',       href: '/products/growth-promoters',       icon: '🌱', desc: 'Maximize yield and FCR' },
      { label: 'Immune Enhancers',       href: '/products/immune-enhancers',       icon: '🛡️', desc: 'Disease-resistance formulas' },
      { label: 'Probiotics & Prebiotics',href: '/products/probiotics-prebiotics',  icon: '🦠', desc: 'Gut health & microbiome support' },
      { label: 'Vitamins & Minerals',    href: '/products/vitamins-minerals',      icon: '💊', desc: 'Essential nutrition blends' },
      { label: 'Water Quality Enhancers',href: '/products/water-quality-enhancers',icon: '💧', desc: 'Pond environment management' },
      { label: 'White Gut Reducer',      href: '/products/white-gut-reducer',      icon: '🔬', desc: 'Targeted gut syndrome treatment' },
    ],
    quickLinks: [
      { label: 'Download Product Catalogue', href: '/products#catalogue', icon: 'Download' },
      { label: 'Request a Sample',            href: '/contact-us?type=sample', icon: 'FlaskConical' },
      { label: 'Find a Distributor',           href: '/exports', icon: 'Globe' },
    ],
  },
  {
    label: 'Research & Quality',
    href: '/research-development',
    dropdown: [
      { label: 'Research & Development', href: '/research-development' },
      { label: 'Quality Control',         href: '/quality-control' },
      { label: 'Certifications',           href: '/certifications' },
    ],
  },
  { label: 'Exports', href: '/exports' },
  { label: 'Blog',    href: '/blog' },
  { label: 'Careers', href: '/careers' },
]

export const CONTACT_CTA = { label: 'Contact Us', href: '/contact-us' }
