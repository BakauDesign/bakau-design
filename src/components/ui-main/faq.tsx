import {
    component$,
    useSignal
} from '@builder.io/qwik';

import Plus from "~/assets/icons/Plus.svg";
import Dash from "~/assets/icons/Dash.svg";

interface Faq {
    id: number;
    title: string;
    answer: string;
}

export const Faq = component$<{ data: Faq}>(({ data }) => {
    const isOpened = useSignal(false);

    return (
        <article>
            <button 
                class='w-full flex items-center justify-between gap-x-6 py-3 cursor-pointer'
                onClick$={() => isOpened.value = !isOpened.value}
            >
                <h1
                    class={`
                        text-label-large md:text-h3-small text-custom-neutral-white-200 text-left
                    `}
                >
                    { data.title }
                </h1>

                <img
                    height={24}
                    width={24}
                    src={isOpened.value ? Dash : Plus}
                    alt='Icon'
                />
            </button>

            <p
                class={`
                    text-body-small md:text-body-medium text-custom-neutral-white-100 pr-6 transition-all duration-300
                    ${!isOpened.value ? "h-0 opacity-0" : "h-fit opacity-100"}
                `}
            >
                { data.answer }
            </p>
        </article>
    );
});