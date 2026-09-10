import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MusicPlayer from "@/components/MusicPlayer";
import Landing from "@/components/Landing";
import SoundGate from "@/components/SoundGate";


export default function Home() {
  return (
    <main>
      <SoundGate />
      <Nav />
      <Landing />
      <Hero />
      <MusicPlayer />
      <Work />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
