import { Suspense } from "react"
import Button from "../ui/button"
import { createClient } from "../lib/supabase/server"
import { connection } from "next/server"
import { savePortfolioContent, signOut } from "../lib/actions"
import { PowerIcon } from "@heroicons/react/24/outline"
import AdminProjectScreenshots from "../ui/admin-project-screenshots"

export const metadata = {
    title: "Portfolio Editor"
}

async function AdminContent({ searchParams }) {
    await connection();
    const { saved } = await searchParams;
    const supabase = await createClient();
    const [aboutResult, skillsResult, projectsResult] = await Promise.all([
        supabase.from("about").select("About_content").limit(1).maybeSingle(),
        supabase.from("skills").select("heading, content").limit(10),
        supabase.from("projects").select("id, title, description, file_path, problem, role, stack, next_steps, github, live_link").order("id").limit(10),
    ]);

    if (aboutResult.error) {
        console.error("Failed to load About content for admin:", aboutResult.error);
    }

    if (skillsResult.error) {
        console.error("Failed to load Skills content for admin:", skillsResult.error);
    }

    if (projectsResult.error) {
        console.error("Failed to load Projects content for admin:", projectsResult.error);
    }

    const getSkillContent = (heading) => {
        const content = skillsResult.data?.find((skill) => skill.heading === heading)?.content;
        return Array.isArray(content) ? content.join("\n") : content ?? "";
    };

    const textareaClassName = "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15";
    const inputClassName = "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15";

    return (
        <div className="space-y-6">
            {saved === "1" && (
                <p role="status" className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
                    Portfolio content saved.
                </p>
            )}
            {(aboutResult.error || skillsResult.error || projectsResult.error) && (
                <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
                    Some saved content could not be loaded. Check the server logs for details.
                </p>
            )}

            <form action={savePortfolioContent} className="space-y-6">
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                    <div className="mb-5">
                        <h2 className="text-lg font-semibold text-slate-900">About</h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Update the introduction shown on your portfolio.
                        </p>
                    </div>
                    <label htmlFor="about" className="mb-2 block text-sm font-medium text-slate-700">
                        About content
                    </label>
                    <textarea
                        id="about"
                        name="about"
                        rows={6}
                        defaultValue={aboutResult.data?.About_content ?? ""}
                        className={textareaClassName}
                        required
                    />
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                    <div className="mb-5">
                        <h2 className="text-lg font-semibold text-slate-900">Projects</h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Update the projects section of your portfolio.
                        </p>
                    </div>
                    <label htmlFor="title" className="mb-2 block text-sm font-medium text-slate-700">
                        Title
                    </label>
                    <textarea
                        id="title"
                        name="title"
                        rows={1}
                        defaultValue={projectsResult.data?.[0]?.title ?? ""}
                        className={textareaClassName}
                        required
                    />

                    <label htmlFor="description" className="mb-2 mt-5 block text-sm font-medium text-slate-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={3}
                        defaultValue={projectsResult.data?.[0]?.description ?? ""}
                        className={textareaClassName}
                        required
                    />

                    <label htmlFor="description" className="mb-2 mt-5 block text-sm font-medium text-slate-700">
                        The Problem
                    </label>
                    <textarea
                        id="problem"
                        name="problem"
                        rows={3}
                        defaultValue={projectsResult.data?.[0]?.problem ?? ""}
                        className={textareaClassName}
                        required
                    />

                    <label htmlFor="description" className="mb-2 mt-5 block text-sm font-medium text-slate-700">
                        My Role
                    </label>
                    <textarea
                        id="role"
                        name="role"
                        rows={3}
                        defaultValue={projectsResult.data?.[0]?.role ?? ""}
                        className={textareaClassName}
                        required
                    />

                    <label htmlFor="description" className="mb-2 mt-5 block text-sm font-medium text-slate-700">
                        Tech Stack
                    </label>
                    <textarea
                        id="stack"
                        name="stack"
                        rows={2}
                        defaultValue={projectsResult.data?.[0]?.stack ?? ""}
                        className={textareaClassName}
                        required
                    />

                    <label htmlFor="description" className="mb-2 mt-5 block text-sm font-medium text-slate-700">
                        What's Next
                    </label>
                    <textarea
                        id="next"
                        name="next"
                        rows={3}
                        defaultValue={projectsResult.data?.[0]?.next_steps ?? ""}
                        className={textareaClassName}
                        required
                    />

                    <div className="mt-5 flex gap-5">
                        <div className="flex-1">
                            <label htmlFor="github" className="mb-2 block text-sm font-medium text-slate-700">
                                GitHub Repository
                            </label>
                            <input
                                type="url"
                                id="github"
                                name="github"
                                defaultValue={projectsResult.data?.[0]?.github ?? ""}
                                className={inputClassName}
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="live_link" className="mb-2 block text-sm font-medium text-slate-700">
                                Live Demo
                            </label>
                            <input
                                type="url"
                                id="live_link"
                                name="live_link"
                                defaultValue={projectsResult.data?.[0]?.live_link ?? ""}
                                className={inputClassName}
                            />
                        </div>
                    </div>

                    {projectsResult.data?.[0] && (
                        <AdminProjectScreenshots
                            projectId={projectsResult.data[0].id}
                            filePaths={projectsResult.data[0].file_path ?? []}
                        />
                    )}
                    {!projectsResult.error && projectsResult.data?.length === 0 && (
                        <p className="mt-5 text-sm text-slate-500">
                            Create a project before uploading screenshots.
                        </p>
                    )}
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                    <div className="mb-5">
                        <h2 className="text-lg font-semibold text-slate-900">Skills</h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Add one skill per line. Each line appears as a separate item.
                        </p>
                    </div>
                    <div className="grid gap-5 md:grid-cols-2">
                        {[
                            "Languages",
                            "Frameworks & Tools",
                            "Databases",
                            "Backend & APIs",
                        ].map((heading) => (
                            <div key={heading}>
                                <label htmlFor={heading} className="mb-2 block text-sm font-medium text-slate-700">
                                    {heading}
                                </label>
                                <textarea
                                    id={heading}
                                    name={heading}
                                    rows={5}
                                    defaultValue={getSkillContent(heading)}
                                    className={textareaClassName}
                                    required
                                />
                            </div>
                        ))}
                    </div>
                </section>

                <div className="flex justify-end border-t border-slate-200 pt-5">
                    <Button type="submit" className="h-11 px-6">
                        Save changes
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default function AdminPage({ searchParams }) {
    return (
        <main id="top" className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 sm:py-12">
            <div className="mx-auto max-w-5xl">
                <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                            Administration
                        </p>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                            Portfolio editor
                        </h1>
                        <p className="mt-2 text-sm text-slate-600">
                            Manage the content displayed on your portfolio.
                        </p>
                    </div>
                    <form action={signOut}>
                        <Button
                            type="submit"
                            variant="secondary"
                        >
                            <PowerIcon className="mr-2 h-4 w-4" />
                            Sign out
                        </Button>
                    </form>
                </header>
                <Suspense
                    fallback={
                        <p aria-busy="true" className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
                            Loading saved portfolio content...
                        </p>
                    }
                >
                    <AdminContent searchParams={searchParams} />
                </Suspense>
            </div>
        </main>
    )
}