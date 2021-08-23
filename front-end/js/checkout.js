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