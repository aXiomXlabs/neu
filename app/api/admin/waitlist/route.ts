import { createServerSupabaseClient } from "@/lib/supabase"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Basic auth check (in a real app, you would use a more secure authentication method)
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Basic ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const source = searchParams.get("source")
    const search = searchParams.get("search")
    const sortBy = searchParams.get("sortBy") || "created_at"
    const sortOrder = searchParams.get("sortOrder") || "desc"

    // Calculate offset
    const offset = (page - 1) * limit

    // Initialize Supabase client
    const supabase = createServerSupabaseClient()

    // Start building the query
    let query = supabase.from("waitlist").select("*", { count: "exact" })

    // Apply filters
    if (source) {
      query = query.eq("referral_source", source)
    }

    if (search) {
      query = query.or(`email.ilike.%${search}%,telegram_username.ilike.%${search}%`)
    }

    // Apply sorting
    query = query.order(sortBy as any, { ascending: sortOrder === "asc" })

    // Apply pagination
    query = query.range(offset, offset + limit - 1)

    // Execute the query
    const { data, count, error } = await query

    if (error) {
      console.error("Error fetching waitlist:", error)
      return NextResponse.json({ error: "Failed to fetch waitlist data" }, { status: 500 })
    }

    // Get referral source statistics
    const { data: sourceStats, error: sourceStatsError } = await supabase
      .from("waitlist")
      .select("referral_source, count")
      .group("referral_source")

    if (sourceStatsError) {
      console.error("Error fetching source stats:", sourceStatsError)
    }

    // Get signup statistics by day
    const { data: timeStats, error: timeStatsError } = await supabase.rpc("get_signups_by_day", {
      days_back: 30,
    })

    // If the RPC function doesn't exist, we'll use a simpler query
    let signupsByDay = timeStats
    if (timeStatsError) {
      console.error("Error fetching time stats:", timeStatsError)
      // Fallback query
      const { data: fallbackTimeStats } = await supabase
        .from("waitlist")
        .select("created_at")
        .gte("created_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())

      if (fallbackTimeStats) {
        // Group by day manually
        const dayMap = new Map<string, number>()
        fallbackTimeStats.forEach((entry) => {
          const day = new Date(entry.created_at).toISOString().split("T")[0]
          dayMap.set(day, (dayMap.get(day) || 0) + 1)
        })

        signupsByDay = Array.from(dayMap.entries()).map(([date, count]) => ({
          date,
          count,
        }))
      }
    }

    return NextResponse.json({
      data,
      total: count || 0,
      page,
      limit,
      totalPages: count ? Math.ceil(count / limit) : 0,
      sourceStats: sourceStats || [],
      signupsByDay: signupsByDay || [],
    })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Basic auth check
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Basic ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    // Initialize Supabase client
    const supabase = createServerSupabaseClient()

    // Delete the entry
    const { error } = await supabase.from("waitlist").delete().eq("id", id)

    if (error) {
      console.error("Error deleting waitlist entry:", error)
      return NextResponse.json({ error: "Failed to delete waitlist entry" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
