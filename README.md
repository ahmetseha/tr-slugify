# tr-slugify

Türkçe özel karakterleri doğru çeviren ve URL için mükemmel slug'lar oluşturan npm paketi.

## Özellikler

- ✅ Türkçe özel karakterleri doğru çevirme (ç→c, ğ→g, ı→i, İ→I, ö→o, ş→s, ü→u)
- ✅ URL-friendly slug oluşturma
- ✅ Özelleştirilebilir ayırıcı karakterler
- ✅ Çoklu metin işleme
- ✅ Benzersiz slug oluşturma
- ✅ TypeScript desteği
- ✅ Kapsamlı test coverage
- ✅ Sıfır bağımlılık

## Kurulum

```bash
npm install tr-slugify
```

## Kullanım

### Temel Kullanım

```javascript
import { trSlugify } from 'tr-slugify';

// Basit kullanım
trSlugify('Türkçe Metin'); // 'turkce-metin'

// Türkçe karakterler
trSlugify('çay'); // 'cay'
trSlugify('ağaç'); // 'agac'
trSlugify('ırmak'); // 'irmak'
trSlugify('İstanbul'); // 'istanbul'
trSlugify('gözlük'); // 'gozluk'
trSlugify('şeker'); // 'seker'
trSlugify('güneş'); // 'gunes'
```

### Gelişmiş Kullanım

```javascript
import { trSlugify, trSlugifyMultiple, trSlugifyUnique } from 'tr-slugify';

// Seçeneklerle kullanım
trSlugify('Türkçe Metin', {
  separator: '_',        // Ayırıcı karakter (varsayılan: '-')
  lowercase: false,      // Küçük harfe çevirme (varsayılan: true)
  removeSpecialChars: true, // Özel karakterleri kaldır (varsayılan: true)
  collapseSeparators: true, // Çoklu ayırıcıları tek ayırıcıya çevir (varsayılan: true)
  trimSeparators: true   // Başındaki ve sonundaki ayırıcıları kaldır (varsayılan: true)
});

// Çoklu metin işleme
const texts = ['Türkçe', 'İngilizce', 'Almanca'];
trSlugifyMultiple(texts); // ['turkce', 'ingilizce', 'almanca']

// Benzersiz slug oluşturma
const existingSlugs = ['test', 'test-1'];
trSlugifyUnique('test', existingSlugs); // 'test-2'
```

## API Referansı

### `trSlugify(text, options?)`

Ana slugify fonksiyonu.

**Parametreler:**
- `text` (string): Çevrilecek metin
- `options` (SlugifyOptions, opsiyonel): Slugify seçenekleri

**Dönen değer:** URL-friendly slug string

### `trSlugifyMultiple(texts, options?)`

Birden fazla metni slug'a çevirir.

**Parametreler:**
- `texts` (string[]): Çevrilecek metinler dizisi
- `options` (SlugifyOptions, opsiyonel): Slugify seçenekleri

**Dönen değer:** Slug'lar dizisi

### `trSlugifyUnique(text, existingSlugs?, options?)`

Benzersiz slug oluşturur.

**Parametreler:**
- `text` (string): Çevrilecek metin
- `existingSlugs` (string[], opsiyonel): Mevcut slug'lar dizisi
- `options` (SlugifyOptions, opsiyonel): Slugify seçenekleri

**Dönen değer:** Benzersiz slug string

### `SlugifyOptions` Interface

```typescript
interface SlugifyOptions {
  separator?: string;           // Ayırıcı karakter (varsayılan: '-')
  lowercase?: boolean;          // Küçük harfe çevir (varsayılan: true)
  removeSpecialChars?: boolean; // Özel karakterleri kaldır (varsayılan: true)
  collapseSeparators?: boolean; // Çoklu ayırıcıları tek ayırıcıya çevir (varsayılan: true)
  trimSeparators?: boolean;     // Başındaki ve sonundaki ayırıcıları kaldır (varsayılan: true)
}
```

## Örnekler

### Blog Başlıkları

```javascript
trSlugify('Türkçe SEO Optimizasyonu Nasıl Yapılır?');
// 'turkce-seo-optimizasyonu-nasil-yapilir'

trSlugify('React.js ile Modern Web Uygulamaları');
// 'react-js-ile-modern-web-uygulamalari'
```

### Ürün İsimleri

```javascript
trSlugify('iPhone 14 Pro Max 256GB');
// 'iphone-14-pro-max-256gb'

trSlugify('Samsung Galaxy S23 Ultra');
// 'samsung-galaxy-s23-ultra'
```

### Şehir İsimleri

```javascript
trSlugify('İstanbul, Türkiye');
// 'istanbul-turkiye'

trSlugify('Ankara - Başkent');
// 'ankara-baskent'
```

### Özel Ayırıcılar

```javascript
trSlugify('Türkçe Metin', { separator: '_' });
// 'turkce_metin'

trSlugify('Test Metin', { separator: '.' });
// 'test.metin'
```

### Büyük Harf Koruma

```javascript
trSlugify('TürkÇe', { lowercase: false });
// 'TürkCe'
```

## Geliştirme

### Kurulum

```bash
git clone https://github.com/yourusername/tr-slugify.git
cd tr-slugify
npm install
```

### Test Çalıştırma

```bash
npm test
```

### Build

```bash
npm run build
```

## Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add some amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## Changelog

### v1.0.0
- İlk sürüm
- Türkçe karakter desteği
- Temel slugify fonksiyonları
- TypeScript desteği
- Kapsamlı test coverage 