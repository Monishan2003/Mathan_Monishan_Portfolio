import { createClient } from "@supabase/supabase-js"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const secretKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const admin = createClient(url, secretKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

// Update projects bucket limit to 50MB and allow images & videos
await admin.storage.updateBucket("projects", {
  public: true,
  fileSizeLimit: 52428800, // 50MB
  allowedMimeTypes: null, // Allow all image/video formats
})

// Update documents bucket limit to 20MB for CV PDFs/docs
await admin.storage.updateBucket("documents", {
  public: true,
  fileSizeLimit: 20971520, // 20MB
  allowedMimeTypes: null,
})

// Update avatars bucket
await admin.storage.updateBucket("avatars", {
  public: true,
  fileSizeLimit: 10485760, // 10MB
  allowedMimeTypes: null,
})

console.log("Storage buckets updated with relaxed limits and video/PDF support!")
