import About from "@/components/About";
import AdventureSection from "@/components/Adventure";
import Advices from "@/components/Advices";
import Hero from "@/components/Hero";
import PrivateCampingSection from "@/components/PrivateCampingSection";
import TestimonialSlider from "@/components/TestimonialSlider";
// app/(site)/page.tsx
import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
export default async function Home() {
  

const heroData = await client.fetch(
    groq`*[_type == "hero"][0] {
      backgroundImage,
      heading,
      subheading,
      buttonText,
      buttonLink
    }`
  );

  // Log the data to debug
  console.log('Hero Data:', heroData);

  // Provide fallback values if heroData is undefined or incomplete
  if (!heroData) {
    return <div>Error: Hero data not found</div>;
  }
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
