const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Connexion à la base de données
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'ciel',
    password: 'ciel',
    database: 'projetRechargeTarif'
});

connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err.stack);
        return;
    }
    
    console.log('Connexion à la base de données réussie');
});

// Route pour récupérer le crédit en fonction de l'UID
app.get('/users/:UID', (req, res) => {
    const UID = req.params.UID;
    const query = 'SELECT credit FROM users WHERE UID = ?';
    connection.query(query, [UID], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération du crédit:', err);
            res.status(500).json({ error: 'Erreur lors de la récupération du crédit' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: 'Aucun utilisateur trouvé avec cet UID' });
            return;
        }
        const credit = results[0].credit;
        res.status(200).json({ credit: credit });
    });
});

// Route pour insérer un nouvel utilisateur avec UID
app.post('/post/users', (req, res) => { 
    const { UID } = req.body;
    const query = 'INSERT INTO users (UID) VALUES (?)';
    connection.query(query, [UID], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion des données:', err);
            res.status(500).send({ error: 'Erreur lors de l\'insertion des données' });
            return;
        }
        console.log('Données insérées avec succès');
        res.status(200).send({ message: 'Données insérées avec succès' });
    });
});

app.listen(port, () => {
    console.log("Serveur en écoute sur le port", port);
});






// const express = require('express');
// const mysql = require('mysql2'); // Création d'une connexion à la base de données
// const path = require('path');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const mqtt = require('mqtt');

// const app = express();
// const port = 3000;

// // Middleware pour lire le JSON du corps des requêtes
// app.use(bodyParser.json());
// app.use(cors());

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*'); // Autorise les requêtes de tous les domaines
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//         return res.status(200).json({});
//     }
//     next();
// });

// const connection = mysql.createConnection({
//     host: 'localhost', // Adresse du serveur MySQL
//     user: 'ciel', // Nom d'utilisateur
//     password: 'ciel', // Mot de passe
//     database: 'projetRechargeTarif', // Nom de la base de données
// });
// /*-------------------------------------------------------client----------------------------------------------------------------------------------------------------------------*/
// // Connexion à la base de données
// connection.connect((err) => {
//     if (err) {
//         console.error('Erreur de connexion à la base de données:', err.stack);
//         return;
//     }
    
//     // Exécution de la requête pour lire tous les enregistrements de la table 'users'
//     connection.query('SELECT * FROM users', (error, results, fields) => {
//         if (error) {
//             console.error('Erreur lors de la lecture de la table:', error.stack);
//             return;
//         }
//         // Affichage des résultats
//         results.forEach(row => {
//             console.log(`UID : ${row.UID}`);
//         });
//     });
    
// });


// // Route pour recevoir l'UID via la méthode GET
// app.get('/users/:UID', (req, res) => {
//     const UID = req.params.UID; // Récupération de l'UID depuis l'URL
//     // Ici, vous pouvez utiliser l'UID comme nécessaire dans votre API
//     console.log('UID reçu:', UID);
//     res.status(200).send({ message: 'UID reçu avec succès' });
// });



// // app.get('/users', (req, res) => {
// //     let sql = 'SELECT * FROM users';
// //     if (req.query.ID) {
// //         sql += ` WHERE ID=${req.query.ID} LIMIT 1`;
// //     }
// //     connection.query(sql, (err, results) => {
// //         if (err) throw err;
// //         res.send(results);
// //     });
// // });


// app.post('/post/users', (req, res) => { 
//     const { UID} = req.body;
//     const requete = 'INSERT INTO users (UID) VALUES (?)';
//     connection.query(requete, [UID], (err, result) => {
//         if (err) {
//             console.error('Erreur lors de l\'insertion des données:', err);
//             res.status(500).send({ error: 'Erreur lors de l\'insertion des données' });
//             return;
//         }
//         console.log('Données insérées avec succès');
//         res.status(200).send({ message: 'Données insérées avec succès' });
//     });
// });


// app.listen(port,()=> {

//     console.log("serveur en écoute sur 192.168.5.123:3000")
    
//     });








// // /*-------------------------------------------------------prise----------------------------------------------------------------------------------------------------------------*/
// // // Connexion à la base de données
// // connection.connect((err) => {
// //     if (err) {
// //         console.error('Erreur de connexion à la base de données:', err.stack);
// //         return;
// //     }
// //     // Exécution de la requête pour lire tous les enregistrements de la table 'users'
// //     connection.query('SELECT * FROM prise', (error, results, fields) => {
// //         if (error) {
// //         console.error('Erreur lors de la lecture de la table:', error.stack);
// //         return;
// //         }
// //     // Affichage des résultats
// //     results.forEach(row => {
// //         console.log(`nomPrise : ${row.nomPrise}, id : ${row.id}, etat : ${row.etat}, consommation : ${row.consommation }`);
// //         });
// //     });
// //     // Fermeture de la connexion
// //     // connection.end();
// // });

// // // // Toutes les autres requêtes redirigées vers le fichier HTML
// // // app.get('/prise', (req, res) => {
// // //     res.sendFile(path.join(__dirname, 'public', 'p1.html'));
// // // });

// // app.get('/prise', (req, res) => {
// //     let sql = 'SELECT * FROM prise';
// //     if(req.query.ID) {
// //     sql += ` WHERE ID=${req.query.ID} LIMIT 1`;
// //     }
// //     connection.query(sql, (err, results) => {
// //     if(err) throw err;
// //     res.send(results);
// //     });
// // });




// // //mqtt
// // // const topic = 'shellyplusplugs-e465b8b82e18';
// // const server = 'mqtt://192.168.5.172:1883';
// // // const server = 'broker.hivemq.com:1883';


// // const options = {
// //     client_id: "shellyplusplugs-e465b8b82e18",
// //     user: "xinshen",
// //     ssl_ca: null,
// // };

// // const client = mqtt.connect(server, options);

// // client.on('connect', () => {
// //     console.log('Connected to MQTT broker');
// //     client.subscribe('#', { qos: 0 });
// // });


// // let id,etat,consommation,energie_total;

// // client.on('message', (topic, message) => {
// //     // console.log('message');
// //     // console.log(`${topic} ${message.toString()}`);
// //     // console.log(`${message.toString()}`);

// //     const id = topic.split('/')[0]; // 将字符串根据 '/' 进行分割，并取第一个部分作为设备 ID
// //     console.log(id);

// //     if(topic == `${id}/status/switch:0`){
// //         let data = JSON.parse(message.toString());

// //         etat = data.output;
// //         consommation = data.apower;
// //         energie_total = data.aenergy.total;

// //         console.log(`état ${id} : ${etat}`);
// //         console.log(`consommation ${id} : ${consommation}`);
// //         console.log(`Total energie ${id} : ${energie_total}`);
// //     }

// //     // if(topic == `${id}/events/rpc`){
// //     //     let data = JSON.parse(message.toString());
// //     //     console.log(data)
// //     //     // etat = data.output;
// //     //     // consommation = data.apower;
// //     //     // energie_total = data.aenergy.total;

// //     //     // console.log(`état ${id} : ${etat}`);
// //     //     // console.log(`consommation ${id} : ${consommation}`);
// //     //     // console.log(`Total energie ${id} : ${energie_total}`);
// //     // }


// //     // 在此处执行与数据库相关的操作
// //     information_db(id, etat, consommation);

// // });

// // // 执行与数据库相关的操作
// // function information_db(id, etat, consommation) {
// //     // 在插入操作之前检查数据库中是否已经存在相同的 id 值
// //     connection.query('SELECT id FROM prise WHERE id = ?', [id], (err, rows) => {
// //         if (err) {
// //             console.error('Error checking existing id:', err);
// //             return;
// //         }

// //         // 如果存在相同的 id 值，则更新现有行；否则，执行插入操作
// //         if (rows.length > 0) {
// //             // 执行更新操作
// //             const requete = 'UPDATE prise SET etat = ?, consommation = ? WHERE id = ?';
// //             connection.query(requete, [etat, consommation, id], (err, result) => {
// //                 if (err) {
// //                     console.error('Erreur lors de la mise à jour:', err);
// //                     return;
// //                 }
// //                 console.log({ message: "Mise à jour avec succès", data: result });
// //             });
// //         } else {
// //             // 执行插入操作
// //             const nomPrise = 'prise0';
// //             const requete = 'INSERT INTO prise (nomPrise ,id, etat, consommation) VALUES(?,?,?,?)';
// //             connection.query(requete, [nomPrise ,id, etat, consommation], (err, result) => {
// //                 if (err) throw err;
// //                 console.log({ message: "Ajout avec succès", data: result });
// //             });
// //         }
// //     });
// // }

// // client.on('error', (err) => {
// //     console.error('Connection error:', err);
// //     client.end();
// // });

