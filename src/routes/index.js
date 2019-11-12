module.exports = (app, wagner) => {
  require('./portfolio')(app, wagner);
  app.get('/health', (req, res) => res.sendStatus(200));
};
