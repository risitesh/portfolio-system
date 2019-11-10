module.exports = (app, wagner) => {
  app.get('/health', (req, res) => res.sendStatus(200));
};
