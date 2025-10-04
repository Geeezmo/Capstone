import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ShoppingBag,
  ShoppingCart,
  Star,
  User,
  Heart,
  Package,
  CreditCard,
  Settings,
} from "lucide-react";
import Header from "@/components/Header";
import ProductBrowsing from "@/components/ProductBrowsing";
import CartCheckout from "@/components/CartCheckout";
import CustomerRatings from "@/components/CustomerRatings";
import Footer from "@/components/Footer";

// Add a typed profile interface instead of using `any`
type CustomerProfile = {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  agree_to_terms?: boolean | null;
  marketing_emails?: boolean | null;
  created_at?: string | null;
};

const CustomerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("browse");
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<CustomerProfile | null>(null);

  // Check for tab parameter in URL and set active tab accordingly
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && ["browse", "cart", "reviews"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      // get current session
      const { data } = await supabase.auth.getSession();
      const session = data?.session ?? null;
      if (!session) {
        navigate("/customer/login");
        return;
      }

      // fetch customer profile
      const userId = session.user.id;
      const { data: profileData, error } = await supabase.from("customers").select("*").eq("id", userId).single();

      if (!mounted) return;

      if (error) {
        setProfile(null);
      } else {
        setProfile(profileData as CustomerProfile);
      }
      setLoading(false);
    })();

    // subscribe to auth changes to redirect on sign-out
    const { data: subscriptionData } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/customer/login");
    });

    return () => {
      mounted = false;
      // unsubscribe if available
      subscriptionData?.subscription?.unsubscribe?.();
    };
  }, [navigate]);

  const customerStats = {
    totalOrders: 12,
    totalSpent: 456.78,
    favoriteProducts: 8,
    reviewsWritten: 5,
  };

  const recentOrders = [
    { id: "ORD-001", date: "2024-01-15", status: "Delivered", total: 89.99, items: 2 },
    { id: "ORD-002", date: "2024-01-10", status: "In Transit", total: 45.5, items: 1 },
    { id: "ORD-003", date: "2024-01-05", status: "Delivered", total: 123.45, items: 3 },
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Dashboard Header */}
        <section className="py-8 bg-gradient-card border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold">Welcome back{profile ? `, ${profile.first_name || ""}` : ", Customer"}!</h1>
                <p className="text-muted-foreground mt-2">Manage your shopping experience and track your orders</p>
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </Button>
                <Button variant="default">
                  <Package className="h-4 w-4 mr-2" />
                  Track Orders
                </Button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-background p-4 rounded-xl border shadow-soft">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{customerStats.totalOrders}</div>
                    <div className="text-sm text-muted-foreground">Total Orders</div>
                  </div>
                </div>
              </div>

              <div className="bg-background p-4 rounded-xl border shadow-soft">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-vendor/10 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-vendor" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">${customerStats.totalSpent}</div>
                    <div className="text-sm text-muted-foreground">Total Spent</div>
                  </div>
                </div>
              </div>

              <div className="bg-background p-4 rounded-xl border shadow-soft">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                    <Heart className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{customerStats.favoriteProducts}</div>
                    <div className="text-sm text-muted-foreground">Favorites</div>
                  </div>
                </div>
              </div>

              <div className="bg-background p-4 rounded-xl border shadow-soft">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center">
                    <Star className="h-5 w-5 text-info" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{customerStats.reviewsWritten}</div>
                    <div className="text-sm text-muted-foreground">Reviews</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Orders */}
        <section className="py-8 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Recent Orders</h2>
              <Button variant="outline">View All Orders</Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="bg-gradient-card p-4 rounded-xl border shadow-soft">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-sm text-muted-foreground">{order.id}</span>
                    <Badge variant={order.status === "Delivered" ? "default" : "secondary"} className="text-xs">
                      {order.status}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Date:</span>
                      <span className="text-muted-foreground">{new Date(order.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Items:</span>
                      <span className="text-muted-foreground">{order.items}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total:</span>
                      <span className="font-semibold">${order.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      Track
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Reorder
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Dashboard Tabs */}
        <section className="py-8 bg-background">
          <div className="container mx-auto px-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3 mb-8">
                <TabsTrigger value="browse" className="flex items-center space-x-2">
                  <ShoppingBag className="h-4 w-4" />
                  <span className="hidden sm:inline">Browse Products</span>
                </TabsTrigger>
                <TabsTrigger value="cart" className="flex items-center space-x-2">
                  <ShoppingCart className="h-4 w-4" />
                  <span className="hidden sm:inline">Cart & Checkout</span>
                </TabsTrigger>
                <TabsTrigger value="reviews" className="flex items-center space-x-2">
                  <Star className="h-4 w-4" />
                  <span className="hidden sm:inline">Reviews</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="browse" className="mt-0">
                <ProductBrowsing />
              </TabsContent>

              <TabsContent value="cart" className="mt-0">
                <CartCheckout />
              </TabsContent>

              <TabsContent value="reviews" className="mt-0">
                <CustomerRatings />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CustomerDashboard;
