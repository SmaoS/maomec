# MaoMec

Calculadora técnica industrial móvil, offline y en español. Incluye engranajes y módulos, cabezal divisor, conos, longitud de cuerda, conversiones, fracciones, favoritos, historial, tema claro/oscuro y compartir resultados.

## Ejecución

Requiere Node.js 20 o posterior, Android Studio/SDK para Android y macOS/Xcode para compilar iOS.

```bash
npm install
npm start
npm run android
npm run ios
```

El identificador Android y bundle de iOS es `com.maomec.app`. Para builds distribuibles: `npx eas build --platform android` o `--platform ios`.

## Calidad

```bash
npm run lint
npm test
npm run typecheck
```

## Arquitectura

- `app/`: pantallas con Expo Router.
- `src/components/`: componentes reutilizables.
- `src/domain/`: cálculos puros independientes de React.
- `src/storage/`: historial y preferencias con AsyncStorage.
- `src/theme/`: tema claro/oscuro.
- `src/tests/`: casos matemáticos conocidos.

Las ecuaciones y unidades están auditadas en [FORMULAS.md](FORMULAS.md).

## App variants

Una sola base de código produce las tres aplicaciones. La variante se fija durante el build y no puede cambiarse mediante preferencias locales.

| Build        | Nombre     | Identificador    | Anuncios |
| ------------ | ---------- | ---------------- | -------- |
| Android Free | MaoMec     | `com.maomec.app` | Sí       |
| Android Pro  | MaoMec Pro | `com.maomec.pro` | No       |
| iOS Pro      | MaoMec     | `com.maomec.app` | No       |

```bash
eas build --platform android --profile android-free
eas build --platform android --profile android-pro
eas build --platform ios --profile ios-pro
```

Para desarrollo, copie `.env.example` como `.env`; se usan exclusivamente los IDs oficiales de prueba. AdMob contiene código nativo, por lo que requiere un development build (`eas build --profile development`) y no funciona en Expo Go.

Antes del primer build Android Free de producción deben configurarse `ADMOB_ANDROID_APP_ID` y `ADMOB_ANDROID_BANNER_ID` como variables de entorno de EAS. El build falla intencionalmente si faltan, para impedir publicar IDs de prueba. Android/iOS Pro no inicializan AdMob ni solicitan anuncios.

### Privacidad pendiente

- TODO: proporcionar la URL y el contenido legal de la política de privacidad del propietario.
- TODO: crear la aplicación Android Free y configurar Privacy & messaging (UMP) en AdMob.
- TODO: declarar en Google Play que Android Free contiene anuncios.
- El proveedor solicita información de consentimiento UMP antes de inicializar AdMob y no carga anuncios si no existe permiso para solicitarlos.
