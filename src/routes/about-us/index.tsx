import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from '@builder.io/qwik-city';

import { Header } from "~/components/ui-main/header";
import { Footer } from "~/components/ui-main/footer";

import { getFaqs } from "~/services/faqs";

import { Workflow } from "~/components/ui-main/workflow";
import { Faq } from "~/components/ui-main/faq";

import {
    getAboutUspages,
    type Section
} from "~/services/pages";

import type {
    Cta, 
    WorkflowSection as WorkflowSectionType
} from "~/services/pages";

import { getHeader, getFooter } from "~/services/components";

export const useGetContent = routeLoader$(
    async (event) => {
        const aboutuspage = await getAboutUspages(event);
        const header = await getHeader(event);
        const footer = await getFooter(event);

        return { header, aboutuspage, footer };
    }
);

export const useGetFaqs = routeLoader$(
    async (event) => {
        return await getFaqs({ event });
    }
);

export default component$(() => {
    const { value: konten } = useGetContent();
    const { aboutuspage } = konten;

    const tentang_kami = aboutuspage.data?.tentang_kami;
    const alur_kerja_kami = aboutuspage.data?.alur_kerja_kami;
    const faq = aboutuspage.data?.faq;
    const cta = aboutuspage.data?.cta;

    return (
        <>
            <Header konten={konten.header.data} />

            <main class="pt-[220px] w-full px-4 md:px-6 lg:px-12 flex flex-col gap-y-[150px]">

                <section class="font-poppins flex flex-col gap-y-9">
                    <h1 class="text-h1-small md:text-h1-medium lg:text-h1-large font-medium text-custom-neutral-0">
                        { tentang_kami?.konten.judul || "Your Headline" }
                    </h1>

                    <article class="flex flex-col gap-y-8 max-w-[1000px]">
                        <p class="text-h3-small md:text-h3-medium lg:text-h3-large text-custom-neutral-100">
                            { tentang_kami?.konten.judul_pendukung || "Your Supporting Headline" }
                        </p>

                            <span class="block h-[1.5px] w-full bg-neutral-600" />

                            <ul class="flex flex-col gap-y-4 gap-x-8 lg:flex-row">
                                <li class="flex flex-col gap-y-2">

                                    <h1 class="text-h3-small md:text-h3-medium lg:text-h3-large font-medium text-custom-neutral-0">
                                        { tentang_kami?.visi_dan_misi.label_visi || "Your Vision Label" }
                                    </h1>

                                    <p class="text-body-small md:text-body-medium lg:text-body-large text-custom-neutral-100">
                                        { tentang_kami?.visi_dan_misi.konten_visi || "Your Vision Content" }
                                    </p>
                                </li>

                                <li class="flex flex-col gap-y-2">

                                    <h1 class="text-h3-small md:text-h3-medium lg:text-h3-large text-custom-neutral-0">
                                        { tentang_kami?.visi_dan_misi.label_misi || "Your Mission Label" }
                                    </h1>

                                    <p class="text-body-small md:text-body-medium lg:text-body-large text-custom-neutral-100">
                                        { tentang_kami?.visi_dan_misi.konten_misi || "Your Mission Content" }
                                    </p>
                                </li>
                            </ul>
                        </article>
                </section>

                <WorkflowSection alur_kerja_kami={alur_kerja_kami} />

                <FaqSection konten={faq} />

                <BookAMeetingSection konten={cta} />

            </main>

            <Footer konten={konten.footer.data} />
        </>
    );
});


const WorkflowSection = component$(({ alur_kerja_kami }: { alur_kerja_kami?: WorkflowSectionType; }) => {
    return (
        <section class="font-poppins flex flex-col gap-y-9">
            <article class="flex flex-col gap-y-4 md:gap-y-6">

                <h1 class="text-h1-small md:text-h1-medium lg:text-h1-large font-medium text-custom-neutral-0">
                    { alur_kerja_kami?.konten.judul || "Your Headline" }
                </h1>

                <p class="text-h3-small md:text-h3-medium lg:text-h3-large text-custom-neutral-100 max-w-[500px]">
                    { alur_kerja_kami?.konten.judul_pendukung || "Your Supporting Headline" }
                </p>
            </article>

            <section class="grid cols-workflow gap-8">
                {alur_kerja_kami?.daftar_alur_kerja ? alur_kerja_kami.daftar_alur_kerja.map(( alurKerja ) => 
                    <Workflow
                        key={alurKerja.id}
                        data={alurKerja}
                    />
                ) : null}
            </section>

        </section>
    );
});

const FaqSection = component$(({ konten }: { konten?: Section }) => {
    const { value: faqs } = useGetFaqs();

    return (
        <section class="font-poppins flex flex-col gap-y-9">

            <section class="flex flex-wrap gap-6 items-end justify-between">

                <article class="flex flex-col gap-y-4 md:gap-y-6">

                    <h1 class="text-h1-small md:text-h1-medium lg:text-h1-large font-medium text-custom-neutral-0">
                        { konten?.judul || "Your Headline" }
                    </h1>

                    <p class="text-label-medium md:text-label-large text-custom-neutral-100 max-w-[500px]">
                        { konten?.judul_pendukung || "Your Supporting Headline" }
                    </p>
                </article>

                
            </section>

            <section 
                class="grid gap-6 grid-cols-(--cols-faq)"
                style={{ scrollbarWidth: "none" }}
            >
                {faqs.data.map(( data ) => {
                    return (
                        <Faq
                            key={data.id}
                            data={data}
                        />
                    )
                })}
            </section>
        </section>
    );
});

const BookAMeetingSection = component$(({ konten }: { konten?: Cta; }) => {
    return (
        <section class="h-[380px] flex items-center justify-center">
            <a
                href={konten?.link || ""}
                rel="noopener noreferrer"
                class="text-center text-h1-small md:text-h1-medium lg:text-h1-large bg-neutral-100 hover:bg-[radial-gradient(50%_50%_at_50%_50%,#CCC_0%,#FFF_50%,#999_100%)] font-museomoderno font-medium bg-clip-text"
                style={{ WebkitTextFillColor: "transparent" }}
                dangerouslySetInnerHTML={konten?.judul || "Your CTA"}
            />
        </section>
    );
});


// const faq = [
//     {
//         id: 1,
//         title: "How do I get project progress notifications?",
//         answer: "We will report project progress by email every 5 pm."
//     },
//     {
//         id: 2,
//         title: "Can I get a refund after I cancel a project midway?",
//         answer: "Yes, you will get a 50% refund."
//     },
//     {
//         id: 3,
//         title: "Can I order web development or design only?",
//         answer: "Of course, you can order the service according to your needs."
//     }
// ];