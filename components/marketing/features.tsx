import { Shell } from "@/components/layout/shell";

export function Features() {
  return (
    <section id="details" className="py-14 lg:py-16">
      <Shell className="space-y-14 lg:space-y-16">
        <article className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-mono text-xs tracking-[0.16em] text-[#5B6172]">01</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em]">The number they are agreeing to.</h2>
          </div>
          <div className="crop-sheet lg:col-span-8">
            <div className="crop-sheet-head">
              <span>Q-0142</span>
              <span>12 Nov 2026</span>
            </div>
            <div className="crop-row"><span>Workshop</span><span>1 day</span><b>$1,200.00</b></div>
            <div className="crop-row"><span>Identity system</span><span>1</span><b>$2,400.00</b></div>
            <div className="crop-row"><span>Art direction</span><span>8 hr</span><b>$1,200.00</b></div>
            <div className="crop-row"><span>Guidelines</span><span>12 pp</span><b>$800.00</b></div>
            <div className="crop-row crop-meta"><span>Subtotal</span><b>$5,600.00</b></div>
            <div className="crop-row crop-meta"><span>Tax 10%</span><b>$560.00</b></div>
            <div className="crop-row crop-grand"><span>Total due</span><b>$6,160.00</b></div>
          </div>
        </article>

        <article className="grid items-center gap-8 lg:grid-cols-12">
          <div className="crop-sign lg:col-span-7">
            <p className="font-mono text-[11px] tracking-[0.16em] text-[#5B6172]">DECISION · 31 OCT 2026, 14:02 UTC</p>
            <p className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Sarah Okafor</p>
            <div className="mt-2 h-px bg-[#111426]/15" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/yeslo-mark-green.svg" alt="" className="mt-5 h-20 w-auto" />
            <p className="mt-6 font-mono text-[12px] leading-5 text-[#3E4558]">
              Approved by Sarah Okafor · 31 Oct 2026, 14:02 · IP logged
            </p>
            <p className="mt-1 text-sm text-[#5B6172]">A record of agreement, not legal advice.</p>
          </div>
          <div className="lg:col-span-5">
            <p className="font-mono text-xs tracking-[0.16em] text-[#5B6172]">02</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em]">A name, then the mark.</h2>
            <p className="mt-4 text-[17px] leading-7 text-muted-foreground">The Signature Y is the yes. The time and the network stay with it.</p>
          </div>
        </article>

        <article className="overflow-hidden rounded-[28px] bg-ink text-paper lg:grid lg:grid-cols-12">
          <div className="p-8 lg:col-span-5 lg:p-12">
            <p className="font-mono text-xs tracking-[0.16em] text-[#3FC79A]">03</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em]">Paid, on the same lines.</h2>
            <p className="mt-4 text-[17px] leading-7 text-mist">The invoice does not get rebuilt. You stamp it when the transfer lands.</p>
          </div>
          <div className="bg-[#F7F7F4] p-8 text-[#111426] lg:col-span-7 lg:p-12">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-[11px] tracking-[0.16em] text-[#5B6172]">INVOICE Q-0142</p>
                <p className="mt-2 text-2xl font-semibold">Northwind Studio</p>
                <p className="text-sm text-[#3E4558]">Due 12 Dec 2026 · Sarah Okafor</p>
              </div>
              <div className="stamp stamp-firm text-[#12805C]">Paid</div>
            </div>
            <div className="mt-6 border-t border-[#111426]/10 pt-4 text-sm">
              <div className="flex justify-between py-1"><span>Subtotal</span><span className="tabular-nums">$5,600.00</span></div>
              <div className="flex justify-between py-1"><span>Tax 10%</span><span className="tabular-nums">$560.00</span></div>
              <div className="mt-2 flex justify-between border-t border-[#111426]/10 pt-3 text-lg font-semibold"><span>Total</span><span className="tabular-nums">$6,160.00</span></div>
            </div>
          </div>
        </article>
      </Shell>
    </section>
  );
}
