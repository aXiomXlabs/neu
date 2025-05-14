import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import ProblemSection from "@/components/ProblemSection"
import SolutionSection from "@/components/SolutionSection"
import CopyTradingSection from "@/components/CopyTradingSection"
import BDNNetworkSection from "@/components/BDNNetworkSection"
import DashboardPreviewSection from "@/components/DashboardPreviewSection"
import AdditionalFeaturesSection from "@/components/AdditionalFeaturesSection"
import VisionSection from "@/components/VisionSection"
import WaitlistSignupSection from "@/components/WaitlistSignupSection"
import Footer from "@/components/Footer"
import ParticlesBackground from "@/components/ParticlesBackground"
import SectionDivider from "@/components/SectionDivider"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <ParticlesBackground />
      <Navbar />
      <Hero />
      <SectionDivider />
      <ProblemSection />
      <SectionDivider />
      <SolutionSection />
      <SectionDivider />
      <CopyTradingSection />
      <SectionDivider />
      <BDNNetworkSection />
      <SectionDivider />
      <DashboardPreviewSection />
      <SectionDivider />
      <AdditionalFeaturesSection />
      <SectionDivider />
      <VisionSection />
      <SectionDivider />
      <WaitlistSignupSection />
      <Footer />
    </main>
  )
}
