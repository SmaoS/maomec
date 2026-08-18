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
} satisfies Record<
  string,
  { title: string; intro: string; sections: HelpSection[] }
>;

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
