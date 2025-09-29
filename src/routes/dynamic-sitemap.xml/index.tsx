import type { RequestHandler } from "@builder.io/qwik-city";
import { routes } from "@qwik-city-plan";
import { createSitemap } from "./create-sitemap";
import { getAssetSitemap } from "~/services/assets";

export const onGet: RequestHandler = async (event) => {
    const siteRoutes = routes
        .map(([route]) => route as string)
        .filter(route => route !== "/");
    
    const assets = await getAssetSitemap({ is_active: true, event });
    
    const sitemap = createSitemap([
        { loc: "/", priority: 1 }, 
        ...siteRoutes.map((route) => ({
            loc: route,
            priority: 0.9,
        })),
        ...assets.data.map((portfolio) => ({
            loc: `templates/${portfolio.slug}`,
            priority: 0.7
        }))
    ]);
 
    const response = new Response(sitemap, {
        status: 200,
        headers: { "Content-Type": "text/xml" },
    });
 
    event.send(response);
};