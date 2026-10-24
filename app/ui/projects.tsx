export default function ProjectsSection() {
    return (
    <>
        <section id="about" className="p-7 pb-3">
            <h2 className="flex text-2xl font-semibold justify-center">Projects</h2>
        </section>
        <div className="grid grid-cols-4 grid-rows-1 gap-3">
            <div className="border-2 rounded-lg flex justify-center py-15 h-30">1</div>
            <div className="border-2 rounded-lg flex justify-center py-15 h-30">2</div>
            <div className="border-2 rounded-lg flex justify-center py-15 h-30">3</div>
            <div className="border-2 rounded-lg flex justify-center py-15 h-30">4</div>
        </div>
    </>
    )
}