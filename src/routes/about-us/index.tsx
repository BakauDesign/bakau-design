import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from '@builder.io/qwik-city';

import { Header } from "~/components/ui-main/header";
import { Footer } from "~/components/ui-main/footer";

import { Workflow } from "~/components/ui-main/workflow";
import { Faq } from "~/components/ui-main/faq";

export const useWorkflow = routeLoader$(async () => {
    return workflows;
});

export const useFaq = routeLoader$(async () => {
    return faq;
});

export default component$(() => {
    return (
        <>
            <Header />

            <main class="pt-[220px] w-full px-4 md:px-6 lg:px-12 flex flex-col gap-y-[150px]">

                <section class="font-poppins flex flex-col gap-y-9">
                    <h1 class="text-h1-small md:text-h1-medium lg:text-h1-large font-medium text-neutral-0">
                        About us
                    </h1>

                    <article class="flex flex-col gap-y-8 max-w-[1000px]">
                        <p class="text-h3-small md:text-h3-medium lg:text-h3-large text-neutral-100">
                            Bakau Design is a digital agency based in Indonesia, we focused on ui ux design and web development.
                        </p>

                            <span class="block h-[1.5px] w-full bg-neutral-600" />

                            <ul class="flex flex-col gap-y-4 gap-x-8 lg:flex-row">
                                <li class="flex flex-col gap-y-2">

                                    <h1 class="text-h3-small md:text-h3-medium lg:text-h3-large font-medium text-neutral-0">
                                        Vision
                                    </h1>

                                    <p class="text-body-small md:text-body-medium lg:text-body-large text-neutral-100">
                                        We have a vision to become a design agency that not only produce aesthetic designs but also solve clients problems through effective design solutions.
                                    </p>
                                </li>

                                <li class="flex flex-col gap-y-2">

                                    <h1 class="text-h3-small md:text-h3-medium lg:text-h3-large text-neutral-0">
                                        Mission
                                    </h1>

                                    <p class="text-body-small md:text-body-medium lg:text-body-large text-neutral-100">
                                        And our mission is work closely with clients to deeply understand their needs, evaluated various design solutions, and create designs that not only aesthetic but also make a real impact.
                                    </p>
                                </li>
                            </ul>
                        </article>
                </section>

                <WorkflowSection />

                <FaqSection />

                <BookAMeetingSection />

            </main>

            <Footer />
        </>
    );
});


const WorkflowSection = component$(() => {
    const data = useWorkflow();

    return (
        <section class="font-poppins flex flex-col gap-y-9">
            <article class="flex flex-col gap-y-4 md:gap-y-6">

                <h1 class="text-h1-small md:text-h1-medium lg:text-h1-large font-medium text-neutral-0">
                    Workflow
                </h1>

                <p class="text-h3-small md:text-h3-medium lg:text-h3-large text-neutral-100 max-w-[500px]">
                    Process Of Working With Us
                </p>
            </article>

            <section class="grid grid-cols-(--cols-workflow) gap-8">
                {data.value.map(( workflow ) => {
                    return (
                        <Workflow
                            key={workflow.id}
                            data={workflow}
                        />
                    )
                })}
            </section>

        </section>
    );
});

const FaqSection = component$(() => {
    const data = useFaq();

    return (
        <section class="font-poppins flex flex-col gap-y-9">

            <section class="flex flex-wrap gap-6 items-end justify-between">

                <article class="flex flex-col gap-y-4 md:gap-y-6">

                    <h1 class="text-h1-small md:text-h1-medium lg:text-h1-large font-medium text-neutral-0">
                        Frequently Asked Questions
                    </h1>

                    <p class="text-label-medium md:text-label-large text-neutral-100 max-w-[500px]">
                        Find Answers Here! We're Here to Help You Learn More About Our Services.
                    </p>
                </article>

                
            </section>

            <section 
                class="grid gap-6 grid-cols-(--cols-faq)"
                style={{ scrollbarWidth: "none" }}
            >
                {data.value.map(( data ) => {
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


const faq = [
    {
        id: 1,
        title: "How do I get project progress notifications?",
        answer: "We will report project progress by email every 5 pm."
    },
    {
        id: 2,
        title: "Can I get a refund after I cancel a project midway?",
        answer: "Yes, you will get a 50% refund."
    },
    {
        id: 3,
        title: "Can I order web development or design only?",
        answer: "Of course, you can order the service according to your needs."
    }
];

const workflows = [
    {
        id: 1,
        number: "01",
        name: "Definition and Planning",
        description: "During this initial phase, we need to understand client's requirements; define goals, roles, responsibilities; and determine project scope.",
        tags: ["Engage With the Client", "Set Project Milestones"]
    },
    {
        id: 2,
        number: "02",
        name: "Creation and Development",
        description: "Once the project scope is defined, it is time to enter the phase of creating and developing ideas that will turn into the final result.",
        tags: ["Research", "Brainstorm", "Develop the Concept", "Design"]
    },
    {
        id: 3,
        number: "03",
        name: "Review and Approval",
        description: "When the creative work is complete and ready to go through client review cycles to guarantee alignment. The creative team will  make any adjustments to refine the final product.",
        tags: ["Go Through Revision Cycles", "Develop Final Assets"]
    },
    {
        id: 4,
        number: "04",
        name: "Launch and Evaluation",
        description: "Launching the product and measuring its success using the parameters set during the definition and planning phase.",
        tags: ["Launch", "Evaluate the Project"]
    }
];