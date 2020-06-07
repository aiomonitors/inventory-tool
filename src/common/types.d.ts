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
    inventoryTotal: number;
}



// DataManager stuff
export type Settings = {
    stockxEmail: string;
    stockxPassword: string;
    goatEmail: string;
}

export type DataManager = {
    loadMemory(): void;
    getSettings(): Settings;
    setSetting(key: keyof Settings, value: string): void;
    loadStockxSales?(): Promise<void>;
    getInventory(): InventoryItem[];
    addInventoryItem(items: InventoryItem | InventoryItem[]): void;
    deleteInventoryItem(index: string): void;
}
