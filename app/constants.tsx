import { Github, Linkedin, Mail } from "lucide-react";

// =========================================
// GENERAL INFO
// =========================================
export const heroData = {
    name: "Iatisam Nawaz",
    title: "Software Engineer",
    handle: "iatisamnawaz",
    status: "Online",
    avatarUrl: "/pfp.png",
    heading: "I am a AI/ML Developer.",
    subheading: "Leveraging modern AI technologies to build innovative solutions that drive efficiency and transform ideas into reality.",
    contactText: "Contact Me"
};

// =========================================
// TECHNOLOGIES (Overview Section)
// =========================================
export const techImages = [
    { src: '/tech/cplus.png', alt: 'C++' },
    { src: '/tech/css.png', alt: 'CSS' },
    { src: '/tech/django.png', alt: 'Django' },
    { src: '/tech/docker.png', alt: 'Docker' },
    { src: '/tech/figma.png', alt: 'Figma' },
    { src: '/tech/git.png', alt: 'Git' },
    { src: '/tech/html.png', alt: 'HTML' },
    { src: '/tech/javascript.png', alt: 'JavaScript' },
    { src: '/tech/mysql.png', alt: 'MySQL' },
    { src: '/tech/nodejs.png', alt: 'Node.js' },
    { src: '/tech/python.png', alt: 'Python' },
    { src: '/tech/reactjs.png', alt: 'React' },
    { src: '/tech/tailwind.png', alt: 'Tailwind CSS' },
    { src: '/tech/tensorflow.png', alt: 'TensorFlow' },
];

// =========================================
// EXPERIENCE
// =========================================
export const experiences = [
  {
    id: 1,
    role: "Application Engineer (Python)",
    company: "LMKR",
    location: "Pakistan, Islamabad",
    period: "Apr 2025 - Present",
    description: [
      "Engineered 'Petrohive', a RAG-based chatbot using LangGraph and ChromaDB, improving data extraction accuracy to 90%.",
      "Deployed local LLMs via Ollama and Flask, ensuring data privacy while delivering context-aware responses.",
      "Built a FastAPI microservice for power grid analysis, automating complex calculations with the Panda Power library."
    ],
    tech: ["Python", "LangGraph", "ChromaDB", "FastAPI", "Tailwind CSS"],
    color: "from-blue-500 to-purple-500",
    shadow: "shadow-blue-500/20",
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "Edulaxy",
    location: "Pakistan, Islamabad",
    period: "Jun 2021 - Mar 2025",
    description: [
      "Led the website overhaul, driving a 40% increase in user engagement and 20% drop in bounce rates.",
      "Developed an automated support chatbot and Python scripts for streamlining user management workflows."
    ],
    tech: ["Python", "UI/UX Design", "Automation"],
    color: "from-emerald-500 to-teal-500",
    shadow: "shadow-emerald-500/20",
  },
  {
    id: 3,
    role: "Web Developer Intern",
    company: "Parkyeri",
    location: "Turkey, Remote",
    period: "Sep 2023 - 2024",
    description: [
      "Conducted sentiment analysis and opinion mining on hotel reviews using NLP and ML techniques.",
      "Built a comprehensive Django web application for event management and hackathon coordination.",
      "Optimized a Python SDK for object-oriented database interactions, enhancing performance and reliability."
    ],
    tech: ["Python", "Django", "Machine Learning", "NLP"],
    color: "from-orange-500 to-red-500",
    shadow: "shadow-orange-500/20",
  },
];

// =========================================
// PROJECTS
// =========================================
export const projects = [
  {
    id: 1,
    title: "Hotel Data Analysis",
    category: "Data Analysis",
    description:
      "Exploratory data analysis on hotel reviews using Python and Jupyter Notebook to extract insights and patterns from customer feedback.",
    tech: ["Python", "Jupyter Notebook", "Pandas", "Matplotlib"],
    image:
      "/projects/dataAnalysis.png",
    repo: "https://github.com/Iatisamnawaz/Hotel-Data-Analysis",
    live: "#",
    color: "#60A5FA"
  },
  {
    id: 2,
    title: "ReadNation",
    category: "Web Development",
    description:
      "A CRUD-based web application built with Node.js and MySQL, implementing basic authentication and database-driven operations.",
    tech: ["Node.js", "MySQL", "HTML", "CSS", "Bootstrap"],
    image:
      "/projects/readnation.png",
    repo: "https://github.com/Iatisamnawaz/readnation",
    live: "https://github.com/Iatisamnawaz/readnation",
    color: "#F472B6"
  },
  {
    id: 3,
    title: "BrainLink",
    category: "Web Development",
    description:
      "A Django-based social media application featuring user authentication, posting, and interaction functionality.",
    tech: ["Django", "Python", "MySQL", "Bootstrap", "Redis"],
    image:
      "/projects/brainlink.png",
    repo: "https://github.com/Iatisamnawaz/BrainLink",
    live: "https://iatisamnawaz.pythonanywhere.com/accounts/login/?next=/",
    color: "#34D399"
  },
  {
    id: 4,
    title: "Simple REST API",
    category: "Backend Development",
    description:
      "A RESTful API that processes CSV data and displays structured output through a web interface.",
    tech: ["Python", "Django", "PostgreSQL", "Bootstrap"],
    image:
      "/projects/django-rest.jpg",
    repo: "https://github.com/Iatisamnawaz/Simple-Restful-API",
    live: "https://youtu.be/yPS7HwoW_-M",
    color: "#FBBF24"
  },
  {
    id: 5,
    title: "Movie App",
    category: "Mobile App Development",
    description:
      "A React Native movie application inspired by modern OTT platforms, featuring dynamic UI and API-driven content.",
    tech: ["React Native", "JavaScript"],
    image:
      "/projects/movieapp.png",
    repo: "https://github.com/Iatisamnawaz/Movie-App",
    live: "https://www.youtube.com/watch?v=uPVRbUcFe-E",
    color: "#A78BFA"
  },
  {
    id: 7,
    title: "Machine Learning Analysis",
    category: "Machine Learning",
    description:
      "A comparative study of KNN and PCA using exploratory data analysis techniques.",
    tech: ["Python", "Jupyter Notebook", "TensorFlow", "Scikit-learn"],
    image:
      "/projects/ml-1.png",
    repo: "https://github.com/Iatisamnawaz/KNN-PCA",
    live: "#",
    color: "#22D3EE"
  },
  {
    id: 8,
    title: "Merkelrex Exchange",
    category: "C++ / Systems",
    description:
      "A crypto trading simulation that analyzes CSV market data and generates buy/sell signals using C++.",
    tech: ["C++", "Data Structures"],
    image:
      "/projects/merkelrex.jpg",
    repo: "https://github.com/Iatisamnawaz/Merkelrex-Exchange",
    live: "https://youtu.be/Dr1G9H9J10o",
    color: "#4ADE80"
  },
];

// =========================================
// EDUCATION & SOCIALS (MyInfo Section)
// =========================================
export const educationData = [
  {
    id: 1,
    degree: "Bsc Computer Science",
    school: "Goldsmiths, University of London",
    year: "2021 - 2024",
    grade: "First Class Honours",
    gradeLabel: "Grade",
    highlights: ["Artificial Intelligence", "Machine Learning", "Web Development"]
  },
  {
    id: 2,
    degree: "Foundations Degree",
    school: "Latrobe University, Australia",
    year: "2019 - 2020",
    grade: "90",
    gradeLabel: "Percentage",
    highlights: [""]
  }
];

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/Iatisamnawaz",
    icon: Github,
    color: "group-hover:text-white"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/iatisam-nawaz-16820121b/",
    icon: Linkedin,
    color: "group-hover:text-blue-400"
  }
];
