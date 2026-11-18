
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingSection from "@/components/BookingSection";

export default function BookingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FAF7EE]">
        <BookingSection />
      </main>
      <Footer />
    </>
  );
}
