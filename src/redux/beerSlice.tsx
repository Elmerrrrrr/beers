import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Root as Beer } from "../types/types";
import { MINIMUM_CHARACTER_SEARCH, SEARCH_TYPES } from "../constants/constants";

export interface BeerInfoState {
  beers: Beer[];
  page: number;
  searchValue: string;
  searchValueType: string;
}

const initialState: BeerInfoState = {
  beers: [],
  page: 1,
  searchValue: "",
  searchValueType: SEARCH_TYPES[0].queryName,
};

export const loadBeers = createAsyncThunk(
  "loadBeers",
  async (args: { page: number; searchQuery: string; searchType: string }) => {
    const basicUrl = "https://api.punkapi.com/v2/beers";
    let url = basicUrl + `?page=${args.page}&per_page=10`;

    if (
      args.searchQuery.length >= MINIMUM_CHARACTER_SEARCH &&
      args.searchType
    ) {
      url = url + `&${args.searchType}=${args.searchQuery}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("API response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const beerSlice = createSlice({
  name: "beer",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setSearchValueType: (state, action) => {
      state.searchValueType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadBeers.fulfilled, (state, action) => {
      state.beers = action.payload;
    });
    builder.addCase(loadBeers.rejected, (state, action) => {});
  },
});

export const { setPage, setSearchValue, setSearchValueType } =
  beerSlice.actions;
export default beerSlice.reducer;
