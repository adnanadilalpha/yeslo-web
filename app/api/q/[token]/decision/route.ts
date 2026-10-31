import { cookies } from "next/headers";
import { apiError, json, readJson } from "@/lib/api/http";
import { fixtureQuote, isDemoToken, parseDecisionCookie } from "@/lib/quotes/fixtures";
import { decisionPayload, recordLiveDecision } from "@/lib/quotes/live";
import { clientIp, parseComment, parseSignerName } from "@/lib/quotes/state";
import type { DecisionRecord } from "@/lib/quotes/types";

const COOKIE = "yeslo_demo_decision";

export async function POST(request: Request, context: { params: Promise<{ token: string }> }) {
  const { token } = await context.params;
  const body = await readJson(request);
  if (!body) return apiError("invalid", "Send a JSON body.", 400);
  if (body.agreed !== true) {
    return apiError("invalid", "Tick the box to record your decision.", 400);
  }
  const signerName = parseSignerName(body.signerName);
  if (!signerName) {
    return apiError("invalid", "Enter your first and last name.", 400);
  }
  const intent = body.intent === "changes" ? "changes" : body.intent === "approve" ? "approve" : null;
  if (!intent) return apiError("invalid", "Choose approve or request changes.", 400);
  const comment = parseComment(body.comment, intent === "changes");
  if (comment == null) {
    return apiError("invalid", "Tell them what you want changed.", 400);
  }

  const headerList = request.headers;
  const now = new Date();
  const decision: DecisionRecord = {
    intent: intent === "approve" ? "approved" : "changes_requested",
    signerName,
    comment,
    decidedAt: now.toISOString(),
    ip: clientIp(headerList),
    userAgent: (headerList.get("user-agent") ?? "").slice(0, 400),
  };

  if (token === "demo") {
    const jar = await cookies();
    const existing = parseDecisionCookie(jar.get(COOKIE)?.value);
    if (existing) {
      return json(
        { error: { code: "closed", message: "This sample already has a decision. Reset it to try again." }, ...decisionPayload(existing, existing.intent === "approved" ? "approved" : "changes_requested") },
        409,
      );
    }
    jar.set(COOKIE, JSON.stringify(decision), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/q/demo",
      maxAge: 60 * 60 * 24 * 14,
    });
    return json(decisionPayload(decision, decision.intent === "approved" ? "approved" : "changes_requested"));
  }

  if (isDemoToken(token)) {
    const fixture = fixtureQuote(token, now, null);
    return json(
      {
        error: {
          code: "closed",
          message: "This sample link is read-only. Open the live sample to approve or request changes.",
        },
        phase: fixture?.phase ?? "closed",
      },
      409,
    );
  }

  const result = await recordLiveDecision({
    token,
    intent,
    signerName,
    comment,
    ip: decision.ip,
    userAgent: decision.userAgent,
    now,
  });
  if (!result.ok) return apiError(result.code, result.message, result.status);
  return json(decisionPayload(result.decision, result.phase));
}

export async function DELETE(_request: Request, context: { params: Promise<{ token: string }> }) {
  const { token } = await context.params;
  if (token !== "demo") return apiError("not_found", "Only the sample quote can be reset.", 404);
  const jar = await cookies();
  jar.set(COOKIE, "", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/q/demo", maxAge: 0 });
  return json({ reset: true });
}
