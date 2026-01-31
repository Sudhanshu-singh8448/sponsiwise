import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { MarketplaceProvider } from '../context/MarketplaceContext';
import { BillingProvider } from '../context/BillingContext';
import { Header } from '../components/Header';

const MockedHeader = () => (
  <BrowserRouter>
    <AuthProvider>
      <MarketplaceProvider>
        <BillingProvider>
          <Header />
        </BillingProvider>
      </MarketplaceProvider>
    </AuthProvider>
  </BrowserRouter>
);

describe('Header Component', () => {
  it('should render without crashing', () => {
    render(<MockedHeader />);
    expect(screen.getByText('SponsiWise')).toBeInTheDocument();
  });

  it('should display navigation links when not authenticated', () => {
    render(<MockedHeader />);
    expect(screen.getByText(/Browse Events/i)).toBeInTheDocument();
  });

  it('should have responsive menu button', () => {
    render(<MockedHeader />);
    const menuButtons = screen.getAllByRole('button').filter(
      (btn) => btn.querySelector('svg') // Has icon
    );
    expect(menuButtons.length).toBeGreaterThan(0);
  });
});
