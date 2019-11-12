module.exports = (wagner) => {
  wagner.factory('TradeValidation', () => {
    const tradeValidation = require('./tradeValidation');
    return tradeValidation;
  });
};
