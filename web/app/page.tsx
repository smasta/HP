import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Audience from "@/components/Audience";
import Statement from "@/components/Statement";
import Business from "@/components/Business";
import DataSection from "@/components/DataSection";
import Project from "@/components/Project";
import News from "@/components/News";
import Recruit from "@/components/Recruit";
import Contact from "@/components/Contact";
import Store from "@/components/Store";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <Audience />
        <Statement />
        <Business />
        <DataSection />
        <Project />
        <News />
        <Recruit />
        <Contact />
        <Store />
      </main>
      <Footer />
    </>
  );
}
