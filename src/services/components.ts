import { isDev } from "@builder.io/qwik";
import type { RequestEventLoader } from "@builder.io/qwik-city";

const API = `${isDev ? "http://localhost:1337/api/" : "https://splendid-prosperity-45273ea083.strapiapp.com/api/"}`;

export type Header = {
    logo: {
        nama: string;
        formats: Format;
    };
    cta: {
        judul: string;
        link: string;
    };
    hak_cipta: string;
    menu: Array<{
        id: number;
        label: string;
        href: string;
    }>;
}

export type Footer = {
    deskripsi: string;
    hak_cipta: string;
    logo: {
        nama: string;
        formats: Format;
    };
    menu: Array<{
        id: number;
        nama: string;
        sub_menu: Array<{
            id: number;
            label: string;
            href: string;
        }>
    }>;
}

export type Format = {
    formats: {
        small: {
            height: number;
            width: number;
            url: string;
        };
        medium: {
            height: number;
            width: number;
            url: string;
        };
        large: {
            height: number;
            width: number;
            url: string;
        };
    };
}

type Meta = {
    pagination: {
        page: number,
        pageSize: number,
        pageCount: number,
        total: number
    }
}

export async function getHeader(
    { query }: RequestEventLoader<QwikCityPlatform>
) {
    try {
        const request = await fetch(`${API}header?populate=all&locale=${query.get('locale') || "id"}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const response: {
            data: Header;
            meta: Meta;
        } = await request.json();

        return {
            ...response,
            success: true,
            message: "Success fetching footer component"
        };
    } catch (e) {
        if (isDev) {
            console.info(e);
        }
        return {
            success: false,
            message: "Error fetching footer component",
            data: null
        };
    }
}


export async function getFooter(
    { query }: RequestEventLoader<QwikCityPlatform>
) {
    try {
        const request = await fetch(`${API}footer?populate=all&locale=${query.get('locale') || "id"}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const response: {
            data: Footer;
            meta: Meta;
        } = await request.json();

        return {
            ...response,
            success: true,
            message: "Success fetching footer component"
        };
    } catch (e) {
        if (isDev) {
            console.info(e);
        }
        return {
            success: false,
            message: "Error fetching footer component",
            data: null
        };
    }
}