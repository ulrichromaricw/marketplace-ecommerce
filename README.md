# marketplace-ecommerce

Site de marketplace multi-vendeurs réalisé dans le cadre d'un projet scolaire (Institut Saint Jean, Yaoundé) : chaque utilisateur peut acheter comme client et ouvrir sa propre boutique pour vendre.

**Front-end uniquement** : HTML, CSS et JavaScript, sans framework ni serveur. Les données de départ viennent de fichiers JSON ; le reste (comptes, panier, commandes) est enregistré dans le navigateur avec `localStorage`.

## Lancer le site

1. Cloner le dépôt : `git clone https://github.com/ulrichromaricw/marketplace-ecommerce.git`
2. Ouvrir le dossier dans Visual Studio Code.
3. Clic droit sur `index.html` → **Open with Live Server**.

Ne pas ouvrir les pages par double-clic : les fichiers JSON ne se chargeraient pas.

Pour repartir de données propres : dans la console du navigateur (F12), taper `localStorage.clear()` puis recharger.

## Équipe

| Membre | Rôle | Pages |
| --- | --- | --- |
| Membre 1 — Romaric | Orchestrateur, base commune, mise en ligne | Accueil, Contact |
| Membre 2 | Catalogue, fiche produit, données | Catalogue, Fiche produit |
| Membre 3 | Panier et commande | Panier, Commande, Confirmation |
| Membre 4 | Comptes et boutiques publiques, plan de tests | Connexion, Mon compte, Boutiques, Page boutique |
| Membre 5 | Espace vendeur, maquettes Figma | Créer ma boutique, Tableau de bord, Formulaire produit |

Premier exercice pour chaque membre : sur une branche `docs/<prenom>`, ajouter son prénom à sa ligne du tableau ci-dessus, puis ouvrir une Pull Request.

## Règles de travail

- **Jamais de travail direct sur `main`** : une tâche = une branche = une Pull Request relue par un autre membre.
- **Noms de branches** : `feature/F06-panier`, `fix/total-panier`, `docs/base-de-donnees`.
- **Messages de commit** : `ajout : ...`, `correction : ...`, `style : ...`, `docs : ...`
- **Chacun modifie seulement ses fichiers.** `css/style.css`, `js/storage.js` et `js/main.js` sont partagés mais modifiés seulement par le Membre 1 : besoin d'un changement ? Ouvrir une issue.
- **Rotation des relecteurs** : Membre 1 → 2, 2 → 3, 3 → 4, 4 → 5, 5 → 1.

## Fichiers et responsables

| Dossier | Contenu |
| --- | --- |
| `*.html` | Les 14 pages ; le responsable est écrit en première ligne de chaque fichier |
| `css/` | `style.css` (base commune) et un fichier par membre |
| `js/` | `storage.js` (accès aux données) et `main.js` (en-tête, démarrage) partagés, puis un fichier par page |
| `data/` | Données de démonstration (Membre 2) |
| `bd/` | Base de données SQL : tables `personne`, `boutique`, `article` et jointures (Membre 2) |
| `assets/` | Images et icônes |

## Fonctions communes (`js/storage.js` et `js/main.js`)

Chaque script de page commence par `demarrerPage(() => { ... })`. Fonctions disponibles partout : `lire`, `ecrire`, `genererId`, `getProduit`, `getBoutique`, `prixActuel`, `lireParametre`, `getUtilisateurConnecte`, `setUtilisateurConnecte`, `deconnecter`, `getPanier`, `ajouterAuPanier`, `modifierQuantite`, `retirerDuPanier`, `viderPanier`, `compterArticles`, `formaterPrix`, `afficherMessage`, `carteProduit`, `activerBoutonsAjouter`.

## Documents du projet

Le cahier des charges, le guide de collaboration GitHub, le guide technique et le document Base de données sont partagés dans le groupe de l'équipe.
