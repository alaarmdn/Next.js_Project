/**
 * Truncates text to a specified length and adds ellipsis
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text
 */
export function truncateText(text, maxLength = 100) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Formats a date string to a more readable format
 * @param {string} dateString - The date string to format
 * @returns {string} Formatted date
 */
export function formatDate(dateString) {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

/**
 * Formats a number to a more readable format (e.g., 1000 -> 1K)
 * @param {number} num - The number to format
 * @returns {string} Formatted number
 */
export function formatNumber(num) {
  if (!num) return '0';
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

/**
 * Generates a full image URL for TMDB images
 * @param {string} path - The image path from TMDB
 * @param {string} size - The image size (default: 'w500')
 * @returns {string} Full image URL
 */
export function getImageUrl(path, size = 'w500') {
  if (!path) return '/placeholder-image.jpg';
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

/**
 * Calculates the average rating and formats it
 * @param {number} rating - The rating value
 * @param {number} maxRating - The maximum possible rating (default: 10)
 * @returns {string} Formatted rating
 */
export function formatRating(rating, maxRating = 10) {
  if (!rating) return 'N/A';
  return `${(rating / maxRating * 100).toFixed(0)}%`;
} 