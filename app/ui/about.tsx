import { createClient } from "../lib/supabase/server"
import { connection } from "next/server"


export default async function AboutSection() {
    await connection();
    const supabase = await createClient();
    const {data: about, error} = await supabase
        .from("about")
        .select("*")
        .limit(1)
        .single();

    if (error || !about) {
        console.error("Failed to fetch about content from Supabase:", error);
        return <p>About content is unavailable right now.</p>;
    }

    return (
        <section id="about" className="p-7 pb-3">
            <h2 className="flex text-2xl font-semibold justify-center">About</h2>
            <p className="mx-auto max-w-3xl pt-2">
                {about.About_content}
            </p>
        </section>
    )
}