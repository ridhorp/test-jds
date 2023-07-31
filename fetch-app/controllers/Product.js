const conversionRate = require("../helper/Conversion.js");

// get products
const getProducts = async (req, res) => {
  const response = await fetch(
    "https://60c18de74f7e880017dbfd51.mockapi.io/api/v1/jabar-digital-services/product"
  );
  let dataProducts = await response.json();

  const kursRupiahToUSD = await conversionRate();

  dataProducts = dataProducts.map((product) => {
    priceIDR = product.price * kursRupiahToUSD;
    return {
      id: product.id,
      createdAt: product.createdAt,
      price: product.price,
      price_idr: priceIDR,
      department: product.department,
      product: product.product,
    };
  });

  res.status(200).json(dataProducts);
};

// get top product
const getTopProducts = async (req, res) => {
  const response = await fetch(
    "https://60c18de74f7e880017dbfd51.mockapi.io/api/v1/jabar-digital-services/product"
  );
  let dataProducts = await response.json();

  const kursRupiahToUSD = await conversionRate();

  dataProducts = dataProducts.map((product) => {
    priceIDR = product.price * kursRupiahToUSD;
    return {
      id: product.id,
      createdAt: product.createdAt,
      price: product.price,
      price_idr: priceIDR,
      department: product.department,
      product: product.product,
    };
  });

  // Mengurutkan produk berdasarkan price_idr dari yang termahal ke termurah
  const sortedByPriceDesc = dataProducts
    .slice()
    .sort((a, b) => b.price_idr - a.price_idr);

  // Mengambil 5 produk dengan price_idr termahal
  const topFiveMostExpensive = sortedByPriceDesc.slice(0, 5);

  // Mengurutkan produk berdasarkan price_idr dari yang termurah ke termahal
  const sortedByPriceAsc = dataProducts
    .slice()
    .sort((a, b) => a.price_idr - b.price_idr);

  // Mengambil 5 produk dengan price_idr termurah
  const topFiveCheapest = sortedByPriceAsc.slice(0, 5);

  res.status(200).json({
    topFiveMostExpensive,
    topFiveCheapest,
  });
};

module.exports = { getProducts, getTopProducts };
