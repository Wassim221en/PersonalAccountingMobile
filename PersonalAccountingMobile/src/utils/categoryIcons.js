// Map a category name (Arabic) to a Material icon name from @expo/vector-icons MaterialIcons.

const RULES = [
  { match: ['طعام', 'مطعم', 'أكل'], icon: 'restaurant' },
  { match: ['لباس', 'ملابس'], icon: 'checkroom' },
  { match: ['مواصلات', 'سيارة', 'وقود', 'بنزين'], icon: 'directions-car' },
  { match: ['كهرباء', 'فاتورة', 'فواتير'], icon: 'bolt' },
  { match: ['ماء', 'مياه'], icon: 'water-drop' },
  { match: ['إنترنت', 'انترنت'], icon: 'wifi' },
  { match: ['هاتف', 'موبايل', 'جوال'], icon: 'smartphone' },
  { match: ['صحة', 'دواء', 'طبيب'], icon: 'medical-services' },
  { match: ['تعليم', 'مدرسة', 'جامعة'], icon: 'school' },
  { match: ['ترفيه', 'سفر', 'رحلة'], icon: 'flight' },
  { match: ['بقالة', 'سوبر'], icon: 'shopping-cart' },
  { match: ['إيجار', 'منزل', 'بيت'], icon: 'home' },
  { match: ['راتب'], icon: 'payments' },
  { match: ['عمل حر', 'فريلانس'], icon: 'laptop-mac' },
  { match: ['هدية', 'هدايا'], icon: 'card-giftcard' },
  { match: ['استثمار'], icon: 'trending-up' },
];

export function iconForCategory(name = '', type = 'Expense') {
  const lower = String(name).toLowerCase();
  for (const rule of RULES) {
    if (rule.match.some((token) => lower.includes(token))) return rule.icon;
  }
  return type === 'Income' ? 'account-balance-wallet' : 'receipt-long';
}
