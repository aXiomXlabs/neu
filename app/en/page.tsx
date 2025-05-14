import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import ProblemSection from "@/components/ProblemSection"
import SolutionSection from "@/components/SolutionSection"
import CopyTradingSection from "@/components/CopyTradingSection"
import StaticBDNNetworkSection from "@/components/StaticBDNNetworkSection"
import DashboardPreviewSection from "@/components/DashboardPreviewSection"
import AdditionalFeaturesSection from "@/components/AdditionalFeaturesSection"
import VisionSection from "@/components/VisionSection"
import WaitlistSignupSection from "@/components/WaitlistSignupSection"
import Footer from "@/components/Footer"
import SectionDivider from "@/components/SectionDivider"
import { ClientComponentsWrapper } from "@/components/ClientComponents"

export default function Home() {
  return (
    <ClientComponentsWrapper>
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <Hero />
        <SectionDivider />
        <ProblemSection />
        <SectionDivider />
        <SolutionSection />
        <SectionDivider />
        <CopyTradingSection />
        <SectionDivider />
        <StaticBDNNetworkSection isGerman={false} />
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
    </ClientComponentsWrapper>
  )
}
