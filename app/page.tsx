import AboutSection from "./ui/about"
import ProjectsSection from "./ui/projects"
import CVSection from "./ui/cv"
import ContactSection from "./ui/contact"
import SkillsSection from "./ui/skills"
import "./globals.css"

export const metadata = {
    title: "Portfolio"
}

export default function MainPage() {
    return (
        <main id="top" className="mx-auto min-h-screen max-w-6xl px-6 pb-20 sm:px-10">

            <div className="flex flex-col gap-5">
                <AboutSection />
                <ProjectsSection />
                <SkillsSection />
                <CVSection />
                <ContactSection />
            </div>
        </main>
    )
}