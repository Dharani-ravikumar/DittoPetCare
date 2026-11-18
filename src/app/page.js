
import Navbar from "@/components/Navbar";
import HeroSection from "@/homepage/HeroSection";
import ServicesSection from "@/homepage/ServicesSection";
import AboutSection from "@/homepage/AboutSection";
import ProductsSection from "@/homepage/ProductSection";
import ChooseUs from "@/homepage/ChooseUs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ProductsSection />
      <ChooseUs />
      <Footer />
    </main>
  );
} 
