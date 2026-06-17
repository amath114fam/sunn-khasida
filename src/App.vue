<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import LecteurAudio from './components/LecteurAudio.vue'

const pisteActuelle = ref(null)

function definirPiste(piste) {
  pisteActuelle.value = piste
}

// La liste des favoris
const favoris = ref([])

// Ajouter ou supprimer un favori
function toggleFavori(piste) {
  const existe = favoris.value.find(f => f.id === piste.id)
  if (existe) {
    // déjà en favori → on supprime
    favoris.value = favoris.value.filter(f => f.id !== piste.id)
  } else {
    // pas encore → on ajoute
    favoris.value.push(piste)
  }
}

const estEnLecture = ref(false)
</script>

<template>
  <div class="app-layout">
    
    <header class="app-header">
      <RouterLink to="/" class="logo">🎵 Sunu-Khasida</RouterLink>
      <nav>
        <RouterLink to="/" class="nav-link">Accueil</RouterLink>
        <RouterLink to="/favoris" class="nav-link">❤️ Favoris</RouterLink>
      </nav>
    </header>

    <main class="app-main">
      <RouterView v-slot="{ Component }">
        <component :is="Component" 
        :favoris="favoris"
        :piste-actuelle="pisteActuelle"
        :est-en-lecture="estEnLecture"
        @piste-selectionnee="definirPiste"
        @toggle-favori="toggleFavori" />
      </RouterView>

    </main>

    <LecteurAudio 
    :piste="pisteActuelle" 
    @update:enLecture="estEnLecture = $event"
    />
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.app-layout {
  min-height: 100vh;
  background: #021128;
  color: #ffffff;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: #010917;
  position: sticky;
  top: 0;
  z-index: 10;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
  transition: background 0.2s;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
}

.app-main {
  padding: 2rem;
  padding-bottom: 6rem; /* laisse de la place pour le lecteur fixe en bas */
}
</style>