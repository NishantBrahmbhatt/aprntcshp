export const dynamic = "force-dynamic";

import { supabase } from "@/lib/supabase";
import { organisations } from "@/lib/data/organisations";
import { communities } from "@/lib/data/communities";
import { companies } from "@/lib/data/companies";
import { platforms } from "@/app/find-apprenticeships/page";
import {
  templates,
  cvAdvice,
  coverLetters,
  apprenticeshipGuides,
  interviewPrep,
  psychometricTests,
  assessmentCentre,
  workExperience,
  linkedinPersonalBrand,
  getInspired,
} from "@/lib/data/cv-resources";

export default async function StatsPage() {
  const [{ data: searchRows }, { count: totalSearchCount }, { data: suggestions }] =
    await Promise.all([
    supabase
      .from("search_analytics")
      .select("query, results_count")
      .order("created_at", { ascending: false })
      .limit(200),
    supabase.from("search_analytics").select("id", { count: "exact", head: true }),
    supabase.from("suggestions").select("*").order("submitted_at", { ascending: false }),
  ]);

  const totalOrgs = organisations.length;
  const totalCommunities = communities.length;
  const totalCompanies = companies.length;
  const totalPlatforms = platforms.length;
  const totalResources =
    templates.length +
    cvAdvice.length +
    coverLetters.length +
    apprenticeshipGuides.length +
    interviewPrep.length +
    psychometricTests.length +
    assessmentCentre.length +
    workExperience.length +
    linkedinPersonalBrand.length +
    getInspired.length;
  const totalItems =
    totalOrgs +
    totalCommunities +
    totalCompanies +
    totalPlatforms +
    totalResources;

  const queryCounts = new Map<string, number>();
  if (searchRows) {
    for (const row of searchRows) {
      const q = row.query?.trim();
      if (!q) continue;
      queryCounts.set(q, (queryCounts.get(q) ?? 0) + 1);
    }
  }
  const topQueries = [...queryCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const totalSearches = typeof totalSearchCount === "number" ? totalSearchCount : 0;
  const suggestionsList = suggestions ?? [];
  const suggestionsReceived = suggestionsList.length;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-100 p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-8">Stats</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="rounded-xl border border-[#2a2a2a] bg-[linear-gradient(160deg,#202020_0%,#111_100%)] p-5">
          <p className="text-xs text-neutral-500 uppercase tracking-widest">Total Items</p>
          <p className="text-3xl font-semibold text-white mt-1">{totalItems}</p>
        </div>
        <div className="rounded-xl border border-[#2a2a2a] bg-[linear-gradient(160deg,#202020_0%,#111_100%)] p-5">
          <p className="text-xs text-neutral-500 uppercase tracking-widest">Organisations</p>
          <p className="text-3xl font-semibold text-white mt-1">{totalOrgs}</p>
        </div>
        <div className="rounded-xl border border-[#2a2a2a] bg-[linear-gradient(160deg,#202020_0%,#111_100%)] p-5">
          <p className="text-xs text-neutral-500 uppercase tracking-widest">Communities</p>
          <p className="text-3xl font-semibold text-white mt-1">{totalCommunities}</p>
        </div>
        <div className="rounded-xl border border-[#2a2a2a] bg-[linear-gradient(160deg,#202020_0%,#111_100%)] p-5">
          <p className="text-xs text-neutral-500 uppercase tracking-widest">Companies</p>
          <p className="text-3xl font-semibold text-white mt-1">{totalCompanies}</p>
        </div>
        <div className="rounded-xl border border-[#2a2a2a] bg-[linear-gradient(160deg,#202020_0%,#111_100%)] p-5">
          <p className="text-xs text-neutral-500 uppercase tracking-widest">Platforms</p>
          <p className="text-3xl font-semibold text-white mt-1">{totalPlatforms}</p>
        </div>
        <div className="rounded-xl border border-[#2a2a2a] bg-[linear-gradient(160deg,#202020_0%,#111_100%)] p-5">
          <p className="text-xs text-neutral-500 uppercase tracking-widest">Resources</p>
          <p className="text-3xl font-semibold text-white mt-1">{totalResources}</p>
        </div>
        <div className="rounded-xl border border-[#2a2a2a] bg-[linear-gradient(160deg,#202020_0%,#111_100%)] p-5">
          <p className="text-xs text-neutral-500 uppercase tracking-widest">Total Searches</p>
          <p className="text-3xl font-semibold text-white mt-1">{totalSearches}</p>
        </div>
        <div className="rounded-xl border border-[#2a2a2a] bg-[linear-gradient(160deg,#202020_0%,#111_100%)] p-5">
          <p className="text-xs text-neutral-500 uppercase tracking-widest">Suggestions Received</p>
          <p className="text-3xl font-semibold text-white mt-1">{suggestionsReceived}</p>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-neutral-100 mb-4">Top searches</h2>
        <div>
          {topQueries.length === 0 ? (
            <p className="text-sm text-neutral-500">No search data yet.</p>
          ) : (
            topQueries.map(([query, count], rank) => (
              <div
                key={`${query}-${rank}`}
                className="flex justify-between py-2 border-b border-[#1a1a1a] text-sm"
              >
                <span className="text-neutral-200 pr-4">{query}</span>
                <span className="text-neutral-400 shrink-0">{count}</span>
              </div>
            ))
          )}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-neutral-100 mb-4">Recent suggestions</h2>
        <div className="space-y-4">
          {suggestionsList.length === 0 ? (
            <p className="text-sm text-neutral-500">No suggestions yet.</p>
          ) : (
            suggestionsList.map((s) => (
              <div
                key={String(s.id ?? `${s.url}-${s.submitted_at}`)}
                className="rounded-xl border border-[#2a2a2a] bg-[linear-gradient(160deg,#202020_0%,#111_100%)] p-5"
              >
                <p className="text-sm font-medium text-white break-all">{String(s.url ?? "")}</p>
                {s.description ? (
                  <p className="text-sm text-neutral-400 mt-2">{String(s.description)}</p>
                ) : null}
                <div className="flex flex-wrap gap-3 mt-3 text-xs text-neutral-500">
                  {s.category ? (
                    <span className="rounded-full border border-[#2a2a2a] bg-[#1a1a1a] px-2 py-0.5">
                      {String(s.category)}
                    </span>
                  ) : null}
                  {s.submitted_at ? (
                    <span>
                      Submitted{" "}
                      {new Date(String(s.submitted_at)).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  ) : null}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
