import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Store, UserPlus, Mail, Lock, Eye, EyeOff, ArrowLeft, Phone, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const CustomerRegister = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    marketingEmails: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // debug: log form state so we know the handler is running and values are correct
    console.log('CustomerRegister.handleSubmit — formData:', formData)

    setError(null)
    setInfo(null)

    // basic validations
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
      setError('Please fill all fields')
      alert('Please fill all required fields')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      alert('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      const signUpResult = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { full_name: `${formData.firstName} ${formData.lastName}`, role: 'customer' },
        },
      })
      console.log('supabase.auth.signUp =>', signUpResult)

      const signUpError = signUpResult.error ?? null
      const signUpData = signUpResult.data ?? null

      if (signUpError) {
        setError(signUpError.message ?? String(signUpError))
        alert('Sign up error: ' + (signUpError.message ?? String(signUpError)))
        return
      }

      const userId = signUpData?.user?.id
      console.log('supabase signUp returned userId:', userId)

      if (userId) {
        const insertResult = await supabase
          .from('customers')
          .insert([
            {
              id: userId,
              first_name: formData.firstName,
              last_name: formData.lastName,
              email: formData.email,
              phone: formData.phone ?? null,
              address: formData.address ?? null,
              agree_to_terms: !!formData.agreeToTerms,
              marketing_emails: !!formData.marketingEmails,
            },
          ])
          .select()
        console.log('customers insert =>', insertResult)

        if (insertResult.error) {
          setError(insertResult.error.message ?? String(insertResult.error))
          alert('Insert error: ' + (insertResult.error.message ?? String(insertResult.error)))
        } else {
          alert('Account created — redirecting to login')
          navigate('/customer/login')
          return
        }
      } else {
        // email confirmation flow: user id may not be returned
        setInfo('Registration successful. Check your email to confirm your account, then log in.')
        alert('Registration successful. Check your email to confirm.')
        navigate('/customer/login')
      }
    } catch (err: unknown) {
      console.error('signup error:', err)
      if (err instanceof Error) setError(err.message)
      else setError(String(err))
      alert('Unexpected error: ' + (err instanceof Error ? err.message : String(err)))
    } finally {
      setLoading(false)
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Back to Home</span>
          </Link>

          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Store className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">LocalMart</span>
          </div>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center">
                <UserPlus className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Join LocalMart</h1>
            <p className="text-muted-foreground">Create your customer account to start shopping locally</p>
          </div>

          <Card className="shadow-soft border-border/50">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl">Customer Registration</CardTitle>
              <CardDescription>Fill in your details to create your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      First Name
                    </Label>
                    <Input id="firstName" name="firstName" type="text" placeholder="First name" value={formData.firstName} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      Last Name
                    </Label>
                    <Input id="lastName" name="lastName" type="text" placeholder="Last name" value={formData.lastName} onChange={handleInputChange} required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="email" name="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleInputChange} className="pl-10" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="phone" name="phone" type="tel" placeholder="Enter your phone number" value={formData.phone} onChange={handleInputChange} className="pl-10" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium">
                    Address
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="address" name="address" type="text" placeholder="Enter your address" value={formData.address} onChange={handleInputChange} className="pl-10" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="Create password" value={formData.password} onChange={handleInputChange} className="pl-10 pr-10" required />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="Confirm password" value={formData.confirmPassword} onChange={handleInputChange} className="pl-10 pr-10" required />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="agreeToTerms" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleInputChange} className="h-4 w-4 text-primary border-input rounded focus:ring-ring" required />
                    <Label htmlFor="agreeToTerms" className="text-sm text-muted-foreground">
                      I agree to the{" "}
                      <Link to="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="marketingEmails" name="marketingEmails" checked={formData.marketingEmails} onChange={handleInputChange} className="h-4 w-4 text-primary border-input rounded focus:ring-ring" />
                    <Label htmlFor="marketingEmails" className="text-sm text-muted-foreground">
                      I want to receive marketing emails about new products and offers
                    </Label>
                  </div>
                </div>

                <Button type="submit" variant="hero" className="w-full" size="lg" disabled={loading}>
                  {loading ? "Creating..." : "Create Account"}
                </Button>
              </form>

              {error && <div className="text-sm text-red-600">{error}</div>}
              {info && <div className="text-sm text-green-600">{info}</div>}

              <div className="relative">
                <Separator />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Badge variant="secondary" className="bg-background px-2 text-xs text-muted-foreground">
                    OR
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                <Button variant="outline" className="w-full" size="lg">
                  <div className="w-5 h-5 bg-[#4285F4] rounded mr-2"></div>
                  Sign up with Google
                </Button>
              </div>

              <div className="text-center pt-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/customer/login" className="text-primary hover:underline font-medium transition-colors">
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Want to sell your products?{" "}
              <Link to="/vendor/register" className="text-vendor hover:underline font-medium transition-colors">
                Become a vendor
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerRegister;
