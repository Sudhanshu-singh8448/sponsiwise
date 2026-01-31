import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Users, UserCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/FormElements';
import { SimpleLayout } from '../layouts';

/**
 * RoleSelection - Let user choose their role
 */
export const RoleSelection = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const roles = [
    {
      id: 'sponsor',
      title: 'Sponsor / Brand',
      description: 'I want to sponsor events and build brand awareness',
      icon: Briefcase,
      color: 'primary',
      features: [
        'Browse and discover events',
        'Send sponsorship proposals',
        'Track ROI and metrics',
        'Manage sponsorships',
      ],
    },
    {
      id: 'organizer',
      title: 'Event Organizer',
      description: 'I organize events and want sponsorship support',
      icon: Users,
      color: 'secondary',
      features: [
        'Create and manage events',
        'Set sponsorship packages',
        'Accept sponsor proposals',
        'Track sponsorship revenue',
      ],
    },
    {
      id: 'agency',
      title: 'Agency',
      description: 'I represent sponsors and manage sponsorships',
      icon: UserCheck,
      color: 'success',
      features: [
        'Manage multiple brands',
        'Submit proposals on their behalf',
        'Track multiple deals',
        'Earn commissions',
      ],
    },
  ];

  return (
    <SimpleLayout>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container-custom py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-6">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
            </div>
            <h1 className="text-5xl font-bold text-neutral-900 mb-4">
              Welcome to SponsiWise
            </h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Choose your role to get started on the world's leading sponsorship marketplace
            </p>
          </div>

          {/* Role Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <div
                  key={role.id}
                  className="card-lg group hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/auth/${role.id}`)}
                >
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-4 ${
                    role.color === 'primary' ? 'bg-primary-100' :
                    role.color === 'secondary' ? 'bg-secondary-100' :
                    'bg-green-100'
                  }`}>
                    <Icon className={`w-8 h-8 ${
                      role.color === 'primary' ? 'text-primary-600' :
                      role.color === 'secondary' ? 'text-secondary-600' :
                      'text-green-600'
                    }`} />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">
                    {role.title}
                  </h3>
                  <p className="text-neutral-600 mb-6 text-sm leading-relaxed">
                    {role.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {role.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-neutral-700">
                        <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-6 border-t border-neutral-200 group-hover:text-primary-600 transition-colors">
                    <span className="font-semibold">Get Started</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Already have account */}
          <div className="text-center">
            <p className="text-neutral-600">
              Already have an account?{' '}
              <a href="/login" className="font-semibold text-primary-600 hover:text-primary-700">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </SimpleLayout>
  );
};

export default RoleSelection;
