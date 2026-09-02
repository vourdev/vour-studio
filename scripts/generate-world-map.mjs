/**
 * Bake the dotted world map into a static asset.
 *
 * `dotted-map` emits roughly fourteen thousand `<circle>` elements, 569 kB of
 * SVG. The map component used to generate that on every render and inline it as
 * a `data:` URI, so /contact shipped a 997 kB HTML document -- the string landed
 * once in the server-rendered `<img src>` and again in the hydration payload --
 * and the library itself rode along in the client bundle.
 *
 * The grid never changes, so it is generated here instead and written to
 * `public/`. Every dot is the same size and colour, so they collapse into one
 * `<path>` of zero-length segments with a round line cap: about eight bytes per
 * dot instead of forty-eight, and one DOM node instead of fourteen thousand.
 *
 * Re-run with `npm run gen:world-map` after changing any parameter below.
 */
import { writeFile } from "node:fs/promises";
import DottedMap from "dotted-map";

/** Kept in step with the values the component used to pass. */
const MAP = { height: 100, grid: "diagonal" };
const DOT = {
  // Sized and weighted for a near-black ground: at radius 0.22 and 25% alpha
  // the grid disappears against #0a0a0a and leaves the arcs floating.
  radius: 0.3,
  // The site renders `forcedTheme="dark"` (see app/layout.tsx), so only the
  // light-on-dark grid is built. Add a second file here if that ever changes.
  color: "#FFFFFF66",
};

const OUT = new URL("../public/world-map.svg", import.meta.url);

const map = new DottedMap(MAP);
const source = map.getSVG({
  ...DOT,
  shape: "circle",
  // Transparent so the grid sits on the page's own ground rather than painting
  // a near-match rectangle over it.
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
