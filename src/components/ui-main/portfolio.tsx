import { component$, isDev } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

const API = `${isDev ? "http://localhost:1337" : ""}`;

// type Thumbnail = {
//     formats: {
//         small: {
//             height: number;
//             width: number;
//             url: string;
//         };
//         medium: {
//             height: number;
//             width: number;
//             url: string;
//         };
//         large: {
//             height: number;
//             width: number;
//             url: string;
//         };
//     };
// }

export type Portfolio = {
    id: number;
    nama: string;
    nama_highlighted: string;
    thumbnail: { url: string; };
    url: string;
    jenis: string;
    penanda: string | null;
};

export const Portfolio = component$<{ data: Portfolio }>(({ data: portfolio }) => {
    return (
        <article class='flex flex-col gap-y-8 min-w-[328px] md:min-w-[580px]'>

            <figure
                class='h-[280px] md:h-[400px] relative rounded-xl overflow-hidden'
            >   
                <picture>
                    {/* <source srcset={`${API}${portfolio.thumbnail.formats.large.url}`}  media="(min-width: 1080px)" />
                    <source srcset={`${API}${portfolio.thumbnail.formats.medium.url}`}  media="(min-width: 728px)" /> */}
                    <img
                        // height={portfolio.thumbnail.url}
                        // width={portfolio.thumbnail.url}
                        class="h-full w-full object-cover object-top"
                        src={`${API}${portfolio.thumbnail.url}`} 
                        alt={`Thumbnail ${portfolio.nama}`}
                    />
                </picture>

                <div
                    class='absolute bottom-0 right-0 rounded-tl-xl bg-custom-neutral-700 py-2 px-3 flex items-center gap-x-4'
                >
                    <span class={`
                        h-[8px] w-[8px] block rounded-full ${portfolio.jenis === "online" ? "bg-primary-400" : "bg-[#5555C9]"}
                    `} />

                    <p class='text-custom-neutral-0 font-medium text-label-small sm:text-label-medium'>
                        { portfolio.jenis }
                    </p>
                </div>

                <div class='h-full w-full top-0 bottom-0 left-0 right-0 absolute flex items-center justify-center opacity-0 hover:opacity-100 cursor-fancy'>
                    <Link 
                        href={portfolio.url} 
                        class='p-4 aspect-square rounded-full cursor-fancy text-custom-neutral-0 bg-lime-500 flex items-center justify-center font-museomoderno text-label-small sm:text-label-medium font-medium'
                    >
                        VISIT
                    </Link>
                </div>
            </figure>

            <figcaption class='flex flex-col gap-y-6 font-poppins'>
                <h1 class='text-custom-neutral-0 text-h3-large md:text-h2-medium lg:text-h2-large text-neutral-0'>
                    { portfolio.nama }
                </h1>

                <ul class={`
                    flex flex-wrap gap-4
                    *:font-poppins *:text-label-small *:md:text-label-medium *:text-neutral-white-200 *:bg-custom-neutral-700 *:text-custom-neutral-white-200 *:py-2 *:px-3 *:rounded-full  
                `}>
                    {portfolio.penanda?.split(",").map(( tag ) => {
                        return (
                            <li key={tag}>{tag}</li>
                        )
                    })}
                </ul>
            </figcaption>

        </article>
    );
});

export const HighlightedPortfolio = component$<{
    // height: number;
    // width: number;
    data: Portfolio;
}>(({
    // height,
    // width,
    data: portfolio
}) => {
    return (
        <article
            class='flex flex-col justify-end h-full w-full'
            // style={{
            //     height: height,
            //     width: width
            // }}
        >
            <figcaption 
                class='flex flex-col gap-y-6 font-poppins *:py-1.5 *:px-3 *:rounded-tl-[8px] *:rounded-tr-[8px] *:text-label-small *:md:text-label-large *:w-fit bg-[#141414]'
                dangerouslySetInnerHTML={portfolio.nama_highlighted}
            />

            <figure
                class='relative rounded-tr-[12px] overflow-hidden'
            >   
                <picture>
                    {/* <source srcset={`${API}${portfolio.thumbnail.formats.large.url}`}  media="(min-width: 1080px)" />
                    <source srcset={`${API}${portfolio.thumbnail.formats.medium.url}`}  media="(min-width: 728px)" /> */}
                    <img
                        // height={portfolio.thumbnail.url}
                        // width={portfolio.thumbnail.url}
                        class="h-full w-full object-cover object-top"
                        src={`${API}${portfolio.thumbnail.url}`} 
                        alt={`Thumbnail ${portfolio.nama}`}
                    />
                </picture>

                <div class='h-full w-full top-0 bottom-0 left-0 right-0 absolute flex items-center justify-center opacity-0 hover:opacity-100 cursor-fancy'>
                    <Link 
                        href={portfolio.url} 
                        class='p-4 aspect-square rounded-full cursor-fancy text-custom-neutral-0 bg-lime-500 flex items-center justify-center font-museomoderno text-label-small sm:text-label-medium font-medium'
                    >
                        VISIT
                    </Link>
                </div>
            </figure>
        </article>
    );
});