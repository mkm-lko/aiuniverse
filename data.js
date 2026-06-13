/* ==========================================================================
   AI UNIVERSE — Shared AI Database
   Included in every page before script.js
   ========================================================================== */

const aiDatabase = [
    {
        id: "chatgpt", name: "ChatGPT",
        category: "Chatbot / Productivity", categoryKey: "Chatbots",
        description: "Advanced AI assistant capable of conversation, coding, research, image generation, writing, and problem solving.",
        longDescription: "ChatGPT, developed by OpenAI, is a state-of-the-art conversational interface powered by GPT-4. It excels at parsing complex instructions, writing high-fidelity source code, conducting analysis, and producing creative outputs. It includes native visual understanding, web crawling, DALL-E 3 image generation, and custom GPT creation.",
        rating: "4.9", website: "https://chatgpt.com",
        logoLetter: "G", logoColor: "linear-gradient(135deg, #10a37f, #00f5ff)",
        capabilities: ["Coding", "Deep Research", "Image Generation", "Writing", "Data Analysis", "Brainstorming", "Learning Assistance"],
        comparison: { chat: true, images: true, video: false, audio: true, coding: true, research: true, freePlan: true }
    },
    {
        id: "gemini", name: "Gemini",
        category: "Chatbot / Research", categoryKey: "Chatbots",
        description: "Google's AI assistant with strong multimodal capabilities and visual explanations.",
        longDescription: "Gemini is Google's highly advanced family of multimodal AI models, natively built to understand texts, codes, audios, images, and videos. It offers industry-leading context window lengths (up to 2 million tokens), allowing users to upload entire books, repositories, or hours of footage for instant research.",
        rating: "4.8", website: "https://gemini.google.com",
        logoLetter: "Ge", logoColor: "linear-gradient(135deg, #1a73e8, #8b5cf6)",
        capabilities: ["Visual Explanations", "Research", "Coding", "Multimodal Understanding", "Image Analysis"],
        comparison: { chat: true, images: true, video: false, audio: true, coding: true, research: true, freePlan: true }
    },
    {
        id: "claude", name: "Claude",
        category: "Chatbot", categoryKey: "Chatbots",
        description: "AI assistant known for handling large amounts of information and producing high-quality writing.",
        longDescription: "Created by Anthropic, Claude is highly optimized for complex cognitive tasks, technical reasoning, and professional-grade writing. It features state-of-the-art logic synthesis, particularly inside the Claude 3.5 Sonnet iteration, which has become the gold standard for software engineering and long document indexing.",
        rating: "4.9", website: "https://claude.ai",
        logoLetter: "C", logoColor: "linear-gradient(135deg, #d97706, #ec4899)",
        capabilities: ["Long Documents", "Writing", "Research", "Coding", "Analysis"],
        comparison: { chat: true, images: false, video: false, audio: false, coding: true, research: true, freePlan: true }
    },
    {
        id: "perplexity", name: "Perplexity",
        category: "Research", categoryKey: "Research",
        description: "Research-focused AI with source-backed answers and real-time internet searches.",
        longDescription: "Perplexity AI acts as an answer engine that scans the web in real-time, synthesizes information, and provides answers backed by immediate footnote citations. Its Pro search compiles agents that plan, draft, search, and combine multiple answers to perform deep scholarly research.",
        rating: "4.8", website: "https://perplexity.ai",
        logoLetter: "P", logoColor: "linear-gradient(135deg, #22c55e, #00f5ff)",
        capabilities: ["Real-Time Search", "Citations", "Deep Research", "Information Gathering"],
        comparison: { chat: true, images: false, video: false, audio: false, coding: false, research: true, freePlan: true }
    },
    {
        id: "elevenlabs", name: "ElevenLabs",
        category: "Audio / Voice", categoryKey: "Audio & Voice",
        description: "Industry-leading AI voice generation and voice cloning platform.",
        longDescription: "ElevenLabs designs realistic, expressive voice synthesis models. It generates text-to-speech with organic human cadence, clones voices from short uploads, and enables multilingual dubbing while keeping original vocal signatures intact.",
        rating: "4.9", website: "https://elevenlabs.io",
        logoLetter: "E", logoColor: "linear-gradient(135deg, #ec4899, #8b5cf6)",
        capabilities: ["Voice Generation", "Voice Cloning", "Text To Speech", "Audiobooks"],
        comparison: { chat: false, images: false, video: false, audio: true, coding: false, research: false, freePlan: true }
    },
    {
        id: "midjourney", name: "Midjourney",
        category: "Image Generation", categoryKey: "Image Generation",
        description: "Popular AI image generator for stunning, high-quality, artistic artwork.",
        longDescription: "Midjourney is a text-to-image tool operated via Discord. It yields highly cinematic, artistic, and stylistically versatile graphics. It is a favorite among concept designers, illustrators, and layout artists for producing high-resolution graphics with simple text prompts.",
        rating: "4.8", website: "https://midjourney.com",
        logoLetter: "M", logoColor: "linear-gradient(135deg, #f59e0b, #e11d48)",
        capabilities: ["Artistic Images", "Concept Art", "Character Design", "High Quality Visuals"],
        comparison: { chat: false, images: true, video: false, audio: false, coding: false, research: false, freePlan: false }
    },
    {
        id: "dalle", name: "DALL·E",
        category: "Image Generation", categoryKey: "Image Generation",
        description: "OpenAI's image generation model integrated into ChatGPT.",
        longDescription: "DALL·E 3, built by OpenAI, offers incredible prompt adherence and photorealism. It is natively integrated into ChatGPT, allowing users to modify generated canvases using natural language conversations, paint masks, and style filters.",
        rating: "4.7", website: "https://openai.com/dall-e-3",
        logoLetter: "D", logoColor: "linear-gradient(135deg, #10a37f, #d97706)",
        capabilities: ["AI Art", "Image Creation", "Creative Design", "Image Editing"],
        comparison: { chat: false, images: true, video: false, audio: false, coding: false, research: false, freePlan: false }
    },
    {
        id: "leonardo-ai", name: "Leonardo AI",
        category: "Design", categoryKey: "Design",
        description: "Creative AI platform for artists and designers with custom asset fine-tuning.",
        longDescription: "Leonardo AI is an image generation sandbox that grants creators precise control over structural assets. It allows custom model training, live canvas painting, canvas outpainting, and real-time generation previews.",
        rating: "4.8", website: "https://leonardo.ai",
        logoLetter: "L", logoColor: "linear-gradient(135deg, #ec4899, #f59e0b)",
        capabilities: ["Game Assets", "AI Art", "Character Design", "Marketing Visuals"],
        comparison: { chat: false, images: true, video: false, audio: false, coding: false, research: false, freePlan: true }
    },
    {
        id: "runway", name: "Runway",
        category: "Video Generation", categoryKey: "Video Generation",
        description: "Leading AI-powered video generation platform with motion control.",
        longDescription: "Runway research focuses on creative video composition. Its Gen-2 and Gen-3 models generate high-fidelity videos from texts, existing images, or templates. Key attributes include structural masking, depth controllers, camera motion tools, and upscale utilities.",
        rating: "4.7", website: "https://runwayml.com",
        logoLetter: "R", logoColor: "linear-gradient(135deg, #ef4444, #8b5cf6)",
        capabilities: ["AI Video Creation", "Video Editing", "Motion Graphics", "Text To Video"],
        comparison: { chat: false, images: false, video: true, audio: false, coding: false, research: false, freePlan: true }
    },
    {
        id: "synthesia", name: "Synthesia",
        category: "Video Generation", categoryKey: "Video Generation",
        description: "Create high-fidelity presentation videos with digital AI avatars.",
        longDescription: "Synthesia targets corporate communications by transforming scripts directly into video files. It houses over 160 photorealistic speaking avatars reading texts in 120+ languages, removing the need for camera teams or voice talent.",
        rating: "4.6", website: "https://synthesia.io",
        logoLetter: "S", logoColor: "linear-gradient(135deg, #10b981, #ef4444)",
        capabilities: ["AI Avatars", "Training Videos", "Business Presentations", "Multilingual Videos"],
        comparison: { chat: false, images: false, video: true, audio: true, coding: false, research: false, freePlan: false }
    },
    {
        id: "github-copilot", name: "GitHub Copilot",
        category: "Coding", categoryKey: "Coding",
        description: "AI coding assistant for developers embedded directly into code editors.",
        longDescription: "GitHub Copilot integrates directly into standard text editors like VS Code. By parsing project files and contexts, it suggests entire functions, inline comments, autocompletes variables, and reviews logic loops to double developer output.",
        rating: "4.8", website: "https://github.com/features/copilot",
        logoLetter: "Co", logoColor: "linear-gradient(135deg, #1f2937, #3b82f6)",
        capabilities: ["Code Generation", "Debugging", "Autocomplete", "Developer Assistance"],
        comparison: { chat: true, images: false, video: false, audio: false, coding: true, research: false, freePlan: false }
    },
    {
        id: "cursor", name: "Cursor",
        category: "Coding", categoryKey: "Coding",
        description: "AI-first code editor designed for rapid software development.",
        longDescription: "Cursor is a fork of VS Code built specifically around agentic AI interactions. It allows developers to chat directly with their repository, prompt changes on multiple files concurrently, autocompletion of edits, and scan compiler warnings automatically.",
        rating: "4.9", website: "https://cursor.com",
        logoLetter: "Cu", logoColor: "linear-gradient(135deg, #3b82f6, #00f5ff)",
        capabilities: ["AI Coding", "Refactoring", "Debugging", "Codebase Understanding"],
        comparison: { chat: true, images: false, video: false, audio: false, coding: true, research: false, freePlan: true }
    },
    {
        id: "notion-ai", name: "Notion AI",
        category: "Productivity", categoryKey: "Productivity",
        description: "AI integrated into workspaces to summarize and outline structured notes.",
        longDescription: "Notion AI augments documentation workspaces. It can auto-summarize long documents, construct action items from notes, draft corporate reports, translate files, and retrieve details across your entire knowledge base.",
        rating: "4.6", website: "https://notion.so",
        logoLetter: "N", logoColor: "linear-gradient(135deg, #1f2937, #10b981)",
        capabilities: ["Summarization", "Writing", "Notes", "Task Management"],
        comparison: { chat: true, images: false, video: false, audio: false, coding: false, research: false, freePlan: false }
    },
    {
        id: "canva-ai", name: "Canva AI",
        category: "Design", categoryKey: "Design",
        description: "AI-enhanced graphics editor for marketing materials and presentations.",
        longDescription: "Canva AI provides standard creators with artificial intelligence generators. It offers Magic Design to format graphics immediately, image generation tools, background eraser filters, and visual translation options.",
        rating: "4.7", website: "https://canva.com",
        logoLetter: "Ca", logoColor: "linear-gradient(135deg, #ec4899, #3b82f6)",
        capabilities: ["Graphic Design", "Image Generation", "Presentations", "Social Media Content"],
        comparison: { chat: false, images: true, video: false, audio: false, coding: false, research: false, freePlan: true }
    },
    {
        id: "khanmigo", name: "Khanmigo",
        category: "Education", categoryKey: "Education",
        description: "AI tutor designed for schools to explain math, science, and history.",
        longDescription: "Developed by Khan Academy, Khanmigo acts as an online tutor. Rather than writing answers for students, it guides them using Socratic questioning methods, maps code lines, and assists teachers with constructing classroom curricula.",
        rating: "4.5", website: "https://khanacademy.org",
        logoLetter: "K", logoColor: "linear-gradient(135deg, #14b8a6, #f59e0b)",
        capabilities: ["Tutoring", "Learning Assistance", "Homework Help", "Explanations"],
        comparison: { chat: true, images: false, video: false, audio: false, coding: true, research: false, freePlan: false }
    }
];

// Category metadata for home page showcase
const categoryMeta = [
    { key: "Chatbots",        label: "Chatbots",          icon: "💬", color: "linear-gradient(135deg, #8b5cf6, #ec4899)", count: 3 },
    { key: "Image Generation",label: "Image Generation",  icon: "🖼️", color: "linear-gradient(135deg, #f59e0b, #e11d48)", count: 3 },
    { key: "Video Generation",label: "Video Generation",  icon: "🎬", color: "linear-gradient(135deg, #ef4444, #8b5cf6)", count: 2 },
    { key: "Audio & Voice",   label: "Audio & Voice",     icon: "🎙️", color: "linear-gradient(135deg, #ec4899, #8b5cf6)", count: 1 },
    { key: "Coding",          label: "Coding",             icon: "⌨️", color: "linear-gradient(135deg, #3b82f6, #00f5ff)", count: 2 },
    { key: "Research",        label: "Research",           icon: "🔬", color: "linear-gradient(135deg, #22c55e, #00f5ff)", count: 1 },
    { key: "Productivity",    label: "Productivity",       icon: "⚡", color: "linear-gradient(135deg, #8b5cf6, #10b981)", count: 1 },
    { key: "Design",          label: "Design",             icon: "🎨", color: "linear-gradient(135deg, #ec4899, #f59e0b)", count: 2 },
    { key: "Education",       label: "Education",          icon: "📚", color: "linear-gradient(135deg, #14b8a6, #f59e0b)", count: 1 },
];

// Rankings data
const rankingsData = {
    coding:   ["cursor", "claude", "github-copilot", "chatgpt"],
    research: ["perplexity", "gemini", "claude", "chatgpt"],
    images:   ["midjourney", "dalle", "leonardo-ai"],
    videos:   ["runway", "synthesia"],
    audio:    ["elevenlabs"]
};

// Trending Data for Home Page Showcase
const trendingData = {
    weekly: {
        id: "claude",
        periodLabel: "Weekly Trend",
        metric: "+18% search growth",
        badge: "🔥 Weekly Spike",
        reason: "Claude 3.5 Sonnet has taken the coding and reasoning world by storm, setting new benchmarks for codebase editing and general logic."
    },
    monthly: {
        id: "chatgpt",
        periodLabel: "Monthly Trend",
        metric: "+24% user increase",
        badge: "👑 Monthly Leader",
        reason: "ChatGPT continues to lead global AI adoption with its state-of-the-art GPT-4o model, real-time search, and custom GPT store."
    }
};

