import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Store, Building2, Mail, Lock, Eye, EyeOff, ArrowLeft, UserPlus, Phone, MapPin, Globe, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const VendorRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    businessEmail: "",
    businessPhone: "",
    businessAddress: "",
    businessWebsite: "",
    businessDescription: "",
    businessType: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    agreeToVendorTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle vendor registration logic here
    console.log("Vendor registration:", formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
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

        <div className="max-w-2xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-gradient-vendor flex items-center justify-center">
                <Building2 className="h-8 w-8 text-vendor-foreground" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Become a Vendor</h1>
            <p className="text-muted-foreground">
              Join our marketplace and start selling your products to local customers
            </p>
          </div>

          {/* Registration Form */}
          <Card className="shadow-soft border-border/50">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl">Vendor Application</CardTitle>
              <CardDescription>
                Fill in your business details to start selling on LocalMart
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Business Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-vendor border-b border-vendor/20 pb-2">
                    Business Information
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="businessName" className="text-sm font-medium">
                      Business Name *
                    </Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      type="text"
                      placeholder="Enter your business name"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ownerName" className="text-sm font-medium">
                        Owner/Contact Name *
                      </Label>
                      <Input
                        id="ownerName"
                        name="ownerName"
                        type="text"
                        placeholder="Full name"
                        value={formData.ownerName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessType" className="text-sm font-medium">
                        Business Type *
                      </Label>
                      <select
                        id="businessType"
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                      >
                        <option value="">Select business type</option>
                        <option value="retail">Retail Store</option>
                        <option value="restaurant">Restaurant/Cafe</option>
                        <option value="crafts">Arts & Crafts</option>
                        <option value="food">Food & Beverages</option>
                        <option value="services">Services</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessDescription" className="text-sm font-medium">
                      Business Description
                    </Label>
                    <textarea
                      id="businessDescription"
                      name="businessDescription"
                      placeholder="Describe your business, products, and what makes you unique..."
                      value={formData.businessDescription}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-vendor border-b border-vendor/20 pb-2">
                    Contact Information
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="businessEmail" className="text-sm font-medium">
                      Business Email *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="businessEmail"
                        name="businessEmail"
                        type="email"
                        placeholder="Enter your business email"
                        value={formData.businessEmail}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessPhone" className="text-sm font-medium">
                        Business Phone *
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="businessPhone"
                          name="businessPhone"
                          type="tel"
                          placeholder="Enter business phone"
                          value={formData.businessPhone}
                          onChange={handleInputChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessWebsite" className="text-sm font-medium">
                        Business Website
                      </Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="businessWebsite"
                          name="businessWebsite"
                          type="url"
                          placeholder="https://yourwebsite.com"
                          value={formData.businessWebsite}
                          onChange={handleInputChange}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessAddress" className="text-sm font-medium">
                      Business Address *
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="businessAddress"
                        name="businessAddress"
                        type="text"
                        placeholder="Enter your business address"
                        value={formData.businessAddress}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Account Security */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-vendor border-b border-vendor/20 pb-2">
                    Account Security
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium">
                        Password *
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create password"
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
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-sm font-medium">
                        Confirm Password *
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="pl-10 pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-vendor border-input rounded focus:ring-ring mt-1"
                      required
                    />
                    <Label htmlFor="agreeToTerms" className="text-sm text-muted-foreground">
                      I agree to the{" "}
                      <Link to="/terms" className="text-vendor hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-vendor hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="agreeToVendorTerms"
                      name="agreeToVendorTerms"
                      checked={formData.agreeToVendorTerms}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-vendor border-input rounded focus:ring-ring mt-1"
                      required
                    />
                    <Label htmlFor="agreeToVendorTerms" className="text-sm text-muted-foreground">
                      I agree to the{" "}
                      <Link to="/vendor/terms" className="text-vendor hover:underline">
                        Vendor Agreement
                      </Link>{" "}
                      and understand the commission structure
                    </Label>
                  </div>
                </div>

                {/* Submit Button */}
                <Button type="submit" variant="vendor" className="w-full" size="lg">
                  <FileText className="mr-2 h-4 w-4" />
                  Submit Vendor Application
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

              {/* Social Registration */}
              <div className="space-y-3">
                <Button variant="outline" className="w-full" size="lg">
                  <div className="w-5 h-5 bg-[#4285F4] rounded mr-2"></div>
                  Apply with Google
                </Button>
              </div>

              {/* Sign In Link */}
              <div className="text-center pt-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  Already have a vendor account?{" "}
                  <Link 
                    to="/vendor/login" 
                    className="text-vendor hover:underline font-medium transition-colors"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Customer Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Looking to shop instead?{" "}
              <Link 
                to="/customer/register" 
                className="text-primary hover:underline font-medium transition-colors"
              >
                Create a customer account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorRegister;
