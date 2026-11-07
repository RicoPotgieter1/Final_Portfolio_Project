import clinicCareDashboardImage from "../assets/clinic_care_dashboard.png";

export default function ProjectsSection() {
    return (
        <section id="projects" className="py-8">
            <h2 className="mb-6 text-center text-2xl font-semibold">Projects</h2>
            <article className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-lg">
                <div className="overflow-hidden bg-slate-100">
                    <img
                        src={clinicCareDashboardImage.src}
                        alt="Clinic Care dashboard showing invoices and appointment trends"
                        className="mx-auto aspect-video w-full py-3 px-3 max-w-3xl rounded-2xl object-cover object-top transition-transform duration-300 hover:scale-[1.02]"
                    />
                </div>
                <div className="p-6 sm:p-8">
                    <h3 className="mt-3 text-xl font-semibold text-slate-900 sm:text-2xl">
                        Clinic Care Dashboard
                    </h3>
                    <p className="mt-3 max-w-3xl leading-relaxed text-slate-600">
                        Clinic Care helps clinics manage patient records, schedule appointments, view appointment trends, and track invoices — all in one dashboard.
                    </p>
                </div>
            </article>
        </section>
    )
}