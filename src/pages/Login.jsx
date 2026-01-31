import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button, Input } from '../components/FormElements';
import { SimpleLayout } from '../layouts';
import { Alert } from '../components/Alert';

/**
 * Login Page
 */
export const Login = () => {
  const navigate = useNavigate();
  const { role } = useParams();
  const { login, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState('');

  // Demo credentials
  const demoUsers = {
    sponsor: { email: 'partnerships@nike.com', password: 'demo' },
    organizer: { email: 'john@techconf.com', password: 'demo' },
    agency: { email: 'agency@example.com', password: 'demo' },
    admin: { email: 'admin@sponsiwise.com', password: 'demo' },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.email || !formData.password) {
      setFormError('Please fill in all fields');
      return;
    }

    try {
      await login(formData.email, formData.password, role);
      navigate('/dashboard');
    } catch (err) {
      setFormError(err.message || 'Login failed. Please try again.');
    }
  };

  const handleDemoLogin = (demoRole) => {
    const demoUser = demoUsers[demoRole];
    handleSubmit({ preventDefault: () => {} });
    setFormData({
      email: demoUser.email,
      password: demoUser.password,
    });
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
                Welcome Back
              </h1>
              <p className="text-neutral-600">
                Sign in to your SponsiWise account
              </p>
            </div>

            {/* Errors */}
            {formError && <Alert type="error" message={formError} className="mb-6" />}
            {error && <Alert type="error" message={error} className="mb-6" />}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
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
              />

              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={loading}
                disabled={loading}
              >
                Sign In {<ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </form>

            {/* Demo Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm font-medium text-blue-900 mb-3">
                💡 Try with demo credentials:
              </p>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      email: 'partnerships@nike.com',
                      password: 'demo',
                    });
                  }}
                  className="w-full text-left text-sm text-blue-700 hover:text-blue-900 font-medium"
                >
                  Nike (Sponsor)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      email: 'john@techconf.com',
                      password: 'demo',
                    });
                  }}
                  className="w-full text-left text-sm text-blue-700 hover:text-blue-900 font-medium"
                >
                  TechConf (Organizer)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      email: 'admin@sponsiwise.com',
                      password: 'demo',
                    });
                  }}
                  className="w-full text-left text-sm text-blue-700 hover:text-blue-900 font-medium"
                >
                  Admin
                </button>
              </div>
            </div>

            {/* Signup Link */}
            <p className="text-center text-neutral-600 text-sm">
              Don't have an account?{' '}
              <a
                href={`/auth/${role || 'sponsor'}`}
                className="font-semibold text-primary-600 hover:text-primary-700"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </SimpleLayout>
  );
};

export default Login;
