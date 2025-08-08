import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Calendar, Clock, Share2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import backend from '~backend/client';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: () => backend.blog.getBlogPost({ slug: slug! }),
    enabled: !!slug
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="h-64 bg-gray-300 rounded-lg mb-8"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article non trouvé</h1>
          <Link to="/blog">
            <Button>Retour au blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/blog" className="flex items-center text-gray-600 hover:text-red-600 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au blog
          </Link>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8">
          <div className="mb-4">
            <Badge style={{ backgroundColor: post.category_color }} className="text-white mb-4">
              {post.category_name}
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-6 text-gray-600">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(post.published_at || post.created_at).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              {post.reading_time_minutes && (
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {post.reading_time_minutes} min de lecture
                </div>
              )}
              <div className="text-sm">
                Par {post.author_name}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {post.excerpt && (
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {post.excerpt}
            </p>
          )}
        </header>

        {post.featured_image && (
          <div className="mb-12">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Vous avez aimé cet article ?
          </h3>
          <p className="text-gray-600 mb-6">
            Découvrez nos autres articles sur l'univers des voitures de collection.
          </p>
          <Button className="bg-red-600 hover:bg-red-700">
            <Link to="/blog">
              Voir tous les articles
            </Link>
          </Button>
        </div>
      </article>
    </div>
  );
}
