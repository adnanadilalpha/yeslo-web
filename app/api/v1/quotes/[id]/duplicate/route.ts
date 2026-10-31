import { requireOwner } from "@/lib/api/owner";
import { duplicateQuote } from "@/lib/api/v1";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const auth = await requireOwner(request);
  if (auth.error) return auth.error;
  const { id } = await context.params;
  return duplicateQuote(auth.owner, id);
}
