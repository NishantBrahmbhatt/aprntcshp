export function voteResourceId(title: string, source: string): string {
  return `${title.trim()}::${source.trim()}`;
}
