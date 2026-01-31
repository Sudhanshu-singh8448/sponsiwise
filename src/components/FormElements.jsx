import React from 'react';

/**
 * Button Component - Reusable with multiple variants
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  const baseClass = 'btn';
  const variantClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    ghost: 'text-primary-600 hover:bg-primary-50',
  }[variant];

  const sizeClass = {
    sm: 'btn-sm',
    md: 'px-4 py-2.5',
    lg: 'btn-lg',
  }[size];

  const classes = `
    ${baseClass}
    ${variantClass}
    ${sizeClass}
    ${fullWidth ? 'w-full' : ''}
    ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `.trim();

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 mr-2 transition-transform duration-300" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 ml-2 transition-transform duration-300" />}
    </button>
  );
};

/**
 * Input Component
 */
export const Input = ({
  label,
  error,
  helperText,
  icon: Icon,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-900 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
        )}
        <input
          className={`
            input
            ${Icon ? 'pl-10' : ''}
            ${error ? 'ring-2 ring-red-500 border-red-300' : ''}
            focus:scale-[1.02] transition-transform duration-200
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-neutral-500 mt-1">{helperText}</p>
      )}
    </div>
  );
};

/**
 * Textarea Component
 */
export const Textarea = ({ label, error, helperText, ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-900 mb-2">
          {label}
        </label>
      )}
      <textarea
        className={`
          textarea
          focus:scale-[1.02] transition-transform duration-200
          ${error ? 'ring-2 ring-red-500 border-red-300' : ''}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-neutral-500 mt-1">{helperText}</p>
      )}
    </div>
  );
};

/**
 * Select Component
 */
export const Select = ({ label, error, helperText, options, ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-900 mb-2">
          {label}
        </label>
      )}
      <select
        className={`
          input appearance-none bg-white cursor-pointer
          focus:scale-[1.02] transition-transform duration-200
          ${error ? 'ring-2 ring-red-500 border-red-300' : ''}
        `}
        {...props}
      >
        <option value="">Select an option</option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-neutral-500 mt-1">{helperText}</p>
      )}
    </div>
  );
};

export default Button;
