import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

/**
 * MainLayout - Standard layout with header and footer
 */
export const MainLayout = ({ children, hideFooter = false }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header sticky={true} />
      <main className="flex-1">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
};

/**
 * DashboardLayout - Layout for dashboard pages
 */
export const DashboardLayout = ({ children, sidebar }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header sticky={true} />
      <div className="flex-1 flex">
        {sidebar && <aside className="hidden lg:block w-64 bg-neutral-50 border-r border-neutral-200">{sidebar}</aside>}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

/**
 * SimpleLayout - Minimal layout (no footer, no header)
 */
export const SimpleLayout = ({ children }) => {
  return <>{children}</>;
};

export default MainLayout;
