import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

/**
 * Footer - Application footer with links and information
 */
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-100">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="font-bold text-lg">SponsiWise</span>
            </div>
            <p className="text-neutral-400 mb-4">
              The sponsorship marketplace connecting brands with events that matter.
            </p>
            <div className="flex items-center gap-2 text-neutral-400 mb-2">
              <Mail className="w-4 h-4" />
              <a href="mailto:info@sponsiwise.com" className="hover:text-primary-400">
                info@sponsiwise.com
              </a>
            </div>
            <div className="flex items-center gap-2 text-neutral-400">
              <Phone className="w-4 h-4" />
              <a href="tel:+14155551234" className="hover:text-primary-400">
                +1 (415) 555-1234
              </a>
            </div>
          </div>

          {/* For Sponsors */}
          <div>
            <h4 className="font-semibold mb-4 text-white">For Sponsors</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  Browse Events
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  Case Studies
                </a>
              </li>
            </ul>
          </div>

          {/* For Organizers */}
          <div>
            <h4 className="font-semibold mb-4 text-white">For Organizers</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  Create Event
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  Resources
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-neutral-400 text-sm">
            &copy; {currentYear} SponsiWise. All rights reserved.
          </p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-neutral-400 hover:text-primary-400 transition-colors"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-neutral-400 hover:text-primary-400 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-neutral-400 hover:text-primary-400 transition-colors"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
