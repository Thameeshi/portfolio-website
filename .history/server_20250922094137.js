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
        university: "University of Moratuwa",
        email: "thameeshisenade@gmail.com",
        phone: "+94 702 858",
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
            description: "Designed and developed a smart water management system to efficiently monitor and optimize water usage in real time. The system integrates sensors for tracking water flow, temperature, turbidity, and tank levels, enabling continuous monitoring of both consumption and quality. Data is transmitted to the cloud via an ESP32 microcontroller and stored in a Firebase Realtime Database, allowing for remote monitoring, visualization, and analysis. The platform provides timely alerts and notifications to prevent wastage, ensure water quality, and support proactive maintenance. By combining IoT, embedded systems, and cloud technologies, the solution promotes sustainability, resource efficiency, and environmental impact reduction.",
            githubLink: "https://github.com/Thameeshi/Wise-Water-Tank",
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
            technologies: ["React", "Tailwind CSS", "Node.js", "Express.js", "HotPocket", "XRPL","Web3"]
        },
        {
            title: "Wise Water Companion",
            description: "A full-featured e-commerce website with shopping cart functionality, secure payment processing, inventory management, and user account features. Designed for optimal user experience and conversion rates.",
            githubLink: "https://github.com/Thameeshi/ecommerce-platform",
            liveLink: "https://ecommerce-demo.netlify.app",
            images: ["projrct1.jpg"],
            features: [
                "Product catalog with advanced filtering",
                "Shopping cart and secure checkout",
                "User accounts and order tracking",
                "Admin panel for inventory management",
                "Payment gateway integration",
                "Mobile-responsive design"
            ],
            technologies: ["ESP32", "C++", "Firebase Realtime Database", " Ultrasonic Sensor", "Flow Sensor", "Turbidity Sensor","DS18B20 Temperature Sensor","Arduino IDE"]
        },
        {
            title: "Task Management Medicare Plus – Healthcare Management System",
            description: "A modern single-page application (SPA) built with Laravel to streamline healthcare record management. The system features secure user authentication, role-based access control, and a responsive, intuitive interface for managing patient data, appointments, and medical history efficiently. Designed with scalability and user experience in mind, Medicare Plus enhances operational efficiency in healthcare environments.",
            githubLink: "https://github.com/Thameeshi/Medicare_Plus",
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