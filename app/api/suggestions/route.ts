import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase-server";

const VALID_CATEGORIES = ["Organisation", "Community", "Company", "Resource"] as const;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { url, description, category } = body as {
    url?: string;
    description?: string;
    category?: string;
  };

  if (!url?.trim() || !category) {
    return NextResponse.json({ error: "URL and category are required." }, { status: 400 });
  }

  if (!VALID_CATEGORIES.includes(category as (typeof VALID_CATEGORIES)[number])) {
    return NextResponse.json({ error: "Invalid category." }, { status: 400 });
  }

  try {
    const supabase = getSupabaseServer();
    const { error } = await supabase.from("suggestions").insert({
      url: url.trim(),
      description: description?.trim() ?? "",
      category,
    });

    if (error) {
      const message =
        error.code === "42501"
          ? "Submissions are blocked by database permissions. Add SUPABASE_SERVICE_ROLE_KEY to your env, or run scripts/supabase-suggestions-setup.sql in the Supabase SQL editor."
          : error.message;
      return NextResponse.json({ error: message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to submit suggestion.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
