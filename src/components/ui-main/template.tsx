import { component$ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import { IAsset } from '~/interfaces';

export const Template = component$<{data: IAsset}>(({ data }) => {
    const navigate = useNavigate();

    return (
        <figure class='font-poppins flex flex-col gap-y-8 relative'>
            <img
                height={400}
                width={400}
                class='h-[360px] w-full bg-neutral-700 rounded-2xl object-cover'
                src={data.thumbnail}
                alt="Thumbnail"
            />

            <figcaption class='flex flex-col gap-y-4'>
                <ul
                    class={`
                        flex flex-wrap gap-3
                        *:text-label-small *:md:text-label-medium *:lg:text-label-large text-neutral-white-200
                    `}
                >
                    { data.tags.split(",").map((tag) => {
                        return (
                            <li key={tag}>
                                { tag }
                            </li>
                        )
                    })}
                </ul>

                <h1 class='text-h3-small md:text-h3-medium lg:text-h3-large text-neutral-0'>
                    { data.title }
                </h1>

            </figcaption>

            <div class='h-full w-full top-0 bottom-0 left-0 right-0 absolute flex items-center justify-center opacity-0 hover:opacity-100 cursor-fancy'>
                <p 
                    onClick$={() => navigate(`/templates/${data.id}`)}
                    class='p-4 aspect-square rounded-full cursor-fancy bg-custom-neutral-700 hover:bg-custom-neutral-600 flex items-center justify-center font-museomoderno text-label-small sm:text-label-medium font-medium'
                >
                    LEARN MORE
                </p>
            </div>
        </figure>
    );
});