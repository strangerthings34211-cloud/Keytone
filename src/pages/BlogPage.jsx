import { useState } from 'react'
import { Search } from 'lucide-react'
import HeroSection from '@/components/sections/HeroSection'
import SectionHeader from '@/components/ui/SectionHeader'
import BlogCard from '@/components/blog/BlogCard'
import { BLOG_POSTS, getFeaturedPost } from '@/data/blogPosts'

const ALL_CATEGORIES = ['All', ...new Set(BLOG_POSTS.map((p) => p.category))]

export default function BlogPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const featuredPost = getFeaturedPost()

  const filtered = BLOG_POSTS.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory
    const matchesSearch =
      search === '' ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const nonFeatured = filtered.filter((p) => !p.featured || search || activeCategory !== 'All')

  return (
    <>
      <HeroSection
        backgroundImage="/images/banner-2.jpg"
        overlay="gradient"
        size="small"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Blog' }]}
        tag="Knowledge Centre"
        headline="Aquaculture Insights & Guides"
        subheadline="Practical knowledge, product guides, and industry news from the Keytone research team."
      />

      <section className="section-py section-light">
        <div className="container-xl">
          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-slate-200 bg-white rounded-full pl-10 pr-5 py-3 text-sm focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-colors"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {ALL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-ocean-700 text-white shadow-btn'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-ocean-300 hover:text-ocean-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Featured post — only when no filter active */}
          {!search && activeCategory === 'All' && featuredPost && (
            <div className="mb-10">
              <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-4">Featured Article</p>
              <BlogCard post={featuredPost} featured />
            </div>
          )}

          {/* Articles grid */}
          {filtered.length > 0 ? (
            <>
              {(search || activeCategory !== 'All') ? null : (
                <SectionHeader
                  tag={`${nonFeatured.length} Articles`}
                  title="Latest from Our Team"
                  align="left"
                  className="mb-6"
                />
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(search || activeCategory !== 'All' ? filtered : nonFeatured).map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-display font-bold text-lg text-ocean-900 mb-1">No articles found</p>
              <p className="text-slate-400 text-sm">Try a different search term or category.</p>
              <button
                onClick={() => { setSearch(''); setActiveCategory('All') }}
                className="mt-4 text-ocean-700 font-semibold text-sm hover:text-teal-600 transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
