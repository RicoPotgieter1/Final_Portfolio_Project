import { createClient } from "../lib/supabase/client"


export default async function AboutSection() {
    const supabase = await createClient();
    const {data: about, error} = await supabase
        .from("about")
        .select("*")
        .limit(1)
        .single();

    if (error || !about) {
        return <p>About content is unavailable right now.</p>;
    }

    return (
        <section id="about" className="p-7 pb-3">
            <h2 className="flex text-2xl font-semibold justify-center">About</h2>
            <p className="mx-20 pt-2">
                {about.About_content}
            </p>
        </section>
    )
}