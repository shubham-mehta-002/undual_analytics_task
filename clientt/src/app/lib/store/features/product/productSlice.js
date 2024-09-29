import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "@/app/lib/hooks";
const initialState = {
    products : [],
    totalProducts : 0
}

export const productSlice = createSlice({
    name : "products",
    initialState,
    reducers:{
        setProducts:(state,action)=>{
            // console.log({state,action})
            state.products = action.payload.data
            state.totalProducts = action.payload.totalProducts
        }
    }
})

export const {setProducts} = productSlice.actions

export const selectProducts = (state) => state.products?.products
export const selectTotalProductsCount = (state) => state.products.totalProducts

export default productSlice.reducer