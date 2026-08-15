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

    if (!adminRecord && user.email !== "mathanmonishan@gmail.com") {
      return NextResponse.json({ error: "Forbidden: Not an admin" }, { status: 403 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const bucket = (formData.get("bucket") as string) || "projects"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Sanitize file name
    const timestamp = Date.now()
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
    const filePath = `${timestamp}-${cleanName}`

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { error: uploadError } = await admin.storage
      .from(bucket)
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true,
      })

    if (uploadError) {
      console.error("Storage upload error:", uploadError)
      return NextResponse.json({ error: uploadError.message }, { status: 500 })
    }

    const {
      data: { publicUrl },
    } = admin.storage.from(bucket).getPublicUrl(filePath)

    return NextResponse.json({
      success: true,
      url: publicUrl,
      name: file.name,
      type: file.type,
      size: file.size,
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal upload error"
    console.error("Upload API error:", err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
