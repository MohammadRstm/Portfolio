export const projects = [
    {
        id: 1,
        title: "Enterprise Resource Management App",
        description: "A role-based resource management platform built for companies to track ongoing projects, manage tasks, monitor deadlines, and collect team activity reports. Designed to provide CEOs and managers with insights into project progress and employee performance. The system supports hierarchical roles (employee, manager, CEO) with specific privileges and stores data securely for all users.",
        image: "../assets/recourseManagement-project.jpg", 
        builtWith: "JavaScript, HTML, CSS, MySQL",
        framework: "PHP (Laravel) or Node.js (Express)", 
        skills: [
            "Role-based access control",
            "Task and project tracking",
            "User activity reporting"
        ],
        frameWorkIcons: [
            { url: "https://unpkg.com/devicon@2.15.1/icons/laravel/laravel-plain.svg", name: "Laravel" }
        ],
        builtWithIcons: [
            { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", name: "PHP" },
            { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", name: "HTML5" },
            { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", name: "CSS3" },
            { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", name: "MySQL" }
        ],
        gitHubRepo : "https://github.com/MohammadRstm/Recource-Management-System"
    },
    {
        id: 2,
        title: "Bank Management System",
        description: "A secure desktop banking application with a role-based access system that handles core banking operations such as account management, fund transfers, and transaction history. Utilizes database transactions to prevent concurrency issues and ensures data integrity. All sensitive data is encrypted, and the application allows seamless money transfers between accounts. Designed for both administrative and user-level roles.",
        image: "../assets/bankManagement-project.jpg", 
        builtWith: "Java, SQL Server Management Studio (SSMS)",
        framework: "JavaFX",
        skills: [
            "Database transaction handling",
            "Data encryption",
            "Role-based access control"
        ],
        frameWorkIcons: [
            { url: "https://simpleicons.org/icons/openjdk.svg", name: "JavaFX" }
        ],
        builtWithIcons: [
            { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", name: "Java" },
            { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg", name: "SQL Server" }
        ],
        gitHubRepo : ""
    },
    { 
        id: 3,
        title: "Ecommerce Platform",
        description: "A highly scalable ecommerce web application similar to Amazon, built with a full-stack architecture. It fetches real-time product data from an external API, features a dynamic cart system that updates instantly, and communicates with a Node.js backend via RESTful APIs. The platform handles asynchronous operations efficiently, stores orders in the backend, and tracks them by purchase and delivery dates. Deployed on AWS using an EC2 instance with a load balancer for high availability.",
        image: "../assets/ecommerce-project.png", 
        builtWith: "JavaScript, HTML, CSS, AWS",
        framework: "React (Frontend), Node.js (Backend)",
        skills: [
            "RESTful API integration",
            "Live cart system",
            "AWS EC2 deployment with load balancing"
        ],
        frameWorkIcons: [
            { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", name: "React" },
            { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", name: "Node.js" }
        ],
        builtWithIcons: [
            { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", name: "JavaScript" },
            { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", name: "HTML5" },
            { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", name: "CSS3" },
            { url: "../assets/aws.png", name: "AWS" }
        ],
        gitHubRepo : "https://github.com/MohammadRstm/REACT/tree/main/ecommerce-project"
    },
    {
        id: 4,
        title: "AI-Powered Chatbot",
        description: "A dynamic chatbot application built with React (Vite) that communicates with a backend API to fetch and submit responses in real time. The system efficiently manages user states, message history, and API requests to provide seamless interactions. Admins can add new responses to the bot's knowledge base via the API, making it adaptable for different use cases. Designed with a clean UI for smooth user experience.",
        image: "../assets/chatbot-project.jpg",
        builtWith: "JavaScript, HTML, CSS, RESTful API",
        framework: "React (Vite)",
        skills: [
            "API integration (fetch/submit data)",
            "State management (user inputs, chat history)",
            "Dynamic UI rendering",
            "Admin-controlled bot training"
        ],
        frameWorkIcons: [
            { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", name: "React" },
            { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg", name: "Vite" }
        ],
        builtWithIcons: [
            { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", name: "JavaScript" },
            { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", name: "HTML5" },
            { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", name: "CSS3" },
            { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", name: "Node.js" }
        ],
         gitHubRepo : "https://github.com/MohammadRstm/REACT/tree/main/chat-bot-project"
    }
];