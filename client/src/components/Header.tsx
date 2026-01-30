import Link from 'next/link';

export default function Header() {
  return (
    <header className="relative z-10 border-b-2 border-cyber-blue/30 bg-cyber-dark/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="group">
            <h1 className="text-3xl font-bold text-cyber-blue text-glow-sm transition-all duration-300 group-hover:text-cyber-pink">
              <span className="font-mono">&gt;_</span> CYBER<span className="text-cyber-pink">BLOG</span>
            </h1>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className="cyber-button text-sm"
            >
              Home
            </Link>
            <Link 
              href="/blog" 
              className="cyber-button text-sm"
            >
              Blog
            </Link>
            <Link 
              href="/categories" 
              className="cyber-button text-sm"
            >
              Categories
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <button className="md:hidden text-cyber-blue hover:text-cyber-pink transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Animated underline */}
      <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-cyber-blue to-transparent animate-glow" />
    </header>
  );
}
