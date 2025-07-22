const errorHandler = require('../../src/middleware/errorHandler');

describe('errorHandler middleware', () => {
  let req, res, next;
  beforeEach(() => {
    req = {};
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  it('should return 500 and default message if no statusCode', () => {
    const err = new Error('fail');
    errorHandler(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: 'fail' }));
  });

  it('should use provided statusCode', () => {
    const err = new Error('bad request');
    err.statusCode = 400;
    errorHandler(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: 'bad request' }));
  });
}); 