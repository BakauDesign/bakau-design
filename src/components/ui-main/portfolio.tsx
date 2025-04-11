import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { IPortfolio } from '~/interfaces';

export const Portfolio = component$<{data: IPortfolio}>(({ data }) => {
    return (
        <article class='flex flex-col gap-y-8 min-w-[328px] md:min-w-[580px]'>

            <figure
                class='h-[280px] md:h-[400px] relative rounded-xl overflow-hidden'
            >
                <img
                    height={500}
                    width={500}
                    class="h-full w-full object-cover"
                    src={data.thumbnail} 
                    alt={`Thumbnail ${data.name}`}
                />

                <div
                    class='absolute bottom-0 right-0 rounded-tl-xl bg-custom-neutral-700 py-2 px-3 flex items-center gap-x-4'
                >
                    <span class={`
                        h-[8px] w-[8px] block rounded-full ${data.status === "online" ? "bg-primary-400" : "bg-[#5555C9]"}
                    `} />

                    <p class='text-custom-neutral-0 font-medium text-label-small sm:text-label-medium'>
                        { data.status }
                    </p>
                </div>

                <div class='h-full w-full top-0 bottom-0 left-0 right-0 absolute flex items-center justify-center opacity-0 hover:opacity-100 cursor-fancy'>
                    <Link 
                        href={data.url} 
                        class='p-4 aspect-square rounded-full cursor-fancy text-custom-neutral-0 bg-lime-500 flex items-center justify-center font-museomoderno text-label-small sm:text-label-medium font-medium'
                    >
                        VISIT
                    </Link>
                </div>
            </figure>

            <figcaption class='flex flex-col gap-y-6 font-poppins'>
                <h1 class='text-custom-neutral-0 text-h3-large md:text-h2-medium lg:text-h2-large text-neutral-0'>
                    { data.name }
                </h1>

                <ul class={`
                    flex flex-wrap gap-4
                    *:font-poppins *:text-label-small *:md:text-label-medium *:text-neutral-white-200 *:bg-custom-neutral-700 *:text-custom-neutral-white-200 *:py-2 *:px-3 *:rounded-full  
                `}>
                    {data.tags?.split(",").map(( tag ) => {
                        return (
                            <li key={tag}>{tag}</li>
                        )
                    })}
                </ul>
            </figcaption>

        </article>
    );
});