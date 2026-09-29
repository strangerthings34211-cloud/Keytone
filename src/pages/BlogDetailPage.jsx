import { useParams, Link } from 'react-router-dom'
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag } from 'lucide-react'
import HeroSection from '@/components/sections/HeroSection'
import CTABanner from '@/components/sections/CTABanner'
import BlogCard from '@/components/blog/BlogCard'
import Badge from '@/components/ui/Badge'
import { getPostBySlug, BLOG_POSTS } from '@/data/blogPosts'
import { formatDate } from '@/utils/formatDate'

// Sample article body — in production this would come from a CMS
function ArticleContent({ post }) {
  return (
    <div className="prose-keytone">
      <p className="text-xl text-slate-600 font-medium leading-relaxed mb-8 border-l-4 border-teal-400 pl-5 bg-teal-50 py-4 rounded-r-xl">
        {post.excerpt}
      </p>

      <h2>Understanding the Challenge</h2>
      <p>
        Aquaculture is one of the fastest-growing segments of global food production, and the
        demand for safe, effective health solutions continues to rise. Farmers across India,
        Southeast Asia, and internationally are increasingly looking for science-backed alternatives
        to traditional approaches.
      </p>
      <p>
        At Keytone Life Sciences, we have spent over a decade working directly with farmers to
        understand their real challenges and develop products that deliver measurable improvements
        in crop health, survival rates, and farm profitability.
      </p>

      <h2>Key Considerations for Farmers</h2>
      <p>
        When selecting products for your shrimp or fish operation, several critical factors should
        guide your decision:
      </p>
      <ul>
        <li>Species-specific formulations that match your target animal's nutritional profile</li>
        <li>Products backed by field trials and verifiable efficacy data</li>
        <li>Manufacturer certifications (GMP, HACCP, ISO) that validate production quality</li>
        <li>Clear application guidelines with dosage and frequency instructions</li>
        <li>Technical support availability from the manufacturer</li>
      </ul>

      <h2>The Science Behind the Solution</h2>
      <p>
        Our research team — comprising marine biologists, microbiologists, and nutritionists —
        works to ensure every Keytone formulation is grounded in proven science. We combine
        laboratory research with field validation to create products that work in real farming
        conditions, not just in controlled settings.
      </p>

      <blockquote>
        "The future of sustainable aquaculture depends on getting the science right — and making
        that science accessible and affordable for farmers at every scale."
        <footer>— Keytone Life Sciences Research Team</footer>
      </blockquote>

      <h2>Practical Application Tips</h2>
      <p>
        Regardless of which Keytone product category you are working with, a few universal
        best practices will help you get the most from your investment:
      </p>
      <ul>
        <li>Always store products according to the label instructions</li>
        <li>Begin application at the correct life stage as recommended</li>
        <li>Monitor water quality parameters alongside product application</li>
        <li>Keep accurate records of dosage, timing, and results</li>
        <li>Contact our technical team if you observe unexpected responses</li>
      </ul>

      <h2>Conclusion</h2>
      <p>
        The aquaculture industry is evolving rapidly, and the farmers who succeed will be those
        who combine practical experience with science-backed solutions. Keytone Life Sciences is
        committed to being that trusted scientific partner for farmers across India and globally.
      </p>
      <p>
        For expert guidance on selecting the right products for your operation, reach out to our
        technical team — we are always happy to help.
      </p>
    </div>
  )
}

export default function BlogDetailPage() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-6xl mb-4">📄</p>
          <h2 className="font-display font-bold text-2xl text-ocean-900 mb-2">Article Not Found</h2>
          <Link to="/blog" className="text-ocean-700 font-semibold hover:text-teal-600">← Back to Blog</Link>
        </div>
      </div>
    )
  }

  const relatedPosts = BLOG_POSTS
    .filter((p) => p.id !== post.id && (p.category === post.category || p.tags.some((t) => post.tags.includes(t))))
    .slice(0, 3)

  const otherPosts = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3)
  const displayRelated = relatedPosts.length >= 2 ? relatedPosts : otherPosts

  return (
    <>
      {/* Hero */}
      <HeroSection
        backgroundImage={post.image}
        overlay="gradient"
        size="medium"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: post.title },
        ]}
      />

      {/* Article */}
      <section className="section-py section-white">
        <div className="container-xl">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Article body */}
            <article className="lg:col-span-2">
              {/* Article header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <Badge variant="teal">{post.category}</Badge>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Calendar size={12} />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                </div>

                <h1 className="font-display font-extrabold text-3xl md:text-4xl text-ocean-900 mb-4 leading-tight">
                  {post.title}
                </h1>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-ocean-100 flex items-center justify-center font-bold text-ocean-700 text-sm">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{post.author}</p>
                    <p className="text-xs text-slate-400">Keytone Life Sciences</p>
                  </div>
                </div>
              </div>

              {/* Hero image */}
              <div className="rounded-2xl overflow-hidden mb-8 h-72 bg-slate-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>

              {/* Body */}
              <ArticleContent post={post} />

              {/* Tags */}
              <div className="mt-10 pt-6 border-t border-slate-100 flex items-center gap-2 flex-wrap">
                <Tag size={14} className="text-slate-400" />
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Article navigation */}
              <div className="mt-8 flex items-center justify-between gap-4">
                <Link
                  to="/blog"
                  className="flex items-center gap-1.5 text-sm font-semibold text-ocean-700 hover:text-teal-600 transition-colors"
                >
                  <ArrowLeft size={14} /> Back to Blog
                </Link>
                <Link
                  to="/contact-us"
                  className="flex items-center gap-1.5 text-sm font-semibold text-ocean-700 hover:text-teal-600 transition-colors"
                >
                  Get Expert Guidance <ArrowRight size={14} />
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-5">
                {/* Related Products promo */}
                <div className="bg-gradient-ocean rounded-2xl p-6 text-white">
                  <p className="text-teal-300 text-xs font-semibold uppercase tracking-widest mb-2">
                    Explore Products
                  </p>
                  <h4 className="font-display font-bold text-lg mb-2">
                    Find the Right Solution for Your Farm
                  </h4>
                  <p className="text-white/70 text-sm mb-4">
                    Browse our full range of scientifically formulated aquaculture supplements.
                  </p>
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-1.5 bg-white text-ocean-700 font-bold text-sm px-4 py-2 rounded-full hover:bg-ocean-50 transition-colors"
                  >
                    View Products <ArrowRight size={13} />
                  </Link>
                </div>

                {/* Recent Articles */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5">
                  <h4 className="font-semibold text-slate-700 text-sm mb-4">More Articles</h4>
                  <div className="space-y-4">
                    {displayRelated.slice(0, 3).map((p) => (
                      <Link key={p.id} to={`/blog/${p.slug}`} className="flex gap-3 group">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-14 h-14 object-cover rounded-lg shrink-0"
                          loading="lazy"
                        />
                        <div>
                          <p className="text-xs text-slate-400 mb-0.5">{p.category}</p>
                          <p className="text-sm font-medium text-slate-700 line-clamp-2 group-hover:text-ocean-700 transition-colors leading-snug">
                            {p.title}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5 text-center">
                  <p className="text-teal-800 font-semibold text-sm mb-1">Need Expert Advice?</p>
                  <p className="text-teal-600 text-xs mb-3">Talk to our aquaculture specialists.</p>
                  <Link
                    to="/contact-us"
                    className="inline-flex items-center gap-1 bg-teal-600 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-teal-700 transition-colors"
                  >
                    Contact Us <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="section-py section-light">
        <div className="container-xl">
          <h2 className="font-display font-bold text-2xl text-ocean-900 mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayRelated.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        headline="Looking for Expert Aquaculture Guidance?"
        subtext="Our team is ready to help you find the right products and solutions for your farm."
        primaryCTA={{ label: 'Talk to Our Team', href: '/contact-us' }}
        secondaryCTA={{ label: 'Explore Products', href: '/products' }}
      />
    </>
  )
}
