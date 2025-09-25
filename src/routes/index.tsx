import { 
    component$,
    // useSignal,
    // type QRL,
    // $,
    isDev
} from "@builder.io/qwik";
import { routeLoader$ } from '@builder.io/qwik-city';
import type { DocumentHead } from "@builder.io/qwik-city";

import { Header } from "~/components/ui-main/header";
import { Footer } from "~/components/ui-main/footer";
import {
    HighlightedPortfolio, 
    // Portfolio
} from "~/components/ui-main/portfolio";

import ArrowDown from "~/assets/icons/arrow-down.svg";
// import { Button } from "~/components/ui-main/button";

import { getHomepages } from "~/services/pages";
import type {
    Cta,
    // Section
} from "~/services/pages";
import { getPortfolios } from "~/services/portfolios";
import { getHeader, getFooter } from "~/services/components";

const API = `${isDev ? "http://localhost:1337" : ""}`;

export const head: DocumentHead = {
	title: "Bakau Design",
	meta: [
        {
            name: "description",
            content: "We Are Bakau Design A Solid Team, An Unstoppable Spirit"
        }
    ]
};

export const useGetContent = routeLoader$(
    async (event) => {
        const homepages = await getHomepages(event);
        const header = await getHeader(event);
        const footer = await getFooter(event);

        return { header, homepages, footer };
    }
);

export const useGetPortfolios = routeLoader$(
    async () => {
        return getPortfolios({ is_active: true, is_highlighted: true, ordered: true });
    }
);

export default component$(() => {
    const { value: konten } = useGetContent();
    const { value: portfolios } = useGetPortfolios();

    const { homepages } = konten;

    const hero = homepages.data?.hero;
    const layanan_kami = homepages.data?.layanan_kami;
    // const portofolio = homepages.data?.portofolio;
    const cta = homepages.data?.cta;

	return (
		<>
			<Header konten={konten.header.data} />

			<main class="pt-[220px] w-full px-4 md:px-6 lg:px-12 flex flex-col gap-y-[150px]">
				<section>
                    <article class="flex flex-col gap-y-8">
                        <h1
                            class="text-display-small md:text-display-medium lg:text-display-large font-medium font-museomoderno text-custom-neutral-0"
                            dangerouslySetInnerHTML={hero?.judul || "Your headline"}
                        />

                        <span class="flex justify-end items-center gap-x-4 animate-bounce font-poppins">
                            <img 
                                height={24}
                                width={24}
                                src={ArrowDown} 
                                alt="Arrow Down"
                            />

                            <p class="text-h3-small md:text-h3-medium lg:text-h3-large text-custom-neutral-0">
                                Scrool Down
                            </p>
                        </span>
                    </article>

                    <section class="no-scrollbar h-fit flex gap-x-8 items-end w-full *:even:h-[300px] *:odd:h-[400px] *:even:w-[500px] *:odd:w-[360px] overflow-x-scroll">
                        {portfolios.data.length ? portfolios.data.map(( data ) => {
                            return (
                                <HighlightedPortfolio
                                    key={data.id}
                                    data={data}
                                />
                            )
                        }): null}
                    </section>
                </section>

				<section class="font-poppins flex flex-col gap-y-9">
                    <article class="flex flex-col gap-y-4 md:gap-y-6">

                        <h1 
                            class="text-h1-small md:text-h1-medium lg:text-h1-large font-medium text-neutral-0 text-custom-neutral-0"
                            dangerouslySetInnerHTML={layanan_kami?.konten.judul || "Your headline"}
                        />

                        <p
                            class="text-label-medium md:text-label-large text-neutral-100 max-w-[500px]"
                            dangerouslySetInnerHTML={layanan_kami?.konten.judul_pendukung || "Your supporting headline"}
                        />
                    </article>

                    {layanan_kami?.daftar_layanan ? (
                        <ul class={`
                            *:p-8 *:h-[300px] *:w-full *:max-w-[500px] *:flex *:flex-col *:gap-y-6 *:justify-between *:rounded-2xl *:bg-[linear-gradient(180deg,#1F1F1F_0%,#1A1A1A_100%)]
                            flex flex-col lg:justify-end xl:flex-wrap md:flex-row gap-9
                        `}>
                            {layanan_kami.daftar_layanan.map((layanan) => (
                                <li key={layanan.id}>
                                    <article class="flex flex-col gap-y-4">
                                        <p class="text-h3-large font-medium text-custom-neutral-0">
                                            { layanan.nama }
                                        </p>

                                        <p class="text-body-small sm:text-body-medium text-custom-neutral-100">
                                            { layanan.deskripsi }
                                        </p>
                                    </article>

                                    <picture class="h-[100px] w-[100px] self-end">
                                        <source srcset={`${API}${layanan.cover.url || ""}`}  media="(min-width: 1080px)" />
                                        <source srcset={`${API}${layanan.cover.url || ""}`}  media="(min-width: 728px)" />
                                        <img
                                            src={`${API}${layanan.cover.url || ""}`} 
                                            alt={`Thumbnail ${layanan.nama}`}
                                        />
                                    </picture>
                                </li>
                            ))}
                        </ul>
                    ) : null}
                </section>

				{/* <PortfolioSection konten={portofolio}  /> */}

                <BookAMeetingSection konten={cta} />
			</main>

			<Footer konten={konten.footer.data} />
		</>
	);
});

// const PortfolioSection = component$(({ konten }: { konten?: Section; }) => {
//     const { value: portfolios } = useGetPortfolios();

//     const sliderRef = useSignal<Element>();

//     const sliderHandler: QRL = $(() => {
//         if (sliderRef.value) {
//             const maxScrollLeft = sliderRef.value.scrollWidth - sliderRef.value.clientWidth;
//             const childWidth = sliderRef.value.firstElementChild?.clientWidth as number;

//             if (sliderRef.value.scrollLeft < maxScrollLeft) {
//                 sliderRef.value.scrollBy({
//                     left: childWidth + 48,
//                     behavior: 'smooth',
//                 });
//             }
//         }
//     });

//     const previousHandler: QRL = $(() => {
//         if (sliderRef.value) {
//             const childWidth = sliderRef.value.firstElementChild?.clientWidth as number;
//             const scrollAmount = childWidth;
    
//             if (sliderRef.value.scrollLeft > 0) {
//                 sliderRef.value.scrollBy({
//                     left: -scrollAmount - 48,
//                     behavior: 'smooth',
//                 });
//             }
//         }
//     });

//     return (
//         <section class="font-poppins flex flex-col gap-y-9" id={`portfolio`}>

//             <section class="flex flex-wrap gap-6 items-end justify-between">

//                 <article class="flex flex-col gap-y-4 md:gap-y-6">

//                     <h1
//                         class="text-h1-small md:text-h1-medium lg:text-h1-large font-medium text-custom-neutral-0"
//                         dangerouslySetInnerHTML={konten?.judul || "Your headline"}
//                     />

//                     <p
//                         class="text-label-medium md:text-label-large text-custom-neutral-100 max-w-[500px]"
//                         dangerouslySetInnerHTML={konten?.judul_pendukung || "Your supporting headline"}
//                     />
//                 </article>

//                 <section class="w-full sm:w-fit flex justify-end gap-4">
//                     <Button
//                         variant = "secondary"
//                         size = "small"
//                         onClick$={previousHandler}
//                     >
//                         <p>Previous</p>
//                     </Button>

//                     <Button
//                         variant = "secondary"
//                         size = "small"
//                         onClick$={sliderHandler}
//                     >
//                         <p>Next</p>
//                     </Button>
//                 </section>
//             </section>

//             <section 
//                 class="flex gap-x-12 overflow-x-scroll"
//                 style={{ scrollbarWidth: "none" }}
//                 ref={sliderRef}
//             >
//                 {portfolios.data.length ? portfolios.data.map(( data ) => {
//                     return (
//                         <Portfolio
//                             key={data.id}
//                             data={data}
//                         />
//                     )
//                 }): null}
//             </section>
//         </section>
//     );
// });

const BookAMeetingSection = component$(({ konten }: { konten?: Cta; }) => {
    return (
        <section class="h-[380px] flex items-center justify-center">
            <a
                href={konten?.link || ""}
                target="_blank"
                rel="noopener noreferrer"
                class="text-h1-small md:text-h1-medium lg:text-h1-large bg-neutral-100 hover:bg-[radial-gradient(50%_50%_at_50%_50%,#CCC_0%,#FFF_50%,#999_100%)] font-museomoderno font-medium bg-clip-text"
                style={{ WebkitTextFillColor: "transparent" }}
                dangerouslySetInnerHTML={konten?.judul || "Your CTA"}
            />
        </section>
    );
});

// const portfolio = [
//     {
//         id: 1,
//         name: "Narima Prima Sejahtera",
//         thumbnail: "https://i.pinimg.com/736x/35/b6/e5/35b6e5ae5721ee97d018697db4f892be.jpg",
//         url: "https://narimaprima.com/",
//         status: "online",
//         tags: "Web Design, Web Development, Company Profile",
//     },
//     {
//         id: 2,
//         name: "Vroom Coffee & Roastery",
//         thumbnail: "https://i.pinimg.com/736x/0e/fc/ea/0efcea235ecf2c6a7c97db091e2e6bff.jpg",
//         url: "https://vroom-coffee-roastery.pages.dev",
//         status: "online",
//         tags: "Web Design, Web Development",
//     }
// ];