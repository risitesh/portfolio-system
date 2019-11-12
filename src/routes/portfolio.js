module.exports = (app, wagner) => {
  const tradeValidate = wagner.get('TradeValidation')(wagner);
  const securityController = wagner.get('SecurityController');

  app.post('/api/portfolio', async (req, res, next) => {
    req.check('name', 'Trade name is required').notEmpty();
    req.check('symbol', 'Trade short hand name is required').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({ message: errors[0].msg });
    }
    next();
    return null;
  },
  async (req, res) => {
    const result = await securityController.addTrade(req.body);
    res.status(result.code).json(result.data);
  });

  app.get('/api/portfolio/returns', async (req, res) => {
    const result = await securityController.getCumulativeReturn();
    res.status(result.code).json(result.data);
  });

  app.patch('/api/portfolio/:id', tradeValidate, async (req, res, next) => {
    req.check('amount', 'Trade Quantity is required').notEmpty();
    req.check('price', 'Trade amount is required').notEmpty();
    req.check('amount', 'Trade quantity is not valid').isNumeric();
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({ message: errors[0].msg });
    }
    next();
    return null;
  },
  async (req, res) => {
    securityController.security = req.security;
    const result = await securityController.updateTrade(req.body);
    res.status(result.code).json(result.data);
  });

  app.get('/api/portfolio/:id', tradeValidate, async (req, res) => {
    securityController.security = req.security;
    const result = await securityController.getTrade();
    res.status(result.code).json(result.data);
  });

  app.get('/api/portfolio', async (req, res) => {
    const result = await securityController.getTrades();
    res.status(result.code).json(result.data);
  });

  app.delete('/api/portfolio/:id', tradeValidate, async (req, res) => {
    securityController.security = req.security;
    const result = await securityController.deleteTrade();
    res.status(result.code).json(result.data);
  });
};
