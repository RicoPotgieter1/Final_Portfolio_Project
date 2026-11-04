import { Suspense } from "react"
import Button  from "../ui/button"
import { createClient } from "../lib/supabase/server"
import { connection } from "next/server"
import { savePortfolioContent } from "../lib/actions"

export const metadata = {
    title: "Admin Page"
}

async function AdminContent({ searchParams }) {
    await connection();
    const { saved } = await searchParams;
    const supabase = await createClient();
    const [aboutResult, skillsResult] = await Promise.all([
        supabase.from("about").select("About_content").limit(1).maybeSingle(),
        supabase.from("skills").select("heading, content").limit(10),
    ]);

    if (aboutResult.error) {
        console.error("Failed to load About content for admin:", aboutResult.error);
    }

    if (skillsResult.error) {
        console.error("Failed to load Skills content for admin:", skillsResult.error);
    }

    const getSkillContent = (heading) => {
        const content = skillsResult.data?.find((skill) => skill.heading === heading)?.content;
        return Array.isArray(content) ? content.join("\n") : content ?? "";
    };

    return (
        <form action={savePortfolioContent}>
            {saved === "1" && (
                <p role="status" className="mb-4 text-green-700">
                    Portfolio content saved.
                </p>
            )}
            {(aboutResult.error || skillsResult.error) && (
                <p role="alert" className="mb-4 text-red-700">
                    Some saved content could not be loaded. Check the server logs for details.
                </p>
            )}

            <div className="mb-4">
                <label htmlFor="message" className="mb-2 block">
                    About
                </label>
                <textarea
                    id="about"
                    name="about"
                    rows={4}
                    defaultValue={aboutResult.data?.About_content ?? ""}
                    className="w-full rounded-lg border border-text bg-white px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
                    required
                />
            </div>

            <h2 className="font-bold text-xl pb-2">Skills</h2>

            <div className="mb-4">
                <label htmlFor="Languages" className="mb-2 block">
                    Languages
                </label>
                <textarea
                    id="Languages"
                    name="Languages"
                    rows={4}
                    defaultValue={getSkillContent("Languages")}
                    className="w-full rounded-lg border border-text bg-white px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="Frameworks & Tools" className="mb-2 block">
                    Frameworks &amp; Tools
                </label>
                <textarea
                    id="Frameworks & Tools"
                    name="Frameworks & Tools"
                    rows={4}
                    defaultValue={getSkillContent("Frameworks & Tools")}
                    className="w-full rounded-lg border border-text bg-white px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="Databases" className="mb-2 block">
                    Databases
                </label>
                <textarea
                    id="Databases"
                    name="Databases"
                    rows={4}
                    defaultValue={getSkillContent("Databases")}
                    className="w-full rounded-lg border border-text bg-white px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="Backend & APIs" className="mb-2 block">
                    Backend &amp; APIs
                </label>
                <textarea
                    id="Backend & APIs"
                    name="Backend & APIs"
                    rows={4}
                    defaultValue={getSkillContent("Backend & APIs")}
                    className="w-full rounded-lg border border-text bg-white px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
                    required
                />
            </div>
            <Button type="submit">Save</Button>
        </form>
    )
}

export default function AdminPage({ searchParams }) {
    return (
        <main id="top">
            <div className="flex flex-col gap-5 mx-auto min-h-screen max-w-6xl px-6 pb-20 sm:px-10">
                <h2 className="font-bold text-2xl">Portfolio Editor</h2>
                <Suspense fallback={<p aria-busy="true">Loading saved portfolio content...</p>}>
                    <AdminContent searchParams={searchParams} />
                </Suspense>
            </div>
        </main>
    )
}