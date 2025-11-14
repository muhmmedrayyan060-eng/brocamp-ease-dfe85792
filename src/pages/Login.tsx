import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo.png";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "student";
  
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");

  const handleSendOtp = () => {
    if (loginMethod === "phone" && phoneNumber.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    if (loginMethod === "email" && !email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    
    // Simulate OTP sending
    setOtpSent(true);
    toast.success(`OTP sent to your ${loginMethod === "phone" ? "phone" : "email"}`);
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    
    // Simulate OTP verification
    toast.success("Login successful!");
    
    // Navigate to appropriate dashboard
    if (role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/student/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <img src={logo} alt="Brototype" className="h-12" />
        </div>
      </header>

      {/* Login Form */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {role === "admin" ? "Admin" : "Student"} Login
            </h1>
            <p className="text-muted-foreground">
              Enter your details to continue
            </p>
          </div>

          <Tabs value={loginMethod} onValueChange={(v) => setLoginMethod(v as "phone" | "email")}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </TabsTrigger>
            </TabsList>

            <TabsContent value="phone" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={otpSent}
                />
              </div>
            </TabsContent>

            <TabsContent value="email" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={otpSent}
                />
              </div>
            </TabsContent>
          </Tabs>

          {otpSent && (
            <div className="flex flex-col items-center gap-4 mt-4">
              <Label htmlFor="otp">Enter 6-digit OTP</Label>
              <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          )}

          <div className="mt-6 space-y-3">
            {!otpSent ? (
              <Button
                onClick={handleSendOtp}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                size="lg"
              >
                Send OTP
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleVerifyOtp}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  size="lg"
                >
                  Verify & Login
                </Button>
                <Button
                  onClick={() => {
                    setOtpSent(false);
                    setOtp("");
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Resend OTP
                </Button>
              </>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Login;
