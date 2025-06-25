// Advanced Mock Backend for ICP Hackathon Demo
export const mockBackend = {
  // Simulate the chat function with enhanced AI-like responses
  chat: async (messages) => {
    // Simulate realistic network delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2500));
    
    // Get the last user message and conversation context
    const lastMessage = messages[messages.length - 1];
    const userInput = lastMessage?.content || "";
    const conversationHistory = messages.map(m => m.content).join(' ').toLowerCase();
    
    // Advanced contextual responses for hackathon demo
    const responses = {
      // ICP and Blockchain specific
      icp: [
        "The Internet Computer is revolutionizing how we think about web applications! As a native IC application, I'm living proof that we can build entirely on-chain experiences. What aspect of ICP interests you most?",
        "🚀 Running on the Internet Computer means I'm truly decentralized - no AWS, no cloud providers, just pure blockchain power! The IC's unique consensus mechanism allows for web-speed transactions.",
        "The Internet Computer's canister smart contracts are game-changing. Unlike Ethereum's limited state storage, IC canisters can store unlimited data and serve web content directly!"
      ],
      
      motoko: [
        "Motoko is my native language! 💜 It's specifically designed for the Internet Computer with features like orthogonal persistence, actor-based concurrency, and seamless WebAssembly compilation.",
        "What I love about Motoko is how it handles async programming naturally. The actor model makes building distributed systems intuitive, and the type system prevents so many runtime errors!",
        "Motoko's orthogonal persistence means I never have to worry about databases or data serialization - my state just persists automatically between upgrades. It's pure magic! ✨"
      ],
      
      hackathon: [
        "🏆 This hackathon project showcases the power of building sovereign AI on blockchain! We're demonstrating real-time AI chat completely on-chain - no traditional cloud infrastructure needed.",
        "What makes this hackathon entry special is the integration of Motoko smart contracts with modern React UI, creating a seamless web3 experience that feels like web2 but runs on pure blockchain.",
        "🎯 Our hackathon vision: democratize AI by making it truly decentralized. No single company controls me - I exist on the Internet Computer for everyone!"
      ],
      
      ai: [
        "As a decentralized AI, I represent the future of artificial intelligence - open, transparent, and running on blockchain infrastructure that no single entity controls. 🤖",
        "Unlike centralized AI services, I'm running entirely on the Internet Computer. This means transparent execution, immutable responses, and true digital sovereignty!",
        "🧠 My intelligence comes from the collective power of the IC network. I'm not just an AI - I'm a demonstration of what's possible when AI meets true decentralization."
      ],
      
      youth: [
        "💪 I'm specifically designed to inspire and empower young minds! Whether you're learning to code, exploring blockchain, or dreaming of changing the world - I'm here to support your journey.",
        "The future belongs to young innovators like you! Blockchain and decentralized tech are leveling the playing field - you can build world-changing apps from anywhere.",
        "🌟 Young minds are the key to web3 adoption. You're not just users - you're the builders, creators, and visionaries who will shape the decentralized future!"
      ],
      
      technical: [
        "🔧 This dApp uses React + TailwindCSS frontend communicating with Motoko backend canisters. The entire stack is deployed on IC infrastructure - no traditional servers needed!",
        "The architecture leverages IC's unique capabilities: orthogonal persistence for state management, inter-canister calls for modularity, and HTTP outcalls for external data integration.",
        "💻 Built with modern web3 stack: Motoko for backend logic, DFX for deployment, React for UI, and TailwindCSS for styling. Everything optimized for the Internet Computer!"
      ]
    };
    
    // Context-aware response selection
    const getContextualResponse = (input) => {
      input = input.toLowerCase();
      
      // Greetings
      if (input.match(/\b(hello|hi|hey|greetings|good morning|good afternoon)\b/)) {
        return `Hello! 🌟 Welcome to RiseUp AI - your decentralized AI companion running live on the Internet Computer! I'm here to inspire, educate, and help you explore the exciting world of blockchain technology. What brings you here today?`;
      }
      
      // ICP/Internet Computer
      if (input.match(/\b(icp|internet computer|ic|canister|dfinity)\b/)) {
        return responses.icp[Math.floor(Math.random() * responses.icp.length)];
      }
      
      // Motoko
      if (input.match(/\b(motoko|actor|async|await|programming language)\b/)) {
        return responses.motoko[Math.floor(Math.random() * responses.motoko.length)];
      }
      
      // Hackathon
      if (input.match(/\b(hackathon|competition|demo|project|win|prize)\b/)) {
        return responses.hackathon[Math.floor(Math.random() * responses.hackathon.length)];
      }
      
      // AI/Artificial Intelligence
      if (input.match(/\b(ai|artificial intelligence|machine learning|neural|smart)\b/)) {
        return responses.ai[Math.floor(Math.random() * responses.ai.length)];
      }
      
      // Youth empowerment
      if (input.match(/\b(youth|young|student|learn|education|future|inspire)\b/)) {
        return responses.youth[Math.floor(Math.random() * responses.youth.length)];
      }
      
      // Technical questions
      if (input.match(/\b(code|programming|development|tech|build|stack|architecture)\b/)) {
        return responses.technical[Math.floor(Math.random() * responses.technical.length)];
      }
      
      // Blockchain general
      if (input.match(/\b(blockchain|crypto|decentralized|web3|smart contract|dapp)\b/)) {
        return "🔗 Blockchain technology is reshaping the digital landscape! As a dApp running entirely on the Internet Computer, I'm experiencing firsthand how decentralized systems can provide better user experiences while maintaining true digital sovereignty. What aspect of blockchain excites you most?";
      }
      
      // Questions about capabilities
      if (input.match(/\b(what can you do|help me|capabilities|features)\b/)) {
        return "🚀 I'm RiseUp AI, a sovereign AI agent designed to inspire and educate! I can discuss blockchain technology, help with IC development questions, share insights about Motoko programming, and most importantly - encourage young minds to build the decentralized future. I'm particularly passionate about youth empowerment in tech! What would you like to explore?";
      }
      
      // Default inspirational responses
      const defaultResponses = [
        `🌟 That's a fascinating perspective! "${input.substring(0, 50)}${input.length > 50 ? '...' : ''}" touches on important themes. As a decentralized AI, I believe the future belongs to those who dare to build it. What's your vision for the future?`,
        `💡 Interesting thought! You know, running on the Internet Computer gives me a unique perspective on innovation and decentralization. How do you see technology shaping the world around us?`,
        `🚀 I love engaging with curious minds! Your question about "${input.substring(0, 40)}${input.length > 40 ? '...' : ''}" shows real thoughtfulness. The beautiful thing about blockchain is it empowers anyone to build world-changing applications. What inspires you to learn and create?`,
        `🎯 Great question! As an AI living entirely on blockchain infrastructure, I'm constantly amazed by what's possible when we combine creativity with decentralized technology. What's driving your interest in this space?`
      ];
      
      return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    };
    
    return getContextualResponse(userInput);
  },
  
  // Enhanced prompt function with better responses
  prompt: async (promptText) => {
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));
    
    if (!promptText || promptText.trim() === "") {
      return "I'd love to help! Please share what's on your mind, and let's explore it together. 🌟";
    }
    
    return `🤖 You asked: "${promptText}"\n\nAs RiseUp AI running on the Internet Computer, I find this thought-provoking! This kind of curiosity and questioning is exactly what drives innovation in the decentralized web. Keep exploring, keep building, and remember - the future is created by those brave enough to imagine it differently! 🚀`;
  }
};
