import { createClient } from "../lib/supabase/server"
import Carousel from "./carousel";

export default async function ProjectsSection() {
    const supabase = await createClient();

    const {data: projects, error} = await supabase
        .from("projects")
        .select("*")
        .limit(1)
        .single();

    if (error || !projects) {
        console.error("Failed to fetch projects from Supabase:", error);
        return <p>Projects content is unavailable right now.</p>;
    }


    return (
        <section id="projects" className="py-8">
            <h2 className="mb-6 text-center text-2xl font-semibold">Projects</h2>
            <article className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-lg">
                <div className="overflow-hidden bg-slate-100 ">
                    <Carousel slides={(projects.file_path ?? []).map((screenshot: string) => ({
                        src: supabase.storage.from("screenshots").getPublicUrl(screenshot).data.publicUrl,
                        alt: `Screenshot of ${projects.title}`,
                    }))} />
                </div>
                <div className="p-6 sm:p-8">
                    <h3 className="mt-3 text-xl font-semibold text-slate-900 sm:text-2xl">
                        {projects.title}
                    </h3>
                    <p className="mt-3 max-w-3xl leading-relaxed text-slate-600">
                        {projects.description}
                    </p>
                </div>
            </article>
        </section>
    )
}