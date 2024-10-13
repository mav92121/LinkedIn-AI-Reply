import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    content_scripts: [
      {
        matches: ["*://*.linkedin.com/*"],
        js: ["content-scripts/content.js"],
      },
    ],
    permissions: ["tabs", "scripting"],
    host_permissions: ["*://*.linkedin.com/*", "http://localhost/*"],
    content_security_policy: {
      extension_pages:
        "script-src 'self' 'wasm-unsafe-eval' http://localhost:3000; object-src 'self';",
      sandbox:
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:3000; sandbox allow-scripts allow-forms allow-popups allow-modals; child-src 'self';",
    },
  },
});
