// storage.js — Responsable : Membre 1
// Toutes les pages lisent et écrivent les données uniquement avec ces fonctions.

const CATEGORIES = ['Mode', 'Électronique', 'Beauté', 'Maison', 'Alimentation'];

// Copie les fichiers JSON dans localStorage, seulement au tout premier lancement
async function initDonnees() {
  if (localStorage.getItem('produits')) return; // déjà fait
  for (const nom of ['produits', 'boutiques', 'utilisateurs']) {
    const reponse = await fetch(`data/${nom}.json`);
    ecrire(nom, await reponse.json());
  }
  ecrire('commandes', []);
  ecrire('panier', []);
}

// Lit une liste (renvoie une liste vide si elle n'existe pas)
function lire(cle) {
  return JSON.parse(localStorage.getItem(cle)) || [];
}

// Enregistre une valeur
function ecrire(cle, valeur) {
  localStorage.setItem(cle, JSON.stringify(valeur));
}

// Crée un identifiant unique : genererId('p') -> 'pm3k9x2a417'
function genererId(prefixe) {
  return prefixe + Date.now().toString(36) + Math.floor(Math.random() * 1000);
}

// Raccourcis pour retrouver un élément par son id
function getProduit(id) { return lire('produits').find(p => p.id === id); }
function getBoutique(id) { return lire('boutiques').find(b => b.id === id); }

// Prix à payer : le prix promo s'il existe, sinon le prix normal
function prixActuel(produit) {
  return produit.prixPromo || produit.prix;
}

// Lit un paramètre de l'adresse : produit.html?id=p3 -> lireParametre('id') vaut 'p3'
function lireParametre(nom) {
  return new URLSearchParams(window.location.search).get(nom);
}

// ----- Session -----
function getUtilisateurConnecte() {
  const session = JSON.parse(localStorage.getItem('session'));
  if (!session) return null;
  return lire('utilisateurs').find(u => u.id === session.utilisateurId) || null;
}
function setUtilisateurConnecte(id) { ecrire('session', { utilisateurId: id }); }
function deconnecter() { localStorage.removeItem('session'); }

// ----- Panier -----
function getPanier() { return lire('panier'); }

function ajouterAuPanier(produitId, quantite = 1) {
  const panier = getPanier();
  const ligne = panier.find(l => l.produitId === produitId);
  if (ligne) ligne.quantite += quantite;
  else panier.push({ produitId, quantite });
  ecrire('panier', panier);
  mettreAJourCompteur();
}

function modifierQuantite(produitId, quantite) {
  let panier = getPanier();
  if (quantite <= 0) {
    panier = panier.filter(l => l.produitId !== produitId);
  } else {
    const ligne = panier.find(l => l.produitId === produitId);
    if (ligne) ligne.quantite = quantite;
  }
  ecrire('panier', panier);
  mettreAJourCompteur();
}

function retirerDuPanier(produitId) { modifierQuantite(produitId, 0); }
function viderPanier() { ecrire('panier', []); mettreAJourCompteur(); }
function compterArticles() { return getPanier().reduce((total, l) => total + l.quantite, 0); }

// 12000 -> '12 000 FCFA'
function formaterPrix(montant) {
  return montant.toLocaleString('fr-FR') + ' FCFA';
}
