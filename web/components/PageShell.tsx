import Footer from "./Footer";
import Header from "./Header";
import ScrollReveal from "./ScrollReveal";

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollReveal />
      <Header solidFromTop />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
