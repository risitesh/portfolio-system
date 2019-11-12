module.exports = (wagner) => {
  wagner.factory('SecurityManager', () => {
    const SecurityManager = require('./security-manager');
    return new SecurityManager(wagner);
  });

  wagner.factory('ShareManager', () => {
    const ShareManager = require('./share-manager');
    return new ShareManager(wagner);
  });

  wagner.factory('ActivityManager', () => {
    const ActivityManager = require('./activity-manager');
    return new ActivityManager(wagner);
  });
};
