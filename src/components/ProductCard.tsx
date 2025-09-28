import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();
  
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleQuickView = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="group relative bg-gradient-card rounded-xl border shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-info text-white text-xs">New</Badge>
          )}
          {product.isFeatured && (
            <Badge className="bg-vendor text-vendor-foreground text-xs">Featured</Badge>
          )}
          {discount > 0 && (
            <Badge className="bg-destructive text-destructive-foreground text-xs">
              -{discount}%
            </Badge>
          )}
        </div>

        {/* Like Button */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 right-3 h-8 w-8 rounded-full backdrop-blur-sm transition-colors ${
            isLiked 
              ? "bg-destructive/20 text-destructive hover:bg-destructive/30" 
              : "bg-background/80 hover:bg-background"
          }`}
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
        </Button>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button variant="premium" size="sm" onClick={handleQuickView}>
            Quick View
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category & Vendor */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-medium">{product.category}</span>
          <span>by {product.vendor}</span>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-1">
          <div className="flex items-center">
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
          </div>
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-foreground">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
          
          <Button variant="default" size="sm">
            <ShoppingCart className="h-3 w-3 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;