import { NextResponse, type NextRequest } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required" },
        { status: 400 }
      )
    }

    // Save to Supabase using admin client (bypasses RLS)
    const admin = createAdminClient()
    const userAgent = request.headers.get("user-agent") || ""
    const referrer = request.headers.get("referer") || ""

    const { data, error } = await admin
      .from("contact_messages")
      .insert({
        name,
        email,
        subject: subject || "No Subject",
        message,
        status: "NEW",
        user_agent: userAgent.substring(0, 500),
        referrer: referrer.substring(0, 500),
      })
      .select()
      .single()

    if (error) {
      console.error("Supabase insert contact message error:", error)
      return NextResponse.json(
        { success: false, error: "Database error saving message" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Message received successfully",
      id: data?.id,
    })
  } catch (err) {
    console.error("API contact error:", err)
    return NextResponse.json(
      { success: false, error: "Server error processing contact form" },
      { status: 500 }
    )
  }
}
