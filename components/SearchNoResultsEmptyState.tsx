import { SearchEmptyState } from "@/components/EmptyState";

export function SearchNoResultsEmptyState({
  onClearSearchAndFilters,
}: {
  onClearSearchAndFilters: () => void;
}) {
  return (
    <SearchEmptyState
      title="No results found"
      subtitle="Try a different search or clear the filter"
      onClear={onClearSearchAndFilters}
    />
  );
}
