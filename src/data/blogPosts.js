// ─── Real blog posts from keytonelifesciences.com ───

export const BLOG_POSTS = [
  {
    id: 1,
    slug: 'best-probiotics-for-shrimp',
    title: 'Best Probiotics for Shrimp — Hepano Boost, N Fix & Keytone PS',
    excerpt:
      'Discover how multi-strain probiotics like Hepano Boost, N Fix, and Keytone PS can transform your shrimp pond health, improve water quality, and dramatically reduce disease losses in a single crop cycle.',
    category: 'Probiotics',
    author: 'Keytone Research Team',
    date: '2025-03-07',
    readTime: '7 min read',
    image: '/images/hepano-boost.png',
    tags: ['Probiotics', 'Shrimp', 'Water Quality'],
    featured: true,
    url: 'https://keytonelifesciences.com/best-probiotics-for-shrimp/',
  },
  {
    id: 2,
    slug: 'white-gut-disease-in-shrimp',
    title: 'White Gut Disease in Shrimp & Prawns — Causes, Symptoms & the Shooter Solution',
    excerpt:
      'White Feces Syndrome can devastate a shrimp crop within days. Learn the causes, early warning signs, and how Keytone Shooter\'s herbal gel formulation provides rapid, proven relief.',
    category: 'Disease Management',
    author: 'Keytone Research Team',
    date: '2024-12-10',
    readTime: '8 min read',
    image: '/images/Keytone-shooter-White-Gut-Disease-solution-1.png',
    tags: ['White Gut', 'Shooter', 'Shrimp Health'],
    featured: false,
    url: 'https://keytonelifesciences.com/white-gut-diesease-in-shrimp-and-prawns/',
  },
  {
    id: 3,
    slug: 'role-of-iboost-as-supplement',
    title: 'The Role of Keytone I Boost as an Immunostimulant Supplement',
    excerpt:
      'I Boost combines Beta-glucan, probiotics, enzymes, and vitamins into a single powerful immunostimulant. Find out how it protects your shrimp and fish from disease outbreaks.',
    category: 'Product Guides',
    author: 'Keytone Technical Team',
    date: '2024-12-11',
    readTime: '6 min read',
    image: '/images/Keytone-I-Boost.png',
    tags: ['I Boost', 'Immunity', 'Enzymes'],
    featured: false,
    url: 'https://keytonelifesciences.com/the-role-of-keyone-iboost-as-a-supplement/',
  },
  {
    id: 4,
    slug: 'boosting-shrimp-farming-south-india',
    title: 'Boosting Shrimp Farming in South India — Keytone Life Sciences\' Impact',
    excerpt:
      'From Andhra Pradesh to Tamil Nadu, Keytone Life Sciences has transformed shrimp farming outcomes for thousands of farmers. Read real stories from the field.',
    category: 'Farmer Stories',
    author: 'Keytone Editorial',
    date: '2024-04-03',
    readTime: '5 min read',
    image: '/images/Boosting-Shrimp-Farming-in-South-India.png',
    tags: ['South India', 'Shrimp Farming', 'Success Stories'],
    featured: false,
    url: 'https://keytonelifesciences.com/boosting-shrimp-farming-in-south-india-ketone-lifesciences-impact/',
  },
  {
    id: 5,
    slug: 'shrimp-moulting-min-plus',
    title: 'Unlocking the Secrets of Shrimp Moulting — Keytone Min Plus as a Game Changer',
    excerpt:
      'Moulting problems are one of the biggest causes of crop loss in shrimp farming. Learn how Keytone Min Plus provides the critical minerals that make every moult clean and successful.',
    category: 'Product Guides',
    author: 'Keytone Research Team',
    date: '2024-12-10',
    readTime: '7 min read',
    image: '/images/Keytone-Min-Plus.png',
    tags: ['Moulting', 'Min Plus', 'Minerals'],
    featured: false,
    url: 'https://keytonelifesciences.com/unlocking-the-secrets-of-shrimp-moulting-ketone-min-as-a-game-changer/',
  },
  {
    id: 6,
    slug: 'vitamin-c-active-c-supplement',
    title: 'Unlocking the Potential of Vitamin C — Keytone Active C for Fish, Prawn & Shrimp',
    excerpt:
      'Vitamin C is essential for shrimp and fish collagen, wound repair, and immune defence. Discover how Keytone Active C\'s slow-release coated formula ensures maximum biological utilization.',
    category: 'Product Guides',
    author: 'Keytone Technical Team',
    date: '2024-12-16',
    readTime: '6 min read',
    image: '/images/Keytone-Active-c-1.png',
    tags: ['Vitamin C', 'Active C', 'Immunity'],
    featured: false,
    url: 'https://keytonelifesciences.com/unlocking-the-potential-vit-c-aqua-supplement-for-fish-prawn-and-shrimp-with-keytone-active-c/',
  },
  {
    id: 7,
    slug: 'aquaculture-probiotics-manufacturers-india',
    title: 'Aquaculture Probiotics Manufacturers in India — Why Keytone Leads the Way',
    excerpt:
      'India\'s aquaculture probiotic market is growing fast. Here\'s what separates genuine R&D-backed probiotic manufacturers from generic suppliers — and how Keytone ensures every batch delivers.',
    category: 'Industry Insights',
    author: 'Keytone Editorial',
    date: '2025-01-19',
    readTime: '6 min read',
    image: '/images/probiotics-and-prebiotics.png',
    tags: ['India', 'Probiotics', 'Manufacturing'],
    featured: false,
    url: 'https://keytonelifesciences.com/aquaculture-probiotics-manufacturers-in-india/',
  },
  {
    id: 8,
    slug: 'aquaculture-feed-supplement-andhra-pradesh',
    title: 'Aquaculture Feed Supplement Manufacturer in Andhra Pradesh',
    excerpt:
      'Andhra Pradesh is India\'s shrimp capital. Keytone Life Sciences provides locally-trusted, globally-certified feed supplements to AP farmers with dedicated on-ground support.',
    category: 'Industry Insights',
    author: 'Keytone Editorial',
    date: '2025-01-19',
    readTime: '5 min read',
    image: '/images/rajesh.jpg',
    tags: ['Andhra Pradesh', 'Shrimp', 'India'],
    featured: false,
    url: 'https://keytonelifesciences.com/aquaculture-feed-supplement-manufacturer-in-andhra-pradesh/',
  },
]

export function getFeaturedPost() {
  return BLOG_POSTS.find((p) => p.featured)
}

export function getRecentPosts(count = 3) {
  return [...BLOG_POSTS].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, count)
}

export function getPostBySlug(slug) {
  return BLOG_POSTS.find((p) => p.slug === slug)
}
