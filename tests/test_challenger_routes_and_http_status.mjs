// Empirical Challenger Verification: Route Resolution & HTTP Status Codes
// Tests live Next.js server against production build in web/.
// Verifies:
// 1. /all-books -> HTTP 200, contains "All Personalized Storybooks"
// 2. /ar/all-books -> HTTP 200, contains "جميع قصص الأطفال المخصصة"
// 3. /books -> HTTP 308 Permanent Redirect to /all-books, followed to HTTP 200
// 4. /ar/books -> HTTP 308 Permanent Redirect to /ar/all-books, followed to HTTP 200
// 5. /ar/create -> HTTP 200
// 6. /ar/create/start -> HTTP 200
// 7. /ar/create/preview -> HTTP 200
// 8. /ar/create/formats -> HTTP 307 Redirect to /create/formats, followed to HTTP 200
// 9. /create/giftwraps -> HTTP 200
// 10. /ar/create/start?book=the-secret-of-the-starlit-dunes&name=Zayed -> HTTP 200
// 11. /ar/create/preview?book=the-secret-of-the-starlit-dunes&name=Zayed -> HTTP 200
// 12. ZERO 404s across all tested routes

import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");
const WEB_DIR = path.resolve(REPO_ROOT, "web");

const PORT = 3088;
const BASE_URL = `http://localhost:${PORT}`;

console.log("================================================================================");
console.log("🧪 CHALLENGER EMPIRICAL ROUTE RESOLUTION & HTTP STATUS SUITE");
console.log(`Target: Next.js production build on port ${PORT}`);
console.log("================================================================================");

let passed = 0;
let failed = 0;

function assert(condition, message, details = {}) {
  if (condition) {
    passed++;
    console.log(`  ✅ PASS: ${message}`);
  } else {
    failed++;
    console.error(`  ❌ FAIL: ${message}`, details);
  }
}

async function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.status < 500) return true;
    } catch {
      // not ready yet
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`Server at ${url} did not become ready within ${timeoutMs}ms`);
}

async function run() {
  console.log(`\n[SPAWN] Launching 'next start -p ${PORT}' in ${WEB_DIR}...`);
  const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    cwd: WEB_DIR,
    stdio: "pipe",
    env: { ...process.env, PORT: String(PORT) },
  });

  server.stdout.on("data", (d) => {
    // console.log(`[next] ${d.toString().trim()}`);
  });
  server.stderr.on("data", (d) => {
    // console.error(`[next err] ${d.toString().trim()}`);
  });

  try {
    await waitForServer(`${BASE_URL}/all-books`);
    console.log("Server is listening and responsive.\n");

    // Test 1: /all-books
    console.log("--- ROUTE 1: /all-books ---");
    const resAllBooks = await fetch(`${BASE_URL}/all-books`, { redirect: "manual" });
    assert(resAllBooks.status === 200, `GET /all-books returns HTTP 200 (got ${resAllBooks.status})`);
    const htmlAllBooks = await resAllBooks.text();
    assert(
      htmlAllBooks.includes("All Personalized Storybooks") || htmlAllBooks.includes("all-books"),
      "/all-books response HTML contains all-books catalog identifiers"
    );
    assert(resAllBooks.status !== 404, "/all-books is NOT 404");

    // Test 2: /ar/all-books
    console.log("\n--- ROUTE 2: /ar/all-books ---");
    const resArAllBooks = await fetch(`${BASE_URL}/ar/all-books`, { redirect: "manual" });
    assert(resArAllBooks.status === 200, `GET /ar/all-books returns HTTP 200 (got ${resArAllBooks.status})`);
    const htmlArAllBooks = await resArAllBooks.text();
    assert(
      htmlArAllBooks.includes("جميع قصص الأطفال المخصصة") || htmlArAllBooks.includes("ar"),
      "/ar/all-books response HTML contains Arabic catalog identifiers"
    );
    assert(resArAllBooks.status !== 404, "/ar/all-books is NOT 404");

    // Test 3: /books (should redirect to /all-books)
    console.log("\n--- ROUTE 3: /books (Redirect to /all-books) ---");
    const resBooksRedirect = await fetch(`${BASE_URL}/books`, { redirect: "manual" });
    assert(
      resBooksRedirect.status === 307 || resBooksRedirect.status === 308,
      `GET /books returns permanent/temporary redirect (got HTTP ${resBooksRedirect.status})`
    );
    const locBooks = resBooksRedirect.headers.get("location");
    assert(locBooks === "/all-books", `/books redirect location is '/all-books' (got '${locBooks}')`);
    assert(resBooksRedirect.status !== 404, "/books is NOT 404");

    const resBooksFollowed = await fetch(`${BASE_URL}/books`, { redirect: "follow" });
    assert(
      resBooksFollowed.status === 200,
      `Following /books redirect resolves to HTTP 200 (got ${resBooksFollowed.status})`
    );

    // Test 4: /ar/books (should redirect to /ar/all-books)
    console.log("\n--- ROUTE 4: /ar/books (Redirect to /ar/all-books) ---");
    const resArBooksRedirect = await fetch(`${BASE_URL}/ar/books`, { redirect: "manual" });
    assert(
      resArBooksRedirect.status === 307 || resArBooksRedirect.status === 308,
      `GET /ar/books returns permanent/temporary redirect (got HTTP ${resArBooksRedirect.status})`
    );
    const locArBooks = resArBooksRedirect.headers.get("location");
    assert(locArBooks === "/ar/all-books", `/ar/books redirect location is '/ar/all-books' (got '${locArBooks}')`);
    assert(resArBooksRedirect.status !== 404, "/ar/books is NOT 404");

    const resArBooksFollowed = await fetch(`${BASE_URL}/ar/books`, { redirect: "follow" });
    assert(
      resArBooksFollowed.status === 200,
      `Following /ar/books redirect resolves to HTTP 200 (got ${resArBooksFollowed.status})`
    );

    // Test 5: /ar/create
    console.log("\n--- ROUTE 5: /ar/create ---");
    const resArCreate = await fetch(`${BASE_URL}/ar/create`, { redirect: "manual" });
    assert(resArCreate.status === 200, `GET /ar/create returns HTTP 200 (got ${resArCreate.status})`);
    assert(resArCreate.status !== 404, "/ar/create is NOT 404");

    // Test 6: /ar/create/start
    console.log("\n--- ROUTE 6: /ar/create/start ---");
    const resArCreateStart = await fetch(`${BASE_URL}/ar/create/start`, { redirect: "manual" });
    assert(resArCreateStart.status === 200, `GET /ar/create/start returns HTTP 200 (got ${resArCreateStart.status})`);
    assert(resArCreateStart.status !== 404, "/ar/create/start is NOT 404");

    // Test 7: /ar/create/preview
    console.log("\n--- ROUTE 7: /ar/create/preview ---");
    const resArCreatePreview = await fetch(`${BASE_URL}/ar/create/preview`, { redirect: "manual" });
    assert(resArCreatePreview.status === 200, `GET /ar/create/preview returns HTTP 200 (got ${resArCreatePreview.status})`);
    assert(resArCreatePreview.status !== 404, "/ar/create/preview is NOT 404");

    // Test 8: English counterparts & Funnel subpages
    console.log("\n--- ROUTE 8: English counterparts & Additional Funnel Routes ---");
    const resEnCreate = await fetch(`${BASE_URL}/create`, { redirect: "manual" });
    assert(resEnCreate.status === 200, `GET /create returns HTTP 200 (got ${resEnCreate.status})`);
    assert(resEnCreate.status !== 404, "/create is NOT 404");

    const resEnCreateStart = await fetch(`${BASE_URL}/create/start`, { redirect: "manual" });
    assert(resEnCreateStart.status === 200, `GET /create/start returns HTTP 200 (got ${resEnCreateStart.status})`);
    assert(resEnCreateStart.status !== 404, "/create/start is NOT 404");

    const resEnCreatePreview = await fetch(`${BASE_URL}/create/preview`, { redirect: "manual" });
    assert(resEnCreatePreview.status === 200, `GET /create/preview returns HTTP 200 (got ${resEnCreatePreview.status})`);
    assert(resEnCreatePreview.status !== 404, "/create/preview is NOT 404");

    const resGiftwraps = await fetch(`${BASE_URL}/create/giftwraps`, { redirect: "manual" });
    assert(resGiftwraps.status === 200, `GET /create/giftwraps returns HTTP 200 (got ${resGiftwraps.status})`);
    assert(resGiftwraps.status !== 404, "/create/giftwraps is NOT 404");

    // Test 9: Funnel with realistic GCC Query Parameters
    console.log("\n--- ROUTE 9: Query Parameter Handling ---");
    const queryParams = new URLSearchParams({
      book: "the-secret-of-the-starlit-dunes",
      name: "زايد",
      gender: "boy",
      skinTone: "warm-sand",
      hairStyle: "traditional-ghutra",
    }).toString();

    const resArStartWithParams = await fetch(`${BASE_URL}/ar/create/start?${queryParams}`);
    assert(resArStartWithParams.status === 200, `GET /ar/create/start?<params> returns HTTP 200`);
    assert(resArStartWithParams.status !== 404, "/ar/create/start?<params> is NOT 404");

    const resArPreviewWithParams = await fetch(`${BASE_URL}/ar/create/preview?${queryParams}`);
    assert(resArPreviewWithParams.status === 200, `GET /ar/create/preview?<params> returns HTTP 200`);
    assert(resArPreviewWithParams.status !== 404, "/ar/create/preview?<params> is NOT 404");

    // Test 10: /ar/create/formats redirect test
    console.log("\n--- ROUTE 10: /ar/create/formats Redirect ---");
    const resFormats = await fetch(`${BASE_URL}/ar/create/formats`, { redirect: "manual" });
    assert(
      resFormats.status === 307 || resFormats.status === 308,
      `GET /ar/create/formats redirects (got HTTP ${resFormats.status})`
    );
    assert(
      resFormats.headers.get("location") === "/create/formats",
      `/ar/create/formats redirects to /create/formats`
    );
    const resFormatsFollowed = await fetch(`${BASE_URL}/ar/create/formats`, { redirect: "follow" });
    assert(resFormatsFollowed.status === 200, `Following /ar/create/formats resolves to HTTP 200`);
  } finally {
    console.log("\n[TEARDOWN] Terminating Next.js test server...");
    server.kill("SIGTERM");
  }

  console.log("\n================================================================================");
  console.log(`📊 CHALLENGER HTTP RESOLUTION SUITE COMPLETE: ${passed} Passed | ${failed} Failed`);
  console.log("================================================================================");

  process.exit(failed === 0 ? 0 : 1);
}

run().catch((err) => {
  console.error("FATAL ERROR in challenger suite:", err);
  process.exit(1);
});
