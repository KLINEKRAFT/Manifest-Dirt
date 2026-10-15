export type Contribution = {
  id: string;
  date: string;
  name: string;
  amount: number;
  note: string;
};
export const campaign = {
  name: "Manifest Dirt",
  eyebrow: "Public territory. A more uncertain tomorrow.",
  declaration: "Help fund the acquisition of presently unowned land.",
  introduction:
    "No parcel has been selected. This is a general fund for future territorial advancement.",
  disclosure:
    "A personal land purchase funded by voluntary contributions. Not a charity, government agency, or collective ownership project.",
  demoMode: false,
  verified: {
    balance: 0,
    goal: null as number | null,
    supporters: 0,
    contributions: [] as Contribution[],
  },
  demo: {
    balance: 18450,
    goal: 80000 as number | null,
    supporters: 126,
    contributions: [
      {
        id: "sample-1",
        date: "Sample",
        name: "Sample supporter A",
        amount: 25,
        note: "For the eventual dirt.",
      },
      {
        id: "sample-2",
        date: "Sample",
        name: "Sample supporter B",
        amount: 10,
        note: "A modest territorial ambition.",
      },
      {
        id: "sample-3",
        date: "Sample",
        name: "Sample supporter C",
        amount: 50,
        note: "Land later.",
      },
    ],
  },
  region: "Oklahoma",
  acreage: "TBD",
  amounts: [5, 10, 25, 50, 100],
  landTypes: [
    {
      title: "Grassland",
      label: "Land type 01",
      description:
        "Open skies. Native grasses. Room for an idea. An illustrative landscape category, not an identified property or listing.",
      image: "/images/oklahoma-landscape.png",
    },
    {
      title: "Wooded acreage",
      label: "Land type 02",
      description:
        "A little shade. A little seclusion. An illustrative land category only; no wooded property has been selected or evaluated.",
      image: "/images/oklahoma-landscape.png",
    },
    {
      title: "Open pasture",
      label: "Land type 03",
      description:
        "A generous horizon and very few plans. An illustrative landscape category, not a property available for purchase.",
      image: "/images/prairie-windmill.png",
    },
  ],
  updates: [
    {
      id: "01",
      title: "Dirt identification remains under review.",
      body: "The ambition is established. The address is not. No parcel has been selected.",
      category: "Editorial bulletin",
    },
    {
      id: "02",
      title: "We are currently between parcels.",
      body: "Specifically, between zero parcels and one potential future parcel. Exploration remains conceptual.",
      category: "Editorial bulletin",
    },
    {
      id: "03",
      title: "The horizon remains a long-term objective.",
      body: "Funding goals, acquisition timing, and a specific property are still to be determined.",
      category: "Editorial bulletin",
    },
  ],
  faqs: [
    [
      "Why are you raising money?",
      "Manifest Dirt is a satirical campaign to support one person’s eventual purchase of land in Oklahoma. Contributions are voluntary personal support.",
    ],
    [
      "Has the land been selected?",
      "No. There is no selected parcel, confirmed acreage, or acquisition timeline. The survey visualization is illustrative, not a property search map.",
    ],
    [
      "Do supporters own any part of the land?",
      "No. Contributions provide no equity, title, mineral rights, ownership rights, financial interest, or promise of a return.",
    ],
    [
      "Is this tax deductible?",
      "This is a personal fundraising project, not a charity. Contributions are not offered as tax-deductible charitable donations.",
    ],
    [
      "What happens if the goal isn’t reached?",
      "To be determined. A funding goal, timeline, and policy for unused funds have not been established. Checkout is not connected and no payments are being accepted.",
    ],
  ],
};
export const funding = campaign.demoMode ? campaign.demo : campaign.verified;
export const currency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
export const fundingPercent =
  funding.goal && funding.goal > 0
    ? Math.min(100, Math.max(0, (funding.balance / funding.goal) * 100))
    : null;
