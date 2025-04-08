import { component$, Slot } from '@builder.io/qwik';

import type { QRL } from '@builder.io/qwik';
import type { HTMLAttributes } from '@builder.io/qwik';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    variant: 'primary' | 'secondary' | 'tertiary';
	size?: 'small' | 'medium' | 'large';
	disabled?: boolean;
	onClick$?: QRL<(event: MouseEvent, element: HTMLButtonElement) => void>;
}

export const Button = component$<ButtonProps>(({
    variant,
	size = 'small',
	disabled,
	onClick$,
	...props
}) => {
    return (
        <button
            {...props}
            onClick$={onClick$}
            disabled={disabled}
            class={`
                py-3 cursor-pointer
                ${size === "small" && "px-[18px] h-[50px]"} 
                ${size === "medium" && "px-5 h-[55px]"} 
                ${size === "large" && "px-6 h-[60px]"}

                ${variant === "primary" && "bg-primary-400 hover:bg-primary-300 active:bg-primary-400 active:border-[1.5px] active:border-primary-500 text-primary-900"}

                ${variant === "secondary" && "bg-linear-[90deg,#212121_0%,#2B2B2B_50%,#212121_100%] hover:bg-linear-[90deg,#212121_0%,#333333_50%,#212121_100%] active:bg-linear-[90deg,#212121_0%,#2B2B2B_50%,#212121_100%] active:border-[1.5px] active:border-neutral-600 text-neutral-0"}

                ${variant === "tertiary" && "text-primary-500 hover:text-primary-400 active:text-primary-500"}

                font-semibold  font-poppins text-label-small sm:text-label-medium rounded-2xl
            `}
        >
            <Slot />
        </button>
    );
});