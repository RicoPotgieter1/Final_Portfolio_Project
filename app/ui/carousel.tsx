"use client"

import { useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

type Slide = { src: string; alt: string; caption?: string };

export default function Carousel({ slides }: { slides: Slide[] }) {
    const trackRef = useRef<HTMLUListElement>(null);

    function scrollBySlide(direction: 1 | -1) {
        const track = trackRef.current;
        if (!track) return;
        track.scrollBy({ left: direction * track.clientWidth, behavior: 'smooth' });
    }

    return(
        <section aria-roledescription="carousel" aria-label="Project screenshots" className="relative">
            {slides.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-slate-600">
                    No screenshots have been uploaded for this project yet.
                </p>
            ) : (
                <div className="group relative">
                    <ul
                        ref={trackRef}
                        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] motion-reduce:scroll-auto"
                        tabIndex={0}
                    >
                        {slides.map((slide) => (
                            <li key={slide.src} className="w-full shrink-0 snap-center">
                                <figure>
                                    <div className="flex aspect-video w-full items-center justify-center">
                                        <img
                                            src={slide.src}
                                            alt={slide.alt}
                                            className="max-h-full max-w-[calc(100%-3rem)] object-contain"
                                        />
                                    </div>
                                    {slide.caption && (
                                        <figcaption className="mt-2 text-center text-sm">{slide.caption}</figcaption>
                                    )}
                                </figure>
                            </li>
                        ))}
                    </ul>

                    {slides.length > 1 && (
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-3 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-100">
                            <button
                                type="button"
                                onClick={() => scrollBySlide(-1)}
                                aria-label="Previous screenshot"
                                style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
                                onMouseEnter={(event) => {
                                    event.currentTarget.style.backgroundColor = "rgba(226, 232, 240, 0.6)";
                                }}
                                onMouseLeave={(event) => {
                                    event.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.6)";
                                }}
                                className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full text-2xl text-slate-900 shadow-md ring-1 ring-black/10 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
                            </button>
                            <button
                                type="button"
                                onClick={() => scrollBySlide(1)}
                                aria-label="Next screenshot"
                                style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
                                onMouseEnter={(event) => {
                                    event.currentTarget.style.backgroundColor = "rgba(226, 232, 240, 0.6)";
                                }}
                                onMouseLeave={(event) => {
                                    event.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.6)";
                                }}
                                className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full text-2xl text-slate-900 shadow-md ring-1 ring-black/10 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </section>
    )
}