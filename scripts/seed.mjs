import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://kcyfdaqllqjgeexcqzct.supabase.co";
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!key) {
  console.error("Set SUPABASE_SERVICE_ROLE_KEY before seeding. /q/demo still works without a database.");
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const token = "seed-harbor-studio";

const existing = await supabase.from("share_tokens").select("id").eq("token", token).maybeSingle();
if (existing.error) {
  console.error(existing.error.message);
  process.exit(1);
}
if (existing.data) {
  console.log(`Already seeded. Open /q/${token}`);
  process.exit(0);
}

const validUntil = new Date();
validUntil.setUTCDate(validUntil.getUTCDate() + 60);
const validDate = validUntil.toISOString().slice(0, 10);

const business = await supabase
  .from("businesses")
  .insert({
    name: "Harbor Studio",
    email: "mina@harbor.studio",
    address: "Portland, Oregon",
    mode: "freelancer",
  })
  .select("id")
  .single();
if (business.error || !business.data) {
  console.error(business.error?.message ?? "No business id");
  process.exit(1);
}

const client = await supabase
  .from("clients")
  .insert({
    business_id: business.data.id,
    name: "Jordan Hale",
    email: "jordan@northwind.example",
    company: "Northwind Supply",
  })
  .select("id")
  .single();
if (client.error || !client.data) {
  console.error(client.error?.message ?? "No client id");
  process.exit(1);
}

const quote = await supabase
  .from("quotes")
  .insert({
    business_id: business.data.id,
    client_id: client.data.id,
    number: "Q-1048",
    title: "Brand and website for the spring line",
    kind: "proposal",
    status: "sent",
    currency: "USD",
    tax_rate: 0,
    notes: "Two rounds of revisions are included. Copywriting is not. Work starts after you approve this proposal.",
    valid_until: validDate,
    sent_at: new Date().toISOString(),
  })
  .select("id")
  .single();
if (quote.error || !quote.data) {
  console.error(quote.error?.message ?? "No quote id");
  process.exit(1);
}

const lines = await supabase.from("quote_lines").insert([
  {
    quote_id: quote.data.id,
    position: 0,
    name: "Discovery workshop",
    description: "Positioning, audience, and the words the line should own.",
    quantity: 1,
    unit: "week",
    unit_price_cents: 180000,
  },
  {
    quote_id: quote.data.id,
    position: 1,
    name: "Art direction",
    description: "A visual system: type, color, and the rules for using them.",
    quantity: 1,
    unit: "project",
    unit_price_cents: 240000,
  },
  {
    quote_id: quote.data.id,
    position: 2,
    name: "Marketing site",
    description: "Design and build of five pages, ready to edit.",
    quantity: 1,
    unit: "project",
    unit_price_cents: 480000,
  },
  {
    quote_id: quote.data.id,
    position: 3,
    name: "Launch support",
    description: "QA, last revisions, and a handoff call.",
    quantity: 6,
    unit: "hr",
    unit_price_cents: 15000,
  },
]);
if (lines.error) {
  console.error(lines.error.message);
  process.exit(1);
}

const share = await supabase
  .from("share_tokens")
  .insert({
    quote_id: quote.data.id,
    token,
    expires_at: new Date(`${validDate}T23:59:59.999Z`).toISOString(),
  })
  .select("token")
  .single();
if (share.error) {
  console.error(share.error.message);
  process.exit(1);
}

await supabase.from("quote_events").insert({
  quote_id: quote.data.id,
  event_type: "sent",
});

console.log(`Seeded /q/${token}`);
