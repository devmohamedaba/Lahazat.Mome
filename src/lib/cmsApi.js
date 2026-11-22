// src/lib/cmsApi.js
// Admin API client. The session lives in an HttpOnly cookie set by the server,
// so no token or password is ever stored in JavaScript, localStorage or sessionStorage.

async function request(path, {method = 'GET', body} = {}) {
  let response

  try {
    response = await fetch(`/api/admin/${path}`, {
      method,
      credentials: 'same-origin',
      headers: body ? {'Content-Type': 'application/json'} : undefined,
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch {
    const error = new Error('تعذر الاتصال بالخادم. تأكد من اتصالك بالإنترنت.')
    error.status = 0
    throw error
  }

  let data = null
  try {
    data = await response.json()
  } catch {
    /* non-JSON response (for example the dev server without the API) */
  }

  if (!response.ok || !data || data.success === false) {
    const error = new Error(
      (data && data.error) ||
        (response.status === 404
          ? 'واجهة الإدارة غير متاحة هنا. شغّل المشروع بالأمر: vercel dev'
          : 'حدث خطأ غير متوقع.'),
    )
    error.status = response.status
    error.details = data && data.errors
    throw error
  }

  return data
}

export const cmsApi = {
  login: (password) => request('login', {method: 'POST', body: {password}}),
  logout: () => request('logout', {method: 'POST', body: {}}),
  session: () => request('session'),
  listArticles: () => request('articles'),
  getArticle: (id) => request(`articles?id=${encodeURIComponent(id)}`),
  saveArticle: (article) => request('articles', {method: 'POST', body: {article}}),
  deleteArticle: (id) => request('articles', {method: 'DELETE', body: {id}}),
}
