import { Shell } from "@/components/layout/shell";

const facts = [
  ["No account", "Your client opens a link. That is the whole login."],
  ["A record", "Name, time, IP address, and browser stay with the decision."],
  ["No payments", "v1 invoices as a PDF. You get paid the way you already do."],
];

export function Facts() {
  return (
    <section className="border-y border-border">
      <Shell className="grid md:grid-cols-3">
        {facts.map(([title, body]) => (
          <div key={title} className="border-border py-8 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0">
            <p className="font-medium tracking-tight">{title}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
          </div>
        ))}
      </Shell>
    </section>
  );
}
