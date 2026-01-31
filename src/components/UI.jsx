import React from 'react';

/**
 * Modal Component
 */
export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
}) => {
  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div
        className={`bg-white rounded-lg shadow-lg ${sizes[size]} w-full mx-4 max-h-[90vh] overflow-y-auto animate-scale-in`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <h2 className="text-xl font-bold text-neutral-900">{title}</h2>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-neutral-600 hover:scale-125 transition-transform duration-200"
            >
              ×
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

/**
 * Tabs Component
 */
export const Tabs = ({ tabs, defaultTab = 0, onChange }) => {
  const [activeTab, setActiveTab] = React.useState(defaultTab);

  const handleTabChange = (index) => {
    setActiveTab(index);
    onChange?.(index);
  };

  return (
    <div>
      {/* Tab List */}
      <div className="border-b border-neutral-200 flex gap-8 overflow-x-auto">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabChange(index)}
            className={`px-4 py-3 font-medium border-b-2 transition-all duration-300 hover:scale-105 ${
              activeTab === index
                ? 'text-primary-600 border-primary-600 scale-105'
                : 'text-neutral-600 border-transparent hover:text-neutral-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="pt-4 animate-fade-in">{tabs[activeTab]?.content}</div>
    </div>
  );
};

/**
 * Badge Component
 */
export const Badge = ({ variant = 'primary', children }) => {
  const variants = {
    primary: 'badge-primary',
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
  };

  return <span className={`badge ${variants[variant]}`}>{children}</span>;
};

/**
 * Card Component
 */
export const Card = ({
  children,
  size = 'md',
  hoverable = false,
  className = '',
}) => {
  const sizes = {
    sm: 'card-sm',
    md: 'card-md',
    lg: 'card-lg',
  };

  return (
    <div
      className={`
        card
        ${sizes[size]}
        ${hoverable ? 'cursor-pointer hover:shadow-lg hover:scale-105' : 'hover:shadow-lg hover:scale-102'}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Modal;
