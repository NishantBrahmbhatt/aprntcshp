"use client";

type TagFilterPillsProps = {
  tags: string[];
  selectedTag: string | null;
  onChange: (tag: string | null) => void;
};

const activeClass =
  "rounded-full border border-white bg-white px-4 py-1.5 text-[12px] whitespace-nowrap text-black";

const inactiveClass =
  "rounded-full border border-[#2a2a2a] bg-[#111] px-4 py-1.5 text-[12px] whitespace-nowrap text-neutral-500 transition-[transform,background-color,color] duration-300 ease hover:-translate-y-[2px]";

export function TagFilterPills({
  tags,
  selectedTag,
  onChange,
}: TagFilterPillsProps) {
  return (
    <div
      role="toolbar"
      aria-label="Filter by tag"
      className="flex max-w-full flex-nowrap gap-3 overflow-x-auto pb-0.5 [-webkit-scrollbar]:[display:none] md:flex-wrap md:overflow-x-visible"
      style={{ scrollbarWidth: "none" }}
    >
      <button
        type="button"
        className={selectedTag === null ? activeClass : inactiveClass}
        onClick={() => onChange(null)}
        aria-pressed={selectedTag === null}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          className={selectedTag === tag ? activeClass : inactiveClass}
          onClick={() => onChange(tag)}
          aria-pressed={selectedTag === tag}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
