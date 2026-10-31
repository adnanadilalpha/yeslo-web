export const site = {
  name: "Yeslo",
  bundleId: "com.yeslo.app",
  futureDomain: "getyeslo.com",
  supportEmail: "hello@getyeslo.com",
  privacyEmail: "privacy@getyeslo.com",
  legalEmail: "legal@getyeslo.com",
  description:
    "Yeslo is one iOS app for freelancers and trades. Build a quote, send a link, and let your client approve with their name. Then turn the yes into an invoice.",
  shortDescription:
    "Send a quote link. Your client approves with their name. You invoice.",
} as const;

export const nav = [
  { href: "/freelancers", label: "Freelancers" },
  { href: "/trades", label: "Trades" },
  { href: "/pricing", label: "Pricing" },
  { href: "/how-it-works", label: "How it works" },
] as const;

export const footerProduct = [
  { href: "/freelancers", label: "Freelancers" },
  { href: "/trades", label: "Trades" },
  { href: "/pricing", label: "Pricing" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/q/demo", label: "Sample client quote" },
] as const;

export const footerCompany = [
  { href: "/support", label: "Support" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/pricing#join", label: "TestFlight beta" },
] as const;

export function siteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercel = process.env.VERCEL_URL?.trim();
  const candidate = explicit || (vercel ? (vercel.startsWith("http") ? vercel : `https://${vercel}`) : "http://127.0.0.1:43123");
  try {
    return new URL(candidate).origin;
  } catch {
    return "http://127.0.0.1:43123";
  }
}

export function quoteUrl(token: string) {
  return `${siteUrl()}/q/${encodeURIComponent(token)}`;
}

export const themeBoot = `(function(){try{var t=localStorage.getItem("yeslo-theme");var root=document.documentElement;if(t==="light"||t==="dark"){root.classList.toggle("dark",t==="dark");root.classList.toggle("light",t==="light");return;}if(window.matchMedia("(prefers-color-scheme: dark)").matches){root.classList.add("dark");}}catch(e){}})();`;
