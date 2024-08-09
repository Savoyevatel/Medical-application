import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Login from "./components/Login";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <div className="container mt-24 mx-auto px-12 py-4">
        {/* mt-24 to avoid overlapping */}
        <Navbar />
        <HeroSection />
        
      </div>
      <Footer/>
    </main>
  );
}
