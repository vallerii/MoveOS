import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhatYouGet from "@/components/WhatYouGet";
import WhyTrustUs from "@/components/WhyTrustUs";
import DidYouKnow from "@/components/DidYouKnow";
import OurPromise from "@/components/OurPromise";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhatYouGet />
        <WhyTrustUs />
        <DidYouKnow />
        <OurPromise />
       
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
