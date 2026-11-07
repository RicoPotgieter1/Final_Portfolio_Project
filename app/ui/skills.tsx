import { createClient } from "../lib/supabase/server"
import { connection } from "next/server"

type Skill = {
    id: number;
    heading: string;
    content: string | string[] | null;
};

export default async function SkillsSection() {
    await connection();
    const supabase = await createClient();
    const {data: skills, error} = await supabase
        .from ("skills")
        .select("*")
        .limit(10);

    if (error) {
        console.error("Failed to fetch skills from Supabase:", error);
        return <p>Skills content is unavailable right now.</p>;
    }


    return (
        <>
        <section id="skills" className="p-7 pb-3">
            <h2 className="flex text-2xl font-semibold justify-center">Skills</h2>
        </section>

        <div className="grid md:grid-cols-4 grid-cols-1 md:grid-rows-1 mx-auto w-full max-w-sm md:max-w-5xl grid-rows-4 gap-3">
            {skills.map((skill: Skill) => (
            <div key={skill.id} className="rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-100 hover:shadow-lg p-6">
                <div className="flex items-center justify-center pb-3">
                    <h3 className="text-center text-xl font-bold">{skill.heading}</h3>
                </div>
                <ul className="list-disc list-inside pl-2">
                    {(Array.isArray(skill.content)
                        ? skill.content
                        : typeof skill.content === "string"
                            ? skill.content.split(/[\r\n,]+/).map((item) => item.trim()).filter(Boolean)
                            : []
                    ).map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
            ))}
        </div>
    </>
    )
}