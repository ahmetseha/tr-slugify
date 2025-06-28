const {
  trSlugify,
  trSlugifyMultiple,
  trSlugifyUnique,
} = require("./dist/index.js");

// Test yardımcı fonksiyonları
function assertEquals(actual, expected, testName) {
  if (actual === expected) {
    console.log(`✅ ${testName}`);
    return true;
  } else {
    console.log(`❌ ${testName}`);
    console.log(`   Beklenen: ${expected}`);
    console.log(`   Gerçek:   ${actual}`);
    return false;
  }
}

function assertArrayEquals(actual, expected, testName) {
  if (JSON.stringify(actual) === JSON.stringify(expected)) {
    console.log(`✅ ${testName}`);
    return true;
  } else {
    console.log(`❌ ${testName}`);
    console.log(`   Beklenen: ${JSON.stringify(expected)}`);
    console.log(`   Gerçek:   ${JSON.stringify(actual)}`);
    return false;
  }
}

// Test sonuçlarını takip etmek için
let passedTests = 0;
let totalTests = 0;

function runTest(testFn, testName) {
  totalTests++;
  if (testFn()) {
    passedTests++;
  }
}

console.log("🧪 tr-slugify Test Başlıyor...\n");

// Temel Türkçe karakter çevirileri
runTest(() => assertEquals(trSlugify("çay"), "cay", "ç -> c"), "ç -> c");
runTest(() => assertEquals(trSlugify("ağaç"), "agac", "ğ -> g"), "ğ -> g");
runTest(() => assertEquals(trSlugify("ırmak"), "irmak", "ı -> i"), "ı -> i");
runTest(
  () => assertEquals(trSlugify("İstanbul"), "istanbul", "İ -> I"),
  "İ -> I"
);
runTest(() => assertEquals(trSlugify("gözlük"), "gozluk", "ö -> o"), "ö -> o");
runTest(() => assertEquals(trSlugify("şeker"), "seker", "ş -> s"), "ş -> s");
runTest(() => assertEquals(trSlugify("güneş"), "gunes", "ü -> u"), "ü -> u");
runTest(
  () => assertEquals(trSlugify("ÇĞIİÖŞÜ"), "cgiiosu", "Büyük harfler"),
  "Büyük harfler"
);

// Karmaşık metinler
runTest(
  () =>
    assertEquals(
      trSlugify("Türkiye Cumhuriyeti"),
      "turkiye-cumhuriyeti",
      "Cümle çevirisi"
    ),
  "Cümle çevirisi"
);
runTest(
  () =>
    assertEquals(
      trSlugify("İstanbul'da güzel bir gün!"),
      "istanbul-da-guzel-bir-gun",
      "Özel karakterlerle"
    ),
  "Özel karakterlerle"
);
runTest(
  () =>
    assertEquals(
      trSlugify("2023 Türkiye 1. lig"),
      "2023-turkiye-1-lig",
      "Sayılar ve harfler"
    ),
  "Sayılar ve harfler"
);
runTest(
  () =>
    assertEquals(
      trSlugify("çok    fazla   boşluk"),
      "cok-fazla-bosluk",
      "Çoklu boşluklar"
    ),
  "Çoklu boşluklar"
);

// Seçenekler testleri
runTest(
  () =>
    assertEquals(
      trSlugify("türkçe karakterler", { separator: "_" }),
      "turkce_karakterler",
      "Farklı ayırıcı"
    ),
  "Farklı ayırıcı"
);
runTest(
  () =>
    assertEquals(
      trSlugify("TürkÇe", { lowercase: false }),
      "TurkCe",
      "Büyük harf koruma"
    ),
  "Büyük harf koruma"
);
runTest(
  () =>
    assertEquals(
      trSlugify("test@example.com", { removeSpecialChars: false }),
      "test@example.com",
      "Özel karakterleri koruma"
    ),
  "Özel karakterleri koruma"
);
runTest(
  () =>
    assertEquals(
      trSlugify("test--slug", { collapseSeparators: false }),
      "test--slug",
      "Çoklu ayırıcıları koruma"
    ),
  "Çoklu ayırıcıları koruma"
);
runTest(
  () =>
    assertEquals(
      trSlugify("-test-slug-", { trimSeparators: false }),
      "-test-slug-",
      "Başındaki ve sonundaki ayırıcıları koruma"
    ),
  "Başındaki ve sonundaki ayırıcıları koruma"
);

// Sınır durumları
runTest(() => assertEquals(trSlugify(""), "", "Boş string"), "Boş string");
runTest(() => assertEquals(trSlugify(null), "", "Null"), "Null");
runTest(() => assertEquals(trSlugify(undefined), "", "Undefined"), "Undefined");
runTest(
  () => assertEquals(trSlugify("   "), "", "Sadece boşluklar"),
  "Sadece boşluklar"
);
runTest(
  () => assertEquals(trSlugify("!@#$%^&*()"), "", "Sadece özel karakterler"),
  "Sadece özel karakterler"
);

// trSlugifyMultiple testleri
runTest(() => {
  const texts = ["Türkçe", "İngilizce", "Almanca"];
  const expected = ["turkce", "ingilizce", "almanca"];
  return assertArrayEquals(
    trSlugifyMultiple(texts),
    expected,
    "Birden fazla metin çevirisi"
  );
}, "Birden fazla metin çevirisi");

runTest(() => {
  const texts = ["Test 1", "Test 2"];
  const options = { separator: "_" };
  const expected = ["test_1", "test_2"];
  return assertArrayEquals(
    trSlugifyMultiple(texts, options),
    expected,
    "Seçeneklerle çoklu çeviri"
  );
}, "Seçeneklerle çoklu çeviri");

// trSlugifyUnique testleri
runTest(
  () =>
    assertEquals(
      trSlugifyUnique("test", ["test", "test-1"]),
      "test-2",
      "Benzersiz slug oluşturma"
    ),
  "Benzersiz slug oluşturma"
);
runTest(
  () =>
    assertEquals(
      trSlugifyUnique("test", ["other-slug"]),
      "test",
      "Mevcut slug yoksa aynısını döndür"
    ),
  "Mevcut slug yoksa aynısını döndür"
);
runTest(
  () =>
    assertEquals(trSlugifyUnique("test"), "test", "Boş mevcut slug listesi"),
  "Boş mevcut slug listesi"
);

// Gerçek dünya örnekleri
runTest(
  () =>
    assertEquals(
      trSlugify("Türkçe SEO Optimizasyonu Nasıl Yapılır?"),
      "turkce-seo-optimizasyonu-nasil-yapilir",
      "Blog başlığı 1"
    ),
  "Blog başlığı 1"
);
runTest(
  () =>
    assertEquals(
      trSlugify("React.js ile Modern Web Uygulamaları"),
      "react-js-ile-modern-web-uygulamalari",
      "Blog başlığı 2"
    ),
  "Blog başlığı 2"
);
runTest(
  () =>
    assertEquals(
      trSlugify("iPhone 14 Pro Max 256GB"),
      "iphone-14-pro-max-256gb",
      "Ürün ismi 1"
    ),
  "Ürün ismi 1"
);
runTest(
  () =>
    assertEquals(
      trSlugify("Samsung Galaxy S23 Ultra"),
      "samsung-galaxy-s23-ultra",
      "Ürün ismi 2"
    ),
  "Ürün ismi 2"
);
runTest(
  () =>
    assertEquals(
      trSlugify("İstanbul, Türkiye"),
      "istanbul-turkiye",
      "Şehir ismi 1"
    ),
  "Şehir ismi 1"
);
runTest(
  () =>
    assertEquals(
      trSlugify("Ankara - Başkent"),
      "ankara-baskent",
      "Şehir ismi 2"
    ),
  "Şehir ismi 2"
);

console.log(`\n📊 Test Sonuçları: ${passedTests}/${totalTests} test başarılı`);
console.log(
  `🎯 Başarı Oranı: ${((passedTests / totalTests) * 100).toFixed(1)}%`
);

if (passedTests === totalTests) {
  console.log("🎉 Tüm testler başarılı!");
  process.exit(0);
} else {
  console.log("⚠️  Bazı testler başarısız!");
  process.exit(1);
}
