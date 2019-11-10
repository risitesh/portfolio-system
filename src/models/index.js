module.exports = (wagner) => {
  const mongoose = wagner.get('mongoose');
  wagner.factory('Security', () => require('./security')(mongoose));
  wagner.factory('Share', () => require('./share')(mongoose));
};
