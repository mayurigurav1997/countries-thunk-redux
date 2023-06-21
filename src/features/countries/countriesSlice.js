import { createSlice } from '@reduxjs/toolkit'
import { showAllCountries, searchByCode, searchByRegion } from './countriesAction'

export const countriesSlice = createSlice({
    name: "countries",
    initialState: {
        loading: false,
        countriesData: [],
        countrySearch: [],
        region: "",
        searchTerm: "",
        error: false,
        success: false,
        message: "",

    },
    reducers: {
        reset: (state) => {
            state.loading = false;
            state.success = false;
            state.error = false;
            state.message = "";
            state.countrySearch = [];
            state.region = "";
        },
        setRegion: (state, action) => {
            state.region = action.payload
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(showAllCountries.pending, (state) => {
            state.loading = true
        }).addCase(showAllCountries.fulfilled, (state, action) => {
            state.loading = false;
            state.countriesData = action.payload;
            state.success = true;
        })
            .addCase(showAllCountries.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload;
                state.error = true;
                state.countriesData = []
            })
        builder.addCase(searchByCode.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(searchByCode.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.countrySearch = action.payload;
        })
        builder.addCase(searchByCode.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            state.message = action.payload;
            state.countrySearch = []
        })
        builder.addCase(searchByRegion.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(searchByRegion.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.countriesData = action.payload;
        })
        builder.addCase(searchByRegion.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            state.message = action.payload;
            state.countriesData = []
        })
    }
})
export const { reset, setRegion, setSearchTerm } = countriesSlice.actions
export default countriesSlice.reducer;