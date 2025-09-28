import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";

const FeaturedProducts = () => {
  const products = [
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
  ];

  return (
    <section id="featured-products" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <p className="text-muted-foreground">
              Discover the best products from our trusted local vendors
            </p>
          </div>
          <Button variant="outline" className="hidden sm:flex">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="flex justify-center mt-8 sm:hidden">
          <Button variant="outline" className="w-full">
            View All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;