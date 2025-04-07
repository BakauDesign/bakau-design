import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import { Header } from "~/components/ui-main/header";
import { Footer } from "~/components/ui-main/footer";

import ArrowDown from "~/assets/icons/arrow-down.svg";
import Pallete from "~/assets/icons/Pallete.svg";
import Code from "~/assets/icons/Code.svg";

export const head: DocumentHead = {
	title: "Bakau Design",
	meta: [
        {
            name: "description",
            content: "We Are Bakau Design A Solid Team, An Unstoppable Spirit"
        }
    ]
};

export default component$(() => {
	return (
		<>
			<Header />

			<main class="pt-[220px] w-full px-4 md:px-6 lg:px-12 flex flex-col gap-y-[150px]">
				<section>
                    <article class="flex flex-col gap-y-8">
                        <h1 class="text-display-small md:text-display-medium lg:text-display-large font-medium font-museomoderno">
                            Not just aesthetic design but also <br /> <span class="bg-[linear-gradient(270deg,#6EAC49_0%,#80C955_100%)] bg-clip-text" style={{WebkitTextFillColor: "transparent"}}>solve problem</span>
                        </h1>

                        <span class="flex justify-end items-center gap-x-4 animate-bounce font-poppins">
                            <img 
                                height={24}
                                width={24}
                                src={ArrowDown} 
                                alt="Arrow Down"
                            />

                            <p class="text-h3-small md:text-h3-medium lg:text-h3-large">
                                Scrool Down
                            </p>
                        </span>
                    </article>
                </section>

				<section class="font-poppins flex flex-col gap-y-9">
                    <article class="flex flex-col gap-y-4 md:gap-y-6">

                        <h1 class="text-h1-small md:text-h1-medium lg:text-h1-large font-medium text-neutral-0">
                            Our Service
                        </h1>

                        <p class="text-label-medium md:text-label-large text-neutral-100 max-w-[500px]">
                            We provide aesthetic design creation and smooth development.
                        </p>
                    </article>

                    <ul class={`
                        *:p-8 *:h-[300px] *:w-full *:max-w-[500px] *:flex *:flex-col *:gap-y-6 *:justify-between *:rounded-2xl *:bg-[linear-gradient(180deg,#1F1F1F_0%,#1A1A1A_100%)]
                        *:text-h3-large *:font-medium
                        flex flex-col lg:justify-end xl:flex-wrap md:flex-row gap-9
                    `}>
                        <li>
                            <p>
                                Design User Interface and experience
                            </p>

                            <img
                                height={100}
                                width={100}
                                class="h-[100px] w-[100px] self-end"
                                src={Pallete}
                                alt="Pallete svg" 
                            />
                        </li>

                        <li>
                            <p>
                                Design to Web Development
                            </p>

                            <img
                                height={100}
                                width={100}
                                class="h-[100px] w-[100px] self-end"
                                src={Code}
                                alt="Code svg" 
                            />
                        </li>
                    </ul>
                </section>

				{/* <PortfolioSection /> */}

                <BookAMeetingSection />
			</main>

			<Footer />
		</>
	);
});



// function PortfolioSection() {
//     const data = useLoaderData<typeof loader>();

//     const sliderRef = useRef<null | HTMLElement>(null);

//     const sliderHandler = () => {
//         if (sliderRef.current) {
//             const maxScrollLeft = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
//             const childWidth = sliderRef.current.firstElementChild?.clientWidth as number;

//             if (sliderRef.current.scrollLeft < maxScrollLeft) {
//                 console.info(childWidth, sliderRef.current.clientWidth, window.innerWidth)
//                 sliderRef.current.scrollBy({
//                     left: childWidth + 48,
//                     behavior: 'smooth',
//                 });
//             } else {
//               console.log("Scroll reached the end.");
//             }
//         }
//     }

//     const previousHandler = () => {
//         if (sliderRef.current) {
//             const childWidth = sliderRef.current.firstElementChild?.clientWidth as number;
//             const scrollAmount = childWidth;
    
//             if (sliderRef.current.scrollLeft > 0) {
//                 console.info(-scrollAmount)
//                 sliderRef.current.scrollBy({
//                     left: -scrollAmount - 48,
//                     behavior: 'smooth',
//                 });
//             } else {
//                 console.log("Scroll reached the beginning.");
//             }
//         }
//     };

//     return (
//         <section className="font-poppins flex flex-col gap-y-9" id="portfolio">

//             <section className="flex flex-wrap gap-6 items-end justify-between">

//                 <article className="flex flex-col gap-y-4 md:gap-y-6">

//                     <h1 className="text-h1-small md:text-h1-medium lg:text-h1-large font-medium text-neutral-0">
//                         Portfolio
//                     </h1>

//                     <p className="text-label-medium md:text-label-large text-neutral-100 max-w-[500px]">
//                         Explore Our Digital Creations
//                     </p>
//                 </article>

//                 <section className="w-full sm:w-fit flex justify-end gap-4">
//                     <Button
//                         variant = "secondary"
//                         size = "small"
//                         onClick={previousHandler}
//                     >
//                         <p>Previous</p>
//                     </Button>

//                     <Button
//                         variant = "secondary"
//                         size = "small"
//                         onClick={sliderHandler}
//                     >
//                         <p>Next</p>
//                     </Button>
//                 </section>
//             </section>

//             <section 
//                 className="flex gap-x-12 overflow-x-scroll"
//                 style={{ scrollbarWidth: "none" }}
//                 ref={sliderRef}
//             >
//                 {/* {data && data.map(( data ) => {
//                     return (
//                         <Portfolio
//                             key={data.id}
//                             data={data}
//                         />
//                     )
//                 })} */}
//             </section>
//         </section>
//     );
// }

const BookAMeetingSection = component$(() => {
    return (
        <section class="h-[380px] flex items-center justify-center">
            <a
                href="https://calendly.com/hi-bakaudesign"
                rel="noopener noreferrer"
                class="text-h1-small md:text-h1-medium lg:text-h1-large bg-neutral-100 hover:bg-[radial-gradient(50%_50%_at_50%_50%,#CCC_0%,#FFF_50%,#999_100%)] font-museomoderno font-medium bg-clip-text"
                style={{ WebkitTextFillColor: "transparent" }}
            >
                Book a Meeting
            </a>
        </section>
    );
});