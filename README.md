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

### Artefactos para instalar y publicar

EAS se utiliza una vez por cada Application ID Android para crear y custodiar la clave de firma. Después se descarga una copia segura y Gradle genera localmente los APK/AAB. Los APK son para instalación directa; Google Play debe recibir el AAB.

```bash
# APK locales firmados
npm run build:apk:free
npm run build:apk:pro

# AAB locales firmados para Google Play
npm run build:aab:free
npm run build:aab:pro

# IPA en EAS para TestFlight/App Store Connect
npm run build:store:ios:pro
```

Para crear inicialmente las claves Android en EAS:

```bash
npm run build:signing:android:free
npm run build:signing:android:pro
npx eas-cli credentials --platform android
```

Dentro del menú de credenciales, seleccione cada perfil y `credentials.json: Upload/Download credentials` → `Download credentials`. Guarde cada resultado fuera de Git como:

```text
credentials/android-free.json
credentials/android-pro.json
```

El `keystorePath` de cada JSON debe apuntar a su archivo `.jks`. La carpeta `credentials/`, los JSON, los keystores y el proyecto nativo generado están ignorados por Git. Guarde además una copia cifrada externa: perder una clave puede impedir futuras actualizaciones.

El script local ejecuta `expo prebuild`, configura la firma Release sin escribir contraseñas en el repositorio y llama a Gradle. Los resultados quedan en:

```text
android/app/build/outputs/apk/release/
android/app/build/outputs/bundle/release/
```

`build-versions.json` mantiene contadores independientes para Free y Pro. Tras cada build correcto, el script incrementa automáticamente el próximo `versionCode`; este archivo sí debe confirmarse en Git.

Para Free de producción, defina localmente `ADMOB_ANDROID_APP_ID` y `ADMOB_ANDROID_BANNER_ID` antes de compilar. Para un APK Free de prueba puede ejecutar directamente:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/build-android-local.ps1 -Variant free -Artifact apk -DevelopmentAds
```

Para subir el último build firmado:

```bash
# Android: suba manualmente el AAB local desde Google Play Console.
npx eas-cli submit --platform ios --profile ios-pro --latest
```

Los AAB locales se cargan manualmente en Google Play Console. El IPA de EAS pasa primero a TestFlight y posteriormente debe enviarse a revisión desde App Store Connect.

Para desarrollo, copie `.env.example` como `.env`; se usan exclusivamente los IDs oficiales de prueba. AdMob contiene código nativo, por lo que requiere un development build (`eas build --profile development`) y no funciona en Expo Go.

La primera publicación Android Free puede generarse sin IDs reales. En ese caso se usa un App ID oficial de prueba únicamente para completar la configuración nativa, pero la aplicación deshabilita AdMob completamente: no inicializa el SDK, no solicita anuncios y no muestra banners. Cuando AdMob habilite la aplicación, configure `ADMOB_ANDROID_APP_ID` y `ADMOB_ANDROID_BANNER_ID` y genere una actualización. Android/iOS Pro tampoco inicializan AdMob ni solicitan anuncios.

### Privacidad pendiente

- TODO: proporcionar la URL y el contenido legal de la política de privacidad del propietario.
- TODO: crear la aplicación Android Free y configurar Privacy & messaging (UMP) en AdMob.
- TODO: declarar en Google Play que Android Free contiene anuncios.
- El proveedor solicita información de consentimiento UMP antes de inicializar AdMob y no carga anuncios si no existe permiso para solicitarlos.
