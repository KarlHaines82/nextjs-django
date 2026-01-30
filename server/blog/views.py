from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Category, Tag, Post, Comment
from .serializers import (
    CategorySerializer, TagSerializer, 
    PostListSerializer, PostDetailSerializer, CommentSerializer
)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for blog categories
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'


class TagViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for blog tags
    """
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    lookup_field = 'slug'


class PostViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for blog posts with SEO optimization
    """
    queryset = Post.objects.filter(status='published').select_related(
        'author', 'category'
    ).prefetch_related('tags', 'comments')
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category__slug', 'tags__slug', 'author__username']
    search_fields = ['title', 'content', 'excerpt']
    ordering_fields = ['published_at', 'views_count', 'title']
    ordering = ['-published_at']
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PostDetailSerializer
        return PostListSerializer
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # Increment views count
        instance.views_count += 1
        instance.save(update_fields=['views_count'])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured posts (most viewed)"""
        featured_posts = self.get_queryset().order_by('-views_count')[:5]
        serializer = self.get_serializer(featured_posts, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def recent(self, request):
        """Get recent posts"""
        recent_posts = self.get_queryset().order_by('-published_at')[:10]
        serializer = self.get_serializer(recent_posts, many=True)
        return Response(serializer.data)
