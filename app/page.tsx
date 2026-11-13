import { Suspense } from "react"
import AboutSection from "./ui/about"
import ProjectsSection from "./ui/projects"
import ContactSection from "./ui/contact"
import SkillsSection from "./ui/skills"
import HeroSection from "./ui/herosection"
import "./globals.css"
import { AboutSkeleton, ProjectsSkeleton, SkillsSkeleton} from "./ui/skeletons"

export const metadata = {
    title: "Portfolio"
}

export default function MainPage() {
    return (
        <main id="top" className="">
            <div>
                <HeroSection/>
            </div>
            <div className="flex flex-col gap-5 mx-auto min-h-screen max-w-6xl px-6 pb-20 sm:px-10">
                <Suspense fallback={ AboutSkeleton() }>
                    
                    <AboutSection />
                </Suspense>

                <Suspense fallback={<ProjectsSkeleton />}>
                    <ProjectsSection />
                </Suspense>

                <Suspense fallback={<SkillsSkeleton />}>
                    <SkillsSection />
                </Suspense>
                
                <ContactSection />
            </div>
        </main>
    )
}