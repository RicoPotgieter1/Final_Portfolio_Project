import Image from "next/image"
import placeholderImage from "../assets/placeholder_image.jpg"

export default function HeroSection() {
    return (
        <section id="contact" className="h-100 w-100% bg-gradient-to-r from-cyan-500 to-blue-500">
            <div className="pt-20 flex flex-col items-center justify-center">
                <Image
                    className="rounded-full"
                    src={placeholderImage}
                    width={100}
                    alt="Image of the rico potgieter"
                />
                <h2 className="text-2xl font-semibold pt-3">Rico Potgieter</h2>
            </div>
        </section>
    )
}