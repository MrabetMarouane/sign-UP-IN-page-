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


// Sign up function
const signUp = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
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

            // Construction de l'URL avec l'UID de l'utilisateur
            const url = `http://localhost:3000/users/${user.uid}`;

            // Envoi des données vers le serveur via une requête GET
            fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log('Réponse du serveur :', data);
                document.write("Vous êtes connecté(e)");
            })
            .catch(error => console.error('Erreur:', error));

            console.log(userCredential);
        })
        .catch((error) => {
            console.log(error.code);
            console.log(error.message);
            // Afficher le message d'erreur
            errorMessage.innerText = "Adresse e-mail ou mot de passe invalide";
        });
}


// // Sign in function
// const signIn = () => {
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;
//     const errorMessage = document.getElementById("error-message");

//     // Authentification avec Firebase
//     firebase.auth().signInWithEmailAndPassword(email, password)
//         .then((userCredential) => {
//             // Récupération de l'utilisateur connecté
//             const user = userCredential.user;
//             console.log(`User's UID : ${user.uid}`);
//             console.log(`User's e-mail : ${user.email}`);

//             // Construction des données utilisateur à envoyer au serveur
//             const userData = {
//                 UID: user.uid,
//                 email: user.email
//             };

//             // Envoi des données vers le serveur via une requête POST
//             fetch('http://localhost:3000/post/users', { 
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(userData)
//             })
//             .then(response => response.json())
//             .then(data => {
//                 console.log('Réponse du serveur :', data);
//                 document.write("Vous êtes connecté(e)");
//             })
//             .catch(error => console.error('Erreur:', error));

//             console.log(userCredential);
//         })
//         .catch((error) => {
//             console.log(error.code);
//             console.log(error.message);
//             // Afficher le message d'erreur
//             errorMessage.innerText = "Adresse e-mail ou mot de passe invalide";
//         });
// }







// // Sign In function
// const signIn = () => {
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;
//     const errorMessage = document.getElementById("error-message");

//     // firebase code
//     firebase.auth().signInWithEmailAndPassword(email, password)
//         .then((userCredential) => {
//             // Signed in 
//             const user = userCredential.user;
//             console.log(`User's UID : ${user.uid}`);
//             console.log(`User's e-mail : ${user.email}`);

//             // Envoi des données vers le serveur
//             const formData = new FormData();
//             formData.append('UID', user.uid);
//             formData.append('email', user.email);
//             console.log(formData);

            

//             fetch('http://localhost:3000/users', { 
//                 method: 'POST',
//                 body: formData,
//             })
//             .then(response => response.json())
//             .then(data => console.log(data))
//             .catch(error => console.error('Error:', error));

//             document.write("Vous êtes connecté(e)")
//             console.log(userCredential)
//         })
//         .catch((error) => {
//             console.log(error.code);
//             console.log(error.message)
//             // Afficher le message d'erreur
//             errorMessage.innerText = "Invalid email or password";
//         });
// }





// // Sign In function
// const signIn = () => {
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;
//     const errorMessage = document.getElementById("error-message"); // Récupérer l'élément du message d'erreur

//     // firebase code
//     firebase.auth().signInWithEmailAndPassword(email, password)
//         .then((userCredential) => {
//             // Signed in 
//             const user = userCredential.user;
//             console.log(`User's UID : ${user.uid}`);
//             console.log(`User's e-mail : ${user.email}`);

//             // Envoi de l'UID vers l'API
//             const formData = new FormData();
//             formData.append('UID', user.uid);
//             formData.append('email', user.email);

//             fetch('http://localhost:3000/users', {
//                 method: 'POST',
//                 body: formData,
//             })
//             .then(response => response.json())
//             .then(data => console.log(data))
//             .catch(error => console.error('Error:', error));

//             // Envoi de l'UID et de l'e-mail vers une autre URL
//             const url = 'http://localhost:3000/users';
//             const formData2 = new FormData();
//             formData2.append('UID', user.uid);
//             formData2.append('gmail', user.email);

//             fetch(url, {
//                 method: 'POST',
//                 body: formData2,
//             })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Erreur lors de la requête');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 console.log('Réponse du serveur :', data);
//             })
//             .catch(error => {
//                 console.error('Erreur :', error);
//             });

//             document.write("Vous êtes connecté(e)")
//             console.log(userCredential)
//         })
//         .catch((error) => {
//             console.log(error.code);
//             console.log(error.message)
//             // Afficher le message d'erreur
//             errorMessage.innerText = "Invalid email or password";
//         });
// }
        












// // // configuration de notre base de données avec le site web
// // const firebaseConfig = {
// //     apiKey: "AIzaSyAo9d7pb7sf3PuSWDWYtSrdMEx9mjUfAVg",
// //     authDomain: "rechargehub-94a85.firebaseapp.com",
// //     databaseURL: "https://rechargehub-94a85-default-rtdb.europe-west1.firebasedatabase.app",
// //     projectId: "rechargehub-94a85",
// //     storageBucket: "rechargehub-94a85.appspot.com",
// //     messagingSenderId: "540530082373",
// //     appId: "1:540530082373:web:e77f9e3cf80b88d136192c",
// //     measurementId: "G-25WBJEQWFR"
// // };
// // const firebaseApp = firebase.initializeApp(firebaseConfig);

// // const db = firebaseApp.firestore();
// // const auth = firebaseApp.auth();

// // // Sign up function
// // const signUp = () => {
// //     const email = document.getElementById("email").value;
// //     const password = document.getElementById("password").value;
// //     console.log(email, password)
// //     // firebase code
// //     firebase.auth().createUserWithEmailAndPassword(email, password)
// //         .then((result) => {
// //             // Signed in 
// //             document.write("votre compte a été crée ")
// //             console.log(result)
// //             // ...
// //         })
// //         .catch((error) => {
// //             console.log(error.code);
// //             console.log(error.message)
// //             // ..
// //         });
// // }

// // // Sign In function
// // const signIn = () => {
// //     const email = document.getElementById("email").value;
// //     const password = document.getElementById("password").value;
// //     const errorMessage = document.getElementById("error-message"); // Récupérer l'élément du message d'erreur

// //     // firebase code
// //     firebase.auth().signInWithEmailAndPassword(email, password)
// //         .then((userCredential) => {
// //             // Signed in 
// //             const user = userCredential.user;
// //             console.log(`User's UID : ${user.uid}`);
// //             console.log(`User's e-mail : ${user.email}`);

// //             // Envoi de l'UID vers l'API
// //             const formData = new FormData();
// //             formData.append('UID', user.uid);
// //             formData.append('email', user.email);

// //             fetch('http://localhost:3000/users', {
// //                 method: 'POST',
// //                 body: formData,
// //             })
// //             .then(response => response.json())
// //             .then(data => console.log(data))
// //             .catch(error => console.error('Error:', error));

// //             // Envoi de l'UID et de l'e-mail vers une autre URL
// //             const url = 'http://localhost:3000/users';
// //             const formData2 = new FormData();
// //             formData2.append('UID', user.uid);
// //             formData2.append('gmail', user.email);

// //             fetch(url, {
// //                 method: 'POST',
// //                 body: formData2,
// //             })
// //             .then(response => {
// //                 if (!response.ok) {
// //                     throw new Error('Erreur lors de la requête');
// //                 }
// //                 return response.json();
// //             })
// //             .then(data => {
// //                 console.log('Réponse du serveur :', data);
// //             })
// //             .catch(error => {
// //                 console.error('Erreur :', error);
// //             });

// //             document.write("Vous êtes connecté(e)")
// //             console.log(userCredential)
// //         })
// //         .catch((error) => {
// //             console.log(error.code);
// //             console.log(error.message)
// //             // Afficher le message d'erreur
// //             errorMessage.innerText = "Invalid email or password";
// //         });
// // }




// // configuration de notre base de données avec le site web
// const firebaseConfig = {
//     apiKey: "AIzaSyAo9d7pb7sf3PuSWDWYtSrdMEx9mjUfAVg",
//     authDomain: "rechargehub-94a85.firebaseapp.com",
//     databaseURL: "https://rechargehub-94a85-default-rtdb.europe-west1.firebasedatabase.app",
//     projectId: "rechargehub-94a85",
//     storageBucket: "rechargehub-94a85.appspot.com",
//     messagingSenderId: "540530082373",
//     appId: "1:540530082373:web:e77f9e3cf80b88d136192c",
//     measurementId: "G-25WBJEQWFR"
// };
// const firebaseApp = firebase.initializeApp(firebaseConfig);

// const db = firebaseApp.firestore();
// const auth = firebaseApp.auth();




// // Sign up function
// const signUp = () => {
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;
//     console.log(email, password)
//     // firebase code
//     firebase.auth().createUserWithEmailAndPassword(email, password)
//         .then((result) => {
//             // Signed in 
//             document.write("votre compte a été crée ")
//             console.log(result)
//             // ...
//         })
//         .catch((error) => {
//             console.log(error.code);
//             console.log(error.message)
//             // ..
//         });
// }




// // Sign In function
// const signIn = () => {
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;
//     const errorMessage = document.getElementById("error-message"); // Récupérer l'élément du message d'erreur

//     // firebase code
//     firebase.auth().signInWithEmailAndPassword(email, password)
//         .then((userCredential) => {
//             // Signed in 
//             const user = userCredential.user;
//             console.log(`User logged in : ${user.uid}`);
//             console.log(`User logged in : ${user.email}`);

//             // Envoi de l'UID vers l'API
//             var formdata = new URLSearchParams();
//             formdata.append(user.uid,user.email)
//             console.log(formdata);

//             const formData = new FormData();
//             formData.append('UID', user.uid);
//             formData.append('email', user.email);
//             formData.append('credit', user.credit);

//             fetch('http://192.168.5.172:3000/users', {
//                 method: 'POST',
//                 body: formData,
//             })
//             .then(response => response.json())
//             .then(data => console.log(data))
//             .catch(error => console.error('Error:', error));


//             // fetch('http://192.168.5.172:3000/users', {
//             //     method: 'POST',
//             //     body: JSON.stringify({ formdata}),
//             //     headers: {
//             //         'Content-Type': 'application/json'
//             //     }
//             // })
//             //     .then(response => response.json())
//             //     .then(data => console.log(data))
//             //     .catch(error => console.error('Error:', error));

//             document.write("Vous êtes connecté(e)")
//             console.log(userCredential)
//         })
//         .catch((error) => {
//             console.log(error.code);
//             console.log(error.message)
//             // Afficher le message d'erreur
//             errorMessage.innerText = "Invalid email or password";
//         });
// }
