"use client";
import { useState } from "react";
import Section from "./Section";

export default function ContactUs() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill out all fields.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          subject: "New Portfolio Message",
          from_name: "Portfolio Visitor",
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contact" className="bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="bg-primary/10 text-primary border border-primary/20 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">Contact Me!</span>
          <p className="text-zinc-400 max-w-lg">Looking to collaborate or just want to say Hi? Feel free to reach out. <br></br>I'd love to hear from you!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 p-8 rounded-2xl flex flex-col items-center justify-center text-center group hover:border-primary/30 transition-all duration-500">
            <h3 className="text-xl font-semibold text-white mb-8"></h3>
            <div className="space-y-6 text-left w-full max-w-[280px]">
              <a href="mailto:jessmendozatoledo@gmail.com" className="flex items-center gap-3 text-zinc-300 hover:text-primary transition-colors group/link">
                <div className="w-10 h-10 shrink-0 rounded-full bg-zinc-800 flex items-center justify-center group-hover/link:bg-primary/10 transition-colors">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <span className="font-medium text-sm break-all">jessmendozatoledo@gmail.com</span>
              </a>
              <a href="tel:+639762217754" className="flex items-center gap-3 text-zinc-300 hover:text-primary transition-colors group/link">
                <div className="w-10 h-10 shrink-0 rounded-full bg-zinc-800 flex items-center justify-center group-hover/link:bg-primary/10 transition-colors">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <span className="font-medium text-sm">+639-7622-17754</span>
              </a>
              <div className="flex items-center gap-3 text-zinc-300">
                <div className="w-10 h-10 shrink-0 rounded-full bg-zinc-800 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <span className="font-medium">General Trias, Cavite, Philippines</span>
              </div>

              {/* WhatsApp & Viber Icons */}
              <div className="flex items-center gap-4 pt-2 border-t border-zinc-800/50 mt-4">
                <a href="https://wa.me/639762217754" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-400 hover:text-[#25D366] transition-colors group/wa">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.373 0 0 5.373 0 12C0 14.12 0.553 16.113 1.52 17.853L0 24L6.3 22.453C7.967 23.44 9.913 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0Z" fill="#25D366" />
                    <path d="M17.507 14.307C17.26 14.18 16.033 13.573 15.807 13.493C15.58 13.413 15.413 13.373 15.247 13.62C15.08 13.867 14.6 14.433 14.453 14.6C14.307 14.767 14.16 14.793 13.913 14.667C13.667 14.54 12.867 14.273 11.92 13.427C11.18 12.767 10.68 11.953 10.533 11.707C10.387 11.46 10.513 11.327 10.64 11.2C10.753 11.087 10.893 10.907 11.02 10.773C11.147 10.64 11.187 10.54 11.273 10.373C11.36 10.207 11.32 10.067 11.26 9.94C11.2 9.813 10.72 8.633 10.52 8.147C10.327 7.673 10.127 7.74 9.98 7.733C9.84 7.727 9.68 7.727 9.52 7.727C9.36 7.727 9.1 7.787 8.887 8.02C8.673 8.253 8.073 8.813 8.073 10.033C8.073 11.253 8.96 12.433 9.087 12.6C9.213 12.767 10.827 15.253 13.293 16.32C13.88 16.573 14.34 16.727 14.693 16.84C15.28 17.027 15.813 17 16.24 16.933C16.713 16.86 17.693 16.34 17.893 15.773C18.093 15.207 18.093 14.727 18.033 14.627C17.973 14.527 17.753 14.433 17.507 14.307Z" fill="white" />
                  </svg>
                  <span className="text-xs font-semibold">WhatsApp</span>
                </a>
                <a href="viber://chat?number=639762217754" className="flex items-center gap-2 text-zinc-400 hover:text-[#7360f2] transition-colors group/viber">
                  <svg className="w-6 h-6" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100" height="100" rx="22" fill="#7360f2" />
                    <path d="M22,18 H78 C85,18 88,22 88,28 V62 C88,69 85,72 78,72 H56 L44,82 L44,72 H22 C15,72 12,69 12,62 V28 C12,22 15,18 22,18 Z" fill="white" />
                    <path d="M38,52 C38,52 34,48 33,44 C32,40 34,37 36,36 L40,35 C41,34.5 42,35 42.5,36 L44.5,41 C45,42 44.5,43 44,43.5 L42,45 C42,45 43,48 46,51 C49,54 52,55 52,55 L53.5,53 C54,52.5 55,52 56,52.5 L61,54.5 C62,55 62.5,56 62,57 L61,61 C60.5,63 58,65 54,64 C50,63 46,60 42,56 C40.5,54.5 39,53 38,52 Z" fill="#7360f2" />
                    <path d="M55,44 C57,44 59,46 59,48" stroke="#7360f2" strokeWidth="3" strokeLinecap="round" fill="none" />
                    <path d="M55,38 C61,38 65,42 65,48" stroke="#7360f2" strokeWidth="3" strokeLinecap="round" fill="none" />
                    <path d="M55,32 C64,32 71,39 71,48" stroke="#7360f2" strokeWidth="3" strokeLinecap="round" fill="none" />
                  </svg>
                  <span className="text-xs font-semibold">Viber</span>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 p-8 rounded-2xl hover:border-primary/30 transition-all duration-500">
            <h3 className="text-xl font-semibold text-white mb-6 text-center">Send a Message</h3>
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                <p className="text-zinc-400">Thanks for reaching out. I'll get back to you soon.</p>
                <button onClick={() => setSubmitted(false)} className="mt-8 text-primary hover:underline font-medium">Send another message</button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Name *</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Your Name" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-primary/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Email *</label>
                  <input type="text" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="your@email.com" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-primary/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Message *</label>
                  <textarea rows="4" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="How can we work together?" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-primary/50 transition-colors resize-none"></textarea>
                </div>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <button disabled={isSubmitting} onClick={handleSubmit} className="w-full bg-primary text-zinc-950 font-bold py-4 rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-primary/20">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
