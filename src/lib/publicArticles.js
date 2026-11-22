// src/lib/publicArticles.js
// Public articles are a static file (/articles.json) generated at build time from Google Sheets.
// Visitors never call Google directly, so there are no quotas, no latency spikes and no exposed keys.

let cache = null

export function loadCmsArticles() {
  if (!cache) {
    cache = fetch('/articles.json', {headers: {Accept: 'application/json'}})
      .then((response) => (response.ok ? response.json() : {articles: []}))
      .then((data) => (Array.isArray(data.articles) ? data.articles : []))
      .catch(() => []) // dev server / missing file -> just no CMS articles
  }
  return cache
}
