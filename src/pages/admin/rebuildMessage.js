// src/pages/admin/rebuildMessage.js
export function rebuildMessage(rebuild, isPublished) {
  if (rebuild === 'triggered') return 'تم الحفظ، وبدأ تحديث الموقع. ستظهر التغييرات خلال دقيقة إلى دقيقتين.'
  if (rebuild === 'failed') return 'تم الحفظ، لكن تعذر بدء تحديث الموقع تلقائيًا. أعد النشر (Redeploy) من لوحة Vercel.'
  if (rebuild === 'skipped' && isPublished) return 'تم الحفظ. لم يُفعَّل التحديث التلقائي بعد: أضف DEPLOY_HOOK_URL أو أعد النشر يدويًا من Vercel.'
  return 'تم الحفظ.'
}
