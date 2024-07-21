export interface Crypto {
    name: string;
    code: string;
    symbol: string;
    rank: number;
    age: number;
    url: string;
    alltimeHighUSD: number;
    categories: string[];
}

export interface MarketData {
    rate: number;
    volume: number;
    cap: number;
    metadata: {
        code: string;
        currency: string;
    };
    created_at: string;
}