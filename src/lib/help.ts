export interface Faq {
  category: string;
  q: string;
  a: string;
}

export const helpCategories = ["Buying", "Selling", "Account", "Listings", "Payments", "Messaging", "Safety", "Verification"];

// Admin-manageable structure: move to DB/CMS when content management lands.
export const faqs: Faq[] = [
  { category: "Account", q: "How do I create an account?", a: "Click Sign Up, enter your name, email and a password, then confirm your email address. You can also sign in with a phone number." },
  { category: "Selling", q: "How do I post an ad?", a: "Go to Post an Ad, choose a category, fill in the details, add clear photos and publish. Ads go live after a quick review." },
  { category: "Listings", q: "How do I edit my listing?", a: "Open Dashboard → My Ads, find the listing and choose Edit. You can update the price, description, photos and contact details." },
  { category: "Listings", q: "How do I delete my listing?", a: "Open Dashboard → My Ads, find the listing and choose Delete. Deleted ads cannot be restored." },
  { category: "Buying", q: "How do I contact a seller?", a: "Open any listing and tap Message Seller, or use the call / WhatsApp buttons if the seller has enabled them." },
  { category: "Buying", q: "How do I save an ad?", a: "Tap the heart icon on any listing. Saved ads appear under Favorites and in your dashboard." },
  { category: "Listings", q: "Why was my ad rejected?", a: "Check your notifications for the reason. Common causes are unclear photos, prohibited items, missing prices or incomplete details." },
  { category: "Selling", q: "How do I promote my listing?", a: "Open Promotions in your dashboard and choose Featured, Top, Urgent or Homepage placement to reach more buyers." },
  { category: "Selling", q: "How do I mark an item as sold?", a: "Open Dashboard → My Ads, find the listing and choose Mark as Sold. This keeps your profile tidy and builds trust." },
  { category: "Safety", q: "How do I report an ad?", a: "Open the listing and tap Report, or use the Report a Problem page. Tell us what is wrong and our moderators will review it." },
  { category: "Account", q: "How do I change my password?", a: "Go to Dashboard → Settings → Security and choose Change Password. Use a strong, unique password." },
  { category: "Account", q: "How do I contact support?", a: "Visit the Contact page or email support@sokohub.co.ug. We typically reply within 24 hours." },
  { category: "Payments", q: "How do paid promotions work?", a: "Choose a promotion package, pay via Mobile Money, and your ad is boosted for the selected period." },
  { category: "Verification", q: "How do I verify my account?", a: "In Dashboard → Profile you can verify your phone number, identity or business details to earn a trust badge." },
  { category: "Messaging", q: "Where do I find my messages?", a: "Tap the Messages icon in the header or open Dashboard → Messages to see all conversations with buyers and sellers." },
];
