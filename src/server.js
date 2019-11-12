const app = require('./app');

const port = process.env.port || 4000;
console.log('port',port);
app.set('port', port);
app.listen(port);
