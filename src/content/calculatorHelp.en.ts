import { HelpSection } from "../components/HelpButton";
type Help = { title: string; intro: string; sections: HelpSection[] };
export const circlesHelpEn: Record<string, Help> = {
  module: {
    title: "Gear module",
    intro: "Finds the standardized size of a gear tooth.",
    sections: [
      {
        title: "Pitch diameter",
        body: "The diameter of an imaginary circle through the area where the teeth mesh. It is not the outside diameter.",
      },
      {
        title: "Number of teeth",
        body: "The total number of teeth around the gear that will be cut or machined.",
      },
      {
        title: "Module result",
        body: "Module describes tooth size in millimeters. Mating gears must use the same module.",
      },
    ],
  },
  pitchDiameter: {
    title: "Pitch diameter",
    intro: "Calculates the imaginary working circle on which two gears mesh.",
    sections: [
      {
        title: "Module",
        body: "The standardized tooth size in millimeters. Mating gears must have the same module.",
      },
      {
        title: "Number of teeth",
        body: "The total number of teeth to be cut or machined around the part.",
      },
      {
        title: "Result",
        body: "This is not the outside diameter measured over the tooth tips. It is used for gear design and center-distance calculations.",
      },
    ],
  },
  outside: {
    title: "Outside diameter",
    intro:
      "Calculates the maximum finished diameter measured over the tooth tips.",
    sections: [
      { title: "Module", body: "The tooth size expressed in millimeters." },
      {
        title: "Number of teeth",
        body: "The total number of teeth on the gear.",
      },
      {
        title: "Workshop use",
        body: "Use this value to prepare or turn the gear blank before cutting the teeth.",
      },
    ],
  },
  pitch: {
    title: "Circular pitch",
    intro: "The distance along the pitch circle from one tooth to the next.",
    sections: [
      {
        title: "Module",
        body: "Enter the standardized tooth size in millimeters.",
      },
      {
        title: "Result",
        body: "Circular pitch is not a straight-line measurement across tooth tips.",
      },
    ],
  },
  fromPitch: {
    title: "Module from pitch",
    intro: "Finds the module when the circular pitch is known.",
    sections: [
      {
        title: "Circular pitch",
        body: "The distance along the pitch circle between equivalent points on consecutive teeth.",
      },
      { title: "Result", body: "The gear module is returned in millimeters." },
    ],
  },
  divider: {
    title: "Dividing head",
    intro:
      "Shows how far to turn the crank to divide a part into equal teeth, slots, splines or faces.",
    sections: [
      {
        title: "Dividing-head ratio",
        body: "The crank turns needed for one spindle revolution. With 40:1, the crank turns 40 times while the work turns once.",
      },
      {
        title: "Number of divisions",
        body: "The number of equal features to machine; enter 24 to cut 24 teeth.",
      },
      {
        title: "Reading the result",
        body: "“1 turn + 10 holes on a 15-hole circle” means one complete turn followed by 10 hole spaces. Approach in the same direction to reduce backlash.",
      },
    ],
  },
};
export const angularDividerHelpEn: Help = {
  title: "Dividing head by angles",
  intro:
    "Shows the exact angular position for every machining operation around the part.",
  sections: [
    {
      title: "Number of divisions",
      body: "The total number of teeth, slots, holes or faces to distribute over one full revolution.",
    },
    {
      title: "Starting angle",
      body: "The position where machining begins. Leave it empty for 0°, or enter 5 to place the first feature at 5°.",
    },
    {
      title: "Angular increment",
      body: "The angle to advance between operations. The list shows every absolute position to set on a graduated rotary table or dividing head.",
    },
  ],
};

export const coneHelpEn: Help = {
  title: "Taper angles",
  intro:
    "Calculates the setup angle needed to machine a taper from two diameters and its axial length.",
  sections: [
    { title: "Major diameter (D)", body: "The measurement at the widest end." },
    {
      title: "Minor diameter (d)",
      body: "The measurement at the narrowest end. It must be smaller than the major diameter.",
    },
    {
      title: "Length (L)",
      body: "The axial distance between the locations where both diameters were measured.",
    },
    {
      title: "Half-angle and included angle",
      body: "The half-angle sets one side relative to the centerline. The included angle is the full opening from side to side.",
    },
  ],
};
export const chordHelpEn: Help = {
  title: "Chord length",
  intro:
    "Calculates the straight center-to-center distance between neighboring holes equally spaced on a circle.",
  sections: [
    {
      title: "Number of holes",
      body: "The total number of holes around the circle.",
    },
    {
      title: "Bolt-circle diameter",
      body: "The diameter of the imaginary circle through every hole center, not the part or hole diameter.",
    },
    {
      title: "Result",
      body: "The straight center-to-center measurement between adjacent holes, which can be checked with calipers.",
    },
  ],
};
export const converterHelpEn: Record<string, Help> = {
  mm: {
    title: "Millimeters to inches",
    intro: "Converts a metric measurement to decimal inches and thousandths.",
    sections: [
      {
        title: "Millimeters",
        body: "Enter the metric measurement using a period or comma.",
      },
      {
        title: "Reading the result",
        body: "One inch equals 25.4 mm and 1000 thousandths.",
      },
    ],
  },
  thou: {
    title: "Thousandths to millimeters",
    intro: "Converts thousandths of an inch to metric measurement.",
    sections: [
      {
        title: "Thousandths",
        body: "These are one-thousandth parts of an inch; 500 equals half an inch.",
      },
      {
        title: "Result",
        body: "The equivalent is shown in millimeters and decimal inches.",
      },
    ],
  },
  fraction: {
    title: "Decimal to fraction",
    intro: "Finds the nearest fractional-inch value.",
    sections: [
      {
        title: "Decimal inches",
        body: "Enter the inch value, for example 0.625.",
      },
      {
        title: "Fraction and error",
        body: "The result is rounded to 1/128 inch. An error closer to zero is a closer match.",
      },
    ],
  },
};
