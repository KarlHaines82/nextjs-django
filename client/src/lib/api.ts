import axios from "axios";

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_BACKEND_URL });

export default api;

// Blog API
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export const blogApi = axios.create({
  baseURL: `${API_BASE_URL}/api/blog`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Author {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  posts_count: number;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  posts_count: number;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  author: Author;
  category: Category;
  tags: Tag[];
  excerpt: string;
  content?: string;
  featured_image: string | null;
  meta_title: string;
  meta_description: string;
  meta_keywords?: string;
  published_at: string;
  views_count: number;
  comments_count?: number;
  comments?: Comment[];
}

export interface Comment {
  id: number;
  author: Author;
  content: string;
  created_at: string;
  updated_at: string;
  parent: number | null;
  replies: Comment[];
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// API functions
export const getPosts = async (page = 1, category?: string, tag?: string, search?: string) => {
  const params: any = { page };
  if (category) params.category__slug = category;
  if (tag) params.tags__slug = tag;
  if (search) params.search = search;
  
  const response = await blogApi.get<PaginatedResponse<Post>>('/posts/', { params });
  return response.data;
};

export const getPost = async (slug: string) => {
  const response = await blogApi.get<Post>(`/posts/${slug}/`);
  return response.data;
};

export const getFeaturedPosts = async () => {
  const response = await blogApi.get<Post[]>('/posts/featured/');
  return response.data;
};

export const getRecentPosts = async () => {
  const response = await blogApi.get<Post[]>('/posts/recent/');
  return response.data;
};

export const getCategories = async () => {
  const response = await blogApi.get<PaginatedResponse<Category>>('/categories/');
  return response.data;
};

export const getTags = async () => {
  const response = await blogApi.get<PaginatedResponse<Tag>>('/tags/');
  return response.data;
};
