/**
 * Format a raw date string or Date object into Indonesian locale format.
 * @param {string|Date} date
 * @param {object} options Custom Intl.DateTimeFormatOptions
 * @returns {string}
 */
export function formatDate(date, options = {}) {
  if (!date) return ''
  const defaultOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...options
  }
  return new Date(date).toLocaleDateString('id-ID', defaultOptions)
}

/**
 * Format full date using Intl.DateTimeFormat for consistency.
 * @param {string|Date} date
 * @returns {string}
 */
export function formatFullDate(date) {
  if (!date) return ''
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

/**
 * Extract short capitalized month name (e.g., 'JAN', 'FEB') from date.
 * @param {string|Date} date
 * @returns {string}
 */
export function formatMonth(date) {
  if (!date) return ''
  return new Intl.DateTimeFormat('id-ID', { month: 'short' }).format(new Date(date)).toUpperCase()
}

/**
 * Extract the day number from date.
 * @param {string|Date} date
 * @returns {number|string}
 */
export function formatDay(date) {
  if (!date) return ''
  return new Date(date).getDate()
}

/**
 * Normalizes and prepends storage path if needed.
 * Ensures the path matches Laravel's symlinked storage directory.
 * @param {string} path
 * @returns {string}
 */
export function getStorageUrl(path) {
  if (!path) return ''
  
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  // Trim leading slash
  let cleanPath = path.startsWith('/') ? path.slice(1) : path

  // Hilangkan prefix 'storage/' jika data dari DB kebetulan menyertakannya
  if (cleanPath.startsWith('storage/')) {
    cleanPath = cleanPath.slice(8)
  }

  // Gunakan VITE_STORAGE_BASE_URL jika ada, default fallback '/storage/'
  const baseUrl = import.meta.env.VITE_STORAGE_BASE_URL || '/storage'
  const separator = baseUrl.endsWith('/') ? '' : '/'
  
  return `${baseUrl}${separator}${cleanPath}`
}
