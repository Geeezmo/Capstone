import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw,
  ArrowLeft,
  Minus,
  Plus
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProductView = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock product data - in a real app this would come from an API
  const product = {
    id: productId || "1",
    name: "Premium Organic Honey",
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.8,
    reviewCount: 127,
    description: "Pure, raw honey sourced from local beekeepers. This premium organic honey is harvested sustainably and contains no additives or preservatives. Perfect for sweetening tea, baking, or enjoying on its own.",
    vendor: "Sweet Valley Farms",
    vendorRating: 4.9,
    category: "Pantry & Groceries",
    stock: 45,
    images: [
      "/api/placeholder/400/400",
      "/api/placeholder/400/400",
      "/api/placeholder/400/400",
      "/api/placeholder/400/400"
    ],
    features: [
      "100% Organic Certified",
      "Raw & Unfiltered",
      "Local Sourcing",
      "No Additives",
      "Sustainable Harvesting"
    ],
    specifications: {
      weight: "500g",
      origin: "Local Region",
      harvest: "Spring 2024",
      certification: "USDA Organic",
      storage: "Store in cool, dry place"
    },
    reviews: [
      {
        id: 1,
        user: "Sarah M.",
        rating: 5,
        date: "2024-01-10",
        comment: "Excellent quality honey! The taste is amazing and it's perfect for my morning tea."
      },
      {
        id: 2,
        user: "Mike R.",
        rating: 4,
        date: "2024-01-08",
        comment: "Great honey, very pure taste. Would definitely recommend to others."
      },
      {
        id: 3,
        user: "Lisa K.",
        rating: 5,
        date: "2024-01-05",
        comment: "Love this honey! It's become a staple in our household."
      }
    ]
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    // Add to cart logic would go here
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  const handleQuickView = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center space-x-1 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
            <span>/</span>
            <span>{product.category}</span>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>

          {/* Product Main Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gradient-card rounded-xl border overflow-hidden">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-gradient-card rounded-lg border overflow-hidden transition-all ${
                      selectedImage === index 
                        ? 'ring-2 ring-primary ring-offset-2' 
                        : 'hover:opacity-80'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {product.category}
                </Badge>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      {product.rating} ({product.reviewCount} reviews)
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl font-bold text-primary">
                    ${product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-lg text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                  {product.originalPrice > product.price && (
                    <Badge variant="destructive" className="text-xs">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </Badge>
                  )}
                </div>
              </div>

              {/* Vendor Info */}
              <div className="bg-gradient-card p-4 rounded-xl border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-vendor/10 rounded-lg flex items-center justify-center">
                      <span className="text-vendor font-semibold text-sm">
                        {product.vendor.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">{product.vendor}</p>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-sm text-muted-foreground">
                          {product.vendorRating} rating
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Store
                  </Button>
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="font-medium">Quantity:</span>
                  <div className="flex items-center space-x-2 border rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(-1)}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(1)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.stock} in stock
                  </span>
                </div>
                
                <div className="flex space-x-3">
                  <Button 
                    onClick={handleAddToCart}
                    className="flex-1"
                    size="lg"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="lg">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  <span>Free shipping</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span>Secure payment</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <RotateCcw className="h-4 w-4 text-muted-foreground" />
                  <span>30-day returns</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mb-12">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <div className="bg-gradient-card p-6 rounded-xl border">
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="features" className="mt-6">
                <div className="bg-gradient-card p-6 rounded-xl border">
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="specifications" className="mt-6">
                <div className="bg-gradient-card p-6 rounded-xl border">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-border/50">
                        <span className="font-medium capitalize">{key}:</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-4">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="bg-gradient-card p-4 rounded-xl border">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">{review.user}</span>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-3 w-3 ${
                                  i < review.rating 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductView;
