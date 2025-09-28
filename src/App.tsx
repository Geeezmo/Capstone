import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";

// Lazy load components
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CustomerLogin = lazy(() => import("./pages/CustomerLogin"));
const CustomerRegister = lazy(() => import("./pages/CustomerRegister"));
const CustomerDashboard = lazy(() => import("./pages/CustomerDashboard"));
const ProductView = lazy(() => import("./pages/ProductView"));
const VendorLogin = lazy(() => import("./pages/VendorLogin"));
const VendorRegister = lazy(() => import("./pages/VendorRegister"));
const RoleSelection = lazy(() => import("./pages/RoleSelection"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const VendorDashboard = lazy(() => import("./pages/VendorDashboard"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<RoleSelection />} />
            <Route path="/marketplace" element={<Index />} />
            
            {/* Authentication Routes */}
            <Route path="/customer-login" element={<CustomerLogin />} />
            <Route path="/customer/register" element={<CustomerRegister />} />
            <Route path="/customer/dashboard" element={<CustomerDashboard />} />
            <Route path="/vendor/login" element={<VendorLogin />} />
            <Route path="/vendor/register" element={<VendorRegister />} />
            <Route path="/vendor/dashboard" element={<VendorDashboard />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
            
            {/* Product Routes */}
            <Route path="/product/:productId" element={<ProductView />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <ScrollToTopButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
