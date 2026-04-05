import styles from "./SearchNoResultsEmptyState.module.css";

export function SearchNoResultsEmptyState({
  onClearSearchAndFilters,
}: {
  onClearSearchAndFilters: () => void;
}) {
  return (
    <section
      className="flex flex-col items-center justify-center px-4 py-16 sm:py-20 md:py-28"
      aria-live="polite"
    >
      <svg
        className="mb-8 w-[min(220px,70vw)] max-w-[220px]"
        viewBox="0 0 96 88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        aria-hidden
      >
        <rect
          className={`${styles.star} ${styles.star1}`}
          x="6"
          y="10"
          width="2"
          height="2"
          fill="#737373"
        />
        <rect
          className={`${styles.star} ${styles.star2}`}
          x="86"
          y="6"
          width="2"
          height="2"
          fill="#737373"
        />
        <rect
          className={`${styles.star} ${styles.star3}`}
          x="14"
          y="72"
          width="2"
          height="2"
          fill="#737373"
        />
        <rect
          className={`${styles.star} ${styles.star4}`}
          x="82"
          y="68"
          width="2"
          height="2"
          fill="#737373"
        />
        <rect
          className={`${styles.star} ${styles.star5}`}
          x="4"
          y="44"
          width="2"
          height="2"
          fill="#737373"
        />
        <rect
          className={`${styles.star} ${styles.star6}`}
          x="90"
          y="38"
          width="2"
          height="2"
          fill="#737373"
        />
        <rect
          className={`${styles.star} ${styles.star2}`}
          x="22"
          y="4"
          width="2"
          height="2"
          fill="#525252"
        />
        <rect
          className={`${styles.star} ${styles.star5}`}
          x="74"
          y="78"
          width="2"
          height="2"
          fill="#525252"
        />

        <g className={styles.astronautGroup}>
          <rect x="40" y="8" width="16" height="4" fill="#a3a3a3" />
          <rect x="38" y="12" width="20" height="4" fill="#d4d4d4" />
          <rect x="36" y="16" width="24" height="6" fill="#d4d4d4" />
          <rect x="40" y="18" width="16" height="4" fill="#404040" />
          <rect x="36" y="22" width="24" height="4" fill="#d4d4d4" />
          <rect x="34" y="26" width="28" height="4" fill="#d4d4d4" />
          <rect x="32" y="30" width="8" height="10" fill="#d4d4d4" />
          <rect x="56" y="30" width="8" height="10" fill="#d4d4d4" />
          <rect x="30" y="32" width="4" height="8" fill="#a3a3a3" />
          <rect x="62" y="32" width="4" height="8" fill="#a3a3a3" />
          <rect x="38" y="30" width="20" height="14" fill="#e5e5e5" />
          <rect x="40" y="32" width="4" height="4" fill="#737373" />
          <rect x="52" y="32" width="4" height="4" fill="#737373" />
          <rect x="42" y="44" width="12" height="16" fill="#d4d4d4" />
          <rect x="40" y="46" width="4" height="12" fill="#a3a3a3" />
          <rect x="52" y="46" width="4" height="12" fill="#a3a3a3" />
          <rect x="38" y="60" width="6" height="12" fill="#d4d4d4" />
          <rect x="52" y="60" width="6" height="12" fill="#d4d4d4" />
          <rect x="36" y="72" width="10" height="4" fill="#a3a3a3" />
          <rect x="50" y="72" width="10" height="4" fill="#a3a3a3" />
        </g>
      </svg>

      <p className="text-center text-sm sm:text-base text-neutral-500">
        No results found
      </p>
      <p className="mt-2 text-center text-xs sm:text-sm text-neutral-600">
        Try a different search or clear the filter
      </p>
      <button
        type="button"
        onClick={onClearSearchAndFilters}
        className="mt-6 rounded-full border border-[#2a2a2a] bg-[#111] px-4 py-[6px] text-[12px] leading-none text-[#888] transition-colors duration-200 ease hover:text-white"
      >
        Clear search
      </button>
    </section>
  );
}
