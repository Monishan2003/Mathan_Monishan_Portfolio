# Mathan Monishan - Portfolio Website

A modern, responsive portfolio website built with React.js showcasing my skills, projects, education, and contact information.

## Features

- 🎨 Modern and clean design with organic, human-made aesthetics
- 📱 Fully responsive layout for all devices
- ⚡ Built with React.js for optimal performance
- 🎭 Smooth animations and transitions
- 🎯 Interactive navigation with active section highlighting
- 📧 Contact form with automatic email notifications (EmailJS)
- 💬 WhatsApp integration with floating button
- 🚀 Optimized for fast loading

## Technologies Used

- React.js 18.2.0
- EmailJS (for contact form email notifications)
- Custom TypingEffect component
- CSS3 with custom animations
- Font Awesome icons
- Google Fonts (Poppins & Ubuntu)

## Getting Started

### Prerequisites

- Node.js (>=18.0.0)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Monishan2003/Mathan_Monishan_Portfolio.git
cd Mathan_Monishan_Portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up EmailJS (for contact form):
   - See [EMAILJS_SETUP.md](./EMAILJS_SETUP.md) for detailed instructions
   - Create a `.env` file from `.env.example` and add your EmailJS credentials
   - Or directly update the values in `src/components/Contact.js`

4. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
├── public/
│   ├── index.html
│   └── monishan.jpeg
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Home.js
│   │   ├── About.js
│   │   ├── Education.js
│   │   ├── Projects.js
│   │   ├── Skills.js
│   │   ├── Contact.js
│   │   ├── Footer.js
│   │   └── ScrollToTop.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Sections

- **Home**: Hero section with animated typing effect
- **About**: Personal introduction and background
- **Education**: Timeline of educational achievements
- **Projects**: Showcase of completed projects
- **Skills**: Technical skills organized by category
- **Contact**: Contact form and information
- **Footer**: Social links and quick navigation

## Customization

You can easily customize the portfolio by:

1. Updating personal information in component files
2. Modifying colors in CSS variables (`:root` in `index.css`)
3. Adding/removing projects in `Projects.js`
4. Updating skills in `Skills.js`
5. Changing social media links in `Footer.js`
6. Updating WhatsApp number in `Contact.js` and `WhatsAppButton.js` (currently: +94 76 763 4359)
7. Configuring email notifications via EmailJS (see EMAILJS_SETUP.md)

## Deployment

The project is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel, and it will automatically build and deploy.

## License

MIT License - feel free to use this portfolio as a template for your own!

## Contact

Mathan Monishan
- Email: mathanmonishan@gmail.com
- LinkedIn: [linkedin.com/in/mathan-monishan2003](https://www.linkedin.com/in/mathan-monishan2003)
- GitHub: [github.com/Monishan2003](https://github.com/Monishan2003)

---

Created with ❤️ by Mathan Monishan
