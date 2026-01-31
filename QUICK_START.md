# 🚀 SponsiWise - Quick Start Guide

## Installation & Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

## 📍 Key Pages

### Public Access
- `/` - Landing page
- `/marketplace` - Browse events
- `/event/:id` - Event details
- `/pricing` - View pricing plans

### Authentication
- `/login` - Login
- `/auth/roles` - Sign up (select role)
- `/auth/sponsor` - Sign up as sponsor
- `/auth/organizer` - Sign up as organizer
- `/auth/admin` - Sign up as admin

### All Users
- `/dashboard` - Main dashboard
- `/deals` - View your proposals
- `/deal/:id` - Proposal details & negotiation
- `/billing` - View transactions
- `/messages` - Message hub

### Sponsors
- `/analytics/sponsor` - Your ROI analytics
- `/checkout` - Sponsorship payment

### Organizers  
- `/analytics/organizer` - Event revenue analytics

### Admins
- `/admin/console` - Approve users/events, manage disputes
- `/admin/monetization` - Configure commission & plans
- `/admin/analytics` - Platform-wide metrics

---

## 🎯 Features Overview

| Feature | Location | Status |
|---------|----------|--------|
| **Dealflow** | Deals, Deal Details | ✅ Complete |
| **Billing** | Billing, Checkout | ✅ Complete |
| **Analytics** | Analytics pages | ✅ Complete |
| **Messaging** | Messages | ✅ Complete |
| **Admin Controls** | Admin Console | ✅ Complete |
| **Monetization** | Admin Monetization | ✅ Complete |

---

## 🔐 Test Accounts

**Sponsor Account:**
- Role: Sponsor
- Access: Deals, Billing, Sponsor Analytics

**Organizer Account:**
- Role: Organizer
- Access: Deals, Billing, Organizer Analytics

**Admin Account:**
- Role: Admin
- Access: All features + Admin Console

---

## 📊 What You Can Do

### As a Sponsor
1. ✅ Browse events on marketplace
2. ✅ Send sponsorship proposals
3. ✅ View all your deals
4. ✅ Negotiate deal terms
5. ✅ Process payments
6. ✅ View spending analytics
7. ✅ Calculate ROI on sponsorships
8. ✅ Message event organizers

### As an Organizer
1. ✅ Create events
2. ✅ View sponsorship proposals
3. ✅ Negotiate with sponsors
4. ✅ Accept deals
5. ✅ View payouts
6. ✅ Track revenue trends
7. ✅ Analyze deal conversion
8. ✅ Message sponsors

### As an Admin
1. ✅ Approve pending users
2. ✅ Approve event listings
3. ✅ Manage disputes
4. ✅ Configure commission rates
5. ✅ Manage subscription plans
6. ✅ View platform analytics
7. ✅ Monitor revenue
8. ✅ Track platform growth

---

## 💾 Data Structure

All data is stored in mock format for demonstration. Key objects:

```javascript
// Proposals (Deals)
{
  id, eventId, sponsorId, amount, status,
  history: [{status, timestamp, action}],
  negotiations: [{message, proposedAmount}]
}

// Invoices
{
  id, number, sponsorId, organizerId,
  subtotal, commission, total, status
}

// Transactions
{
  id, type, userId, amount, commission, status
}

// Analytics
{
  sponsorDashboard: { spend, active deals, CPM },
  organizerDashboard: { revenue, conversion rate },
  adminDashboard: { platform revenue, growth }
}
```

---

## 🎨 Design

**Color Scheme:**
- Primary Blue: #2563eb
- Success Green: #10b981
- Warning Orange: #f59e0b
- Error Red: #ef4444

**Styling:** Tailwind CSS 3.4+

**Charts:** Recharts library for visualizations

---

## 📝 Commission Model

- **Rate:** 15% (configurable)
- **Example:** $100K sponsorship → $15K platform fee → $85K to organizer
- **Config:** Admin Monetization page

---

## 🔄 Proposal Status Flow

```
Pending → Reviewing → Negotiating → Accepted/Rejected → Completed
         (organizer)  (both parties) (organizer)       (after payment)
```

---

## 📈 Mock Data Included

✅ 50+ sample events
✅ 20+ sample proposals  
✅ 15+ sample transactions
✅ 10+ sample invoices
✅ Subscription data
✅ Analytics data
✅ Pending approvals
✅ Disputes data

---

## 🐛 Troubleshooting

### Pages not showing?
- Check `src/pages/index.js` for exports
- Verify route in `src/App.jsx`
- Check header navigation

### Context errors?
- Ensure provider is wrapped in `src/App.jsx`
- Verify context export from context file
- Check useContext hook call

### Styling issues?
- Verify Tailwind CSS import in `src/index.css`
- Check class names syntax
- Run `npm run build` to verify

### Mock data not loading?
- Check `src/data/mockData.js` for exports
- Verify import path in context
- Check useMarketplace/useBilling hooks

---

## 📚 Documentation

- **IMPLEMENTATION_COMPLETE.md** - Full feature list
- **PROJECT_SUMMARY.md** - Complete overview
- **DEPLOYMENT_CHECKLIST.md** - Pre-deployment verification
- **DEVELOPER_GUIDE.md** - Architecture & patterns

---

## 🎯 Next Steps

### Short-term
1. Test all user flows
2. Verify mock data completeness
3. Check mobile responsiveness
4. Gather feedback

### Medium-term
1. Connect backend API
2. Implement real authentication
3. Add payment gateway
4. Setup database

### Long-term
1. Add agency dashboard
2. Implement AI recommendations
3. Add mobile app
4. Scale to production

---

## 📞 Support

- Review code comments in relevant component
- Check helper functions in `src/utils/helpers.js`
- Review context methods in `src/context/`
- Consult documentation files

---

**Status:** 🟢 Ready to Use
**Version:** 1.0.0
**Last Updated:** January 30, 2025
