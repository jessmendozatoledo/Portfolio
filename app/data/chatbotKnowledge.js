import { resumeData } from "./resume";

export const initialSuggestions = [
  "What is your background?",
  "Tell me about your projects",
  "What are your technical skills?",
  "How can I contact Jess?",
  "Tell me about your Thesis",
  "Where did you intern / OJT?",
  "Where do you live?",
  "Are you a skilled programmer?",
  "Is your main focus hardware or software?",
  "When did you graduate?",
];

export function generateBotResponse(input) {
  const query = (input || "").toLowerCase().trim();

  if (!query) {
    return "Hi there! Feel free to ask me anything about Jess's background, engineering projects, skills, or contact info!";
  }

  // Greetings
  if (
    /^(hi|hello|hey|greetings|good day|sup|yo|what's up|kamusta|hola)\b/i.test(
      query
    )
  ) {
    return `Hello! 👋 I'm Jess's AI Portfolio Assistant. You can ask me about his computer engineering background, hardware & software projects, certifications, or how to get in touch!`;
  }

  // Small Talk / How are you
  if (
    query.includes("how are you") ||
    query.includes("how's it going") ||
    query.includes("doing well") ||
    query.includes("how do you do")
  ) {
    return `I'm just a bot, but I'm doing great, thanks for asking! 😊 I'm here to help you learn more about Jess. What would you like to know?`;
  }

  // Identity / Who is Jess
  if (
    query.includes("who are you") ||
    query.includes("who is jess") ||
    query.includes("about you") ||
    query.includes("background") ||
    query.includes("introduce") ||
    query.includes("summary")
  ) {
    return `Jess M. Toledo is a Computer Engineer focused on bridging the physical and digital worlds: embedded systems (ESP32, Arduino, Raspberry Pi) and software interfaces. He is graduating with a BS in Computer Engineering from Philippine Christian University – Dasmariñas (June 2026).`;
  }

  // --- GENERAL KNOWLEDGE / BASIC QUESTIONS ---

  // Residence / Location
  if (
    query.includes("where do you live") ||
    query.includes("where are you from") ||
    query.includes("residing") ||
    query.includes("residence") ||
    query.includes("location") ||
    query.includes("address") ||
    query.includes("based in")
  ) {
    return `📍 Jess is currently residing in **General Trias, Cavite**. You can find his full address in the Contact section.`;
  }

  // Graduation / When did you graduate
  if (
    query.includes("when did you graduate") ||
    query.includes("when do you graduate") ||
    query.includes("graduation date") ||
    query.includes("graduating") ||
    query.includes("graduate")
  ) {
    return `🎓 Jess is graduating with a **Bachelor of Science in Computer Engineering** from **Philippine Christian University – Dasmariñas Campus** in **June 2026**.`;
  }

  // Are you a skilled programmer?
  if (
    query.includes("are you a skilled programmer") ||
    query.includes("are you a good programmer") ||
    query.includes("can you code") ||
    query.includes("programming skill") ||
    query.includes("coding skill")
  ) {
    return `💻 Yes! Jess is a skilled programmer with hands-on experience in **JavaScript, C++, Python, Java, HTML, and CSS**. He has built full-stack web applications and embedded systems, demonstrating strong problem-solving and debugging abilities.`;
  }

  // Main focus: Hardware or Software?
  if (
    query.includes("hardware or software") ||
    query.includes("main focus") ||
    query.includes("specialization") ||
    query.includes("specialty") ||
    query.includes("hardware") ||
    query.includes("software")
  ) {
    return `⚙️ Jess's expertise bridges **both hardware and software**. His thesis involved building a smart feeder system using Raspberry Pi and ESP32 (hardware) with Python and C/C++ (software). He is equally comfortable with embedded systems and full-stack web development, making him a versatile Computer Engineer.`;
  }

  // What is your project?
  if (
    query.includes("what is your project") ||
    query.includes("what are your projects") ||
    query.includes("tell me about your project") ||
    query.includes("main project")
  ) {
    return `Here are some of Jess's key featured works:\n\n1. 🐾 **Smart Feeder System** (Raspberry Pi + ESP32 IoT for animal shelters)\n2. 💼 **Deskhrx UI/UX & Frontend Optimization** (Internship at Inspire Holdings, BGC)\n3. 🔬 **GENTEFL International Conference Research** (Da Nang, Vietnam)\n\nYou can click on any project in the Projects section on this page to view live demos, video walkthroughs, and source code!`;
  }

  // --- END GENERAL KNOWLEDGE ---

  // Thesis / Smart Feeder
  if (
    query.includes("thesis") ||
    query.includes("smart feeder") ||
    query.includes("dog") ||
    query.includes("rescued") ||
    query.includes("raspberry pi") ||
    query.includes("tails of freedom")
  ) {
    const thesis = resumeData.experience.find(
      (e) => e.type === "Thesis Project" || e.title?.includes("Smart Feeder")
    );
    return `🐾 **Thesis Project:** "${thesis?.title || "Smart Feeder with Monitoring System"}"\n\n• **Tech Stack:** Raspberry Pi (Python) + ESP32 (C/C++)\n• **Features:** Automated scheduled dispensing, real-time food level monitoring, and an interactive local dashboard.\n• **Application:** Designed and implemented for rescued dogs at Tails of Freedom Animal Haven.\n• **Demo:** Check out his live demo on PythonAnywhere or browse the GitHub repo in the Projects section!`;
  }

  // OJT / Internship
  if (
    query.includes("ojt") ||
    query.includes("intern") ||
    query.includes("training") ||
    query.includes("inspire holdings") ||
    query.includes("deskhrx")
  ) {
    return `💼 **On-The-Job Training (2026):**\n• **Company:** Inspire Holdings Inc. (Alliance Global Building, BGC, Taguig City)\n• **Focus:** Enhanced frontend design of the Deskhrx platform, designed UI/UX in Figma, conducted responsive cross-browser testing, and executed QA checks.`;
  }

  // Research / Conference / Vietnam
  if (
    query.includes("vietnam") ||
    query.includes("research") ||
    query.includes("gentefl") ||
    query.includes("humss") ||
    query.includes("conference") ||
    query.includes("practicality")
  ) {
    return `🌏 **International Research Presentation:**\nJess presented practical research at the **GENTEFL International Conference 2023** in Da Nang, Vietnam on *"Practicality and Appetency: Factors Affecting Career Choices of HUMSS Students"*, exploring socio-economic, parental, and peer influences.`;
  }

  // Projects general
  if (query.includes("project") || query.includes("portfolio")) {
    return `Here are some of Jess's key featured works:\n\n1. 🐾 **Smart Feeder System** (Raspberry Pi + ESP32 IoT for animal shelters)\n2. 💼 **Deskhrx UI/UX & Frontend Optimization** (Internship at Inspire Holdings, BGC)\n3. 🔬 **GENTEFL International Conference Research** (Da Nang, Vietnam)\n\nYou can click on any project in the Projects section on this page to view live demos, video walkthroughs, and source code!`;
  }

  // Skills
  if (
    query.includes("skill") ||
    query.includes("tech stack") ||
    query.includes("technolog") ||
    query.includes("language") ||
    query.includes("python") ||
    query.includes("c++") ||
    query.includes("java") ||
    query.includes("react")
  ) {
    const list = resumeData.skills
      .map((s) => `• **${s.category}:** ${s.items.join(", ")}`)
      .join("\n");
    return `Jess's primary technical skills spanning hardware & software:\n\n${list}`;
  }

  // Education / College / Degree
  if (
    query.includes("education") ||
    query.includes("school") ||
    query.includes("college") ||
    query.includes("university") ||
    query.includes("degree") ||
    query.includes("study")
  ) {
    const eduList = resumeData.education
      .map((e) => `• **${e.degree}** at ${e.school} (${e.year}) — *${e.location}*`)
      .join("\n");
    return `🎓 **Education:**\n\n${eduList}`;
  }

  // Certifications
  if (
    query.includes("cert") ||
    query.includes("license") ||
    query.includes("course") ||
    query.includes("bootcamp")
  ) {
    return `🏆 Jess holds multiple technical certifications including:\n• **Linux For Cybersecurity** (BlackStride Cyber, 2026)\n• **Data Science Bootcamps** (DataMites Global Institute)\n• **Cybersecurity Boot Camp** (SkillLogic)\n• **Arduino & Microcontrollers** (Batangas State University & PCU)\n• **IT Infrastructure & Firewall Protection** (Ethel Programming)\n\nYou can inspect each certificate modal in the Certifications section above!`;
  }

  // Contact / Email / Phone / Social
  if (
    query.includes("contact") ||
    query.includes("email") ||
    query.includes("phone") ||
    query.includes("number") ||
    query.includes("reach") ||
    query.includes("hire") ||
    query.includes("message") ||
    query.includes("linkedin") ||
    query.includes("github")
  ) {
    return `📬 You can connect with Jess directly:\n• **Email:** [${resumeData.contact.email}](mailto:${resumeData.contact.email})\n• **Phone:** ${resumeData.contact.phone}\n• **Location:** ${resumeData.contact.address}\n• **GitHub:** [jessmendozatoledo](${resumeData.contact.social.github})\n• **LinkedIn:** [Jess Mendoza Toledo](${resumeData.contact.social.linkedin})\n\nOr scroll to the bottom to send a direct message via the Contact form!`;
  }

  // Resume / CV
  if (
    query.includes("resume") ||
    query.includes("cv") ||
    query.includes("download")
  ) {
    return `📄 You can view and download Jess's latest resume via the download button in the Hero section or inspect the full interactive sections right on this page!`;
  }

  // Thanks / Compliments
  if (
    query.includes("thank") ||
    query.includes("cool") ||
    query.includes("awesome") ||
    query.includes("great")
  ) {
    return `You're very welcome! Let me know if you need anything else or feel free to message Jess directly anytime! 😊`;
  }

  // Fallback - Out of Portfolio Scope
  return `I cannot give you the answer with your queries. Please reach out to Jess directly through the following channels:\n\n• **WhatsApp / Viber:** ${resumeData.contact.phone}\n• **Email:** ${resumeData.contact.email}`;
}