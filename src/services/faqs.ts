import { isDev } from "@builder.io/qwik";
import type { RequestEventLoader } from "@builder.io/qwik-city";
import type { Faq } from "~/components/ui-main/faq";

const API = `${isDev ? "http://localhost:1337/api/" : "https://splendid-prosperity-45273ea083.strapiapp.com/api/"}`;

type FaqsQuery = {
    is_active?: boolean;
    event: RequestEventLoader;
}

type QueryResponse = {
    data: Array<Faq> | [];
    meta: {
        pagination: {
            page: number,
            pageSize: number,
            pageCount: number,
            total: number
        }
    }
}

export async function getFaqs({
    is_active = true,
    event: { query }
}: FaqsQuery) {
    try {
        const is_active_filter = `${is_active ? `&filters[is_active][$eq]=${is_active}` : ``}`;

        const request = await fetch(`${API}faqs?fields[0]=judul&fields[1]=jawaban${is_active_filter}&locale=${query.get('locale') || "id"}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const response: QueryResponse = await request.json();

        return {
            ...response,
            success: false,
            message: "Success fetching faqs"
        };
    } catch (e) {
        if (isDev) {
            console.info(e);
        }
        return {
            success: false,
            message: "Error fetching faqs",
            data: []
        };
    }
}