import { BACKDROP_OPTIONS, defineExtension, type SeedBackdrop } from "kb-ext-sdk";

/** The backdrop, as both halves name it: its id is `<extension>.<local id>`. */
export const Tide: SeedBackdrop = {
  id: "tide-backdrop.tide",
  label: "Tide",
  credit: "A synthetic sample for kb's plugin install",
  strength: "soft",
  knobs: [
    { kind: "number", id: "speed", label: "Speed", min: 0, max: 2, step: 0.25, default: 1 },
    { kind: "number", id: "hue", label: "Hue", min: 0, max: 360, step: 10, default: 190, unit: "°" },
  ],
};

export const declaration = defineExtension({
  name: "tide-backdrop",
  label: "Tide backdrop",
  declaredOptions: [{ kind: BACKDROP_OPTIONS, options: [Tide] }],
});
