const Koa = require('koa');
const config = require('./config/config');

const app = new Koa();

const { port } = config;

// app.use();
app.listen(port, () => {
    console.log(`listen on ${port}`);
});
