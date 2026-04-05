import styles from "./TagTooltipPill.module.css";

const TAG_TOOLTIPS: Record<string, string> = {
  Resources: "Guides, articles and tools to help you apply",
  "Careers Advice": "Guidance on career paths and decisions",
  Events: "Workshops, networking events and open days",
  Mentorship: "One-to-one support from experienced professionals",
  "Job Board": "Search and apply for apprenticeship vacancies",
  "Free Tools": "Free platforms and tools to support your application",
  Community: "Peer networks and group support",
  "Identity Led": "Community focused on a specific identity or background",
  Networking: "Connect with apprentices and professionals",
  "Sector Specific": "Focused on a particular industry or profession",
  Online: "Primarily operates online",
  "In Person": "Hosts in-person events and meetups",
};

export function TagTooltipPill({ tag }: { tag: string }) {
  const tooltipText = TAG_TOOLTIPS[tag];

  return (
    <span className={styles.wrap}>
      <span className={styles.pill}>{tag}</span>
      {tooltipText != null ? (
        <span className={styles.tooltip} role="tooltip">
          {tooltipText}
        </span>
      ) : null}
    </span>
  );
}
