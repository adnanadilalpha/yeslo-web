import "server-only";
import { apiError } from "@/lib/api/http";
import { getUserClient } from "@/lib/supabase";
import type { SupabaseClient, User } from "@supabase/supabase-js";

export type OwnerContext = {
  user: User;
  client: SupabaseClient;
};

export async function requireOwner(request: Request) {
  const header = request.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice("Bearer ".length).trim() : "";
  if (!token) {
    return { error: apiError("unauthorized", "Send the Supabase access token in the Authorization header.", 401) };
  }
  const client = getUserClient(token);
  if (!client) {
    return {
      error: apiError(
        "not_configured",
        "NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required for the app API.",
        503,
      ),
    };
  }
  const { data, error } = await client.auth.getUser(token);
  if (error || !data.user) {
    return { error: apiError("unauthorized", "That session is not valid. Sign in from the Yeslo app and try again.", 401) };
  }
  return { owner: { user: data.user, client } satisfies OwnerContext };
}

export type BusinessRow = {
  id: string;
  owner_user_id: string | null;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  mode: "freelancer" | "trades";
};

export async function ownedBusiness(owner: OwnerContext) {
  const { data, error } = await owner.client
    .from("businesses")
    .select("id, owner_user_id, name, email, phone, address, mode")
    .eq("owner_user_id", owner.user.id)
    .maybeSingle();
  if (error) {
    console.error("ownedBusiness", error.message);
    return { error: apiError("save_failed", "We couldn't load the business on this account.", 500) };
  }
  return { business: (data as BusinessRow | null) ?? null };
}
