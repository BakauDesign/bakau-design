import {
    component$
} from '@builder.io/qwik';

export type Workflow = {
    id: number;
    nomor: string;
    nama: string;
    deskripsi: string;
    penanda: Array<{
        id: number;
        label: string;
    }>;
}

export const Workflow = component$<{ data: Workflow }>(({ data }) => {
    return (
        <article class='p-5 flex flex-col gap-y-12 font-poppins'>

            <section class='flex flex-col gap-y-8'>
                
                <section class='flex flex-col gap-y-4'>
                    <h1 class='text-h2-medium md:text-h2-large text-custom-neutral-0'>
                        0{ data.nomor }
                    </h1>

                    <h2 class='text-h3-medium md:text-h3-large text-custom-neutral-white-0'>
                        { data.nama }
                    </h2>
                </section>

                <p class='text-body-small md:text-body-medium text-custom-neutral-100'>
                    { data.deskripsi }
                </p>
            </section>

            <ul class={`
                flex flex-wrap gap-4
                *:px-4 *:py-1.5 *:bg-custom-neutral-700 *:rounded-full *:text-label-small *:md:text-label-medium *:text-custom-neutral-100
            `}>
                { data.penanda.map(( tag ) => {
                    return (
                        <li key={tag.id}>{tag.label}</li>
                    )
                })}
            </ul>
        </article>
    );
});