export const dynamic = "force-dynamic";

import { supabase } from "@/lib/supabase";
import { getSupabaseServer } from "@/lib/supabase-server";
import { organisations } from "@/lib/data/organisations";
import { communities } from "@/lib/data/communities";
import { companies } from "@/lib/data/companies";
import { platforms } from "@/lib/data/platforms";
import { StatsSuggestions, type SuggestionItem } from "@/components/StatsSuggestions";
import {
  templates,
  cvAdvice,
  coverLetters,
  apprenticeshipApplicationGuides,
  apprenticeshipGuides,
  interviewPrep,
  psychometricTests,
  assessmentCentre,
  workExperience,
  linkedinPersonalBrand,
  getInspired,
} from "@/lib/data/cv-resources";

export default async function StatsPage() {
  const [{ data: searchRows }, { count: totalSearchCount }, suggestionsResult] =
    await Promise.all([
    supabase
      .from("search_analytics")
      .select("query, results_count")
      .order("created_at", { ascending: false })
      .limit(200),
    supabase.from("search_analytics").select("id", { count: "exact", head: true }),
    (async () => {
      try {
        const serverClient = getSupabaseServer();
        return serverClient.from("suggestions").select("*").order("submitted_at", { ascending: false });
      } catch (err) {
        return {
          data: null,
          error: { message: err instanceof Error ? err.message : "Failed to load suggestions." },
        };
      }
    })(),
  ]);

  const { data: suggestions, error: suggestionsError } = suggestionsResult;
  const isPermissionError =
    suggestionsError != null &&
    "code" in suggestionsError &&
    suggestionsError.code === "42501";
  const suggestionsLoadError = isPermissionError
    ? {
        message:
          "Suggestions are blocked by database permissions. Add SUPABASE_SERVICE_ROLE_KEY to your env, or run scripts/supabase-suggestions-setup.sql in the Supabase SQL editor.",
      }
    : suggestionsError;

  const totalOrgs = organisations.length;
  const totalCommunities = communities.length;
  const totalCompanies = companies.length;
  const totalPlatforms = platforms.length;
  const totalResources =
    templates.length +
    cvAdvice.length +
    coverLetters.length +
    apprenticeshipGuides.length +
    apprenticeshipApplicationGuides.length +
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
  const suggestionsList: SuggestionItem[] = suggestions ?? [];
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
          {suggestionsLoadError ? (
            <p className="text-sm text-red-400">{suggestionsLoadError.message}</p>
          ) : suggestionsList.length === 0 ? (
            <p className="text-sm text-neutral-500">No suggestions yet.</p>
          ) : (
            <StatsSuggestions suggestions={suggestionsList} />
          )}
        </div>
      </section>
    </div>
  );
}
