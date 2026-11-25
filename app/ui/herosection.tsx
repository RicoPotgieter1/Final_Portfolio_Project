import Image from "next/image"
import placeholderImage from "../assets/placeholder_image.jpg"
//bg-gradient-to-tr from-cyan-500 to-blue-700
export default function HeroSection() {
    return (
        <section className="h-100 w-100% bg-gradient-to-tr from-cyan-500 to-blue-500">
            <div className="pt-20 flex flex-col items-center justify-center">
                <Image
                    className="rounded-full"
                    src={placeholderImage}
                    width={150}
                    loading="eager"
                    alt="Image of the rico potgieter"
                />
                <div className="flex flex-col items-center text-center text-lg font-medium pt-3">
                    <h2 className="text-3xl font-semibold pt-3">Rico Potgieter</h2>
                    <div className="flex flex-row gap-3 pt-2 items-center">
                        <a href="https://www.linkedin.com/in/rico-potgieter-aa3b7b355/" >
                            <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 0 448 512"><path d="M416 32L31.9 32C14.3 32 0 46.5 0 64.3L0 447.7C0 465.5 14.3 480 31.9 480L416 480c17.6 0 32-14.5 32-32.3l0-383.4C448 46.5 433.6 32 416 32zM135.4 416l-66.4 0 0-213.8 66.5 0 0 213.8-.1 0zM102.2 96a38.5 38.5 0 1 1 0 77 38.5 38.5 0 1 1 0-77zM384.3 416l-66.4 0 0-104c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9l0 105.8-66.4 0 0-213.8 63.7 0 0 29.2 .9 0c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9l0 117.2z"/></svg>
                            {/* !Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc. */}
                        </a>
                        <a href="https://github.com/RicoPotgieter1" >
                            <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 0 512 512"><path d="M216.5 362.5c-66-8-112.5-55.5-112.5-117 0-25 9-52 24-70-6.5-16.5-5.5-51.5 2-66 20-2.5 47 8 63 22.5 19-6 39-9 63.5-9s44.5 3 62.5 8.5c15.5-14 43-24.5 63-22 7 13.5 8 48.5 1.5 65.5 16 19 24.5 44.5 24.5 70.5 0 61.5-46.5 108-113.5 116.5 17 11 28.5 35 28.5 62.5l0 52C323 491.5 335.5 500 350.5 494 441 459.5 512 369 512 257 512 115.5 397 0 255.5 0S0 115.5 0 257c0 111 70.5 203 165.5 237.5 13.5 5 26.5-4 26.5-17.5l0-40c-7 3-16 5-24 5-33 0-52.5-18-66.5-51.5-5.5-13.5-11.5-21.5-23-23-6-.5-8-3-8-6 0-6 10-10.5 20-10.5 14.5 0 27 9 40 27.5 10 14.5 20.5 21 33 21s20.5-4.5 32-16c8.5-8.5 15-16 21-21z"/></svg>
                            {/* !Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc. */}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}