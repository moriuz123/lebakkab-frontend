import { computed, unref } from 'vue'
import { useHead } from '@vueuse/head'

const DEFAULT_SITE_NAME = 'Portal Resmi Kabupaten Lebak'
const DEFAULT_BASE_URL = 'https://lebakkab.go.id'
const DEFAULT_IMAGE = `${DEFAULT_BASE_URL}/images/logo.png`
const DEFAULT_DESCRIPTION =
  'Pusat informasi resmi, transparansi publik, berita daerah, pengumuman, regulasi hukum, dan layanan digital terpadu Pemerintah Daerah Kabupaten Lebak.'

/**
 * Normalizes an image or page URL to an absolute URL
 */
function toAbsoluteUrl(url) {
  if (!url) return DEFAULT_IMAGE
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  const cleanPath = url.startsWith('/') ? url : `/${url}`
  return `${DEFAULT_BASE_URL}${cleanPath}`
}

/**
 * Strips HTML tags and truncates text for safe meta description
 */
export function sanitizeMetaDescription(text, maxLen = 160) {
  if (!text) return DEFAULT_DESCRIPTION
  const stripped = String(text)
    .replace(/<[^>]*>?/gm, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (stripped.length <= maxLen) return stripped
  return stripped.substring(0, maxLen).trim() + '...'
}

/**
 * Enterprise SEO Composable for Vue 3 + VueUse Head
 *
 * @param {Object} options
 * @param {string|Ref<string>} options.title - Page title
 * @param {string|Ref<string>} options.description - Meta description (max 160 chars)
 * @param {string|Ref<string>} options.keywords - Meta keywords
 * @param {string|Ref<string>} options.image - OG/Twitter image URL
 * @param {string|Ref<string>} options.url - Canonical URL path or full URL
 * @param {string} [options.type='website'] - OpenGraph type (website, article, etc.)
 * @param {string} [options.publishedTime] - ISO string for articles
 * @param {string} [options.author] - Author/OPD name
 * @param {Object|Array} [options.schema] - Custom Schema.org JSON-LD object(s)
 * @param {boolean} [options.rawTitle=false] - Do not append site suffix
 */
export function useSeo(options = {}) {
  const finalTitle = computed(() => {
    const raw = unref(options.title)
    if (!raw) return DEFAULT_SITE_NAME
    if (options.rawTitle || raw.includes(DEFAULT_SITE_NAME)) return raw
    return `${raw} | ${DEFAULT_SITE_NAME}`
  })

  const finalDescription = computed(() => {
    const raw = unref(options.description)
    return sanitizeMetaDescription(raw)
  })

  const finalKeywords = computed(() => {
    const raw = unref(options.keywords)
    if (Array.isArray(raw)) return raw.join(', ')
    return (
      raw ||
      'Kabupaten Lebak, Portal Lebak, Pemkab Lebak, Berita Lebak, Rangkasbitung, Layanan Lebak, Diskominfo'
    )
  })

  const finalImage = computed(() => {
    const raw = unref(options.image)
    return toAbsoluteUrl(raw)
  })

  const finalUrl = computed(() => {
    const raw = unref(options.url)
    if (!raw) {
      if (typeof window !== 'undefined') return window.location.href
      return DEFAULT_BASE_URL
    }
    return toAbsoluteUrl(raw)
  })

  const headMeta = computed(() => {
    const type = unref(options.type) || 'website'
    const metaList = [
      { name: 'description', content: finalDescription.value },
      { name: 'keywords', content: finalKeywords.value },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      
      // Open Graph
      { property: 'og:site_name', content: DEFAULT_SITE_NAME },
      { property: 'og:locale', content: 'id_ID' },
      { property: 'og:type', content: type },
      { property: 'og:title', content: finalTitle.value },
      { property: 'og:description', content: finalDescription.value },
      { property: 'og:image', content: finalImage.value },
      { property: 'og:url', content: finalUrl.value },

      // Twitter Cards
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@protokollebak' },
      { name: 'twitter:title', content: finalTitle.value },
      { name: 'twitter:description', content: finalDescription.value },
      { name: 'twitter:image', content: finalImage.value },
    ]

    const author = unref(options.author)
    if (author) {
      metaList.push({ name: 'author', content: author })
      metaList.push({ property: 'article:author', content: author })
    }

    const pubTime = unref(options.publishedTime)
    if (pubTime) {
      metaList.push({ property: 'article:published_time', content: pubTime })
    }

    return metaList
  })

  const headLinks = computed(() => [
    { rel: 'canonical', href: finalUrl.value }
  ])

  const headScripts = computed(() => {
    const schemaObj = unref(options.schema)
    if (!schemaObj) return []
    return [
      {
        type: 'application/ld+json',
        children: JSON.stringify(schemaObj),
      },
    ]
  })

  return useHead({
    title: finalTitle,
    meta: headMeta,
    link: headLinks,
    script: headScripts,
  })
}
