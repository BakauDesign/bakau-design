import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { type PlatformCloudflarePages } from '@builder.io/qwik-city/middleware/cloudflare-pages';

// import jwt from "jsonwebtoken";

// import Header from "../components/starter/header/header";
// import Footer from "../components/starter/footer/footer";

// import styles from "./../styles.css?inline";

import { verifyToken } from "~/lib/auth";

export const onGet: RequestHandler = ({ cacheControl }) => {  
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/

  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const onRequest: RequestHandler<PlatformCloudflarePages> = async ({
    platform,
    cookie,
    redirect,
    url
}) => {
    const isUser = await verifyToken({ cookie, platform });
    const pathname = url.pathname.replace(/\/+$/, '');

    if (isUser && pathname === "/cms/login") {
        throw redirect(302, "/cms/dashboard");
    }

    if (!isUser && pathname !== "/cms/login") {
        throw redirect(302, "/cms/login");
    }
};

export default component$(() => {
    // useStyles$(styles);
    return (
        <>
            {/* <Header /> */}
            <main class="dark:bg-neutral-950 h-screen w-screen font-inter">
                <Slot />
            </main>
            {/* <Footer /> */}
        </>
    );
});
