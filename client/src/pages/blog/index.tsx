import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import BlogCard from '@/components/BlogCard';
import { getPosts, Post, PaginatedResponse } from '@/lib/api';

interface BlogPageProps {
  initialPosts: PaginatedResponse<Post>;
}

export default function BlogPage({ initialPosts }: BlogPageProps) {
  const [page, setPage] = useState(1);
  
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts', page],
    queryFn: () => getPosts(page),
    initialData: page === 1 ? initialPosts : undefined,
  });

  return (
    <>
      <Head>
        <title>Blog | CyberBlog</title>
        <meta name="description" content="Explore our cyberpunk-themed blog with the latest tech articles and insights" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen">
        <Header />
        
        <main className="relative z-10 container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="mb-12 text-center animate-slide-up">
            <h1 className="text-5xl md:text-7xl font-bold text-cyber-blue text-glow mb-4 font-mono">
              &lt;BLOG_ARCHIVE/&gt;
            </h1>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              Dive into the digital realm of cutting-edge technology, cybersecurity, and futuristic insights
            </p>
            <div className="mt-6 h-1 w-32 mx-auto bg-gradient-to-r from-cyber-pink via-cyber-purple to-cyber-blue animate-glow" />
          </div>

          {/* Posts Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-cyber-blue text-2xl animate-flicker font-mono">
                LOADING...
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {posts?.results.map((post, index) => (
                  <div
                    key={post.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <BlogCard post={post} featured={index === 0} />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {posts && (posts.next || posts.previous) && (
                <div className="flex justify-center items-center space-x-4">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={!posts.previous}
                    className="cyber-button disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    &lt; PREV
                  </button>
                  <span className="text-cyber-blue font-mono">
                    PAGE {page}
                  </span>
                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={!posts.next}
                    className="cyber-button disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    NEXT &gt;
                  </button>
                </div>
              )}
            </>
          )}
        </main>

        {/* Floating particles effect */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyber-blue rounded-full animate-glow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const initialPosts = await getPosts(1);
    return {
      props: {
        initialPosts,
      },
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      props: {
        initialPosts: {
          count: 0,
          next: null,
          previous: null,
          results: [],
        },
      },
    };
  }
};
