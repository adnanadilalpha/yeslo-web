import { Reveal } from "@/components/marketing/reveal";
import { Shell } from "@/components/layout/shell";

export function Features() {
  return (
    <section id="details" className="border-t border-[#0a1210]/08 bg-[#f7f4ee] py-20 dark:border-border dark:bg-background lg:py-28">
      <Shell className="space-y-24 lg:space-y-32">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-yes">How a quote becomes money</p>
            <h2 className="mt-4 font-heading text-[clamp(2.2rem,4.5vw,3.75rem)] leading-[1.02] font-bold tracking-[-0.045em] text-foreground">
              Quote becomes a link.
              <br />
              The link becomes a <span className="ital-yes">yes</span>.
              <br />
              The yes becomes an invoice.
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="font-mono text-xs tracking-[0.14em] text-yes">01</p>
              <h3 className="mt-3 font-heading text-3xl font-bold tracking-[-0.04em] text-foreground">The number they are agreeing to.</h3>
              <p className="mt-4 max-w-md text-[17px] leading-7 text-[#3a4842] dark:text-muted-foreground">
                Lines, tax, and a note — the same sheet they will approve, and the same sheet you will invoice.
              </p>
            </div>
            <div className="rounded-[1.75rem] bg-white p-7 text-[#0a1210] shadow-[0_30px_60px_-36px_rgb(7_17_14/35%)] dark:bg-card dark:text-foreground">
              <div className="flex justify-between border-b border-black/8 pb-3 text-sm">
                <span>Q-0142</span>
                <span>12 Nov 2026</span>
              </div>
              {[
                ["Workshop", "1 day", "$1,200.00"],
                ["Identity system", "1", "$2,400.00"],
                ["Art direction", "8 hr", "$1,200.00"],
                ["Guidelines", "12 pp", "$800.00"],
              ].map(([name, qty, price]) => (
                <div key={name} className="flex justify-between gap-4 border-b border-black/6 py-3 text-sm">
                  <span className="flex-1">{name}</span>
                  <span className="text-slate">{qty}</span>
                  <b className="tabular-nums">{price}</b>
                </div>
              ))}
              <div className="mt-3 flex justify-between text-lg font-semibold">
                <span>Total due</span>
                <span className="tabular-nums">$6,160.00</span>
              </div>
            </div>
          </article>
        </Reveal>

        <Reveal>
          <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 rounded-[1.75rem] bg-white p-8 text-[#0a1210] shadow-[0_30px_60px_-36px_rgb(7_17_14/35%)] dark:bg-card dark:text-foreground lg:order-1">
              <p className="font-mono text-[11px] tracking-[0.14em] text-yes">DECISION · 31 OCT 2026, 14:02 UTC</p>
              <p className="mt-4 font-heading text-3xl font-bold tracking-[-0.04em]">Sarah Okafor</p>
              <div className="mt-3 h-px bg-black/10" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/yeslo-mark-green.svg" alt="" className="mt-6 h-16 w-auto" />
              <p className="mt-6 text-sm leading-6 text-[#3a4842]">Approved by Sarah Okafor · IP logged</p>
              <p className="mt-1 text-sm text-slate">A record of agreement, not legal advice.</p>
            </div>
            <div className="order-1 lg:order-2">
              <p className="font-mono text-xs tracking-[0.14em] text-yes">02</p>
              <h3 className="mt-3 font-heading text-3xl font-bold tracking-[-0.04em] text-foreground">
                A name, then the <span className="ital-yes">mark</span>.
              </h3>
              <p className="mt-4 max-w-md text-[17px] leading-7 text-[#3a4842] dark:text-muted-foreground">
                They type their name on the link you sent. The Signature Y is the yes. The time and the network stay with it.
              </p>
            </div>
          </article>
        </Reveal>

        <Reveal>
          <article className="overflow-hidden rounded-[1.75rem] bg-[#0a1210] text-white lg:grid lg:grid-cols-2">
            <div className="p-8 lg:p-12">
              <p className="font-mono text-xs tracking-[0.14em] text-[#7dffa8]">03</p>
              <h3 className="mt-3 font-heading text-3xl font-bold tracking-[-0.04em]">Paid, on the same lines.</h3>
              <p className="mt-4 max-w-md text-[17px] leading-7 text-white/65">
                The invoice does not get rebuilt. Export the PDF from the approved quote, then stamp it when the transfer lands.
              </p>
            </div>
            <div className="bg-[#f7f4ee] p-8 text-[#0a1210] lg:p-12">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[11px] tracking-[0.14em] text-slate">INVOICE Q-0142</p>
                  <p className="mt-2 font-heading text-2xl font-bold">Northwind Studio</p>
                  <p className="text-sm text-slate">Due 12 Dec 2026 · Sarah Okafor</p>
                </div>
                <div className="stamp stamp-firm text-yes">Paid</div>
              </div>
              <div className="mt-6 border-t border-black/10 pt-4 text-sm">
                <div className="flex justify-between py-1"><span>Subtotal</span><span className="tabular-nums">$5,600.00</span></div>
                <div className="flex justify-between py-1"><span>Tax 10%</span><span className="tabular-nums">$560.00</span></div>
                <div className="mt-2 flex justify-between border-t border-black/10 pt-3 text-lg font-semibold"><span>Total</span><span className="tabular-nums">$6,160.00</span></div>
              </div>
            </div>
          </article>
        </Reveal>
      </Shell>
    </section>
  );
}
