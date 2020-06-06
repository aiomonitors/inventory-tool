export interface ReleaseProduct {
    name: string;
    SKU: string;
    image: string;
    price: number | string;
    date?: string;
}

export interface InventoryItem {
    index?: string;
    name: string;
    sku: string;
    purchasePrice: number;
    size: string;
    marketPrice?: number;
    image?: string;
    category?: string;
}

export type Action = { label: string; value: string };

export type StoreState = {
    inventory: InventoryItem[];
}