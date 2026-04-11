const Hues = {
  red: 0,
  orange: 30,
  yellow: 60,
  green: 120,
  blue: 210,
  purple: 270,
};
export type Hue = keyof typeof Hues;

const Saturations = {
  extreme: 100,
  vibrant: 80,
  medium: 60,
  muted: 40,
  faded: 20,
  gone: 0,
};
export type Saturation = keyof typeof Saturations;

const Values = {
  white: 100,
  offwhite: 95,
  lightest: 90,
  lighter: 80,
  light: 60,
  medium: 50,
  dark: 40,
  darker: 20,
  darkest: 10,
  offblack: 5,
  black: 0,
};
export type Value = keyof typeof Values;

interface ColourProps {
  h?: Hue;
  s?: Saturation;
  v?: Value;
}
export const Colour = ({ h, s, v }: ColourProps) => {
  const hue = Hues[h ?? "blue"];
  const sat = Saturations[h === undefined ? "gone" : (s ?? "medium")];
  const val = Values[v ?? "medium"];
  return `hsl(${hue}, ${sat}%, ${val}%)`;
};

export const primary = Colour({ h: "blue" });
export const bgLight = Colour({ h: "blue", s: "faded", v: "offwhite" });
export const bgDark = Colour({ h: "blue", s: "faded", v: "darkest" });
