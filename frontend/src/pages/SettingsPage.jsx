import React, { useState } from "react";
import { THEMES } from "../../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send, CheckCircle, Settings } from "lucide-react";

const initialMessages = [
  { id: 1, content: "Hey! How's it going?", isSent: false, time: "12:42 PM" },
  {
    id: 2,
    content: "I'm doing great! Just working on some new features.",
    isSent: true,
    time: "12:45 PM"
  },
  {
    id: 3,
    content: "That sounds exciting! Can't wait to see what you're building.",
    isSent: false,
    time: "12:47 PM"
  }
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;
    
    const newMessage = {
      id: messages.length + 1,
      content: inputValue,
      isSent: true,
      time: getCurrentTime()
    };
    
    setMessages([...messages, newMessage]);
    setInputValue("");
    
    // Add automated response after a short delay
    setTimeout(() => {
      const responseMessage = {
        id: messages.length + 2,
        content: "Thanks for your message! This is an interactive preview.",
        isSent: false,
        time: getCurrentTime()
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 1000);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-base-100 container mx-auto px-4 pt-16 max-w-4xl pb-12">
      <div className="space-y-10">
        <div className="flex items-center gap-3 mb-8">
          <Settings className="text-primary w-6 h-6" />
          <h1 className="text-2xl font-bold">Appearance Settings</h1>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-base-content">Theme</h2>
            <p className="text-sm text-base-content/70">
              Personalize your experience by choosing a theme that suits your style
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 mt-4">
            {THEMES.map((t) => (
              <button
                key={t}
                className={`
                  group flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200
                  ${theme === t 
                    ? "bg-base-200 shadow-md ring-2 ring-primary/50" 
                    : "hover:bg-base-200 hover:shadow-sm"}
                `}
                onClick={() => setTheme(t)}
              >
                <div className="relative h-12 w-full rounded-lg overflow-hidden shadow-inner" data-theme={t}>
                  <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-px p-1">
                    <div className="rounded-md bg-primary"></div>
                    <div className="rounded-md bg-secondary"></div>
                    <div className="rounded-md bg-accent"></div>
                    <div className="rounded-md bg-neutral"></div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-medium truncate">
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </span>
                  {theme === t && (
                    <CheckCircle size={14} className="text-primary" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 mt-10">
          <h3 className="text-xl font-semibold">Interactive Preview</h3>
          <p className="text-sm text-base-content/70">
            Try sending messages to see how your selected theme looks in action
          </p>
          
          <div className="rounded-2xl border border-base-300 overflow-hidden bg-base-100 shadow-lg transition-all duration-300 mt-4">
            <div className="p-6 bg-base-200">
              <div className="max-w-lg mx-auto transform transition-all duration-300 hover:scale-[1.02]">
                {/* Mock Chat UI */}
                <div className="bg-base-100 rounded-xl shadow-md overflow-hidden border border-base-300">
                  {/* Chat Header */}
                  <div className="px-5 py-4 border-b border-base-300 bg-base-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium shadow-md">
                        J
                      </div>
                      <div>
                        <h3 className="font-semibold">John Doe</h3>
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 bg-success rounded-full"></div>
                          <p className="text-xs text-base-content/70">Online now</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-5 space-y-5 min-h-[280px] max-h-[280px] overflow-y-auto bg-base-100" id="chat-messages">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                      >
                        {!message.isSent && (
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium mr-2 self-end shadow-sm">
                            J
                          </div>
                        )}
                        <div
                          className={`
                            max-w-[75%] rounded-2xl p-4 shadow-sm
                            ${message.isSent 
                              ? "bg-primary text-primary-content" 
                              : "bg-base-200"}
                          `}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`
                              text-[10px] mt-2 text-right
                              ${message.isSent ? "text-primary-content/70" : "text-base-content/60"}
                            `}
                          >
                            {message.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-t border-base-300 bg-base-100">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="input input-bordered flex-1 text-sm h-12 rounded-xl shadow-sm focus:shadow-md transition-shadow duration-200"
                        placeholder="Type a message..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                      />
                      <button 
                        className="btn btn-primary h-12 min-h-0 w-12 rounded-xl shadow-sm"
                        onClick={handleSendMessage}
                      >
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;