import fastifyView from "@fastify/view";
import fastifyStatic from "@fastify/static";
import fastify from "fastify";
import Twig from "twig";
import ejs from "ejs";
// import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";
import process from "node:process";
import fs from "fs";

const app = fastify();
const rootDir = dirname(dirname(import.meta.url)).replace("file:///", "");

Twig.extendFilter("decode", function (value) {
  return JSON.stringify(value);
});
Twig.extendFunction("encode", function (value) {
  return JSON.parse(value);
});

app.register(fastifyView, {
  engine: {
    twig: Twig,
    ejs: ejs,
  },
});

app.register(fastifyStatic, {
  root: join(rootDir, "public"),
});

async function render(res, template, context) {
  let manifest = null;
  const __CONTEXT_PARAMS__ = { ...context };
  // Object.assign(__CONTEXT_PARAMS__, context);
  manifest = fs.readFileSync("public/assets/manifest.json");
  manifest = JSON.parse(manifest);
  context = { ...context, manifest: manifest, __CONTEXT_PARAMS__ };
  console.log(__CONTEXT_PARAMS__);
  res.view(template, context);
}

app.get("/", (req, res) => {
  return render(res, "templates/index.twig", {
    name: "Paul",
    title: "page index",
  });
});

app.get("/:slug", (req, res) => {
  return render(res, "templates/index.twig", {
    name: req.params.slug,
    title: req.params.slug,
  });
});

const start = async () => {
  try {
    await app.listen({ port: 5174 });
    console.log("server start on 5174");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

start();
