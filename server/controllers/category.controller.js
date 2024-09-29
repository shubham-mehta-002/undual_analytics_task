const axios = require("axios")

const fetchAllCategories = async(req,res)=>{
    try{
        const response = await axios.get('https://dummyjson.com/products/categories')
        const data = response.data
        console.log({data})
        return res.status(200).json({success:true , message:"Data fetched Successfully!!",data:data})
    }catch(err){
        console.log({err})
        return res.status(500).json({success:false, message:"Something went wrong!!"})
    }
}

module.exports = {
    fetchAllCategories
}