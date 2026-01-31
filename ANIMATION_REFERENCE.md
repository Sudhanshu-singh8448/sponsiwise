# 🎬 Animation Reference Guide

## Quick Reference for Animations

### Available Animation Classes

#### Entrance Animations
```jsx
className="animate-fade-in"        // Fade in (opacity 0 to 1)
className="animate-slide-in-up"    // Slide up and fade in
className="animate-slide-in-down"  // Slide down and fade in
className="animate-slide-in-left"  // Slide from left and fade in
className="animate-slide-in-right" // Slide from right and fade in
className="animate-scale-in"       // Scale up from 0.95 and fade in
className="animate-bounce-in"      // Bouncy entrance animation
```

#### Continuous Animations
```jsx
className="animate-float"          // Gentle up-down floating motion
className="animate-pulse-glow"     // Pulsing opacity effect
```

#### Utility Classes
```jsx
className="animate-stagger"        // Stagger children animations
className="page-enter"             // Page transition fade-in
className="page-exit"              // Page transition fade-out
```

---

## Component Usage Examples

### 1. Landing Page Sections
```jsx
import { AnimationWrapper, StaggeredContainer } from '../components';

// Section header with fade-in on scroll
<AnimationWrapper animation="slideInUp" threshold={0.2}>
  <h2>Section Title</h2>
</AnimationWrapper>

// Cards with staggered cascade effect
<StaggeredContainer staggerDelay={0.15} className="grid grid-cols-3 gap-8">
  {items.map(item => (
    <Card key={item.id}>{item.name}</Card>
  ))}
</StaggeredContainer>
```

### 2. Event Cards
```jsx
// Card lifts on hover, image zooms
<Card className="hover:shadow-2xl hover:-translate-y-4">
  <img className="hover:scale-110" />
</Card>
```

### 3. Buttons
```jsx
// Button scales on hover
<Button className="hover:scale-105">Click Me</Button>
```

### 4. Form Inputs
```jsx
// Input scales slightly on focus
<Input className="focus:scale-[1.02]" />
```

### 5. Navigation Links
```jsx
// Link with animated underline
<a className="group">
  Link Text
  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all" />
</a>
```

---

## Animation Timings

| Animation Type | Duration | Delay | Easing |
|---|---|---|---|
| Fade In | 600ms | varies | ease-out |
| Slide In | 600ms | varies | ease-out |
| Scale In | 600ms | varies | ease-out |
| Hover Scale | 300ms | 0ms | ease-out |
| Focus Scale | 200ms | 0ms | ease-out |
| Float | 3000ms | varies | ease-in-out |
| Bounce In | 700ms | varies | ease-out |

---

## Animation Properties

### AnimationWrapper Props
```jsx
<AnimationWrapper
  animation="slideInUp"    // Animation type (required)
  delay={0.2}              // Delay before animation (seconds)
  duration={0.6}           // Animation duration (seconds)
  threshold={0.2}          // Scroll threshold (0-1)
  once={true}              // Animate only once on scroll
  className="mb-4"         // Additional classes
>
  Content
</AnimationWrapper>
```

### StaggeredContainer Props
```jsx
<StaggeredContainer
  animation="slideInUp"    // Animation type for children
  staggerDelay={0.15}      // Delay between children (seconds)
  duration={0.6}           // Animation duration (seconds)
  threshold={0.1}          // Scroll threshold (0-1)
  className="grid gap-4"   // Container classes
>
  {children}
</StaggeredContainer>
```

---

## CSS Keyframes Reference

### Fade In
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### Slide In Up
```css
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Scale In
```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

### Float
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
```

### Bounce In
```css
@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
```

---

## Common Patterns

### Hero Section with Dual Columns
```jsx
<section>
  <AnimationWrapper animation="slideInLeft">
    <div>Left Column Content</div>
  </AnimationWrapper>
  
  <AnimationWrapper animation="slideInRight">
    <div>Right Column Content</div>
  </AnimationWrapper>
</section>
```

### Grid with Staggered Cards
```jsx
<StaggeredContainer staggerDelay={0.15} className="grid grid-cols-3 gap-8">
  {items.map(item => (
    <Card key={item.id}>
      {item.content}
    </Card>
  ))}
</StaggeredContainer>
```

### Feature List
```jsx
<StaggeredContainer staggerDelay={0.12} className="space-y-4">
  {features.map(feature => (
    <div key={feature.id} className="flex gap-4 p-6 hover:bg-primary-50">
      <Icon />
      <Content />
    </div>
  ))}
</StaggeredContainer>
```

### Hover Lift Effect
```jsx
<Card className="hover:shadow-2xl hover:-translate-y-4 transition-all duration-500">
  Content
</Card>
```

### Interactive Icon
```jsx
<div className="group">
  <Icon className="group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
  <Text className="group-hover:text-primary-600" />
</div>
```

---

## Performance Tips

1. **Use `once={true}`** for entrance animations to avoid repeated triggers
2. **Adjust `threshold`** to control when animations trigger (0.1-0.3 is best)
3. **Limit stagger delays** to 0.1-0.2s for professional feel
4. **Use GPU transforms** (translate, scale, rotate) for smooth performance
5. **Avoid animating** opacity + position for best performance

---

## Troubleshooting

### Animation not triggering?
- Check `threshold` value (0.1 is a good default)
- Verify element is visible in viewport
- Check browser console for errors

### Animation is jittery?
- Use `transform` instead of `left`/`top`
- Ensure GPU acceleration with `will-change`
- Reduce animation duration

### Too many cascading animations?
- Increase `staggerDelay` value
- Reduce `duration` slightly
- Use `once={true}` to animate only once

### Animation feels slow?
- Reduce `duration` to 400-500ms
- Increase `staggerDelay` between items
- Use `ease-out` easing for snappier feel

---

## Best Practices

✅ **DO:**
- Keep animations under 1 second for entrances
- Use cascading animations for lists
- Combine fade with movement for elegance
- Test on mobile devices
- Use scroll-triggered animations sparingly

❌ **DON'T:**
- Animate everything simultaneously
- Use animations longer than 1 second
- Block interactions with animations
- Animate layout properties (use transforms instead)
- Forget about mobile performance

---

## Browser DevTools Inspection

In Chrome DevTools:
1. Open **Animations** tab
2. Trigger animations by scrolling or hovering
3. Slow down animations: click **⚙️** → Set playback rate to 0.1x
4. Step through frames to debug timing

---

## Extending Animations

### Add Custom Animation
```jsx
// In src/index.css
@keyframes slideInBottom {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in-bottom {
  animation: slideInBottom 0.6s ease-out;
}

// Use in component
<div className="animate-slide-in-bottom">Content</div>
```

### Add Custom Stagger
```jsx
// Create custom stagger animation pattern
<div className="animate-stagger">
  <Item /> {/* delay: 0.1s */}
  <Item /> {/* delay: 0.2s */}
  <Item /> {/* delay: 0.3s */}
</div>
```

---

## Mobile Considerations

- All animations work smoothly on mobile
- Touch animations are instant (no hover states)
- Reduced motion respects `prefers-reduced-motion`
- Animations use GPU for better performance

---

Need more animation examples? Check [src/pages/Landing.jsx](src/pages/Landing.jsx) for real-world usage! 🎨
