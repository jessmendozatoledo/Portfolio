import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Education from "./components/Education";
import Experience from "./components/Experience";
import ContactUs from "./components/ContactMe";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Navbar />
      <Hero />
      <Education />
      <Experience />
      <ContactUs />
      <Footer />
    </main>
  );
}
