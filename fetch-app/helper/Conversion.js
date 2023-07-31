module.exports = async () => {
  const accessKey = process.env.API_ACCESS_KEY;

  try {
    const conversionResponse = await fetch(
      `https://free.currconv.com/api/v7/convert?q=USD_IDR&compact=ultra&apiKey=${accessKey}`
    );

    let dataConversions = await conversionResponse.json();
    const conversionRate = dataConversions.USD_IDR;
    return conversionRate;
  } catch (error) {
    return error;
  }
};
