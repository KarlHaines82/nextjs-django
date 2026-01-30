from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from blog.models import Category, Tag, Post
from django.utils import timezone


class Command(BaseCommand):
    help = 'Populate the blog with sample data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Creating sample data...')

        # Get or create admin user
        admin, _ = User.objects.get_or_create(
            username='admin',
            defaults={
                'email': 'admin@cyberblog.com',
                'first_name': 'Admin',
                'last_name': 'User',
                'is_staff': True,
                'is_superuser': True,
            }
        )

        # Create categories
        categories_data = [
            {'name': 'Cybersecurity', 'description': 'Security in the digital realm'},
            {'name': 'AI & Machine Learning', 'description': 'Artificial intelligence and ML innovations'},
            {'name': 'Web Development', 'description': 'Modern web technologies and frameworks'},
            {'name': 'Blockchain', 'description': 'Decentralized technologies'},
            {'name': 'Quantum Computing', 'description': 'The future of computation'},
        ]
        
        categories = []
        for cat_data in categories_data:
            cat, created = Category.objects.get_or_create(
                name=cat_data['name'],
                defaults={'description': cat_data['description']}
            )
            categories.append(cat)
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created category: {cat.name}'))

        # Create tags
        tags_data = ['python', 'javascript', 'security', 'ai', 'blockchain', 'tutorial', 'news', 'guide']
        tags = []
        for tag_name in tags_data:
            tag, created = Tag.objects.get_or_create(name=tag_name)
            tags.append(tag)
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created tag: {tag.name}'))

        # Create blog posts
        posts_data = [
            {
                'title': 'The Future of Cybersecurity in 2026',
                'excerpt': 'Explore the latest trends and threats in the cybersecurity landscape. From zero-trust architecture to AI-powered defense systems.',
                'content': '''<h2>Introduction</h2>
                <p>The cybersecurity landscape is evolving at an unprecedented pace. As we move deeper into 2026, new threats emerge while defense mechanisms become more sophisticated.</p>
                
                <h2>Zero-Trust Architecture</h2>
                <p>Zero-trust security models are becoming the standard. This approach assumes no implicit trust and continuously verifies every stage of digital interaction.</p>
                
                <h2>AI-Powered Defense</h2>
                <p>Artificial intelligence is revolutionizing how we detect and respond to security threats. Machine learning algorithms can identify patterns that humans might miss.</p>
                
                <h2>Quantum Threats</h2>
                <p>With quantum computing on the horizon, current encryption methods face potential obsolescence. The race is on to develop quantum-resistant cryptography.</p>''',
                'category': categories[0],
                'tags': [tags[2], tags[3]],
            },
            {
                'title': 'Building Scalable Web Apps with Next.js',
                'excerpt': 'Learn how to create high-performance, SEO-optimized web applications using Next.js and modern React patterns.',
                'content': '''<h2>Why Next.js?</h2>
                <p>Next.js has become the go-to framework for building production-ready React applications. It offers server-side rendering, static site generation, and much more.</p>
                
                <h2>Key Features</h2>
                <ul>
                    <li>Automatic code splitting</li>
                    <li>Built-in CSS support</li>
                    <li>API routes</li>
                    <li>Image optimization</li>
                </ul>
                
                <h2>Getting Started</h2>
                <p>Setting up a Next.js project is straightforward. The framework handles routing, optimization, and deployment with minimal configuration.</p>''',
                'category': categories[2],
                'tags': [tags[1], tags[5]],
            },
            {
                'title': 'Introduction to Blockchain Technology',
                'excerpt': 'Understand the fundamentals of blockchain technology and how it\'s transforming industries beyond cryptocurrency.',
                'content': '''<h2>What is Blockchain?</h2>
                <p>Blockchain is a distributed ledger technology that enables secure, transparent, and immutable record-keeping.</p>
                
                <h2>Key Concepts</h2>
                <ul>
                    <li>Decentralization</li>
                    <li>Consensus mechanisms</li>
                    <li>Smart contracts</li>
                    <li>Cryptographic hashing</li>
                </ul>
                
                <h2>Real-World Applications</h2>
                <p>Beyond cryptocurrency, blockchain is being used in supply chain management, healthcare, voting systems, and more.</p>''',
                'category': categories[3],
                'tags': [tags[4], tags[6]],
            },
            {
                'title': 'Machine Learning for Beginners',
                'excerpt': 'Start your journey into artificial intelligence with this comprehensive guide to machine learning basics.',
                'content': '''<h2>Understanding ML</h2>
                <p>Machine Learning is a subset of AI that enables systems to learn and improve from experience without explicit programming.</p>
                
                <h2>Types of Learning</h2>
                <ul>
                    <li>Supervised Learning</li>
                    <li>Unsupervised Learning</li>
                    <li>Reinforcement Learning</li>
                </ul>
                
                <h2>Getting Started</h2>
                <p>Python libraries like TensorFlow, PyTorch, and scikit-learn make it easier than ever to start building ML models.</p>''',
                'category': categories[1],
                'tags': [tags[0], tags[3], tags[5]],
            },
            {
                'title': 'Quantum Computing Explained',
                'excerpt': 'Dive into the mysterious world of quantum computing and discover how it will revolutionize technology.',
                'content': '''<h2>Quantum Basics</h2>
                <p>Quantum computing leverages quantum mechanical phenomena like superposition and entanglement to process information.</p>
                
                <h2>Qubits vs Bits</h2>
                <p>Unlike classical bits that are either 0 or 1, qubits can exist in multiple states simultaneously, enabling exponentially more computational power.</p>
                
                <h2>Practical Applications</h2>
                <p>From drug discovery to cryptography, quantum computing promises to solve problems that are intractable for classical computers.</p>''',
                'category': categories[4],
                'tags': [tags[6], tags[7]],
            },
        ]

        for i, post_data in enumerate(posts_data):
            post, created = Post.objects.get_or_create(
                title=post_data['title'],
                defaults={
                    'author': admin,
                    'category': post_data['category'],
                    'excerpt': post_data['excerpt'],
                    'content': post_data['content'],
                    'status': 'published',
                    'published_at': timezone.now(),
                    'views_count': (i + 1) * 100,
                }
            )
            if created:
                post.tags.set(post_data['tags'])
                self.stdout.write(self.style.SUCCESS(f'Created post: {post.title}'))

        self.stdout.write(self.style.SUCCESS('✅ Sample data created successfully!'))
