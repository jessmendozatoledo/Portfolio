"use client";
import { useState } from "react";
import Section from "./Section";

export default function ContactUs() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const form = e.target;
        const formData = new FormData(form);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            const data = await response.json();

            if (data.success) {
                setSubmitted(true);
                form.reset();
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

            <div className="max-w-4xl mx-auto px-6 relative z-10">
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
                            <div className="flex items-center gap-3 text-zinc-300">
                                <div className="w-10 h-10 shrink-0 rounded-full bg-zinc-800 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                                <span className="font-medium">Cavite, Philippines</span>
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
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY} />
                                <input type="hidden" name="subject" value="New Portfolio Message" />
                                <input type="hidden" name="from_name" value="Portfolio Visitor" />
                                <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-1">Name *</label>
                                    <input type="text" name="name" required placeholder="Your Name" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-primary/50 transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-1">Email *</label>
                                    <input type="email" name="email" required placeholder="your@email.com" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-primary/50 transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-1">Message *</label>
                                    <textarea name="message" required rows="4" placeholder="How can we work together?" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-primary/50 transition-colors resize-none"></textarea>
                                </div>
                                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                                <button disabled={isSubmitting} className="w-full bg-primary text-zinc-950 font-bold py-4 rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-primary/20">
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </Section>
    );
}