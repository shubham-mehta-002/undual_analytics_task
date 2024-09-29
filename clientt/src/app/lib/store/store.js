import { configureStore } from '@reduxjs/toolkit'
import productSlice from "./features/product/productSlice"
import categorySlice from './features/category/categorySlice'
import filtersSlice from './features/filters/filtersSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      products : productSlice,
      categories : categorySlice,
      filters:filtersSlice
    }
  })
}