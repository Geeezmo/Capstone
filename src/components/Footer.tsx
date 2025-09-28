import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Store, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Heart
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Store className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                LocalMart
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting communities through local commerce. Supporting small businesses 
              and bringing the best local products to your doorstep.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <nav className="space-y-2">
              {[
                "Browse Products",
                "Featured Vendors",
                "Categories",
                "How it Works",
                "Customer Reviews",
                "Gift Cards"
              ].map((link) => (
                <a 
                  key={link}
                  href="#" 
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* For Vendors */}
          <div className="space-y-4">
            <h3 className="font-semibold">For Vendors</h3>
            <nav className="space-y-2">
              {[
                { name: "Become a Vendor", path: "/vendor/register" },
                { name: "Vendor Dashboard", path: "/vendor/login" },
                { name: "Pricing Plans", path: "#" },
                { name: "Success Stories", path: "#" },
                { name: "Vendor Support", path: "#" },
                { name: "Marketing Tools", path: "#" }
              ].map((link) => (
                link.path === "#" ? (
                  <a 
                    key={link.name}
                    href="#" 
                    className="block text-sm text-muted-foreground hover:text-vendor transition-colors"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link 
                    key={link.name}
                    to={link.path}
                    className="block text-sm text-muted-foreground hover:text-vendor transition-colors"
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </nav>
          </div>

          {/* Contact & Support */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact & Support</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>email@localmart.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+631234567890</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Bayanan, Muntinlupa</span>  
              </div>
            </div>
            
            <div className="space-y-2">
              <a 
                href="#" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Help Center
              </a>
              <a 
                href="#" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Contact Support
              </a>
              <a 
                href="#" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Report an Issue
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="py-8 border-t border-border/50">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h4 className="font-semibold mb-2">Stay updated with LocalMart</h4>
              <p className="text-sm text-muted-foreground">
                Get the latest products, vendor news, and special offers delivered to your inbox
              </p>
            </div>
            <div className="flex w-full lg:w-auto max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 border border-input rounded-l-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button variant="default" className="rounded-l-none">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>© 2024 LocalMart. All rights reserved.</span>
              <div className="hidden md:flex items-center space-x-4">
                <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-destructive fill-current" />
              <span>for local communities</span>
            </div>
          </div>
          
          {/* Mobile Legal Links */}
          <div className="md:hidden flex flex-wrap justify-center gap-4 mt-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;