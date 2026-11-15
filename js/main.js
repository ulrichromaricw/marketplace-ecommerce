// main.js — Responsable : Membre 1

// Lance une page : données prêtes, en-tête à jour, puis le code de la page
async function demarrerPage(codeDeLaPage) {
  await initDonnees();
  initEnTete();
  if (codeDeLaPage) codeDeLaPage();
}

// Menu burger + liens selon l'utilisateur connecté + compteur du panier
function initEnTete() {
  const bouton = document.querySelector('.menu-burger');
  const menu = document.querySelector('.nav-principale');
  if (bouton) bouton.addEventListener('click', () => menu.classList.toggle('ouvert'));

  const zone = document.querySelector('#zone-compte');
  const utilisateur = getUtilisateurConnecte();
  if (zone) {
    if (!utilisateur) {
      zone.innerHTML = '<a href="connexion.html">Connexion</a>';
    } else {
      zone.innerHTML = '<a href="compte.html">Mon compte</a>';
      if (utilisateur.boutiqueId) zone.innerHTML += '<a href="vendeur.html">Ma boutique</a>';
    }
  }
  mettreAJourCompteur();
}

function mettreAJourCompteur() {
  const compteur = document.querySelector('#compteur-panier');
  if (compteur) compteur.textContent = compterArticles();
}

// Petit message temporaire en bas de l'écran
function afficherMessage(texte) {
  const message = document.createElement('div');
  message.className = 'message-flash';
  message.textContent = texte;
  document.body.appendChild(message);
  setTimeout(() => message.remove(), 2500);
}

// Carte d'un produit, utilisée par l'accueil, le catalogue et les pages boutique
function carteProduit(p) {
  const boutique = getBoutique(p.boutiqueId);
  const bouton = p.stock > 0
    ? `<button class="bouton bouton-ajouter" data-id="${p.id}">Ajouter au panier</button>`
    : '<p class="erreur">Rupture de stock</p>';
  return `
    <article class="carte-produit">
      <a href="produit.html?id=${p.id}"><img src="${p.image}" alt="${p.nom}" loading="lazy"></a>
      <h3><a href="produit.html?id=${p.id}">${p.nom}</a></h3>
      <p>par <a href="boutique.html?id=${p.boutiqueId}">${boutique ? boutique.nom : ''}</a></p>
      <p class="prix">${formaterPrix(prixActuel(p))}</p>
      ${bouton}
    </article>`;
}

// Active les boutons « Ajouter au panier » des cartes affichées dans une zone
function activerBoutonsAjouter(zone) {
  zone.querySelectorAll('.bouton-ajouter').forEach(bouton => {
    bouton.addEventListener('click', () => {
      ajouterAuPanier(bouton.dataset.id, 1);
      afficherMessage('Ajouté au panier');
    });
  });
}

// Accueil : produits vedettes et boutiques à la une
function afficherAccueil() {
  const zoneProduits = document.querySelector('#produits-vedettes');
  const produits = lire('produits').filter(p => p.stock > 0).slice(0, 8);
  zoneProduits.innerHTML = produits.length
    ? produits.map(carteProduit).join('')
    : '<p>Les premiers produits arrivent bientôt.</p>';
  activerBoutonsAjouter(zoneProduits);

  const zoneBoutiques = document.querySelector('#boutiques-une');
  const boutiques = lire('boutiques').slice(0, 4);
  zoneBoutiques.innerHTML = boutiques.length
    ? boutiques.map(b => `<a class="carte-boutique" href="boutique.html?id=${b.id}">${b.nom}</a>`).join('')
    : '<p>Aucune boutique pour le moment. <a href="compte.html">Ouvrez la vôtre !</a></p>';
}

// Contact : vérifie le formulaire, puis affiche une confirmation (pas d'envoi réel, il n'y a pas de serveur)
function initContact() {
  const form = document.querySelector('#form-contact');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const erreurs = [];
    if (form.nom.value.trim().length < 2) erreurs.push('Le nom est obligatoire.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.value.trim())) erreurs.push("L'e-mail n'est pas valide.");
    if (form.message.value.trim().length < 10) erreurs.push('Le message doit compter au moins 10 caractères.');
    const zone = document.querySelector('#erreurs-contact');
    if (erreurs.length) {
      zone.innerHTML = erreurs.map(x => `<p>${x}</p>`).join('');
      return;
    }
    zone.innerHTML = '';
    form.reset();
    afficherMessage('Merci, votre message a bien été pris en compte');
  });
}
