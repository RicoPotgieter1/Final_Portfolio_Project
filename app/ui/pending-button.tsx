"use client";

import type { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";
import Button from "./button";

interface PendingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    pendingText: string;
    variant?: "primary" | "secondary";
}

export default function PendingButton({
    children,
    disabled,
    pendingText,
    ...props
}: PendingButtonProps) {
    const { pending } = useFormStatus();

    return (
        <Button {...props} disabled={disabled || pending}>
            {pending ? pendingText : children}
        </Button>
    );
}
