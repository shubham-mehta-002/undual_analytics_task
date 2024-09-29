const express = require('express')
const app = express()
require("dotenv").config()

const cors = require('cors')
app.use(cors({
    origin:"https://undual-analytics-task.vercel.app/"
}))

const PORT = process.env.PORT || 5000

// fetching all routes
const categoryRouter = require("./routes/category.routes")
const productRouter = require("./routes/products.routes")

app.use('/category',categoryRouter)
app.use('/products',productRouter)

app.listen(PORT,()=>{
    console.log(`Listening on PORT: ${PORT}`)
})
