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
