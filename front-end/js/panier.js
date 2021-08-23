main();

async function main() {
    displayCardProduct(); // Appel de la fonction qui affiche les articles du panier
}

function displayCardProduct() { // Fonction qui affiche les articles du panier
    let cart_products = JSON.parse(localStorage.getItem("panier")); // Stock le contenu du panier
    if(!cart_products || cart_products.length == 0){ // Si le panier est vide
        displayEmptyCart(); // Appel de la fonction qui affiche le message d'erreur 
    }
    else{ // Si le panier n'est pas vide
        deleteAndTotalCartProducts(cart_products); // Appel de la fonction qui affiche le total du panier permet de supprimer le contenu du panier
        displayCartProducts(cart_products); // Appel de la fonction qui affiche les articles du panier
        displayForm(); // Appel de la fonction qui affiche le formulaire de commande
    }
}

function add_orderId_to_localstorage(order_Id) { // Fonction qui ajoute au localStorage l'id de commande
    localStorage.setItem("order", JSON.stringify(order_Id)); // Ajoute au localStorage l'id de commande
}

function displayForm() { // Fonction qui affiche le formulaire de commande
    // --- Formulaire de commande ---
    document.getElementById("template_cameras_card").innerHTML +="<div class='container my-5'> <p class='title'>Veuillez renseigner vos informations personnelles</p><p class='precisions'>Les champs marqués d'un astérisque (*) sont obligatoires.</p><form method='POST' class='col-12'><div class='form-row'><div class='form-group col-12 col-sm-6 col-lg-5'><label for='firstName'>Prénom*</label> <input id='firstName' name='firstName' placeholder='Votre prénom...' type='text' required='required' class='form-control'></div><div class='form-group col-12 col-sm-6 col-lg-5'><label for='lastName'>Nom*</label> <input id='lastName' name='lastName' placeholder='Votre nom...' type='text' class='form-control' required='required'></div></div><div class='form-row'><div class='form-group col-12 col-lg-6'><label for='address'>Adresse*</label> <input id='address' name='address' placeholder='Votre adresse...' type='text' class='form-control' required='required'></div><div class='form-group col-12 col-sm-6 col-lg-4'><label for='city'>Ville*</label> <input id='city' name='city' placeholder='Votre ville...' type='text' class='form-control' required='required'></div></div><div class='form-row'><div class='form-group col-12 col-lg-10'><label for='email'>Email*</label> <input id='email' name='email' placeholder='Votre email...' type='text' class='form-control' required='required'></div> </div><div class='form-group'><a name='submit' type='submit' class='btn btn-primary send_checkout'>Valider la commande</a></div></form></div>";
    // --- FIN Formulaire de commande ---
}

function displayEmptyCart() { // Fonction qui affiche le message de panier vide
    // --- Panier vide et lien retour boutique ---
    document.getElementById("template_cameras_card").innerHTML +="<div class='container pl-3 mb-4 mt-5 title'><p>Votre panier est vide !</p><a href='index.html' class='btn btn-primary button'>Retour à la boutique</a></div>";
    // --- FIN Panier vide et lien retour boutique ---
}

function displayCartProducts(cart_products) {// Fonction qui affiche les articles du panier
    for (cart_product of cart_products){ // Lecture du talbeau du panier
        let price = (cart_product.price/100).toFixed(2); // Passe le format de prix à xx,xx€
        // --- Cartes des articles avec boutons supprimer ---
        document.getElementById("template_cameras_card").innerHTML += '<div class="row shadow my-5"><div class="col-12 col-md-5 col-lg-4 px-0" id="cameraimage"><a href="template_product.html?'+cart_product.id+'"><img class="card-img-top img-fluid" src="'+cart_product.image+'" alt="Image du produit"></a></div><div class="col-8 col-md-4 pl-3 mt-2"><a href="template_product.html?'+cart_product.id+'" id="cameraname">'+cart_product.name+'</a><p class="mt-2" id="cameraprice">'+price+' €</p><p id="cameramodele">Lentille : '+cart_product.modele+'</p><p id="cameraquantity">Quantité : '+cart_product.quantity+'</p></div><div class="col-4 col-md-3 col-lg-4"><div class="centered"><button href="#" id="'+cart_product.id+'&'+cart_product.modele+'" name="button" type="button" class="row btn btn-primary button">Supprimer</button></div></div></div>';
        // --- FIN Cartes des articles avec boutons supprimer ---
    }
}

function deleteAndTotalCartProducts(cart_products) { // Fonction qui affiche le total du panier permet de supprimer le contenu du panier
    let totalCartPrice = 0; // Initialisation du total du panier à 0
    for (camera of cart_products) { // Lecture du tableau d'articles du panier
        let quantity = parseFloat(camera.quantity); // Stock la quantité de l'article
        let price = parseFloat(camera.price); // Stock le prix de l'article
        totalCartPrice += quantity * price; // Calcul le total du panier
    }
    // --- Total du panier et bouton supprimer le panier ---
    document.getElementById("template_cameras_card").innerHTML += "<div class='container my-5'><div class='row'><div class='col-6'><p class='title'>Total du panier : "+(totalCartPrice/100).toFixed(2)+"€</p></div><div class='col-6'><button id='deletecartProducts' class='btn btn-primary'>Vider le panier</button></div></div></div>";
    // --- FIN Total du panier et bouton supprimer le panier ---
}

function regexNomPrenomVille(data,input) { // Fontion qui restreint l'entré des champs nom, prenom et ville
    if(/^[a-zA-ZÀ-ú\-\s]{3,20}$/.test(data)) { // Regex nom prenom ville
        goodContent(input); // Appel de la fonction qui détermine la couleur du champs si il est bon
        return true; // Retourne true
    }
    else { // Regex non respecté
        wrongContent(input); // Appel de la fonction qui détermine la couleur du champs si il n'est pas bon
        return false; // Retourne false
    }
}
function regexAdresse(data,input) { // Fontion qui restreint l'entré du champs adresse
    if(/^[a-zA-ZÀ-ú0-9\-\s\']{7,50}$/.test(data)) { // Regex adresse postale
        goodContent(input); // Appel de la fonction qui détermine la couleur du champs si il est bon
        return true; // Retourne true
    }
    else {
        wrongContent(input); // Appel de la fonction qui détermine la couleur du champs si il n'est pas bon
        return false; // Retourne false
    }
}
function regexMail(data,input) { // Fontion qui restreint l'entré du champs email
    if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data)) { // Regex email
        goodContent(input); // Appel de la fonction qui détermine la couleur du champs si il est bon
        return true; // Retourne true
    }
    else {
        wrongContent(input); // Appel de la fonction qui détermine la couleur du champs si il n'est pas bon
        return false; // Retourne false
    }
}

function goodContent(input) { // Fonction qui détermine la couleur du champs si il est bon
    document.querySelector("#"+input).style.backgroundColor = '#FFFFFF'; // Détermine la couleur du champs si il est bon
}

function wrongContent(input) { // Fonction qui détermine la couleur du champs si il n'est pas bon
    document.querySelector("#"+input).style.backgroundColor = '#ffcccc'; // Détermine la couleur du champs si il n'est pas bon
}


let send_checkout = document.querySelector(".send_checkout"); // Lier le bouton valider la commande à une variable
send_checkout.addEventListener("click", async function() { // Ecouteur d'évènement au clic sur le bouton Valider la commande

    let firstname_form_value = document.querySelector("#firstName").value; // Stock la valeur rentré dans prenoim
    let firstname_form = document.querySelector("#firstName").id; // Stock l'imput prenom
    let regexFirstname = regexNomPrenomVille(firstname_form_value,firstname_form); // Stock true ou false selon si le regex est respecté + change la couleur de l'imput

    let lastName_form_value = document.querySelector("#lastName").value; // Stock la valeur rentré dans nom
    let lastName_form = document.querySelector("#lastName").id; // Stock l'imput nom
    let regexName = regexNomPrenomVille(lastName_form_value,lastName_form); // Stock true ou false selon si le regex est respecté + change la couleur de l'imput

    let address_form_value = document.querySelector("#address").value; // Stock la valeur rentré dans adresse
    let address_form = document.querySelector("#address").id; // Stock l'imput adresse
    let regexAdress = regexAdresse(address_form_value,address_form); // Stock true ou false selon si le regex est respecté + change la couleur de l'imput

    let city_form_value = document.querySelector("#city").value; // Stock la valeur rentré dans ville
    let city_form = document.querySelector("#city").id; // Stock l'imput ville
    let regexCity = regexNomPrenomVille(city_form_value,city_form); // Stock true ou false selon si le regex est respecté + change la couleur de l'imput

    let email_form_value = document.querySelector("#email").value; // Stock la valeur rentré dans email
    let email_form = document.querySelector("#email").id; // Stock l'imput email
    let regexEmail = regexMail(email_form_value,email_form); // Stock true ou false selon si le regex est respecté + change la couleur de l'imput

    let products = []; // Initialise un tableau des articles
    let cart_products = JSON.parse(localStorage.getItem("panier")); // Récupère les articles du panier
        






    })
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    