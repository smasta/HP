import Footer from "./Footer";
import Header from "./Header";
import ScrollMotion from "./ScrollMotion";
import ScrollReveal from "./ScrollReveal";

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollReveal />
      <ScrollMotion />
      <Header solidFromTop />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
