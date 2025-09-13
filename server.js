const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://kit.fontawesome.com", "https://cdnjs.cloudflare.com"],
            imgSrc: ["'self'", "data:", "https:"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://kit.fontawesome.com"],
            connectSrc: ["'self'"],
        },
    },
}));

app.use(cors());

// Basic middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting for contact form
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3, // limit each IP to 3 requests per windowMs
    message: {
        error: 'Too many contact form submissions. Please try again in 15 minutes.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Portfolio data - matches your existing content
const portfolioData = {
    personal: {
        name: 'Thameeshi Senadheera',
        title: 'Full-Stack Developer',
        roles: ['Full-Stack Developer', 'UI/UX Enthusiast', 'Problem Solver', 'Tech Explorer'],
        description: `A curious mind and a problem solver who loves crafting user-friendly interfaces, 
        developing scalable backends, and exploring full-stack development. 
        Currently a third-year IT undergraduate at the University of Moratuwa, 
        open to internship opportunities to turn ideas into impactful digital experiences.`,
        university: 'University of Moratuwa',
        resumeLink: 'https://drive.google.com/drive/folders/1DY7HhO1jDcvAQeXOxSF_WJKhfs7_YK3X?usp=drive_link',
        email: 'thameeshi.senadheera@example.com', // Update with your email
        phone: '+94 XXX XXX XXX', // Update with your phone
        location: 'Colombo, Sri Lanka'
    },
    
    social: {
        facebook: '#', // Add your Facebook URL
        linkedin: '#', // Add your LinkedIn URL  
        github: '#',   // Add your GitHub URL
        twitter: '#'   // Add your Twitter URL
    },
    
    skills: [
        {
            category: 'Frontend',
            technologies: 'HTML, CSS, JavaScript, React, React Native, Tailwind CSS, Figma'
        },
        {
            category: 'Backend', 
            technologies: 'Node.js, Express.js, PHP, Laravel'
        },
        {
            category: 'Tools & Platforms',
            technologies: 'Git, GitHub, Docker, VS Code, Expo'
        },
        {
            category: 'Databases',
            technologies: 'Firebase, SQLite, MySQL'
        },
        {
            category: 'Programming Languages',
            technologies: 'Python, C, Java'
        },
        {
            category: 'Other',
            technologies: 'RESTful APIs, Role-Based Access Control (RBAC), OAuth, Smart Contracts (NFT), Blockchain (XRPL, Ethereum)'
        }
    ],
    
    project: {
        title: 'Full-Stack Web Application',
        description: `A comprehensive web application showcasing modern development practices with React frontend, Node.js backend, and real-time features. This project demonstrates user authentication, database integration, responsive design, and API development skills.`,
        features: [
            'Responsive Design',
            'User Authentication', 
            'Real-time Updates',
            'API Integration'
        ],
        technologies: ['React', 'Node.js', 'MongoDB', 'Express.js', 'Socket.io', 'JWT'],
        images: ['ss1.jpg', 'ss2.jpg', 'ss3.jpg'], // Your existing image names
        githubLink: '#', // Add your GitHub repository link
        liveLink: '#'    // Add your live project link
    }
};

// Routes
app.get('/', (req, res) => {
    res.render('index', { 
        data: portfolioData,
        title: `${portfolioData.personal.name} - Portfolio`,
        currentYear: new Date().getFullYear()
    });
});

// Contact form route
app.post('/contact', contactLimiter, async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        // Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'All fields are required.' 
            });
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide a valid email address.' 
            });
        }
        
        // Name validation (no numbers or special characters)
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(name)) {
            return res.status(400).json({
                success: false,
                message: 'Name should only contain letters and spaces.'
            });
        }
        
        // Message length validation
        if (message.length < 10 || message.length > 1000) {
            return res.status(400).json({
                success: false,
                message: 'Message should be between 10 and 1000 characters.'
            });
        }
        
        // Only attempt to send email if EMAIL_USER is configured
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            // Configure nodemailer
            const transporter = nodemailer.createTransporter({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });
            
            // Email content
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
                subject: `Portfolio Contact: ${subject}`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #0ef; text-align: center;">New Portfolio Contact</h2>
                        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px;">
                            <p><strong>Name:</strong> ${name}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Subject:</strong> ${subject}</p>
                            <div style="margin-top: 20px;">
                                <strong>Message:</strong>
                                <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
                                    ${message.replace(/\n/g, '<br>')}
                                </div>
                            </div>
                        </div>
                        <p style="text-align: center; margin-top: 20px; color: #666;">
                            Sent from your portfolio website
                        </p>
                    </div>
                `,
                // Plain text version
                text: `
                    New Portfolio Contact
                    
                    Name: ${name}
                    Email: ${email}
                    Subject: ${subject}
                    
                    Message:
                    ${message}
                `
            };
            
            // Send email
            await transporter.sendMail(mailOptions);
            
            console.log(`Contact form submission from ${name} (${email})`);
        } else {
            // Log to console if email is not configured
            console.log('Contact form submission (email not configured):', {
                name, email, subject, message, timestamp: new Date().toISOString()
            });
        }
        
        res.json({ 
            success: true, 
            message: 'Thank you for your message! I\'ll get back to you soon.' 
        });
        
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Something went wrong. Please try again later.' 
        });
    }
});

// Health check route
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('index', { 
        data: portfolioData,
        title: '404 - Page Not Found',
        currentYear: new Date().getFullYear(),
        error: 'Page not found'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Something went wrong!' 
    });
});

// Start server
const server = app.listen(PORT, () => {
    console.log(`🚀 Portfolio server running on http://localhost:${PORT}`);
    console.log(`📧 Email configured: ${process.env.EMAIL_USER ? 'Yes' : 'No'}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

module.exports = app;