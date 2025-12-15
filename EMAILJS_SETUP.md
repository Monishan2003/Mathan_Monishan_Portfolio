# EmailJS Setup Instructions

To enable automatic email notifications when someone contacts you through the portfolio, you need to set up EmailJS (it's free!).

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account (allows 200 emails/month for free)

## Step 2: Create an Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Copy your **Service ID** (e.g., `service_xxxxxxx`)

## Step 3: Create an Email Template
1. Go to "Email Templates" in EmailJS dashboard
2. Click "Create New Template"
3. Use this template structure:

**Template Name:** Contact Form
**Subject:** New Contact from Portfolio: {{subject}}
**Content:**
```
Hello Mathan,

You have received a new message from your portfolio website:

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This email was sent automatically from your portfolio contact form.
```

4. Save the template and copy your **Template ID** (e.g., `template_xxxxxxx`)

## Step 4: Get Your Public Key
1. Go to "Account" → "General" in EmailJS dashboard
2. Copy your **Public Key** (e.g., `xxxxxxxxxxxxx`)

## Step 5: Update Contact.js
Open `src/components/Contact.js` and replace these values:

```javascript
const serviceID = 'YOUR_SERVICE_ID';      // Replace with your Service ID
const templateID = 'YOUR_TEMPLATE_ID';    // Replace with your Template ID
const publicKey = 'YOUR_PUBLIC_KEY';       // Replace with your Public Key
```

## Step 6: Test
1. Run `npm start`
2. Fill out the contact form
3. Submit and check your email!

## Alternative: Quick Setup Script
You can also use environment variables for security:

1. Create a `.env` file in the root directory:
```
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

2. Update Contact.js to use:
```javascript
const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
```

## Notes
- Free plan: 200 emails/month
- Paid plans available if you need more
- All emails will be sent to: mathanmonishan@gmail.com (configured in template)

