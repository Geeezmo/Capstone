import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import Categories from "@/components/Categories";
import FeaturedVendors from "@/components/FeaturedVendors";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <FeaturedProducts />
        <Categories />
        <FeaturedVendors />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
