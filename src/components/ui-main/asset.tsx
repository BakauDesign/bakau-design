import { component$, isDev } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';

const API = `${isDev ? "http://localhost:1337" : ""}`;

export type Asset = {
    id: number;
    judul: string;
    deskripsi: string;
    thumbnail: { url: string; };
    harga: string;
    link_pembelian: string | null;
    galeri: Array<{
        documentId: string;
        name: string;
        url: string;
    }> | null;
    penanda: string;
    slug: string;
    informasi_aset: {
        kompatibel: string;
        lisensi: string;
        rilis: string;
        pembuat: string;
    } | null;
};

// type Format = {
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

export const Asset = component$<{ data: Asset }>(({ data: asset }) => {
    const location = useLocation();

    const langInUrl = location.url.searchParams.get('locale');

    return (
        <figure class='font-poppins flex flex-col gap-y-8 relative justify-between'>
            <picture class="overflow-hidden rounded-2xl *:h-full *:w-full *:object-cover">
                {/* <source srcset={`${API}${asset.thumbnail.formats.large.url}`}  media="(min-width: 1080px)" />
                <source srcset={`${API}${asset.thumbnail.formats.medium.url}`}  media="(min-width: 728px)" /> */}
                <img
                    height={1000}
                    width={1000}
                    src={`${API}${asset.thumbnail.url}`} 
                    alt={`Thumbnail ${asset.judul}`}
                />
            </picture>

            <figcaption class='flex flex-col gap-y-4'>
                <ul
                    class={`
                        flex flex-wrap gap-4
                        *:text-label-small *:md:text-label-medium *:lg:text-label-large text-custom-neutral-white-200
                    `}
                >
                    { asset.penanda ? asset.penanda.split(",").map((penanda) => {
                        return (
                            <li key={penanda}>
                                { penanda }
                            </li>
                        )
                    }) : null}
                </ul>

                <h1 class='text-h3-small md:text-h3-medium lg:text-h3-large text-custom-neutral-0'>
                    { asset.judul }
                </h1>

            </figcaption>

            <div class='h-full w-full top-0 bottom-0 left-0 right-0 absolute flex items-center justify-center opacity-0 hover:opacity-100 cursor-fancy'>
                <Link 
                    href={`/templates/${asset.slug}/?locale=${langInUrl}`}
                    class='p-4 aspect-square rounded-full cursor-fancy text-custom-neutral-0 bg-custom-neutral-700 hover:bg-custom-neutral-600 flex items-center justify-center font-museomoderno text-label-small sm:text-label-medium font-medium'
                >
                    { langInUrl === "id" ? "PELAJARI" : "LEARN MORE" }
                </Link>
            </div>
        </figure>
    );
});