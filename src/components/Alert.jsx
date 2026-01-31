import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

/**
 * Alert Component - Display alerts/notifications
 */
export const Alert = ({
  type = 'info',
  title,
  message,
  onClose,
  closeable = true,
}) => {
  const styles = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: 'text-blue-600',
      title: 'text-blue-900',
      text: 'text-blue-800',
      Icon: Info,
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: 'text-green-600',
      title: 'text-green-900',
      text: 'text-green-800',
      Icon: CheckCircle,
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: 'text-yellow-600',
      title: 'text-yellow-900',
      text: 'text-yellow-800',
      Icon: AlertTriangle,
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: 'text-red-600',
      title: 'text-red-900',
      text: 'text-red-800',
      Icon: AlertCircle,
    },
  };

  const style = styles[type];
  const { Icon } = style;

  return (
    <div className={`${style.bg} border ${style.border} rounded-lg p-4 flex gap-3`}>
      <Icon className={`w-5 h-5 ${style.icon} flex-shrink-0 mt-0.5`} />
      <div className="flex-1">
        {title && <h4 className={`font-semibold ${style.title} mb-1`}>{title}</h4>}
        {message && <p className={`text-sm ${style.text}`}>{message}</p>}
      </div>
      {closeable && onClose && (
        <button
          onClick={onClose}
          className="text-neutral-400 hover:text-neutral-600 flex-shrink-0"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;
