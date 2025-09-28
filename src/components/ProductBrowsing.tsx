import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Grid3X3, 
  List, 
  Filter, 
  Search, 
  X,
  Star,
  ShoppingCart,
  Heart,
  ChevronDown
} from "lucide-react";
import ProductCard from "./ProductCard";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  vendor: string;
  rating: number;
  reviewCount: number;
  category: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

const ProductBrowsing = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<string>('relevance');

  const products: Product[] = [
    {
      id: "1",
      name: "Fresh Organic Vegetable Bundle",
      price: 24.99,
      originalPrice: 29.99,
      image: product1,
      vendor: "Green Farm Co.",
      rating: 4.8,
      reviewCount: 127,
      category: "Organic Food",
      isNew: true,
      isFeatured: true,
    },
    {
      id: "2",
      name: "Handcrafted Ceramic Pottery Set",
      price: 89.99,
      image: product2,
      vendor: "Artisan Crafts",
      rating: 4.9,
      reviewCount: 89,
      category: "Handmade",
      isFeatured: true,
    },
    {
      id: "3",
      name: "Organic Honey Collection",
      price: 32.50,
      originalPrice: 39.99,
      image: product1,
      vendor: "Bee Happy Farm",
      rating: 4.7,
      reviewCount: 203,
      category: "Organic Food",
      isNew: false,
    },
    {
      id: "4",
      name: "Artisan Sourdough Bread",
      price: 8.99,
      image: product2,
      vendor: "Local Bakery",
      rating: 4.6,
      reviewCount: 156,
      category: "Bakery",
      isNew: true,
    },
    {
      id: "5",
      name: "Fresh Herbs Collection",
      price: 15.99,
      image: product1,
      vendor: "Herb Garden",
      rating: 4.5,
      reviewCount: 89,
      category: "Organic Food",
      isNew: false,
    },
    {
      id: "6",
      name: "Handmade Jewelry Set",
      price: 45.99,
      image: product2,
      vendor: "Crystal Crafts",
      rating: 4.8,
      reviewCount: 234,
      category: "Handmade",
      isNew: true,
    },
  ];

  const categories = [
    "All Categories",
    "Organic Food",
    "Handmade",
    "Bakery",
    "Arts & Crafts",
    "Health & Beauty",
    "Home & Garden",
    "Fashion"
  ];

  const vendors = [
    "Green Farm Co.",
    "Artisan Crafts",
    "Bee Happy Farm",
    "Local Bakery",
    "Herb Garden",
    "Crystal Crafts"
  ];

  const ratings = [5, 4, 3, 2, 1];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.vendor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesVendor = selectedVendors.length === 0 || selectedVendors.includes(product.vendor);
    const matchesRating = selectedRatings.length === 0 || selectedRatings.includes(Math.floor(product.rating));
    
    return matchesSearch && matchesCategory && matchesPrice && matchesVendor && matchesRating;
  });

  const clearFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 1000]);
    setSelectedVendors([]);
    setSelectedRatings([]);
    setSearchQuery('');
  };

  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Browse Products</h1>
            <p className="text-muted-foreground mt-2">
              Discover amazing products from local vendors
            </p>
          </div>
          
          {/* View Toggle & Sort */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-lg p-1 bg-background">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="h-8 px-3"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-8 px-3"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Filter Toggle for Mobile */}
            <div className="lg:hidden">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full justify-between"
              >
                <span className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </Button>
            </div>

            {/* Filters Content */}
            <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
              {/* Search */}
              <div className="space-y-3">
                <h3 className="font-semibold">Search</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="space-y-3">
                <h3 className="font-semibold">Category</h3>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category === 'All Categories' ? 'all' : category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <h3 className="font-semibold">Price Range</h3>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={1000}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Vendor Filter */}
              <div className="space-y-3">
                <h3 className="font-semibold">Vendors</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {vendors.map((vendor) => (
                    <div key={vendor} className="flex items-center space-x-2">
                      <Checkbox
                        id={vendor}
                        checked={selectedVendors.includes(vendor)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedVendors([...selectedVendors, vendor]);
                          } else {
                            setSelectedVendors(selectedVendors.filter(v => v !== vendor));
                          }
                        }}
                      />
                      <label htmlFor={vendor} className="text-sm text-muted-foreground cursor-pointer">
                        {vendor}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="space-y-3">
                <h3 className="font-semibold">Rating</h3>
                <div className="space-y-2">
                  {ratings.map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <Checkbox
                        id={`rating-${rating}`}
                        checked={selectedRatings.includes(rating)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedRatings([...selectedRatings, rating]);
                          } else {
                            setSelectedRatings(selectedRatings.filter(r => r !== rating));
                          }
                        }}
                      />
                      <label htmlFor={`rating-${rating}`} className="text-sm text-muted-foreground cursor-pointer flex items-center gap-1">
                        {[...Array(rating)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 text-vendor fill-current" />
                        ))}
                        <span>& up</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full"
              >
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Products Grid/List */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            {/* Products Display */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="flex gap-4 p-4 bg-gradient-card rounded-xl border shadow-soft">
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">by {product.vendor}</p>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">${product.price.toFixed(2)}</div>
                          {product.originalPrice && (
                            <div className="text-sm text-muted-foreground line-through">
                              ${product.originalPrice.toFixed(2)}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(product.rating)
                                  ? "text-vendor fill-current"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">
                            {product.rating} ({product.reviewCount})
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button variant="premium" size="sm" onClick={() => navigate(`/product/${product.id}`)}>
                            Quick View
                          </Button>
                          <Button variant="default" size="sm">
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No products found matching your criteria</p>
                <Button variant="outline" onClick={clearFilters} className="mt-4">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductBrowsing;
