import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Education from "./components/Education";
import Experience from "./components/Experience";
import ContactUs from "./components/ContactMe";
import Footer from "./components/Footer";
import Ferrofluid from "./components/Ferrofluid";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background container for both modes */}
      <div className="fixed inset-0 -z-10 transition-colors duration-700 bg-zinc-950 light-mode:bg-[#fdfdfd]">
        <Ferrofluid 
          colors={["#5e00ff","#063840","#000bff"]}
          speed={0.1}
          scale={0.3}
          turbulence={2}
          fluidity={0.1}
          rimWidth={0.2}
          sharpness={4.6}
          shimmer={2}
          glow={5}
          flowDirection="down"
          opacity={1}
          mouseInteraction={true}
          mouseStrength={0}
          mouseRadius={0.05}
        />
      </div>

      <Navbar />
      <Hero />
      <Education />
      <Experience />
      <ContactUs />
      <Footer />
    </main>
  );
}
