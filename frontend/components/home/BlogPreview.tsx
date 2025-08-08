import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import backend from '~backend/client';

export default function BlogPreview() {
  const { data: blogData, isLoading } = useQuery({
    queryKey: ['blog-preview'],
    queryFn: () => backend.blog.listBlogPosts({ limit: 3, published_only: true })
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Passion Collection
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg animate-pulse">
                <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const posts = blogData?.posts || [];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Passion Collection
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez nos derniers articles sur l'univers des voitures de collection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {posts.map((post) => (
            <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.featured_image || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3'}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge style={{ backgroundColor: post.category_color }} className="text-white">
                    {post.category_name}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(post.published_at || post.created_at).toLocaleDateString('fr-FR')}
                  </div>
                  {post.reading_time_minutes && (
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {post.reading_time_minutes} min
                    </div>
                  )}
                </div>

                <Button variant="outline" className="w-full group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 transition-colors">
                  <Link to={`/blog/${post.slug}`} className="flex items-center justify-center w-full">
                    Lire l'Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-red-600 hover:bg-red-700">
            <Link to="/blog">
              Voir tous les Articles
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
