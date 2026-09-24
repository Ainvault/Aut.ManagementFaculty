// Phase H — smoke test: public read APIs + one authenticated admin write.
// Usage:  node scripts/smoke.mjs            (server must already be running)
//         SMOKE_BASE_URL=http://localhost:3000 node scripts/smoke.mjs
//         SMOKE_ADMIN_EMAIL / SMOKE_ADMIN_PASSWORD to override the test admin.
// Exits non-zero on the first failed assertion and leaves no data behind.

const BASE = process.env.SMOKE_BASE_URL ?? "http://localhost:3100";
const ADMIN_EMAIL = process.env.SMOKE_ADMIN_EMAIL ?? "";
const ADMIN_PASSWORD = process.env.SMOKE_ADMIN_PASSWORD ?? "";
const ADMIN_API = `${BASE}/api/admin`;

let failures = 0;
function check(name, ok, detail = "") {
  if (ok) {
    console.log(`  PASS  ${name}`);
  } else {
    failures += 1;
    console.error(`  FAIL  ${name}${detail ? ` — ${detail}` : ""}`);
  }
}

async function readJson(res) {
  const text = await res.text();
  const json = text ? JSON.parse(text) : {};
  return { status: res.status, json };
}

async function main() {
  console.log(`Smoke: ${BASE}`);

  for (const path of ["courses", "programs", "events", "articles"]) {
    const res = await fetch(`${BASE}/api/${path}`);
    const { status, json } = await readJson(res);
    check(`GET /api/${path}`, status === 200 && Array.isArray(json.data), `status=${status}`);
  }

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error("\nSMOKE_ADMIN_EMAIL / SMOKE_ADMIN_PASSWORD are required for the admin write test.");
    process.exitCode = 1;
    return;
  }

  const loginRes = await fetch(`${ADMIN_API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  });
  const { status: loginStatus, json: loginJson } = await readJson(loginRes);
  check("POST /api/admin/login", loginStatus === 200 && loginJson.ok, `status=${loginStatus}`);
  if (loginStatus !== 200) {
    process.exitCode = 1;
    return;
  }

  const setCookie = loginRes.headers.get("set-cookie") ?? "";
  const cookieMatch = setCookie.match(/admin_session=([^;]+)/);
  if (!cookieMatch) {
    check("login set-cookie present", false, "no admin_session cookie header");
    process.exitCode = 1;
    return;
  }
  const cookie = `admin_session=${cookieMatch[1]}`;
  const authHeaders = {
    "Content-Type": "application/json",
    Cookie: cookie,
  };

  const createRes = await fetch(`${ADMIN_API}/stats`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({ value: "1", label: "__smoke_test__" }),
  });
  const { status: createStatus, json: createJson } = await readJson(createRes);
  const statId = createJson?.data?.id ?? "";
  check("POST /api/admin/stats (create)", createStatus === 201 && statId, `status=${createStatus}`);
  if (createStatus !== 201 || !statId) {
    process.exitCode = 1;
    return;
  }

  const delRes = await fetch(`${ADMIN_API}/stats/${statId}`, {
    method: "DELETE",
    headers: authHeaders,
  });
  const { status: delStatus } = await readJson(delRes);
  check(`DELETE /api/admin/stats/${statId}`, delStatus === 200, `status=${delStatus}`);

  console.log(failures === 0 ? "\nSMOKE_OK" : `\nSMOKE_FAIL (${failures})`);
  process.exitCode = failures === 0 ? 0 : 1;
}

await main();