import { apiError, readJson } from "@/lib/api/http";
import { requireOwner } from "@/lib/api/owner";
import { createClient, listClients } from "@/lib/api/v1";

export async function GET(request: Request) {
  const auth = await requireOwner(request);
  if (auth.error) return auth.error;
  return listClients(auth.owner);
}

export async function POST(request: Request) {
  const auth = await requireOwner(request);
  if (auth.error) return auth.error;
  const body = await readJson(request);
  if (!body) return apiError("invalid", "Send a JSON body.", 400);
  return createClient(auth.owner, body);
}
