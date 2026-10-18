export function isDistributorPath(pathname: string) {
  return ["/distribuidora", "/produtos", "/checkout"].some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}
