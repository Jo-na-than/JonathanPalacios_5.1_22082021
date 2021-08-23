main();

async function main() {
    const id_product = await getId(); // Récupère l'id de l'article par l'url de la page
    let objetCamera; // Créé une variable qui va contenir l'article qui correspond à l'id de l'url
    objetCamera = await getCamera(id_product); // Appel de fonction qui va selectionner l'article qui correspond à l'id de l'url
    displayCamera(objetCamera); // Appel de la fonction qui affiche les informations de l'article
}

async function getCamera(id_product) { // Fonction qui selectionne l'article qui correspond à l'id de l'url
    let camera = await fetch(`http://localhost:3000/api/cameras/${id_product}`) // Récupère la liste des articles
    .then(function(resultBody) { 
        return resultBody.json(); // Retourne le résultat de la promesse
    })
    .catch(function(error) {
        alert(error); // Affiche l'erreur
    })
        objetCamera = {
        id: camera._id,
        name: camera.name,
        price: camera.price,
        image: camera.imageUrl,
        modeles: camera.lenses,
        description: camera.description
    };
    console.log();
    return objetCamera;
}

function displayCamera(objetCamera) { // Fonction qui affiche les informations de l'article
    document.getElementById("cameraimage").innerHTML += '<img class="card-img-top img-fluid" src="'+objetCamera.image+'" alt="Image du produit">'; // Intégre l'image de l'article
    document.getElementById("cameraname").innerHTML += objetCamera.name; // Intègre le nom de l'article
    let price = (objetCamera.price/100).toFixed(2); // Passe le format de prix à xx,xx€
    document.getElementById("cameraprice").innerHTML += price+'€'; // Intègre le prix de l'article
    document.getElementById("cameradescription").innerHTML += objetCamera.description; // Intègre la description de l'article
    modeles = objetCamera.modeles; // Stock les modèles du produit 
    for (modele of modeles){ // Lecture du tableau des modèles
        document.getElementById("inlineFormCustomSelect").innerHTML += '<option value="'+modele+'">'+modele+'</option>'; // Intègre les modèles de l'article
    }
}

function getId(){ // Fonction qui récupère l'id de l'article par l'url de la page
    const url_id_product = window.location.search; //Récupère l'id avec "?"
    const id_product = url_id_product.slice(1); //Supprime "?"
    return id_product; //Retourne l'id de la page
}


/*----------Ajouter au panier----------*/
function setLocalStorage(infosCamera) { // Fonction qui ajoute l'article au panier via localStorage
    let camera_localStorage = JSON.parse(localStorage.getItem("panier")); // Stock les articles du panier
    if(camera_localStorage){ // Test si il y a des articles au panier
        add_to_localStorage(infosCamera,camera_localStorage); // Appel de la fonction qui ajoute un article au panier
    }
    else{
        camera_localStorage = []; // Créer la case panier
        add_to_localStorage(infosCamera,camera_localStorage); // Appel de la fonction qui ajoute un article au panier
    }
}

function add_to_localStorage(infosCamera,camera_localStorage){ // Fonction qui ajoute un article au panier
    let flag = 0; // Initialisation du flag
    //si id et modele de infosCamera = id et modele d'un des objets de camera_localStorage alors quantité de cet objet += quantité infosCamera
    for (camera_in_local of camera_localStorage){ // Lecture du tableau du panier
        if(camera_in_local.id == infosCamera.id && camera_in_local.modele == infosCamera.modele){ // Test si l'article est déjà au panier en comparant l'id et le modèle
            let quantity_local = parseFloat(camera_in_local.quantity); // Stock le nombre quantité déjà dans le panier
            let quantity_choosed = parseFloat(infosCamera.quantity); // Stock le nombre quantité de la page
            quantity_local += quantity_choosed; // Addictionner quantité panier et page
            camera_in_local.quantity = quantity_local; // Passer la quantité en local à celle du panier
            flag = 1; // Activer le flag
        };
    }
    if(flag == 0){ // Test si l'article n'était pas déjà dans le panier avec id et modèle
        camera_localStorage.push(infosCamera); // Ajoute l'article au panier avec ses informations
    }
    localStorage.setItem("panier", JSON.stringify(camera_localStorage)); // Actualise le panier avec les nouvelles informations
}

let add_to_cart = document.querySelector("#button"); // Lier le bouton ajouter au panier à une variable
add_to_cart.addEventListener("click", async function() { // Ecouteur d'évènement au clic sur le bouton Ajouter au panier
    modele_selected = document.querySelector("#inlineFormCustomSelect").value; // Stock le modèle sélectionné
    quantity_selected = document.querySelector("#quantity").value; // Stock la quantité sélectionnée
    let camera_localStorage = JSON.parse(localStorage.getItem("cameras")); // Stock les articles du localStorage
    const id_product = await getId(); // Récupère l'id de l'article par l'url de la page
    const camera = await getCamera(id_product); // Créé une constante qui va contenir l'article qui correspond à l'id de l'url
    // --- Création de l'objet de l'article ---
    infosCamera = {
        id: camera.id,
        name: camera.name,
        price: camera.price,
        image: camera.image,
        description: camera.description,
        modele: modele_selected,
        quantity: quantity_selected
    // --- FIN Création de l'objet de l'article ---
    };
    setLocalStorage(infosCamera); // Appel la fonction qui ajoute l'article au panier via localStorage
});
/*----------FIN Ajouter au panier----------*/


