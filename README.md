# Sunu-Khasida

## Présentation du projet

Sunu-Khasida est une application web de streaming musical dédiée aux Khassaïdes mourides du Ramadan 2026. Elle permet aux utilisateurs de parcourir un catalogue d'albums, d'écouter des chansons directement dans le navigateur, de rechercher un album ou une chanson en temps réel, et de gérer une liste de favoris personnelle. L'application a été conçue comme une Single Page Application (SPA) avec une persistance audio complète : la musique continue de jouer même lorsque l'utilisateur navigue entre les pages.

---

## Installation et Lancement

Cloner le dépôt :
- git clone https://github.com/amath114fam/sunn-khasida.git
Installer les dépendances :
- npm install
Lancer le serveur de développement :
- npm run dev

L'application sera accessible à l'adresse : http://localhost:5173

---

## Architecture et Découpage

L'architecture repose sur un pattern "sandwich" : le composant LecteurAudio est placé en dehors du RouterView dans App.vue, ce qui lui permet de survivre aux changements de pages et de maintenir la lecture audio en continu.

App.vue (composant racine et parent global)
    |
    |-- LecteurAudio.vue (composant fixe, hors routeur)
    |
    |-- RouterView
          |
          |-- HomeView.vue (page d'accueil et catalogue)
          |
          |-- AlbumView.vue (page détail d'un album)
          |     |
          |     |-- LignePiste.vue (composant pour chaque chanson)
          |
          |-- FavorisView.vue (page des favoris)

Flux de communication :
- Les données descendent de parent en enfant via les props (:piste, :favoris, :pisteActuelle, :estEnLecture)
- Les actions remontent de enfant en parent via les émissions d'événements (@piste-selectionnee, @toggle-favori, @update:enLecture)
- Le v-slot sur RouterView permet à App.vue d'écouter les événements émis par les composants routés

---

## Gestion de la Donnée

Les données de l'application sont stockées à deux niveaux :

Données statiques (src/data/album.js) :
La liste des albums et leurs chansons est définie dans un fichier JavaScript local. Chaque album contient un identifiant, un titre, un artiste, un genre, une URL de pochette et un tableau de chansons. Chaque chanson contient un identifiant, un titre, une durée et une URL vers un fichier audio. Ces données sont importées dans HomeView.vue et AlbumView.vue au montage du composant.

Données réactives (App.vue) :
Deux états globaux sont gérés directement dans App.vue et distribués à tous les composants enfants via les props :
- pisteActuelle : l'objet représentant la chanson en cours de lecture, initialement null
- favoris : le tableau des chansons ajoutées aux favoris par l'utilisateur, initialement vide
- estEnLecture : un booléen indiquant si la lecture est active ou en pause

Ces données sont volontairement gérées dans App.vue sans Pinia afin de pratiquer la communication props/emit native de Vue 3.

---

## Technologies utilisées

- Vue 3 (Composition API avec script setup)
- Vue Router 4
- Vite (outil de build et serveur de développement)