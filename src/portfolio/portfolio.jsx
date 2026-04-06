import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
const PROJECTS = [
  {
    id: "example",
    title: "Cloud Cup",
    description:
      "A café-style drink recipe app that blends front-end development techniques with a cozy, illustration-driven user experience.",
    to: "/cafe-drink",
    thumb: `${process.env.PUBLIC_URL || ""}/images/cafe-vibes-thumb.png`,
  },
  {
    id: "2",
    title: "Sproutwise",
    description:
      "A personal garden planning app that leverages location-based data, dynamic weather integration, and structured plant care logic.",
    to: "/sproutwise-app",
    thumb: `${process.env.PUBLIC_URL || ""}/images/sproutwise-thumb.png`,
  },
  {
    id: "3",
    title: "Project title",
    description: "Short description of the project. Tech stack used.",
    to: null,
    thumb: "https://via.placeholder.com/400x160",
  },
];

export default function Portfolio({ darkMode, setDarkMode }) {
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
    <main className="page-main">
        <header className="hero">
          <div className="hero-inner">
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
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
        {PROJECTS.map((p) => {
          const inner = (
            <>
              <img src={p.thumb} alt={`${p.title} preview`} />
              <div className="content">
                <h3 className="project-card-title">{p.title}</h3>
                <p>{p.description}</p>
                {p.to ? (
                  <span className="project-card__cta">
                    View project{" "}
                    <span className="project-card__cta-arrow" aria-hidden>
                      →
                    </span>
                  </span>
                ) : null}
              </div>
            </>
          );
          return p.to ? (
            <Link
              key={p.id}
              to={p.to}
              className="project-card project-card--link"
            >
              {inner}
            </Link>
          ) : (
            <div key={p.id} className="project-card">
              {inner}
            </div>
          );
        })}
      </section>

      <section className="contact">
        <h2>Let’s Build Something Amazing</h2>
        <a
          className="contact-me-button"
          href="mailto:sonya.williams1203@gmail.com"
        >
          <div className="dots_border" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="sparkle"
            aria-hidden
          >
            <path
              className="path"
              strokeLinejoin="round"
              strokeLinecap="round"
              stroke="black"
              fill="black"
              d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z"
            />
            <path
              className="path"
              strokeLinejoin="round"
              strokeLinecap="round"
              stroke="black"
              fill="black"
              d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z"
            />
            <path
              className="path"
              strokeLinejoin="round"
              strokeLinecap="round"
              stroke="black"
              fill="black"
              d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z"
            />
          </svg>
          <span className="text_button">Contact Me</span>
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
  );
}
