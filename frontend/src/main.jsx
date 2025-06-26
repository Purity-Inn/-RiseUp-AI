import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { mockBackend } from './mockBackend.js';
import '../index.css';

// Use mock backend for development when DFX is not available
const backend = mockBackend;
console.log('Using mock backend for development');


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
          content: "Welcome to RiseUp AI! I'm a sovereign AI agent running entirely on the Internet Computer blockchain. I'm here to inspire, educate, and empower young minds in the world of decentralized technology. Ask me anything about blockchain, Motoko, ICP, or just chat about your dreams and goals!" 
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
            content: "Welcome back to RiseUp AI! I'm ready for a fresh conversation. What would you like to explore today?" 
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
            content: "I'm experiencing some technical difficulties. This might be due to network issues or the backend being offline. Please try again in a moment!" 
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements - More Subtle */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-slate-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-gray-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-slate-700 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>
      
      <div className="w-full max-w-4xl h-[85vh] bg-gray-900/60 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-600/30 flex flex-col relative z-10">
        {/* Header - Darker and More Subtle */}
        <div className="bg-gradient-to-r from-gray-800 to-slate-800 text-gray-200 p-6 text-xl font-bold rounded-t-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800/30 to-slate-800/30"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-700/40 rounded-full flex items-center justify-center text-gray-300 text-sm">
                AI
              </div>
              <span className="bg-gradient-to-r from-gray-300 to-slate-200 bg-clip-text text-transparent font-extrabold">
                RiseUp AI
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-emerald-400">Live on IC</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={exportChat}
                  className="p-2 hover:bg-gray-700/30 rounded-lg transition-colors duration-200 text-gray-300"
                  title="Export Chat"
                >
                  ↓
                </button>
                <button
                  onClick={clearChat}
                  className="p-2 hover:bg-gray-700/30 rounded-lg transition-colors duration-200 text-gray-300"
                  title="Clear Chat"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Chat Area - Darker Theme */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-gray-800/20 to-gray-900/30" ref={chatBoxRef}>
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
                    <img src={avatar} className="h-10 w-10 rounded-full mr-3 ring-2 ring-gray-500/30" />
                    {isThinking && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full animate-ping"></div>
                    )}
                  </div>
                )}
                <div className={`max-w-md rounded-2xl p-4 shadow-lg transition-all duration-300 group-hover:scale-105 ${
                  isUser 
                    ? 'bg-gradient-to-r from-slate-600 to-gray-600 text-gray-100' 
                    : isThinking
                      ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white animate-pulse'
                      : 'bg-gray-800/40 text-gray-200 border border-gray-600/30 backdrop-blur-sm'
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
                  <img src={avatar} className="h-10 w-10 rounded-full ml-3 ring-2 ring-gray-500/30" />
                )}
              </div>
            );
          })}
        </div>
          {/* Quick Action Buttons */}
          {chat.length === 1 && (
            <div className="px-6 pb-4">
              <div className="text-center mb-4">
                <p className="text-gray-400 text-sm">Try these conversation starters:</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  "What is the Internet Computer?",
                  "Teach me about Motoko", 
                  "How can I start building on IC?",
                  "What makes blockchain special?",
                  "I want to learn programming",
                  "Tell me about this hackathon project"
                ].map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInputValue(suggestion)}
                    className="px-3 py-2 bg-gray-800/30 hover:bg-gray-700/40 rounded-lg text-gray-300 hover:text-gray-200 text-xs transition-all duration-200 backdrop-blur-sm border border-gray-600/30 hover:border-gray-500/50"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Input Form - Darker Theme */}
        <div className="border-t border-gray-600/30 bg-gray-800/30 backdrop-blur-sm p-4 rounded-b-2xl">
          <form onSubmit={handleSubmit} className="flex space-x-3">
            <div className="flex-1 relative">
              <textarea
                className="w-full p-4 bg-gray-800/40 border border-gray-600/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent placeholder-gray-400 text-gray-200 transition-all duration-300 backdrop-blur-sm resize-none"
                placeholder="Ask RiseUp AI anything... (Press Enter to send, Shift+Enter for new line)"
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
                  <div className="w-5 h-5 border-2 border-gray-500/30 border-t-gray-300 rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-slate-600 to-gray-600 text-gray-200 px-8 py-4 rounded-xl hover:from-slate-700 hover:to-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 font-medium shadow-lg hover:shadow-xl"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-gray-400/30 border-t-gray-200 rounded-full animate-spin"></div>
              ) : (
                <span className="flex items-center space-x-2">
                  <span>Send</span>
                </span>
              )}
            </button>
          </form>
          
          {/* Stats Footer */}
          <div className="mt-3 flex justify-center items-center space-x-6 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <span>•</span>
              <span>{messageCount} messages</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>•</span>
              <span>Powered by IC</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>•</span>
              <span>Hackathon Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
