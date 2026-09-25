import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Architecture from "@/components/sections/Architecture";
import Capabilities from "@/components/sections/Capabilities";
import Estimator from "@/components/sections/Estimator";
import CaseStudies from "@/components/sections/CaseStudies";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Architecture />
      <Capabilities />
      <Estimator />
      <CaseStudies />
      <Contact />
    </>
  );
}
