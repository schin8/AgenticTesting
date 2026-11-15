//https://nitro.unjs.io/config
export default defineNitroConfig({
  preset: "node-server",
  compatibilityDate: "2026-11-15",
  srcDir: "server",
  errorHandler: "~/error-handler",
  routeRules: {
    // Wide-open CORS is fine for now: auth uses JWT in Authorization header, no cookies, CSRF risk low-enough for now
    '/api/**': { cors: true, headers: { 'access-control-allow-methods': '*' } },
  }
});
