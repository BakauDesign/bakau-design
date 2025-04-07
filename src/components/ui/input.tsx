import { component$ } from '@builder.io/qwik';
import type { InputHTMLAttributes } from '@builder.io/qwik';

import { cn } from '~/lib/utils';

export const Input = component$<InputHTMLAttributes<HTMLInputElement>>(({ class: className, type = 'text', ...props }) => {
    return (
        <input
            type={type}
            class={cn(                
                'rounded-md h-10 outline-none border-[1.5px] border-neutral-800 ring-neutral-400 font-inter font-normal dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-700',
                className
            )}
            {...props}
        />
    );
});