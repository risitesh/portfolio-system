module.exports = (wagner) => {
  wagner.factory('SecurityController', () => {
    const SecurityController = require('./security-controller');
    return new SecurityController(wagner);
  });
};
