import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCircle2, Store, ShieldCheck, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RoleSelection = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Update isMobile state when window is resized
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const roles = [
    {
      title: "Customer",
      description: "Browse products, make purchases, and track your orders",
      icon: <UserCircle2 className="h-8 w-8 text-primary" />,
      smallIcon: <UserCircle2 className="h-4 w-4" />,
      path: "/customer-login",
    },
    {
      title: "Vendor",
      description: "Manage your store and sell your products",
      icon: <Store className="h-8 w-8 text-primary" />,
      smallIcon: <Store className="h-4 w-4" />,
      path: "/vendor/login",
    },
    {
      title: "Admin",
      description: "Manage the marketplace and oversee operations",
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      smallIcon: <ShieldCheck className="h-4 w-4" />,
      path: "/admin-login",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-card py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-8">
            <Store className="h-16 w-16 text-primary mr-4" />
            <h1 className="text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              LocalMart
            </h1>
          </div>
          <Badge className="bg-accent text-accent-foreground border-primary/20 mb-6">
            🌟 Choose Your Role
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Your One-Stop{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Local Marketplace
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Connect with local vendors, discover unique products, and be part of our growing community.
            Select your role to begin your journey:
          </p>

          {/* Mobile Role Selector */}
          <div className="md:hidden w-full max-w-sm mx-auto mb-8">
            <Select onValueChange={setSelectedRole} value={selectedRole || undefined}>
              <SelectTrigger className="w-full h-12 bg-background border-2 border-primary/20 hover:border-primary/40 transition-colors rounded-lg">
                <SelectValue 
                  placeholder={
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <UserCircle2 className="h-5 w-5" />
                      <span>Select your role</span>
                    </div>
                  } 
                />
              </SelectTrigger>
              <SelectContent className="bg-background border-2 border-primary/20">
                {roles.map((role) => (
                  <SelectItem 
                    key={role.title.toLowerCase()} 
                    value={role.title.toLowerCase()}
                    className="hover:bg-primary/5 focus:bg-primary/5"
                  >
                    <div className="flex items-center space-x-3 py-1">
                      {role.smallIcon}
                      <span className="font-medium">{role.title}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Desktop: Show all cards, Mobile: Show only selected role */}
          {roles.map((role) => {
            const shouldShow = !isMobile || (isMobile && selectedRole === role.title.toLowerCase());
            if (!shouldShow) return null;

            return (
              <Card
                key={role.title}
                className={`hover:shadow-xl transition-all duration-300 cursor-pointer bg-gradient-card border-primary/20
                  ${isMobile ? 'animate-fadeIn' : ''}`}
                onClick={() => navigate(role.path)}
              >
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto mb-4">{role.icon}</div>
                  <CardTitle className="text-2xl font-bold text-primary">{role.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-muted-foreground min-h-[60px]">
                    {role.description}
                  </CardDescription>
                  <Button
                    className="w-full mt-6 bg-primary hover:bg-primary/90"
                    onClick={() => navigate(role.path)}
                  >
                    Continue as {role.title}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
