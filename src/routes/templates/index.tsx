import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from '@builder.io/qwik-city';

import { Header } from "~/components/ui-main/header";
import { Footer } from "~/components/ui-main/footer";
import { Template } from "~/components/ui-main/template";
import { IAsset } from "~/interfaces";

export const useAssets = routeLoader$(async () => {
    return assets;
});

export default component$(() => {
    const data = useAssets();

    return (
        <>
            <Header />

            <main class="pt-[220px] w-full px-4 md:px-6 lg:px-12 flex flex-col gap-y-[150px]">
    
                <section class="font-poppins flex flex-col gap-y-9">
                       
                    <article class="flex flex-col gap-y-8 max-w-[1000px]">
                        <h1 class="text-h1-small md:text-h1-medium lg:text-h1-large font-medium text-neutral-0">
                            Templates
                        </h1>

                        <p class="text-h3-small md:text-h3-medium lg:text-h3-large text-neutral-100">
                            Looking for a fast design upgrade? Our templates are made for you. Enhance your site and do your workflow effortlessly
                        </p>
                    </article>
                </section>

                <section class="font-poppins flex flex-col gap-y-9">
                       
                    <article class="py-4 flex items-center justify-between gap-x-4 border-b-[1.5px] border-b-neutral-600">
                        <h1 class="text-h2-small md:text-h2-medium lg:text-h2-large font-medium text-neutral-0">
                            All Asset
                        </h1>

                        <p class="text-label-small md:text-label-medium lg:text-label-large text-neutral-0">
                            {data.value.length} Assets
                        </p>
                    </article>

                    
                    {data.value.length ? (
                        <section class="grid gap-x-9 gap-y-12 grid-cols-(--cols-assets)">
                            {data.value.map((template) => {
                                return (
                                    <Template
                                        key={template.id}
                                        data={template}
                                    />
                                )
                            })}
                        </section>
                    ) : (
                        <div class="self-center w-full max-w-[800px] h-[300px] flex items-center justify-center">
                            <p class="font-poppins text-body-small sm:text-body-medium text-center text-custom-neutral-0">
                                Templates are not available yet, we are still working on it.
                            </p>
                        </div>
                    )}
                </section>

                <BookAMeetingSection />
    
            </main>

            <Footer />
        </>
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

const assets: Array<IAsset> = [
    // {
	// 	id: 1,
	// 	title: "Creative Portfolio Template",
	// 	thumbnail: "https://i.pinimg.com/736x/f8/0a/2f/f80a2f13d2d0c73a686cdbe9e59af3cb.jpg",
	// 	description: "A modern and clean portfolio template perfect for designers and agencies.",
	// 	asset_information: {
	// 		compatible: "Figma, Sketch",
	// 		license: "MIT",
	// 		release: "2024-01-10",
	// 		author: "Bakau Design"
	// 	},
	// 	price: 29,
	// 	galleries: [
	// 		{ image: "/assets/galleries/portfolio-1-1.png" },
	// 		{ image: "/assets/galleries/portfolio-1-2.png" }
	// 	],
	// 	tags: "portfolio,creative,figma",
	// 	purchaseLink: "https://gumroad.com/portfolio-template"
    // },
    // {
	// 	id: 2,
	// 	title: "SaaS Landing Page Kit",
	// 	thumbnail: "https://i.pinimg.com/736x/ff/21/c8/ff21c8b19ef7d59e8938f1fc2f658b0f.jpg",
	// 	description: "Landing page UI kit tailored for SaaS startups.",
	// 	asset_information: {
	// 		compatible: "Figma",
	// 		license: "Commercial",
	// 		release: "2023-12-20",
	// 		author: "Bakau Design"
	// 	},
	// 	price: 39,
	// 	galleries: [
	// 		{ image: "/assets/galleries/saas-1-1.png" },
	// 		{ image: "/assets/galleries/saas-1-2.png" },
	// 		{ image: "/assets/galleries/saas-1-3.png" }
	// 	],
	// 	tags: "saas,landingpage,ui-kit",
	// 	purchaseLink: null
    // },
    // {
	// 	id: 3,
	// 	title: "Mobile App UI Kit",
	// 	thumbnail: "https://i.pinimg.com/736x/62/bb/66/62bb66b1d3dec014a095ec37268b3dc9.jpg",
	// 	description: "Complete mobile UI kit with more than 50 screens.",
	// 	asset_information: {
	// 		compatible: "Figma, Adobe XD",
	// 		license: "Free",
	// 		release: "2024-02-15",
	// 		author: "Bakau Design"
	// 	},
	// 	price: 0,
	// 	galleries: [
	// 		{ image: "/assets/galleries/mobile-ui-1-1.png" }
	// 	],
	// 	tags: "mobile,app,ui-kit",
	// 	purchaseLink: "https://gumroad.com/mobile-ui-kit"
    // },
    // {
	// 	id: 4,
	// 	title: "E-commerce Dashboard",
	// 	thumbnail: "https://i.pinimg.com/736x/a0/6c/70/a06c701e27e36e011edf0e84f01ced6f.jpg",
	// 	description: "E-commerce admin dashboard with dark/light mode support.",
	// 	asset_information: {
	// 		compatible: "Figma",
	// 		license: "Commercial",
	// 		release: "2024-03-05",
	// 		author: "Bakau Design"
	// 	},
	// 	price: 59,
	// 	galleries: [
	// 		{ image: "/assets/galleries/ecommerce-dashboard-1.png" },
	// 		{ image: "/assets/galleries/ecommerce-dashboard-2.png" }
	// 	],
	// 	tags: "dashboard,ecommerce,admin",
	// 	purchaseLink: null
    // },
    // {
	// 	id: 5,
	// 	title: "Crypto Wallet UI Kit",
	// 	thumbnail: "https://i.pinimg.com/736x/71/19/72/7119720c7357f04db054ec322a5e722f.jpg",
	// 	description: "A sleek UI kit for crypto wallet apps.",
	// 	asset_information: {
	// 		compatible: "Figma, Sketch",
	// 		license: "MIT",
	// 		release: "2023-11-11",
	// 		author: "Bakau Design"
	// 	},
	// 	price: 49,
	// 	galleries: [
	// 		{ image: "/assets/galleries/crypto-wallet-1.png" }
	// 	],
	// 	tags: "crypto,finance,ui-kit",
	// 	purchaseLink: "https://gumroad.com/crypto-wallet"
    // },
    // {
	// 	id: 6,
	// 	title: "Event Website Template",
	// 	thumbnail: "/assets/thumbnails/event-template.png",
	// 	description: "Designed for conferences, meetups, and workshops.",
	// 	asset_information: {
	// 		compatible: "HTML, Tailwind CSS",
	// 		license: "Commercial",
	// 		release: "2024-01-01",
	// 		author: "Bakau Design"
	// 	},
	// 	price: 25,
	// 	galleries: [
	// 		{ image: "/assets/galleries/event-template-1.png" },
	// 		{ image: "/assets/galleries/event-template-2.png" }
	// 	],
	// 	tags: "event,website,template",
	// 	purchaseLink: null
    // },
    // {
	// 	id: 7,
	// 	title: "AI Tool Landing Page",
	// 	thumbnail: "/assets/thumbnails/ai-tool.png",
	// 	description: "A modern landing page built for AI tools or products.",
	// 	asset_information: {
	// 		compatible: "Figma",
	// 		license: "MIT",
	// 		release: "2024-02-29",
	// 		author: "Bakau Design"
	// 	},
	// 	price: 45,
	// 	galleries: [
	// 		{ image: "/assets/galleries/ai-tool-1.png" }
	// 	],
	// 	tags: "ai,landingpage,tech",
	// 	purchaseLink: "https://gumroad.com/ai-tool"
    // },
    // {
	// 	id: 8,
	// 	title: "Dark Mode UI Kit",
	// 	thumbnail: "/assets/thumbnails/dark-ui.png",
	// 	description: "UI kit specially crafted for dark mode lovers.",
	// 	asset_information: {
	// 		compatible: "Figma",
	// 		license: "MIT",
	// 		release: "2023-10-10",
	// 		author: "Bakau Design"
	// 	},
	// 	price: 35,
	// 	galleries: [
	// 		{ image: "/assets/galleries/dark-ui-1.png" }
	// 	],
	// 	tags: "darkmode,ui-kit,modern",
	// 	purchaseLink: null
    // },
    // {
	// 	id: 9,
	// 	title: "Health & Wellness App UI",
	// 	thumbnail: "/assets/thumbnails/health-app.png",
	// 	description: "App UI kit focused on health and wellness tracking.",
	// 	asset_information: {
	// 		compatible: "Figma",
	// 		license: "MIT",
	// 		release: "2024-01-25",
	// 		author: "Bakau Design"
	// 	},
	// 	price: 30,
	// 	galleries: [
	// 		{ image: "/assets/galleries/health-app-1.png" }
	// 	],
	// 	tags: "health,wellness,mobile",
	// 	purchaseLink: null
    // },
    // {
	// 	id: 10,
	// 	title: "Finance Dashboard Kit",
	// 	thumbnail: "/assets/thumbnails/finance-dashboard.png",
	// 	description: "Admin dashboard for financial applications.",
	// 	asset_information: {
	// 		compatible: "Figma",
	// 		license: "MIT",
	// 		release: "2023-09-15",
	// 		author: "Bakau Design"
	// 	},
	// 	price: 55,
	// 	galleries: [
	// 		{ image: "/assets/galleries/finance-dashboard-1.png" }
	// 	],
	// 	tags: "finance,dashboard,admin",
	// 	purchaseLink: "https://gumroad.com/finance-dashboard"
    // },
    // {
	// 	id: 11,
	// 	title: "Restaurant App UI",
	// 	thumbnail: "/assets/thumbnails/restaurant-app.png",
	// 	description: "UI kit for online food delivery or restaurant applications.",
	// 	asset_information: {
	// 		compatible: "Figma",
	// 		license: "Commercial",
	// 		release: "2024-02-10",
	// 		author: "Bakau Design"
	// 	},
	// 	price: 40,
	// 	galleries: [
	// 		{ image: "/assets/galleries/restaurant-app-1.png" }
	// 	],
	// 	tags: "food,restaurant,app",
	// 	purchaseLink: null
    // },
    // {
	// 	id: 12,
	// 	title: "Minimal Blog Template",
	// 	thumbnail: "/assets/thumbnails/blog-template.png",
	// 	description: "A simple, clean blog layout with a focus on readability.",
	// 	asset_information: {
	// 		compatible: "HTML, Tailwind CSS",
	// 		license: "MIT",
	// 		release: "2023-08-18",
	// 		author: "Bakau Design"
	// 	},
	// 	price: 19,
	// 	galleries: [
	// 		{ image: "/assets/galleries/blog-template-1.png" }
	// 	],
	// 	tags: "blog,minimal,template",
	// 	purchaseLink: "https://gumroad.com/blog-template"
    // }
];