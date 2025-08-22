// src/components/toggle.tsx

import {
    component$,
} from '@builder.io/qwik';

import type {
    QRL,
    HTMLAttributes
} from '@builder.io/qwik';

import { cn } from "~/lib/utils";

interface ToggleProps
    extends HTMLAttributes<HTMLElement> {
        size?: "small" | "large";
        value?: boolean;
        disabled?: boolean;
        toggleClick$?: QRL<(value: boolean) => void>; // Ganti tipe any
}

export const Toggle = component$<ToggleProps>((
    { size = "small", disabled, toggleClick$, value = false, ...props }) => {

    return (
        <div
            {...props}
            class={`
                ${cn(props.class)}
                h-fit ${size === "small" ? "w-[36px]" : "w-[48px]"} rounded-full
                ${value ? "bg-custom-neutral-600" : "bg-custom-neutral-600"}
                ${disabled ? "bg-custom-neutral-700 cursor-not-allowed" : "cursor-pointer"}
                ${(value && size === "small") && !disabled ? "*:translate-x-[22px]" : "*:translate-x-0"}
                ${(value && size === "large") && !disabled ? "*:translate-x-[24px]" : "*:translate-x-0"}
            `}
            onClick$={() => {
                if (disabled) return;
                // Panggil onClick$ dari parent dengan nilai baru
                toggleClick$ && toggleClick$(!value);
            }}
        >
            <div
                class={`
                    ${size === "small" ? "h-[16px] w-[16px]" : "h-[24px] w-[24px]"} rounded-full transition-all
                    ${(value && !disabled) && "bg-green-400"}
                    ${(!value && !disabled) && "bg-custom-neutral-100"}
                    ${disabled && "bg-custom-neutral-600"}
                `}
            />
        </div>
    );
});