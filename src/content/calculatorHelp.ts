import { HelpSection } from "../components/HelpButton";

export const circlesHelp = {
  module: {
    title: "Módulo del engranaje",
    intro:
      "Sirve para descubrir el tamaño normalizado de los dientes de un engranaje.",
    sections: [
      {
        title: "Diámetro primitivo",
        body: "Es el diámetro de una circunferencia imaginaria que pasa por la zona donde engranan los dientes. No es el diámetro exterior. Normalmente aparece en el plano de la pieza.",
      },
      {
        title: "Número de dientes",
        body: "Es la cantidad total de dientes que tiene o tendrá el engranaje. Cuenta todos los dientes alrededor de la pieza.",
      },
      {
        title: "Resultado: módulo",
        body: "El módulo indica el tamaño de cada diente. Debe estar expresado en milímetros y se usa para elegir una fresa y engranar con otra rueda del mismo módulo.",
      },
    ],
  },
  pitchDiameter: {
    title: "Diámetro primitivo",
    intro:
      "Calcula la circunferencia imaginaria sobre la que trabajan juntos los dientes.",
    sections: [
      {
        title: "Módulo",
        body: "Es el tamaño normalizado del diente, expresado en milímetros. Los engranajes que trabajan juntos deben tener el mismo módulo.",
      },
      {
        title: "Número de dientes",
        body: "Es la cantidad de dientes que se van a fresar o mecanizar alrededor de la pieza.",
      },
      {
        title: "Resultado",
        body: "Obtendrás el diámetro primitivo, no el diámetro exterior que medirías con un calibrador. Se usa como referencia para diseñar el engranaje y calcular la distancia entre centros.",
      },
    ],
  },
  outside: {
    title: "Diámetro exterior",
    intro:
      "Calcula el diámetro máximo de la pieza terminada, medido sobre las puntas de los dientes.",
    sections: [
      {
        title: "Módulo",
        body: "Representa el tamaño de los dientes en milímetros.",
      },
      {
        title: "Número de dientes",
        body: "Es la cantidad total de dientes que tendrá el engranaje.",
      },
      {
        title: "Uso práctico",
        body: "Este resultado ayuda a preparar o tornear el disco antes de fresar los dientes. En engranajes especiales puede requerir correcciones adicionales.",
      },
    ],
  },
  pitch: {
    title: "Paso circular",
    intro:
      "Indica la distancia, medida sobre la circunferencia primitiva, entre un punto de un diente y el mismo punto del diente siguiente.",
    sections: [
      {
        title: "Módulo",
        body: "Introduce el tamaño normalizado del diente en milímetros.",
      },
      {
        title: "Resultado",
        body: "El paso circular se expresa en milímetros. No es una distancia recta entre las puntas de dos dientes.",
      },
    ],
  },
  fromPitch: {
    title: "Módulo desde el paso",
    intro: "Permite obtener el módulo cuando ya conoces el paso circular.",
    sections: [
      {
        title: "Paso circular",
        body: "Es la distancia sobre la circunferencia primitiva entre dos puntos equivalentes de dientes consecutivos.",
      },
      {
        title: "Resultado",
        body: "Obtendrás el módulo del engranaje en milímetros.",
      },
    ],
  },
  divider: {
    title: "Cabezal divisor",
    intro:
      "Indica cuánto debes girar la manivela para repartir dientes, ranuras, estrías o caras iguales alrededor de una pieza.",
    sections: [
      {
        title: "Relación del divisor",
        body: "Indica cuántas vueltas de manivela producen una vuelta completa del husillo. En un cabezal 40:1, la manivela gira 40 veces para que la pieza gire una vez.",
      },
      {
        title: "Cantidad de divisiones",
        body: "Es el número de partes iguales que quieres mecanizar: por ejemplo, 24 para fabricar 24 dientes.",
      },
      {
        title: "Cómo leer el resultado",
        body: "“1 vuelta + 10 agujeros en círculo de 15” significa dar una vuelta completa y después avanzar 10 espacios del círculo de 15. Mantén siempre el mismo sentido de giro para evitar holgura.",
      },
    ],
  },
  cutter: {
    title: "Selector de fresa",
    intro:
      "Selecciona el número de una fresa evolvente del juego clásico de ocho unidades.",
    sections: [
      {
        title: "Número de dientes",
        body: "Introduce la cantidad entera de dientes del engranaje. El juego clásico cubre desde 12 dientes hasta cremallera.",
      },
      {
        title: "Módulo",
        body: "Es el tamaño del diente. Debe coincidir con el módulo marcado en la fresa; la selección numérica depende del rango de dientes.",
      },
      {
        title: "Comprobación",
        body: "Verifica también que el ángulo de presión de la fresa coincida con el diseño del engranaje.",
      },
    ],
  },
} satisfies Record<
  string,
  { title: string; intro: string; sections: HelpSection[] }
>;

export const angularDividerHelp = {
  title: "Cabezal divisor por ángulos",
  intro:
    "Muestra el ángulo exacto donde debe realizarse cada mecanizado alrededor de la pieza.",
  sections: [
    {
      title: "Cantidad de divisiones",
      body: "Es el número total de dientes, ranuras, agujeros o caras que quieres repartir en una vuelta completa.",
    },
    {
      title: "Ángulo inicial",
      body: "Es la posición desde la que quieres comenzar. Déjalo vacío para empezar en 0°. Por ejemplo, escribe 5 para comenzar el primer mecanizado en 5°.",
    },
    {
      title: "Incremento angular",
      body: "Es el ángulo que debes avanzar entre un mecanizado y el siguiente. La lista muestra todas las posiciones absolutas que debes marcar en la mesa o cabezal graduado.",
    },
  ],
};

export const coneHelp = {
  title: "Grados de cono",
  intro:
    "Calcula la inclinación necesaria para mecanizar un cono a partir de sus dos diámetros y su longitud.",
  sections: [
    {
      title: "Diámetro mayor (D)",
      body: "Es la medida de la parte más ancha del cono.",
    },
    {
      title: "Diámetro menor (d)",
      body: "Es la medida de la parte más estrecha. Debe ser menor que el diámetro mayor.",
    },
    {
      title: "Longitud (L)",
      body: "Es la distancia axial, paralela al centro de la pieza, entre los puntos donde se midieron ambos diámetros.",
    },
    {
      title: "Semiángulo y ángulo incluido",
      body: "El semiángulo es la inclinación de un solo lado respecto al eje y suele usarse para orientar el carro superior. El ángulo incluido es la abertura completa del cono, de un lado al otro.",
    },
  ],
};
export const chordHelp = {
  title: "Longitud de cuerda",
  intro:
    "Calcula la distancia recta entre los centros de dos agujeros consecutivos repartidos por igual en una circunferencia.",
  sections: [
    {
      title: "Cantidad de agujeros",
      body: "Es el número total de perforaciones que quieres distribuir alrededor del círculo.",
    },
    {
      title: "Diámetro del círculo",
      body: "Es el diámetro de la circunferencia imaginaria que pasa por el centro de todos los agujeros. No es el diámetro exterior de la pieza ni el diámetro de cada agujero.",
    },
    {
      title: "Resultado",
      body: "La longitud de cuerda es la medida recta de centro a centro entre dos agujeros vecinos. Puedes comprobar el trazado con un calibrador usando esta distancia.",
    },
  ],
};
export const converterHelp = {
  mm: {
    title: "Milímetros a pulgadas",
    intro:
      "Convierte una medida métrica a pulgadas decimales y milésimas de pulgada.",
    sections: [
      {
        title: "Milímetros",
        body: "Introduce la medida tomada en el sistema métrico. Puedes escribir punto o coma decimal.",
      },
      {
        title: "Cómo leer el resultado",
        body: "Una pulgada contiene 25,4 mm y 1000 milésimas. Por ejemplo, 25,4 mm equivalen a 1,0000 pulgadas o 1000 milésimas.",
      },
    ],
  },
  thou: {
    title: "Milésimas a milímetros",
    intro: "Convierte milésimas de pulgada a una medida métrica.",
    sections: [
      {
        title: "Milésimas",
        body: "Son mil partes de una pulgada. Por ejemplo, 500 milésimas corresponden a media pulgada.",
      },
      {
        title: "Resultado",
        body: "La aplicación muestra la medida equivalente en milímetros y en pulgadas decimales.",
      },
    ],
  },
  fraction: {
    title: "Decimal a fracción",
    intro:
      "Busca la fracción de pulgada más cercana al valor decimal introducido.",
    sections: [
      {
        title: "Pulgadas decimales",
        body: "Introduce solamente el valor en pulgadas; por ejemplo, 0,625.",
      },
      {
        title: "Fracción y error",
        body: "El resultado se aproxima hasta 1/128 de pulgada. El error indica la pequeña diferencia entre el decimal original y la fracción elegida; cuanto más cercano a cero, mejor.",
      },
    ],
  },
} satisfies Record<
  string,
  { title: string; intro: string; sections: HelpSection[] }
>;

export const toolsHelp = {
  metricThread: {
    title: "Rosca métrica",
    intro:
      "Convierte los datos básicos de una rosca métrica a vueltas por milímetro y a su equivalencia aproximada en TPI.",
    sections: [
      {
        title: "Diámetro nominal",
        body: "Es el diámetro con el que se identifica la rosca. Por ejemplo, en M10 × 1,5 el diámetro nominal es 10 mm. No es la medida del fondo de la rosca.",
      },
      {
        title: "Paso",
        body: "Es la distancia axial, en milímetros, entre dos crestas consecutivas. En M10 × 1,5 debes introducir 1,5 mm.",
      },
      {
        title: "Cómo leer el resultado",
        body: "Vueltas por mm indica cuántos hilos caben en un milímetro. El TPI es sólo una conversión aproximada para comparar el paso con roscas imperiales; no convierte una rosca métrica en una imperial compatible.",
      },
    ],
  },
  imperialThread: {
    title: "Rosca imperial",
    intro:
      "Obtiene el paso en pulgadas y milímetros a partir de la cantidad de hilos por pulgada.",
    sections: [
      {
        title: "Diámetro",
        body: "Introduce el diámetro nominal en pulgadas decimales. Por ejemplo, para 1/2 pulgada escribe 0,5.",
      },
      {
        title: "Hilos por pulgada (TPI)",
        body: "Es la cantidad de crestas completas contenidas en una pulgada. Un valor TPI mayor significa un paso más fino.",
      },
      {
        title: "Resultado",
        body: "El paso es la distancia entre dos hilos consecutivos. La conversión a milímetros ayuda a comparar medidas, pero no determina por sí sola la norma ni el perfil de la rosca.",
      },
    ],
  },
  rpm: {
    title: "Calcular RPM",
    intro:
      "Calcula la velocidad de giro necesaria para alcanzar una velocidad de corte determinada sobre un diámetro.",
    sections: [
      {
        title: "Velocidad de corte (Vc)",
        body: "Es la velocidad tangencial recomendada para el material y la herramienta, expresada en metros por minuto. Debe obtenerse de una tabla fiable del fabricante o del proceso.",
      },
      {
        title: "Diámetro",
        body: "Introduce en milímetros el diámetro efectivo donde ocurre el corte: diámetro de la pieza en torneado o de la herramienta en fresado/taladrado.",
      },
      {
        title: "Uso seguro",
        body: "El resultado es teórico. Selecciona una velocidad disponible en la máquina y respeta los límites del husillo, la sujeción, la herramienta y el material.",
      },
    ],
  },
  cuttingSpeed: {
    title: "Calcular velocidad de corte",
    intro:
      "Obtiene la velocidad tangencial producida por unas RPM y un diámetro conocidos.",
    sections: [
      {
        title: "RPM",
        body: "Son las revoluciones completas por minuto del husillo o de la pieza.",
      },
      {
        title: "Diámetro",
        body: "Introduce el diámetro efectivo de corte en milímetros. Si el diámetro cambia durante la operación, la velocidad de corte también cambia.",
      },
      {
        title: "Resultado",
        body: "La velocidad se muestra en m/min. Compárala con la recomendación del fabricante para evitar desgaste, calentamiento o rotura de la herramienta.",
      },
    ],
  },
  feed: {
    title: "Avance de fresado",
    intro:
      "Calcula cuánto debe avanzar la mesa por minuto para mantener el avance indicado en cada diente.",
    sections: [
      {
        title: "Avance por diente (fz)",
        body: "Es el espesor de viruta previsto para cada diente, en milímetros por diente. Usa el valor recomendado para la herramienta, el material y la rigidez del montaje.",
      },
      {
        title: "Dientes de la fresa",
        body: "Introduce solamente la cantidad de filos que realmente participan en el corte, no el número de dientes del engranaje que se está fabricando.",
      },
      {
        title: "RPM y resultado",
        body: "Las RPM son la velocidad del husillo. El resultado Vf se expresa en mm/min y corresponde al avance de la mesa o del eje programado.",
      },
    ],
  },
  triangle: {
    title: "Triángulo rectángulo",
    intro:
      "Resuelve los lados y el ángulo agudo de un triángulo que tiene un ángulo recto de 90°.",
    sections: [
      {
        title: "Qué datos introducir",
        body: "Escribe exactamente dos lados y deja vacío el tercero. Ambos catetos forman el ángulo recto; la hipotenusa está enfrente de los 90° y siempre es el lado más largo.",
      },
      {
        title: "Opuesto y adyacente",
        body: "El cateto opuesto queda frente al ángulo calculado. El adyacente toca ese ángulo. Si intercambias ambos, obtendrás el otro ángulo agudo.",
      },
      {
        title: "Resultado",
        body: "La aplicación calcula el lado faltante y el ángulo entre el cateto adyacente y la hipotenusa. Usa las mismas unidades para todos los lados.",
      },
    ],
  },
} satisfies Record<
  string,
  { title: string; intro: string; sections: HelpSection[] }
>;
