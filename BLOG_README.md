# CyberBlog - Full Stack Blog Application

A cutting-edge, cyberpunk-themed blog application built with Django (backend) and Next.js (frontend), featuring SEO optimization, PostgreSQL database, and a stunning neon-aesthetic UI.

## 🌟 Features

### Backend (Django)
- ✅ **Blog Management**: Full CRUD operations for Posts, Categories, Tags, and Comments
- ✅ **Jazzmin Admin Dashboard**: Beautiful, customized admin interface with dark theme
- ✅ **SEO Optimization**: 
  - Meta tags (title, description, keywords)
  - XML Sitemap generation
  - robots.txt configuration
  - SEO-friendly URLs with slugs
- ✅ **REST API**: Full-featured API with filtering, search, and pagination
- ✅ **PostgreSQL Backend**: Robust relational database
- ✅ **UV Package Manager**: Modern Python dependency management

### Frontend (Next.js)
- ✅ **Cyberpunk Theme**: Neon colors, glowing effects, and retro aesthetics
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Animations**: 
  - Slide-up animations
  - Glow effects
  - Flicker effects
  - Particle backgrounds
  - Scanline effects
- ✅ **SEO Ready**: Meta tags, Open Graph, structured data
- ✅ **Server-Side Rendering**: Fast initial page loads
- ✅ **TypeScript**: Type-safe development

## 📋 Prerequisites

- **Python 3.12+**
- **Node.js 18+**
- **PostgreSQL 12+**
- **UV** (Python package manager)

## 🚀 Quick Start

### 1. Database Setup

**Install PostgreSQL (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**Create Database:**
```bash
# Run the setup script
sudo -u postgres psql -f server/setup_db.sql

# Or manually:
sudo -u postgres psql
CREATE DATABASE blogdb;
CREATE USER bloguser WITH PASSWORD 'yourpassword';
GRANT ALL PRIVILEGES ON DATABASE blogdb TO bloguser;
\q
```

### 2. Backend Setup

```bash
cd server

# Install UV if not already installed
pip install uv

# Create virtual environment and install dependencies
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Run migrations
python manage.py migrate

# Create superuser for admin access
python manage.py createsuperuser

# Start the development server
python manage.py runserver
```

The backend will be available at:
- **API**: http://localhost:8000
- **Admin Dashboard**: http://localhost:8000/admin
- **API Documentation**: http://localhost:8000/api/blog/

### 3. Frontend Setup

```bash
cd client

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env if needed (default points to localhost:8000)

# Start development server
npm run dev
```

The frontend will be available at:
- **Website**: http://localhost:3000

## 📁 Project Structure

```
nextjs-django/
├── server/                 # Django backend
│   ├── api/               # Main Django app
│   │   ├── settings.py    # Django settings with Jazzmin config
│   │   └── urls.py        # URL routing
│   ├── blog/              # Blog app
│   │   ├── models.py      # Post, Category, Tag, Comment models
│   │   ├── admin.py       # Admin interface configuration
│   │   ├── views.py       # API views
│   │   ├── serializers.py # DRF serializers
│   │   ├── urls.py        # Blog URL routing
│   │   └── sitemaps.py    # SEO sitemap
│   ├── requirements.txt   # Python dependencies (x64 Linux)
│   ├── setup_db.sql       # PostgreSQL setup script
│   └── DATABASE_SETUP.md  # Database setup guide
│
├── client/                # Next.js frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Header.tsx
│   │   │   └── BlogCard.tsx
│   │   ├── pages/         # Next.js pages
│   │   │   ├── index.tsx  # Homepage
│   │   │   └── blog/      # Blog pages
│   │   ├── lib/           # Utilities and API client
│   │   └── styles/        # Global styles
│   ├── tailwind.config.ts # Tailwind with cyberpunk theme
│   └── package.json       # Node dependencies
│
└── README.md              # This file
```

## 🎨 Cyberpunk Theme

The frontend features a stunning cyberpunk aesthetic with:

### Color Palette
- **Cyber Blue**: `#00F0FF` - Primary accent
- **Cyber Pink**: `#FF006E` - Secondary accent
- **Cyber Purple**: `#8B00FF` - Tertiary accent
- **Cyber Green**: `#00FF41` - Success/highlights
- **Cyber Dark**: `#0A0E27` - Background
- **Cyber Darker**: `#050816` - Deep background

### Visual Effects
- Neon glow effects on text and borders
- Grid background with scanlines
- Animated particles
- Hover transitions
- Geometric floating shapes
- Retro-futuristic typography

## 🔌 API Endpoints

### Blog Posts
- `GET /api/blog/posts/` - List all posts (paginated)
- `GET /api/blog/posts/{slug}/` - Get single post
- `GET /api/blog/posts/featured/` - Get featured posts
- `GET /api/blog/posts/recent/` - Get recent posts

### Categories
- `GET /api/blog/categories/` - List all categories
- `GET /api/blog/categories/{slug}/` - Get single category

### Tags
- `GET /api/blog/tags/` - List all tags
- `GET /api/blog/tags/{slug}/` - Get single tag

### Query Parameters
- `?page=1` - Pagination
- `?search=term` - Search posts
- `?category__slug=tech` - Filter by category
- `?tags__slug=python` - Filter by tag

## 🛠️ Development Commands

### Backend
```bash
cd server
source .venv/bin/activate

# Run server
python manage.py runserver

# Make migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Collect static files
python manage.py collectstatic

# Update dependencies
uv pip install <package>
uv pip freeze > requirements.txt
```

### Frontend
```bash
cd client

# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Linting
npm run lint
npm run lint:fix

# Type checking
npm run typecheck
```

## 📝 Creating Blog Content

1. **Access Admin Dashboard**: http://localhost:8000/admin
2. **Login** with your superuser credentials
3. **Create Categories and Tags** first
4. **Create Posts**:
   - Add title (slug auto-generates)
   - Select author, category, tags
   - Write excerpt and content
   - Add featured image (optional)
   - Fill SEO fields (auto-populated if empty)
   - Set status to "Published"
   - Set published date

## 🔒 Security Notes

- Change `API_SECRET_KEY` in production
- Use strong passwords for database and superuser
- Never commit `.env` files
- Use environment-specific settings for production
- Enable HTTPS in production
- Configure allowed hosts properly

## 🚢 Production Deployment

### Backend (Django)
1. Set `APP_ENV=PRODUCTION` in `.env`
2. Set `DEBUG=False`
3. Configure proper `ALLOWED_HOSTS`
4. Use a production-grade server (Gunicorn + Nginx)
5. Set up SSL certificates
6. Configure static/media file serving

### Frontend (Next.js)
1. Build the production bundle: `npm run build`
2. Deploy to Vercel, Netlify, or your preferred host
3. Set `NEXT_PUBLIC_BACKEND_URL` to your API domain

## 📚 Technologies Used

### Backend
- Django 6.0
- Django REST Framework
- django-jazzmin (Admin UI)
- django-meta (SEO)
- django-filter
- PostgreSQL
- Gunicorn
- UV (Package manager)

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Axios
- TanStack Query
- date-fns
- Lucide React (Icons)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

See LICENSE file for details.

## 🙏 Acknowledgments

- Cyberpunk aesthetic inspired by retro-futuristic design
- Built with modern web technologies
- SEO-optimized for discoverability
- Fully responsive and accessible

---

**Happy Blogging! 🚀✨**
