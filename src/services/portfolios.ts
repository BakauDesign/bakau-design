import { isDev } from "@builder.io/qwik";
import type { Portfolio } from "~/components/ui-main/portfolio";

const API = `${isDev ? "http://localhost:1337/api/" : "https://splendid-prosperity-45273ea083.strapiapp.com/api/"}`;

type PortfoliosQuery = {
    is_active?: boolean;
    is_highlighted?: boolean;
    ordered?: boolean;
}

type QueryResponse = {
    data: Array<Portfolio> | [];
    meta: {
        pagination: {
            page: number,
            pageSize: number,
            pageCount: number,
            total: number
        }
    }
}

export async function getPortfolios({
    is_active = true,
    is_highlighted = false,
    ordered
}: PortfoliosQuery) {
    try {
        const fields = 'populate=thumbnail&fields[0]=id&fields[1]=nama&fields[2]=jenis&fields[3]=url&fields[4]=penanda&fields[5]=nama_highlighted';
        const is_active_filter = `${is_active ? `&filters[is_active][$eq]=${is_active}` : ``}`;
        const is_highlighted_filter = `${is_highlighted ? `&filters[is_highlighted][$eq]=${is_highlighted}` : ``}`;
        const ordered_filter = `${ordered ? `&sort[6]=urutan:asc` : ``}`;

        const request = await fetch(`${API}portfolios?${fields}${is_active_filter}${is_highlighted_filter}${ordered_filter}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const response: QueryResponse = await request.json();

        return {
            ...response,
            success: true,
            message: "Success fetching portfolios"
        };
    } catch (e) {
        if (isDev) {
            console.info(e);
        }
        return {
            success: false,
            message: "Error fetching portfolios",
            data: []
        };
    }
}