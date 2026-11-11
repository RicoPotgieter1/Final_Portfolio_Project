import { Suspense } from "react"
import AboutSection from "./ui/about"
import ProjectsSection from "./ui/projects"
import ContactSection from "./ui/contact"
import SkillsSection from "./ui/skills"
import HeroSection from "./ui/herosection"
import "./globals.css"

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
                <Suspense fallback={
                    <section id="about" className="p-7 pb-3" aria-busy="true">
                        <h2 className="flex text-2xl font-semibold justify-center">About</h2>
                        <p className="mx-20 pt-2">Loading about content...</p>
                    </section>
                }>
                    <AboutSection />
                </Suspense>

                <Suspense fallback={
                    <section id="skills" className="p-7 pb-3" aria-busy="true">
                        <h2 className="flex text-2xl font-semibold justify-center">Skills</h2>
                        <p className="mx-20 pt-2">Loading projects...</p>
                    </section>
                }>
                    <ProjectsSection />
                </Suspense>

                <Suspense fallback={
                    <section id="skills" className="p-7 pb-3" aria-busy="true">
                        <h2 className="flex text-2xl font-semibold justify-center">Skills</h2>
                        <p className="mx-20 pt-2">Loading skills content...</p>
                    </section>
                }>
                    <SkillsSection />
                </Suspense>
                
                <ContactSection />
            </div>
        </main>
    )
}