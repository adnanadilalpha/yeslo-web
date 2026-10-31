import { apiError, asOptionalString, asString, json, readJson } from "@/lib/api/http";
import { getServiceClient } from "@/lib/supabase";

const routes = new Set(["freelancer", "trades", "both"]);

export async function POST(request: Request) {
  const body = await readJson(request);
  if (!body) return apiError("invalid", "Send a JSON body.", 400);
  if (asOptionalString(body.website, 200)) {
    return json({ status: "ok" });
  }
  const emailRaw = asString(body.email, 200);
  if (!emailRaw || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRaw)) {
    return apiError("invalid", "Enter a real email address.", 400);
  }
  const email = emailRaw.toLowerCase();
  const name = asOptionalString(body.name, 80);
  const route = typeof body.route === "string" && routes.has(body.route) ? body.route : "freelancer";
  const source = asOptionalString(body.source, 40) ?? "web";

  const supabase = getServiceClient();
  if (!supabase) {
    return apiError(
      "not_configured",
      "The list isn't connected yet. Email hello@getyeslo.com and we'll add you.",
      503,
    );
  }

  const { error } = await supabase.from("waitlist").insert({ email, name, route, source });
  if (error) {
    if (error.code === "23505") return json({ status: "exists" });
    console.error("waitlist", error.message);
    return apiError("save_failed", "We couldn't add you. Email hello@getyeslo.com and we'll put you on the list.", 500);
  }
  return json({ status: "ok" }, 201);
}
