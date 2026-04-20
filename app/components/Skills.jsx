import Section from "./Section";
import { resumeData } from "../data/resume";

export default function Skills() {
    return (
        <Section id="skills" className="bg-zinc-950 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[90px]" />
            <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[90px]" />

            <div className="flex flex-col items-center mb-12 relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Technical Skills
                </h2>
                <div className="w-20 h-1 bg-primary rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl mx-auto relative z-10">
                {resumeData.skills.map((skillGroup, index) => (
                    <div
                        key={index}
                        className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group"
                    >
                        <h3 className="text-lg font-semibold text-white mb-4 group-hover:text-primary transition-colors">
                            {skillGroup.category}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skillGroup.items.map((skill, i) => (
                                <span
                                    key={i}
                                    className="bg-zinc-800 text-zinc-300 text-xs md:text-sm px-3 py-1 rounded-md border border-zinc-700/50"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>


        </Section>
    );
}
