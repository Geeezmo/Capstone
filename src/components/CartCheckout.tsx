import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  MapPin, 
  CreditCard, 
  Truck,
  Shield,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  vendor: string;
  quantity: number;
  maxQuantity: number;
}

interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
  cardName: string;
}

const CartCheckout = () => {
  const [activeStep, setActiveStep] = useState<'cart' | 'shipping' | 'payment' | 'confirmation'>('cart');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Fresh Organic Vegetable Bundle",
      price: 24.99,
      originalPrice: 29.99,
      image: product1,
      vendor: "Green Farm Co.",
      quantity: 2,
      maxQuantity: 10,
    },
    {
      id: "2",
      name: "Handcrafted Ceramic Pottery Set",
      price: 89.99,
      image: product2,
      vendor: "Artisan Crafts",
      quantity: 1,
      maxQuantity: 5,
    },
  ]);
  const [checkoutForm, setCheckoutForm] = useState<CheckoutForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    cardName: '',
  });

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.min(newQuantity, item.maxQuantity) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateDiscount = () => {
    return cartItems.reduce((sum, item) => {
      if (item.originalPrice) {
        return sum + ((item.originalPrice - item.price) * item.quantity);
      }
      return sum;
    }, 0);
  };

  const shippingCost = 5.99;
  const taxRate = 0.08;
  const taxAmount = (calculateSubtotal() - calculateDiscount()) * taxRate;
  const total = calculateSubtotal() - calculateDiscount() + shippingCost + taxAmount;

  const handleInputChange = (field: keyof CheckoutForm, value: string) => {
    setCheckoutForm(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckout = () => {
    setActiveStep('shipping');
  };

  const handleShippingSubmit = () => {
    setActiveStep('payment');
  };

  const handlePaymentSubmit = () => {
    setActiveStep('confirmation');
  };

  const handleBackToCart = () => {
    setActiveStep('cart');
  };

  if (activeStep === 'confirmation') {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
            <h1 className="text-3xl font-bold">Order Confirmed!</h1>
            <p className="text-muted-foreground text-lg">
              Thank you for your purchase. Your order has been successfully placed and will be processed shortly.
            </p>
            <div className="bg-gradient-card p-6 rounded-xl border">
              <h3 className="font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Order Total:</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Order Number:</span>
                  <span className="font-mono">#ORD-{Date.now().toString().slice(-8)}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={() => setActiveStep('cart')}>
                Continue Shopping
              </Button>
              <Button variant="default">
                View Order Status
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center space-x-2 ${activeStep === 'cart' ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                activeStep === 'cart' ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                1
              </div>
              <span className="hidden sm:inline">Cart</span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <div className={`flex items-center space-x-2 ${activeStep === 'shipping' ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                activeStep === 'shipping' ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                2
              </div>
              <span className="hidden sm:inline">Shipping</span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <div className={`flex items-center space-x-2 ${activeStep === 'payment' ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                activeStep === 'payment' ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                3
              </div>
              <span className="hidden sm:inline">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {activeStep === 'cart' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">Shopping Cart</h1>
                
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                    <p className="text-muted-foreground mb-6">Start shopping to add items to your cart</p>
                    <Button variant="default">Browse Products</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4 p-4 bg-gradient-card rounded-xl border shadow-soft">
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">by {item.vendor}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-12 text-center font-medium">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                disabled={item.quantity >= item.maxQuantity}
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                              {item.originalPrice && (
                                <div className="text-sm text-muted-foreground line-through">
                                  ${(item.originalPrice * item.quantity).toFixed(2)}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeStep === 'shipping' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold">Shipping Information</h1>
                  <Button variant="ghost" onClick={handleBackToCart}>
                    ← Back to Cart
                  </Button>
                </div>
                
                <form onSubmit={(e) => { e.preventDefault(); handleShippingSubmit(); }} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={checkoutForm.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={checkoutForm.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={checkoutForm.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={checkoutForm.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={checkoutForm.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={checkoutForm.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={checkoutForm.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        value={checkoutForm.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Select value={checkoutForm.country} onValueChange={(value) => handleInputChange('country', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="UK">United Kingdom</SelectItem>
                        <SelectItem value="PH">Philippines</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Continue to Payment
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </form>
              </div>
            )}

            {activeStep === 'payment' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold">Payment Information</h1>
                  <Button variant="ghost" onClick={() => setActiveStep('shipping')}>
                    ← Back to Shipping
                  </Button>
                </div>
                
                <form onSubmit={(e) => { e.preventDefault(); handlePaymentSubmit(); }} className="space-y-6">
                  <div>
                    <Label htmlFor="cardName">Cardholder Name *</Label>
                    <Input
                      id="cardName"
                      value={checkoutForm.cardName}
                      onChange={(e) => handleInputChange('cardName', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="cardNumber">Card Number *</Label>
                    <Input
                      id="cardNumber"
                      value={checkoutForm.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cardExpiry">Expiry Date *</Label>
                      <Input
                        id="cardExpiry"
                        value={checkoutForm.cardExpiry}
                        onChange={(e) => handleInputChange('cardExpiry', e.target.value)}
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardCVC">CVC *</Label>
                      <Input
                        id="cardCVC"
                        value={checkoutForm.cardCVC}
                        onChange={(e) => handleInputChange('cardCVC', e.target.value)}
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Complete Order
                    <Shield className="h-4 w-4 ml-2" />
                  </Button>
                </form>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-gradient-card p-6 rounded-xl border shadow-soft">
                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="flex-1">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  {calculateDiscount() > 0 && (
                    <div className="flex justify-between text-success">
                      <span>Discount</span>
                      <span>-${calculateDiscount().toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${taxAmount.toFixed(2)}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                {activeStep === 'cart' && cartItems.length > 0 && (
                  <Button 
                    onClick={handleCheckout} 
                    className="w-full mt-6" 
                    size="lg"
                  >
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}

                {activeStep === 'cart' && (
                  <div className="mt-4 text-center">
                    <p className="text-xs text-muted-foreground">
                      Secure checkout powered by Stripe
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartCheckout;
