import { 
    component$,
    // useSignal,
    // type QRL,
    // $,
    // isDev
} from "@builder.io/qwik";
import { routeLoader$ } from '@builder.io/qwik-city';
import type { DocumentHead } from "@builder.io/qwik-city";

import { Header } from "~/components/ui-main/header";
import { Footer } from "~/components/ui-main/footer";
import { Portfolio } from "~/components/ui-main/portfolio";

// import ArrowDown from "~/assets/icons/arrow-down.svg";
// import { Button } from "~/components/ui-main/button";

import { getPortfoliopages } from "~/services/pages";
import type {
    Cta,
    // Section
} from "~/services/pages";
import { getPortfolios } from "~/services/portfolios";
import { getHeader, getFooter } from "~/services/components";
import { meta } from "~/assets/meta-data";

// const API = `${isDev ? "http://localhost:1337" : ""}`;
export const useGetLocale = routeLoader$(({ url }) => {
    const locale = url.searchParams.get('locale') || 'id';
    return locale;
});

export const head: DocumentHead = ({ resolveValue }) => {
    const locale = resolveValue(useGetLocale);

    const metaData = meta.portfolio[locale as "id" | "en"];

    return {
        title: metaData.title,
        meta: [
            {
                name: "description",
                content: metaData.description
            }
        ]
    }
};

export const useGetContent = routeLoader$(
    async (event) => {
        const homepages = await getPortfoliopages(event);
        const header = await getHeader(event);
        const footer = await getFooter(event);

        return { header, homepages, footer };
    }
);

export const useGetPortfolios = routeLoader$(
    async () => {
        return getPortfolios({ is_active: true });
    }
);

export default component$(() => {
    const { value: konten } = useGetContent();
    const { value: portfolios } = useGetPortfolios();

    const { homepages } = konten;

    const hero = homepages.data?.hero;
    // const layanan_kami = homepages.data?.layanan_kami;
    // const portofolio = homepages.data?.portofolio;
    const cta = homepages.data?.cta;

	return (
		<>
			<Header konten={konten.header.data} />

			<main class="pt-[220px] w-full px-4 md:px-6 lg:px-12 flex flex-col gap-y-[150px]">
                
                <section class="font-poppins flex flex-col gap-y-9" id={`portfolio`}>
                    <section class="flex flex-wrap gap-6 items-end justify-between">

                    <article class="flex flex-col gap-y-4 md:gap-y-6">
                        <h1
                            class="text-h1-small md:text-h1-medium lg:text-h1-large font-medium text-custom-neutral-0"
                            dangerouslySetInnerHTML={hero?.judul || "Your headline"}
                        />

                        <p
                            class="text-label-medium md:text-label-large text-custom-neutral-100 max-w-[500px]"
                            dangerouslySetInnerHTML={hero?.judul_pendukung || "Your supporting headline"}
                        />
                    </article>
                    </section>

                    <section 
                        class="grid gap-12 grid-cols-1 xl:grid-cols-2"
                    >
                        {portfolios.data.length ? portfolios.data.map(( data ) => {
                            return (
                                <Portfolio
                                    key={data.id}
                                    data={data}
                                />
                            )
                        }): null}
                    </section>
                </section>

                <BookAMeetingSection konten={cta} />
			</main>

			<Footer konten={konten.footer.data} />
		</>
	);
});

const BookAMeetingSection = component$(({ konten }: { konten?: Cta; }) => {
    return (
        <section class="h-[380px] flex items-center justify-center">
            <a
                href={konten?.link || ""}
                target="_blank"
                rel="noopener noreferrer"
                class="text-center text-h1-small md:text-h1-medium lg:text-h1-large bg-neutral-100 hover:bg-[radial-gradient(50%_50%_at_50%_50%,#CCC_0%,#FFF_50%,#999_100%)] font-museomoderno font-medium bg-clip-text"
                style={{ WebkitTextFillColor: "transparent" }}
                dangerouslySetInnerHTML={konten?.judul || "Your CTA"}
            />
        </section>
    );
});