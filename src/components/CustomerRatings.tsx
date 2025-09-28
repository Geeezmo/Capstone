import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  MessageCircle, 
  User, 
  Calendar,
  Filter,
  SortAsc,
  Plus,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import product1 from "@/assets/product-1.jpg";

interface Review {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  customerName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
  images?: string[];
}

interface RatingStats {
  average: number;
  total: number;
  distribution: { [key: number]: number };
}

const CustomerRatings = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewForm, setReviewForm] = useState({
    productId: '',
    productName: '',
    title: '',
    comment: '',
    images: [] as string[]
  });
  const [filterRating, setFilterRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('newest');

  const reviews: Review[] = [
    {
      id: "1",
      productId: "1",
      productName: "Fresh Organic Vegetable Bundle",
      productImage: product1,
      customerName: "Sarah M.",
      rating: 5,
      title: "Excellent quality vegetables!",
      comment: "I was pleasantly surprised by the freshness and quality of these vegetables. They arrived in perfect condition and tasted amazing. The vendor was also very responsive to my questions. Highly recommend!",
      date: "2024-01-15",
      helpful: 12,
      verified: true,
    },
    {
      id: "2",
      productId: "1",
      productName: "Fresh Organic Vegetable Bundle",
      productImage: product1,
      customerName: "Michael R.",
      rating: 4,
      title: "Good value for money",
      comment: "The vegetables are fresh and well-packaged. Good variety in the bundle. Would have given 5 stars but delivery was a bit delayed. Still, very satisfied with the product quality.",
      date: "2024-01-12",
      helpful: 8,
      verified: true,
    },
    {
      id: "3",
      productId: "2",
      productName: "Handcrafted Ceramic Pottery Set",
      productImage: product1,
      customerName: "Emma L.",
      rating: 5,
      title: "Beautiful craftsmanship!",
      comment: "These pottery pieces are absolutely stunning! The attention to detail is incredible and they're even more beautiful in person than in the photos. Perfect for gifting or home decoration.",
      date: "2024-01-10",
      helpful: 15,
      verified: true,
    },
    {
      id: "4",
      productId: "2",
      productName: "Handcrafted Ceramic Pottery Set",
      productImage: product1,
      customerName: "David K.",
      rating: 3,
      title: "Nice but expensive",
      comment: "The pottery is well-made and beautiful, but I think it's a bit overpriced for what you get. The quality is good but not exceptional. Delivery was prompt though.",
      date: "2024-01-08",
      helpful: 5,
      verified: false,
    },
    {
      id: "5",
      productId: "3",
      productName: "Organic Honey Collection",
      productImage: product1,
      customerName: "Lisa P.",
      rating: 5,
      title: "Pure and delicious honey!",
      comment: "This is the best honey I've ever tasted! It's pure, natural, and has such a rich flavor. Perfect for tea, baking, or just eating by the spoonful. Will definitely order again!",
      date: "2024-01-05",
      helpful: 20,
      verified: true,
    },
  ];

  const ratingStats: RatingStats = {
    average: 4.4,
    total: reviews.length,
    distribution: {
      5: 3,
      4: 1,
      3: 1,
      2: 0,
      1: 0
    }
  };

  const filteredReviews = reviews.filter(review => 
    filterRating === 0 || review.rating === filterRating
  );

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'most_helpful':
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically submit the review to your backend
    console.log('Review submitted:', { ...reviewForm, rating: selectedRating });
    setShowReviewForm(false);
    setReviewForm({ productId: '', productName: '', title: '', comment: '', images: [] });
    setSelectedRating(0);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRatingText = (rating: number) => {
    const texts = {
      5: 'Excellent',
      4: 'Very Good',
      3: 'Good',
      2: 'Fair',
      1: 'Poor'
    };
    return texts[rating as keyof typeof texts] || '';
  };

  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Customer Reviews & Ratings</h1>
            <p className="text-muted-foreground mt-2">
              See what our customers are saying about our products
            </p>
          </div>
          
          <Button onClick={() => setShowReviewForm(true)} className="lg:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Write a Review
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Rating Overview Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-card p-6 rounded-xl border shadow-soft sticky top-24">
              <h3 className="text-xl font-semibold mb-4">Rating Overview</h3>
              
              {/* Average Rating */}
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-primary mb-2">{ratingStats.average}</div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(ratingStats.average)
                          ? "text-vendor fill-current"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on {ratingStats.total} reviews
                </p>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = ratingStats.distribution[rating] || 0;
                  const percentage = ratingStats.total > 0 ? (count / ratingStats.total) * 100 : 0;
                  
                  return (
                    <div key={rating} className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1 min-w-[60px]">
                        <span className="text-sm">{rating}</span>
                        <Star className="h-3 w-3 text-vendor fill-current" />
                      </div>
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div
                          className="bg-vendor h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground min-w-[30px] text-right">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Filter by Rating */}
              <Separator className="my-6" />
              <div className="space-y-3">
                <h4 className="font-medium">Filter by Rating</h4>
                <div className="space-y-2">
                  {[0, 5, 4, 3, 2, 1].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setFilterRating(rating)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        filterRating === rating
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      {rating === 0 ? "All Ratings" : `${rating} Stars`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-3 space-y-6">
            {/* Sort Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="highest">Highest Rated</SelectItem>
                    <SelectItem value="lowest">Lowest Rated</SelectItem>
                    <SelectItem value="most_helpful">Most Helpful</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Showing {sortedReviews.length} of {reviews.length} reviews
              </p>
            </div>

            {/* Reviews */}
            <div className="space-y-6">
              {sortedReviews.map((review) => (
                <div key={review.id} className="bg-gradient-card p-6 rounded-xl border shadow-soft">
                  {/* Review Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{review.customerName}</div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(review.date)}</span>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "text-vendor fill-current"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm font-medium">{getRatingText(review.rating)}</div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex items-center space-x-3 mb-4 p-3 bg-muted/30 rounded-lg">
                    <img
                      src={review.productImage}
                      alt={review.productName}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <div className="font-medium text-sm">{review.productName}</div>
                      <div className="text-xs text-muted-foreground">Product Review</div>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg">{review.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                  </div>

                  {/* Review Actions */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <ThumbsUp className="h-4 w-4" />
                        <span>Helpful ({review.helpful})</span>
                      </button>
                      <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        <span>Reply</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Reviews */}
            {sortedReviews.length === 0 && (
              <div className="text-center py-12">
                <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No reviews found</h3>
                <p className="text-muted-foreground mb-6">
                  {filterRating > 0 
                    ? `No reviews with ${filterRating} star${filterRating > 1 ? 's' : ''} rating`
                    : 'No reviews available for this product'
                  }
                </p>
                <Button variant="outline" onClick={() => setFilterRating(0)}>
                  View All Reviews
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Review Form Modal */}
        {showReviewForm && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-background border rounded-xl shadow-strong max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Write a Review</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowReviewForm(false)}
                  >
                    ×
                  </Button>
                </div>

                <form onSubmit={handleReviewSubmit} className="space-y-6">
                  {/* Product Selection */}
                  <div>
                    <Label htmlFor="productName">Product Name *</Label>
                    <Input
                      id="productName"
                      value={reviewForm.productName}
                      onChange={(e) => setReviewForm(prev => ({ ...prev, productName: e.target.value }))}
                      placeholder="Enter the product name you're reviewing"
                      required
                    />
                  </div>

                  {/* Rating Selection */}
                  <div>
                    <Label>Rating *</Label>
                    <div className="flex items-center space-x-2 mt-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => handleRatingChange(rating)}
                          onMouseEnter={() => setHoveredRating(rating)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="p-2 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`h-8 w-8 ${
                              rating <= (hoveredRating || selectedRating)
                                ? "text-vendor fill-current"
                                : "text-muted-foreground"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    {selectedRating > 0 && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {getRatingText(selectedRating)} - {selectedRating} stars
                      </p>
                    )}
                  </div>

                  {/* Review Title */}
                  <div>
                    <Label htmlFor="title">Review Title *</Label>
                    <Input
                      id="title"
                      value={reviewForm.title}
                      onChange={(e) => setReviewForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Summarize your experience in a few words"
                      required
                    />
                  </div>

                  {/* Review Comment */}
                  <div>
                    <Label htmlFor="comment">Review Comment *</Label>
                    <Textarea
                      id="comment"
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                      placeholder="Share your detailed experience with this product..."
                      rows={4}
                      required
                    />
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowReviewForm(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={selectedRating === 0}
                      className="flex-1"
                    >
                      Submit Review
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CustomerRatings;
