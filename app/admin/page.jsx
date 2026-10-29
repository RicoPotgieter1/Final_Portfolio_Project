import Button  from "../ui/button"

export const metadata = {
    title: "Admin Page"
}

export default function AdminPage() {
    return (
        <main id="top" className="">
            <div className="flex flex-col gap-5 mx-auto min-h-screen max-w-6xl px-6 pb-20 sm:px-10">
                <h2 className="font-bold text-2xl">Portfolio Editor</h2>
                <form>

                    <div className="mb-4">
                        <label htmlFor="message" className="mb-2 block">
                            About
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            className="w-full rounded-lg border border-text bg-white px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
                            required
                        />
                    </div>

                    <h2 className="font-bold text-xl pb-2">Skills</h2>

                    <div className="mb-4">
                        <label htmlFor="Languages" className="mb-2 block">
                            Languages
                        </label>
                        <textarea
                            id="Languages"
                            name="Languages"
                            rows={4}
                            className="w-full rounded-lg border border-text bg-white px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="Frameworks & Tools" className="mb-2 block">
                            Frameworks & Tools
                        </label>
                        <textarea
                            id="Frameworks & Tools"
                            name="Frameworks & Tools"
                            rows={4}
                            className="w-full rounded-lg border border-text bg-white px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="Databases" className="mb-2 block">
                            Databases
                        </label>
                        <textarea
                            id="Databases"
                            name="Databases"
                            rows={4}
                            className="w-full rounded-lg border border-text bg-white px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="Backend & APIs" className="mb-2 block">
                            Backend & APIs
                        </label>
                        <textarea
                            id="Backend & APIs"
                            name="Backend & APIs"
                            rows={4}
                            className="w-full rounded-lg border border-text bg-white px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
                            required
                        />
                    </div>
                    <Button type="submit">Save</Button>
                </form>
            </div>
        </main>
    )
}