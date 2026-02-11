export const projects = [
    {
        id: 5,
        title: "FlowPilot - AI-Powered n8n Workflow Generator",
        description: "Built an application that generates complete n8n workflows from natural-language prompts using a RAG/ML-based AI pipeline. Designed and implemented three microservices that analyze the n8n codebase to automatically extract node schemas using TypeScript AST parsing, achieving 80% more efficiency and accuracy than naive regex-based approaches. Developed an AI-powered system that generates custom n8n nodes from natural language requirements using a LangChain-based agent.",
        image: "../assets/flowpilot.png",
        builtWith: "JavaScript, PHP, TypeScript, React, Laravel, Qdrant, MySQL",
        framework: "React (Vite), Laravel, LangChain",
        skills: [
            "RAG (Retrieval-Augmented Generation)",
            "Vector Databases (Qdrant)",
            "AST Parsing",
            "Microservices Architecture",
            "AI Agent Integration"
        ],
        frameWorkIcons: [
            { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", name: "React" },
            { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg", name: "Vite" },
            { url: "https://unpkg.com/devicon@2.15.1/icons/laravel/laravel-plain.svg", name: "Laravel" },
            { url: "../assets/langchain-color.png", name: "LangChain" }
        ],
        builtWithIcons: [
            { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", name: "JavaScript" },
            { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", name: "PHP" },
            { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", name: "TypeScript" },
            { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", name: "MySQL" }
        ],
        gitHubRepo: "https://github.com/MohammadRstm/FlowPilot"
    }
];