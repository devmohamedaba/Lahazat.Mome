# لوحة تحكم المقالات (Google Sheets + Vercel) — دليل التشغيل

## كيف يعمل النظام
```
المدير ──> /admin (React) ──> /api/admin/* (Vercel Function، كوكي HttpOnly) ──> Google Apps Script ──> Google Sheet
                                         │ عند النشر/التعديل/الحذف
                                         └──> Deploy Hook ──> إعادة بناء الموقع
البناء: scripts/fetch-articles.mjs يسحب المقالات المنشورة ──> public/articles.json
        scripts/prerender-articles.mjs يولّد dist/resources/<slug>/index.html + يحدّث sitemap.xml
الزائر: يقرأ /articles.json الثابت (لا يتصل بجوجل أبدًا)
```

## الإعداد (مرة واحدة)

### 1) Google Sheet
أنشئ ملفًا جديدًا في Google Sheets باسم `Lahazat CMS`، وانسخ رقمه من الرابط (بين `/d/` و`/edit`). لا تكتب أعمدة يدويًا.

### 2) Google Apps Script
1. من الملف: Extensions > Apps Script.
2. احذف الكود الموجود والصق محتوى `google-apps-script/Code.gs`.
3. Project Settings > Script Properties، أضف:
   - `SHEET_ID` = رقم الملف
   - `API_SECRET` = نص عشوائي طويل (40 حرفًا فأكثر)
4. شغّل الدالة `setupCMS` مرة واحدة ووافق على الصلاحيات (آمنة لإعادة التشغيل ولا تمسح بيانات).
5. Deploy > New deployment > Web app: Execute as **Me** / Who has access **Anyone**، ثم انسخ الرابط المنتهي بـ `/exec`.
6. عند أي تعديل لاحق على الكود: Deploy > Manage deployments > Edit > New version.

### 3) Vercel
1. Settings > Git > Deploy Hooks: أنشئ Hook للفرع الرئيسي وانسخ رابطه.
2. Settings > Environment Variables (علّم الكل Sensitive، ولا تضع VITE_ قبل أي اسم):

| الاسم | القيمة |
|---|---|
| `ADMIN_PASSWORD` | كلمة مرور طويلة (20 حرفًا فأكثر) |
| `SESSION_SECRET` | نص عشوائي 40+ حرفًا |
| `GAS_URL` | رابط الـ Web app المنتهي بـ /exec |
| `GAS_SECRET` | نفس قيمة API_SECRET |
| `DEPLOY_HOOK_URL` | رابط الـ Deploy Hook |

3. ارفع الكود إلى GitHub (يبدأ النشر تلقائيًا)، ثم ادخل على `https://موقعك/admin`.

### توليد نصوص عشوائية
`node -e "console.log(require('crypto').randomBytes(36).toString('base64url'))"`

## التجربة محليًا
- `npm run dev` يعرض الموقع فقط (بدون /api).
- للوحة التحكم كاملة: `npm i -g vercel` ثم `vercel dev` (مع ملف `.env.local` بنفس المتغيرات).
- لتجربة البناء بدون جوجل: `CMS_ARTICLES_FILE=./sample.json npm run build`.

## ملاحظات تشغيلية
- التغييرات تظهر بعد إعادة البناء (دقيقة إلى دقيقتين). كل حفظ لمقال منشور يبدأ عملية بناء (حد Vercel Hobby: 100 نشر يوميًا).
- المقال بتاريخ نشر مستقبلي لا يظهر إلا بعد أول بناء يلي ذلك التاريخ.
- إن فشل الاتصال بجوجل أثناء البناء على Vercel يفشل النشر عمدًا فيبقى الموقع القديم سليمًا بدل نشر موقع بلا مقالات.
- المقالات القديمة (ملفات i18n) تعمل كما هي ويُولَّد لها HTML ثابت وتدخل الـ sitemap. إن أنشأت مقالًا بنفس الـ slug فالمقال الجديد يحل محلها.
- النسخة الإنجليزية لا تُفهرس منفصلة لأن الموقع يستخدم رابطًا واحدًا للّغتين. للفهرسة بالإنجليزية أضف مسارات `/en/...` لاحقًا.
- الصور: ضع الصور في `public/images/resources/` (WebP أقل من 200KB) أو استخدم رابط https. لا رفع تلقائي إلى Drive حاليًا.
- رخصة Vercel Hobby للاستخدام غير التجاري. إن كان الموقع تجاريًا (حجوزات مدفوعة) فراجع شروط Vercel أو انقل الاستضافة إلى Cloudflare Pages.

## قائمة الأمان
- لا أسرار في كود React ولا في `VITE_*`. كل الأسرار في Vercel وScript Properties فقط.
- الجلسة في كوكي `HttpOnly; Secure; SameSite=Strict` مسارها `/api`، ومدتها 8 ساعات، ولا تُخزَّن في المتصفح.
- كل طلب تعديل يتحقق من الكوكي الموقّع + Origin + نوع المحتوى JSON.
- مقارنة كلمة المرور ثابتة الزمن، وتأخير 0.8 ثانية عند الخطأ، وحظر مؤقت بعد 5 محاولات فاشلة (أفضل جهد، لأن الذاكرة لا تُشارك بين النسخ). الحماية الحقيقية = كلمة مرور طويلة. يُنصح بإضافة Rate Limit على `/api/admin/login` من Vercel Firewall إن توفر في خطتك.
- تنقية HTML في الخادم (sanitize-html) وفي المتصفح (DOMPurify) ومرة ثالثة عند البناء.
- خلايا الشيت بصيغة نص عادي لمنع تنفيذ صيغ مثل `=IMPORTXML(...)`.
- بدّل ADMIN_PASSWORD وSESSION_SECRET فورًا إن شككت بتسريبهما (تغيير SESSION_SECRET يُنهي كل الجلسات).
