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


app.post('/users', (req, res) => {
    let credit = 5;
    const { UID, email } = req.body;
    const query = 'INSERT INTO users (UID, email, credit) VALUES (?, ?, ?)';
    connection.query(query, [UID, email, credit], (err, result) => {
        if (err) throw err;
        res.send({ message: "Ajout avec succès", data: result });
        console.log(credit)
    });

});

// Route pour récupérer le crédit en fonction de l'UID
app.patch('/users/:UID', (req, res) => {
    const { UID, credit } = req.body;
    const query = 'SELECT UID FROM users WHERE UID = ?';
    connection.query(query, [UID], (err, rows) => {
        if (err) {
            console.error('Error checking existing UID:', err);
            return;
        }
        if (rows.length > 0) {
            const updateQuery = 'UPDATE users SET credit = ? WHERE UID = ?';
            connection.query(updateQuery, [credit, UID], (err, result) => { 
                if (err) {
                    console.error('Erreur lors de la mise à jour:', err);
                    return;
                }
                console.log({ message: "Mise à jour avec succès", data: result });
                res.send({ message: "Mise à jour avec succès", data: result });
            });
        } else {
            console.log("Utilisateur non trouvé");
            res.status(404).send({ message: "Utilisateur non trouvé" });
        }
    });
});


app.listen(port, () => {
    console.log("Serveur en écoute sur le port", port);
});







