import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "@/app/lib/hooks";
const initialState = {
    page : 1,
    searchInput : '',
    searchCategories:[]
}

export const filtersSlice = createSlice({
    name : "filters",
    initialState,
    reducers:{
        setPage: (state,action)=>{
            state.page = action.payload
        },
        setSearchInput:(state,action)=>{
            state.page = 1
            state.searchInput = action.payload
        },
        addSearchCategory:(state,action)=>{
            state.page = 1
            console.log('add',{state:state.searchCategories,action})
            state.searchCategories.push(action.payload)
        },
        removeSearchCategory:(state,action)=>{
            state.page = 1
            console.log('remove',{state,action})
            console.log('remoec11',{state:state.searchCategories,action})

            state.searchCategories = state.searchCategories.filter((category)=>category !== action.payload)
        }
    }
})

export const {setProducts,setPage,setSearchInput,addSearchCategory,removeSearchCategory} = filtersSlice.actions

export const selectPage = (state) => state.filters.page
export const selectSearchInput = (state) => state.filters.searchInput
export const selectSearchCategories = (state) => state.filters.searchCategories

export default filtersSlice.reducer