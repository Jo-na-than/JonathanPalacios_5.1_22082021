main();

function main() {
    let orderId = JSON.parse(localStorage.getItem("order")); // Stock l'id de la commande
    if(!orderId){ // Si l'id de commande n'existe pas
        window.location.href = "panier.html"; // Redirection page panier
    }
    else{ // Si id de commande existe
        displayOrder(orderId); // Appel de la fonction qui affiche la commande
        deleteCart(); // Appel de la fonction qui supprime les articles du panier
    }
}

function displayOrder(orderId) { // Fonction qui affiche la commande
    let totalPrice = (getTotalPrice()/100).toFixed(2); // Passe le format de prix à xx,xx€
    if(orderId){ // Si l'id de commande existe
        // --- Affiche un message de remerciements, le total de la commande et l'id de commande ---
        document.getElementById("id_order").innerHTML += "<h1>Merci d'avoir passé commande sur Orinoco !</h1><br><p>Votre numéro de commande est le <span id='cameraname'>"+orderId+"</span></p>";
        document.getElementById("total").innerHTML += "<p>Total de la commande : <span id='cameraname'>"+totalPrice+"€</span></p>";
        document.getElementById("buton_to_cart").innerHTML += "<a href='index.html' class='btn btn-primary button'>Retour à la boutique</a>";
        // --- FIN Affiche un message de remerciements, le total de la commande et l'id de commande ---
    }
    localStorage.removeItem("order"); // Supprime la commande passée du localStorage
}

function getTotalPrice() { // Fonction qui addictionne le coût total de la commande
    let panier = JSON.parse(localStorage.getItem("panier")); // Stock les article du panier
    let totalPanier = 0; // Initialise le total à 0
    for (camera of panier) { // Lire le tableau des articles du panier
        let quantity = parseFloat(camera.quantity); // Stock la quantité de l'article 
        let price = parseFloat(camera.price); // Stock le prix de l'article
        totalPanier += quantity * price; // Calcul le total du panier
    }
    return totalPanier; // Retourne le total du panier
}

function deleteCart() { // Fonction qui supprime les articles du panier
    localStorage.removeItem("panier"); // Supprime les articles du panier
}