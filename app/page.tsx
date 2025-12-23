
import Hero from "@/components/Hero";
import Overview from "@/components/Overview";
import Experience from "@/components/Experience";
import MyInfoSection from "@/components/MyInfoSection";
import Projects from "@/components/Projects";


export default function Home() {
  return (
    <div className="container mx-auto">
      <Hero />
      <Overview/>
      <Experience />
      <Projects/>
      <MyInfoSection />
      
    </div>
  );
}
