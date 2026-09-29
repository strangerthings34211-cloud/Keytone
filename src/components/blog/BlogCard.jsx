import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { cn } from '@/utils/cn'
import { formatDate } from '@/utils/formatDate'
import Badge from '@/components/ui/Badge'

export default function BlogCard({ post, featured = false, className }) {
  if (featured) {
    return (
      <article
        className={cn(
          'card group grid md:grid-cols-2 overflow-hidden',
          className
        )}
      >
        {/* Image */}
        <div className="relative overflow-hidden bg-slate-100 h-60 md:h-auto">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-card md:hidden" />
        </div>

        {/* Content */}
        <div className="flex flex-col p-7">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="teal">{post.category}</Badge>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Calendar size={12} />
              {formatDate(post.date, { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          <h2 className="font-display font-bold text-xl text-ocean-900 mb-3 leading-snug group-hover:text-ocean-700 transition-colors">
            {post.title}
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-5 flex-1">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-ocean-100 flex items-center justify-center text-xs font-bold text-ocean-700">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-medium text-slate-700">{post.author}</p>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock size={10} /> {post.readTime}
                </p>
              </div>
            </div>
            <Link
              to={`/blog/${post.slug}`}
              className="flex items-center gap-1 text-sm font-semibold text-ocean-700 hover:text-teal-600 transition-colors"
            >
              Read More <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article
      className={cn(
        'card group flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white',
        'card-hover-lift shimmer-card shadow-card hover:border-teal-400/50',
        className
      )}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-slate-100 shrink-0">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="teal">{post.category}</Badge>
        </div>
      </div>


      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
          <Calendar size={12} />
          <span>{formatDate(post.date, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          <span>·</span>
          <Clock size={12} />
          <span>{post.readTime}</span>
        </div>

        <h3 className="font-display font-bold text-base text-ocean-900 mb-2 leading-snug line-clamp-2 group-hover:text-ocean-700 transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-3 flex-1 mb-4">
          {post.excerpt}
        </p>

        <Link
          to={`/blog/${post.slug}`}
          className="flex items-center gap-1.5 text-sm font-semibold text-ocean-700 hover:text-teal-600 transition-colors mt-auto pt-3 border-t border-slate-100"
        >
          Read Article <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  )
}
