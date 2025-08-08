import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import backend from '~backend/client';

export default function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 9;

  const selectedCategory = searchParams.get('category');

  const { data: categoriesData } = useQuery({
    queryKey: ['blog-categories'],
    queryFn: () => backend.blog.listBlogCategories()
  });

  const { data: postsData, isLoading } = useQuery({
    queryKey: ['blog-posts', selectedCategory, currentPage],
    queryFn: () => backend.blog.listBlogPosts({
      limit,
      offset: currentPage * limit,
      category: selectedCategory || undefined,
      published_only: true
    })
  });

  const categories = categoriesData?.categories || [];
  const posts = postsData?.posts || [];
  const total = postsData?.total || 0;
  const hasMore = postsData?.has_more || false;

  const handleCategoryFilter = (categorySlug: string | null) => {
    if (categorySlug) {
      setSearchParams({ category: categorySlug });
    } else {
      setSearchParams({});
    }
    setCurrentPage(0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Passion Collection</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Découvrez l'univers fascinant des voitures de collection à travers nos guides, analyses et conseils d'experts.
          </p>
          
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Rechercher un article..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white text-black"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Catégories</h2>
          <div className="flex flex-wrap gap-3">
            <Button
              variant={!selectedCategory ? "default" : "outline"}
              onClick={() => handleCategoryFilter(null)}
              className={!selectedCategory ? "bg-red-600 hover:bg-red-700" : ""}
            >
              Tous les articles
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.slug ? "default" : "outline"}
                onClick={() => handleCategoryFilter(category.slug)}
                className={selectedCategory === category.slug ? "bg-red-600 hover:bg-red-700" : ""}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(limit)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg animate-pulse">
                <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-20 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun article trouvé</h3>
            <p className="text-gray-600">Essayez de modifier vos critères de recherche.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
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

            {hasMore && (
              <div className="text-center">
                <Button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Charger plus d'articles
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
