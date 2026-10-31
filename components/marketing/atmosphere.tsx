export function Atmosphere({ variant = "field" }: { variant?: "field" | "ink" | "soft" }) {
  if (variant === "ink") {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-yes/15 blur-3xl" />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#f7f4ee_0%,#eef6f1_48%,#e8eef8_100%)] dark:bg-[linear-gradient(180deg,#0a1411_0%,#0d1a16_100%)]" />
      <div className="absolute top-[-10%] right-[5%] h-112 w-md rounded-full bg-[radial-gradient(circle,rgb(199_240_222/55%),transparent_70%)] blur-2xl dark:opacity-30" />
      <div className="absolute bottom-[-15%] left-[10%] h-96 w-96 rounded-full bg-[radial-gradient(circle,rgb(214_226_255/50%),transparent_70%)] blur-2xl dark:opacity-20" />
      <div
        className="absolute inset-0 opacity-40 dark:opacity-20"
        style={{
          backgroundImage: "radial-gradient(rgb(10 18 16 / 12%) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(circle at 50% 25%, black, transparent 75%)",
        }}
      />
    </div>
  );
}
