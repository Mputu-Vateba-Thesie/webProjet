// Classe principale pour gérer le panier
class Panier {
    constructor() {
        // Chargement du panier depuis le localStorage ou initialisation vide
        this.items = JSON.parse(localStorage.getItem('panier')) || [];

        // Affichage initial du panier
        this.loadCart();

        // Mise à jour du compteur dans l'en-tête
        this.mettreAJourCompteur();
    }

    
    // Ajouter un produit au panier
    ajouter(produit) {
        // Cherche un produit identique (même nom + même prix + même image)
        const existant = this.items.find(item =>
            item.nom === produit.nom &&
            item.prix === produit.prix &&
            item.image === produit.image
        );

        if (existant) {
            // Si trouvé : augmente la quantité
            existant.quantite += 1;
        } else {
            // Sinon : on ajoute comme un nouvel article
            this.items.push({ ...produit, quantite: 1 });
        }

        this.sauvegarder();
        this.loadCart();
        this.mettreAJourCompteur();
    }

    // Supprimer un produit du panier par son id
    supprimer(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.sauvegarder();
        this.loadCart();
        this.mettreAJourCompteur();
    }

    // Vider complètement le panier
    vider() {
        this.items = [];
        this.sauvegarder();
        this.loadCart();
        this.mettreAJourCompteur();
    }

    // Calculer le total du panier
    getTotal() {
        return this.items.reduce((total, item) => total + (item.prix * item.quantite), 0);
    }

    // Sauvegarder le panier dans le localStorage
    sauvegarder() {
        localStorage.setItem('panier', JSON.stringify(this.items));
    }

    // Mettre à jour le compteur du panier dans l'en-tête
    mettreAJourCompteur() {
        const count = this.items.reduce((total, item) => total + item.quantite, 0);
        const compteur = document.getElementById('cart-count');
        if (compteur) compteur.textContent = count;
    }

    // Afficher le contenu du panier dans le tableau HTML
    loadCart() {
        const cartTable = document.getElementById('cart-table');
        const emptyCart = document.getElementById('empty-cart');
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        const cartActions = document.getElementById('cart-actions');

        // Si on n'est pas sur la page panier, on arrête là
        if (!cartItems) return;

        // Si le panier est vide
        if (this.items.length === 0) {
            if (cartTable) cartTable.classList.add('hidden');
            if (cartActions) cartActions.classList.add('hidden');
            if (emptyCart) emptyCart.classList.remove('hidden');
            return;
        }

        // Si le panier contient des éléments
        if (emptyCart) emptyCart.classList.add('hidden');
        if (cartTable) cartTable.classList.remove('hidden');
        if (cartActions) cartActions.classList.remove('hidden');

        // Vider le tableau avant de le remplir à nouveau
        cartItems.innerHTML = '';

        // Pour chaque produit du panier, on crée une ligne HTML
        this.items.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><img src="${item.image}" width="50"> ${item.nom}</td>
                <td>${item.prix.toFixed(2)} €</td>
                <td>${item.quantite}</td>
                <td>${(item.prix * item.quantite).toFixed(2)} €</td>
                <td><button class="btn btn-danger remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></button></td>
            `;
            cartItems.appendChild(tr);
        });

        // Afficher le total du panier
        if (cartTotal) cartTotal.textContent = this.getTotal().toFixed(2) + ' €';

        // Ajouter des écouteurs d'événements sur les boutons de suppression
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.closest('button').dataset.id);
                this.supprimer(id);
            });
        });

        // Gérer le bouton "Vider le panier"
        const clearBtn = document.getElementById('clear-cart');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.vider();
            });
        }
    }
}

// Création d'une instance globale du panier
const panier = new Panier();

// Dès que la page est chargée
document.addEventListener('DOMContentLoaded', () => {
    // Ajouter un produit au panier quand on clique sur un bouton "Ajouter au panier"
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            if (!card) return;

            // Récupérer les données du produit depuis la carte
            const produit = {
                id: parseInt(card.dataset.id || Date.now()),
                nom: card.querySelector('h3')?.textContent?.trim() || 'Produit inconnu',
                prix: parseFloat(
                    card.querySelector('.price')?.textContent
                        .replace(/[^\d.,]/g, '')
                        .replace(',', '.') || 0
                ),
                image: card.querySelector('img')?.src || ''
            };

            // Vérification avant l'ajout
            if (produit.nom && produit.prix) {
                panier.ajouter(produit);
                alert('Produit ajouté au panier !');
            } else {
                alert('Erreur : données du produit incomplètes.');
            }
        });
    });

    // Recharger le panier à l'ouverture de la page
    panier.loadCart();
});

document.getElementById("buy-now").addEventListener("click", function () {
    window.location.href = "commande.html";
});

