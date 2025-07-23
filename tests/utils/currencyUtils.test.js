const { convertToUSD } = require('../../src/utils/currencyUtils');

jest.mock('easy-currencies', () => ({
  Convert: jest.fn((amount) => ({
    from: jest.fn(() => ({
      to: jest.fn(async (currency) => {
        if (currency === 'USD') return amount * 2; // mock conversion
        return amount;
      })
    }))
  }))
}));

describe('convertToUSD', () => {
  it('should convert amount to USD and round to 2 decimals', async () => {
    const result = await convertToUSD(10, 'EUR');
    expect(result).toEqual({
      originalAmount: 10,
      originalCurrency: 'EUR',
      usdAmount: 20
    });
  });
}); 