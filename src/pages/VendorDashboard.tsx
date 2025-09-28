import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  Package,
  ShoppingBag,
  ClipboardList,
  BarChart3,
  Settings,
  PlusCircle,
  Store,
  Truck,
  PackageCheck,
  ImagePlus,
  LogOut,
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const VendorDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: null as File | null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewProduct((prev) => ({
        ...prev,
        image: e.target.files![0],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle product creation logic here
    console.log("New product:", newProduct);
    setDialogOpen(false);
    setNewProduct({
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      image: null,
    });
  };

  // Demo data
  const stats = [
    {
      title: "Total Products",
      value: "124",
      icon: Package,
      change: "+12%",
      trend: "up",
    },
    {
      title: "Active Orders",
      value: "45",
      icon: ShoppingBag,
      change: "+18%",
      trend: "up",
    },
    {
      title: "Low Stock Items",
      value: "8",
      icon: PackageCheck,
      change: "+2",
      trend: "down",
    },
    {
      title: "Monthly Sales",
      value: "₱45,678",
      icon: BarChart3,
      change: "+23%",
      trend: "up",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-lg bg-gradient-primary">
                <Store className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Vendor Portal</h1>
                <p className="text-muted-foreground">Manage your store and products</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-2 mr-2">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <Store className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-medium hidden sm:inline">Vendor</span>
              </div>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add New Product
                  </Button>
                </DialogTrigger>

              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>

              {/* Logout Button with Confirmation */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-muted-foreground hover:text-destructive hover:border-destructive"
                  >
                    <LogOut className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Logout</span>
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
                      onClick={() => navigate('/')}
                      className="bg-destructive hover:bg-destructive/90"
                    >
                      Logout
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
                <DialogContent className="sm:max-w-[525px]">
                  <form onSubmit={handleSubmit}>
                    <DialogHeader>
                      <DialogTitle>Add New Product</DialogTitle>
                      <DialogDescription>
                        Fill in the details for your new product. All fields are required.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Enter product name"
                          value={newProduct.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="category">Category</Label>
                          <Select
                            value={newProduct.category}
                            onValueChange={(value) =>
                              setNewProduct((prev) => ({ ...prev, category: value }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="electronics">Electronics</SelectItem>
                              <SelectItem value="clothing">Clothing</SelectItem>
                              <SelectItem value="food">Food & Beverages</SelectItem>
                              <SelectItem value="home">Home & Garden</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="stock">Stock Quantity</Label>
                          <Input
                            id="stock"
                            name="stock"
                            type="number"
                            placeholder="Enter quantity"
                            value={newProduct.stock}
                            onChange={handleInputChange}
                            min="0"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="price">Price (₱)</Label>
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          placeholder="Enter price"
                          value={newProduct.price}
                          onChange={handleInputChange}
                          min="0"
                          step="0.01"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          placeholder="Enter product description"
                          value={newProduct.description}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="image">Product Image</Label>
                        <div className="flex items-center gap-4">
                          <Input
                            id="image"
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                          <Label
                            htmlFor="image"
                            className="flex items-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors"
                          >
                            <ImagePlus className="h-5 w-5 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              {newProduct.image ? newProduct.image.name : "Upload image"}
                            </span>
                          </Label>
                          {newProduct.image && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setNewProduct((prev) => ({ ...prev, image: null }))}
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-primary hover:bg-primary/90">
                        Add Product
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="mb-3 sm:mb-0">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                      <h3 className="text-xl sm:text-2xl font-bold">{stat.value}</h3>
                      <p className={`text-xs sm:text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {stat.change}
                      </p>
                    </div>
                    <div className="p-2 sm:p-3 bg-primary/10 rounded-lg self-start sm:self-auto">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="inventory" className="space-y-4 sm:space-y-6">
          <ScrollArea className="w-full">
            <TabsList className="bg-gradient-to-br from-background via-muted/20 to-background border-primary/20 w-full justify-start">
              <TabsTrigger value="inventory" className="flex-1 sm:flex-none">
                <Package className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Inventory</span>
              </TabsTrigger>
              <TabsTrigger value="products" className="flex-1 sm:flex-none">
                <ShoppingBag className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Products</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex-1 sm:flex-none">
                <ClipboardList className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Orders</span>
              </TabsTrigger>
            </TabsList>
          </ScrollArea>

          <TabsContent value="inventory" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Management</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Inventory management content will be added here */}
                <div className="text-center text-muted-foreground py-8">
                  Inventory Management feature coming soon...
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Management</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Product management content will be added here */}
                <div className="text-center text-muted-foreground py-8">
                  Product Management feature coming soon...
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Order management content will be added here */}
                <div className="text-center text-muted-foreground py-8">
                  Order Management feature coming soon...
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VendorDashboard;
