const {
  trSlugify,
  trSlugifyMultiple,
  trSlugifyUnique,
} = require("../dist/index.js");

console.log("=== tr-slugify Temel Kullanım Örnekleri ===\n");

// Temel kullanım
console.log("1. Temel Kullanım:");
console.log('trSlugify("Türkçe Metin") =>', trSlugify("Türkçe Metin"));
console.log('trSlugify("çay") =>', trSlugify("çay"));
console.log('trSlugify("ağaç") =>', trSlugify("ağaç"));
console.log('trSlugify("ırmak") =>', trSlugify("ırmak"));
console.log('trSlugify("İstanbul") =>', trSlugify("İstanbul"));
console.log('trSlugify("gözlük") =>', trSlugify("gözlük"));
console.log('trSlugify("şeker") =>', trSlugify("şeker"));
console.log('trSlugify("güneş") =>', trSlugify("güneş"));
console.log();

// Karmaşık metinler
console.log("2. Karmaşık Metinler:");
console.log(
  'trSlugify("Türkiye Cumhuriyeti") =>',
  trSlugify("Türkiye Cumhuriyeti")
);
console.log(
  'trSlugify("İstanbul\'da güzel bir gün!") =>',
  trSlugify("İstanbul'da güzel bir gün!")
);
console.log(
  'trSlugify("2023 Türkiye 1. lig") =>',
  trSlugify("2023 Türkiye 1. lig")
);
console.log(
  'trSlugify("çok    fazla   boşluk") =>',
  trSlugify("çok    fazla   boşluk")
);
console.log();

// Seçeneklerle kullanım
console.log("3. Seçeneklerle Kullanım:");
console.log(
  "Farklı ayırıcı:",
  trSlugify("türkçe karakterler", { separator: "_" })
);
console.log("Büyük harf koruma:", trSlugify("TürkÇe", { lowercase: false }));
console.log(
  "Özel karakterleri koruma:",
  trSlugify("test@example.com", { removeSpecialChars: false })
);
console.log();

// Çoklu metin işleme
console.log("4. Çoklu Metin İşleme:");
const texts = ["Türkçe", "İngilizce", "Almanca"];
console.log(
  'trSlugifyMultiple(["Türkçe", "İngilizce", "Almanca"]) =>',
  trSlugifyMultiple(texts)
);
console.log();

// Benzersiz slug oluşturma
console.log("5. Benzersiz Slug Oluşturma:");
const existingSlugs = ["test", "test-1"];
console.log(
  'trSlugifyUnique("test", ["test", "test-1"]) =>',
  trSlugifyUnique("test", existingSlugs)
);
console.log('trSlugifyUnique("test", []) =>', trSlugifyUnique("test", []));
console.log();

// Gerçek dünya örnekleri
console.log("6. Gerçek Dünya Örnekleri:");
console.log(
  "Blog başlığı:",
  trSlugify("Türkçe SEO Optimizasyonu Nasıl Yapılır?")
);
console.log("Ürün ismi:", trSlugify("iPhone 14 Pro Max 256GB"));
console.log("Şehir ismi:", trSlugify("İstanbul, Türkiye"));
console.log();
