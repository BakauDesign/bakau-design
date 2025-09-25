import { component$, isDev } from "@builder.io/qwik";
import { routeLoader$ } from '@builder.io/qwik-city';

import { Header } from "~/components/ui-main/header";
import { Footer } from "~/components/ui-main/footer";
import { Button } from "~/components/ui-main/button";

import { getAlternativeAssets, getAssetsDetail } from "~/services/assets";
import { Asset } from "~/components/ui-main/asset";
import { type Cta, getTemplateDetailPages } from "~/services/pages";
import { getFooter, getHeader } from "~/services/components";

const API = `${isDev ? "http://localhost:1337" : "https://splendid-prosperity-45273ea083.strapiapp.com"}`;

export const useGetAssetsDetail = routeLoader$(
	async (event) => {
		return await getAssetsDetail({ event });
	}
);

export const useGetAlternativeAssets = routeLoader$(
	async (event) => {
		return await getAlternativeAssets({ event });
	}
);

export const useGetContent = routeLoader$(
    async (event) => {
        const templatePages = await getTemplateDetailPages(event);
        const header = await getHeader(event);
        const footer = await getFooter(event);

        return { header, templatePages, footer };
    }
);

export default component$(() => {
    const { value: asset } = useGetAssetsDetail();
    const { value: alternativeAssets } = useGetAlternativeAssets();

    const { value: konten } = useGetContent();
        
    const { templatePages, header, footer } = konten;

    const aset_alternatif_lainnya = templatePages.data?.aset_alternatif_lainnya;
    const cta = templatePages.data?.cta;

    return (
        <>
            <Header konten={header.data} />
    
            <main class="pt-[220px] w-full px-4 md:px-6 lg:px-12 flex flex-col gap-y-12">

                <section class="font-poppins flex flex-col gap-y-9">
                    
                    <section class="flex flex-col lg:flex-row justify-between gap-16">
                        <article class="flex flex-col gap-y-8 max-w-[1000px]">
                            <h1 class="text-h1-small md:text-h1-medium lg:text-h1-large font-medium text-custom-neutral-0">
                                { asset.data[0].judul }
                            </h1>

                            <p class="text-body-small sm:text-body-medium lg:text-body-large text-custom-neutral-white-100">
                               { asset.data[0].deskripsi }
                            </p>

                            <section class="w-fit">
                                <Button
                                    variant="primary"
                                    size="large"
                                    onClick$={() => window.open(`${ asset.data[0].link_pembelian }`)}
                                >
                                    <div class="flex items-center gap-6 font-poppins text-label-small sm:text-label-medium">
                                        <div class="flex items-center gap-4">
                                            {/* <Download /> */}

                                            <p>
                                                DOWNLOAD
                                            </p>
                                        </div>

                                        <p>
                                            {asset.data[0].harga}
                                        </p>
                                    </div>
                                </Button>
                            </section>
                            
                        </article>

                        <article class="min-w-[360px] pt-5 flex flex-col gap-y-5 border-t-[1.5px] border-solid border-t-custom-neutral-700 font-poppins">
                            <h1 class="font-medium text-label-small sm:text-label-medium text-custom-neutral-0">
                                { konten.templatePages.data?.label_informasi_aset || "-" }
                            </h1>

                            <ul class="flex flex-col gap-y-4 *:flex *:items-center *:justify-between *:gap-x-6 *:font-poppins *:text-label-small *:sm:text-label-medium *:text-custom-neutral-100">
                                <li>
                                    <p>{ konten.templatePages.data?.label_kompatibel || "-" }</p>
                                    <p>{asset.data[0].informasi_aset.kompatibel || "-"}</p>
                                </li>

                                <li>
                                    <p>{ konten.templatePages.data?.label_lisensi || "-" }</p>
                                    <p>{asset.data[0].informasi_aset.lisensi || "-"}</p>
                                </li>

                                <li>
                                    <p>{ konten.templatePages.data?.label_rilis || "-" }</p>
                                    <p>{asset.data[0].informasi_aset.rilis || "-"}</p>
                                </li>

                                <li>
                                    <p>{ konten.templatePages.data?.label_pembuat || "-" }</p>
                                    <p>{asset.data[0].informasi_aset.pembuat || "-"}</p>
                                </li>
                            </ul>
                        </article>
                    </section>
                </section>
                
                <section class="pt-16 grid gap-8 grid-cols-[repeat(auto-fill,minmax(360px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(656px,1fr))] *:w-full *:h-[600px] *:object-cover *:rounded-2xl border-t-[1.5px] border-solid border-t-custom-neutral-700">
                    {asset.data[0].galeri.map((galeri, _) => {
                        return (
                            // <img height={400} width={400} src={galeri.formats.small.url} key={"000"} />
							<picture class="overflow-hidden rounded-2xl *:h-full *:w-full *:object-cover" key={_}>
								<source srcset={`${API}${galeri.formats.large.url}`}  media="(min-width: 1080px)" />
								<source srcset={`${API}${galeri.formats.medium.url}`}  media="(min-width: 728px)" />
								<img
									height={galeri.formats.small.height}
									width={galeri.formats.small.width}
									class="h-full w-full object-cover"
									src={`${API}${galeri.formats.small.url}`} 
									alt={`Thumbnail ${asset.data[0].judul}`}
								/>
							</picture>
                        );
                    })}
                </section>

                {/* {data?.length as number > 0 && ( */}
                { alternativeAssets.data.length ? (
                    <section class="font-poppins flex flex-col gap-y-9">
                        <article class="py-4 flex items-center justify-between gap-x-4 border-b-[1.5px] border-b-neutral-600">
                            <h1 class="text-h2-small md:text-h2-medium lg:text-h2-large font-medium text-custom-neutral-0">
                                { aset_alternatif_lainnya?.judul || "Your Headline" }
                            </h1>
                        </article>

                        <section class="grid gap-x-9 gap-y-12 grid-cols-(--cols-assets)">
                            {alternativeAssets.data.map((asset) => {
                                return (
                                    <Asset
                                        key={asset.id}
                                        data={asset}
                                    />
                                )
                            })}
                        </section>
                    </section>
                ) : null}

                <BookAMeetingSection konten={cta} />

            </main>
                    
            <Footer konten={footer.data} />
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
                class="text-h1-small md:text-h1-medium lg:text-h1-large text-center bg-neutral-100 hover:bg-[linear-gradient(270deg,#80C955_0%,#FFF_100%)] font-museomoderno font-medium bg-clip-text"
                style={{ WebkitTextFillColor: "transparent" }}
                dangerouslySetInnerHTML={konten?.judul || "Your CTA"}
            />
        </section>
    );
});