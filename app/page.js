import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
export default function Home() {
  return (
    <main className="bg-zinc-950 min-h-screen">
      <Navbar />
      <Hero />
      <Education />
      <Experience />
      <Skills />
    </main>
  );
}
