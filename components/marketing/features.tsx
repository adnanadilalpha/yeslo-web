import { Shell } from "@/components/layout/shell";

const crops = [
  {
    kicker: "01",
    title: "The total is the whole argument.",
    body: "Subtotal and the number they are agreeing to. Nothing else competes with it.",
    crop: (
      <div className="crop-card">
        <p><span>Subtotal</span><span>$5,800.00</span></p>
        <p className="crop-total"><span>Total</span><span>$5,800.00</span></p>
      </div>
    ),
  },
  {
    kicker: "02",
    title: "A name, then the mark.",
    body: "Sarah types her name. The Signature Y is the yes. It is a record, not legal advice.",
    crop: (
      <div className="crop-card crop-sign">
        <p className="text-sm text-[#5B6172]">Signed</p>
        <p className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Sarah Okafor</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/yeslo-mark-green.svg" alt="" className="mt-4 h-16 w-auto" />
      </div>
    ),
  },
  {
    kicker: "03",
    title: "Paid, on the same page.",
    body: "The invoice uses the approved lines. You mark it paid when the money lands.",
    crop: (
      <div className="crop-card crop-paid">
        <p className="font-mono text-[11px] tracking-[0.16em] text-[#5B6172]">INVOICE Q-0142</p>
        <p className="mt-3 text-4xl font-semibold tabular-nums tracking-[-0.04em]">$5,800</p>
        <div className="stamp mt-6 text-[#12805C]">Paid</div>
      </div>
    ),
  },
];

export function Features() {
  return (
    <section className="py-28 lg:py-36">
      <Shell className="space-y-24 lg:space-y-32">
        {crops.map((item, index) => (
          <article key={item.kicker} className={`grid items-center gap-12 lg:grid-cols-12 ${index === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <div className="lg:col-span-5">
              <p className="font-mono text-xs tracking-[0.16em] text-[#5B6172]">{item.kicker}</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] lg:text-5xl">{item.title}</h2>
              <p className="mt-4 max-w-sm text-[17px] leading-7 text-muted-foreground">{item.body}</p>
            </div>
            <div className="lg:col-span-7">{item.crop}</div>
          </article>
        ))}
      </Shell>
    </section>
  );
}
