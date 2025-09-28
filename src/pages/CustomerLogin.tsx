import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Store, User, Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const CustomerLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Customer login:", formData);
    // Demo: Redirect to dashboard after successful login
    navigate("/customer/dashboard");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Back to Home</span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Store className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              LocalMart
            </span>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center">
                <User className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">
              Sign in to your customer account to continue shopping
            </p>
          </div>
          
          {/* Login Form */}
          <Card className="shadow-soft border-border/50">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl">Customer Sign In</CardTitle>
              <CardDescription>
                Access your account to browse and purchase products
              </CardDescription>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full border-primary/20 hover:bg-primary/5 mb-4"
                onClick={() => navigate("/customer/dashboard")}
              >
                <Store className="h-4 w-4 mr-2 text-primary" />
                Try Demo Shop
              </Button>
              <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or sign in with email
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary border-input rounded focus:ring-ring"
                    />
                    <Label htmlFor="rememberMe" className="text-sm text-muted-foreground">
                      Remember me
                    </Label>
                  </div>
                  <Link 
                    to="/customer/forgot-password" 
                    className="text-sm text-primary hover:underline transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button type="submit" variant="hero" className="w-full" size="lg">
                  Sign In
                </Button>
                
              </form>

              {/* Divider */}
              <div className="relative">
                <Separator />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Badge variant="secondary" className="bg-background px-2 text-xs text-muted-foreground">
                    OR
                  </Badge>
                </div>
              </div>

              {/* Social Login */}
              <div className="space-y-3">
                <Button variant="outline" className="w-full" size="lg">
                  <div className="w-5 h-5 bg-[#4285F4] rounded mr-2"></div>
                  Continue with Google
                </Button>
              </div>

              {/* Sign Up Link */}
              <div className="text-center pt-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link 
                    to="/customer/register" 
                    className="text-primary hover:underline font-medium transition-colors"
                  >
                    Sign up here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Vendor Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Are you a vendor?{" "}
              <Link 
                to="/vendor/login" 
                className="text-vendor hover:underline font-medium transition-colors"
              >
                Sign in to vendor dashboard
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
