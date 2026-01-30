import { Inter as FontSans } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import { GetServerSideProps } from "next";
import Header from "@/components/Header";
import BlogCard from "@/components/BlogCard";
import { cn } from "@/lib/utils";
import { getFeaturedPosts, Post } from "@/lib/api";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

interface HomeProps {
  featuredPosts: Post[];
}

export default function Home({ featuredPosts }: HomeProps) {
  return (
    <>
      <Head>
        <title>CyberBlog - A Futuristic Tech Blog</title>
        <meta name="description" content="Explore the future of technology with our cyberpunk-themed blog. Dive into cutting-edge tech, cybersecurity, and digital innovation." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={cn("min-h-screen", fontSans.variable)}>
        <Header />

        <main className="relative z-10">
          {/* Hero Section */}
          <section className="container mx-auto px-4 py-20 md:py-32">
            <div className="max-w-5xl mx-auto text-center animate-slide-up">
              <div className="mb-8">
                <span className="inline-block border-2 border-cyber-pink bg-cyber-pink/10 px-4 py-2 text-sm font-mono text-cyber-pink animate-flicker">
                  SYSTEM ONLINE
                </span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold text-cyber-blue text-glow mb-6 font-mono leading-tight">
                WELCOME TO THE
                <br />
                <span className="text-cyber-pink">CYBER</span>BLOG
              </h1>
              
              <p className="text-xl md:text-2xl text-foreground/80 mb-12 max-w-3xl mx-auto">
                Navigate the digital frontier. Explore cutting-edge technology, 
                cybersecurity insights, and futuristic innovations in a neon-lit world.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/blog" className="cyber-button text-lg">
                  EXPLORE BLOG
                </Link>
                <button className="cyber-button text-lg border-cyber-pink text-cyber-pink hover:bg-cyber-pink/10">
                  VIEW CATEGORIES
                </button>
              </div>

              {/* Animated separator */}
              <div className="mt-12 h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-cyber-blue to-transparent animate-glow" />
            </div>
          </section>

          {/* Featured Posts */}
          <section className="container mx-auto px-4 py-12">
            <div className="mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-4xl md:text-5xl font-bold text-cyber-blue text-glow-sm mb-4 font-mono">
                &lt;FEATURED_POSTS/&gt;
              </h2>
              <div className="h-1 w-32 bg-gradient-to-r from-cyber-blue to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {featuredPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <BlogCard post={post} featured={index === 0} />
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/blog" className="cyber-button">
                VIEW ALL POSTS &gt;
              </Link>
            </div>
          </section>

          {/* Stats Section */}
          <section className="container mx-auto px-4 py-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { label: 'Articles', value: '100+', icon: '📝' },
                { label: 'Categories', value: '12+', icon: '📚' },
                { label: 'Views', value: '10K+', icon: '👁️' },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="cyber-card p-8 text-center animate-slide-up"
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div className="text-5xl font-bold text-cyber-blue text-glow mb-2 font-mono">
                    {stat.value}
                  </div>
                  <div className="text-sm text-foreground/60 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Floating geometric shapes */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
          <div className="absolute top-20 left-20 w-64 h-64 border-2 border-cyber-blue rotate-45 animate-spin" style={{ animationDuration: '20s' }} />
          <div className="absolute bottom-20 right-20 w-48 h-48 border-2 border-cyber-pink rotate-12 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
          <div className="absolute top-1/2 left-1/2 w-32 h-32 border-2 border-cyber-purple animate-pulse" />
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const featuredPosts = await getFeaturedPosts();
    return {
      props: {
        featuredPosts: featuredPosts.slice(0, 6),
      },
    };
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    return {
      props: {
        featuredPosts: [],
      },
    };
  }
};
