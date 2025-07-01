import About from "@/components/About";
import AdventureSection from "@/components/Adventure";
import Advices from "@/components/Advices";
import Hero from "@/components/Hero";
import PrivateCampingSection from "@/components/PrivateCampingSection";
import TestimonialSlider from "@/components/TestimonialSlider";

export default async function Home() {
  


  return (
  <div>
    {/* <Navbar /> */}
    <Hero />
    <About />
    <AdventureSection />
    <TestimonialSlider />
    <PrivateCampingSection />
   <Advices />


  </div>
  );
}
