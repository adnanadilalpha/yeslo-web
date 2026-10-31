import { Shell } from "@/components/layout/shell";
import { comparison } from "@/lib/content";
import { cn } from "cn";

export function Comparison() {
  return (
    <section className="py-20 lg:py-24">
      <Shell>
        <p className="eyebrow text-yes">Compared with the usual options</p>
        <h2 className="display-sm mt-4 max-w-3xl">Less portal. More yes.</h2>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-4 pr-4 font-normal text-muted-foreground"> </th>
                {comparison.columns.map((column, index) => (
                  <th key={column} className={cn("px-4 py-4 font-medium", index === 2 && "text-yes")}>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row) => (
                <tr key={row.label} className="border-b border-border">
                  <th className="py-4 pr-4 font-medium">{row.label}</th>
                  {row.values.map((value, index) => (
                    <td key={value} className={cn("px-4 py-4 text-muted-foreground", index === 2 && "text-foreground")}>
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Shell>
    </section>
  );
}
