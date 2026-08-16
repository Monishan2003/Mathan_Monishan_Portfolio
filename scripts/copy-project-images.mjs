import fs from "fs"
import path from "path"

const brainDir = "C:\\Users\\matha\\.gemini\\antigravity\\brain\\aaf4b5d1-1707-4179-9c65-7abe55e707d5"
const publicProjectsDir = "public/projects"

if (!fs.existsSync(publicProjectsDir)) {
  fs.mkdirSync(publicProjectsDir, { recursive: true })
}

const files = fs.readdirSync(brainDir)

files.forEach((f) => {
  if (f.startsWith("pynimox_ai_preview") && f.endsWith(".jpg")) {
    fs.copyFileSync(path.join(brainDir, f), path.join(publicProjectsDir, "pynimox.jpg"))
    console.log("Copied pynimox.jpg")
  }
  if (f.startsWith("srmj_ecommerce_preview") && f.endsWith(".jpg")) {
    fs.copyFileSync(path.join(brainDir, f), path.join(publicProjectsDir, "srmj.jpg"))
    console.log("Copied srmj.jpg")
  }
  if (f.startsWith("medicross_ai_preview") && f.endsWith(".jpg")) {
    fs.copyFileSync(path.join(brainDir, f), path.join(publicProjectsDir, "medicross.jpg"))
    console.log("Copied medicross.jpg")
  }
  if (f.startsWith("unisphere_lms_preview") && f.endsWith(".jpg")) {
    fs.copyFileSync(path.join(brainDir, f), path.join(publicProjectsDir, "unisphere.jpg"))
    console.log("Copied unisphere.jpg")
  }
  if (f.startsWith("hotel_website_preview") && f.endsWith(".jpg")) {
    fs.copyFileSync(path.join(brainDir, f), path.join(publicProjectsDir, "hotel.jpg"))
    console.log("Copied hotel.jpg")
  }
  if (f.startsWith("expense_tracker_preview") && f.endsWith(".jpg")) {
    fs.copyFileSync(path.join(brainDir, f), path.join(publicProjectsDir, "expense.jpg"))
    console.log("Copied expense.jpg")
  }
})

console.log("All project images copied successfully!")
