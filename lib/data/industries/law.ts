export type LawFirm = {
  name: string;
  description: string;
  /** LegalCheek firm profile (when provided) */
  firmProfileUrl?: string;
  /** LegalCheek solicitor apprenticeship page (when provided) */
  apprenticeshipUrl?: string;
};

export const firms: LawFirm[] = [
  {
    name: "Linklaters",
    description:
      "Magic circle firm known for corporate, finance, and cross-border work, with a solicitor apprenticeship route in London.",
    apprenticeshipUrl:
      "https://www.legalcheek.com/solicitor-apprenticeship/linklaters/",
  },
  {
    name: "Freshfields",
    description:
      "Global Magic Circle firm spanning corporate, disputes, and finance — solicitor apprenticeships based in London.",
    apprenticeshipUrl:
      "https://www.legalcheek.com/solicitor-apprenticeship/freshfields/",
  },
  {
    name: "Clifford Chance",
    description:
      "Magic circle firm with a strong corporate and finance practice and a visible solicitor apprenticeship offering.",
    firmProfileUrl: "https://www.legalcheek.com/firm/clifford-chance/",
  },
  {
    name: "A&O Shearman",
    description:
      "International firm formed from Allen & Overy and Shearman & Sterling, training apprentices across key practice areas.",
    apprenticeshipUrl:
      "https://www.legalcheek.com/solicitor-apprenticeship/ao-shearman/",
  },
  {
    name: "Hogan Lovells",
    description:
      "Global firm with broad sector coverage and solicitor apprenticeship places for aspiring solicitors.",
    apprenticeshipUrl:
      "https://www.legalcheek.com/solicitor-apprenticeship/hogan-lovells/",
  },
  {
    name: "Slaughter & May",
    description:
      "Elite UK firm focused on high-end corporate and finance work, with a solicitor apprenticeship programme.",
    apprenticeshipUrl:
      "https://www.legalcheek.com/solicitor-apprenticeship/slaughter-and-may/",
  },
  {
    name: "Norton Rose Fulbright",
    description:
      "International firm strong in energy, infrastructure, and finance, offering solicitor apprenticeships.",
    apprenticeshipUrl:
      "https://www.legalcheek.com/solicitor-apprenticeship/norton-rose-fulbright/",
  },
  {
    name: "DLA Piper",
    description:
      "Large global firm with a wide range of practices and a dedicated solicitor apprenticeship pathway.",
    apprenticeshipUrl:
      "https://www.legalcheek.com/solicitor-apprenticeship/dla-piper-solicitor-apprenticeship/",
  },
  {
    name: "Ashurst",
    description:
      "International firm known for corporate, finance, and projects — solicitor apprenticeships in London.",
    apprenticeshipUrl:
      "https://www.legalcheek.com/solicitor-apprenticeship/ashurst/",
  },
  {
    name: "Herbert Smith Freehills Kramer",
    description:
      "Combined global practice with strong disputes and corporate teams and solicitor apprenticeship opportunities.",
    apprenticeshipUrl:
      "https://www.legalcheek.com/solicitor-apprenticeship/herbert-smith-freehills-kramer/",
  },
  {
    name: "Pinsent Masons",
    description:
      "Sector-focused international firm with tech and infrastructure strengths and solicitor apprenticeships.",
    apprenticeshipUrl:
      "https://www.legalcheek.com/solicitor-apprenticeship/pinsent-masons/",
  },
  {
    name: "Dentons",
    description:
      "The world’s largest firm by headcount, with a broad UK apprenticeship offering for aspiring solicitors.",
    apprenticeshipUrl:
      "https://www.legalcheek.com/solicitor-apprenticeship/dentons/",
  },
  {
    name: "CMS",
    description:
      "European-heritage international firm with corporate and sector teams and solicitor apprenticeship routes.",
    apprenticeshipUrl: "https://www.legalcheek.com/solicitor-apprenticeship/cms/",
  },
  {
    name: "Mayer Brown",
    description:
      "US-originated global firm with finance, corporate, and disputes practices and solicitor apprenticeships.",
    apprenticeshipUrl:
      "https://www.legalcheek.com/solicitor-apprenticeship/mayer-brown/",
  },
  {
    name: "White & Case",
    description:
      "Global firm with a strong finance and disputes profile and solicitor apprenticeship opportunities in London.",
    apprenticeshipUrl:
      "https://www.legalcheek.com/solicitor-apprenticeship/white-case/",
  },
  {
    name: "Simmons & Simmons",
    description:
      "Sector-focused international firm with life sciences and financial services strengths and apprenticeships.",
    apprenticeshipUrl:
      "https://www.legalcheek.com/solicitor-apprenticeship/simmons-simmons/",
  },
  {
    name: "Bird & Bird",
    description:
      "International firm with strengths in tech, IP, and regulated sectors — solicitor apprenticeship programme.",
    apprenticeshipUrl:
      "https://www.legalcheek.com/solicitor-apprenticeship/bird-bird/",
  },
  {
    name: "Addleshaw Goddard",
    description:
      "National and international firm with corporate and real estate depth and solicitor apprenticeships.",
    apprenticeshipUrl:
      "https://www.legalcheek.com/solicitor-apprenticeship/addleshaw-goddard/",
  },
  {
    name: "Mishcon de Reya",
    description:
      "Independent London firm known for disputes, private wealth, and high-profile work — solicitor apprenticeships.",
    apprenticeshipUrl:
      "https://www.legalcheek.com/solicitor-apprenticeship/mishcon-de-reya/",
  },
];

export const organisations = [
  {
    name: "Aspiring Solicitors",
    description:
      "Supporting aspiring solicitors from underrepresented backgrounds.",
    url: "https://www.aspiringsolicitors.co.uk/",
  },
  {
    name: "SEO London",
    description: "Corporate network supporting diverse talent into law.",
    url: "https://www.linkedin.com/company/seo-london-corporate-law/",
  },
  {
    name: "Legally Apprentice",
    description: "Community for students pursuing legal apprenticeships.",
    url: "https://legallyapprentice.com",
  },
];

export const resources = [
  {
    title: "How to Write a Legal CV",
    source: "Prospects",
    href: "https://www.prospects.ac.uk/jobs-and-work-experience/job-sectors/law-sector/writing-a-legal-cv-and-cover-letter/",
  },
  {
    title: "Work Experience in Law",
    source: "Best Apprenticeships",
    href: "https://www.bestapprenticeships.com/work-experience-law-and-legal/",
  },
  {
    title: "The Solicitor Apprenticeship Most List",
    source: "LegalCheek",
    href: "https://www.legalcheek.com/the-solicitor-apprenticeship-most-list/",
  },
];

export const blogs = [
  {
    name: "LegalCheek",
    description: "News, rankings and guides for the legal profession.",
    url: "https://www.legalcheek.com/",
  },
];
