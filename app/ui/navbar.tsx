import Link from "next/link";

export default function Navbar() {
    return(
        <nav className="border-b border-white/10 bg-slate-950/90">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
                <Link href="#top" className="text-3xl font-bold tracking-tight text-white">
                    <h1>Portfolio</h1>
                </Link>
                <ul className="flex list-none flex-wrap items-center gap-5 text-sm font-medium text-slate-200 sm:gap-7">
                    <li><Link className="transition text-lg hover:text-slate-400" href="#about">About</Link></li>
                    <li><Link className="transition text-lg hover:text-slate-400" href="#projects">Projects</Link></li>
                    <li><Link className="transition text-lg hover:text-slate-400" href="#skills">Skills</Link></li>
                    <li><Link className="transition text-lg hover:text-slate-400" href="#contact">Contact</Link></li>
                    <li><button className="bg-blue-600 rounded p-2 hover:bg-blue-700">Download CV</button></li>
                </ul>
            </div>
        </nav>
    )
}