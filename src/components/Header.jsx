import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

/**
 * Header - Navigation bar for the application
 * Responsive design with mobile menu
 */
export const Header = ({ sticky = true }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  // Role-based navigation links
  const getNavLinks = () => {
    const baseLinks = [
      { label: 'Browse Events', href: '/marketplace' },
    ];

    if (!isAuthenticated) {
      return [...baseLinks, { label: 'How It Works', href: '/#how-it-works' }];
    }

    const authenticatedLinks = [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Deals', href: '/deals' },
      { label: 'Billing', href: '/billing' },
      { label: 'Messages', href: '/messages' },
    ];

    // Add role-specific analytics links
    if (user?.role === 'sponsor') {
      authenticatedLinks.push(
        { label: 'My Analytics', href: '/analytics/sponsor' },
        { label: 'Agency', href: '/agency' }
      );
    } else if (user?.role === 'organizer') {
      authenticatedLinks.push({ label: 'My Analytics', href: '/analytics/organizer' });
    }

    // Add admin-only links
    if (user?.role === 'admin') {
      authenticatedLinks.push(
        { label: 'Admin Console', href: '/admin/console' },
        { label: 'Admin Monetization', href: '/admin/monetization' }
      );
    }

    return authenticatedLinks;
  };

  const navLinks = getNavLinks();

  return (
    <header
      className={`bg-white border-b border-neutral-200 ${
        sticky ? 'sticky top-0 z-40' : ''
      } shadow-sm hover:shadow-lg transition-all duration-300 relative`}
      style={{
        backgroundImage: 'linear-gradient(135deg, rgba(107, 197, 233, 0.02) 0%, transparent 100%)'
      }}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:scale-110 transition-all duration-300 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center hover:rotate-12 transition-all duration-500 group-hover:shadow-lg" style={{boxShadow: '0 0 15px rgba(107, 197, 233, 0.3)'}}>
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="hidden md:inline font-bold text-lg text-neutral-900 hover:text-accent transition-all duration-300 group-hover:scale-105" style={{color: 'rgb(107, 197, 233)', textShadow: '0 0 10px rgba(107, 197, 233, 0.1)'}}>
              SponsiWise
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                className="text-neutral-600 hover:text-accent font-medium transition-all duration-300 relative group"
                style={{transitionDelay: `${idx * 50}ms`}}
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
                <span className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{backgroundColor: 'rgba(107, 197, 233, 0.05)'}}></span>
              </a>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-3 px-4 py-2 bg-neutral-50 rounded-lg hover:bg-accent-light transition-all duration-300 hover:scale-105 hover:shadow-md" style={{backgroundColor: 'rgba(107, 197, 233, 0.05)', border: '1px solid rgba(107, 197, 233, 0.2)'}}>
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full flex items-center justify-center hover:shadow-md transition-all duration-300 font-semibold text-blue-700">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      {user?.name}
                    </p>
                    <p className="text-xs text-neutral-500 capitalize">
                      {user?.role}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary btn-sm hover:scale-105 transition-all duration-300 hover:shadow-md" style={{color: 'rgb(107, 197, 233)', borderColor: 'rgba(107, 197, 233, 0.3)', backgroundColor: 'rgba(107, 197, 233, 0.05)'}}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link to="/login" className="btn btn-outline btn-sm hover:scale-105 transition-all duration-300 hover:shadow-md" style={{borderColor: 'rgba(107, 197, 233, 0.5)', color: 'rgb(107, 197, 233)'}}>
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary btn-sm hover:scale-105 transition-all duration-300 hover:shadow-md" style={{background: 'linear-gradient(135deg, #2563eb 0%, rgb(107, 197, 233) 100%)', boxShadow: '0 0 15px rgba(107, 197, 233, 0.3)'}}>
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-accent-light rounded-lg transition-all duration-300 hover:rotate-90"
              style={{backgroundColor: mobileMenuOpen ? 'rgba(107, 197, 233, 0.1)' : 'transparent'}}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 animate-rotate-slow" style={{color: 'rgb(107, 197, 233)'}} />
              ) : (
                <Menu className="w-6 h-6" style={{color: 'rgb(107, 197, 233)'}} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 py-4 space-y-3 animate-slide-in-down" style={{backgroundColor: 'rgba(107, 197, 233, 0.02)'}}>
            {navLinks.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-neutral-600 hover:text-accent hover:bg-accent-light rounded-lg transition-all duration-300 transform hover:translate-x-1"
                onClick={() => setMobileMenuOpen(false)}
                style={{transitionDelay: `${idx * 30}ms`}}
              >
                {link.label}
              </a>
            ))}

            <div className="border-t border-neutral-200 pt-3 mt-3 space-y-2">
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-2 text-neutral-900 font-medium">
                    {user?.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full btn btn-secondary btn-sm hover:scale-105 transition-all duration-300"
                    style={{color: 'rgb(107, 197, 233)', borderColor: 'rgba(107, 197, 233, 0.3)', backgroundColor: 'rgba(107, 197, 233, 0.05)'}}
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block btn btn-outline btn-sm hover:scale-105 transition-all duration-300" style={{borderColor: 'rgba(107, 197, 233, 0.5)', color: 'rgb(107, 197, 233)'}}>
                    Login
                  </Link>
                  <Link to="/signup" className="block btn btn-primary btn-sm hover:scale-105 transition-all duration-300" style={{background: 'linear-gradient(135deg, #2563eb 0%, rgb(107, 197, 233) 100%)'}}>
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
