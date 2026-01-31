import React from 'react';
import { Loader } from 'lucide-react';

/**
 * Loading Component
 */
export const Loading = ({ message = 'Loading...', fullscreen = false }) => {
  const content = (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader className="w-12 h-12 text-primary-600 animate-spin mb-4" />
      <p className="text-neutral-600 font-medium">{message}</p>
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
};

/**
 * Skeleton Loader
 */
export const SkeletonLoader = ({ count = 1, height = 'h-12' }) => {
  return (
    <div className="space-y-4">
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={`${height} bg-neutral-200 rounded-lg animate-pulse`}
          />
        ))}
    </div>
  );
};

export default Loading;
