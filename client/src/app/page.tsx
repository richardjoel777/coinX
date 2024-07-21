'use client'

import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { setCoins, setMarketData, setSelectedCoin } from "@/store/slices/coin";

import { MarketData } from "@/interfaces/coins";

import './global.css';

// Component
function MarketDataPage() {
  
    const coinState = useAppSelector(state => state.coin);
    const dispatch = useAppDispatch();
    let sourceRef = useRef<EventSource | null>(null);
    
    const { selectedCoin, coins, marketData } = coinState;

    const coin = coins.find(coin => coin.code === selectedCoin);

    const fetchCoins = async () => {
        try {
            const response = await fetch(`${process.env.API_ENDPOINT}/coins`);
            const data = await response.json();
            localStorage.setItem("coins", JSON.stringify(data));
            dispatch(setCoins(data));
            if (!selectedCoin && data.length) {
                dispatch(setSelectedCoin(data[0].code));
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const fetchMarketData = async () => {
        try {
            sourceRef.current?.close();
            sourceRef.current = new EventSource(`${process.env.API_ENDPOINT}/coins/${selectedCoin}`);
            sourceRef.current.onmessage = (event) => {
                const data : MarketData[] = JSON.parse(event.data);
                localStorage.setItem("marketData", JSON.stringify(data));
                dispatch(setMarketData(data));
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        dispatch(setSelectedCoin(localStorage.getItem("selectedCoin") || ""));
        dispatch(setCoins(JSON.parse(localStorage.getItem("coins") || "[]")));
        dispatch(setMarketData(JSON.parse(localStorage.getItem("marketData") || "[]")));
        fetchCoins();
    }, []);

    useEffect(() => {
        if (selectedCoin) {
            localStorage.setItem("selectedCoin", selectedCoin);
            localStorage.removeItem("marketData");
            fetchMarketData();
        }
    }, [selectedCoin]);

    return (
        <div className="w-2/3 mx-auto flex flex-col items-center my-10">
            {/* Coin Selection */}
            <div className="flex items-center space-x-4 mb-8">
                <img src={coin?.url} alt={coin?.name} className="w-10 h-10 rounded-full" />
                <h1 className="text-xl font-bold">{coin?.name} ({coin?.symbol})</h1>
                <select
                    onChange={(e) => dispatch(setSelectedCoin(e.target.value))}
                    value={selectedCoin} className="p-2 border border-gray-300 rounded"
                >
                    {coins.map(coin => (
                        <option key={coin.code} value={coin.code}>{coin.name}</option>
                    ))}
                </select>
            </div>

            {/* Market Data Table */}
            <table className="w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-200 p-4 text-left">Date</th>
                        <th className="border border-gray-200 p-4 text-left">Rate ($)</th>
                        <th className="border border-gray-200 p-4 text-left">Market Cap</th>
                        <th className="border border-gray-200 p-4 text-left">Volume</th>
                    </tr>
                </thead>
                <tbody>
                    {marketData.map(marketData => (
                        <tr key={marketData.created_at.toString()} className="even:bg-gray-50">
                            <td className="border border-gray-200 p-4">{new Date(marketData.created_at).toLocaleString()}</td>
                            <td className="border border-gray-200 p-4">{marketData.rate.toFixed(2)}</td>
                            <td className="border border-gray-200 p-4">{marketData.cap}</td>
                            <td className="border border-gray-200 p-4">{marketData.volume}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MarketDataPage;