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
  dialectOptions: { decimalNumbers: true, lc_time_names : 'fr_FR' },

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});

sequelize
.authenticate()
.then(() => {
  sequelize.query("SET lc_time_names = 'fr_CA';")
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

app.use(async ctx => {
  ctx.body = 'There was an error loading the page.';
});

var io = require('socket.io').listen(app);

/*************************** Fonctions ****************************************/

function cols(employe) {
  let cols = "";
  let col = "";
  for(key in employe) {
    if (key != "id") {
      if (isNaN(employe[key])) {
        cols += key + " = \"" + employe[key] + "\", ";
      } else if (employe[key] === undefined || employe[key]  === null || employe[key] === "") {
        cols += key + " = NULL, ";
      } else {
        cols += key + " = " + Number(employe[key]) + ", ";
      }
    }
  }
  return cols.slice(0,-2);
}

function colsPaie(employe) {
  let cols = "";
  let col = "";
  let infosPaie = ["heures_travailles", "tarif_horaire", "rrq_employe", "impot_provincial",
  "assurance_collective_employe", "impot_federal", "vie_mam_federal", "vie_mam_provincial",
  "rqap_employe", "assurance_emploi_employeur", "sante_quebec", "assurance_collective_employeur",
  "rrq_employeur", "fss_employeur", "assurance_emploi_employe", "rqap_employeur"];
  for(key in employe) {
    if (key == "id") {
      cols += "employe = " + Number(employe[key]) + ", ";
    } else if (infosPaie.includes(key)) {
      if (isNaN(employe[key])) {
        cols += key + " = \"" + employe[key] + "\", ";
      } else {
        cols += key + " = " + Number(employe[key]) + ", ";
      }
    }
  }
  return cols.slice(0,-2);
}

function colsMembre(membre) {
  let cols = "";
  let col = "";
  for(key in membre) {
    if (key != "id") {
      if (isNaN(membre[key])) {
        cols += key + " = \"" + membre[key] + "\", ";
      } else if (membre[key] === undefined || membre[key]  === null || membre[key] === "") {
        cols += key + " = NULL, ";
      } else {
        cols += key + " = " + Number(membre[key]) + ", ";
      }
    }
  }
  return cols.slice(0,-2);
}

function colsInscription(date, membre) {

}

function enregistrerEmploye(employe, client) {
  sequelize.query("UPDATE employe SET " + cols(employe) + " WHERE id = " + employe.id).then(function() {
    client.emit("error-saving", "success", "Enregistré");
  }).catch(function (err) {
    console.error(err);
    client.emit("error-saving", "danger", "Une erreur est survenue.");
  });
}

function nouvelEmploye(employe) {
  sequelize.query("INSERT INTO employe SET " + cols(employe) + ";");
}

function nouvellePaie(employe, datePaie) {
  sequelize.query("INSERT INTO paie SET date_paie=DATE('" + datePaie + "'), " + colsPaie(employe) + ";");
}

function nouveauMembre(membre, date) {
  sequelize.query("INSERT INTO membre SET " + cols(membre) + ";").then(
    sequelize.query("INSERT INTO renouvellement SET membre=" + membre.id +
    ", date_renouvellement=" + date +
    ", regulier=" + membre.regulier + ", inscription=TRUE")
  );
}

function renouvellement(membre, date) {
  sequelize.query("INSERT INTO renouvellement SET membre=" + membre.id +
    ", date_renouvellement=" + date +
    ", regulier=" + membre.regulier + ", inscription=FALSE");
}

/******************************* Variables ************************************/

const infosPaies = "date_paie, paie.heures_travailles, paie.tarif_horaire, paie.rrq_employe, paie.impot_provincial, paie.assurance_collective_employe,\
 paie.impot_federal, paie.vie_mam_federal, paie.vie_mam_provincial, paie.rqap_employe, paie.assurance_emploi_employeur, paie.sante_quebec,\
 paie.assurance_collective_employeur, paie.rrq_employeur, paie.fss_employeur, paie.assurance_emploi_employe, paie.rqap_employeur";

const infosPaiesMois = "MONTHNAME(date_paie) AS date_paie, SUM(paie.heures_travailles) AS heures_travailles, ROUND(AVG(paie.tarif_horaire)) AS tarif_horaire,\
 SUM(paie.rrq_employe) AS rrq_employe, SUM(paie.impot_provincial) AS impot_provincial,\
 SUM(paie.assurance_collective_employe) AS assurance_collective_employe, SUM(paie.impot_federal) AS impot_federal, SUM(paie.vie_mam_federal) AS vie_mam_federal,\
 SUM(paie.vie_mam_provincial) AS vie_mam_provincial, SUM(paie.rqap_employe) AS rqap_employe, SUM(paie.assurance_emploi_employeur) AS assurance_emploi_employeur,\
 SUM(paie.sante_quebec) AS sante_quebec, SUM(paie.assurance_collective_employeur) AS assurance_collective_employeur, SUM(paie.rrq_employeur) AS rrq_employeur,\
 SUM(paie.fss_employeur) AS fss_employeur, SUM(paie.assurance_emploi_employe) AS assurance_emploi_employe, SUM(paie.rqap_employeur) AS rqap_employeur";

/******************************** socket.io ***********************************/



io.on('connection', function (client) {
  client.on('chercherEmployes', () => {
    sequelize.query("SELECT * FROM employe").then(res => client.emit('employes', res));
  });

  client.on('nouvelle-paie', (employe, datePaie) => nouvellePaie(employe,datePaie));
  client.on('enregistrerEmploye', (employe) => enregistrerEmploye(employe, client));
  client.on('nouvelEmploye', (employe) => nouvelEmploye(employe));
  client.on('get-infos-paies', (employe, annee) => {
    if (employe) {
      sequelize.query("SELECT " + infosPaies + " FROM paie WHERE employe = " + employe + " AND YEAR(date_paie) = " + annee + ";").then(res => {
        client.emit('set-infos-paies', res);
      });
    }
  });
  client.on('get-infos-paies-mensuelles', (employe, annee) => {
    if (employe) {
      sequelize.query("SELECT " + infosPaiesMois + " FROM paie WHERE employe = " + employe +
        " AND YEAR(date_paie) = " + annee + " GROUP BY MONTH(date_paie);").then(res => {
        client.emit('set-infos-paies-mensuelles', res);
      });
    }
  });
  client.on('get-infos-paie-annuelle', (employe, annee) => {
    if (employe) {
      sequelize.query("SELECT " + infosPaiesMois + " FROM paie WHERE employe = " + employe + " AND YEAR(date_paie) = " + annee + " GROUP BY YEAR(date_paie);").then(res => {
        client.emit('set-infos-paie-annuelle', res);
      });
    }
  });
  client.on('get-das', (annee) => {
    sequelize.query("SELECT " + infosPaiesMois + " FROM paie INNER JOIN employe ON employe.id = paie.employe WHERE YEAR(date_paie) = " + annee + " AND employe.type_emploi = 'Employé' GROUP BY MONTH(date_paie);")
    .then((res) => client.emit('set-das', res[0]));
  });
  client.on('nouveauMembre', (membre, date) => nouveauMembre(membre, date));
});

io.listen(3001);

const authenticate = async (client, password, callback) => {
  try {
   callback(null, password = "addsqm-301");
  } catch (error) {
    callback(error);
  }
};

const socketioAuth = require("socketio-auth");

socketioAuth(io, { authenticate, timeout: 30*60*1000 });
