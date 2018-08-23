/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: depannage
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `depannage` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `prenom` varchar(40) NOT NULL,
  `nom` varchar(40) NOT NULL,
  `sexe` char(1) DEFAULT NULL,
  `date_naissance` date DEFAULT NULL,
  `adresse` varchar(40) DEFAULT NULL,
  `appartement` varchar(3) DEFAULT NULL,
  `code_postal` char(6) DEFAULT NULL,
  `ville` varchar(40) DEFAULT NULL,
  `province` char(2) DEFAULT NULL,
  `telephone` char(11) DEFAULT NULL,
  `telephone_alt` char(11) DEFAULT NULL,
  `courriel` varchar(60) DEFAULT NULL,
  `service_utilise` varchar(15) NOT NULL,
  `date_depannage` datetime NOT NULL,
  `pour_autre_personne` tinyint(1) NOT NULL,
  `nombre_appel` tinyint(3) unsigned DEFAULT NULL,
  `remarque_appel` char(2) DEFAULT NULL,
  `raison` char(2) NOT NULL,
  `motif` varchar(60) NOT NULL,
  `statut_aide_sociale` varchar(40) DEFAULT NULL,
  `situation_menage` char(2) DEFAULT NULL,
  `nb_adultes` tinyint(3) unsigned DEFAULT NULL,
  `nb_enfants` tinyint(3) unsigned DEFAULT NULL,
  `connaissance_adds` char(2) DEFAULT NULL,
  `traite_par` varchar(60) NOT NULL,
  `traite` tinyint(1) NOT NULL,
  `remarque` text,
  PRIMARY KEY (`id`)
) ENGINE = MyISAM AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: employe
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `employe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prenom` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `nom` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `adresse` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `code_postal` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `numero_assurance_sociale` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `tarif_horaire` decimal(10, 2) DEFAULT NULL,
  `heures_travailles` double DEFAULT NULL,
  `rrq_employe` decimal(10, 2) DEFAULT NULL,
  `impot_federal` decimal(10, 2) DEFAULT NULL,
  `impot_provincial` decimal(10, 2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `assurance_collective_employe` decimal(10, 2) DEFAULT NULL,
  `vie_mam_federal` decimal(10, 2) DEFAULT NULL,
  `vie_mam_provincial` decimal(10, 2) DEFAULT NULL,
  `rqap_employe` decimal(10, 2) DEFAULT NULL,
  `fss_employeur` decimal(10, 2) DEFAULT NULL,
  `rrq_employeur` decimal(10, 2) DEFAULT NULL,
  `sante_quebec` decimal(10, 2) DEFAULT NULL,
  `assurance_collective_employeur` decimal(10, 2) DEFAULT NULL,
  `assurance_emploi_employeur` decimal(10, 2) DEFAULT NULL,
  `assurance_emploi_employe` decimal(10, 2) DEFAULT NULL,
  `rqap_employeur` decimal(10, 2) DEFAULT NULL,
  `province` varchar(255) CHARACTER SET latin1 NOT NULL,
  `pays` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `ville` varchar(255) CHARACTER SET latin1 NOT NULL,
  `telephone` varchar(12) CHARACTER SET latin1 DEFAULT NULL,
  `telephone_alt` varchar(12) CHARACTER SET latin1 DEFAULT NULL,
  `courriel` varchar(30) CHARACTER SET latin1 DEFAULT NULL,
  `type_emploi` varchar(20) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `SEARCH_EMPLOYE` (
  `prenom`,
  `nom`,
  `adresse`,
  `code_postal`,
  `numero_assurance_sociale`
  )
) ENGINE = MyISAM AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: membre
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `membre` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `prenom` varchar(30) NOT NULL,
  `nom` varchar(30) NOT NULL,
  `sexe` char(1) DEFAULT NULL,
  `adresse` varchar(40) DEFAULT NULL,
  `appartement` varchar(6) DEFAULT NULL,
  `ville` varchar(30) DEFAULT NULL,
  `province` varchar(20) DEFAULT NULL,
  `code_postal` char(7) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `telephone_alt` varchar(20) DEFAULT NULL,
  `courriel` varchar(60) DEFAULT NULL,
  `date_naissance` date DEFAULT NULL,
  `info_poste` tinyint(1) NOT NULL,
  `info_courriel` tinyint(1) NOT NULL,
  `actif` tinyint(1) NOT NULL,
  `militant` tinyint(1) NOT NULL,
  `regulier` tinyint(1) NOT NULL,
  `commentaires` text,
  PRIMARY KEY (`id`)
) ENGINE = MyISAM DEFAULT CHARSET = utf8;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: menu
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `etiquette` varchar(60) NOT NULL,
  `valeur` varchar(40) NOT NULL,
  `nom_menu` varchar(40) NOT NULL,
  `archive` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = MyISAM AUTO_INCREMENT = 9 DEFAULT CHARSET = utf8;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: paie
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `paie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_paie` date NOT NULL,
  `heures_travailles` double DEFAULT NULL,
  `tarif_horaire` decimal(10, 2) DEFAULT NULL,
  `employe` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `rrq_employe` decimal(10, 2) DEFAULT NULL,
  `impot_provincial` decimal(10, 2) DEFAULT NULL,
  `assurance_collective_employe` decimal(10, 2) DEFAULT NULL,
  `impot_federal` decimal(10, 2) DEFAULT NULL,
  `vie_mam_federal` decimal(10, 2) DEFAULT NULL,
  `vie_mam_provincial` decimal(10, 2) DEFAULT NULL,
  `rqap_employe` decimal(10, 2) DEFAULT NULL,
  `assurance_emploi_employeur` decimal(10, 2) DEFAULT NULL,
  `sante_quebec` decimal(10, 2) DEFAULT NULL,
  `assurance_collective_employeur` decimal(10, 2) DEFAULT NULL,
  `rrq_employeur` decimal(10, 2) DEFAULT NULL,
  `fss_employeur` decimal(10, 2) DEFAULT NULL,
  `assurance_emploi_employe` decimal(10, 2) DEFAULT NULL,
  `rqap_employeur` decimal(10, 2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = MyISAM AUTO_INCREMENT = 11 DEFAULT CHARSET = utf8;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: renouvellement
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `renouvellement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `membre` int(11) NOT NULL,
  `inscription` tinyint(1) NOT NULL,
  `date_renouvellement` date NOT NULL,
  `regulier` tinyint(1) NOT NULL,
  `dons` decimal(10, 2) DEFAULT NULL,
  `commentaires` text,
  PRIMARY KEY (`id`)
) ENGINE = MyISAM AUTO_INCREMENT = 20 DEFAULT CHARSET = utf8;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: depannage
# ------------------------------------------------------------

INSERT INTO
  `depannage` (
    `id`,
    `prenom`,
    `nom`,
    `sexe`,
    `date_naissance`,
    `adresse`,
    `appartement`,
    `code_postal`,
    `ville`,
    `province`,
    `telephone`,
    `telephone_alt`,
    `courriel`,
    `service_utilise`,
    `date_depannage`,
    `pour_autre_personne`,
    `nombre_appel`,
    `remarque_appel`,
    `raison`,
    `motif`,
    `statut_aide_sociale`,
    `situation_menage`,
    `nb_adultes`,
    `nb_enfants`,
    `connaissance_adds`,
    `traite_par`,
    `traite`,
    `remarque`
  )
VALUES
  (
    1,
    'Jonat',
    'Caron',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    'accueil',
    '2018-08-17 22:07:45',
    1,
    NULL,
    NULL,
    'I',
    'test',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    'test',
    1,
    NULL
  );
INSERT INTO
  `depannage` (
    `id`,
    `prenom`,
    `nom`,
    `sexe`,
    `date_naissance`,
    `adresse`,
    `appartement`,
    `code_postal`,
    `ville`,
    `province`,
    `telephone`,
    `telephone_alt`,
    `courriel`,
    `service_utilise`,
    `date_depannage`,
    `pour_autre_personne`,
    `nombre_appel`,
    `remarque_appel`,
    `raison`,
    `motif`,
    `statut_aide_sociale`,
    `situation_menage`,
    `nb_adultes`,
    `nb_enfants`,
    `connaissance_adds`,
    `traite_par`,
    `traite`,
    `remarque`
  )
VALUES
  (
    2,
    'Jonathan',
    'Caron-Roberge',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    'accueil',
    '2018-08-17 23:35:58',
    1,
    NULL,
    NULL,
    'I',
    'test',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    'test',
    1,
    NULL
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: employe
# ------------------------------------------------------------

INSERT INTO
  `employe` (
    `id`,
    `prenom`,
    `nom`,
    `adresse`,
    `code_postal`,
    `numero_assurance_sociale`,
    `tarif_horaire`,
    `heures_travailles`,
    `rrq_employe`,
    `impot_federal`,
    `impot_provincial`,
    `created_at`,
    `updated_at`,
    `assurance_collective_employe`,
    `vie_mam_federal`,
    `vie_mam_provincial`,
    `rqap_employe`,
    `fss_employeur`,
    `rrq_employeur`,
    `sante_quebec`,
    `assurance_collective_employeur`,
    `assurance_emploi_employeur`,
    `assurance_emploi_employe`,
    `rqap_employeur`,
    `province`,
    `pays`,
    `ville`,
    `telephone`,
    `telephone_alt`,
    `courriel`,
    `type_emploi`
  )
VALUES
  (
    1,
    'Jonathan',
    'Caron-Roberge',
    '794 Terrasse Laurentienne',
    'g1v2t1',
    '737870816',
    12.00,
    30,
    22.29,
    22.30,
    26.13,
    '2018-07-29 06:28:08',
    '2018-07-29 06:29:07',
    0.00,
    0.00,
    0.00,
    2.63,
    11.04,
    22.29,
    0.00,
    0.00,
    0.00,
    6.24,
    3.69,
    'QC',
    'Canada',
    'Québec',
    '5819880125',
    NULL,
    NULL,
    'Stagiaire'
  );
INSERT INTO
  `employe` (
    `id`,
    `prenom`,
    `nom`,
    `adresse`,
    `code_postal`,
    `numero_assurance_sociale`,
    `tarif_horaire`,
    `heures_travailles`,
    `rrq_employe`,
    `impot_federal`,
    `impot_provincial`,
    `created_at`,
    `updated_at`,
    `assurance_collective_employe`,
    `vie_mam_federal`,
    `vie_mam_provincial`,
    `rqap_employe`,
    `fss_employeur`,
    `rrq_employeur`,
    `sante_quebec`,
    `assurance_collective_employeur`,
    `assurance_emploi_employeur`,
    `assurance_emploi_employe`,
    `rqap_employeur`,
    `province`,
    `pays`,
    `ville`,
    `telephone`,
    `telephone_alt`,
    `courriel`,
    `type_emploi`
  )
VALUES
  (
    2,
    'Guillaume',
    'Caron',
    '155 rue bellevue',
    'g0j2l0',
    '123456789',
    80.00,
    10,
    2.00,
    2.00,
    2.00,
    '0000-00-00 00:00:00',
    '0000-00-00 00:00:00',
    2.00,
    2.00,
    2.00,
    2.00,
    1.00,
    3.00,
    2.00,
    3.00,
    1.00,
    2.00,
    1.00,
    'QC',
    'Canada',
    'Sainte-Flavie',
    NULL,
    NULL,
    NULL,
    ''
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: membre
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: menu
# ------------------------------------------------------------

INSERT INTO
  `menu` (`id`, `etiquette`, `valeur`, `nom_menu`, `archive`)
VALUES
  (5, 'Répondeur', 'repondeur', 'remarque_appel', 0);
INSERT INTO
  `menu` (`id`, `etiquette`, `valeur`, `nom_menu`, `archive`)
VALUES
  (6, 'Pas répondu', 'pas_repondu', 'remarque_appel', 0);
INSERT INTO
  `menu` (`id`, `etiquette`, `valeur`, `nom_menu`, `archive`)
VALUES
  (8, 'Par un ami', 'ami', 'connaissanceADDS', 0);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: paie
# ------------------------------------------------------------

INSERT INTO
  `paie` (
    `id`,
    `date_paie`,
    `heures_travailles`,
    `tarif_horaire`,
    `employe`,
    `created_at`,
    `updated_at`,
    `rrq_employe`,
    `impot_provincial`,
    `assurance_collective_employe`,
    `impot_federal`,
    `vie_mam_federal`,
    `vie_mam_provincial`,
    `rqap_employe`,
    `assurance_emploi_employeur`,
    `sante_quebec`,
    `assurance_collective_employeur`,
    `rrq_employeur`,
    `fss_employeur`,
    `assurance_emploi_employe`,
    `rqap_employeur`
  )
VALUES
  (
    10,
    '2018-09-13',
    30,
    12.00,
    1,
    '2018-08-06 13:30:52',
    '2018-08-06 13:30:52',
    22.29,
    26.13,
    0.00,
    22.30,
    0.00,
    0.00,
    2.63,
    0.00,
    0.00,
    0.00,
    22.29,
    11.04,
    6.24,
    3.69
  );
INSERT INTO
  `paie` (
    `id`,
    `date_paie`,
    `heures_travailles`,
    `tarif_horaire`,
    `employe`,
    `created_at`,
    `updated_at`,
    `rrq_employe`,
    `impot_provincial`,
    `assurance_collective_employe`,
    `impot_federal`,
    `vie_mam_federal`,
    `vie_mam_provincial`,
    `rqap_employe`,
    `assurance_emploi_employeur`,
    `sante_quebec`,
    `assurance_collective_employeur`,
    `rrq_employeur`,
    `fss_employeur`,
    `assurance_emploi_employe`,
    `rqap_employeur`
  )
VALUES
  (
    9,
    '2018-08-13',
    30,
    12.00,
    1,
    '2018-08-06 13:24:44',
    '2018-08-06 13:24:44',
    22.29,
    26.13,
    0.00,
    22.30,
    0.00,
    0.00,
    2.63,
    0.00,
    0.00,
    0.00,
    22.29,
    11.04,
    6.24,
    3.69
  );
INSERT INTO
  `paie` (
    `id`,
    `date_paie`,
    `heures_travailles`,
    `tarif_horaire`,
    `employe`,
    `created_at`,
    `updated_at`,
    `rrq_employe`,
    `impot_provincial`,
    `assurance_collective_employe`,
    `impot_federal`,
    `vie_mam_federal`,
    `vie_mam_provincial`,
    `rqap_employe`,
    `assurance_emploi_employeur`,
    `sante_quebec`,
    `assurance_collective_employeur`,
    `rrq_employeur`,
    `fss_employeur`,
    `assurance_emploi_employe`,
    `rqap_employeur`
  )
VALUES
  (
    8,
    '2018-08-06',
    30,
    12.00,
    1,
    '2018-08-06 11:28:51',
    '2018-08-06 11:28:51',
    22.29,
    26.13,
    0.00,
    22.30,
    0.00,
    0.00,
    2.63,
    0.00,
    0.00,
    0.00,
    22.29,
    11.04,
    6.24,
    3.69
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: renouvellement
# ------------------------------------------------------------

INSERT INTO
  `renouvellement` (
    `id`,
    `membre`,
    `inscription`,
    `date_renouvellement`,
    `regulier`,
    `dons`,
    `commentaires`
  )
VALUES
  (1, 5, 1, '0000-00-00', 0, NULL, NULL);
INSERT INTO
  `renouvellement` (
    `id`,
    `membre`,
    `inscription`,
    `date_renouvellement`,
    `regulier`,
    `dons`,
    `commentaires`
  )
VALUES
  (2, 6, 1, '0000-00-00', 0, 6.00, NULL);
INSERT INTO
  `renouvellement` (
    `id`,
    `membre`,
    `inscription`,
    `date_renouvellement`,
    `regulier`,
    `dons`,
    `commentaires`
  )
VALUES
  (3, 9, 1, '2018-08-14', 0, 6.00, NULL);
INSERT INTO
  `renouvellement` (
    `id`,
    `membre`,
    `inscription`,
    `date_renouvellement`,
    `regulier`,
    `dons`,
    `commentaires`
  )
VALUES
  (4, 10, 1, '2018-08-14', 0, 6.00, NULL);
INSERT INTO
  `renouvellement` (
    `id`,
    `membre`,
    `inscription`,
    `date_renouvellement`,
    `regulier`,
    `dons`,
    `commentaires`
  )
VALUES
  (5, 11, 1, '2018-08-14', 0, 6.00, NULL);
INSERT INTO
  `renouvellement` (
    `id`,
    `membre`,
    `inscription`,
    `date_renouvellement`,
    `regulier`,
    `dons`,
    `commentaires`
  )
VALUES
  (6, 12, 1, '2018-08-14', 0, 6.00, NULL);
INSERT INTO
  `renouvellement` (
    `id`,
    `membre`,
    `inscription`,
    `date_renouvellement`,
    `regulier`,
    `dons`,
    `commentaires`
  )
VALUES
  (7, 13, 1, '2018-08-14', 0, 6.00, NULL);
INSERT INTO
  `renouvellement` (
    `id`,
    `membre`,
    `inscription`,
    `date_renouvellement`,
    `regulier`,
    `dons`,
    `commentaires`
  )
VALUES
  (8, 14, 1, '2018-08-14', 0, 6.00, NULL);
INSERT INTO
  `renouvellement` (
    `id`,
    `membre`,
    `inscription`,
    `date_renouvellement`,
    `regulier`,
    `dons`,
    `commentaires`
  )
VALUES
  (9, 15, 1, '2018-08-16', 0, 6.00, NULL);
INSERT INTO
  `renouvellement` (
    `id`,
    `membre`,
    `inscription`,
    `date_renouvellement`,
    `regulier`,
    `dons`,
    `commentaires`
  )
VALUES
  (10, 16, 1, '2018-08-15', 0, 6.00, 'Inscription');
INSERT INTO
  `renouvellement` (
    `id`,
    `membre`,
    `inscription`,
    `date_renouvellement`,
    `regulier`,
    `dons`,
    `commentaires`
  )
VALUES
  (12, 16, 0, '2018-08-16', 0, 6.00, 'Renouvellement');
INSERT INTO
  `renouvellement` (
    `id`,
    `membre`,
    `inscription`,
    `date_renouvellement`,
    `regulier`,
    `dons`,
    `commentaires`
  )
VALUES
  (19, 18, 1, '2018-08-15', 0, 3.00, NULL);
INSERT INTO
  `renouvellement` (
    `id`,
    `membre`,
    `inscription`,
    `date_renouvellement`,
    `regulier`,
    `dons`,
    `commentaires`
  )
VALUES
  (15, 17, 0, '2018-08-15', 0, 6.00, 'Test 2');
INSERT INTO
  `renouvellement` (
    `id`,
    `membre`,
    `inscription`,
    `date_renouvellement`,
    `regulier`,
    `dons`,
    `commentaires`
  )
VALUES
  (16, 17, 0, '2018-08-15', 0, 6.00, 'Test 3');
INSERT INTO
  `renouvellement` (
    `id`,
    `membre`,
    `inscription`,
    `date_renouvellement`,
    `regulier`,
    `dons`,
    `commentaires`
  )
VALUES
  (17, 17, 0, '2018-08-12', 0, 6.00, 'Test 4');
INSERT INTO
  `renouvellement` (
    `id`,
    `membre`,
    `inscription`,
    `date_renouvellement`,
    `regulier`,
    `dons`,
    `commentaires`
  )
VALUES
  (
    18,
    17,
    0,
    '2018-08-17',
    0,
    6.00,
    'Ceci est un très très très très long commentaire qui devrait dépasser les limites du tableau'
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
