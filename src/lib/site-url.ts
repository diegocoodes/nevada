type SiteEnvironment = Readonly<Record<string, string | undefined>>;

export function getSiteUrl(env: SiteEnvironment = process.env): string {
  const domain =
    (env.VERCEL_ENV === "production" && env.VERCEL_PROJECT_PRODUCTION_URL) ||
    env.VERCEL_URL;
  return new URL(
    env.SITE_URL || (domain ? `https://${domain}` : "http://localhost:3000"),
  ).origin;
}
