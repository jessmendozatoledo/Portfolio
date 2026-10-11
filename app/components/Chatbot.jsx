"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { generateBotResponse, initialSuggestions } from "../data/chatbotKnowledge";

// ─── Theme tokens (inline – immune to global CSS cascade) ───────────────────
const DARK = {
  window:     { background: "rgba(18,18,22,0.97)", border: "1px solid rgba(63,63,70,0.65)", boxShadow: "0 25px 60px -10px rgba(0,0,0,0.75)" },
  header:     { background: "rgba(9,9,11,0.97)",   borderBottom: "1px solid rgba(63,63,70,0.5)" },
  title:      { color: "#f4f4f5" },
  subtitle:   { color: "#a1a1aa" },
  iconBtn:    { color: "#a1a1aa", background: "transparent", border: "none", cursor: "pointer" },
  msgBot:     { background: "rgba(39,39,42,0.9)",  color: "#f4f4f5", border: "1px solid rgba(63,63,70,0.55)" },
  msgUser:    { background: "linear-gradient(135deg,#0284c7,#2563eb)", color: "#ffffff" },
  bold:       { color: "#38bdf8", fontWeight: "600" },
  link:       { color: "#38bdf8", textDecoration: "underline" },
  timestamp:  { color: "#71717a" },
  tsUser:     { color: "rgba(224,242,254,0.8)" },
  chipsBar:   { background: "rgba(9,9,11,0.8)",    borderTop: "1px solid rgba(63,63,70,0.4)" },
  chip:       { background: "rgba(14,165,233,0.12)", border: "1px solid rgba(56,189,248,0.35)", color: "#7dd3fc" },
  footer:     { background: "rgba(9,9,11,0.97)",   borderTop: "1px solid rgba(63,63,70,0.5)" },
  input:      { background: "#18181b", border: "1px solid #3f3f46", color: "#f4f4f5" },
  sendBtn:    { background: "#38bdf8", color: "#09090b" },
  typingBubble: { background: "rgba(39,39,42,0.85)", border: "1px solid rgba(63,63,70,0.5)" },
};

const LIGHT = {
  window:     { background: "#ffffff",  border: "1px solid #e4e4e7",  boxShadow: "0 20px 40px -8px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.05)" },
  header:     { background: "#f8fafc",  borderBottom: "1px solid #e2e8f0" },
  title:      { color: "#0f172a" },
  subtitle:   { color: "#64748b" },
  iconBtn:    { color: "#64748b",  background: "transparent", border: "none", cursor: "pointer" },
  msgBot:     { background: "#f1f5f9",  color: "#0f172a",  border: "1px solid #e2e8f0" },
  msgUser:    { background: "linear-gradient(135deg,#0284c7,#2563eb)", color: "#ffffff" },
  bold:       { color: "#0369a1", fontWeight: "600" },
  link:       { color: "#0284c7", textDecoration: "underline" },
  timestamp:  { color: "#94a3b8" },
  tsUser:     { color: "rgba(224,242,254,0.9)" },
  chipsBar:   { background: "#f8fafc",  borderTop: "1px solid #e2e8f0" },
  chip:       { background: "#e0f2fe",  border: "1px solid #bae6fd",  color: "#0369a1" },
  footer:     { background: "#ffffff",  borderTop: "1px solid #e2e8f0" },
  input:      { background: "#f8fafc",  border: "1px solid #cbd5e1",  color: "#0f172a" },
  sendBtn:    { background: "#0284c7",  color: "#ffffff" },
  typingBubble: { background: "#f1f5f9", border: "1px solid #e2e8f0" },
};

export default function Chatbot() {
  const [isOpen, setIsOpen]         = useState(false);
  const [messages, setMessages]     = useState([
    {
      id: "welcome",
      sender: "bot",
      text: "Hi! 👋 I'm Jess's AI Assistant. Ask me anything about his projects, skills, education, or how to get in touch!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping]     = useState(false);
  const [hasUnread, setHasUnread]   = useState(true);
  const [isLight, setIsLight]       = useState(false);

  const chatEndRef = useRef(null);
  const inputRef   = useRef(null);

  // Detect light-mode class on <html>
  useEffect(() => {
    const root = document.documentElement;
    const check = () => setIsLight(root.classList.contains("light-mode"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const T = isLight ? LIGHT : DARK;

  // Auto-scroll to latest message
  useEffect(() => {
    if (isOpen) chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  const handleSendMessage = (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;

    setMessages((prev) => [...prev, { id: "user-" + Date.now(), sender: "user", text, timestamp: new Date() }]);
    setInputValue("");
    setIsTyping(true);

    const responseText = generateBotResponse(text);
    const delay = Math.min(1200, Math.max(500, responseText.length * 15));
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: "bot-" + Date.now(), sender: "bot", text: responseText, timestamp: new Date() }]);
      setIsTyping(false);
    }, delay);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendMessage(); }
  };

  const handleClearChat = () => {
    setMessages([{ id: "welcome-" + Date.now(), sender: "bot", text: "Chat cleared! How can I assist you? 😊", timestamp: new Date() }]);
  };

  // Inline markdown renderer.
  // Uses <div> (not <span>) for line wrappers to avoid globals.css
  // `html.light-mode & span { color: ... !important }` overriding text.
  // Plain text is emitted as raw strings (inherit div's inline color).
  // <b> is used for bold (not targeted by globals overrides).
  const renderContent = (text, isUser) => {
    const bubbleColor = isUser ? "#ffffff" : (isLight ? "#0f172a" : "#f4f4f5");
    const boldColor   = isUser ? "#e0f2fe" : (isLight ? "#0369a1" : "#38bdf8");
    const linkColor   = isUser ? "#bae6fd" : (isLight ? "#0284c7"  : "#38bdf8");

    return text.split("\n").map((line, li) => {
      const parts = [];
      let last    = 0;
      const regex = /(\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\))/g;
      let m;

      while ((m = regex.exec(line)) !== null) {
        if (m.index > last) {
          // Raw string — no span — inherits div's color
          parts.push(line.substring(last, m.index));
        }
        if (m[2]) {
          // <b> is not targeted by globals.css !important overrides
          parts.push(
            <b key={`b-${li}-${m.index}`}
               style={{ fontWeight: 700, color: boldColor, fontStyle: "normal" }}>
              {m[2]}
            </b>
          );
        } else if (m[3] && m[4]) {
          parts.push(
            <a key={`a-${li}-${m.index}`}
               href={m[4]}
               target="_blank"
               rel="noopener noreferrer"
               style={{ color: linkColor, textDecoration: "underline" }}>
              {m[3]}
            </a>
          );
        }
        last = regex.lastIndex;
      }
      if (last < line.length) parts.push(line.substring(last));

      // <div> is NOT overridden by globals.css, so inline color is safe
      return (
        <div key={li}
             style={{ color: bubbleColor, lineHeight: 1.6, minHeight: "1em" }}>
          {parts.length > 0 ? parts : (line || "\u00A0")}
        </div>
      );
    });
  };

  return (
    <div id="chatbot-container" style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, userSelect: "none" }}>
      {/* ── Chat Window ─────────────────────────────────────────── */}
      {isOpen && (
        <div
          id="chatbot-window"
          role="dialog"
          aria-label="Jess Portfolio Chatbot"
          style={{
            marginBottom: 16,
            width: "min(92vw, 380px)",
            height: 530,
            maxHeight: "82vh",
            borderRadius: 20,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            ...T.window,
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", flexShrink: 0, ...T.header }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ position: "relative", width: 36, height: 36, borderRadius: "50%", overflow: "hidden", border: "1.5px solid rgba(56,189,248,0.5)", flexShrink: 0, background: "#27272a" }}>
                <Image src="/Latest_resume.jpg" alt="Jess Bot" fill className="object-cover" />
                <span style={{ position: "absolute", bottom: 0, right: 0, width: 10, height: 10, background: "#22c55e", border: "2px solid #09090b", borderRadius: "50%" }} />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, letterSpacing: "0.02em", ...T.title }}>Jess Assistant</h3>
                  <span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 4, background: "rgba(14,165,233,0.18)", color: "#38bdf8", fontWeight: 600 }}>AI</span>
                </div>
                <p style={{ margin: 0, fontSize: 11, ...T.subtitle }}>Ask about projects & experience</p>
              </div>
            </div>

            <div style={{ display: "flex", gap: 4 }}>
              {/* Clear button */}
              <button onClick={handleClearChat} title="Clear chat" style={{ padding: "6px", borderRadius: 8, transition: "background 0.2s", ...T.iconBtn }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" width={16} height={16}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                </svg>
              </button>
              {/* Close button */}
              <button onClick={() => setIsOpen(false)} title="Close" style={{ padding: "6px", borderRadius: 8, transition: "background 0.2s", ...T.iconBtn }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width={16} height={16}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Messages body — scrollbar hidden */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              fontSize: 13,
              /* hide scrollbar cross-browser */
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            className="chatbot-no-scroll"
          >
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <div key={msg.id} style={{ display: "flex", gap: 10, justifyContent: isUser ? "flex-end" : "flex-start", alignItems: "flex-start" }}>
                  {!isUser && (
                    <div style={{ position: "relative", width: 24, height: 24, borderRadius: "50%", overflow: "hidden", border: "1.5px solid rgba(56,189,248,0.4)", flexShrink: 0, marginTop: 2, background: "#27272a" }}>
                      <Image src="/Latest_resume.jpg" alt="Bot" fill className="object-cover" />
                    </div>
                  )}
                  <div
                    style={{
                      maxWidth: "84%",
                      padding: "10px 14px",
                      borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
                      wordBreak: "break-word",
                      ...(isUser ? T.msgUser : T.msgBot),
                    }}
                  >
                    {renderContent(msg.text, isUser)}
                    <span style={{ display: "block", fontSize: 9, marginTop: 4, textAlign: "right", ...(isUser ? T.tsUser : T.timestamp) }}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Typing dots */}
            {isTyping && (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ position: "relative", width: 24, height: 24, borderRadius: "50%", overflow: "hidden", border: "1.5px solid rgba(56,189,248,0.4)", flexShrink: 0, background: "#27272a" }}>
                  <Image src="/Latest_resume.jpg" alt="Bot" fill className="object-cover" />
                </div>
                <div style={{ padding: "10px 14px", borderRadius: "18px 18px 18px 4px", display: "flex", gap: 4, alignItems: "center", ...T.typingBubble }}>
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <span key={i} className="animate-bounce" style={{ width: 6, height: 6, background: "#38bdf8", borderRadius: "50%", animationDelay: `${delay}s`, display: "inline-block" }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input row */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: 12, flexShrink: 0, ...T.footer }}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about projects, skills, background..."
              style={{
                flex: 1,
                borderRadius: 12,
                padding: "8px 14px",
                fontSize: 12,
                outline: "none",
                transition: "border-color 0.2s",
                ...T.input,
              }}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isTyping}
              title="Send"
              style={{
                padding: 10,
                borderRadius: 12,
                border: "none",
                fontWeight: 700,
                cursor: inputValue.trim() && !isTyping ? "pointer" : "not-allowed",
                opacity: !inputValue.trim() || isTyping ? 0.4 : 1,
                transition: "all 0.15s",
                boxShadow: "0 4px 12px rgba(14,165,233,0.3)",
                flexShrink: 0,
                ...T.sendBtn,
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={16} height={16} style={{ transform: "rotate(45deg) translate(-1px,-1px)" }}>
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ── FAB ─────────────────────────────────────────────────── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Jess Assistant Chatbot"
        style={{
          position: "relative",
          width: 56,
          height: 56,
          borderRadius: "50%",
          border: "none",
          background: "linear-gradient(135deg,#0ea5e9,#06b6d4)",
          color: "#000",
          cursor: "pointer",
          boxShadow: "0 8px 28px rgba(14,165,233,0.45)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 10px 32px rgba(14,165,233,0.6)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)";   e.currentTarget.style.boxShadow = "0 8px 28px rgba(14,165,233,0.45)"; }}
      >
        {/* Pulse ring */}
        <span style={{ position: "absolute", inset: -4, borderRadius: "50%", background: "rgba(14,165,233,0.25)", animation: "ping 2s cubic-bezier(0,0,0.2,1) infinite", pointerEvents: "none" }} />

        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="#09090b" width={22} height={22}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        ) : (
          <div style={{ position: "relative" }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="#09090b" width={26} height={26}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a.75.75 0 0 1-.974-.94 5.942 5.942 0 0 0 .903-2.617A8.09 8.09 0 0 1 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"/>
            </svg>
            {hasUnread && (
              <span style={{ position: "absolute", top: -4, right: -4, width: 13, height: 13, background: "#22c55e", borderRadius: "50%", border: "2px solid #09090b", boxShadow: "0 0 0 2px rgba(34,197,94,0.4)" }} />
            )}
          </div>
        )}
      </button>
    </div>
  );
}
