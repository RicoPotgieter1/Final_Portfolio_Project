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
                    alt="Image of the rico potgieter"
                />
                <h2 className="text-3xl font-semibold pt-3">Rico Potgieter</h2>
            </div>
        </section>
    )
}