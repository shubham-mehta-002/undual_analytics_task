const axios = require("axios");

const fetchProducts = async (req, res) => {
  try {
    console.log(req.query)
    const {
      page = 1,
      itemsCount = 10,
      search = "",
      category = [],
    } = req.query;

    searchInput = search.trim()

    console.log({category})
    const response = await axios.get(`https://dummyjson.com/products?limit=0`);
    // console.log({ response });
    const allProducts = response.data.products;

    let products = allProducts;
    let totalDocs = allProducts.length;

    // filtering based on category
    if (category?.length) {
      products = products?.filter((product) =>
        category.includes(product.category)
      );
      totalDocs = products.length;
    }

    // filtering based on search Input
    if (searchInput != " ") {
      products = products?.filter((product) =>
        product.title.toLowerCase().includes(searchInput.toLowerCase())
      );
      totalDocs = products.length;
    }

    // page and limit
    products = products.slice((page - 1) * itemsCount, page * itemsCount);

    res.status(200).json({
      success: true,
      message: "Products fetched successfully!!",
      data: products,
      totalProducts: totalDocs,
      page,
    });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ success: false, message: "Something went wrong!!" });
  }
};

module.exports = {
  fetchProducts,
};
