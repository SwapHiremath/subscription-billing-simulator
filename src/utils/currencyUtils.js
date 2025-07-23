const CurrencyConverter = require('currency-converter-lt');

async function convertToUSD(amount, currency) {
  const currencyConverter = new CurrencyConverter({
    from: currency,
    to: 'USD',
    amount: amount,
  });
  let usdAmount;
  try {
    usdAmount = await currencyConverter.convert();
    usdAmount = Math.round(usdAmount * 100) / 100;
  } catch (error) {
    usdAmount = null;
  }
  return {
    originalAmount: amount,
    originalCurrency: currency,
    usdAmount,
  };
}

module.exports = { convertToUSD }; 