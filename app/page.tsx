import SmoothScroll from "@/components/SmoothScroll";
import Scene3D from "@/components/Scene3D";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Cursor from "@/components/Cursor";

export default function Home() {
  return (
    <div className="relative w-full">
      <SmoothScroll />
      <Cursor />
      <Scene3D />
      <Navbar />

      <main>
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}
