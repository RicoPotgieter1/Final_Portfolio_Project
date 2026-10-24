import AboutSection from "./ui/about"
import ProjectsSection from "./ui/projects"
import CVSection from "./ui/cv"
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
                <AboutSection />
                    <p className="mx-20 ">I'm Rico, a junior full-stack developer looking for a junior developer role where I can build with React, Next.js and Supabase. 
                       I like to build full stack apps but I perfer doing backend coding.
                    </p>
                <ProjectsSection />
                <SkillsSection />
                <CVSection />
                <ContactSection />
            </div>
        </main>
    )
}