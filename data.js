const siteData = {
    currencies: [
        { code: 'EGP', symbol: 'ج.م', rate: 1, name: 'Egypt' },
        { code: 'SAR', symbol: 'ر.س', rate: 0.077, name: 'Saudi Arabia' },
        { code: 'QAR', symbol: 'ر.ق', rate: 0.075, name: 'Qatar' },
        { code: 'KWD', symbol: 'د.ك', rate: 0.0063, name: 'Kuwait' },
        { code: 'AED', symbol: 'د.إ', rate: 0.076, name: 'UAE' },
        { code: 'BHD', symbol: 'د.ب', rate: 0.0078, name: 'Bahrain' },
        { code: 'OMR', symbol: 'ر.ع', rate: 0.0079, name: 'Oman' },
        { code: 'USD', symbol: '$', rate: 0.021, name: 'USA' }
    ],
    packages: [
        {
            id: 'base',
            name_ar: 'الأساس (QR Menu)',
            name_en: 'Basic (QR Menu)',
            setup_egp: 1500,
            host_egp: 400,
            support_egp: 100,
            popular: false,
            features: [
                { ar: 'منيو رقمي بـ QR', en: 'Digital QR Menu', included: true },
                { ar: 'صور + أسعار + تفاصيل', en: 'Photos + Prices + Details', included: true },
                { ar: 'زر اتصال + لوكيشن', en: 'Call + Location Button', included: true },
                { ar: 'لوحة تحكم (Admin)', en: 'Admin Dashboard', included: false },
                { ar: 'تعديل أسعار فوري', en: 'Instant Price Updates', included: false },
                { ar: 'إدارة أصناف وتصنيفات', en: 'Category Management', included: false },
                { ar: 'قسم العروض (Offers)', en: 'Offers Section', included: false },
                { ar: 'سلة مشتريات (Cart)', en: 'Shopping Cart', included: false },
                { ar: 'إرسال طلب واتساب تلقائي', en: 'Auto WhatsApp Ordering', included: false },
                { ar: 'تقارير مبيعات', en: 'Sales Reports', included: false }
            ]
        },
        {
            id: 'pro',
            name_ar: 'محترفين (Dashboard)',
            name_en: 'Professional (Dashboard)',
            setup_egp: 3500,
            host_egp: 600,
            support_egp: 200,
            popular: true,
            features: [
                { ar: 'منيو رقمي بـ QR', en: 'Digital QR Menu', included: true },
                { ar: 'صور + أسعار + تفاصيل', en: 'Photos + Prices + Details', included: true },
                { ar: 'زر اتصال + لوكيشن', en: 'Call + Location Button', included: true },
                { ar: 'لوحة تحكم (Admin)', en: 'Admin Dashboard', included: true },
                { ar: 'تعديل أسعار فوري', en: 'Instant Price Updates', included: true },
                { ar: 'إدارة أصناف وتصنيفات', en: 'Category Management', included: true },
                { ar: 'قسم العروض (Offers)', en: 'Offers Section', included: true },
                { ar: 'سلة مشتريات (Cart)', en: 'Shopping Cart', included: false },
                { ar: 'إرسال طلب واتساب تلقائي', en: 'Auto WhatsApp Ordering', included: false },
                { ar: 'تقارير مبيعات', en: 'Sales Reports', included: false }
            ]
        },
        {
            id: 'max',
            name_ar: 'برو (Full Ordering)',
            name_en: 'Enterprise (Full Ordering)',
            setup_egp: 6500,
            host_egp: 800,
            support_egp: 300,
            popular: false,
            features: [
                { ar: 'منيو رقمي بـ QR', en: 'Digital QR Menu', included: true },
                { ar: 'صور + أسعار + تفاصيل', en: 'Photos + Prices + Details', included: true },
                { ar: 'زر اتصال + لوكيشن', en: 'Call + Location Button', included: true },
                { ar: 'لوحة تحكم (Admin)', en: 'Admin Dashboard', included: true },
                { ar: 'تعديل أسعار فوري', en: 'Instant Price Updates', included: true },
                { ar: 'إدارة أصناف وتصنيفات', en: 'Category Management', included: true },
                { ar: 'قسم العروض (Offers)', en: 'Offers Section', included: true },
                { ar: 'سلة مشتريات (Cart)', en: 'Shopping Cart', included: true },
                { ar: 'إرسال طلب واتساب تلقائي', en: 'Auto WhatsApp Ordering', included: true },
                { ar: 'تقارير مبيعات', en: 'Sales Reports', included: true }
            ]
        }
    ],
    translations: {
        ar: {
            heroTitle: 'حول مطعمك إلى تجربة رقمية احترافية',
            heroSubtitle: 'نقدم أفضل الأنظمة التقنية لإدارة المنيو، الطلبات، والتقارير بأحدث الوسائل العصرية.',
            viewCards: 'الباقات',
            viewTable: 'جدول المقارنة',
            viewSummary: 'ملخص الحساب',
            salesReports: 'قسم المبيعات والأسعار',
            setupFee: 'برمجة لمرة واحدة',
            annualFee: 'دومين + استضافة سنوي',
            totalFirstYear: 'السعر النهائي (أول دفعة)',
            renewalFee: 'تجديد سنوي (من السنة 2)',
            optionalSupport: 'دعم فني شهري (اختياري)',
            contactUs: 'تواصل معنا الآن',
            customTitle: 'طلب خاص لمطعمك؟',
            customDesc: 'نصمم لك نظاماً مخصصاً بالكامل حسب احتياجاتك الخاصة ومزاجك.',
            getInTouch: 'اطلب هذا النظام',
            feature: 'الميزة',
            viewDetails: 'شاهد التفاصيل',
            selectCurrency: 'اختر العملة المناسبة'
        },
        en: {
            heroTitle: 'Transform Your Restaurant into a Digital Masterpiece',
            heroSubtitle: 'We provide high-end technical systems for menu management, ordering, and reporting using state-of-the-art tools.',
            viewCards: 'Packages',
            viewTable: 'Comparison Matrix',
            viewSummary: 'Pricing Summary',
            salesReports: 'Sales & Pricing Section',
            setupFee: 'One-time Setup',
            annualFee: 'Domain + Hosting (Annual)',
            totalFirstYear: 'Total Final Price (1st Yr)',
            renewalFee: 'Annual Renewal (Year 2+)',
            optionalSupport: 'Monthly Support (Optional)',
            contactUs: 'Contact Us Now',
            customTitle: 'Want a Custom Design?',
            customDesc: 'We build fully bespoke systems tailored exactly to your unique needs and vision.',
            getInTouch: 'Order This Package',
            feature: 'Feature',
            viewDetails: 'Show Details',
            selectCurrency: 'Select Your Currency'
        }
    }
};
