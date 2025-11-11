import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { UserCircle, Shield } from "lucide-react";
import logo from "@/assets/logo.png";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <img src={logo} alt="Brototype" className="h-12" />
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-5xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
              BrocampSupport
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your Voice Matters. Submit complaints, track progress, and get solutions faster.
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Student Card */}
            <Card className="p-8 hover:shadow-lg transition-all duration-300 border-2 hover:border-accent cursor-pointer group">
              <div className="text-center space-y-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary group-hover:bg-accent/10 transition-colors">
                  <UserCircle className="w-10 h-10 text-foreground group-hover:text-accent transition-colors" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">Student Portal</h2>
                  <p className="text-muted-foreground">
                    Submit and track your complaints with ease
                  </p>
                </div>
                <Button
                  onClick={() => navigate("/login?role=student")}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg"
                  size="lg"
                >
                  Login as Student
                </Button>
              </div>
            </Card>

            {/* Admin Card */}
            <Card className="p-8 hover:shadow-lg transition-all duration-300 border-2 hover:border-accent cursor-pointer group">
              <div className="text-center space-y-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary group-hover:bg-accent/10 transition-colors">
                  <Shield className="w-10 h-10 text-foreground group-hover:text-accent transition-colors" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">Admin Portal</h2>
                  <p className="text-muted-foreground">
                    Manage and resolve complaints efficiently
                  </p>
                </div>
                <Button
                  onClick={() => navigate("/login?role=admin")}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 text-lg"
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
      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 Brototype. Brother You Never Had.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
