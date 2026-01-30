import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { format } from 'date-fns';
import Header from '@/components/Header';
import { getPost, Post } from '@/lib/api';

interface BlogPostPageProps {
  post: Post;
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  const formattedDate = format(new Date(post.published_at), 'MMMM dd, yyyy');

  return (
    <>
      <Head>
        <title>{post.meta_title || post.title} | CyberBlog</title>
        <meta name="description" content={post.meta_description} />
        <meta name="keywords" content={post.meta_keywords || ''} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.meta_description} />
        {post.featured_image && <meta property="og:image" content={post.featured_image} />}
        <meta property="og:type" content="article" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen">
        <Header />

        <article className="relative z-10 container mx-auto px-4 py-12">
          {/* Header */}
          <div className="max-w-4xl mx-auto mb-12 animate-slide-up">
            {/* Category */}
            <div className="mb-4">
              <span className="inline-block border-2 border-cyber-purple bg-cyber-purple/20 px-4 py-2 text-sm font-mono text-cyber-purple border-glow">
                {post.category.name}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-cyber-blue text-glow mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60 border-l-4 border-cyber-pink pl-4">
              <span className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-cyber-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{post.author.first_name} {post.author.last_name || post.author.username}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-cyber-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formattedDate}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-cyber-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{post.views_count} views</span>
              </span>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="border border-cyber-green/50 bg-cyber-green/10 px-3 py-1 text-xs font-mono text-cyber-green hover:border-cyber-green transition-colors"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Featured Image */}
          {post.featured_image && (
            <div className="max-w-4xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative overflow-hidden border-4 border-cyber-blue/30 border-glow">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-darker/50 to-transparent pointer-events-none" />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="cyber-card p-8 md:p-12">
              <div 
                className="prose prose-invert prose-lg max-w-none
                  prose-headings:text-cyber-blue prose-headings:font-bold prose-headings:text-glow-sm
                  prose-p:text-foreground/90 prose-p:leading-relaxed
                  prose-a:text-cyber-pink prose-a:no-underline hover:prose-a:text-glow-sm
                  prose-strong:text-cyber-green
                  prose-code:text-cyber-yellow prose-code:bg-cyber-dark prose-code:px-2 prose-code:py-1 prose-code:rounded
                  prose-pre:bg-cyber-dark prose-pre:border-2 prose-pre:border-cyber-blue/30
                  prose-blockquote:border-l-4 prose-blockquote:border-cyber-pink prose-blockquote:text-cyber-pink/80
                  prose-img:border-2 prose-img:border-cyber-blue/30"
                dangerouslySetInnerHTML={{ __html: post.content || post.excerpt }}
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="max-w-4xl mx-auto mt-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex justify-between items-center">
              <button className="cyber-button">
                &lt; Previous Post
              </button>
              <button className="cyber-button">
                Next Post &gt;
              </button>
            </div>
          </div>
        </article>

        {/* Decorative elements */}
        <div className="fixed top-1/4 left-10 w-32 h-32 border-2 border-cyber-blue/20 rotate-45 animate-glow pointer-events-none" />
        <div className="fixed bottom-1/4 right-10 w-24 h-24 border-2 border-cyber-pink/20 rotate-12 animate-glow pointer-events-none" style={{ animationDelay: '1s' }} />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string };

  try {
    const post = await getPost(slug);
    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return {
      notFound: true,
    };
  }
};
