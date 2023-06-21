import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const showAllCountries = createAsyncThunk(
    "countries/showAll",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`https://restcountries.com/v3.1/all`)
            return response.data

        } catch (err) {
            const message = (err.message && err.response.data) || err.message;
            //rejectWithValue sends the error message as a payload
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//search by cioc code
export const searchByCode = createAsyncThunk(
    "countries/searchbyCode",
    async (code, thunkAPI) => {
        try {
            const response = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`)
            return response.data
        } catch (err) {
            const message = (err.message && err.response.data) || err.message;
            //rejectWithValue sends the error message as a payload
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//search by region
export const searchByRegion = createAsyncThunk(
    "countries/searchByRegion",
    async (region, thunkAPI) => {
        try {
            let response = await axios.get(`https://restcountries.com/v3.1/region/${region}`)
            return response.data;
        } catch (err) {
            const message = (err.message && err.response.data) || err.message;
            //rejectWithValue sends the error message as a payload
            return thunkAPI.rejectWithValue(message)
        }
    }
)