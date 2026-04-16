import { voteResourceId } from "@/lib/vote-resource-id";
import { organisations } from "@/lib/data/organisations";
import { communities } from "@/lib/data/communities";
import { companies } from "@/lib/data/companies";
import {
  apprenticeshipGuides,
  assessmentCentre,
  coverLetters,
  cvAdvice,
  getInspired,
  interviewPrep,
  linkedinPersonalBrand,
  psychometricTests,
  templates,
  workExperience,
} from "@/lib/data/cv-resources";

export type VoteResourceMeta = {
  name: string;
  href: string;
  categoryLabel: string;
};

function buildVoteResourceLookup(): Map<string, VoteResourceMeta> {
  const map = new Map<string, VoteResourceMeta>();

  for (const org of organisations) {
    map.set(voteResourceId(org.name, org.category), {
      name: org.name,
      href: org.url,
      categoryLabel: "Organisation",
    });
  }

  for (const c of communities) {
    map.set(voteResourceId(c.name, c.description), {
      name: c.name,
      href: c.url,
      categoryLabel: "Community",
    });
  }

  for (const co of companies) {
    map.set(voteResourceId(co.name, co.url), {
      name: co.name,
      href: co.url,
      categoryLabel: "Company",
    });
  }

  for (const t of templates) {
    map.set(voteResourceId(t.name, t.description), {
      name: t.name,
      href: t.href,
      categoryLabel: "Resource",
    });
  }

  const addLinkList = (
    items: readonly { title: string; source: string; href: string }[],
  ) => {
    for (const it of items) {
      map.set(voteResourceId(it.title, it.source), {
        name: it.title,
        href: it.href,
        categoryLabel: "Resource",
      });
    }
  };

  addLinkList(cvAdvice);
  addLinkList(coverLetters);
  addLinkList(apprenticeshipGuides);
  addLinkList(interviewPrep);
  addLinkList(psychometricTests);
  addLinkList(assessmentCentre);
  addLinkList(getInspired);
  addLinkList(workExperience);
  addLinkList(linkedinPersonalBrand);

  return map;
}

/** Maps `votes.resource_id` strings to display metadata (same IDs as `VoteButton` / `voteResourceId`). */
export const voteResourceLookup: ReadonlyMap<string, VoteResourceMeta> =
  buildVoteResourceLookup();
