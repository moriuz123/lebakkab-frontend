import { computed, unref } from 'vue'
import { useHead } from '@vueuse/head'
import { useSettingsStore } from '@/stores/settings'

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
  if (!text) return ''
  const stripped = String(text)
    .replace(/<[^>]*>?/gm, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (stripped.length <= maxLen) return stripped
  return stripped.substring(0, maxLen).trim() + '...'
}

/**
 * Enterprise Yoast SEO Composable for Vue 3 + VueUse Head
 * Integrated with dynamic backend settings & polymorphic SeoMeta from Filament CMS
 */
export function useSeo(options = {}) {
  let settingsStore = null
  try {
    settingsStore = useSettingsStore()
  } catch (e) {
    // Pinia not active yet in SSR / test
  }

  const dynamicSiteName = computed(() => settingsStore?.siteName || DEFAULT_SITE_NAME)
  const dynamicDefaultDesc = computed(() => settingsStore?.metaDescription || DEFAULT_DESCRIPTION)
  const dynamicDefaultKeywords = computed(
    () =>
      settingsStore?.metaKeywords ||
      'Kabupaten Lebak, Portal Lebak, Pemkab Lebak, Berita Lebak, Rangkasbitung, Layanan Lebak, Diskominfo'
  )
  const dynamicDefaultLogo = computed(() => settingsStore?.logoUrl || DEFAULT_IMAGE)

  // Ambil objek SEO kustom (jika disediakan dari payload backend API)
  const seoPayload = computed(() => unref(options.seo) || {})

  const finalTitle = computed(() => {
    const rawSeo = seoPayload.value
    const raw = rawSeo.meta_title || unref(options.title)
    const site = dynamicSiteName.value
    if (!raw) return site
    if (options.rawTitle || raw.includes(site)) return raw
    return `${raw} | ${site}`
  })

  const finalDescription = computed(() => {
    const rawSeo = seoPayload.value
    const raw = rawSeo.meta_description || unref(options.description)
    if (!raw) return dynamicDefaultDesc.value
    return sanitizeMetaDescription(raw) || dynamicDefaultDesc.value
  })

  const finalKeywords = computed(() => {
    const rawSeo = seoPayload.value
    const fk = rawSeo.focus_keyword
    const raw = unref(options.keywords)
    let baseKeywords = ''
    if (Array.isArray(raw)) {
      baseKeywords = raw.join(', ')
    } else {
      baseKeywords = raw || dynamicDefaultKeywords.value
    }

    if (fk && !baseKeywords.toLowerCase().includes(fk.toLowerCase())) {
      return `${fk}, ${baseKeywords}`
    }
    return baseKeywords
  })

  const finalImage = computed(() => {
    const rawSeo = seoPayload.value
    const raw = rawSeo.og_image || unref(options.image)
    if (!raw) return toAbsoluteUrl(dynamicDefaultLogo.value)
    return toAbsoluteUrl(raw)
  })

  const finalUrl = computed(() => {
    const rawSeo = seoPayload.value
    const raw = rawSeo.canonical_url || unref(options.url)
    if (!raw) {
      if (typeof window !== 'undefined') return window.location.href
      return DEFAULT_BASE_URL
    }
    return toAbsoluteUrl(raw)
  })

  const ogTitle = computed(() => {
    const rawSeo = seoPayload.value
    return rawSeo.og_title || rawSeo.meta_title || unref(options.ogTitle) || finalTitle.value
  })

  const ogDescription = computed(() => {
    const rawSeo = seoPayload.value
    const raw = rawSeo.og_description || rawSeo.meta_description || unref(options.ogDescription)
    if (raw) return sanitizeMetaDescription(raw)
    return finalDescription.value
  })

  const robotsDirective = computed(() => {
    const rawSeo = seoPayload.value
    const allowIndex = rawSeo.robots_index !== false && unref(options.robotsIndex) !== false
    const allowFollow = rawSeo.robots_follow !== false && unref(options.robotsFollow) !== false
    const indexPart = allowIndex ? 'index' : 'noindex'
    const followPart = allowFollow ? 'follow' : 'nofollow'
    return `${indexPart}, ${followPart}, max-image-preview:large, max-snippet:-1, max-video-preview:-1`
  })

  const headMeta = computed(() => {
    const type = unref(options.type) || 'website'
    const metaList = [
      { name: 'description', content: finalDescription.value },
      { name: 'keywords', content: finalKeywords.value },
      { name: 'robots', content: robotsDirective.value },

      // Open Graph
      { property: 'og:site_name', content: dynamicSiteName.value },
      { property: 'og:locale', content: 'id_ID' },
      { property: 'og:type', content: type },
      { property: 'og:title', content: ogTitle.value },
      { property: 'og:description', content: ogDescription.value },
      { property: 'og:image', content: finalImage.value },
      { property: 'og:url', content: finalUrl.value },

      // Twitter Cards
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: settingsStore?.twitterHandle || '@protokollebak' },
      { name: 'twitter:creator', content: settingsStore?.twitterHandle || '@protokollebak' },
      { name: 'twitter:title', content: ogTitle.value },
      { name: 'twitter:description', content: ogDescription.value },
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

  const headLinks = computed(() => [{ rel: 'canonical', href: finalUrl.value }])

  const headScripts = computed(() => {
    const explicitSchema = unref(options.schema)
    if (explicitSchema) {
      return [
        {
          type: 'application/ld+json',
          children: JSON.stringify(explicitSchema),
        },
      ]
    }

    const rawSeo = seoPayload.value
    const schemaType = rawSeo.schema_type || unref(options.schemaType)
    if (!schemaType || schemaType === 'None') return []

    // Automatic structured data schema generator
    const schemaObj = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': schemaType,
          '@id': `${finalUrl.value}#${schemaType.toLowerCase()}`,
          url: finalUrl.value,
          name: finalTitle.value,
          description: finalDescription.value,
          isPartOf: {
            '@type': 'WebSite',
            '@id': `${DEFAULT_BASE_URL}#website`,
            name: dynamicSiteName.value,
            url: DEFAULT_BASE_URL,
          },
          publisher: {
            '@type': 'GovernmentOrganization',
            name: 'Pemerintah Daerah Kabupaten Lebak',
            url: DEFAULT_BASE_URL,
            logo: {
              '@type': 'ImageObject',
              url: toAbsoluteUrl(dynamicDefaultLogo.value),
            },
          },
        },
      ],
    }

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
