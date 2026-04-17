import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
export async function logSearch(query: string, page: string, resultsCount: number) {
  if (query.trim().length < 2) return
  await supabase.from('search_analytics').insert({
    query: query.trim().toLowerCase(),
    page,
    results_count: resultsCount
  })
}

export async function logSuggestion(payload: {
  url: string
  description: string
  category: string
}) {
  const { error } = await supabase.from('suggestions').insert({
    url: payload.url,
    description: payload.description,
    category: payload.category
  })
  return { error }
}