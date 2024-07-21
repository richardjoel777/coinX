import { Request, Response } from "express";
import config from "../config";
import Crypto from "../models/Crypto";

export default async function () {

    try {

        const currency = "USD";

        const coins = ["BTC", "ETH", "USDT", "BNB", "SOL"]

        await Promise.all(coins.map(async (coin) => {

            const response = await fetch(`${config.api_url}/coins/single`, {
                headers: {
                    "x-api-key": config.api_key,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    "currency": currency,
                    "code": coin,
                    "meta": true
                }),
            });

            const data = await response.json();

            const updatedData = {
                // Populate the Crypto model with the data from the API
                name: data.name,
                code: data.code,
                symbol: data.symbol,
                rank: data.rank,
                age: data.age,
                url: data.png64,
                alltimeHighUSD: data.allTimeHighUSD,
                categories: data.categories,
            };

            await Crypto.findOneAndUpdate({ code: coin }, updatedData, { upsert: true });
        }));

    } catch (error) {
        console.log(error);
    }
}