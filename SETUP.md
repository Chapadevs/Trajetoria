# Quick Setup Guide

## Installation Steps

Follow these steps to get your FormDesign Co. website up and running:

### 1. Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages:
- React 18 and React DOM
- Vite (build tool)
- Tailwind CSS and plugins
- React Router DOM
- And all dev dependencies

### 2. Start Development Server

After installation completes, start the development server:

```bash
npm run dev
```

The application will start at: **http://localhost:3000**

### 3. Verify Everything Works

Open your browser and navigate to `http://localhost:3000`. You should see:
- The FormDesign Co. landing page
- A sticky header with navigation
- A hero section with call-to-action buttons
- Three form template cards
- A footer with links

### 4. Development Tips

- **Hot Module Replacement (HMR)**: Changes you make to the code will automatically refresh in the browser
- **Dark Mode**: The design supports dark mode (add dark mode toggle in future updates)
- **Responsive**: Test the design on different screen sizes - it's fully responsive

### Next Steps for Backend Integration

After you're satisfied with the frontend:

1. **Create a backend folder** for Node.js/Express server
2. **Set up MongoDB** connection
3. **Create API endpoints** for form submissions
4. **Add form pages** that actually collect and submit data
5. **Implement form validation** using libraries like React Hook Form or Formik

### Troubleshooting

**Port 3000 already in use?**
- Stop any other applications using port 3000, or
- Change the port in `vite.config.js` to another number (e.g., 3001)

**Missing dependencies?**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

**Tailwind styles not working?**
- Make sure `index.css` imports are present in `src/main.jsx`
- Check that `tailwind.config.js` has the correct content paths

## Project Structure Explained

```
Tragetória/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Header.jsx      # Top navigation bar
│   │   ├── HeroSection.jsx # Main hero section
│   │   ├── TemplatesSection.jsx # Form templates display
│   │   ├── FormCard.jsx    # Individual template card
│   │   └── Footer.jsx      # Bottom footer
│   ├── pages/              # Page components
│   │   └── LandingPage.jsx # Main landing page
│   ├── App.jsx             # Main app with routing
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
└── postcss.config.js       # PostCSS configuration
```

## Build for Production

When ready to deploy:

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

To preview the production build locally:

```bash
npm run preview
```

Happy coding! 🚀

