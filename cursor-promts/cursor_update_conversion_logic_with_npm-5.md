# Update conversion logic with npm library
_Exported on 7/23/2025 at 20:12:15 GMT+5:30 from Cursor (1.2.4)_

---

**User**

update convertion logic with reference of npm liabrary - "currency-converter-lt"

---

**Cursor**

```javascript
const CurrencyConverter = require('currency-converter-lt');
// ... existing code ...
// Remove the old rates object and logic

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

```

The `convertToUSD` function in `currencyUtils.js` has been updated to use the `currency-converter-lt` npm library for real-time currency conversion. The function is now asynchronous and will return the converted USD amount using live rates.

If you use this function elsewhere, remember to handle it as an async function (i.e., use `await` or `.then`). If you need help updating usages or want to add tests for this new logic, let me know!

