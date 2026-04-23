import {
  ETA_APPRENTICE_CV_EXAMPLE_HREF,
  TECHACADEMIA_TECHNICAL_CV_HREF,
} from "./shared/cv-template-links";

export type CvResourceType = "Article" | "PDF" | "Video" | "Template" | "Tool";

export const templates = [
  {
    name: "Techacademia Technical CV",
    description: "Clean, technical format suited for tech degree apprenticeships.",
    href: TECHACADEMIA_TECHNICAL_CV_HREF,
    download: true,
    type: "Template" as const,
  },
  {
    name: "Trackr CV Template",
    description: "Simple structured template for general apprenticeship applications.",
    href: "/resources/CV/CV%20Templates/Trackr_CV_Template.docx",
    download: true,
    type: "Template" as const,
  },
  {
    name: "Jake's Resume",
    description: "Minimal LaTeX template, best for tech roles.",
    href: "https://www.overleaf.com/latex/templates/jakes-resume/syzfjbzwjncs",
    external: true,
    dateAdded: "2026-03-01",
    type: "Template" as const,
  },
  {
    name: "Apprentice CV Example",
    description: "Example apprenticeship CV template from Early Talent Academy.",
    href: ETA_APPRENTICE_CV_EXAMPLE_HREF,
    dateAdded: "2026-04-23",
    type: "PDF" as const,
  },
];

export const cvAdvice = [
  {
    title: "How to Write a CV",
    source: "Prospects",
    href: "https://www.prospects.ac.uk/careers-advice/cvs-and-cover-letters/how-to-write-a-cv/",
    type: "Article" as const,
  },
  {
    title: "CV Sections Explained",
    source: "National Careers Service",
    href: "https://nationalcareers.service.gov.uk/careers-advice/cv-sections",
    type: "Article" as const,
  },
  {
    title: "How to Put Together the Perfect CV",
    source: "Gradcracker",
    href: "https://www.gradcracker.com/career-centre/2/cv-and-cover-letters/428/how-to-put-together-the-perfect-cv-and-cover-letter",
    type: "Article" as const,
  },
  {
    title: "How to Write a Great First CV",
    source: "My Great First Job",
    href: "https://www.mygreatfirstjob.com/post/recording-how-write-a-great-first-cv",
    type: "Article" as const,
  },
  {
    title: "How to Write a CV",
    source: "Success at School",
    href: "https://www.successatschool.org/advice/applying-for-jobs/how-to-write-a-cv-updated-for-2024/201",
    type: "Article" as const,
  },
  {
    title: "Example CVs",
    source: "Prospects",
    href: "https://www.prospects.ac.uk/careers-advice/cvs-and-cover-letters/example-cvs/",
    type: "Article" as const,
  },
  {
    title: "How to Write a Winning CV Without a Degree",
    source: "Not Going to Uni",
    href: "https://notgoingtouni.co.uk/blogs/how-to-write-a-winning-cv-and-cover-letter-without-a-degree",
    type: "Article" as const,
  },
  {
    title: "How to Write an Apprenticeship CV",
    source: "Higherin",
    href: "https://higherin.com/careers-advice/application-tips/apprenticeship-cv",
    type: "Article" as const,
  },
  {
    title: "How to Write an Apprenticeship CV",
    source: "Best Apprenticeships",
    href: "https://www.bestapprenticeships.com/apprenticeship-cv/",
    type: "Article" as const,
  },
  {
    title: "Apprenticeship CV Tips",
    source: "Best Apprenticeships",
    href: "https://www.bestapprenticeships.com/apprenticeship-cv-tips/",
    type: "Article" as const,
  },
  {
    title: "CVs, Applications and Interviews",
    source: "My World of Work",
    href: "https://www.myworldofwork.co.uk/cvs-applications-and-interviews",
    type: "Article" as const,
  },
  {
    title: "5 Ways to Improve Your CV",
    source: "Success at School",
    href: "https://successatschool.org/advice/applying-for-jobs/5-ways-to-improve-your-cv/502",
    type: "Article" as const,
  },
  {
    title: "How to Write a CV",
    source: "Success at School",
    href: "https://successatschool.org/advice/applying-for-jobs/how-to-write-a-cv-updated-for-2024/201",
    type: "Article" as const,
  },
  {
    title: "My First CV Template",
    source: "Success at School",
    href: "https://successatschool.org/advice/applying-for-jobs/my-first-cv-template-updated-for-2024/200",
    type: "Article" as const,
  },
  {
    title: "Apprenticeship CV Guide",
    source: "Higherin",
    href: "https://higherin.com/careers-advice/application-tips/apprenticeship-cv",
    type: "Article" as const,
  },
  {
    title: "How to Create a CV",
    source: "King's Trust",
    href: "https://www.kingstrust.org.uk/how-we-can-help/tools-resources/finding-job/how-to-create-cv",
    dateAdded: "2026-03-01",
    type: "Article" as const,
  },
  {
    title: "How To Create a Standout Apprentice CV",
    source: "Early Talent Academy",
    href: "https://earlytalentacademy.co.uk/student/how-to-create-a-standout-cv/",
    dateAdded: "2026-04-23",
    type: "Article" as const,
  },
  {
    title: "How to Get an Apprenticeship When AI Screens Your Application",
    source: "Early Talent Academy",
    href: "https://earlytalentacademy.co.uk/student/how-to-get-an-apprenticeship-when-ai-screens-your-application/",
    dateAdded: "2026-04-23",
    type: "Article" as const,
  },
  {
    title: "CV FAQs",
    source: "Uptree",
    href: "https://uptree.co/cms_documents/134/CV_FAQs_LRWFOOs.pdf",
    type: "PDF" as const,
  },
  {
    title: "CV Writing Guide",
    source: "YouTube",
    href: "https://www.youtube.com/watch?v=mBDZJMTmUc0&list=PLeXiTfgA1iBpr7gd_pqFUgQ-CLDNW9tXi&index=2&pp=iAQB",
    type: "Video" as const,
  },
];

export const coverLetters = [
  {
    title: "How to Write a Cover Letter",
    source: "Prospects",
    href: "https://www.prospects.ac.uk/careers-advice/cvs-and-cover-letters/cover-letters/",
    type: "Article" as const,
  },
  {
    title: "How to Write a Cover Letter",
    source: "National Careers Service",
    href: "https://nationalcareers.service.gov.uk/careers-advice/covering-letter",
    type: "Article" as const,
  },
  {
    title: "How to Write a Personal Statement for Your CV",
    source: "Prospects",
    href: "https://www.prospects.ac.uk/careers-advice/cvs-and-cover-letters/writing-a-personal-statement-for-your-cv/",
    type: "Article" as const,
  },
  {
    title: "How to Write an Apprenticeship Cover Letter",
    source: "Higherin",
    href: "https://higherin.com/careers-advice/application-tips/apprenticeship-cover-letter",
    type: "Article" as const,
  },
  {
    title: "How to Write a Speculative Cover Letter",
    source: "Success at School",
    href: "https://www.successatschool.org/advice/applying-for-jobs/how-to-write-a-speculative-cover-letter/661",
    type: "Article" as const,
  },
  {
    title: "How to Write an Apprenticeship Personal Statement",
    source: "Higherin",
    href: "https://higherin.com/careers-advice/application-tips/apprenticeship-personal-statement",
    type: "Article" as const,
  },
  {
    title: "How to Write an Apprenticeship Personal Statement",
    source: "Best Apprenticeships",
    href: "https://www.bestapprenticeships.com/apprenticeship-personal-statement/",
    type: "Article" as const,
  },
  {
    title: "How Long Should a Cover Letter Be?",
    source: "Success at School",
    href: "https://successatschool.org/advice/applying-for-jobs/how-long-should-a-cover-letter-be/522",
    type: "Article" as const,
  },
  {
    title: "How to Write a Cover Letter",
    source: "Success at School",
    href: "https://successatschool.org/advice/applying-for-jobs/how-to-write-a-cover-letter/275",
    type: "Article" as const,
  },
  {
    title: "Apprenticeship Personal Statement Guide",
    source: "Higherin",
    href: "https://higherin.com/careers-advice/application-tips/apprenticeship-personal-statement",
    type: "Article" as const,
  },
  {
    title: "Apprenticeship Cover Letter Guide",
    source: "Higherin",
    href: "https://higherin.com/careers-advice/application-tips/apprenticeship-cover-letter",
    dateAdded: "2026-03-01",
    type: "Article" as const,
  },
  {
    title: "Cover Letter FAQs",
    source: "Uptree",
    href: "https://uptree.co/cms_documents/135/Cover_letter_FAQs.pdf",
    type: "PDF" as const,
  },
  {
    title: "Cover Letter Guide",
    source: "YouTube",
    href: "https://www.youtube.com/watch?v=e3kXL5gyi0w&list=PLeXiTfgA1iBpr7gd_pqFUgQ-CLDNW9tXi&index=1&t=1s&pp=iAQB",
    type: "Video" as const,
  },
];

export const apprenticeshipGuides = [
  {
    title: "About Apprenticeships",
    source: "Gov.uk",
    href: "https://www.apprenticeships.gov.uk/apprentices/about-apprenticeships#Apprenticeships",
    type: "Article" as const,
  },
  {
    title: "The Apprenticeship Guide",
    source: "Best Apprenticeships",
    href: "https://www.bestapprenticeships.com/apprenticeship-guide/",
    type: "Article" as const,
  },
  {
    title: "What are Degree Apprenticeships?",
    source: "My Great First Job",
    href: "https://www.mygreatfirstjob.com/post/recording-degree-apprenticeships",
    type: "Article" as const,
  },
  {
    title: "Apprenticeships",
    source: "My World of Work",
    href: "https://www.myworldofwork.co.uk/apprenticeships",
    type: "Article" as const,
  },
  {
    title: "What is an Apprenticeship?",
    source: "Success at School",
    href: "https://successatschool.org/advice/apprenticeships/what-is-an-apprenticeship/68",
    type: "Article" as const,
  },
  {
    title: "Degree Apprenticeships — Are They for Me?",
    source: "Success at School",
    href: "https://successatschool.org/advice/apprenticeships/degree-apprenticeships-what-are-they-and-are-they-for-me/582",
    type: "Article" as const,
  },
  {
    title: "Degree Apprenticeships",
    source: "Higherin",
    href: "https://higherin.com/schemes/degree-apprenticeships",
    type: "Article" as const,
  },
  {
    title: "How to Apply for an Apprenticeship",
    source: "Higherin",
    href: "https://higherin.com/careers-advice/application-tips/apply-for-apprenticeship",
    type: "Article" as const,
  },
  {
    title: "Application Toolkit",
    source: "Higherin",
    href: "https://higherin.com/careers-advice/application-tips/application-toolkit",
    type: "Article" as const,
  },
  {
    title: "Apprenticeships for 18 Year Olds",
    source: "Higherin",
    href: "https://higherin.com/careers-advice/exploring-options/apprenticeships-18-year-olds",
    type: "Article" as const,
  },
  {
    title: "Apprenticeships for 16 Year Olds",
    source: "Higherin",
    href: "https://higherin.com/careers-advice/exploring-options/apprenticeships-16-year-olds",
    type: "Article" as const,
  },
  {
    title: "Apprenticeship Application Timeline",
    source: "Higherin",
    href: "https://higherin.com/careers-advice/exploring-options/apprenticeship-application-timeline",
    type: "Article" as const,
  },
  {
    title: "What is an Apprenticeship?",
    source: "UCAS",
    href: "https://www.ucas.com/apprenticeships/what-is-an-apprenticeship",
    type: "Article" as const,
  },
  {
    title: "Degree Apprenticeships",
    source: "UCAS",
    href: "https://www.ucas.com/apprenticeships/degree-apprenticeships",
    type: "Article" as const,
  },
  {
    title: "A Guide to Apprenticeship Applications",
    source: "Apprenticeships.gov.uk",
    href: "https://assets.ctfassets.net/8kbr1n52z8s2/sSy3aWTEOGm6lOdmtTj5x/48fc386261df2d17ef906ebdcd8c02af/PDF-a-guide-to-apprenticeship-applications.pdf",
    dateAdded: "2026-03-01",
    type: "PDF" as const,
  },
  {
    title: "Accredited Apprenticeships: What are they?",
    source: "Early Talent Academy",
    href: "https://earlytalentacademy.co.uk/student/what-are-accredited-apprenticeships/",
    dateAdded: "2026-04-23",
    type: "Article" as const,
  },
  {
    title: "Degree Apprenticeships: Redefining Higher Education",
    source: "Early Talent Academy",
    href: "https://earlytalentacademy.co.uk/student/degree-apprenticeships-redefining-higher-ed/",
    dateAdded: "2026-04-23",
    type: "Article" as const,
  },
  {
    title: "Apprenticeship Levels Explained",
    source: "Early Talent Academy",
    href: "https://earlytalentacademy.co.uk/student/apprenticeships-levels-explained/",
    dateAdded: "2026-04-23",
    type: "Article" as const,
  },
  {
    title: "Why Choose an Apprenticeship?",
    source: "Early Talent Academy",
    href: "https://earlytalentacademy.co.uk/student/why-choose-an-apprenticeship/",
    dateAdded: "2026-04-23",
    type: "Article" as const,
  },
  {
    title: "Apprenticeship Entry Requirements Explained",
    source: "Early Talent Academy",
    href: "https://earlytalentacademy.co.uk/student/apprenticeship-entry-requirements/",
    dateAdded: "2026-04-23",
    type: "Article" as const,
  },
  {
    title: "Apprenticeship Applications Explained",
    source: "Early Talent Academy",
    href: "https://earlytalentacademy.co.uk/student/apprenticeship-applications/",
    dateAdded: "2026-04-23",
    type: "Article" as const,
  },
  {
    title: "Foundation Apprenticeships: Learn Real World Skills",
    source: "Early Talent Academy",
    href: "https://earlytalentacademy.co.uk/student/foundation-apprenticeships-learn-real-world-skills/",
    dateAdded: "2026-04-23",
    type: "Article" as const,
  },
];

export const apprenticeshipApplicationGuides = [
  {
    title: "Degree Apprenticeship Applications Guide",
    source: "YouTube",
    href: "https://www.youtube.com/watch?v=kntUzLRljwI&list=PLeXiTfgA1iBpr7gd_pqFUgQ-CLDNW9tXi&index=3&pp=iAQB",
    type: "Video" as const,
  },
  {
    title: "Application Guide Video 1",
    source: "YouTube",
    href: "https://www.youtube.com/watch?v=XCGLkcI1t3E&list=PLeXiTfgA1iBqQDb2Y05B7waaZnXKsu8kN&index=2&pp=iAQB",
    type: "Video" as const,
  },
  {
    title: "Application Guide Video 2",
    source: "YouTube",
    href: "https://www.youtube.com/watch?v=GXJgFwDLYuY&list=PLeXiTfgA1iBqQDb2Y05B7waaZnXKsu8kN&index=3&pp=iAQB",
    type: "Video" as const,
  },
  {
    title: "Application Guide Video 3",
    source: "YouTube",
    href: "https://www.youtube.com/watch?v=de6BLMEzYvs&list=PLeXiTfgA1iBqQDb2Y05B7waaZnXKsu8kN&index=4&pp=iAQB",
    type: "Video" as const,
  },
  {
    title: "Application Guide Video 4",
    source: "YouTube",
    href: "https://www.youtube.com/watch?v=0XQnpnnt-aY&list=PLeXiTfgA1iBqQDb2Y05B7waaZnXKsu8kN&index=5&pp=iAQB",
    type: "Video" as const,
  },
  {
    title: "Application Guide Video 5",
    source: "YouTube",
    href: "https://www.youtube.com/watch?v=gcKZMLmqUsw&list=PLeXiTfgA1iBqQDb2Y05B7waaZnXKsu8kN&index=6&pp=iAQB",
    type: "Video" as const,
  },
];

export const interviewPrep = [
  {
    title: "A Guide to Apprenticeship Interviews",
    source: "Apprenticeships.gov.uk",
    href: "https://assets.ctfassets.net/8kbr1n52z8s2/16gBmnXLerznk7H2wMGlnN/27293ee12c50a6c2413714674fbaef19/PDF-a-guide-to-apprenticeship-interviews.pdf",
    type: "PDF" as const,
  },
  {
    title: "Apprenticeship Interview Tips",
    source: "Best Apprenticeships",
    href: "https://www.bestapprenticeships.com/apprenticeship-interview/",
    type: "Article" as const,
  },
  {
    title: "5 Key Apprenticeship Interview Questions",
    source: "Success at School",
    href: "https://www.successatschool.org/advice/apprenticeships/5-key-apprenticeship-interview-questions-and-how-to-answer-them/1123",
    type: "Article" as const,
  },
  {
    title: "How to Impress at an Interview",
    source: "Gradcracker",
    href: "https://www.gradcracker.com/career-centre/5/interviews/432/how-to-impress-at-an-interview",
    type: "Article" as const,
  },
  {
    title: "Interview Tips",
    source: "Prospects",
    href: "https://www.prospects.ac.uk/careers-advice/interview-tips",
    type: "Article" as const,
  },
  {
    title: "CVs, Applications and Interviews",
    source: "My World of Work",
    href: "https://www.myworldofwork.co.uk/cvs-applications-and-interviews",
    type: "Article" as const,
  },
  {
    title: "How to Ace Your Apprenticeship Interview",
    source: "Success at School",
    href: "https://successatschool.org/advice/apprenticeships/how-to-ace-your-apprenticeship-interview/445",
    type: "Article" as const,
  },
  {
    title: "How to Answer What Are Your Weaknesses",
    source: "Success at School",
    href: "https://successatschool.org/advice/applying-for-jobs/how-to-answer-what-are-your-weaknesses/637",
    type: "Article" as const,
  },
  {
    title: "Competency Based Interview Questions",
    source: "Success at School",
    href: "https://successatschool.org/advice/applying-for-jobs/how-to-answer-competency-based-interview-questions/629",
    type: "Article" as const,
  },
  {
    title: "Interview Checklist",
    source: "Success at School",
    href: "https://successatschool.org/advice/applying-for-jobs/job-interview-checklist-essential-dos-and-don-ts/165",
    type: "Article" as const,
  },
  {
    title: "Job Interview Techniques",
    source: "Success at School",
    href: "https://successatschool.org/advice/applying-for-jobs/skill-up-using-job-interview-techniques-to-succeed/164",
    type: "Article" as const,
  },
  {
    title: "Apprenticeship Interview Questions",
    source: "Higherin",
    href: "https://higherin.com/careers-advice/interview-tips/apprenticeship-interview-questions",
    type: "Article" as const,
  },
  {
    title: "How to Ace a Video Interview",
    source: "Higherin",
    href: "https://higherin.com/careers-advice/interview-tips/ace-video-interview",
    type: "Article" as const,
  },
  {
    title: "Interview Toolkit",
    source: "Higherin",
    href: "https://higherin.com/careers-advice/interview-tips/interview-toolkit",
    type: "Article" as const,
  },
  {
    title: "Interview Tips",
    source: "King's Trust",
    href: "https://www.kingstrust.org.uk/how-we-can-help/tools-resources/finding-job/interview-tips",
    dateAdded: "2026-03-01",
    type: "Article" as const,
  },
  {
    title: "How to Answer Apprenticeship Interview Questions: Complete Guide",
    source: "Early Talent Academy",
    href: "https://earlytalentacademy.co.uk/student/how-to-answer-apprenticeship-interview-questions-complete-guide/",
    dateAdded: "2026-04-23",
    type: "Article" as const,
  },
  {
    title: "How to Ace your Apprenticeship Interviews",
    source: "Early Talent Academy",
    href: "https://earlytalentacademy.co.uk/student/how-to-apprenticeship-interviews/",
    dateAdded: "2026-04-23",
    type: "Article" as const,
  },
  {
    title: "Interview Guide",
    source: "YouTube",
    href: "https://www.youtube.com/watch?v=kjAXvJcDQZw&list=PLeXiTfgA1iBpr7gd_pqFUgQ-CLDNW9tXi&index=8&pp=iAQB",
    type: "Video" as const,
  },
  {
    title: "Interview Guide Video 2",
    source: "YouTube",
    href: "https://www.youtube.com/watch?v=XHDLIi_CraM&list=PLeXiTfgA1iBqQDb2Y05B7waaZnXKsu8kN&index=1&pp=iAQB0gcJCcMKAYcqIYzv",
    type: "Video" as const,
  },
];

export const psychometricTests = [
  {
    title: "Apprenticeship Aptitude Tests",
    source: "Higherin",
    href: "https://higherin.com/careers-advice/interview-tips/apprenticeship-aptitude-tests",
    type: "Article" as const,
  },
  {
    title: "Psychometric Tests Guide",
    source: "Higherin",
    href: "https://higherin.com/careers-advice/application-tips/psychometric-tests",
    dateAdded: "2026-03-01",
    type: "Article" as const,
  },
];

export const onlineAssessment = [
  {
    title: "Arctic Shores Full Guide",
    source: "YouTube Playlist",
    href: "https://www.youtube.com/playlist?list=PLeXiTfgA1iBryhX3nOIFxeTpII6Udd-wT",
    type: "Video" as const,
  },
];

export const assessmentCentre = [
  {
    title: "Standing Out at Assessment Centres",
    source: "Gradcracker",
    href: "https://www.gradcracker.com/career-centre/6/assessment-centres/433/standing-out-at-assessment-centres",
    type: "Article" as const,
  },
  {
    title: "Virtual Assessment Centres",
    source: "Higherin",
    href: "https://higherin.com/careers-advice/interview-tips/virtual-assessment-centres",
    type: "Article" as const,
  },
  {
    title: "Apprenticeship Assessment Centres",
    source: "Higherin",
    href: "https://higherin.com/careers-advice/interview-tips/apprenticeship-assessment-centres",
    dateAdded: "2026-03-01",
    type: "Article" as const,
  },
  {
    title: "Apprenticeship Assessment Centre Guide: What to Expect and How to Prepare",
    source: "Early Talent Academy",
    href: "https://earlytalentacademy.co.uk/student/apprenticeship-assessment-centre-guide-what-to-expect-and-how-to-prepare/",
    dateAdded: "2026-04-23",
    type: "Article" as const,
  },
];

export const getInspired = [
  {
    title: "Apprenticeship Blogs",
    source: "Placer Apprenticeships",
    href: "https://apprenticeships.placer.co.uk/blog",
    type: "Article" as const,
  },
  {
    title: "Apprentice Story Films",
    source: "Amazing Apprenticeships",
    href: "https://www.amazingapprenticeships.com/apprentice-story-films/",
    type: "Article" as const,
  },
  {
    title: "Apprenticeship Success Stories",
    source: "Higherin",
    href: "https://higherin.com/careers-advice/working-life/apprenticeship-success-stories",
    type: "Article" as const,
  },
  {
    title: "Real Stories",
    source: "Gov.uk",
    href: "https://www.apprenticeships.gov.uk/apprentices/real-stories",
    type: "Article" as const,
  },
  {
    title: "Case Studies",
    source: "Not Going to Uni",
    href: "https://notgoingtouni.co.uk/case-studies#",
    type: "Article" as const,
  },
  {
    title: "Apprentice Stories",
    source: "Apprenticeships.scot",
    href: "https://www.apprenticeships.scot/apprentice-stories/",
    type: "Article" as const,
  },
  {
    title: "Success Stories",
    source: "Apprenticeship Guide",
    href: "https://apprenticeshipguide.co.uk/success-overview/",
    dateAdded: "2026-03-01",
    type: "Article" as const,
  },
  {
    title: "My Degree Apprenticeship Experience: What to Expect",
    source: "Early Talent Academy",
    href: "https://earlytalentacademy.co.uk/student/my-degree-apprenticeship-experience-what-to-expect/",
    dateAdded: "2026-04-23",
    type: "Article" as const,
  },
];

export const apprenticeshipsVsUniversity = [
  {
    title: "Future-Proof Skills: Why Apprenticeships are the Smart Choice",
    source: "Early Talent Academy",
    href: "https://earlytalentacademy.co.uk/student/future-proof-skills/",
    dateAdded: "2026-04-23",
    type: "Article" as const,
  },
  {
    title: "Do You Recognise the Amazing Value of an Apprenticeship?",
    source: "Early Talent Academy",
    href: "https://earlytalentacademy.co.uk/student/the-value-of-an-apprenticeship/",
    dateAdded: "2026-04-23",
    type: "Article" as const,
  },
  {
    title: "Degree Apprenticeships: A University Alternative?",
    source: "Early Talent Academy",
    href: "https://earlytalentacademy.co.uk/student/degree-apprenticeships-a-university-alternative/",
    dateAdded: "2026-04-23",
    type: "Article" as const,
  },
];

export const workExperience = [
  {
    title: "Work Experience Ideas for Year 11",
    source: "Best Apprenticeships",
    href: "https://www.bestapprenticeships.com/year-11-work-experience-ideas/",
    type: "Article" as const,
  },
  {
    title: "Work Experience Ideas for Year 12",
    source: "Best Apprenticeships",
    href: "https://www.bestapprenticeships.com/how-to-find-work-experience-in-year-12/",
    type: "Article" as const,
  },
  {
    title: "Work Experience Ideas for Year 13",
    source: "Best Apprenticeships",
    href: "https://www.bestapprenticeships.com/year-13-work-experience-ideas/",
    type: "Article" as const,
  },
  {
    title: "Work Experience in Law",
    source: "Best Apprenticeships",
    href: "https://www.bestapprenticeships.com/work-experience-law-and-legal/",
    type: "Article" as const,
  },
  {
    title: "Work Experience in Finance",
    source: "Best Apprenticeships",
    href: "https://www.bestapprenticeships.com/work-experience-finance/",
    type: "Article" as const,
  },
  {
    title: "Work Experience Opportunities",
    source: "Uptree",
    href: "https://uptree.co/events/",
    dateAdded: "2026-03-01",
    type: "Tool" as const,
  },
  {
    title: "Work Experience Guide",
    source: "YouTube",
    href: "https://www.youtube.com/watch?v=i3I5yBTdWio&list=PLeXiTfgA1iBpr7gd_pqFUgQ-CLDNW9tXi&index=12&pp=iAQB",
    type: "Video" as const,
  },
  {
    title: "Work Experience Advice",
    source: "YouTube",
    href: "https://www.youtube.com/watch?v=tUdQDC6t5sI&list=PLeXiTfgA1iBp1EArtqGlKy5oUpQlCdCxZ&index=4&pp=iAQB",
    type: "Video" as const,
  },
];

export const linkedinPersonalBrand = [
  {
    title: "How to Improve Your LinkedIn Profile",
    source: "Prospects",
    href: "https://www.prospects.ac.uk/careers-advice/getting-a-job/how-to-improve-your-linkedin-profile/",
    type: "Article" as const,
  },
  {
    title: "LinkedIn for Students",
    source: "My Great First Job",
    href: "https://www.mygreatfirstjob.com/post/recording-linkedin-for-students",
    type: "Article" as const,
  },
  {
    title: "Do you need LinkedIn for degree apprenticeship applications?",
    source: "Apprenticeship Insider",
    href: "https://www.youtube.com/watch?v=joayKmdrO3s",
    type: "Video" as const,
  },
  {
    title: "How to Develop Your Personal Brand",
    source: "My Great First Job",
    href: "https://www.mygreatfirstjob.com/post/how-to-develop-your-personal-brand-webinar-recording",
    type: "Article" as const,
  },
  {
    title: "Create the Ultimate LinkedIn Profile",
    source: "Higherin",
    href: "https://higherin.com/careers-advice/working-life/create-ultimate-linkedin-profile",
    type: "Article" as const,
  },
  {
    title: "Rock Your LinkedIn Profile",
    source: "LinkedIn Learning",
    href: "https://www.linkedin.com/learning/rock-your-linkedin-profile/connect-to-opportunity-with-linkedin",
    dateAdded: "2026-03-01",
    type: "Tool" as const,
  },
];

export const cvResourcesCount =
  templates.length +
  cvAdvice.length +
  coverLetters.length +
  apprenticeshipGuides.length +
  apprenticeshipApplicationGuides.length +
  interviewPrep.length +
  psychometricTests.length +
  onlineAssessment.length +
  assessmentCentre.length +
  workExperience.length +
  linkedinPersonalBrand.length +
  getInspired.length +
  apprenticeshipsVsUniversity.length;
