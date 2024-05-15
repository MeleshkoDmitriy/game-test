import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { TGame } from "../../types/types";
import axios from "axios";
import { GAMES_URL } from "../../utils/api";


export const fetchGames = createAsyncThunk(
    'queryParams/fetchGames',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(GAMES_URL);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Error while fetching data!');
        }
    }
);

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


            console.log(payload)  
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
        },
        filterByMultiPlayers: (state, { payload }) => {
            if (payload === true) {
                state.games = state.games.filter((game) => game.onlineMultiplayer === true);
            } 
        },
        filterByRusVoice: (state, { payload }) => {
            if (payload === true) {
                state.games = state.games.filter((game) => game.russianVoiceover === true);
            } 
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGames.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGames.fulfilled, (state, action) => {
                state.loading = false;
                state.games = action.payload;
                state.initialGames = action.payload;
            })
            .addCase(fetchGames.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
})

export const { 
    throwQueryParams, 
    pushGames, 
    sortGamesByRating,
    filterByMultiPlayers,
    filterByRusVoice
 } = querySlice.actions;

export default querySlice.reducer;