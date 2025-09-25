import { isDev } from "@builder.io/qwik";
import type { RequestEventLoader } from "@builder.io/qwik-city";
import type { Workflow } from "~/components/ui-main/workflow";
// import { Format } from "./components";

const API = `${isDev ? "http://localhost:1337/api/" : "https://splendid-prosperity-45273ea083.strapiapp.com/api/"}`;

export type Section = {
    id: number;
    judul: string
    judul_pendukung: string | null;
}

type LayananKami = {
    konten: Section;
    daftar_layanan: Array<{
        id: number;
        nama: string;
        deskripsi: string;
        cover: { url: string; };
    }>;
}

type AboutUs = {
    konten: Section;
    visi_dan_misi: {
        label_visi: string;
        konten_visi: string;
        label_misi: string;
        konten_misi: string;
    }
}

export type WorkflowSection = {
    konten: Section;
    daftar_alur_kerja: Array<Workflow>;
}

export type Cta = {
    id: number;
    judul: string;
    link: string | null;
}

type Meta = {
    pagination: {
        page: number,
        pageSize: number,
        pageCount: number,
        total: number
    }
}

export async function getHomepages(
    { query }: RequestEventLoader<QwikCityPlatform>
) {
    try {
        const request = await fetch(`${API}halaman-beranda?populate=all&locale=${query.get('locale') || "id"}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const response: {
            data: {
                hero: Section;
                layanan_kami: LayananKami;
                portofolio: Section;
                cta: Cta;
            }
            meta: Meta;
        } = await request.json();

        return {
            ...response,
            success: true,
            message: "Success fetching home page"
        };
    } catch (e) {
        if (isDev) {
            console.info(e);
        }
        return {
            success: false,
            message: "Error fetching home page",
            data: null
        };
    }
}

export async function getAboutUspages(
    { query }: RequestEventLoader<QwikCityPlatform>
) {
    try {
        const request = await fetch(`${API}halaman-tentang-kami?populate=all&locale=${query.get('locale') || "id"}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const response: {
            data: {
                tentang_kami: AboutUs;
                alur_kerja_kami: WorkflowSection;
                faq: Section;
                cta: Cta;
            }
            meta: Meta;
        } = await request.json();

        return {
            ...response,
            success: true,
            message: "Success fetching about us page"
        };
    } catch (e) {
        if (isDev) {
            console.info(e);
        }
        return {
            success: false,
            message: "Error fetching about us page",
            data: null
        };
    }
}


export async function getPortfoliopages(
    { query }: RequestEventLoader<QwikCityPlatform>
) {
    try {
        const request = await fetch(`${API}halaman-portofolio?populate=all&locale=${query.get('locale') || "id"}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const response: {
            data: {
                hero: Section;
                cta: Cta;
            }
            meta: Meta;
        } = await request.json();

        return {
            ...response,
            success: true,
            message: "Success fetching portofolio page"
        };
    } catch (e) {
        if (isDev) {
            console.info(e);
        }
        return {
            success: false,
            message: "Error fetching portofolio page",
            data: null
        };
    }
}

export async function getTemplatepages(
    { query }: RequestEventLoader<QwikCityPlatform>
) {
    try {
        const request = await fetch(`${API}halaman-template?populate=all&locale=${query.get('locale') || "id"}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const response: {
            data: {
                hero: Section;
                daftar_template: Section;
                cta: Cta;
            }
            meta: Meta;
        } = await request.json();

        return {
            ...response,
            success: true,
            message: "Success fetching template page"
        };
    } catch (e) {
        if (isDev) {
            console.info(e);
        }
        return {
            success: false,
            message: "Error fetching template page",
            data: null
        };
    }
}

export async function getTemplateDetailPages(
    { query }: RequestEventLoader<QwikCityPlatform>
) {
    try {
        const request = await fetch(`${API}halaman-template-detail?populate=all&locale=${query.get('locale') || "id"}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const response: {
            data: {
                aset_alternatif_lainnya: Section;
                label_informasi_aset: string;
                label_kompatibel: string;
                label_lisensi: string;
                label_rilis: string;
                label_pembuat: string;
                label_beli: string;
                cta: Cta;
            }
            meta: Meta;
        } = await request.json();

        return {
            ...response,
            success: true,
            message: "Success fetching template detail page"
        };
    } catch (e) {
        if (isDev) {
            console.info(e);
        }
        return {
            success: false,
            message: "Error fetching template detail page",
            data: null
        };
    }
}