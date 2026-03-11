// ================================================================
//  PORTFOLIO DATA - Single source of truth for all content
// ================================================================

export const personal = {
  name: 'Michael John Franklin',
  shortName: 'Mike',
  handle: 'mikelokinz',
  role: 'Full Stack Developer & CS Student',
  tagline: 'I make the web thing',
  email: 'mikelokinz@gmail.com',
  phone: '+91 7904285263',
  location: 'India',
  github: 'https://github.com/mikelokinz',
  linkedin: 'https://www.linkedin.com/in/mikelokinz/',
  resume: '/src/assets/certifications/Resume.pdf',
  portrait: '/src/assets/images/Portrait.jpg',
  about: [
    "I'm a motivated B.E. Computer Science student with a passion for building everything from Full Stack AI applications to high-performance frontend clones. I enjoy using AI to classify issues and auto-alert authorities based on urgency.",
    "My strengths lie in Creative Thinking, Team Collaboration, and rapid Front-End development. When I'm not pushing pixels or wrangling React state, you'll find me deep in Adobe After Effects crafting motion graphics.",
    "I thrive in collaborative team environments and love contributing fresh ideas to projects. Currently pursuing my B.E. in Computer Science and Engineering at St. Joseph's College of Engineering (2024-2028).",
  ],
};

export const education = [
  {
    degree: 'B.E. – Computer Science and Engineering',
    institution: "St. Joseph's College of Engineering",
    year: '2024 – 2028',
    type: 'Bachelor\'s Degree',
  },
  {
    degree: 'Honours Diploma in Computer Application',
    institution: 'CSC',
    year: '2024 – 2025',
    type: 'Diploma',
  },
];

export const skills = {
  frontend: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Responsive Design'],
  tools: ['Git', 'GitHub', 'VS Code', 'Adobe After Effects', 'Figma', 'npm'],
  backend: ['Node.js', 'Flask', 'Python', 'MongoDB'],
  ai: ['AI Chatbots', 'ML Classification', 'TMDB API', 'OpenWeatherMap API', 'REST APIs'],
};

export const experience = [
  {
    title: 'Internship – AI Smart Issue Reporter',
    company: 'Self Project / Internship',
    year: '2025',
    description: 'Built an AI-powered system to classify issues and auto-alert relevant authorities based on urgency. Integrated ML classification models with a React frontend.',
    tech: ['React', 'Python', 'AI/ML', 'Flask'],
  },
];

export const certifications = [
  {
    title: 'Full Stack Web Development',
    issuer: 'Error Makes Clever (EMC)',
    date: 'May 2024',
    type: 'Certificate',
    file: '/src/assets/certifications/EMC/Full Stack Certificate.pdf',
    icon: '🚀',
  },
  {
    title: 'Master Flutter Webinar',
    issuer: 'Error Makes Clever (EMC)',
    date: 'May 2024',
    type: 'Badge',
    file: '/src/assets/certifications/EMC/Flutter{EMC}.jpg',
    icon: '📱',
  },
  {
    title: 'Honours Diploma in Computer Application',
    issuer: 'CSC',
    date: '2024 – 2025',
    type: 'Diploma',
    file: '/src/assets/certifications/CSC/CSC-HDCA (1).jpg',
    icon: '🎓',
  },
  {
    title: 'Cyber Security',
    issuer: 'CISCO',
    date: '2025',
    type: 'Certificate',
    file: '/src/assets/certifications/CISCO CYBER SECURITY.pdf',
    icon: '🔒',
  },
  {
    title: 'MongoDB Basics',
    issuer: 'MongoDB University',
    date: '2025',
    type: 'Certificate',
    file: '/src/assets/certifications/Mongo DB/MongoDB.pdf',
    icon: '🍃',
  },
];

export const projects = [
  {
    id: 'movie-app',
    title: 'Cinematic Explorer',
    emoji: '🎬',
    desc: 'A robust Movie Application featuring instant category filtering, dynamic routing, and embedded trailers via the TMDB API.',
    longDesc: 'Built to sharpen API integration and UI design skills. The app features a beautiful responsive UI, real-time movie search, genre filtering, category separation, trailer playback, and blazing-fast performance using Vite.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'TMDB API', 'Vercel'],
    link: 'https://movie-sigma-bay.vercel.app/',
    github: null,
    featured: true,
  },
  {
    id: 'samsung-clone',
    title: 'Samsung Platform Clone',
    emoji: '📱',
    desc: 'A pixel-perfect, fully responsive clone of the Samsung website built to master modern UI/UX techniques.',
    longDesc: 'Practiced component structuring, responsive design, and layout architecture. Features clean product sections, banners, and navigation that mirror the actual Samsung shopping experience.',
    tech: ['React', 'Tailwind CSS', 'Vite', 'Vercel'],
    link: 'https://samsung-clone-gules.vercel.app/',
    github: null,
    featured: false,
  },
  {
    id: 'task-manager',
    title: 'Task Orchestrator',
    emoji: '✅',
    desc: 'Browser-based task management with priority filtering, instant search, and local data persistence.',
    longDesc: 'Built to deepen understanding of state management, UI design, and browser-based storage. Features Add/Edit/Delete tasks, localStorage persistence, instant search, and priority filtering (High/Medium/Low).',
    tech: ['React', 'Vite', 'Tailwind CSS', 'LocalStorage', 'Vercel'],
    link: 'https://task-manager-opal-ten.vercel.app/',
    github: null,
    featured: false,
  },
  {
    id: 'weather-app',
    title: 'Atmosphere Weather',
    emoji: '🌤️',
    desc: 'Auto-detecting meteorological dashboard with global city search via the OpenWeatherMap API.',
    longDesc: 'A fully responsive weather app that auto-detects your current location weather, shows nearby location data, and lets you search any city globally. Features a clean Tailwind UI with super-fast Vite performance.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'OpenWeatherMap API', 'Vercel'],
    link: 'https://weather-omega-blue-93.vercel.app/',
    github: null,
    featured: false,
  },
  {
    id: 'tripadvisor-clone',
    title: 'TripAdvisor Reimagined',
    emoji: '📍',
    desc: 'A pure CSS interactive clone. 100% mobile-optimized with zero JavaScript.',
    longDesc: 'Demonstrates mastery of pure CSS interactivity — responsive search bar, toggle-based dynamic headings, sections for hotels, restaurants, flights, and rentals. All alignment is perfect with smooth vertical flow.',
    tech: ['HTML5', 'Vanilla CSS', 'GitHub Pages'],
    link: 'https://mikelokinz.github.io/Tripadvisor/html/loading.html',
    github: null,
    featured: true,
  },
  {
    id: 'udemy-showcase',
    title: 'Course Showcase',
    emoji: '📚',
    desc: 'Udemy-inspired responsive course grid. No frameworks, no media queries — pure layout logic.',
    longDesc: 'A dynamic, responsive course showcase site built using pure HTML and CSS. Features smooth hover transitions, card reveals, and custom UI styling. A great exercise in layout logic, responsiveness, and component design.',
    tech: ['HTML5', 'Vanilla CSS', 'GitHub Pages'],
    link: 'https://mikelokinz.github.io/udemy/html/page.html',
    github: null,
    featured: false,
  },
  {
    id: 'lootish',
    title: 'Lootish E-Commerce',
    emoji: '🎮',
    desc: 'A sleek gaming e-commerce storefront dedicated to premium gaming products and accessories.',
    longDesc: 'Lootish is a full gaming e-commerce frontend showcasing product cards, category navigation, and a premium dark theme matching the gaming aesthetic. Demonstrates ability to deliver polished shopping experiences.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'GitHub Pages'],
    link: 'https://mikelokinz.github.io/Lootish/',
    github: 'https://github.com/mikelokinz/Lootish',
    featured: true,
  },
  {
    id: 'juego',
    title: 'Juego Web Store',
    emoji: '🕹️',
    desc: 'Interactive digital game storefront with varied layout techniques and strong visual hierarchy.',
    longDesc: 'Juego is a digital game store with dynamic layout experiments and an immersive visual hierarchy. Showcases mastery of CSS layout patterns and product card designs.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'GitHub Pages'],
    link: 'https://mikelokinz.github.io/Juego/',
    github: 'https://github.com/mikelokinz/Juego',
    featured: true,
  },
];
