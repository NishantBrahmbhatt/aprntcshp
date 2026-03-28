export type FinanceResource = {
  title: string;
  source: string;
  href: string;
};

export type FinanceResourceSection = {
  label: string;
  items: FinanceResource[];
};

export const resourceSections: FinanceResourceSection[] = [
  {
    label: "General",
    items: [
      {
        title: "Finance and Accounting Guide",
        source: "UCAS",
        href: "https://www.ucas.com/explore/industry-guides/finance-and-accounting",
      },
      {
        title: "Accountancy Opportunities",
        source: "Get My First Job",
        href: "https://www.getmyfirstjob.co.uk/discover-opportunities/industry-sectors/Accountancy/23",
      },
      {
        title: "Financial Services Apprenticeships",
        source: "Apprenticeship Guide",
        href: "https://apprenticeshipguide.co.uk/apprenticeship-category/industry-sectors/financial-services-apprenticeships/",
      },
    ],
  },
  {
    label: "Finance",
    items: [
      {
        title: "Finance Degree Apprenticeships",
        source: "Best Apprenticeships",
        href: "https://www.bestapprenticeships.com/finance-degree-apprenticeship/",
      },
      {
        title: "Financial Advisor Apprenticeships",
        source: "Best Apprenticeships",
        href: "https://www.bestapprenticeships.com/financial-advisor-apprenticeships",
      },
      {
        title: "Banking Apprenticeships",
        source: "Best Apprenticeships",
        href: "https://www.bestapprenticeships.com/banking-apprenticeships/",
      },
      {
        title: "Skills Needed for a Finance Apprenticeship",
        source: "Success at School",
        href: "https://successatschool.org/advice/apprenticeships/what-skills-do-i-need-for-a-finance-apprenticeship/848",
      },
      {
        title: "Financial Services Opportunities",
        source: "Get My First Job",
        href: "https://www.getmyfirstjob.co.uk/discover-opportunities/industry-sectors/Financial%20Services/24",
      },
    ],
  },
  {
    label: "Accounting",
    items: [
      {
        title: "Accounting Apprenticeships",
        source: "Best Apprenticeships",
        href: "https://www.bestapprenticeships.com/accounting-apprenticeships/",
      },
      {
        title: "5 Reasons to Do an Accountancy Apprenticeship",
        source: "Success at School",
        href: "https://successatschool.org/advice/apprenticeships/5-great-reasons-to-do-an-accountancy-apprenticeship/862",
      },
    ],
  },
  {
    label: "Insurance",
    items: [
      {
        title: "Insurance Opportunities",
        source: "Get My First Job",
        href: "https://www.getmyfirstjob.co.uk/discover-opportunities/industry-sectors/Insurance/47",
      },
    ],
  },
];

export const communities = [
  {
    name: "Investate",
    description:
      "Student-led initiative introducing young people to investing, finance, and related pathways.",
    tags: ["Sector Specific", "Networking", "Events"],
    url: "https://investate.co.uk",
  },
];
