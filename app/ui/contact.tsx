'use client'

import {useActionState, useEffect, useState} from 'react'
import Button from './button'
import { SubmitContactForm } from '../lib/actions'

export default function ContactSection() {
    const [state, formAction] = useActionState(SubmitContactForm, null);
    const [dismissedState, setDismissedState] = useState<typeof state>(null);

    useEffect(() => {
        if (state?.status !== 'success') {
            return;
        }

        const timeout = setTimeout(() => setDismissedState(state), 5000);
        return () => clearTimeout(timeout);
    }, [state]);

    return (
        <section
            id="contact"
            aria-labelledby="contact-heading"
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 sm:p-8"
        >
            <h2 id="contact-heading" className="mb-8 text-center text-3xl font-bold">
                Contact Me
            </h2>
            <div className="mx-auto max-w-md rounded-lg border-2 border-black bg-card p-6 shadow-md dark:bg-card-dark">
                <form id="contact-form" action={formAction}>
                    <div className="mb-4">
                        <label htmlFor="first-name" className="mb-2 block font-bold">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="first-name"
                            name="firstName"
                            autoComplete="given-name"
                            className="w-full rounded-lg border border-text bg-white px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="last-name" className="mb-2 block font-bold">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="last-name"
                            name="lastName"
                            autoComplete="family-name"
                            className="w-full rounded-lg border border-text bg-white px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="mb-2 block font-bold">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="email"
                            className="w-full rounded-lg border border-text bg-white px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="message" className="mb-2 block font-bold">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            className="w-full rounded-lg border border-text bg-white px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
                            required
                        />
                    </div>
                    <Button type="submit">
                        Send Message
                    </Button>
                    {state && (state.status === 'error' || dismissedState !== state) && (
                        <p
                            className={`mt-4 text-sm ${
                                state.status === 'error'
                                    ? 'text-red-600 dark:text-red-400'
                                    : 'text-green-700 dark:text-green-400'
                            }`}
                            role={state.status === 'error' ? 'alert' : 'status'}
                        >
                            {state.message}
                        </p>
                    )}
                </form>
            </div>
        </section>
    )
}
