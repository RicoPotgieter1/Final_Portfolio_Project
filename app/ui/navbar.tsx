"use client";

import Link from "next/link";
import type { MouseEvent } from "react";

const links = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
];

function navigateToSection(event: MouseEvent<HTMLAnchorElement>, href: string) {
    const target = document.getElementById(href.slice(1));
    if (!target) return;

    event.preventDefault();
    if (window.location.hash !== href) {
        window.history.pushState(null, "", href);
    }

    const navbarHeight = document.querySelector("nav")?.offsetHeight ?? 0;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
    window.scrollTo({ top: targetPosition, behavior: "smooth" });
}

export default function Navbar() {
    return(
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/100 backdrop-blur">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between px-4 py-4 sm:px-10 sm:py-5">
                <Link href="#top" className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    <h1>Portfolio</h1>
                </Link>

                <details className="group md:hidden">
                    <summary
                        className="flex size-10 cursor-pointer list-none items-center justify-center rounded-md p-2 text-slate-200 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 [&::-webkit-details-marker]:hidden"
                        aria-label="Toggle navigation menu"
                        aria-controls="mobile-navigation"
                    >
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-6">
                            <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </summary>
                    <ul id="mobile-navigation" className="absolute left-0 right-0 z-10 mt-4 flex list-none flex-col gap-1 border-t border-white/10 bg-slate-950 px-4 py-3 text-slate-200 shadow-lg md:hidden">
                        {links.map(({ label, href }) => (
                            <li key={href}>
                                <a
                                    className="block rounded-md px-3 py-2 text-lg transition hover:bg-white/10 hover:text-white"
                                    href={href}
                                    onClick={(event) => {
                                        const menu = event.currentTarget.closest("details");
                                        if (menu) menu.open = false;
                                        navigateToSection(event, href);
                                    }}
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                        <li className="px-3 py-2">
                            <button className="w-full rounded bg-blue-600 p-2 hover:bg-blue-700">Download CV</button>
                        </li>
                    </ul>
                </details>

                <ul className="hidden list-none items-center gap-5 text-sm font-medium text-slate-200 md:flex sm:gap-7">
                    {links.map(({ label, href }) => (
                        <li key={href}>
                            <a
                                className="text-lg transition hover:text-slate-400"
                                href={href}
                                onClick={(event) => navigateToSection(event, href)}
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                    <li>
                        <button className="rounded bg-blue-600 p-2 hover:bg-blue-700">Download CV</button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}