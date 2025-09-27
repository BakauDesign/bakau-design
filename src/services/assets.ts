import { isDev } from "@builder.io/qwik";
import type { RequestEvent, RequestEventLoader } from "@builder.io/qwik-city";
import type { Asset } from "~/components/ui-main/asset";

const API = `${isDev ? "http://localhost:1337/api/" : "https://splendid-prosperity-45273ea083.strapiapp.com/api/"}`;

type AssetsQuery = {
    is_active?: boolean;
    event: RequestEventLoader<QwikCityPlatform> | RequestEvent<QwikCityPlatform>;
};

type QueryResponse = {
    data: Array<Asset> | [];
    meta: {
        pagination: {
            page: number,
            pageSize: number,
            pageCount: number,
            total: number
        }
    }
}

export async function getAssets({
    is_active = true,
    event: { query }
}: AssetsQuery) {
    try {
        const fields = `
            fields[0]=id
            &fields[1]=judul
            &fields[3]=harga
            &fields[4]=penanda
            &fields[5]=slug
            ${is_active ? `&filters[is_active][$eq]=${is_active}` : ``}
            &populate=*
            &locale=${query.get('locale') || "id"}
        `;
        
        const singleLineFields = fields.replace(/\s+/g, '');

        const request = await fetch(`${API}assets?${singleLineFields}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const response: QueryResponse = await request.json();

        return {
            ...response,
            success: true,
            message: "Success fetching assets"
        };
    } catch (e) {
        if (isDev) {
            console.info(e);
        }
        return {
            success: false,
            message: "Error fetching assets",
            data: []
        };
    }
}

export async function getAssetSitemap({
    is_active = true,
    event: { query }
}: AssetsQuery) {
    try {
        const fields = `
            fields[0]=id
            &fields[5]=slug
            ${is_active ? `&filters[is_active][$eq]=${is_active}` : ``}
            &populate=*
            &locale=${query.get('locale') || "id"}
        `;
        
        const singleLineFields = fields.replace(/\s+/g, '');

        const request = await fetch(`${API}assets?${singleLineFields}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const response: QueryResponse = await request.json();

        return {
            ...response,
            success: true,
            message: "Success fetching assets"
        };
    } catch (e) {
        if (isDev) {
            console.info(e);
        }
        return {
            success: false,
            message: "Error fetching assets",
            data: []
        };
    }
}

export async function getAlternativeAssets({
    event: { params, query },
    is_active = true
}: AssetsQuery) {
    try {
        const fields = `
            fields[0]=id
            &fields[1]=judul
            &fields[3]=harga
            &fields[4]=penanda
            &fields[5]=slug
            ${is_active ? `&filters[is_active][$eq]=${is_active}` : ``}
            ${params.slug ? `&filters[slug][$ne]=${params.slug}` : ``}
            &populate=*
            &locale=${query.get('locale') || "id"}
        `;
        
        const singleLineFields = fields.replace(/\s+/g, '');

        const request = await fetch(`${API}assets?${singleLineFields}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const response: QueryResponse = await request.json();

        return {
            ...response,
            success: true,
            message: "Success fetching assets"
        };
    } catch (e) {
        if (isDev) {
            console.info(e);
        }
        return {
            success: false,
            message: "Error fetching assets",
            data: []
        };
    }
}

export async function getAssetsDetail({
    event: { params, query },
    is_active = true
}: AssetsQuery) {
    try {
        const fields = `
            ${is_active ? `&filters[is_active][$eq]=${is_active}` : ``}
            ${params.slug ? `&filters[slug][$eq]=${params.slug}` : ``}
            &populate=all
            &locale=${query.get('locale') || "id"}
        `;
        
        const singleLineFields = fields.replace(/\s+/g, '');

        const request = await fetch(`${API}assets?${singleLineFields}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const response: QueryResponse = await request.json();

        return {
            response: response,
            success: true,
            message: "Success fetching assets"
        };
    } catch (e) {
        if (isDev) {
            console.info(e);
        }
        return {
            success: false,
            message: "Error fetching assets",
            response: null
        };
    }
}