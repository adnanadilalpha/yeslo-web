import { readJson } from "@/lib/api/http";
import { requireOwner } from "@/lib/api/owner";
import { getBusiness, upsertBusiness } from "@/lib/api/v1";

export async function GET(request: Request) {
  const auth = await requireOwner(request);
  if (auth.error) return auth.error;
  return getBusiness(auth.owner);
}

export async function PUT(request: Request) {
  const auth = await requireOwner(request);
  if (auth.error) return auth.error;
  const body = await readJson(request);
  if (!body) return Response.json({ error: { code: "invalid", message: "Send a JSON body." } }, { status: 400 });
  return upsertBusiness(auth.owner, body);
}
