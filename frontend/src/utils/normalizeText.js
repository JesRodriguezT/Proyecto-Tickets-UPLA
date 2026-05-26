export function normalizeText(text) {
  if (!text) return "";
  return text.trim().replace(/\s+/g, " ");
}