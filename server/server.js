const Koa = require('koa');
const app = new Koa();

const Sequelize = require('sequelize');
const sequelize = new Sequelize('sportsla_elight', 'sportsla_elight', '3raG(0n)', {
  host: 'sports-lamitis.com',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});

sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

app.use(async ctx => {
  ctx.body = 'There was an error loading the page.';
});

var io = require('socket.io').listen(app);


function enregistrerEmploye(employe) {
  let cols = "";
  let col = "";
  for(key in employe) {
    if (key != "id") {
      if (isNaN(employe[key])) {
        cols += key + " = \"" + employe[key] + "\", ";
      } else {
        cols += key + " = " + Number(employe[key]) + ", ";
      }
    }
  }
  cols = cols.slice(0,-2);
  sequelize.query("UPDATE employe SET " + cols + " WHERE id = " + employe.id);
}

function nouvelEmploye(employe) {
  let cols = "";
  let col = "";
  for(key in employe) {
    if (key != "id") {
      if (isNaN(employe[key])) {
        cols += key + " = \"" + employe[key] + "\", ";
      } else {
        cols += key + " = " + Number(employe[key]) + ", ";
      }
    }
  }
  cols = cols.slice(0,-2);
  sequelize.query("INSERT INTO employe SET " + cols + ";");
}

io.on('connection', function (client) {
  client.on('chercherEmployes', () => {
    console.log('client is subscribing to timer with interval ');
    sequelize.query("SELECT * FROM employe").then(res => client.emit('employes', res));
  });

  client.on('enregistrerEmploye', (employe) => enregistrerEmploye(employe));
  client.on('nouvelEmploye', (employe) => nouvelEmploye(employe));
  client.on('get-infos-paies', (employe) => {
    if (employe) {
      sequelize.query("SELECT debut, heures, tarif_horaire, rrq_employe, impot_provincial, \
      assurance_collective_employe, impot_federal, vie_mam_federal, vie_mam_provincial, \
      rqap_employe, assurance_emploi_employeur, sante_quebec, assurance_collective_employeur, \
      rrq_employeur, fss_employeur, assurance_emploi_employe, rqap_employeur \
      FROM paie WHERE employe = " + employe).then(res => {
        client.emit('envoyer-infos-paies', res);
      });
    }
  });
});

io.listen(3001);
