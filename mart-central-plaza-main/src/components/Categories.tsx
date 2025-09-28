
  import React from "react";
  import { Button } from "";
  import { 
    Utensils, 
    Palette, 
    Shirt, 
    Heart, 
    Zap, 
    Home,
    ShoppingBag,
    Flower
  } from "lucide-react";

  const Categories = () => {
    const categories = [
      {
        id: "food",
        name: "Food & Beverages",
        icon: Utensils,
        count: "2,400+",
        color: "text-orange-600",
        bgColor: "bg-orange-50 hover:bg-orange-100",
        description: "Fresh produce, baked goods, beverages"
      },
      {
        id: "arts",
        name: "Arts & Crafts",
        icon: Palette,
        count: "890+",
        color: "text-purple-600",
        bgColor: "bg-purple-50 hover:bg-purple-100",
        description: "Handmade items, paintings, pottery"
      },
      {
        id: "fashion",
        name: "Fashion & Style",
        icon: Shirt,
        count: "1,200+",
        color: "text-pink-600",
        bgColor: "bg-pink-50 hover:bg-pink-100",
        description: "Clothing, accessories, jewelry"
      },
      {
        id: "health",
        name: "Health & Beauty",
        icon: Heart,
        count: "650+",
        color: "text-red-600",
        bgColor: "bg-red-50 hover:bg-red-100",
        description: "Skincare, wellness, natural products"
      },
      {
        id: "electronics",
        name: "Electronics",
        icon: Zap,
        count: "340+",
        color: "text-blue-600",
        bgColor: "bg-blue-50 hover:bg-blue-100",
        description: "Gadgets, tech accessories, devices"
      },
      {
        id: "home",
        name: "Home & Garden",
        icon: Home,
        count: "950+",
        color: "text-green-600",
        bgColor: "bg-green-50 hover:bg-green-100",
        description: "Furniture, decor, plants, tools"
      },
      {
        id: "services",
        name: "Services",
        icon: ShoppingBag,
        count: "480+",
        color: "text-indigo-600",
        bgColor: "bg-indigo-50 hover:bg-indigo-100",
        description: "Consulting, repairs, lessons"
      },
      {
        id: "gifts",
        name: "Gifts & Events",
        icon: Flower,
        count: "720+",
        color: "text-rose-600",
        bgColor: "bg-rose-50 hover:bg-rose-100",
        description: "Special occasions, personalized items"
      }
    ];

    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl font-bold">Shop by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our diverse range of products from local vendors across various categories
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={category.id}
                  variant="ghost"
                  className={`h-auto p-6 flex flex-col items-center space-y-3 border-2 border-transparent hover:border-primary/20 transition-all duration-300 ${category.bgColor}`}
                >
                  <div className={`w-12 h-12 rounded-full bg-background shadow-soft flex items-center justify-center`}>
                    <IconComponent className={`h-6 w-6 ${category.color}`} />
                  </div>
                  <div className="text-center space-y-1">
                    <h3 className="font-semibold text-sm leading-tight">
                      {category.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {category.count} products
                    </p>
                    <p className="text-xs text-muted-foreground hidden md:block">
                      {category.description}
                    </p>
                  </div>
                </Button>
              );
            })}
          </div>

          {/* Browse All Button */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Browse All Categories
            </Button>
          </div>
        </div>
      </section>
    );
  };

  export default Categories;