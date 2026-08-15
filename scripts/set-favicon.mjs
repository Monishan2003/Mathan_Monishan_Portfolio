import fs from "fs"

// Read monishan.jpeg
const imgBuffer = fs.readFileSync("public/monishan.jpeg")

// Write to src/app/favicon.ico
fs.writeFileSync("src/app/favicon.ico", imgBuffer)

// Write to public/favicon.ico
fs.writeFileSync("public/favicon.ico", imgBuffer)

// Write to src/app/icon.jpeg
fs.writeFileSync("src/app/icon.jpeg", imgBuffer)

console.log("Favicon updated with Monishan's photo successfully!")
