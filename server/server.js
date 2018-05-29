const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'There was an error loading the page.';
});


const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'elight',
  host: 'localhost',
  database: 'elight',
  password: 'gu1tar3',
  port: 5432,
})

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})




var io = require('socket.io').listen(app);

io.on('connection', function (client) {
  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });
});

io.listen(3000);