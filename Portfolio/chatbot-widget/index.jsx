import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css"; // move your chatbot styles here

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatOpen, setChatOpen] = useState(true);

  const chatBoxRef = useRef(null);

  // Responses
  const responses = {
    hello: "👋 Hey there! I’m Sonya’s portfolio assistant. Ask me about her skills, projects, references or how to contact her.",
    projects: "Sonya has built responsive apps, API integrations, and custom WordPress solutions.",
    skills: "She works with JavaScript, Vue.js, WordPress, and more—always learning new tools!",
    contact: "You can reach Sonya at sonya.williams1203@gmail.com 📧",
    references:
      "Yes! Sonya has references from Marvin Chau (Senior Software Developer at Glasshive) and Bill Wettingfeld (President of Glasshive).",
    "marvin chau":
      "Sonya Williams was an integral member of the Glasshive development team, where we built the foundation of a rapidly growing department...",
    marvin:
      "Sonya Williams was an integral member of the Glasshive development team...",
    chau:
      "Sonya Williams was an integral member of the Glasshive development team...",
    manager:
      "Sonya Williams was an integral member of the Glasshive development team...",
    "bill wettingfeld":
      "I am pleased to recommend Sonya Williams, who has worked as a Junior Engineer at GlassHive...",
    bill:
      "I am pleased to recommend Sonya Williams, who has worked as a Junior Engineer at GlassHive...",
  };

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // Load initial greeting
  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text: "👋 Hey there! I’m Sonya’s portfolio assistant. Ask me about her skills, projects, references or how to contact her.",
      },
    ]);
  }, []);

  // Handle sending a message
  const handleSend = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      const userMsg = input;
      setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
      setInput("");

      let reply =
        "Sorry, I don’t understand that yet. Try asking about projects, skills, references or how to contact.";
      for (const key in responses) {
        if (userMsg.toLowerCase().includes(key)) {
          reply = responses[key];
          break;
        }
      }

      setTimeout(() => {
        setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
      }, 600);
    }
  };

  return (
    <div
      id="chatbot"
      style={{
        transform: chatOpen ? "translateY(0)" : "translateY(calc(100% - 40px))",
      }}
    >
      <div id="chat-header">
        💬 Chat with Sonya's Portfolio
        <label className="container">
          <input
            type="checkbox"
            checked={chatOpen}
            onChange={() => setChatOpen(!chatOpen)}
          />
          <svg
            viewBox="0 0 512 512"
            height="1.2em"
            xmlns="http://www.w3.org/2000/svg"
            className="chevron-down"
          >
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
          </svg>
        </label>
      </div>

      <div id="chat-box" ref={chatBoxRef}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message ${msg.sender === "user" ? "user" : "bot"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <input
        type="text"
        id="chat-input"
        placeholder="Ask me something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleSend}
      />
    </div>
  );
}
