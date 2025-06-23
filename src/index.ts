export interface SlugifyOptions {
  /**
   * Ayırıcı karakter (varsayılan: '-')
   */
  separator?: string;
  /**
   * Küçük harfe çevir (varsayılan: true)
   */
  lowercase?: boolean;
  /**
   * Özel karakterleri kaldır (varsayılan: true)
   */
  removeSpecialChars?: boolean;
  /**
   * Çoklu ayırıcıları tek ayırıcıya çevir (varsayılan: true)
   */
  collapseSeparators?: boolean;
  /**
   * Başındaki ve sonundaki ayırıcıları kaldır (varsayılan: true)
   */
  trimSeparators?: boolean;
}

/**
 * Türkçe karakterleri İngilizce karşılıklarına çeviren harita
 */
const TURKISH_CHAR_MAP: Record<string, string> = {
  ç: "c",
  Ç: "C",
  ğ: "g",
  Ğ: "G",
  ı: "i",
  I: "I",
  İ: "I",
  ö: "o",
  Ö: "O",
  ş: "s",
  Ş: "S",
  ü: "u",
  Ü: "U",
};

/**
 * Türkçe metni URL-friendly slug'a çevirir
 * @param text - Çevrilecek metin
 * @param options - Slugify seçenekleri
 * @returns URL-friendly slug
 */
export function trSlugify(text: string, options: SlugifyOptions = {}): string {
  const {
    separator = "-",
    lowercase = true,
    removeSpecialChars = true,
    collapseSeparators = true,
    trimSeparators = true,
  } = options;

  if (!text || typeof text !== "string") {
    return "";
  }

  let result = text;

  // Türkçe karakterleri çevir
  for (const [turkishChar, englishChar] of Object.entries(TURKISH_CHAR_MAP)) {
    result = result.replace(new RegExp(turkishChar, "g"), englishChar);
  }

  // Küçük harfe çevir
  if (lowercase) {
    result = result.toLowerCase();
  }

  // Özel karakterleri kaldır veya ayırıcıya çevir
  if (removeSpecialChars) {
    // Alfanumerik olmayan karakterleri ayırıcıya çevir
    result = result.replace(/[^a-zA-Z0-9\s]/g, separator);
  }

  // Boşlukları ayırıcıya çevir
  result = result.replace(/\s+/g, separator);

  // Çoklu ayırıcıları tek ayırıcıya çevir
  if (collapseSeparators) {
    const separatorRegex = new RegExp(`${escapeRegExp(separator)}+`, "g");
    result = result.replace(separatorRegex, separator);
  }

  // Başındaki ve sonundaki ayırıcıları kaldır
  if (trimSeparators) {
    const separatorRegex = new RegExp(
      `^${escapeRegExp(separator)}+|${escapeRegExp(separator)}+$`,
      "g"
    );
    result = result.replace(separatorRegex, "");
  }

  return result;
}

/**
 * Regex özel karakterlerini escape eder
 * @param string - Escape edilecek string
 * @returns Escape edilmiş string
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Birden fazla metni slug'a çevirir
 * @param texts - Çevrilecek metinler dizisi
 * @param options - Slugify seçenekleri
 * @returns Slug'lar dizisi
 */
export function trSlugifyMultiple(
  texts: string[],
  options: SlugifyOptions = {}
): string[] {
  return texts.map((text) => trSlugify(text, options));
}

/**
 * Metni slug'a çevirir ve benzersiz olmasını sağlar
 * @param text - Çevrilecek metin
 * @param existingSlugs - Mevcut slug'lar dizisi
 * @param options - Slugify seçenekleri
 * @returns Benzersiz slug
 */
export function trSlugifyUnique(
  text: string,
  existingSlugs: string[] = [],
  options: SlugifyOptions = {}
): string {
  let slug = trSlugify(text, options);
  let counter = 1;
  let uniqueSlug = slug;

  while (existingSlugs.includes(uniqueSlug)) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
}

// Varsayılan export
export default trSlugify;
