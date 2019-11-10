const app = require('./app');

const port = process.env.port || 4000;
app.set('port', port);
app.listen(port);
