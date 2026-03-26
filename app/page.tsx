import HeroSection from "../components/HeroSection";
import AboutMeSection from "../components/AboutMeSection";
import Skills from "../components/Skills";
import Work from "../components/Work";
import Experience from "../components/Experience";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutMeSection />
      <Experience />
      <Skills />
      <Work />
      <Contact />
    </>
  );
}
