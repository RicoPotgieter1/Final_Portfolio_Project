import { createClient } from "../lib/supabase/server"
import Carousel from "./carousel";
import { connection } from "next/server"

export default async function ProjectsSection() {
    await connection();
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
        <section id="projects" className="py-12 sm:py-16">
            <div className="mx-auto max-w-5xl">
                <div className="mb-8 text-center">
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Project
                    </h2>
                </div>
                <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5 transition-shadow duration-200 hover:shadow-xl hover:shadow-slate-900/10">
                        <div className="overflow-hidden border-b border-slate-200 bg-slate-50">
                            <Carousel slides={(projects.file_path ?? []).map((screenshot: string) => ({
                                src: supabase.storage.from("screenshots").getPublicUrl(screenshot).data.publicUrl,
                                alt: `Screenshot of ${projects.title}`,
                            }))} />
                        </div>
                        <div className="p-6 sm:p-10">
                            <header className="max-w-3xl">
                                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
                                    Project Overview
                                </p>
                                <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                    {projects.title}
                                </h3>
                                <p className="mt-4 whitespace-pre-line text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                                    {projects.description}
                                </p>
                            </header>

                            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                <section className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5 sm:col-span-2 sm:p-6">
                                    <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-blue-800">
                                        The Problem
                                    </h4>
                                    <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700 sm:text-base">
                                        {projects.problem}
                                    </p>
                                </section>

                                <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-slate-300 hover:bg-white">
                                    <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                                        My Role
                                    </h4>
                                    <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700">
                                        {projects.role}
                                    </p>
                                </section>

                                <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-slate-300 hover:bg-white">
                                    <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                                        The Tech Stack
                                    </h4>
                                    <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700">
                                        {projects.stack}
                                    </p>
                                </section>

                                <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-slate-300 hover:bg-white sm:col-span-2">
                                    <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                                        What's Next
                                    </h4>
                                    <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700">
                                        {projects.next_steps}
                                    </p>
                                </section>
                            </div>

                            {(projects.github || projects.live_link) && (
                                <div className="mt-8 flex flex-wrap gap-3 border-t border-slate-200 pt-6">
                                    {projects.github && (
                                        <a
                                            href={projects.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                        >
                                            View on GitHub
                                        </a>
                                    )}
                                    {projects.live_link && (
                                        <a
                                            href={projects.live_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                        >
                                            Live Demo
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                </article>
            </div>
        </section>
    )
}