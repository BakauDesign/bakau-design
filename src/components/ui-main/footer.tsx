import {
    component$
} from '@builder.io/qwik';

import { Link } from '@builder.io/qwik-city';

import Logo from "~/assets/Logo.png";
import type { Footer as FooterContent } from '~/services/components';

export const Footer = component$(({ konten }: { konten?: FooterContent | null }) => {
    return (
        <footer class={`
            w-screen pt-16 bg-custom-neutral-700 flex flex-col gap-y-12 font-poppins
        `}>
            <div class='w-full max-w-[1000px] self-center px-4 sm:px-6 lg:px-12 gap-16 flex flex-col lg:flex-row justify-between items-start'>
                <div class='max-w-[280px]'>
                    <img 
                        height={80}
                        width={200}
                        class='h-[80px] w-[200px] object-contain'
                        src={Logo}
                        alt="Logo"
                    />

                    <p class='text-body-small md:text-body-medium text-custom-neutral-100' dangerouslySetInnerHTML={konten?.deskripsi || "Footer description"} />
                </div>

                <nav class={`
                    *:flex *:flex-col *:gap-y-5 *:font-medium *:*:flex *:*:flex-col *:*:gap-y-3
                    flex flex-wrap gap-12 text-label-small md:text-label-medium justify-between lg:justify-center
                `}>
                    {konten?.menu ? konten.menu.map((footerMenu) => (
                        <div key={footerMenu.id}>
                            <p class='text-custom-neutral-200'>{ footerMenu.nama }</p>

                            <ul class='*:font-normal *:text-custom-neutral-0'>
                                {footerMenu.sub_menu.map((subMenu) => (
                                    <li key={subMenu.id}><Link href={subMenu.href}>{ subMenu.label }</Link></li>
                                ))}
                            </ul>
                        </div>
                    )) : null}
                    
                    
                    {/* <div>
                        <p class='text-custom-neutral-200'>Social media</p>

                        <ul class='*:font-normal *:text-custom-neutral-0'>
                            <li><Link href="https://www.instagram.com/bakau.design">instagram</Link></li>
                            <li><Link href="https://id.pinterest.com/bakaudesign/">pinterest</Link></li>
                        </ul>
                    </div>
                    
                    <div>
                        <p class='text-custom-neutral-200'>Resources</p>

                        <ul class='*:font-normal *:text-custom-neutral-0'>
                            <li><Link href="/templates">Free UI Kit</Link></li>
                        </ul>
                    </div> */}
                </nav>
            </div>

            <div class='px-4 sm:px-6 lg:px-12 py-4 bg-custom-neutral-600 text-custom-neutral-0'>
                <p class='text-label-small md:text-label-medium text-center'>© Bakau Design 2024</p>
            </div>
        </footer>
    );
});