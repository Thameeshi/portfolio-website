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
        phone: "+94 702 858 628",
        location: "Rathnapura, Sri Lanka",
        resumeLink: "https://drive.google.com/file/d/1_XWpHF0YCI-AnaRojNYaUupQ7_B2FhQj/view?usp=drive_link"
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
            technologies: "React, HTML5, CSS3, JavaScript, TypeScript, Tailwind CSS"
        },
        {
            category: "Backend Development",
            technologies: "Node.js, Express.js, Python, PHP, REST APIs"
        },
        {
            category: "Database Management",
            technologies: "MongoDB, MySQL, Firebase,SQLite"
        },
        {
            category: "DevOps & Tools",
            technologies: "Git, Docker, AWS, VS Code, Figma"
        },
        {
            category: "Mobile Development",
            technologies: "React Native, Flutter, Android Studio"
        },
        {
            category: "Blockchain Development",
            technologies: "Web 3.0,HotPocket, XRPL"
        }
    ],
    projects: [
        {
            title: "Court Booking System",
            description: "Built a decentralized sports court booking platform with React, smart contracts (HotPocket/XRPL), and NFT-based booking receipts, handling scheduling, availability, and user bookings; mentored by Geveo Australasia (Pvt) Ltd.",
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
            description: "Designed and developed a smart water management system to efficiently monitor and manage water usage. The system features real-time tracking of water flow, temperature, turbidity, and tank levels, helping ensure water quality and reduce waste through remote monitoring and timely alerts.",
            githubLink: "https://github.com/Thameeshi/ecommerce-platform",
            liveLink: "https://ecommerce-demo.netlify.app",
            images: ["project1.jpg"],
            features: [
                "Product catalog with advanced filtering",
                "Shopping cart and secure checkout",
                "User accounts and order tracking",
                "Admin panel for inventory management",
                "Payment gateway integration",
                "Mobile-responsive design"
            ],
            technologies: ["ESP32", "C++"]
        },
        {
            title: "Medicare Plus – Healthcare Management System",
            description: "A modern single-page application (SPA) built with Laravel to streamline healthcare record management. The system features secure user authentication, role-based access control, and a responsive, intuitive interface for managing patient data, appointments, and medical history efficiently. Designed with scalability and user experience in mind, Medicare Plus enhances operational efficiency in healthcare environments.",
            githubLink: "https://github.com/Thameeshi/Medicare_Plus",
            liveLink: "https://drive.google.com/file/d/1i6MCCZZyo2MdEPiyZBWQrkTooHw2FmlJ/view?usp=sharing",
            images: ["laravel1.png", "laravel2.png"],
            features: [
                "Drag-and-drop task management",
                "Team collaboration features",
                "Project progress tracking",
                "Deadline and notification system",
                "File sharing and comments",
                "Analytics and reporting dashboard"
            ],
            technologies: ["Laravel", "PHP", "MySQL", "RESTful APIs", "Tailwind CSS"]
        },
        {
            title: "Cloud Cost Optimizer",
            description: "Designed and developed a cloud cost optimization platform that analyzes billing data, detects underutilized resources, and provides AI-powered cost-saving recommendations. The system features an interactive dashboard and detailed reports with real-time cost analysis results and AI-driven optimization insights.",
            githubLink: "https://github.com/Thameeshi/portfolio-website",
            liveLink: null,
            images: ["cloud1.jpg", "cloud3.jpg", "cloud4.jpg"],
            features: [
                "Automated Billing Data Analysis",
                "Resource Utilization Detection",
                "AI-Powered Recommendations",
                "Interactive Dashboard",
                "Detailed Reporting",
                "Real-Time Monitoring"
            ],
            technologies: ["Ballerina", "HTML5","CSS3", "JavaScript", "Chart.js", "Google OAuth integration",]
        }
    ],
      certifications: [
        {
            title: "AWS Cloud Practitioner Essentials",
            issuer: "Amazon Web Services (AWS)",
            year: "2024",
            description: "Comprehensive training covering AWS cloud fundamentals, core services, security, and architectural best practices.",
            icon: "fa-cloud",
            color: "#FF9900",
            certificateLink: "https://your-aws-certificate-link.com" // Replace with actual link
        },
        {
            title: "AWS Learner Guide Training: Cloud Basics & Core Services",
            issuer: "Amazon Web Services (AWS)",
            year: "2024",
            description: "In-depth training on cloud computing basics and essential AWS services for modern applications.",
            icon: "fa-server",
            color: "#FF9900",
            certificateLink: "https://drive.google.com/file/d/1EcDJF_0vX8qJTAbCNKr9Qb3siyTeRfmp/view?usp=drive_link" // Replace with actual link
        },
        {
            title: "Python for Beginners",
            issuer: "CODL - University of Moratuwa",
            year: "2024",
            description: "Foundation course covering Python programming fundamentals, data structures, and basic algorithms.",
            icon: "fa-code",
            color: "#3776AB",
            certificateLink: "https://drive.google.com/file/d/1IKFXQyUsG-X0_Di8cV9eyGl-Eg3uT8Zd/view?usp=sharing" // Replace with actual link
        },
        {
            title: "Web Design for Beginners",
            issuer: "CODL - University of Moratuwa",
            year: "2024",
            description: "Comprehensive web design course covering HTML, CSS, responsive design principles, and user experience basics.",
            icon: "fa-palette",
            color: "#E34F26",
            certificateLink: "https://drive.google.com/file/d/17jLC5PukFFvzG1yJtQha2YtAktgMPnVx/view?usp=drive_link" // Replace with actual link
        },
        {
            title: "Elements of AI",
            issuer: "University of Helsinki",
            year: "2024",
            description: "Introduction to artificial intelligence concepts, machine learning basics, and AI applications in modern technology.",
            icon: "fa-brain",
            color: "#0066CC",
            certificateLink: "https://drive.google.com/file/d/1qiU6zdB8_W89tLpVc-uK0VVovcI70e17/view?usp=drive_link" // Replace with actual link
        }
    ],
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