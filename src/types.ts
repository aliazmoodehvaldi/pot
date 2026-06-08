export interface PasswordEntry {
  id: string;
  title: string;
  username: string;
  password?: string;
  note?: string;
  category?: string;
  categoryColor?: string;
  createdAt: number;
}

export type Language = 'en' | 'fa';
export type Theme = 'light' | 'dark';

export interface Translations {
  appName: string;
  heroTitle: string;
  heroSubtitle: string;
  getStarted: string;
  totalPasswords: string;
  searchResults: string;
  searchPlaceholder: string;
  addPassword: string;
  editPassword: string;
  deletePassword: string;
  save: string;
  cancel: string;
  title: string;
  username: string;
  password: string;
  note: string;
  category: string;
  required: string;
  import: string;
  export: string;
  noPasswords: string;
  darkMode: string;
  lightMode: string;
  language: string;
  confirmDelete: string;
  heroBadge: string;
  itemsFound: string;
  vault: string;
  sortByNewest: string;
  sortByAlphabet: string;
  sortByCategory: string;
  custom: string;
  featSecured: string;
  featSecuredDesc: string;
  featGlobal: string;
  featGlobalDesc: string;
  featZero: string;
  featZeroDesc: string;
  faq: string;
  faqTitle: string;
  faqSubtitle: string;
  faqs: { q: string; a: string }[];
  categories: {
    all: string;
    work: string;
    personal: string;
    social: string;
    finance: string;
    other: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'Pot',
    heroTitle: 'Organize Your Digital Life',
    heroSubtitle:
      'A professional, lightweight manager for your personal notes and items.',
    getStarted: 'Get Started',
    totalPasswords: 'Total Items',
    searchResults: 'Search Results',
    searchPlaceholder: 'Search by title...',
    addPassword: 'Add Entry',
    editPassword: 'Edit Entry',
    deletePassword: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    title: 'Title',
    username: 'Username',
    password: 'Value / Secret',
    note: 'Note / Custom Field',
    category: 'Category',
    required: 'Required',
    import: 'Import Data',
    export: 'Export Data',
    noPasswords: 'No items found.',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    language: 'Language',
    confirmDelete: 'Are you sure you want to delete this item?',
    heroBadge: 'Fast & Lightweight Organizer',
    itemsFound: 'Items Found',
    vault: 'Vault',
    sortByNewest: 'Newest',
    sortByAlphabet: 'A-Z',
    sortByCategory: 'Category',
    custom: 'Custom...',
    featSecured: 'Secured',
    featSecuredDesc:
      'Your data is strictly yours and never leaves your device.',
    featGlobal: 'Global Access',
    featGlobalDesc: 'Import and export your data anytime, anywhere.',
    featZero: 'Zero Knowledge',
    featZeroDesc: 'We have no access to your information. Complete privacy.',
    faq: 'FAQ',
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Everything you need to know about Pot.',
    faqs: [
      {
        q: 'Is it really free?',
        a: 'Yes, Pot is a completely free personal project designed for individuals to organize their digital life.',
      },
      {
        q: 'Where is my data stored?',
        a: 'Everything stays on your device. No data ever leaves your browser.',
      },
      {
        q: 'What happens if I clear my browser cache?',
        a: 'Since data is stored locally in your browser, clearing site data or "cookies and other site data" might remove your saved entries. Always keep an export (backup) of your data.',
      },
      {
        q: 'Can I use it offline?',
        a: 'Yes! Pot works entirely in your browser without needing an internet connection.',
      },
    ],
    categories: {
      all: 'All',
      work: 'Work',
      personal: 'Personal',
      social: 'Social',
      finance: 'Finance',
      other: 'Other',
    },
  },
  fa: {
    appName: 'پات',
    heroTitle: 'سازماندهی دنیای دیجیتال شما',
    heroSubtitle:
      'ابزاری حرفه‌ای و سبک برای مدیریت یادداشت‌ها و موارد شخصی شما.',
    getStarted: 'شروع کنید',
    totalPasswords: 'کل موارد',
    searchResults: 'نتایج جستجو',
    searchPlaceholder: 'جستجو بر اساس عنوان...',
    addPassword: 'افزودن مورد',
    editPassword: 'ویرایش مورد',
    deletePassword: 'حذف',
    save: 'ذخیره',
    cancel: 'لغو',
    title: 'عنوان',
    username: 'نام کاربری / شناسه',
    password: 'مقدار / رمز',
    note: 'یادداشت / فیلد سفارشی',
    category: 'دسته‌بندی',
    required: 'اجباری',
    import: 'وارد کردن داده‌ها',
    export: 'خروجی گرفتن',
    noPasswords: 'موردی یافت نشد.',
    darkMode: 'حالت شب',
    lightMode: 'حالت روز',
    language: 'زبان',
    confirmDelete: 'آیا از حذف این مورد مطمئن هستید؟',
    heroBadge: 'سازمان‌دهنده سریع و سبک',
    itemsFound: 'مورد پیدا شد',
    vault: 'بایگانی',
    sortByNewest: 'جدیدترین',
    sortByAlphabet: 'الفبا (A-Z)',
    sortByCategory: 'دسته‌بندی',
    custom: 'سفارشی...',
    featSecured: 'امنیت بالا',
    featSecuredDesc:
      'داده‌های شما فقط در دستگاه شماست و هرگز به سرور ارسال نمی‌شود.',
    featGlobal: 'دسترسی همگانی',
    featGlobalDesc: 'خروجی و ورودی داده‌ها در هر زمان و هر مکان ممکن است.',
    featZero: 'حریم خصوصی کامل',
    featZeroDesc: 'ما هیچ دسترسی به اطلاعات شما نداریم. محرمانگی صد در صدی.',
    faq: 'سوالات متداول',
    faqTitle: 'سوالات متداول',
    faqSubtitle: 'هر آنچه باید درباره پات بدانید.',
    faqs: [
      {
        q: 'آیا واقعاً رایگان است؟',
        a: 'بله، پات یک پروژه کاملاً رایگان است که برای کمک به افراد در سازماندهی زندگی دیجیتال طراحی شده است.',
      },
      {
        q: 'داده‌های من کجا ذخیره می‌شوند؟',
        a: 'همه چیز در دستگاه شما باقی می‌ماند و هیچ داده‌ای از مرورگر شما خارج نمی‌شود.',
      },
      {
        q: 'اگر کش مرورگر را پاک کنم چه می‌شود؟',
        a: 'از آنجا که داده‌ها به صورت محلی ذخیره می‌شوند، پاک کردن داده‌های سایت ممکن است موارد شما را حذف کند. همیشه یک خروجی (پشتیبان) از داده‌های خود داشته باشید.',
      },
      {
        q: 'آیا آفلاین کار می‌کند؟',
        a: 'بله، پات به صورت کامل در مرورگر شما و بدون نیاز به اینترنت کار می‌کند.',
      },
    ],
    categories: {
      all: 'همه',
      work: 'کاری',
      personal: 'شخصی',
      social: 'شبکه‌های اجتماعی',
      finance: 'مالی',
      other: 'سایر',
    },
  },
};
