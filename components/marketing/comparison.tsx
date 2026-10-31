import { Reveal } from "@/components/marketing/reveal";
import { Shell } from "@/components/layout/shell";
import { comparison } from "@/lib/content";
import { cn } from "cn";

export function Comparison() {
  return (
    <section className="py-24 lg:py-32">
      <Shell>
        <Reveal>
          <p className="text-sm font-semibold text-yes">Compared with the usual options</p>
          <h2 className="mt-4 font-heading text-[clamp(2.2rem,4.5vw,3.75rem)] leading-[1.02] font-bold tracking-[-0.045em]">
            Less portal. More <span className="ital-yes">yes</span>.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-12 overflow-x-auto rounded-[2rem] glass-panel p-2 sm:p-4">
            <table className="w-full min-w-180 border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-4 pr-4 font-normal text-muted-foreground"> </th>
                  {comparison.columns.map((column, index) => (
                    <th key={column} className={cn("px-4 py-4 font-semibold tracking-tight", index === 2 && "text-yes")}>
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row) => (
                  <tr key={row.label} className="border-b border-border/70 last:border-0">
                    <th className="py-4 pr-4 font-medium">{row.label}</th>
                    {row.values.map((value, index) => (
                      <td key={value} className={cn("px-4 py-4 text-muted-foreground", index === 2 && "font-medium text-foreground")}>
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Shell>
    </section>
  );
}
