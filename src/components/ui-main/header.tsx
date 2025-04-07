import {
    component$,
    useSignal
} from '@builder.io/qwik';

import { Link } from '@builder.io/qwik-city';

import Logo from "~/assets/Logo.png";
import HamburgerMenu from "~/assets/icons/Hamburger Menu.svg";
import Close from "~/assets/icons/Close.svg";
import { Button } from './button';

export const Header = component$(() => {
    const isOpen = useSignal(false);

    return (
        <header
            class="
                h-[100px] w-screen px-4 sm:px-6 lg:px-12 py-4 flex justify-between items-center fixed z-50 left-0 right-0 top-0
                bg-custom-neutral-700 font-poppins
            "
        >
            <img
                height={80}
                width={230}
                class='h-[80px] w-full max-w-[230px] object-contain'
                src={Logo}
                alt="Logo"
            />

            <nav class={`
                hidden lg:flex gap-x-12 *:text-neutral-0 items-center *:text-custom-neutral-100
            `}>
                <Link class='hover:text-custom-neutral-0' href="/">home</Link>
                <Link class='hover:text-custom-neutral-0' href="/#portfolio">portfolio</Link>
                <Link class='hover:text-custom-neutral-0' href="/about-us">about us</Link>
                <Link href="/templates" class='flex gap-x-1.5 items-center text-custom-neutral-0'>
                    <p>templates</p>
                    <p class='py-[2px] px-2 bg-[#D81313] rounded-full flex items-center gap-x-1.5'>Free</p>
                </Link>

                <div>
                    <Button
                        variant = "primary"
                        size = "small"
                        onClick$={() => window.open("https://calendly.com/hi-bakaudesign")}
                    >
                        <p>Book a Meeting</p>
                    </Button>
                </div>
            </nav>

            <img
                height={24}
                width={24}
                class='block lg:hidden gap-x-12 *:text-neutral-0 items-center'
                src={HamburgerMenu}
                alt="Hamburger menu"
                onClick$={() => isOpen.value = true}
            />

            <aside
                class={`
                    p-4 top-0 bottom-0 left-0 right-0 fixed flex flex-col justify-between bg-custom-neutral-700 transition-all duration-300
                    ${isOpen.value ? "translate-x-[0] lg:translate-x-[100vw]" : "translate-x-[100vw] lg:translate-x-[100vw]"}
                `}
            >
                <div class='w-full flex gap-x-4 justify-between items-center'>
                    <img
                        height={80}
                        width={230}
                        class='h-[80px] w-[230px] object-cover'
                        src={Logo}
                        alt="Logo"
                    />

                    <img
                        height={24}
                        width={24}
                        src={Close}
                        alt="Close icon"
                        onClick$={() => isOpen.value = false}
                    />
                </div>

                <nav class='flex flex-col gap-x-12 *:text-neutral-0 items-center justify-center gap-y-6 *:text-custom-neutral-100'>
                    <Link class='hover:text-custom-neutral-0' href="/">home</Link>
                    <Link class='hover:text-custom-neutral-0' href="/#portfolio">portfolio</Link>
                    <Link class='hover:text-custom-neutral-0' href="/about-us">about us</Link>
                    <Link href="/templates" class='flex gap-x-1.5 items-center hover:text-custom-neutral-0'>
                        <p>templates</p>
                        <p class='py-[2px] px-2 bg-[#D81313] rounded-full flex items-center gap-x-1.5'>Free</p>
                    </Link>

                    <div>
                        <Button
                            variant = "primary"
                            size = "small"
                            onClick$={() => window.open("https://calendly.com/hi-bakaudesign")}
                        >
                            <p>Book a Meeting</p>
                        </Button>
                    </div>
                </nav>

                <p>© Bakau Design 2024</p>
            </aside>
        </header>
    );
});