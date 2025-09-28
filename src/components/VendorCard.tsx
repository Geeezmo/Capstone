import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Package, Verified, ExternalLink } from "lucide-react";

interface Vendor {
  id: string;
  name: string;
  description: string;
  image: string;
  coverImage: string;
  location: string;
  rating: number;
  reviewCount: number;
  productCount: number;
  categories: string[];
  isVerified: boolean;
  isFeatured?: boolean;
  joinedDate: string;
}

interface VendorCardProps {
  vendor: Vendor;
}

const VendorCard = ({ vendor }: VendorCardProps) => {
  return (
    <div className="group relative bg-gradient-card rounded-xl border shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Cover Image */}
      <div className="relative h-32 overflow-hidden">
        <img
          src={vendor.coverImage}
          alt={`${vendor.name} cover`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        
        {/* Featured Badge */}
        {vendor.isFeatured && (
          <Badge className="absolute top-3 left-3 bg-vendor text-vendor-foreground">
            Featured Vendor
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Vendor Info */}
        <div className="relative -mt-8 space-y-3">
          {/* Profile Image */}
          <div className="relative inline-block">
            <img
              src={vendor.image}
              alt={vendor.name}
              className="w-16 h-16 rounded-full border-4 border-background shadow-medium"
            />
            {vendor.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-background flex items-center justify-center">
                <Verified className="h-3 w-3 text-white" />
              </div>
            )}
          </div>

          {/* Name & Location */}
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                {vendor.name}
              </h3>
              {vendor.isVerified && (
                <Verified className="h-4 w-4 text-success" />
              )}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-3 w-3 mr-1" />
              {vendor.location}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {vendor.description}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 py-3 border-t border-border/50">
          <div className="text-center space-y-1">
            <div className="text-sm font-semibold">{vendor.productCount}</div>
            <div className="text-xs text-muted-foreground flex items-center justify-center">
              <Package className="h-3 w-3 mr-1" />
              Products
            </div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-sm font-semibold flex items-center justify-center">
              <Star className="h-3 w-3 mr-1 text-vendor fill-current" />
              {vendor.rating}
            </div>
            <div className="text-xs text-muted-foreground">Rating</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-sm font-semibold">{vendor.reviewCount}</div>
            <div className="text-xs text-muted-foreground">Reviews</div>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">Specializes in:</div>
          <div className="flex flex-wrap gap-1">
            {vendor.categories.slice(0, 3).map((category) => (
              <Badge key={category} variant="outline" className="text-xs">
                {category}
              </Badge>
            ))}
            {vendor.categories.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{vendor.categories.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Button variant="default" size="sm" className="flex-1">
            View Store
            <ExternalLink className="h-3 w-3 ml-1" />
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Contact
          </Button>
        </div>

        {/* Member Since */}
        <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border/30">
          Member since {vendor.joinedDate}
        </div>
      </div>
    </div>
  );
};

export default VendorCard;