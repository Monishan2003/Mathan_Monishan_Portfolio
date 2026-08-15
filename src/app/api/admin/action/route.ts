import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const admin = createAdminClient()

    // Verify user is in admins table
    const { data: adminRecord } = await admin
      .from("admins")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle()

    if (!adminRecord) {
      // Auto-enrol if it matches the portfolio owner email
      if (user.email === "mathanmonishan@gmail.com") {
        await admin.from("admins").upsert({
          user_id: user.id,
          email: user.email,
          note: "Auto enrolled owner",
        })
      } else {
        return NextResponse.json({ error: "Forbidden: Not an admin" }, { status: 403 })
      }
    }

    const body = await request.json()
    const { action, table, data, id } = body

    if (action === "update_profile") {
      const { data: existing } = await admin.from("profile").select("id").maybeSingle()
      if (existing) {
        await admin.from("profile").update({ ...data, updated_at: new Date().toISOString() }).eq("id", existing.id)
      } else {
        await admin.from("profile").insert(data)
      }
      return NextResponse.json({ success: true })
    }

    if (action === "upsert") {
      if (id) {
        const { error } = await admin.from(table).update({ ...data, updated_at: new Date().toISOString() }).eq("id", id)
        if (error) throw error
      } else {
        const { error } = await admin.from(table).insert(data)
        if (error) throw error
      }
      return NextResponse.json({ success: true })
    }

    if (action === "delete") {
      const { error } = await admin.from(table).delete().eq("id", id)
      if (error) throw error
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error"
    console.error("Admin action error:", err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
