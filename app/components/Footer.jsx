"use client";

export default function Footer() {
  const techs = [
    { name: "Next.js", icon: "N" },
    { name: "React", icon: "⚛" },
    { name: "HTML", icon: "H" },
    { name: "CSS", icon: "C" },
    { name: "Tailwind CSS", icon: "🎨" },
    { name: "JavaScript", icon: "JS" },
  ];

  return (
    <footer className="main-footer relative w-full bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Left — Credit */}
        <p className="text-zinc-400 text-[11px] text-center sm:text-left tracking-wider uppercase">
          Designed &amp; Built by{" "}
          <span className="font-semibold text-primary">
            Jess Mendoza Toledo
          </span>
        </p>

        {/* Right — Tech stack badges */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {techs.map((tech) => (
            <span
              key={tech.name}
              className="tech-badge flex items-center gap-1.5 px-2.5 py-0.5 rounded-full
                         bg-zinc-800/70 border border-white/5
                         text-[10px] font-medium text-zinc-300
                         hover:border-primary/50 hover:text-primary
                         transition-colors duration-300"
            >
              <span className="font-bold text-primary/80 text-[10px]">
                {tech.icon}
              </span>
              {tech.name}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
