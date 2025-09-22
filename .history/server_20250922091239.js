// server.js - Sample server setup for your portfolio

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Portfolio data (you can move this to a separate file)
const portfolioData = {
    personal: {
        name: "Thameeshi Senadheera",
        title: "Full-Stack Developer",
        description: "I'm passionate about creating innovative web solutions and user-friendly interfaces. Currently exploring the latest technologies in web development and seeking opportunities to contribute to impactful projects.",
        roles: ["Full-Stack Developer", "UI/UX Enthusiast", "Problem Solver", "Tech Explorer"],
        university: "University of Sri Jayewardenepura",
        email: "thameeshisenade@gmail.com",
        phone: "+94 123 456 789",
        location: "Colombo, Sri Lanka",
        resumeLink: "/documents/resume.pdf"
    },
    social: {
        facebook: "https://www.facebook.com/profile.php?id=61557323637578&mibextid=LQQJ4d",
        linkedin: "https://www.linkedin.com/in/thameeshi-senadheera-400b86224",
        github: "https://github.com/Thameeshi",
        instagram: "https://instagram.com/your_handle"
    },
    skills: [
        {
            category: "Frontend Development",
            technologies: "React, Vue.js, HTML5, CSS3, JavaScript, TypeScript, Tailwind CSS"
        },
        {
            category: "Backend Development",
            technologies: "Node.js, Express.js, Python, PHP, REST APIs, GraphQL"
        },
        {
            category: "Database Management",
            technologies: "MongoDB, MySQL, PostgreSQL, Firebase, Redis"
        },
        {
            category: "DevOps & Tools",
            technologies: "Git, Docker, AWS, Heroku, Linux, VS Code, Figma"
        },
        {
            category: "UI/UX Design",
            technologies: "Figma, Adobe XD, Sketch, Wireframing, Prototyping"
        },
        {
            category: "Mobile Development",
            technologies: "React Native, Flutter, Android Studio"
        }
    ],
    projects: [
        {
            title: "Court Booking System",
            description: "A comprehensive court booking management system with real-time availability checking, user authentication, and administrative features. Built with modern web technologies to streamline sports facility reservations.",
            githubLink: "https://github.com/Thameeshi/court-booking-system",
            liveLink: "https://court-booking-demo.netlify.app",
            images: ["ss1.jpg", "ss2.jpg", "ss3.jpg"],
            features: [
                "Real-time court availability checking",
                "User authentication and profile management",
                "Admin dashboard for court management",
                "Booking history and cancellation system",
                "Email notifications for bookings",
                "Responsive design for all devices"
            ],
            technologies: ["React", "Node.js", "MongoDB", "Express.js", "JWT", "Socket.io"]
        },
        {
            title: "E-Commerce Platform",
            description: "A full-featured e-commerce website with shopping cart functionality, secure payment processing, inventory management, and user account features. Designed for optimal user experience and conversion rates.",
            githubLink: "https://github.com/Thameeshi/ecommerce-platform",
            liveLink: "https://ecommerce-demo.netlify.app",
            images: ["ecommerce1.jpg", "ecommerce2.jpg", "ecommerce3.jpg"],
            features: [
                "Product catalog with advanced filtering",
                "Shopping cart and secure checkout",
                "User accounts and order tracking",
                "Admin panel for inventory management",
                "Payment gateway integration",
                "Mobile-responsive design"
            ],
            technologies: ["React", "Redux", "Node.js", "PostgreSQL", "Stripe API", "AWS"]
        },
        {
            title: "Task Management Dashboard",
            description: "A collaborative task management application featuring team workspaces, project tracking, deadline management, and real-time collaboration tools. Perfect for agile development teams and project coordination.",
            githubLink: "https://github.com/Thameeshi/task-manager",
            liveLink: "https://taskmanager-demo.netlify.app",
            images: ["task1.jpg", "task2.jpg", "task3.jpg"],
            features: [
                "Drag-and-drop task management",
                "Team collaboration features",
                "Project progress tracking",
                "Deadline and notification system",
                "File sharing and comments",
                "Analytics and reporting dashboard"
            ],
            technologies: ["Vue.js", "Firebase", "Node.js", "Socket.io", "Chart.js", "PWA"]
        },
        {
            title: "Personal Portfolio Website",
            description: "A modern, responsive portfolio website showcasing projects, skills, and professional experience. Features smooth animations, contact form integration, and SEO optimization for maximum visibility.",
            githubLink: "https://github.com/Thameeshi/portfolio-website",
            liveLink: null,
            images: ["portfolio1.jpg", "portfolio2.jpg"],
            features: [
                "Responsive design for all devices",
                "Interactive project galleries",
                "Contact form with email integration",
                "SEO optimized with meta tags",
                "Smooth scroll and animations",
                "Fast loading and performance optimized"
            ],
            technologies: ["HTML5", "CSS3", "JavaScript", "EJS", "Node.js", "Netlify"]
        }
    ]
};

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        data: portfolioData,
        currentYear: new Date().getFullYear(),
        title: `${portfolioData.personal.name} - Portfolio`
    });
});

// Contact form handler (optional)
app.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    
    // Here you would typically:
    // 1. Validate the input
    // 2. Send email using nodemailer or similar
    // 3. Save to database
    // 4. Send response
    
    console.log('Contact form submission:', { name, email, subject, message });
    
    // For now, just send success response
    res.json({ 
        success: true, 
        message: 'Thank you for your message! I\'ll get back to you soon.' 
    });
});

// Error handling
app.use((req, res) => {
    res.status(404).render('404', { 
        title: '404 - Page Not Found',
        data: portfolioData 
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Portfolio server running on http://localhost:${PORT}`);
});

module.exports = app;