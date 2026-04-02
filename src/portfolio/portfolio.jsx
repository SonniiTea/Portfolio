import React, { useState, useEffect, useRef } from "react";
import "./style.css";

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatOpen, setChatOpen] = useState(true);

  const chatBoxRef = useRef(null);

  // Scroll reveal effect
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Initial bot greeting
  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text: "👋 Hey there! I’m Sonya’s portfolio assistant. Ask me about her skills, projects, references or how to contact her.",
      },
    ]);
  }, []);

  // Scroll chat to bottom on new message
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const responses = {
    hello: "👋 Hey there! I’m Sonya’s portfolio assistant. Ask me about her skills, projects, references or how to contact her.",
    projects:
      "Sonya has built responsive apps, API integrations, and custom WordPress solutions.",
    skills:
      "She works with JavaScript, Vue.js, WordPress, and more—always learning new tools!",
    contact: "You can reach Sonya at sonya.williams1203@gmail.com 📧",
    references:
      "Yes! Sonya has references from Marvin Chau (Senior Software Developer at Glasshive) and Bill Wettingfeld (President of Glasshive).",
    "marvin chau":
      "Sonya Williams was an integral member of the Glasshive development team... (full Marvin Chau reference).",
    marvin:
      "Sonya Williams was an integral member of the Glasshive development team... (full Marvin Chau reference).",
    "bill wettingfeld":
      "I am pleased to recommend Sonya Williams... (full Bill Wettingfeld reference).",
    bill:
      "Per Bill Wettingfeld, President at Glasshive: I am pleased to recommend Sonya Williams... (full reference).",
  };

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
    <div className={`app-root${darkMode ? " dark-mode" : ""}`}>
      <div className="bg-blobs" aria-hidden="true">
        <span className="blob blob-a">
          <span className="blob-fill" />
        </span>
        <span className="blob blob-b">
          <span className="blob-fill" />
        </span>
        <span className="blob blob-c">
          <span className="blob-fill" />
        </span>
      </div>

      <main className="page-main">
        <header className="hero">
          <div className="hero-inner">
            <div className="theme-toggle-wrap">
              <span className="theme-toggle-label" aria-hidden="true">
                {darkMode ? "Dark" : "Light"}
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={darkMode}
                aria-label={
                  darkMode ? "Switch to light mode" : "Switch to dark mode"
                }
                className="theme-slider"
                onClick={() => setDarkMode(!darkMode)}
              >
                <span className="theme-slider-track">
                  <span className="theme-slider-face theme-slider-face--sun" aria-hidden>
                    ☀️
                  </span>
                  <span className="theme-slider-face theme-slider-face--moon" aria-hidden>
                    🌙
                  </span>
                  <span className="theme-slider-knob" aria-hidden />
                </span>
              </button>
            </div>
            <h1>Sonya Williams</h1>
            <p>
              Front End Software Engineer | Turning clean code into creative
              solutions
            </p>
          </div>
        </header>

      <section className="about">
        <h2>About Me</h2>
        <p>
          I’m a Front End Software Engineer with a passion for creating intuitive,
          user-friendly applications. I enjoy problem-solving, learning new
          tools, and working with others to bring ideas to life.
        </p>
      </section>

      <section className="projects">
        {[1, 2, 3].map((i) => (
          <div className="project-card" key={i}>
            <img
              src="https://via.placeholder.com/400x160"
              alt="Project Thumbnail"
            />
            <div className="content">
              <h3>Project Title</h3>
              <p>Short description of the project. Tech stack used.</p>
            </div>
          </div>
        ))}
      </section>

      <section className="contact">
        <h2>Let’s Build Something Amazing</h2>
        <a className="btn-contact" href="mailto:sonya.williams1203@gmail.com">
          Contact Me
        </a>
      </section>

      {/* Chatbot */}
      <div
        id="chatbot"
        style={{
          transform: chatOpen
            ? "translateY(0)"
            : "translateY(calc(100% - 40px))",
        }}
      >
        <div id="chat-header">
          💬 Chat with Sonya's Portfolio
          <label className="chat-collapse-btn">
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
          className="chat-input"
          placeholder="Ask me something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleSend}
        />
      </div>
      </main>
    </div>
  );
}
