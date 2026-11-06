/**
 * Bakes the dotted world map into `public/` so it never ships in the page or the client bundle.
 * Every dot collapses into one `<path>` of zero-length round-capped segments.
 * Re-run with `npm run gen:world-map` after changing any parameter below.
 */
import { writeFile } from "node:fs/promises";
import DottedMap from "dotted-map";

const MAP = { height: 100, grid: "diagonal" };
const DOT = {
  // Lower radius or alpha and the grid disappears against #0a0a0a.
  radius: 0.3,
  // Only the light-on-dark grid is built.
  color: "#FFFFFF66",
};

const OUT = new URL("../public/world-map.svg", import.meta.url);

const map = new DottedMap(MAP);
const source = map.getSVG({
  ...DOT,
  shape: "circle",
  backgroundColor: "transparent",
});

const viewBox = source.match(/viewBox="([^"]+)"/)?.[1];
if (!viewBox) throw new Error("dotted-map output has no viewBox; check the version");

const dots = [...source.matchAll(/<circle cx="([\d.-]+)" cy="([\d.-]+)"/g)];
if (dots.length === 0) throw new Error("no circles found; dotted-map output shape changed");

// `M x y h0` draws nothing on its own; the round cap is what paints the dot, at
// exactly the diameter of the circle it replaces.
const path = dots.map(([, cx, cy]) => `M${cx} ${cy}h0`).join("");

const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">` +
  `<path d="${path}" stroke="${DOT.color}" stroke-width="${DOT.radius * 2}" ` +
  `stroke-linecap="round" fill="none"/>` +
  `</svg>`;

await writeFile(OUT, svg);

const before = source.length;
const after = svg.length;
console.log(
  `[world-map] ${dots.length} titik | ${Math.round(before / 1024)} kB -> ` +
    `${Math.round(after / 1024)} kB (${Math.round((1 - after / before) * 100)}% lebih kecil)`,
);
