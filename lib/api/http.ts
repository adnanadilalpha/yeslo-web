export function json(data: unknown, status = 200) {
  return Response.json(data, { status });
}

export function apiError(code: string, message: string, status: number) {
  return json({ error: { code, message } }, status);
}

export async function readJson(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  return body as Record<string, unknown>;
}

export function asString(value: unknown, max: number) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > max) return null;
  return trimmed;
}

export function asOptionalString(value: unknown, max: number) {
  if (value == null || value === "") return null;
  return asString(value, max);
}

export const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isUuid(value: string) {
  return UUID_RE.test(value);
}
