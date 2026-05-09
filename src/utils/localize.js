export function l(value, lang) {
  if (value && typeof value === 'object' && !Array.isArray(value) && ('de' in value || 'en' in value)) {
    return value[lang] || value.en || value.de || '';
  }
  return value;
}
