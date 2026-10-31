import type { Mode, QuoteLine, QuoteView } from "./types";

export type LibraryItem = Omit<QuoteLine, "id">;

export type ModeSample = {
  mode: Mode;
  business: QuoteView["business"];
  client: QuoteView["client"];
  title: string;
  kind: QuoteView["kind"];
  number: string;
  notes: string;
  items: LibraryItem[];
};

export const samples: Record<Mode, ModeSample> = {
  freelancer: {
    mode: "freelancer",
    business: {
      name: "Harbor Studio",
      email: "mina@harbor.studio",
      address: "Portland, Oregon",
    },
    client: {
      name: "Jordan Hale",
      company: "Northwind Supply",
      email: "jordan@northwind.example",
    },
    title: "Brand and website for the spring line",
    kind: "proposal",
    number: "Q-1048",
    notes:
      "Two rounds of revisions are included. Copywriting is not. Work starts after you approve this proposal.",
    items: [
      {
        name: "Discovery workshop",
        description: "Positioning, audience, and the words the line should own.",
        quantity: 1,
        unit: "week",
        unitPriceCents: 180000,
      },
      {
        name: "Art direction",
        description: "A visual system: type, color, and the rules for using them.",
        quantity: 1,
        unit: "project",
        unitPriceCents: 240000,
      },
      {
        name: "Marketing site",
        description: "Design and build of five pages, ready to edit.",
        quantity: 1,
        unit: "project",
        unitPriceCents: 480000,
      },
      {
        name: "Launch support",
        description: "QA, last revisions, and a handoff call.",
        quantity: 6,
        unit: "hr",
        unitPriceCents: 15000,
      },
    ],
  },
  trades: {
    mode: "trades",
    business: {
      name: "Linden Field Painting",
      email: "jobs@lindenfield.example",
      phone: "(510) 555-0148",
      address: "Oakland, California",
    },
    client: {
      name: "Priya Shah",
      company: "14 Cedar Street",
      email: "priya@cedar.example",
    },
    title: "Interior repaint, main floor",
    kind: "estimate",
    number: "E-221",
    notes:
      "Labor and the materials listed are included. Moving furniture beyond the center of each room is extra. Confirm the color on site before we open a can.",
    items: [
      {
        name: "Walls, two coats",
        description: "Eggshell on the main floor. Color supplied by the owner.",
        quantity: 420,
        unit: "sq ft",
        unitPriceCents: 340,
      },
      {
        name: "Trim and doors",
        description: "Semi-gloss, sanded and caulked.",
        quantity: 14,
        unit: "ea",
        unitPriceCents: 8500,
      },
      {
        name: "Primer",
        description: "Stain-blocking primer for the patched hall.",
        quantity: 4,
        unit: "gal",
        unitPriceCents: 3800,
      },
      {
        name: "Prep and protection",
        description: "Floors, furniture, and patching before paint.",
        quantity: 1,
        unit: "job",
        unitPriceCents: 32000,
      },
    ],
  },
};

export function linesFrom(items: LibraryItem[], ids?: string[]): QuoteLine[] {
  return items.map((item, index) => ({
    ...item,
    id: ids?.[index] ?? `line-${index + 1}`,
  }));
}

export function sampleQuote(mode: Mode, extras?: Partial<QuoteView>): QuoteView {
  const sample = samples[mode];
  return {
    number: sample.number,
    title: sample.title,
    kind: sample.kind,
    mode: sample.mode,
    currency: "USD",
    taxRate: 0,
    notes: sample.notes,
    validUntil: null,
    validityLabel: "Valid for 30 days",
    business: sample.business,
    client: sample.client,
    lines: linesFrom(sample.items.slice(0, 3)),
    status: "sent",
    ...extras,
  };
}
