import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Star,
} from 'lucide-react';
import { Button, Card, AnimationWrapper, StaggeredContainer } from '../components';
import { MainLayout } from '../layouts';
import { testimonials, featuredBrands, eventCategories } from '../data/mockData';
import { formatCurrency } from '../utils/helpers';

/**
 * Landing Page - High-quality, brand-focused homepage with smooth animations
 */
export const Landing = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="section-lg bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #f0f9ff 0%, rgba(107, 197, 233, 0.05) 50%, #f0faff 100%)'}}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob" style={{opacity: 0.4}}></div>
          <div className="absolute -bottom-40 left-40 w-72 h-72 bg-gradient-to-br from-cyan-300 to-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob" style={{ animationDelay: '2s', opacity: 0.4 }}></div>
          <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob" style={{ animationDelay: '4s', opacity: 0.3 }}></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <AnimationWrapper animation="slideInLeft" duration={0.7}>
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 animate-scale-in" style={{background: 'linear-gradient(135deg, rgba(107, 197, 233, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)', border: '1px solid rgba(107, 197, 233, 0.3)'}}>
                  <span className="text-xs font-semibold" style={{color: 'rgb(107, 197, 233)'}}>
                    🎯 NEW: AI Matching Engine
                  </span>
                </div>

                <h1 className="text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
                  The Sponsorship Marketplace That Works
                </h1>

                <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                  Connect with the right sponsorship opportunities. Whether you're a brand seeking
                  impactful events or an organizer attracting sponsors—we've got you covered.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/auth/sponsor">
                    <Button variant="primary" size="lg" style={{background: 'linear-gradient(135deg, #2563eb 0%, rgb(107, 197, 233) 100%)', boxShadow: '0 0 20px rgba(107, 197, 233, 0.4)', border: 'none'}}>
                      Sponsor an Event
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link to="/auth/organizer">
                    <Button variant="outline" size="lg" style={{borderColor: 'rgb(107, 197, 233)', color: 'rgb(107, 197, 233)'}}>
                      Create an Event
                    </Button>
                  </Link>
                </div>

                {/* Stats */}
                <StaggeredContainer className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-neutral-200">
                  <div>
                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">5K+</p>
                    <p className="text-sm text-neutral-600">Active Events</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">$2.5B</p>
                    <p className="text-sm text-neutral-600">Sponsorships Matched</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">10K+</p>
                    <p className="text-sm text-neutral-600">Brands & Organizers</p>
                  </div>
                </StaggeredContainer>
              </div>
            </AnimationWrapper>

            {/* Right Column - Visual */}
            <AnimationWrapper animation="slideInRight" duration={0.7}>
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl p-8 border border-neutral-200 hover:shadow-3xl transition-all duration-500 hover:border-cyan-300" style={{boxShadow: '0 20px 50px rgba(107, 197, 233, 0.1)'}}>
                  <div className="space-y-4">
                    {[
                      { title: 'TechConf 2025', budget: '$250K', match: 85 },
                      { title: 'Music Festival', budget: '$150K', match: 92 },
                      { title: 'Sports Championship', budget: '$500K', match: 78 },
                    ].map((item, i) => (
                      <div key={i} className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 hover:bg-accent-light transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-md hover:border-cyan-300" style={{backgroundColor: i === 0 ? 'rgba(107, 197, 233, 0.05)' : 'transparent'}}>
                        <div className="flex justify-between mb-2">
                          <span className="font-semibold text-neutral-900">{item.title}</span>
                          <span className="font-bold bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">{item.match}%</span>
                        </div>
                        <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${item.match}%`, background: 'linear-gradient(90deg, #2563eb 0%, rgb(107, 197, 233) 100%)' }}
                          />
                        </div>
                        <p className="text-xs text-neutral-600 mt-2">Budget: {item.budget}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimationWrapper>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="section-lg">
        <div className="container-custom">
          <AnimationWrapper animation="slideInUp" threshold={0.2} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
              Simple, Transparent, Effective
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Our three-step process makes sponsorship deals happen in days, not months
            </p>
          </AnimationWrapper>

          <StaggeredContainer staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: 'Find & Propose',
                description: 'Browse hundreds of events or create your sponsorship request. Our AI recommends the best matches.',
                icon: '🔍',
              },
              {
                step: 2,
                title: 'Negotiate & Agree',
                description: 'Chat with organizers, negotiate terms, and finalize package details with transparency.',
                icon: '💬',
              },
              {
                step: 3,
                title: 'Activate & Track',
                description: 'Execute deals, activate sponsorships, and track ROI in real-time analytics dashboard.',
                icon: '📊',
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <Card size="lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl transform hover:scale-110 transition-transform duration-300">{item.icon}</div>
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-600 hover:bg-primary-200 transition-colors duration-300">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">{item.title}</h3>
                  <p className="text-neutral-600">{item.description}</p>
                </Card>

                {/* Arrow */}
                {item.step < 3 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-primary-300 animate-pulse" />
                  </div>
                )}
              </div>
            ))}
          </StaggeredContainer>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-lg bg-neutral-50">
        <div className="container-custom">
          <AnimationWrapper animation="slideInUp" threshold={0.2} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Event Categories We Support
            </h2>
            <p className="text-lg text-neutral-600">
              Explore sponsorship opportunities across diverse event types
            </p>
          </AnimationWrapper>

          <StaggeredContainer staggerDelay={0.08} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {eventCategories.map((cat) => (
              <div
                key={cat.id}
                className="card-md text-center hover:shadow-lg transition-all cursor-pointer group hover:scale-105"
              >
                <div className="text-3xl mb-3 transform group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-300">{cat.icon}</div>
                <h4 className="font-semibold text-neutral-900 mb-1">{cat.name}</h4>
                <p className="text-xs text-neutral-600">{cat.description}</p>
              </div>
            ))}
          </StaggeredContainer>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-lg">
        <div className="container-custom">
          <AnimationWrapper animation="slideInUp" threshold={0.2} className="mb-12">
            <h2 className="text-4xl font-bold text-neutral-900 text-center">
              Why Sponsors & Organizers Trust Us
            </h2>
          </AnimationWrapper>

          <StaggeredContainer staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Shield,
                title: 'Verified & Secure',
                description: 'All events and sponsors are verified. Your sponsorship is protected.',
              },
              {
                icon: TrendingUp,
                title: 'Real-time Analytics',
                description: 'Track ROI, impressions, and engagement with powerful dashboards.',
              },
              {
                icon: Zap,
                title: 'Quick Deals',
                description: 'Close sponsorship deals in days instead of months with our platform.',
              },
              {
                icon: Users,
                title: '24/7 Support',
                description: 'Our team is always ready to help with any questions or issues.',
              },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="flex gap-4 p-6 rounded-xl hover:bg-primary-50 transition-all duration-300 group">
                  <div className="flex-shrink-0">
                    <Icon className="w-8 h-8 text-primary-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 mb-2">{feature.title}</h4>
                    <p className="text-neutral-600">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </StaggeredContainer>
        </div>
      </section>

      {/* Trusted Brands Section */}
      <section className="section-lg bg-neutral-50">
        <div className="container-custom">
          <AnimationWrapper animation="fadeIn" threshold={0.3} className="text-center mb-8">
            <p className="text-neutral-600 font-medium">
              Trusted by leading brands worldwide
            </p>
          </AnimationWrapper>
          <StaggeredContainer staggerDelay={0.1} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {featuredBrands.map((brand, i) => (
              <div key={i} className="flex items-center justify-center h-16 bg-white rounded-lg border border-neutral-200 hover:shadow-lg transition-all duration-300 hover:scale-110">
                <img src={brand.logo} alt={brand.name} className="w-12 h-12 rounded-lg" />
              </div>
            ))}
          </StaggeredContainer>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-lg">
        <div className="container-custom">
          <AnimationWrapper animation="slideInUp" threshold={0.2} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Loved by Our Community
            </h2>
            <p className="text-lg text-neutral-600">
              See what sponsors and organizers say about SponsiWise
            </p>
          </AnimationWrapper>

          <StaggeredContainer staggerDelay={0.2} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} size="lg">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array(testimonial.rating)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 hover:scale-110 transition-transform duration-300 cursor-pointer" />
                    ))}
                </div>

                {/* Quote */}
                <p className="text-neutral-700 mb-4 italic">"{testimonial.quote}"</p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-neutral-200">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full hover:scale-110 transition-transform duration-300"
                  />
                  <div>
                    <p className="font-semibold text-neutral-900">{testimonial.name}</p>
                    <p className="text-xs text-neutral-600">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </StaggeredContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-lg bg-gradient-to-r from-primary-600 to-secondary-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        </div>
        <div className="container-custom text-center relative z-10">
          <AnimationWrapper animation="slideInUp" threshold={0.3}>
            <h2 className="text-4xl font-bold mb-4">
              Ready to Transform Your Sponsorships?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of brands and event organizers already using SponsiWise to close
              better deals, faster.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/sponsor">
                <Button variant="primary" size="lg" className="bg-white text-primary-600 hover:bg-neutral-100">
                  Get Started as Sponsor
                </Button>
              </Link>
              <Link to="/auth/organizer">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary-600"
                >
                  List Your Event
                </Button>
              </Link>
            </div>
          </AnimationWrapper>
        </div>
      </section>
    </MainLayout>
  );
};

export default Landing;
