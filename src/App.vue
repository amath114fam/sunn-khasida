<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-layout">
    
    <header class="app-header">
      <RouterLink to="/" class="logo">🎵 Sunu-Khasida</RouterLink>
      <nav>
        <RouterLink to="/" class="nav-link">Accueil</RouterLink>
      </nav>
    </header>

    <main class="app-main">
      <RouterView />
    </main>

    <LecteurAudio />
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.app-layout {
  min-height: 100vh;
  background: #121212;
  color: #ffffff;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #1db954, #f4c20d);
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