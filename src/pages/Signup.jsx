import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Mail, Lock, User, Building2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button, Input } from '../components/FormElements';
import { SimpleLayout } from '../layouts';
import { Alert } from '../components/Alert';

/**
 * Signup Page - Role-specific registration
 */
export const Signup = () => {
  const navigate = useNavigate();
  const { role } = useParams();
  const { register, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
  });
  const [formError, setFormError] = useState('');

  const roleConfig = {
    sponsor: {
      title: 'Register as a Sponsor',
      subtitle: 'Join leading brands sponsoring amazing events',
      companyLabel: 'Company Name',
    },
    organizer: {
      title: 'Register as an Event Organizer',
      subtitle: 'Start creating events and attracting sponsors',
      companyLabel: 'Organization Name',
    },
    agency: {
      title: 'Register as an Agency',
      subtitle: 'Represent sponsors and manage sponsorships',
      companyLabel: 'Agency Name',
    },
  };

  const config = roleConfig[role] || roleConfig.sponsor;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError('');
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password) {
      setFormError('Please fill in all required fields');
      return false;
    }

    if (formData.password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: role || 'sponsor',
        companyName: formData.companyName,
      });

      navigate('/dashboard');
    } catch (err) {
      setFormError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <SimpleLayout>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="card-lg">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-4">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-neutral-900 mb-2">
                {config.title}
              </h1>
              <p className="text-neutral-600 text-sm">{config.subtitle}</p>
            </div>

            {/* Errors */}
            {formError && <Alert type="error" message={formError} className="mb-6" />}
            {error && <Alert type="error" message={error} className="mb-6" />}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <Input
                label="Full Name"
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                icon={User}
              />

              <Input
                label={config.companyLabel}
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                icon={Building2}
              />

              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                icon={Mail}
              />

              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                icon={Lock}
                helperText="At least 6 characters"
              />

              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                icon={Lock}
              />

              {/* Terms & Conditions */}
              <div className="flex items-start gap-2 py-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1"
                  defaultChecked
                />
                <label htmlFor="terms" className="text-xs text-neutral-600">
                  I agree to the{' '}
                  <a href="#" className="text-primary-600 hover:text-primary-700">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-primary-600 hover:text-primary-700">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={loading}
                disabled={loading}
              >
                Create Account {<ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </form>

            {/* Login Link */}
            <p className="text-center text-neutral-600 text-sm">
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

export default Signup;
