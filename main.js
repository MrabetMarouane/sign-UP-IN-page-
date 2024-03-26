
// configuration de notre base de données avec le site web
const firebaseConfig = {
    apiKey: "AIzaSyAo9d7pb7sf3PuSWDWYtSrdMEx9mjUfAVg",
    authDomain: "rechargehub-94a85.firebaseapp.com",
    databaseURL: "https://rechargehub-94a85-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "rechargehub-94a85",
    storageBucket: "rechargehub-94a85.appspot.com",
    messagingSenderId: "540530082373",
    appId: "1:540530082373:web:e77f9e3cf80b88d136192c",
    measurementId: "G-25WBJEQWFR"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();


// l'ajout d'un utilisater function 
const signUp = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const credit = document.getElementById("credit").value;

    console.log(email, password)
    // firebase code
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            // Signed in 
            document.write("votre compte a été crée ")
            console.log(result)
            
        })
        .catch((error) => {
            console.log(error.code);
            console.log(error.message)
            
        });

}



// Connexion function
// Sign in function
const signIn = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    // Authentification avec Firebase
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Récupération de l'utilisateur connecté
            const user = userCredential.user;
            console.log(`User's UID : ${user.uid}`);
            console.log(`User's e-mail : ${user.email}`);
                      
            var formData = new URLSearchParams();

            formData.append('UID', user.uid);
            formData.append('email', user.email);

            console.log(formData)

            fetch('http://localhost:3000/users', {
                method: 'POST',
                body: JSON.stringify(Object.fromEntries(formData)),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error('Error:', error));;
            
        })
        .catch((error) => {
            console.log(error.code);
            console.log(error.message);
            // Afficher le message d'erreur
            errorMessage.innerText = "Adresse e-mail ou mot de passe invalide";
        });
}



