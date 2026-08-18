import { resolveAppConfig } from "../config/appVariant";

describe("variantes de MaoMec", () => {
  test("Android Free habilita anuncios", () =>
    expect(resolveAppConfig("free", "android").adsEnabled).toBe(true));
  test("Android Pro deshabilita anuncios", () =>
    expect(resolveAppConfig("pro", "android").adsEnabled).toBe(false));
  test("iOS Pro deshabilita anuncios", () =>
    expect(resolveAppConfig("pro", "ios").adsEnabled).toBe(false));
  test("iOS Free mantiene la protección y deshabilita anuncios", () =>
    expect(resolveAppConfig("free", "ios").adsEnabled).toBe(false));
  test("cada variante Android tiene identificador independiente", () => {
    expect(resolveAppConfig("free", "android").packageName).toBe(
      "com.maomec.app",
    );
    expect(resolveAppConfig("pro", "android").packageName).toBe(
      "com.maomec.pro",
    );
  });
});
