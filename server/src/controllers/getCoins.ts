import { Request, Response } from "express";

import Crypto from "../models/Crypto";

export default async function getCoins(req : Request, res : Response) {
    try {
        const coins = await Crypto.find({}).sort({ rank: 1 });

        return res.status(200).json(coins);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}