# Quick Reference - Accent Color & Animations

## Accent Color
```
RGB: 107, 197, 233
HEX: #6BC5E9
HSL: 195°, 73%, 67%
CSS: rgb(107, 197, 233)
```

## CSS Utility Classes

### Animation Classes
```css
.animate-fade-in         /* Smooth fade in */
.animate-slide-in-up     /* Slide in from bottom */
.animate-slide-in-down   /* Slide in from top */
.animate-slide-in-left   /* Slide in from left */
.animate-slide-in-right  /* Slide in from right */
.animate-scale-in        /* Scale in effect */
.animate-float           /* Floating effect (infinite) */
.animate-pulse-glow      /* Pulsing glow */
.animate-bounce-in       /* Bounce entrance */
.animate-glow            /* Glow effect (infinite) */
.animate-rotate-slow     /* Slow rotation (infinite) */
.animate-pulse-accent    /* Accent ripple */
.animate-slide-right     /* Slide from left to right */
.animate-blob            /* Blob morph (infinite) */
.animate-stagger > *     /* Staggered children animations */
```

### Accent Color Classes
```css
.text-accent             /* rgb(107, 197, 233) text */
.accent-glow             /* Box-shadow with accent */
.bg-accent-light         /* Light accent background (10% opacity) */
.border-accent           /* Accent color border */
```

## Common Usage Patterns

### Button with Glow
```jsx
<button 
  className="btn btn-primary hover:shadow-lg"
  style={{
    background: 'linear-gradient(135deg, #2563eb 0%, rgb(107, 197, 233) 100%)',
    boxShadow: '0 0 20px rgba(107, 197, 233, 0.4)'
  }}
>
  Click Me
</button>
```

### Card with Glow on Hover
```jsx
<div 
  className="card hover:shadow-2xl transition-all duration-300"
  style={{
    borderColor: 'rgba(107, 197, 233, 0.3)'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.boxShadow = '0 10px 30px rgba(107, 197, 233, 0.2)';
    e.currentTarget.style.borderColor = 'rgb(107, 197, 233)';
  }}
>
  Card Content
</div>
```

### Animated Icon
```jsx
<MapPin 
  className="w-4 h-4 animate-float"
  style={{ color: 'rgb(107, 197, 233)' }}
/>
```

### Gradient Text
```jsx
<h1 className="bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
  Beautiful Heading
</h1>
```

### Link with Animated Underline
```jsx
<a 
  href="#"
  className="relative text-neutral-900 hover:text-accent transition-colors"
  style={{
    backgroundImage: 'linear-gradient(90deg, rgb(107, 197, 233), #2563eb)',
    backgroundPosition: '0% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 2px',
    textDecoration: 'none'
  }}
>
  Link
</a>
```

### Input with Accent Focus
```jsx
<input 
  type="text"
  className="input"
  style={{
    '--tw-ring-color': 'rgb(107, 197, 233)'
  }}
  onFocus={(e) => {
    e.target.style.boxShadow = '0 0 0 3px rgba(107, 197, 233, 0.1)';
  }}
/>
```

## Animation Timing

### Durations
```css
Fast:      150ms  (mobile, micro-interactions)
Normal:    300ms  (hover effects)
Medium:    600ms  (page animations)
Slow:      1000ms (background animations)
Very Slow: 2000ms (infinite loops)
```

### Easing Functions
```css
ease-out    /* Quick start, smooth end (page load) */
ease-in     /* Smooth start, quick end (exit animations) */
ease-in-out /* Smooth both ends (hover effects) */
linear      /* Constant speed (rotations, scrolling) */
```

## Staggered Animation Pattern

### HTML Structure
```html
<div class="animate-stagger">
  <div>Item 1 - delay 0.1s</div>
  <div>Item 2 - delay 0.2s</div>
  <div>Item 3 - delay 0.3s</div>
  <!-- etc... up to 10+ items -->
</div>
```

### Result
Items animate in sequence with 100ms between each, creating a wave effect.

## Color Gradients

### Primary Gradient (Buttons, CTAs)
```css
background: linear-gradient(135deg, #2563eb 0%, rgb(107, 197, 233) 100%);
```

### Accent Gradient (Text)
```css
background: linear-gradient(90deg, #2563eb 0%, rgb(107, 197, 233) 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

### Soft Gradient (Backgrounds)
```css
background: linear-gradient(135deg, #f0f9ff 0%, rgba(107, 197, 233, 0.05) 50%, #f0faff 100%);
```

### Glow Effect
```css
box-shadow: 0 0 20px rgba(107, 197, 233, 0.5);
```

## Responsive Breakpoints

| Screen | Max Width | Animation Speed | Hover Effects |
|--------|-----------|-----------------|---------------|
| Mobile | 640px     | 150-400ms       | Touch-based   |
| Tablet | 1024px    | 200-500ms       | Mixed         |
| Desktop| 1280px+   | 300-600ms       | Full hover    |

## Performance Tips

1. **Use CSS animations, not JavaScript**
   ```css
   /* Good - Hardware accelerated */
   @keyframes slideIn {
     transform: translateX(-100%);
   }
   
   /* Avoid - Janky JavaScript */
   setInterval(() => { element.style.left = x++ }, 16);
   ```

2. **Animate transforms only**
   ```css
   /* Good - GPU accelerated */
   transform: translateY(-20px);
   transform: scale(1.05);
   transform: rotate(360deg);
   
   /* Avoid - Forces repaints */
   top: 20px;
   width: 200px;
   left: 50px;
   ```

3. **Use will-change sparingly**
   ```css
   /* Only for elements that constantly animate */
   .infinite-animation {
     will-change: transform;
   }
   ```

## Browser DevTools Tips

### Check Animation Performance
1. Open DevTools → Performance tab
2. Record page interaction
3. Look for 60fps green line (smooth)
4. Avoid red spikes (jank)

### Debug Animations
1. Open DevTools → Elements tab
2. Select animated element
3. View applied animations in Animations panel
4. Pause/step through animations

## Troubleshooting

### Animation Not Showing
```jsx
// Check if element has opacity-0 class initially
// Solution: Remove conflicting opacity classes
<div className="animate-fade-in"> {/* Remove opacity-0 */}
```

### Animation Too Fast/Slow
```jsx
// Adjust duration in AnimationWrapper
<AnimationWrapper duration={1.2}> {/* Increase duration */}
  Content
</AnimationWrapper>
```

### Jank/Stuttering
```css
/* Ensure GPU acceleration */
.animated-element {
  transform: translateZ(0); /* Force GPU */
  will-change: transform;
}
```

### Color Not Showing
```jsx
// Ensure inline style overrides Tailwind
<button style={{color: 'rgb(107, 197, 233)'}}>
  Text
</button>
```

## Key Files
- `src/index.css` - All animations and utilities
- `src/App.css` - App-level styles
- `src/components/Header.jsx` - Navigation styling
- `src/components/EventCard.jsx` - Card animations
- `src/pages/Landing.jsx` - Hero animations

## Need Help?
1. Check `UI_UX_ENHANCEMENTS.md` for detailed changes
2. Check `VISUAL_DESIGN_GUIDE.md` for design system
3. Review animation classes in `src/index.css`
4. Test in browser DevTools
