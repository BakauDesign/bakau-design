export interface IPortfolio {
    id: number;
    name: string;
    thumbnail: string;
    url: string;
    status: string;
    tags: string | null;
}

export interface IAsset {
    id: number;
    title: string;
    thumbnail: string;
    description: string;
    asset_information: IAssetInformation | null;
    price: number;
    galleries: Array<IGallery>
    tags: string;
    purchaseLink: string | null;
}

export interface IAssetInformation {
    id?: number;
    compatible: string;
    license: string;
    release: string;
    author: string;
    template?: string;
}

export interface IGallery {
    id?: number;
    image: string;
}