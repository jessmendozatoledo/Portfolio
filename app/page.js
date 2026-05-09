import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import ContactUs from "./components/ContactMe";
export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Navbar />
      <Hero />
      <Education />
      <Experience />
      <Skills />
      <ContactUs />
    </main>
  );
}
