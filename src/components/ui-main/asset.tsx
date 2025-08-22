import { component$, isDev } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';

const API = `${isDev ? "http://localhost:1337" : "https://splendid-prosperity-45273ea083.strapiapp.com"}`;

export type Asset = {
    id: number;
    judul: string;
    deskripsi: string;
    thumbnail: Format;
    harga: number;
    link_pembelian: string | null;
    galeri: Array<Format>;
    penanda: string;
    slug: string;
    kompatibel: string;
    lisensi: string;
    rilis: string;
    pembuat: string;
};

type Format = {
    formats: {
        small: {
            height: number;
            width: number;
            url: string;
        };
        medium: {
            height: number;
            width: number;
            url: string;
        };
        large: {
            height: number;
            width: number;
            url: string;
        };
    };
}

export const Asset = component$<{ data: Asset }>(({ data: asset }) => {
    const location = useLocation();

    const langInUrl = location.url.searchParams.get('locale');

    return (
        <figure class='font-poppins flex flex-col gap-y-8 relative'>
            <picture class="h-[360px] lg:h-[400px] overflow-hidden rounded-2xl *:h-full *:w-full *:object-cover">
                <source srcset={`${API}${asset.thumbnail.formats.large.url}`}  media="(min-width: 1080px)" />
                <source srcset={`${API}${asset.thumbnail.formats.medium.url}`}  media="(min-width: 728px)" />
                <img
                    height={asset.thumbnail.formats.small.height}
                    width={asset.thumbnail.formats.small.width}
                    src={`${API}${asset.thumbnail.formats.small.url}`} 
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
                    { asset.penanda.split(",").map((penanda) => {
                        return (
                            <li key={penanda}>
                                { penanda }
                            </li>
                        )
                    })}
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
                    LEARN MORE
                </Link>
            </div>
        </figure>
    );
});