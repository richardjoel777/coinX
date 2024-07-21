import { Request, Response } from "express";

import Crypto from "../models/Crypto";
import MarketData from "../models/MarketData";
import { unsubscribe, subscribe } from "../pubsub";

export default async function getMarketdata(req : Request, res : Response) {
    try {
        // Get the coin id from the request
        const { code } = req.params;
        // Get the coin data from the database
        const coin = await Crypto.find({
            code: code
        });
        // If the coin does not exist, return a 404 status code
        if (!coin) {
            console.log("Coin not found");
            return res.status(404).json({ message: "Coin not found" });
        }

        const marketData = await MarketData.find({ "metadata.code": code, "metadata.currency": "USD" }).sort({ created_at: -1 }).limit(20);
        // Return the coin data
        
        res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        });

        res.write(`data: ${JSON.stringify(marketData)}\n\n`);

        subscribe(`${code}_USD`, res);

        res.on("close", () => {
            console.log("Connection closed");
            unsubscribe(`${code}_USD`, res);
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}