import { apiError, readJson } from "@/lib/api/http";
import { requireOwner } from "@/lib/api/owner";
import { setQuoteStatus } from "@/lib/api/v1";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const auth = await requireOwner(request);
  if (auth.error) return auth.error;
  const { id } = await context.params;
  const body = await readJson(request);
  if (!body) return apiError("invalid", "Send a JSON body.", 400);
  return setQuoteStatus(auth.owner, id, body);
}
