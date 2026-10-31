export const storySteps = [
  {
    index: "01",
    title: "Quote",
    kicker: "Build it",
    body: "Lines from the work you already sell, a tax rate, and a note. Duplicate last month’s quote and change two numbers.",
  },
  {
    index: "02",
    title: "Link",
    kicker: "Send it",
    body: "Tap Send and the iOS share sheet does the rest. Your client does not download Yeslo, and they do not make a password.",
  },
  {
    index: "03",
    title: "Yes",
    kicker: "They sign with a name",
    body: "They approve, or they send a change back in their own words. You get a push. It is a record of agreement, not legal advice.",
  },
  {
    index: "04",
    title: "Invoice",
    kicker: "Close the loop",
    body: "Turn the yes into a PDF. Mark it paid when the money lands. Yeslo does not take the payment, so it does not take a cut.",
  },
] as const;

export const faqs = [
  {
    q: "Does my client need the app?",
    a: "No. They open the link in a browser. There is no account, no password, and no app to install. The page shows that one quote and nothing else.",
  },
  {
    q: "Is an approval a contract?",
    a: "It is a record of who agreed, when, and to which version, including the IP address and browser. It is not legal advice, and it may not be a signed contract where you work. Treat it the way you would treat a signed estimate.",
  },
  {
    q: "Can I take payment in Yeslo?",
    a: "Not in v1. You export an invoice PDF and get paid the way you already do: transfer, check, card reader, whatever you use. Yeslo never sees the card.",
  },
  {
    q: "What counts as a sent quote?",
    a: "Tapping Send and creating the link. Drafts and duplicates do not count. The free plan includes 3 sent quotes each month. A change request still counts as one send.",
  },
  {
    q: "What happens when they request changes?",
    a: "You get a push with their note. The quote stays yours to edit. When it is right, send again. The new link replaces the old one, and the earlier note stays in the history.",
  },
  {
    q: "Freelancer or trades?",
    a: "One app, two modes. Proposals for studio work, estimates for job work. Same link, same approval, same path to an invoice. You can switch modes without a second subscription.",
  },
  {
    q: "Where does the data live?",
    a: "In your Yeslo account, on Supabase, with row level security. A client cannot read your tables. The link is a token for that quote, checked on the server.",
  },
  {
    q: "When is it on the App Store?",
    a: "TestFlight first. Join the list and we will write when a beta seat is open. The App Store listing comes after that. There is no store link to tap yet, on purpose.",
  },
] as const;

export const comparison = {
  columns: ["Email a PDF", "A client portal", "Yeslo"],
  rows: [
    { label: "Setup", values: ["None", "A weekend", "An afternoon"] },
    { label: "Client account", values: ["They only read it", "Usually required", "Never"] },
    { label: "A clear yes", values: ["A reply you can lose", "A button behind their login", "Their name on the quote"] },
    { label: "Item library", values: ["Your memory", "Yes, plus the rest of the suite", "Yes, on the phone"] },
    { label: "Invoice", values: ["You rebuild it", "Built in, and they take a cut", "PDF from the approved quote"] },
    { label: "Payments", values: ["Your own", "Theirs", "Yours, outside the app"] },
    { label: "Price", values: ["Free", "Often $30–80 a month", "Free, or $9.99"] },
  ],
} as const;
