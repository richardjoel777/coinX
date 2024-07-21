import { Request, Response } from "express";

import config from "../config";
import Crypto from "../models/Crypto";
import MarketData from "../models/MarketData";
import { publish } from "../pubsub";

export default async function() {
    
    try {

        const currency = "USD";

        const coins = await Crypto.find({});

        const cryptos = await Promise.all(coins.map(async (coin) => {

            const response = await fetch(`${config.api_url}/coins/single`, {
                headers: {
                    "x-api-key": config.api_key,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    "currency": currency,
                    "code": coin.code,
                }),
            });

            const data = await response.json();
            
            return {
                rate: data.rate,
                volume: data.volume,
                cap: data.cap,
                metadata: {
                    code: coin.code,
                    currency: currency,
                },
            };
        }));

        await MarketData.insertMany(cryptos);

        await Promise.all(coins.map(async (coin) => {

            const marketData = await MarketData.find({ "metadata.code": coin.code, "metadata.currency": "USD" }).sort({ created_at: -1 }).limit(20);
            publish(`${coin.code}_${currency}`, marketData);
        }));

    } catch (error) {
        console.log(error);
    }
}