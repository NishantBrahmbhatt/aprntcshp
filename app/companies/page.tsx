"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useRegisterSiteSearch } from "@/components/KeyboardShortcutsProvider";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNavbar } from "@/components/SiteNavbar";
import { CopyCardLinkButton } from "@/components/CopyCardLinkButton";
import { NewBadge } from "@/components/NewBadge";
import { VoteButton } from "@/components/VoteButton";
import { SearchEmptyState } from "@/components/EmptyState";
import { voteResourceId } from "@/lib/vote-resource-id";
import { companies } from "@/lib/data/companies";
import { logSearch } from "@/lib/supabase";

const ITEMS_PER_PAGE = 12;

function CompanyLogo({ src, alt }: { src: string; alt: string }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="mt-0.5 h-10 w-10 min-w-10 bg-neutral-800 overflow-hidden" />
    );
  }

  return (
    <div className="mt-0.5 h-10 w-10 min-w-10 bg-neutral-900 flex items-center justify-center overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={56}
        height={56}
        className="w-full h-full object-contain"
        loading="lazy"
        decoding="async"
        onError={() => setErrored(true)}
      />
    </div>
  );
}

function PageHeader() {
  return (
    <section className="pt-8 pb-6">
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-50">
          <span className="inline-block pb-1 bg-[linear-gradient(180deg,#ffffff_0%,#707070_100%)] bg-clip-text [-webkit-background-clip:text] text-transparent [-webkit-text-fill-color:transparent]">
            Companies
          </span>
        </h1>
        <p className="text-sm sm:text-base text-neutral-500 max-w-2xl">
          Explore apprenticeship opportunities at leading UK employers.
        </p>
      </div>
    </section>
  );
}

function CompaniesGrid({
  searchTerm,
  onClearSearch,
  currentPage,
  setCurrentPage,
}: {
  searchTerm: string;
  onClearSearch: () => void;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}) {
  const sorted = [...companies].sort((a, b) =>
    a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
  );

  const trimmedQuery = searchTerm.trim().toLowerCase();
  const filtered = trimmedQuery
    ? sorted.filter((c) => c.name.toLowerCase().includes(trimmedQuery))
    : sorted;

  if (trimmedQuery.length > 0 && filtered.length === 0) {
    return (
      <SearchEmptyState
        title="Nothing found in the library"
        onClear={onClearSearch}
      />
    );
  }

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedItems = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const pageWindowSize = Math.min(5, totalPages);
  const startPage = Math.max(
    1,
    Math.min(
      currentPage - Math.floor(pageWindowSize / 2),
      totalPages - pageWindowSize + 1,
    ),
  );
  const pageNumbers = Array.from({ length: pageWindowSize }, (_, i) => startPage + i);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <section className="space-y-4">
        <div className="grid gap-5 md:grid-cols-2">
        {paginatedItems.map((c) => (
          <div
            key={c.name}
            className="relative overflow-hidden border border-[#2a2a2a] bg-[linear-gradient(160deg,#202020_0%,#111_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.13),_inset_0_0_0_1px_rgba(255,255,255,0.04)] translate-y-0 transition-[transform,box-shadow,border-color] [transition-duration:0.3s,120ms,120ms] [transition-timing-function:ease,cubic-bezier(0.16,1,0.3,1),cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:border-[#383838] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),_inset_0_0_0_1px_rgba(255,255,255,0.06)] p-[14px] md:p-5 text-sm text-neutral-200 flex flex-col gap-3 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[60px] before:bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,transparent_100%)] before:pointer-events-none"
          >
            <NewBadge dateAdded={c.dateAdded} />
            <div className="absolute top-[14px] right-[14px] z-[2] hidden md:block md:top-5 md:right-5">
              <a
                href={c.url}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 text-neutral-500 transition-colors duration-200 ease hover:text-neutral-300"
                aria-label={`Open ${c.name} in new tab`}
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <a
              href={c.url}
              target="_blank"
              rel="noreferrer"
              className="group/link flex w-full min-w-0 items-start gap-4 md:pr-12"
            >
              <div className="flex min-w-0 items-start gap-4">
                <CompanyLogo src={c.logo} alt={c.name} />
                <div className="min-w-0">
                  <h2 className="text-base font-semibold text-neutral-50">
                    {c.name}
                  </h2>
                </div>
              </div>
            </a>
            <div className="flex w-full items-center gap-2">
              <CopyCardLinkButton href={c.url} />
              <div className="ml-auto">
                <VoteButton resourceId={voteResourceId(c.name, c.url)} />
              </div>
            </div>
          </div>
        ))}
        </div>
      </section>
      {totalPages > 1 ? (
        <div className="flex items-center justify-center gap-2 mt-12 mb-4">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => {
              setCurrentPage((p) => p - 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="rounded-xl border border-[#2a2a2a] bg-[#111] px-4 py-2 text-sm text-neutral-400 hover:text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {pageNumbers.map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => goToPage(pageNum)}
              className={`rounded-xl border px-3 py-2 text-sm transition-all duration-200 ${
                pageNum === currentPage
                  ? "border-[#555] bg-[#222] text-white"
                  : "border-[#2a2a2a] bg-transparent text-neutral-500 hover:text-white"
              }`}
            >
              {pageNum}
            </button>
          ))}
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => {
              setCurrentPage((p) => p + 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="rounded-xl border border-[#2a2a2a] bg-[#111] px-4 py-2 text-sm text-neutral-400 hover:text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      ) : null}
    </>
  );
}

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const clearSearch = useCallback(() => setSearchTerm(""), []);
  useRegisterSiteSearch(searchInputRef, clearSearch);

  const searchResultsCount = useMemo(() => {
    const sorted = [...companies].sort((a, b) =>
      a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
    );
    const trimmedQuery = searchTerm.trim().toLowerCase();
    const filtered = trimmedQuery
      ? sorted.filter((company) => company.name.toLowerCase().includes(trimmedQuery))
      : sorted;
    return filtered.length;
  }, [searchTerm]);

  useEffect(() => {
    const trimmedQuery = searchTerm.trim();
    if (trimmedQuery.length < 2) return;

    const timeoutId = window.setTimeout(() => {
      void logSearch(trimmedQuery, "companies", searchResultsCount);
    }, 1000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [searchTerm, searchResultsCount]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-neutral-50">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 pt-5 pb-20">
        <SiteNavbar />
        <div className="flex-1">
          <PageHeader />
          <div className="pb-6">
            <div className="relative w-full max-w-2xl">
              <input
                ref={searchInputRef}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search companies..."
                className={`w-full bg-[#111] border border-[#333] rounded-[8px] py-3 pl-4 text-neutral-100 placeholder:text-[#444] transition-[border-color] duration-300 ease focus:border-[#666] focus:shadow-[0_0_0_1px_#444] focus:outline-none ${searchTerm ? "pr-10" : "pr-4"}`}
              />
              {searchTerm ? (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-0 top-0 flex h-full items-center px-3 text-sm leading-none text-neutral-500 transition-[color] duration-200 ease hover:text-neutral-300"
                >
                  ×
                </button>
              ) : null}
            </div>
          </div>
          <CompaniesGrid
            searchTerm={searchTerm}
            onClearSearch={clearSearch}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <SiteFooter />
      </main>
    </div>
  );
}
