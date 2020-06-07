import { CookieJar, Response } from 'request';
import * as request from 'request-promise-native';
import { InventoryItem, StockXSearchResponse, StockXProduct } from './types';

export class StockX {
    // private jwtToken: string;
    private jar: CookieJar;
    readonly baseURL: string;

    constructor() {
        this.jar = request.jar();
        this.baseURL = 'https://stockx.com/api';
    }

    public async getItemInfo(item: InventoryItem): Promise<number> {
        const res: Response = await request.get(`${this.baseURL}/browse?&_search=${encodeURIComponent(item.sku)}&dataType=product`, {
            headers: {
                Host: 'stockx.com',
                Connection: 'keep-alive',
                'Upgrade-Insecure-Requests': 1,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
                Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'en-US,en;q=0.9,'
            },
            json: true,
            resolveWithFullResponse: true,
            followAllRedirects: true,
            gzip: true
        });
        const body: StockXSearchResponse = res.body;
        if (res.statusCode === 200 && body) {
            const foundItem = body.Products[0];
            return foundItem.market.averageDeadstockPrice;
        }
        return 0;
    }

    public async getSearchItems(query: string): Promise<InventoryItem[]> {
        const res: Response = await request.get(`${this.baseURL}/browse?&_search=${query}&dataType=product`, {
            headers: {
                Host: 'stockx.com',
                Connection: 'keep-alive',
                'Upgrade-Insecure-Requests': 1,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
                Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'en-US,en;q=0.9,'
            },
            json: true,
            resolveWithFullResponse: true,
            followAllRedirects: true,
            gzip: true
        });
        const body: StockXSearchResponse = res.body;
        if (res.statusCode === 200 && body) {
            const items = body.Products.map((i: StockXProduct): InventoryItem => {
                return {
                    name: i.title,
                    sku: i.styleId || i.tickerSymbol,
                    marketPrice: i.market.averageDeadstockPrice,
                    purchasePrice: 0,
                    size: '',
                    image: i.media.smallImageUrl.replace("FFFFFF", "16161a")
                }
            });
            console.log(items);
            return items;
        }
        return [] as InventoryItem[];
    }
};
