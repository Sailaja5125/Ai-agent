'use client';

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'; // Import axios

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

const agents = ['Email', 'SMS', 'WhatsApp', 'Slack'];

const AgentPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState(''); // State for the chatbot input
  const [promptInput, setPromptInput] = useState(''); // State for the left-side prompt textarea
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!chatInput.trim()) return;

    const userMessage: Message = { sender: 'user', text: chatInput };
    setMessages((prev) => [...prev, userMessage]);
    
    // Clear the chat input immediately
    setChatInput('');

    try {
      // Construct the payload as requested: {"messages": "..."}
      // The 'agent' field has been removed from the payload.
      const payload = {
        messages: chatInput, 
      };

      // Axios automatically sets Content-Type to application/json for JSON payloads.
      // If file uploads were involved, you'd use FormData for multipart/form-data.
      const response = await axios.post('/api/chat-response', payload);

      // Assuming the response structure is always { success: true, message: "...", data: { html: "..." } }
      // This 'html' field contains the plain text of the email as per your example.
      const apiResponseText = response.data.data.html || 'No specific content in response.';

      // Update the left-side prompt textarea with the API response's text content
      setPromptInput(apiResponseText);

      // Add the API response to the chatbot messages
      const botMessage: Message = {
        sender: 'bot',
        text: apiResponseText,
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, botMessage]);
      }, 800); // Small delay for bot response to appear

    } catch (error) {
      console.error('Failed to fetch from API:', error);
      const errorMessage: Message = {
        sender: 'bot',
        text: 'Sorry, something went wrong. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAgentSelect = (agent: string) => {
    setSelectedAgent(agent);
  };

  const handleAgentRemove = () => {
    setSelectedAgent(null);
  };

  return (
    <div className="h-screen flex bg-[#121212] text-white font-sans">
      {/* Left Side: TextArea & Agent Selector */}
      <div className="w-1/2 h-full bg-[#1a1a1a] border-r border-gray-700 flex flex-col rounded-l-lg">

        {/* TextArea (60%) */}
        <div className="h-[60%] p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-2">📝 Input Prompt</h2>
          <textarea
            name="textarea"
            id="prompt-textarea"
            className="flex-1 bg-[#2b2b2b] p-4 rounded-lg resize-none outline-none text-white text-sm focus:ring-2 focus:ring-[#059865]"
            placeholder="Write your prompt or notes here..."
            value={promptInput} // Controlled component
            onChange={(e) => setPromptInput(e.target.value)} // Update state on change
          />
        </div>

        {/* Select Agent (40%) */}
        <div className="h-[40%] p-6 bg-[#181818] border-t border-gray-700 flex flex-col rounded-bl-lg">
          <h2 className="text-lg font-semibold mb-3">🎯 Select Agent</h2>

          {/* Selected Agent Display */}
          {selectedAgent && (
            <div className="mb-4 flex items-center justify-between bg-[#059865] px-4 py-2 rounded-lg text-sm font-medium w-fit min-w-[100px] shadow-lg">
              <span>{selectedAgent}</span>
              <button 
                onClick={handleAgentRemove} 
                className="ml-2 text-white hover:text-red-300 font-bold transition-colors duration-200"
                aria-label={`Remove ${selectedAgent} agent`}
              >
                ✖
              </button>
            </div>
          )}

          {/* Agent Options */}
          <div className="grid grid-cols-2 gap-3">
            {agents.map((agent) => (
              <div
                key={agent}
                onClick={() => handleAgentSelect(agent)}
                className={`cursor-pointer px-4 py-2 rounded-lg text-sm text-center border border-gray-600 transition-all duration-200 shadow-md
                  ${selectedAgent === agent
                    ? 'bg-[#059865] text-white font-semibold transform scale-105'
                    : 'bg-[#2a2a2a] hover:bg-[#333] text-gray-300 hover:text-white'
                  }`}
              >
                {agent}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side: ChatBot */}
      <div className="w-1/2 h-full flex flex-col rounded-r-lg">
        <header className="px-6 py-4 bg-[#1e1e1e] text-xl font-bold shadow-md rounded-tr-lg">
          🤖 AI Chatbot
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-[#121212]">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs md:max-w-md px-4 py-3 rounded-xl text-sm shadow-lg
                  ${msg.sender === 'user'
                    ? 'bg-[#059865] text-white rounded-br-none'
                    : 'bg-[#2a2a2a] text-gray-200 rounded-bl-none'
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </main>

        <footer className="p-4 bg-[#1e1e1e] border-t border-gray-700 rounded-br-lg">
          <div className="flex items-center bg-[#2b2b2b] rounded-lg px-4 py-2 shadow-inner">
            <textarea
              className="flex-1 bg-transparent resize-none outline-none text-sm text-white p-1 max-h-32 focus:ring-2 focus:ring-[#059865]"
              rows={1}
              value={chatInput} // Controlled component
              placeholder="Type a message..."
              onChange={(e) => setChatInput(e.target.value)} // Update state on change
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleSend}
              className="ml-3 px-4 py-2 bg-[#059865] hover:bg-[#047652] rounded-md text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Send
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AgentPage;
