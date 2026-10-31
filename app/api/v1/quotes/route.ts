import { apiError, readJson } from "@/lib/api/http";
import { requireOwner } from "@/lib/api/owner";
import { createQuote } from "@/lib/api/v1";

export async function POST(request: Request) {
  const auth = await requireOwner(request);
  if (auth.error) return auth.error;
  const body = await readJson(request);
  if (!body) return apiError("invalid", "Send a JSON body.", 400);
  return createQuote(auth.owner, body);
}
