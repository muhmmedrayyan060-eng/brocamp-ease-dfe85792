import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-black text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Brototype" className="h-10" />
              <span className="text-xl font-bold text-white">BrocampSupport</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your Voice Matters. We're here to help resolve your concerns quickly and efficiently.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <a href="#" className="text-gray-300 hover:text-accent transition-colors text-sm">About Us</a>
              <a href="#" className="text-gray-300 hover:text-accent transition-colors text-sm">Support</a>
              <a href="#" className="text-gray-300 hover:text-accent transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-accent transition-colors text-sm">Terms of Service</a>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>Email: support@brototype.com</p>
              <p>Phone: +91 123 456 7890</p>
              <p>Hours: Mon-Fri, 9AM-6PM</p>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center">
          <p className="text-gray-400 text-sm">© 2025 Brototype. Brother You Never Had. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
