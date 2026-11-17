"use client";

import { useEffect, useState } from "react";

export default function SavedNotice() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timeoutId = window.setTimeout(() => setVisible(false), 5000);
        return () => window.clearTimeout(timeoutId);
    }, []);

    if (!visible) return null;

    return (
        <p role="status" className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
            Portfolio content saved.
        </p>
    );
}
