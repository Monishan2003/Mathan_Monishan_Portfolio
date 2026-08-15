const testContact = async () => {
  const res = await fetch("http://localhost:3000/api/public/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Test Visitor",
      email: "visitor@example.com",
      subject: "Inquiry about web development",
      message: "Hi Monishan, I would like to collaborate with you on a Next.js project!",
    }),
  })
  const data = await res.json()
  console.log("Contact API Response:", data)
}

testContact()
