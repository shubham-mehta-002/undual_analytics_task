import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories : [],
}

export const categorySlice = createSlice({
    name : "categies",
    initialState,
    reducers:{
        setCategories:(state,action)=>{
            state.categories = action.payload
        }
    }
})

export const {setCategories} = categorySlice.actions
export const selectCategories = (state) => state.categories.categories
export default categorySlice.reducer