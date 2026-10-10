import { test } from "node:test";
import assert from "node:assert/strict";
import { getSiteUrl } from "../../src/lib/site-url";

test("domínio customizado prevalece e remove barra final", () => {
  assert.equal(
    getSiteUrl({
      SITE_URL: "https://loja.example/",
      VERCEL_URL: "deploy.vercel.app",
    }),
    "https://loja.example",
  );
});

test("produção usa domínio estável e preview usa seu deployment", () => {
  const env = {
    VERCEL_PROJECT_PRODUCTION_URL: "loja.example",
    VERCEL_URL: "deploy.vercel.app",
  };
  assert.equal(
    getSiteUrl({ ...env, VERCEL_ENV: "production" }),
    "https://loja.example",
  );
  assert.equal(
    getSiteUrl({ ...env, VERCEL_ENV: "preview" }),
    "https://deploy.vercel.app",
  );
  assert.equal(getSiteUrl({}), "http://localhost:3000");
});
