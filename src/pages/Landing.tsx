import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { UserCircle, Shield } from "lucide-react";
import logo from "@/assets/logo.png";
import heroBg from "@/assets/hero-bg.png";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-md relative z-10 bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 animate-fade-in">
            <img src={logo} alt="Brototype" className="h-14" />
            <span className="text-2xl font-bold text-foreground tracking-tight">BrocampSupport</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-extrabold mb-6 text-foreground tracking-tight">
              BrocampSupport
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
              Your Voice Matters. Submit complaints, track progress, and get solutions faster.
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Student Card */}
            <Card className="p-10 hover:shadow-2xl transition-all duration-500 border-2 hover:border-accent cursor-pointer group bg-card/80 backdrop-blur-sm animate-slide-in hover:-translate-y-2">
              <div className="text-center space-y-8">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-secondary group-hover:bg-accent/10 transition-all duration-300 group-hover:scale-110">
                  <UserCircle className="w-12 h-12 text-foreground group-hover:text-accent transition-colors" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold mb-3 tracking-tight">Student Portal</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Submit and track your complaints with ease
                  </p>
                </div>
                <Button
                  onClick={() => navigate("/login?role=student")}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-7 text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  size="lg"
                >
                  Login as Student
                </Button>
              </div>
            </Card>

            {/* Admin Card */}
            <Card className="p-10 hover:shadow-2xl transition-all duration-500 border-2 hover:border-accent cursor-pointer group bg-card/80 backdrop-blur-sm animate-slide-in hover:-translate-y-2" style={{ animationDelay: '0.1s' }}>
              <div className="text-center space-y-8">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-secondary group-hover:bg-accent/10 transition-all duration-300 group-hover:scale-110">
                  <Shield className="w-12 h-12 text-foreground group-hover:text-accent transition-colors" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold mb-3 tracking-tight">Admin Portal</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Manage and resolve complaints efficiently
                  </p>
                </div>
                <Button
                  onClick={() => navigate("/login?role=admin")}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-7 text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  size="lg"
                >
                  Login as Admin
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 relative z-10 bg-background/60 backdrop-blur-md">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-base font-medium">© 2025 Brototype. Brother You Never Had.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
