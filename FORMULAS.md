# Fórmulas de MaoMec

Los cálculos conservan precisión completa y redondean solamente al mostrarse. Las longitudes usan la misma unidad, salvo conversiones explícitas.

## Engranajes rectos

- `M = Dp / Z`
- `Dp = M × Z`
- `De = M × (Z + 2)`
- `P = π × M`
- `M = P / π`

`M`: módulo; `Z`: dientes; `Dp`: diámetro primitivo; `De`: diámetro exterior; `P`: paso circular.

## Cabezal divisor

`vueltas = relación / divisiones`. Una combinación es válida cuando la parte fraccionaria multiplicada por el círculo da un número entero de agujeros.

## Conos

`α = atan((D − d) / (2 × L))`. `α` es el semiángulo y el ángulo incluido es `2 × α`.

## Longitud de cuerda

`C = D × sin(180° / N)`. Separación angular: `360° / N`.

## Conversiones

- `pulgadas = mm / 25.4`
- `milésimas = mm / 0.0254`
- `mm = milésimas × 0.0254`
- La fracción se aproxima al múltiplo más próximo de 1/128 y se simplifica.

## Selector de fresa para engranajes

La fresa se selecciona por el rango clásico de dientes del juego de ocho fresas evolventes. El módulo y el ángulo de presión deben coincidir con el engranaje; no se interpolan.

## Roscas

- Métrica: `vueltas por mm = 1 / paso`; `TPI aproximado = 25.4 / paso_mm`.
- Imperial: `paso_pulgadas = 1 / TPI`; `paso_mm = 25.4 / TPI`.

## Velocidad de corte

- `RPM = (1000 × Vc) / (π × D)`
- `Vc = (π × D × RPM) / 1000`

`Vc` se expresa en m/min y `D` en mm.

## Avance de fresado

`Vf = fz × Z × RPM`, donde `fz` es mm/diente, `Z` es la cantidad de dientes de la fresa y `Vf` se expresa en mm/min.

## Triángulos rectángulos

`a² + b² = c²` y `ángulo = atan(cateto opuesto / cateto adyacente)`. Se requieren exactamente dos lados conocidos.
