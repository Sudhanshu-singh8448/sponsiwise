# SponsiWise - Testing Guide & Documentation

## ✅ Testing Setup Complete

A comprehensive testing framework has been set up with Vitest, React Testing Library, and Jest DOM matchers.

---

## 🚀 Running Tests

### Run all tests
```bash
npm test
```

### Run tests with UI
```bash
npm run test:ui
```

### Run tests with coverage
```bash
npm run test:coverage
```

### Run specific test file
```bash
npm test smoke.test.js
```

### Run tests in watch mode
```bash
npm test -- --watch
```

---

## 📁 Test Files Created

### `src/test/setup.js`
**Purpose:** Test environment setup and global mocks
**Contains:**
- Testing library DOM cleanup
- window.matchMedia mock
- React Hot Toast mock
- Global test utilities

### `src/test/smoke.test.js`
**Purpose:** Smoke tests for critical pages and functions
**Covers:**
- Page rendering tests (Landing, Marketplace, Dashboard)
- Context accessibility tests (Auth, Marketplace, Billing)
- Helper function tests (formatCurrency, calculateCPM, etc.)
- Data structure validation
- Provider tree integration tests

**Test Suites:**
1. **Smoke Tests - Pages Render** - Verifies all major pages render without crashing
2. **Context Tests** - Verifies contexts are properly accessible
3. **Helper Functions Tests** - Unit tests for utility functions
4. **Data Structure Tests** - Validates mock data structure
5. **Integration Tests** - Tests provider tree functionality

### `src/test/components.test.js`
**Purpose:** Component-specific tests
**Covers:**
- Header component rendering
- Navigation link display
- Responsive behavior

### `vitest.config.js`
**Purpose:** Vitest configuration
**Includes:**
- jsdom environment for DOM testing
- React plugin setup
- Global test configuration
- Path aliases

---

## 📊 Test Coverage

### Pages Tested
- ✅ Landing
- ✅ Marketplace
- ✅ Dashboard
- ✅ Deals (structure validation)
- ✅ Billing (structure validation)

### Contexts Tested
- ✅ AuthContext
- ✅ MarketplaceContext
- ✅ BillingContext

### Helper Functions Tested
- ✅ formatCurrency
- ✅ calculateCPM
- ✅ calculateROI
- ✅ getStatusColor
- ✅ getStatusLabel
- ✅ calculateCommission
- ✅ generateInvoiceNumber
- ✅ formatDateTime
- ✅ scoreEventForSponsor
- ✅ getRecommendedEvents

### Components Tested
- ✅ Header
- ✅ Navigation links
- ✅ Responsive behavior

---

## 🧪 Available Test Examples

### Testing a Page
```javascript
describe('Landing Page', () => {
  it('should render without crashing', () => {
    render(
      <MockedApp>
        <Landing />
      </MockedApp>
    );
    expect(screen.getByText(/SponsiWise/i)).toBeInTheDocument();
  });
});
```

### Testing a Helper Function
```javascript
it('formatCurrency should format numbers correctly', () => {
  const { formatCurrency } = require('../utils/helpers');
  expect(formatCurrency(1000)).toBe('$1,000.00');
});
```

### Testing Context Availability
```javascript
it('should provide auth context values', async () => {
  const TestComponent = () => {
    const { isAuthenticated } = require('../context/AuthContext').useAuth();
    return <span>{isAuthenticated ? 'Auth' : 'No Auth'}</span>;
  };
  render(<MockedApp><TestComponent /></MockedApp>);
  expect(screen.getByText(/Auth|No Auth/)).toBeInTheDocument();
});
```

---

## 🛠️ Adding New Tests

### Test File Structure
```javascript
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Feature Name', () => {
  beforeEach(() => {
    // Setup before each test
  });

  it('should do something', () => {
    // Arrange
    // Act
    // Assert
  });
});
```

### Common Testing Library Queries
```javascript
// Get element
screen.getByText('Text')
screen.getByRole('button')
screen.getByPlaceholderText('placeholder')

// Query array
screen.getAllByRole('link')

// Expect matchers
expect(element).toBeInTheDocument()
expect(element).toHaveTextContent('text')
expect(element).toHaveClass('class-name')
expect(array).toHaveLength(5)
```

### Testing Async Operations
```javascript
it('should handle async operations', async () => {
  render(<Component />);
  const element = await screen.findByText(/loaded/i);
  expect(element).toBeInTheDocument();
});
```

---

## 🔍 Debugging Tests

### Use screen.debug()
```javascript
it('debug test', () => {
  const { container } = render(<Component />);
  screen.debug(container); // Prints DOM tree
});
```

### Use testing-library queries wisely
Prefer queries in this order:
1. `getByRole` - Most accessible
2. `getByLabelText` - For form labels
3. `getByPlaceholderText` - For inputs
4. `getByText` - For text content
5. `getByTestId` - Last resort

### Run single test
```bash
npm test -- -t "specific test name"
```

### Verbose output
```bash
npm test -- --reporter=verbose
```

---

## ✅ Pre-Commit Checklist

Before committing changes:
1. Run `npm test` - All tests pass
2. Run `npm run lint` - No lint errors
3. Run `npm run build` - Build succeeds
4. Verify no console errors in browser

---

## 📋 Test Plan for Full Coverage

### Phase 1: Smoke Tests ✅ (Complete)
- [x] Page rendering
- [x] Context accessibility
- [x] Helper functions
- [x] Data structures

### Phase 2: Unit Tests (Recommended)
- [ ] Each helper function with edge cases
- [ ] Each context method independently
- [ ] Input validation in forms
- [ ] Error handling scenarios

### Phase 3: Integration Tests (Recommended)
- [ ] User sign-up flow
- [ ] Deal creation and negotiation
- [ ] Payment flow
- [ ] Admin approvals

### Phase 4: E2E Tests (Recommended)
- [ ] Full user journeys
- [ ] Cross-page navigation
- [ ] Data persistence
- [ ] Role-based access control

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot find module" errors
**Solution:** Check import paths match file locations

### Issue: "window.matchMedia is not a function"
**Solution:** Mock is already in setup.js - ensure it's loaded

### Issue: "React Hot Toast is not defined"
**Solution:** Mock is already configured in setup.js

### Issue: Tests timeout
**Solution:** Increase timeout with `{ timeout: 10000 }`

### Issue: Component not rendering
**Solution:** Ensure all required providers are wrapped

---

## 📈 Next Steps for Comprehensive Testing

1. **Add component snapshot tests** for UI regression detection
2. **Add integration tests** for critical user flows
3. **Add E2E tests** with Cypress for real browser testing
4. **Set up CI/CD** to run tests on every commit
5. **Generate coverage reports** to track test coverage
6. **Add visual regression tests** for design consistency

---

## 🚨 Failed Test Troubleshooting

### Test Setup Issues
```bash
# Clear vitest cache
npm test -- --clearCache

# Run single file debug
npm test smoke.test.js -- --reporter=verbose
```

### Mocking Issues
- Ensure mocks are defined in setup.js
- Mock modules before imports
- Use vi.mock() for module-level mocks

### Async Issues
- Use `waitFor()` for async operations
- Use `screen.findBy*()` for elements that appear later
- Add proper awaits for async functions

---

## 📚 Testing Best Practices

1. **Arrange-Act-Assert Pattern**
   ```javascript
   it('test', () => {
     // Arrange - setup test data
     // Act - perform action
     // Assert - verify result
   });
   ```

2. **One assertion per test** - Keep tests focused

3. **Use descriptive test names** - Explain what's being tested

4. **Mock external dependencies** - Keep tests isolated

5. **Test behavior, not implementation** - What user sees matters

6. **Keep tests fast** - Mock heavy operations

7. **Test error cases** - Not just happy paths

---

## 🔗 Useful Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

## 🎯 Quick Reference

### Run tests
```bash
npm test
```

### Interactive UI
```bash
npm run test:ui
```

### Coverage report
```bash
npm run test:coverage
```

### Watch mode
```bash
npm test -- --watch
```

### Debug mode
```bash
npm test -- --inspect-brk
```

---

**Last Updated:** January 30, 2026
**Test Status:** ✅ Ready for use
**Framework:** Vitest + React Testing Library
