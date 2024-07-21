import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { MarketData, Crypto } from "@/interfaces/coins";

export interface ICoinState {
    selectedCoin: string;
    coins: Crypto[];
    marketData: MarketData[];
}

const initialState: ICoinState = {
    selectedCoin: "",
    coins: [],
    marketData: [],
};

const coinSlice = createSlice({
    name: "coin",
    initialState,
    reducers: {
        setCoins(state, action: PayloadAction<Crypto[]>) {
            state.coins = action.payload;
        },
        setMarketData(state, action: PayloadAction<MarketData[]>) {
            state.marketData = action.payload;
        },
        setSelectedCoin(state, action: PayloadAction<string>) {
            state.selectedCoin = action.payload;
        },
    },
});

export const { setCoins, setMarketData, setSelectedCoin } = coinSlice.actions;

export default coinSlice.reducer;