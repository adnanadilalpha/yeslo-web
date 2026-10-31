import { requireOwner } from "@/lib/api/owner";
import { getQuote } from "@/lib/api/v1";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const auth = await requireOwner(request);
  if (auth.error) return auth.error;
  const { id } = await context.params;
  return getQuote(auth.owner, id);
}
