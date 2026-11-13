const shimmer =
    'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function AboutSkeleton() {
    return (
        <section  className="p-7 pb-3" aria-busy="true">
            <div className="mb-8 text-center">
                    <div className={`mx-auto h-10 w-40 rounded-md bg-slate-200 relative ${shimmer}`}></div>
            </div>
            <div className={`mx-auto max-w-3xl pt-2 mt-2 h-5 rounded-md bg-slate-200 relative ${shimmer}`}></div>
            <div className={`mx-auto max-w-3xl pt-2 mt-2 h-5 rounded-md bg-slate-200 relative ${shimmer}`}></div>
            <div className={`mx-auto max-w-3xl pt-2 mt-2 h-5 rounded-md bg-slate-200 relative ${shimmer}`}></div>
            <div className={`mx-auto max-w-3xl pt-2 mt-2 h-5 rounded-md bg-slate-200 relative ${shimmer}`}></div>

        </section>
    );
}

export function ProjectsSkeleton() {
    return (
        <section id="projects" className="py-12 sm:py-16" aria-busy="true">
            <div className="mx-auto max-w-5xl">
                <div className="mb-8 text-center">
                    <div className={`mx-auto h-10 w-40 rounded-md bg-slate-200 relative ${shimmer}`}></div>
                </div>

                <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5">
                    <div className={`h-120 w-full bg-slate-200 relative ${shimmer}`}></div>

                    <div className="p-6 sm:p-10">
                        <div className={`h-4 w-32 rounded-md bg-slate-200 relative ${shimmer}`}></div>
                        <div className={`mt-4 h-10 w-3/4 rounded-md bg-slate-200 relative ${shimmer}`}></div>
                        <div className={`mt-5 h-5 w-full rounded-md bg-slate-200 relative ${shimmer}`}></div>
                        <div className={`mt-2 h-5 w-full rounded-md bg-slate-200 relative ${shimmer}`}></div>
                        <div className={`mt-2 h-5 w-4/5 rounded-md bg-slate-200 relative ${shimmer}`}></div>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            <div className={`h-28 rounded-2xl bg-slate-200 relative sm:col-span-2 ${shimmer}`}></div>
                            <div className={`h-28 rounded-2xl bg-slate-200 relative ${shimmer}`}></div>
                            <div className={`h-28 rounded-2xl bg-slate-200 relative ${shimmer}`}></div>
                            <div className={`h-28 rounded-2xl bg-slate-200 relative sm:col-span-2 ${shimmer}`}></div>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-3 pt-2">
                            <div className={`h-1 w-full rounded-xl bg-slate-200 relative ${shimmer}`}></div>
                        </div>

                        <div className="mt-8 mb-7 flex flex-wrap gap-3 pt-2">
                            <div className={`h-11 w-36 rounded-xl bg-slate-200 relative ${shimmer}`}></div>
                            <div className={`h-11 w-28 rounded-xl bg-slate-200 relative ${shimmer}`}></div>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
}

export function SkillsSkeleton() {
    return (
        <>
            <section id="skills" className="p-7 pb-3" aria-busy="true">
                <h2 className="flex text-2xl font-semibold justify-center">Skills</h2>
            </section>

            <div className="mx-auto grid w-full max-w-sm grid-cols-1 gap-6 md:max-w-5xl md:grid-cols-4 md:grid-rows-1 md:gap-3" aria-busy="true">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className={`rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-md relative ${shimmer}`}
                    >
                        <div className="flex items-center justify-center pb-3">
                            <div className={`h-7 w-24 rounded-md bg-slate-200 relative ${shimmer}`}></div>
                        </div>
                        <ul className="list-none list-inside pl-2">
                            {Array.from({ length: 3 }).map((_, itemIndex) => (
                                <li key={itemIndex} className={`mt-2 h-4 w-full rounded-md bg-slate-200 relative ${shimmer}`}></li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    );
}
