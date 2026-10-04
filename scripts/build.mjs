import { cp, mkdir, rm } from "node:fs/promises";
const project = new URL("../", import.meta.url);
const output = new URL("dist/", project);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const file of [
  "index.html",
  "styles.css",
  "app.js",
  "visuals.js",
  "assets",
]) {
  await cp(new URL(file, project), new URL(file, output), { recursive: true });
}
console.log("Static build ready in dist/");
