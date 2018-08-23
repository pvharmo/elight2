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
  dialectOptions: { decimalNumbers: true},

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

/*************************** Cron *********************************************/

var cron = require('node-cron');
const mysqldump = require('mysqldump');

cron.schedule('0,15,30,45 * * * * *', function(){
//   mysqldump({
//     connection: {
//         host: 'sports-lamitis.com',
//         user: 'sportsla_elight',
//         password: '3raG(0n)',
//         database: 'sportsla_elight',
//     },
//     dumpToFile: './dump.sql',
//     dump: {
//       tables:[]
//     }
//   });
});

/*************************** Fonctions ****************************************/

function cols(employe) {
  let cols = "";
  let col = "";
  for(key in employe) {
    if (key != "id") {
      if (isNaN(employe[key])) {
        if (employe[key].match(/^\d\d\d\d-\d\d-\d\d$/)) {
          cols += key + " = DATE(\"" + employe[key] + "\"), ";
        } else {
          cols += key + " = \"" + employe[key] + "\", ";
        }
      } else if (employe[key] === undefined || employe[key]  === null || employe[key] === "") {
        cols += key + " = NULL, ";
      } else {
        cols += key + " = " + Number(employe[key]) + ", ";
      }
    }
  }
  return cols.slice(0,-2);
}

// function cols(champs, valeurs) {
//   let cols = "";
//   let col = "";
//   for(key in champs) {
//     if (key != "id") {
//       if (isNaN(valeurs[key])) {
//         if (valeurs[key].match(/^\d\d\d\d-\d\d-\d\d$/)) {
//           cols += key + " = DATE(\"" + valeurs[key] + "\"), ";
//         } else {
//           cols += key + " = \"" + valeurs[key] + "\", ";
//         }
//       } else if (valeurs[key] === undefined || valeurs[key]  === null || valeurs[key] === "") {
//         cols += key + " = NULL, ";
//       } else {
//         cols += key + " = " + Number(valeurs[key]) + ", ";
//       }
//     }
//   }
//   return cols.slice(0,-2);
// }

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
        if (employe[key].match(/^\d\d\d\d-\d\d-\d\d$/)) {
          cols += key + " = DATE(\"" + employe[key] + "\"), ";
        } else {
          cols += key + " = \"" + employe[key] + "\", ";
        }
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

function enregistrerEmploye(employe, client) {
  sequelize.query("UPDATE employe SET " + cols(employe) + " WHERE id = " + employe.id).then(function() {
    client.emit("error-saving", "success", "Enregistré");
  }).catch(function (err) {
    console.error(err);
    client.emit("error-saving", "danger", "Houston, nous avons un problème");
  });
}

function nouvelEmploye(employe) {
  sequelize.query("INSERT INTO employe SET " + cols(employe) + ";");
}

function nouvellePaie(employe, datePaie) {
  sequelize.query("INSERT INTO paie SET date_paie=DATE('" + datePaie + "'), " + colsPaie(employe) + ";");
}

function nouveauMembre(infosMembre, inscription, client) {
  sequelize.query("INSERT INTO membre SET " + cols(infosMembre) + ";").then((membre) => {
    sequelize.query("INSERT INTO renouvellement SET membre=" + membre[0] +
      ", date_renouvellement=DATE(\"" + inscription.date_renouvellement +
      "\"), regulier=" + infosMembre.regulier + ", inscription=TRUE, dons=" + inscription.dons + ";")
        .then(getMembres(client));
  });
}

function renouveller(id, infos, regulier, client) {
  sequelize.query("INSERT INTO renouvellement SET membre=" + id +
    ", date_renouvellement=DATE(\"" + infos.date_renouvellement +
    "\"), regulier=" + regulier + ", inscription=FALSE, dons=" + infos.dons + ", commentaires=\"" + infos.commentaires + "\";").then(()=>{

      getRenouvellements(id, client);
    });
}

function getMembres(client) {
  sequelize.query("SELECT * FROM membre").then((res)=>{
    client.emit('set-liste-membres', res[0]);
  });
}

function getRenouvellements(id, client) {
  renouvellement = {renouvellement: "", inscription: ""};
  const query = "SELECT id, date_renouvellement, commentaires, regulier, dons FROM renouvellement WHERE membre=" + id + " ORDER BY date_renouvellement DESC";
  sequelize.query(query).then((res)=>{
    client.emit('set-liste-renouvellements', res[0]);
  });
}

function getMenus(menu, client) {
  if (menu) {
    sequelize.query("SELECT etiquette AS label, valeur AS value, nom_menu FROM menu WHERE nom_menu IN (\"" + menu.join("\",\"") + "\") AND archive=0 ORDER BY nom_menu").then((values)=>{
      client.emit("set-menus", values[0]);
    });
  } else {
    sequelize.query("SELECT * FROM menu;").then((values)=>{
      client.emit("set-menus-liste", values[0]);
    });
  }
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


const authenticate = (client, password, callback) => {
  try {
    callback(null, password = "addsqm-301");
  } catch (error) {
    callback(error);
  }
};

const postAuthenticate = client => {
  console.log("test");
  client.emit("test");
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
  client.on('nouveau-membre', (membre, inscription) => nouveauMembre(membre, inscription, client));
  client.on('get-liste-membres', ()=>{getMembres(client)});
  client.on('supprimer-membre', (id)=>{
    sequelize.query("DELETE FROM membre WHERE id=" + id + ";").then(getMembres(client));
  });
  client.on('get-liste-renouvellement', (id)=>{
    getRenouvellements(id, client);
  });
  client.on("renouvellement", (id, infos, regulier)=>{
    renouveller(id, infos, regulier, client);
  });
  client.on('supprimer-renouvellement', (id, membre) => {
    sequelize.query("DELETE FROM renouvellement WHERE id=" + id + ";").then(getRenouvellements(membre, client)).then(function() {
      client.emit("error-saving", "success", "Supprimé");
    }).catch(function (err) {
      console.error(err);
      client.emit("error-saving", "danger", "Houston, nous avons un problème");
    });
  });
  client.on('modifier-membre', (infosMembre)=>{
    sequelize.query("UPDATE membre SET " + cols(infosMembre) + " WHERE id=" + infosMembre.id).then(function() {
      client.emit("error-saving", "success", "Un petit pas pour l'homme, un grand pas pour l'humanité");
    }).catch(function (err) {
      console.error(err);
      client.emit("error-saving", "danger", "Houston, nous avons un problème");
    });
  });
  client.on("nouveau-depannage", (depannage)=>{
    sequelize.query("INSERT INTO depannage SET " + cols(depannage) + ";").then(function() {
      client.emit("error-saving", "success", "Un petit pas pour l'homme, un grand pas pour l'humanité");
    }).catch(function (err) {
      console.error(err);
      client.emit("error-saving", "danger", "Houston, nous avons un problème");
    });
  });
  client.on("supprimer-depannage", (id)=>{
    sequelize.query("DELETE FROM depannage WHERE id=" + id);
  });
  client.on("enregistrer-depannage", (depannage)=>{
    sequelize.query("UPDATE depannage SET " + cols(depannage) + " WHERE id=" + depannage.id + ";").then(function() {
      client.emit("error-saving", "success", "Un petit pas pour l'homme, un grand pas pour l'humanité");
    }).catch(function (err) {
      console.error(err);
      client.emit("error-saving", "danger", "Houston, nous avons un problème");
    });
  });
  client.on("get-depannages", ()=>{
    sequelize.query("SELECT prenom, nom, service_utilise, id FROM depannage ").then((res)=>{
      client.emit("set-depannages", res[0]);
    });
  });
  client.on("nouvelle-option", (values)=>{
    sequelize.query("INSERT INTO menu SET " + cols(values) + ";").then(function() {
      client.emit("error-saving", "success", "C'est un grand pas pour l'homme");
    }).catch(function (err) {
      console.error(err);
      client.emit("error-saving", "danger", "Houston, nous avons un problème");
    });
  });
  client.on("enregistrer-option", (values)=>{
    sequelize.query("UPDATE menu SET " + cols(values) + " WHERE id=" + values.id).then(function() {
      client.emit("error-saving", "success", "Un petit pas pour l'homme, un grand pas pour l'humanité");
      getMenus(false, client);
    }).catch(function (err) {
      console.error(err);
      client.emit("error-saving", "danger", "Houston, nous avons un problème");
    });
  });
  client.on("get-menus", (menu)=>{
    getMenus(menu, client);
  });
  client.on("supprimer-option", (id)=>{
    sequelize.query("DELETE FROM menu WHERE id="+ id).then(()=>{
      getMenus(false, client);
    });
  });
}

const socketioAuth = require("socketio-auth");

socketioAuth(io, { authenticate, postAuthenticate, timeout: 30*60*1000 });

io.listen(3001);
