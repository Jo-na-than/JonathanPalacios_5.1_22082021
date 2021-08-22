main();

async function main() {
    localStorage.removeItem('cameras'); // Supprimer les article du localStorage
    tab_cameras = []; // Initialisation du tableau d'articles
    const cameras = await getCameras(); // Appel de la fonction qui retourne les articles de la base de données

    for (camera of cameras) { // Boucle sur tout les articles
        displayCamera(camera); // Appel de la fonction qui affiche les articles
        localstorage(camera,tab_cameras); // Ajout de l'article au tableau d'article du localStorage
    }

    localStorage.setItem('cameras', JSON.stringify(tab_cameras)); // Actualiser les articles du localStorage
}

function getCameras() { // Fonction qui retourne les articles de la base de données
    return fetch("http://localhost:3000/api/cameras") // Récupère la liste des articles
    .then(function(resultBody) { 
        return resultBody.json(); // Retourne le résultat de la promesse
    })
    .catch(function(error) {
        alert(error); // Affiche l'erreur
    })
}

function displayCamera(camera) { // Fonction qui affiche les articles
    let price = (camera.price/100).toFixed(2); // Passe le format de prix à xx,xx€
    //--- Intègre la carte de l'article avec ses données ---
    document.getElementById("card-display-shop").innerHTML += '<a href="template_product.html?'+camera._id+'" class="col-xs-12 col-md-6 col-lg-4 mt-4 card-camera"><div class="card shadow"><img class="card-img-top" src="'+camera.imageUrl+'" alt="Card image cap"><div class="card-body"><p class="card-title" id="cameraname">'+camera.name+'</p><p class="card-text">'+camera.description+'</p><p id="cameraprice">'+price+' €'+'</p></div></div></div></a>';
    //--- FIN Intègre la carte de l'article avec ses données ---
}

function localstorage(camera,tab_cameras){ // Fonction qui ajoute chaque article au localStorage
    //--- Creer un objet avec les infos de la camera ---
    infosCamera = {
        id: camera._id,
        name: camera.name,
        price: camera.price,
        image: camera.imageUrl,
        modeles: camera.lenses,
        description: camera.description
    };
    //--- FIN Creer un objet avec les infos de la camera ---
    tab_cameras.push(infosCamera); // Entrer cet objet dans le tableau
}
