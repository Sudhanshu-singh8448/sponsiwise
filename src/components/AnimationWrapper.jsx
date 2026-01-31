import React, { useEffect, useRef, useState } from 'react';

/**
 * AnimationWrapper - Component for triggering animations on scroll
 * Provides smooth fade-in and slide-in effects when elements come into view
 * Enhanced with glow and accent effects
 */
export const AnimationWrapper = ({
  children,
  animation = 'slideInUp',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  once = true,
  className = '',
  withGlow = false,
  withAccent = false,
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, once]);

  const animationClass = isVisible ? `animate-${animation}` : 'opacity-0';
  const glowStyle = withGlow && isVisible ? {
    boxShadow: '0 0 30px rgba(107, 197, 233, 0.3)'
  } : {};

  return (
    <div
      ref={ref}
      className={`${animationClass} ${className} ${withAccent ? 'transform hover:scale-105 transition-all duration-500' : ''}`}
      style={{
        animationDuration: isVisible ? `${duration}s` : '0s',
        animationDelay: isVisible ? `${delay}s` : '0s',
        ...glowStyle,
      }}
    >
      {children}
    </div>
  );
};

/**
 * StaggeredContainer - Wrapper for staggered animations on children
 * Each child animates with a delay for a cascade effect
 */
export const StaggeredContainer = ({
  children,
  animation = 'slideInUp',
  staggerDelay = 0.1,
  duration = 0.6,
  threshold = 0.1,
  className = '',
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) => (
        <div
          className={isVisible ? `animate-${animation}` : 'opacity-0'}
          style={{
            animationDuration: isVisible ? `${duration}s` : '0s',
            animationDelay: isVisible ? `${index * staggerDelay}s` : '0s',
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default AnimationWrapper;
