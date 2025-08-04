'use client';

import React, { useState, useRef, useEffect } from 'react';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

const agents = ['Email', 'SMS', 'WhatsApp', 'Slack'];

const AgentPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    const botMessage: Message = {
      sender: 'bot',
      text: `Response from ${selectedAgent ?? 'Default Agent'}`,
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, botMessage]);
    }, 800);

    setInput('');
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
    <div className="h-screen flex bg-[#121212] text-white">
      {/* Left Side: TextArea & Agent Selector */}
      <div className="w-1/2 h-full bg-[#1a1a1a] border-r border-gray-700 flex flex-col">

        {/* TextArea (60%) */}
        <div className="h-[60%] p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-2">📝 Input Prompt</h2>
          <textarea
            name="textarea"
            id="yu"
            className="flex-1 bg-[#2b2b2b] p-4 rounded-lg resize-none outline-none text-white text-sm"
            placeholder="Write your prompt or notes here..."
          />
        </div>

        {/* Select Agent (40%) */}
        <div className="h-[40%] p-6 bg-[#181818] border-t border-gray-700 flex flex-col">
          <h2 className="text-lg font-semibold mb-3">🎯 Select Agent</h2>

          {/* Selected Agent Display */}
          {selectedAgent && (
            <div className="mb-4 flex items-center justify-between bg-[#059865] px-4 py-2 rounded-lg text-sm font-medium w-1/4">
              <span>{selectedAgent}</span>
              <button onClick={handleAgentRemove} className="hover:text-red-400 font-bold">
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
                className={`cursor-pointer px-4 py-2 rounded-lg text-sm text-center border border-gray-600 transition-all duration-200 ${
                  selectedAgent === agent
                    ? 'bg-[#059865] text-white font-semibold'
                    : 'bg-[#2a2a2a] hover:bg-[#333] text-gray-300'
                }`}
              >
                {agent}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side: ChatBot */}
      <div className="w-1/2 h-full flex flex-col">
        <header className="px-6 py-4 bg-[#1e1e1e] text-xl font-bold shadow-md">
          🤖 AI Chatbot
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs md:max-w-md px-4 py-3 rounded-xl text-sm ${
                  msg.sender === 'user'
                    ? 'bg-[#059865] text-white'
                    : 'bg-[#2a2a2a] text-gray-200'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </main>

        <footer className="p-4 bg-[#1e1e1e] border-t border-gray-700">
          <div className="flex items-center bg-[#2b2b2b] rounded-lg px-4 py-2">
            <textarea
              className="flex-1 bg-transparent resize-none outline-none text-sm text-white p-1 max-h-32"
              rows={1}
              value={input}
              placeholder="Type a message..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleSend}
              className="ml-3 px-4 py-1 bg-[#059865] hover:bg-[#047652] rounded-md text-sm"
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
