export type WorkExperiencePlatform = {
  title: string;
  description: string;
  href: string;
  note?: string;
};

export type WorkExperienceArticle = {
  title: string;
  source: string;
  href: string;
};

export const workExperiencePlatforms: WorkExperiencePlatform[] = [
  { title: "Creative Dimension Trust", description: "Work experience and programmes in the creative industry.", href: "https://www.thecreativedimension.org/" },
  { title: "RISE Network", description: "Search work experience opportunities across multiple sectors.", href: "https://risenetwork.online/work-experience", note: "Free account needed" },
  { title: "NetworKING", description: "Browse work experience and employment opportunities.", href: "https://www.networkinguk.com/opportunities.php" },
  { title: "Doceo", description: "Opportunity board for work experience and early careers.", href: "https://wearedoceo.com/opportunity-board/" },
  { title: "FuturesForAll", description: "Search work experience and career opportunities for young people.", href: "https://finder.futuresforall.org/opportunity-search" },
  { title: "Uptree", description: "Work experience events and opportunities at top employers.", href: "https://uptree.co/events/" },
  { title: "Best Work Experience for Degree Apprenticeship Applications", description: "Curated tracker focused on high-value work experience for degree apprenticeship candidates.", href: "https://sumptuous-book-021.notion.site/Best-work-experience-for-DEGREE-APPRENTICESHIP-APPLICATIONS-928aea8fa48441df9755d76afef8e470" },
  { title: "WIZE Foundation", description: "Opportunities and resources for young people from underrepresented backgrounds.", href: "https://www.wizefoundation.com/resources/opportunitytracker" },
  { title: "Equity Ed", description: "Work experience and career opportunities focused on equity and inclusion.", href: "https://www.equityed.co.uk/opportunities" },
  { title: "Best Apprenticeships", description: "Browse work experience placements alongside apprenticeship opportunities.", href: "https://www.bestapprenticeships.com/find-apprenticeships/" },
];

export const workExperienceArticles: WorkExperienceArticle[] = [
  { title: "Work Experience in Law", source: "Best Apprenticeships", href: "https://www.bestapprenticeships.com/work-experience-law-and-legal/" },
  { title: "Marketing Work Experience", source: "Best Apprenticeships", href: "https://www.bestapprenticeships.com/marketing-work-experience/" },
  { title: "Work Experience in Media, TV and Film", source: "Best Apprenticeships", href: "https://www.bestapprenticeships.com/work-experience-media-tv-film/" },
  { title: "Work Experience in Software and Coding", source: "Best Apprenticeships", href: "https://www.bestapprenticeships.com/work-experience-software-coding/" },
  { title: "Engineering Work Experience", source: "Best Apprenticeships", href: "https://www.bestapprenticeships.com/engineering-work-experience/" },
  { title: "Work Experience in Finance", source: "Best Apprenticeships", href: "https://www.bestapprenticeships.com/work-experience-finance/" },
  { title: "Year 13 Work Experience Ideas", source: "Best Apprenticeships", href: "https://www.bestapprenticeships.com/year-13-work-experience-ideas/" },
  { title: "Year 12 Work Experience Ideas", source: "Best Apprenticeships", href: "https://www.bestapprenticeships.com/year-12-work-experience-ideas/" },
  { title: "How to Find Work Experience in Year 12", source: "Best Apprenticeships", href: "https://www.bestapprenticeships.com/how-to-find-work-experience-in-year-12/" },
  { title: "Year 11 Work Experience Ideas", source: "Best Apprenticeships", href: "https://www.bestapprenticeships.com/year-11-work-experience-ideas/" },
  { title: "Year 10 Work Experience Ideas", source: "Best Apprenticeships", href: "https://www.bestapprenticeships.com/year-10-work-experience-ideas/" },
  { title: "How to Find Work Experience in Year 10", source: "Best Apprenticeships", href: "https://www.bestapprenticeships.com/how-to-find-work-experience-in-year-10/" },
  { title: "Year 9 Work Experience Ideas", source: "Best Apprenticeships", href: "https://www.bestapprenticeships.com/year-9-work-experience-ideas/" },
  { title: "Virtual Work Experience", source: "Best Apprenticeships", href: "https://www.bestapprenticeships.com/virtual-work-experience/" },
  { title: "Best Work Experience for Degree Apprenticeship Applications", source: "YouTube", href: "https://www.youtube.com/watch?v=nTPb_0Sd3WA" },
];
