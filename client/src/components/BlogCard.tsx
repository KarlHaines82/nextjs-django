import Link from 'next/link';
import { Post } from '@/lib/api';
import { format } from 'date-fns';

interface BlogCardProps {
  post: Post;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const formattedDate = format(new Date(post.published_at), 'MMM dd, yyyy');
  
  return (
    <Link href={`/blog/${post.slug}`}>
      <article 
        className={`cyber-card group h-full overflow-hidden transition-all duration-300 hover:scale-105 ${
          featured ? 'md:col-span-2' : ''
        }`}
      >
        {/* Featured Image */}
        {post.featured_image && (
          <div className="relative h-48 overflow-hidden bg-cyber-dark">
            <img
              src={post.featured_image}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-darker via-transparent to-transparent opacity-60" />
          </div>
        )}
        
        <div className="p-6 space-y-4">
          {/* Category Badge */}
          <div className="flex items-center justify-between">
            <span className="inline-block border border-cyber-purple/50 bg-cyber-purple/10 px-3 py-1 text-xs font-mono text-cyber-purple">
              {post.category.name}
            </span>
            <span className="text-xs text-cyber-blue/60 font-mono">
              {formattedDate}
            </span>
          </div>
          
          {/* Title */}
          <h3 className={`font-bold text-cyber-blue transition-all duration-300 group-hover:text-glow-sm ${
            featured ? 'text-2xl md:text-3xl' : 'text-xl'
          }`}>
            {post.title}
          </h3>
          
          {/* Excerpt */}
          <p className="text-sm text-foreground/80 line-clamp-3">
            {post.excerpt}
          </p>
          
          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-cyber-blue/20">
            <div className="flex items-center space-x-4 text-xs text-cyber-blue/60">
              <span className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{post.views_count}</span>
              </span>
              {post.comments_count !== undefined && (
                <span className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <span>{post.comments_count}</span>
                </span>
              )}
            </div>
            
            <span className="text-xs font-mono text-cyber-pink group-hover:text-glow-sm transition-all">
              READ MORE &gt;
            </span>
          </div>
          
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="text-xs font-mono text-cyber-green/70 hover:text-cyber-green transition-colors"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cyber-pink/30 transition-all duration-300 group-hover:border-cyber-pink" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-cyber-blue/30 transition-all duration-300 group-hover:border-cyber-blue" />
      </article>
    </Link>
  );
}
