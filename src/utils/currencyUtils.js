const { Convert } = require("easy-currencies");

async function convertToUSD(amount, currency) {
  let usdAmount = await Convert(amount).from(currency).to("USD");
  usdAmount = Math.round(usdAmount * 100) / 100;
  return {
    originalAmount: amount,
    originalCurrency: currency,
    usdAmount,
  };
}

module.exports = { convertToUSD };
