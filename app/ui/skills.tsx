export default function SkillsSection() {
    return (
        <>
        <section id="about" className="p-7 pb-3">
            <h2 className="flex text-2xl font-semibold justify-center">Skills</h2>
        </section>

        <div className="grid md:grid-cols-4 grid-cols-1 md:grid-rows-1 grid-rows-4 gap-3">

            <div className="border-2 rounded-lg p-6">
                <div className="flex items-center justify-center pb-3">
                    <h3 className="text-center text-xl font-bold">Languages</h3>
                </div>
                <ul className="list-disc list-inside">
                    <li>Html</li>
                    <li>CSS</li>
                    <li>Python</li>
                    <li>JavaScript</li>
                </ul>
            </div>

            <div className="border-2 rounded-lg p-6">
                <div className="flex items-center justify-center pb-3">
                    <h3 className="text-center text-xl font-bold">Frameworks & Tools</h3>
                </div>
                <ul className="list-disc list-inside">
                    <li>Git</li>
                    <li>Tailwind</li>
                </ul>
            </div>

            <div className="border-2 rounded-lg p-6">
                <div className="flex items-center justify-center pb-3">
                    <h3 className="text-center text-xl font-bold">Databases</h3>
                </div>
                
                <ul className="list-disc list-inside">
                    <li>PostgreSQL</li>
                    <li>Supabase</li>
                </ul>
            </div>
            
            <div className="border-2 rounded-lg p-6">
                <div className="flex items-center justify-center pb-3">
                    <h3 className="text-center text-xl font-bold">Backend & APIs</h3>
                </div>
                <ul className="list-disc list-inside">
                    <li>Next.js</li>
                    <li>Flask</li>
                    <li>Jinja</li>
                </ul>
            </div>
        </div>
    </>
    )
}