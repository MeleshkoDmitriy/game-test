import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { TGame } from "../../types/types";

interface IInitialState {
    queryParams: string;
    games: TGame[];
    initialGames: TGame[];
    loading: boolean;
    error: string | null;
}

const initialState: IInitialState = {
    queryParams: '',
    games: [],
    initialGames: [],
    loading: false,
    error: null,
}

const querySlice = createSlice({
    name: 'queryParams',
    initialState,
    reducers: {
        throwQueryParams: (state, { payload }) => {
            state.queryParams = payload;
        },
        pushGames: (state, { payload }) => {
            state.games = payload;    
        },
        sortGamesByRating: (state, { payload }: PayloadAction<[keyof TGame | undefined, 'ASC' | 'DESC' | undefined]>) => {
            const [sortKey, sortOrder] = payload;
        
            if (sortKey !== undefined && sortOrder !== undefined) {
                if (sortOrder === 'DESC') {
                    state.games.sort((a, b) => (b[sortKey] as number) - (a[sortKey] as number));
                } else if (sortOrder === 'ASC') {
                    state.games.sort((a, b) => (a[sortKey] as number) - (b[sortKey] as number));
                }
            }
        }
    }
})

export const { 
    throwQueryParams, 
    pushGames, 
    sortGamesByRating,
 } = querySlice.actions;

export default querySlice.reducer;