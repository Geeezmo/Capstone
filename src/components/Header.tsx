import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Search, Menu, X, User, Store, Settings } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useScrollToHash } from "@/hooks/use-scroll-to-hash";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Smooth scroll function
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};

type UserRole = "customer" | "vendor" | "admin";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<UserRole>("customer");

  useScrollToHash();

  const handleSectionClick = useCallback((sectionId: string) => {
    if (location.pathname === "/marketplace") {
      const element = document.querySelector(`#${sectionId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate(`/marketplace#${sectionId}`);
    }
  }, [location.pathname, navigate]);

  const handleLogout = () => {
    // Add any logout logic here (clear session, cookies, etc.) 
    navigate('/');
  };

  const getRoleDisplay = (role: UserRole) => {
    switch (role) {
      case "customer": return { label: "Customer", icon: User };
      case "vendor": return { label: "Vendor", icon: Store };
      case "admin": return { label: "Admin", icon: Settings };
    }
  };

  const currentRoleData = getRoleDisplay(currentRole);
  const CurrentRoleIcon = currentRoleData.icon;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/marketplace" className="flex items-center space-x-2 mr-8 hover:opacity-80 transition-opacity">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Store className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              LocalMart
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => handleSectionClick('featured-products')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Browse Products
            </button>
            <button 
              onClick={() => handleSectionClick('featured-vendors')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Featured Vendors
            </button>
            <button 
              onClick={() => handleSectionClick('categories')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Categories
            </button>
            {currentRole === "vendor" && (
              <a href="#" className="text-sm font-medium hover:text-vendor transition-colors">
                Dashboard
              </a>
            )}
            {currentRole === "admin" && (
              <a href="#" className="text-sm font-medium hover:text-destructive transition-colors">
                Admin Panel
              </a>
            )}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search products, vendors..."
                className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Role Switcher */}
            <div className="hidden sm:flex items-center space-x-2">
              <Badge variant="outline" className="flex items-center space-x-1">
                <CurrentRoleIcon className="h-3 w-3" />
                <span className="text-xs">{currentRoleData.label}</span>
              </Badge>
            </div>

            {/* Cart */}
            {currentRole === "customer" && (
              <Link to="/customer/dashboard?tab=cart">
                <Button variant="ghost" size="icon" className="relative hover:bg-accent">
                  <ShoppingCart className="h-4 w-4" />
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    3
                  </Badge>
                </Button>
              </Link>
            )}

            {/* Dashboard and Logout Buttons */}
            <div className="hidden sm:flex items-center space-x-2">
              {currentRole === "customer" && (
                <Link to="/customer/dashboard">
                  <Button variant="ghost" size="sm">Dashboard</Button>
                </Link>
              )}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-muted-foreground hover:text-destructive hover:border-destructive">
                    Logout
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You will be redirected to the role selection page.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleLogout}
                      className="bg-destructive hover:bg-destructive/90"
                    >
                      Logout
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search products, vendors..."
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-sm"
                />
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                <button 
                  onClick={() => {
                    handleSectionClick('featured-products');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-sm font-medium hover:text-primary"
                >
                  Browse Products
                </button>
                <button 
                  onClick={() => {
                    handleSectionClick('featured-vendors');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-sm font-medium hover:text-primary"
                >
                  Featured Vendors
                </button>
                <button 
                  onClick={() => {
                    handleSectionClick('categories');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-sm font-medium hover:text-primary"
                >
                  Categories
                </button>
              </nav>

              {/* Mobile Dashboard and Logout */}
              <div className="pt-4 border-t space-y-2">
                {currentRole === "customer" && (
                  <Link to="/customer/dashboard" className="flex-1">
                    <Button variant="ghost" size="sm" className="w-full">Dashboard</Button>
                  </Link>
                )}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full text-muted-foreground hover:text-destructive hover:border-destructive">
                      Logout
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                      <AlertDialogDescription>
                        You will be redirected to the role selection page.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleLogout}
                        className="bg-destructive hover:bg-destructive/90"
                      >
                        Logout
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;