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
        <RouterLink to="/favoris" class="nav-btn-favoris">
          <span class="coeur">♥</span>
          Favoris
          <span v-if="favoris.length > 0" class="badge">{{ favoris.length }}</span>
        </RouterLink>
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

nav {
  display: flex;
  align-items: center;
  gap: 0.75rem;
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

/* ── Bouton Favoris ── */
.nav-btn-favoris {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  text-decoration: none;
  color: #fff;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
  background: linear-gradient(135deg, #b0003a, #e91e8c);
  box-shadow: 0 0 12px rgba(233, 30, 140, 0.45);
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
  letter-spacing: 0.02em;
}

.nav-btn-favoris:hover {
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 0 22px rgba(233, 30, 140, 0.7);
  background: linear-gradient(135deg, #d0004a, #ff3dab);
}

.nav-btn-favoris:active {
  transform: scale(0.97);
}

.nav-btn-favoris .coeur {
  font-size: 1rem;
  line-height: 1;
  animation: pulse-heart 1.8s ease-in-out infinite;
}

.badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background: #fff;
  color: #b0003a;
  font-size: 0.7rem;
  font-weight: 700;
  min-width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px;
  box-shadow: 0 0 6px rgba(0,0,0,0.3);
}

@keyframes pulse-heart {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.25); }
}

.app-main {
  padding: 2rem;
  padding-bottom: 6rem;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .app-header {
    padding: 0.75rem 1.25rem;
  }

  .logo {
    font-size: 1.2rem;
  }

  .nav-link {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }

  .nav-btn-favoris {
    padding: 0.4rem 0.9rem;
    font-size: 0.85rem;
  }

  .app-main {
    padding: 1.25rem;
    padding-bottom: 6rem;
  }
}

@media (max-width: 480px) {
  .app-header {
    padding: 0.6rem 1rem;
  }

  .logo {
    font-size: 1rem;
  }

  .nav-link {
    padding: 0.35rem 0.6rem;
    font-size: 0.85rem;
  }

  .nav-btn-favoris {
    padding: 0.35rem 0.75rem;
    font-size: 0.8rem;
  }

  .app-main {
    padding: 1rem;
    padding-bottom: 6rem;
  }
}
</style>