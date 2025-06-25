import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { mockBackend } from './mockBackend.js';
import '../public/bot.svg';
import '../public/user.svg';
import '../index.css';

// Use mock backend for development when DFX is not available
const backend = mockBackend;
console.log('⚠️ Using mock backend for development');


const App = () => {
  const [chat, setChat] = useState(() => {
    // Load chat history from localStorage
    const saved = localStorage.getItem('riseup-ai-chat');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.log('Failed to load chat history');
      }
    }
    return [
      {
        system: { 
          content: "🌟 Welcome to RiseUp AI! I'm a sovereign AI agent running entirely on the Internet Computer blockchain. I'm here to inspire, educate, and empower young minds in the world of decentralized technology. Ask me anything about blockchain, Motoko, ICP, or just chat about your dreams and goals! 🚀" 
        }
      }
    ];
  });
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const chatBoxRef = useRef(null);

  // Save chat to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('riseup-ai-chat', JSON.stringify(chat));
    setMessageCount(chat.filter(msg => 'user' in msg).length);
  }, [chat]);

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => scrollToBottom(), [chat]);

  // Clear chat function
  const clearChat = () => {
    const confirmClear = window.confirm('Are you sure you want to clear the chat history?');
    if (confirmClear) {
      const initialChat = [
        {
          system: { 
            content: "🌟 Welcome back to RiseUp AI! I'm ready for a fresh conversation. What would you like to explore today? 🚀" 
          }
        }
      ];
      setChat(initialChat);
      localStorage.setItem('riseup-ai-chat', JSON.stringify(initialChat));
    }
  };

  // Export chat function
  const exportChat = () => {
    const chatData = {
      timestamp: new Date().toISOString(),
      messages: chat,
      messageCount: messageCount,
      app: 'RiseUp AI - ICP Hackathon Project'
    };
    
    const dataStr = JSON.stringify(chatData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `riseup-ai-chat-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMsg = { user: { content: inputValue.trim() } };
    setChat(prev => [...prev, userMsg, { system: { content: "Thinking..." } }]);
    setInputValue('');
    setIsLoading(true);

    // Add slight delay for better UX
    setTimeout(() => scrollToBottom(), 100);

    const history = chat.slice(1).concat(userMsg).map(msg => {
      return msg.user
        ? { role: { User: null }, content: msg.user.content }
        : { role: { Assistant: null }, content: msg.system.content };
    });

    try {
      const reply = await backend.chat(history);
      setChat(prev => {
        const updated = [...prev];
        updated.pop(); // remove "Thinking..."
        return [...updated, { system: { content: reply } }];
      });
    } catch (err) {
      console.error('Chat error:', err);
      setChat(prev => {
        const updated = [...prev];
        updated.pop(); // remove "Thinking..."
        return [...updated, { 
          system: { 
            content: "🚨 I'm experiencing some technical difficulties. This might be due to network issues or the backend being offline. Please try again in a moment!" 
          } 
        }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
    if (e.key === 'Enter' && e.shiftKey) {
      // Allow new line with Shift+Enter
      return;
    }
  };

  const formatTime = () => {
    const d = new Date();
    return d.getHours().toString().padStart(2, '0') + ':' +
           d.getMinutes().toString().padStart(2, '0');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>
      
      <div className="w-full max-w-4xl h-[85vh] bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 flex flex-col relative z-10">
        {/* Header with Glowing Effect */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 text-xl font-bold rounded-t-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-blue-600/50 animate-pulse"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                🤖
              </div>
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent font-extrabold">
                RiseUp AI
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-300">Live on IC</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={exportChat}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                  title="Export Chat"
                >
                  📥
                </button>
                <button
                  onClick={clearChat}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                  title="Clear Chat"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Enhanced Chat Area with Better Styling */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-white/5 to-white/10" ref={chatBoxRef}>
          {chat.map((msg, idx) => {
            const isUser = 'user' in msg;
            const content = isUser ? msg.user.content : msg.system.content;
            const avatar = isUser ? '/user.svg' : '/bot.svg';
            const name = isUser ? 'You' : 'RiseUp AI';
            const isThinking = content === "Thinking...";

            return (
              <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'} group`}>
                {!isUser && (
                  <div className="relative">
                    <img src={avatar} className="h-10 w-10 rounded-full mr-3 ring-2 ring-purple-400/50" />
                    {isThinking && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                    )}
                  </div>
                )}
                <div className={`max-w-md rounded-2xl p-4 shadow-lg transition-all duration-300 group-hover:scale-105 ${
                  isUser 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' 
                    : isThinking
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white animate-pulse'
                      : 'bg-white/20 text-white border border-white/30 backdrop-blur-sm'
                }`}>
                  <div className="text-xs mb-2 opacity-75 flex items-center justify-between">
                    <span className="font-medium">{name}</span>
                    <span>{formatTime()}</span>
                  </div>
                  <div className={`${isThinking ? 'flex items-center space-x-2' : ''}`}>
                    {isThinking ? (
                      <>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
                        </div>
                        <span>AI is thinking...</span>
                      </>
                    ) : (
                      <div className="whitespace-pre-wrap">{content}</div>
                    )}
                  </div>
                </div>
                {isUser && (
                  <img src={avatar} className="h-10 w-10 rounded-full ml-3 ring-2 ring-blue-400/50" />
                )}
              </div>
            );
          })}
        </div>
          {/* Quick Action Buttons */}
          {chat.length === 1 && (
            <div className="px-6 pb-4">
              <div className="text-center mb-4">
                <p className="text-white/70 text-sm">✨ Try these conversation starters:</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  "What is the Internet Computer? 🌐",
                  "Teach me about Motoko 💜", 
                  "How can I start building on IC? 🚀",
                  "What makes blockchain special? 🔗",
                  "I want to learn programming 💻",
                  "Tell me about this hackathon project 🏆"
                ].map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInputValue(suggestion)}
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white/80 hover:text-white text-xs transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/40"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Enhanced Input Form */}
        <div className="border-t border-white/20 bg-white/10 backdrop-blur-sm p-4 rounded-b-2xl">
          <form onSubmit={handleSubmit} className="flex space-x-3">
            <div className="flex-1 relative">
              <textarea
                className="w-full p-4 bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent placeholder-white/70 text-white transition-all duration-300 backdrop-blur-sm resize-none"
                placeholder="Ask RiseUp AI anything... 🚀 (Press Enter to send, Shift+Enter for new line)"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                rows="1"
                style={{
                  minHeight: '56px',
                  maxHeight: '120px',
                  height: 'auto'
                }}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                }}
              />
              {isLoading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-xl hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 font-medium shadow-lg hover:shadow-xl"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <span className="flex items-center space-x-2">
                  <span>Send</span>
                  <span>🚀</span>
                </span>
              )}
            </button>
          </form>
          
          {/* Stats Footer */}
          <div className="mt-3 flex justify-center items-center space-x-6 text-xs text-white/60">
            <div className="flex items-center space-x-1">
              <span>💬</span>
              <span>{messageCount} messages</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>⚡</span>
              <span>Powered by IC</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>🏆</span>
              <span>Hackathon Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
