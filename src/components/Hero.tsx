import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Users, Verified } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-marketplace.jpg";

const Hero = () => {
  const stats = [
    { icon: ShoppingBag, label: "Products", value: "10,000+" },
    { icon: Users, label: "Vendors", value: "500+" },
    { icon: Verified, label: "Verified Sellers", value: "100%" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-card">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-accent text-accent-foreground border-primary/20">
                🚀 Supporting Local Businesses
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Your Local{" "}
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  Marketplace
                </span>{" "}
                Hub
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Connect with local vendors, discover unique products, and support your community 
                through our trusted e-commerce platform.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/customer/dashboard" className="flex-1 sm:flex-none">
                <Button variant="hero" size="lg" className="w-full">
                  Start Shopping
                  <ShoppingBag className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/vendor/register" className="flex-1 sm:flex-none">
                <Button variant="vendor" size="lg" className="w-full">
                  Become a Vendor
                  <Users className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center space-y-2">
                    <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-strong">
              <img
                src={heroImage}
                alt="Local marketplace with vendors and customers"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-card border shadow-medium rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-primary"></div>
                <div>
                  <div className="text-sm font-medium">Fresh Produce</div>
                  <div className="text-xs text-muted-foreground">Local Farm</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-card border shadow-medium rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-vendor"></div>
                <div>
                  <div className="text-sm font-medium">★ 4.9 Rating</div>
                  <div className="text-xs text-muted-foreground">500+ Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;