import VendorCard from "./VendorCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import vendor1 from "@/assets/vendor-1.jpg";
import vendorCover1 from "@/assets/vendor-cover-1.jpg";

const FeaturedVendors = () => {
  const vendors = [
    {
      id: "1",
      name: "Green Farm Co.",
      description: "Sustainable organic farming with the freshest produce delivered directly from our fields to your table.",
      image: vendor1,
      coverImage: vendorCover1,
      location: "Springfield Valley",
      rating: 4.8,
      reviewCount: 127,
      productCount: 45,
      categories: ["Organic Food", "Vegetables", "Fruits", "Herbs"],
      isVerified: true,
      isFeatured: true,
      joinedDate: "2022",
    },
    {
      id: "2",
      name: "Artisan Crafts Studio",
      description: "Handmade pottery and ceramics crafted with love and tradition passed down through generations.",
      image: vendor1,
      coverImage: vendorCover1,
      location: "Downtown Arts District",
      rating: 4.9,
      reviewCount: 89,
      productCount: 23,
      categories: ["Handmade", "Pottery", "Art", "Gifts"],
      isVerified: true,
      isFeatured: true,
      joinedDate: "2021",
    },
    {
      id: "3",
      name: "Local Bakery House",
      description: "Fresh baked goods made daily using traditional recipes and locally sourced ingredients.",
      image: vendor1,
      coverImage: vendorCover1,
      location: "Main Street",
      rating: 4.7,
      reviewCount: 203,
      productCount: 18,
      categories: ["Bakery", "Bread", "Pastries", "Desserts"],
      isVerified: true,
      isFeatured: false,
      joinedDate: "2020",
    },
  ];

  return (
    <section id="featured-vendors" className="py-16 bg-gradient-card">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Featured Vendors</h2>
            <p className="text-muted-foreground">
              Meet our trusted local vendors and discover their amazing products
            </p>
          </div>
          <Button variant="vendor" className="hidden sm:flex">
            All Vendors
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 space-y-4">
          <h3 className="text-xl font-semibold">Want to become a vendor?</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Join our growing community of local entrepreneurs and reach thousands of customers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/vendor/register">
              <Button variant="vendor" size="lg">
                Apply to Sell
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="sm:hidden w-full">
              View All Vendors
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVendors;