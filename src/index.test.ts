import {
  trSlugify,
  trSlugifyMultiple,
  trSlugifyUnique,
  SlugifyOptions,
} from "./index";

describe("trSlugify", () => {
  describe("Temel Türkçe karakter çevirileri", () => {
    test("ç -> c", () => {
      expect(trSlugify("çay")).toBe("cay");
    });

    test("ğ -> g", () => {
      expect(trSlugify("ağaç")).toBe("agac");
    });

    test("ı -> i", () => {
      expect(trSlugify("ırmak")).toBe("irmak");
    });

    test("İ -> I", () => {
      expect(trSlugify("İstanbul")).toBe("istanbul");
    });

    test("ö -> o", () => {
      expect(trSlugify("gözlük")).toBe("gozluk");
    });

    test("ş -> s", () => {
      expect(trSlugify("şeker")).toBe("seker");
    });

    test("ü -> u", () => {
      expect(trSlugify("güneş")).toBe("gunes");
    });

    test("Büyük harfler", () => {
      expect(trSlugify("ÇĞIİÖŞÜ")).toBe("cgiiosu");
    });
  });

  describe("Karmaşık metinler", () => {
    test("Cümle çevirisi", () => {
      expect(trSlugify("Türkiye Cumhuriyeti")).toBe("turkiye-cumhuriyeti");
    });

    test("Özel karakterlerle", () => {
      expect(trSlugify("İstanbul'da güzel bir gün!")).toBe(
        "istanbul-da-guzel-bir-gun"
      );
    });

    test("Sayılar ve harfler", () => {
      expect(trSlugify("2023 Türkiye 1. lig")).toBe("2023-turkiye-1-lig");
    });

    test("Çoklu boşluklar", () => {
      expect(trSlugify("çok    fazla   boşluk")).toBe("cok-fazla-bosluk");
    });
  });

  describe("Seçenekler testleri", () => {
    test("Farklı ayırıcı", () => {
      expect(trSlugify("türkçe karakterler", { separator: "_" })).toBe(
        "turkce_karakterler"
      );
    });

    test("Büyük harf koruma", () => {
      expect(trSlugify("TürkÇe", { lowercase: false })).toBe("TurkCe");
    });

    test("Özel karakterleri koruma", () => {
      expect(trSlugify("test@example.com", { removeSpecialChars: false })).toBe(
        "test@example.com"
      );
    });

    test("Çoklu ayırıcıları koruma", () => {
      expect(trSlugify("test--slug", { collapseSeparators: false })).toBe(
        "test--slug"
      );
    });

    test("Başındaki ve sonundaki ayırıcıları koruma", () => {
      expect(trSlugify("-test-slug-", { trimSeparators: false })).toBe(
        "-test-slug-"
      );
    });
  });

  describe("Sınır durumları", () => {
    test("Boş string", () => {
      expect(trSlugify("")).toBe("");
    });

    test("Null", () => {
      expect(trSlugify(null as any)).toBe("");
    });

    test("Undefined", () => {
      expect(trSlugify(undefined as any)).toBe("");
    });

    test("Sadece boşluklar", () => {
      expect(trSlugify("   ")).toBe("");
    });

    test("Sadece özel karakterler", () => {
      expect(trSlugify("!@#$%^&*()")).toBe("");
    });
  });
});

describe("trSlugifyMultiple", () => {
  test("Birden fazla metin çevirisi", () => {
    const texts = ["Türkçe", "İngilizce", "Almanca"];
    const expected = ["turkce", "ingilizce", "almanca"];
    expect(trSlugifyMultiple(texts)).toEqual(expected);
  });

  test("Seçeneklerle çoklu çeviri", () => {
    const texts = ["Test 1", "Test 2"];
    const options: SlugifyOptions = { separator: "_" };
    const expected = ["test_1", "test_2"];
    expect(trSlugifyMultiple(texts, options)).toEqual(expected);
  });
});

describe("trSlugifyUnique", () => {
  test("Benzersiz slug oluşturma", () => {
    const existingSlugs = ["test", "test-1"];
    expect(trSlugifyUnique("test", existingSlugs)).toBe("test-2");
  });

  test("Mevcut slug yoksa aynısını döndür", () => {
    const existingSlugs = ["other-slug"];
    expect(trSlugifyUnique("test", existingSlugs)).toBe("test");
  });

  test("Boş mevcut slug listesi", () => {
    expect(trSlugifyUnique("test")).toBe("test");
  });
});

describe("Gerçek dünya örnekleri", () => {
  test("Blog başlıkları", () => {
    expect(trSlugify("Türkçe SEO Optimizasyonu Nasıl Yapılır?")).toBe(
      "turkce-seo-optimizasyonu-nasil-yapilir"
    );
    expect(trSlugify("React.js ile Modern Web Uygulamaları")).toBe(
      "react-js-ile-modern-web-uygulamalari"
    );
  });

  test("Ürün isimleri", () => {
    expect(trSlugify("iPhone 14 Pro Max 256GB")).toBe(
      "iphone-14-pro-max-256gb"
    );
    expect(trSlugify("Samsung Galaxy S23 Ultra")).toBe(
      "samsung-galaxy-s23-ultra"
    );
  });

  test("Şehir isimleri", () => {
    expect(trSlugify("İstanbul, Türkiye")).toBe("istanbul-turkiye");
    expect(trSlugify("Ankara - Başkent")).toBe("ankara-baskent");
  });
});
