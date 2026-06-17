<script setup>
const props = defineProps({
  favoris: { type: Array, default: () => [] }
})

const emit = defineEmits(['piste-selectionnee', 'toggle-favori'])
</script>

<template>
  <div class="container py-5">
    <h2 class="fw-bold mb-4">❤️ Mes Favoris</h2>

    <div v-if="favoris.length === 0" class="vide">
      <p>😔 Aucune chanson en favori pour le moment</p>
    </div>

    <div v-else>
      <div
        v-for="piste in favoris"
        :key="piste.id"
        class="piste-card"
      >
        <img :src="piste.albumCover" class="piste-cover" />
        <div class="piste-infos">
          <p class="piste-titre">{{ piste.titre }}</p>
          <p class="piste-album">{{ piste.albumTitre }} · {{ piste.albumArtiste }}</p>
        </div>
        <button class="btn-play" @click="emit('piste-selectionnee', piste)">▶</button>
        <button class="btn-favori" @click="emit('toggle-favori', piste)">❤️</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.piste-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.2rem;
  border-radius: 16px;
  margin-bottom: 0.8rem;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  color: white;
  transition: transform 0.2s;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}
.piste-card:hover { transform: translateX(6px); }
.piste-cover {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  object-fit: cover;
}
.piste-infos { flex: 1; }
.piste-titre { margin: 0; font-weight: 600; }
.piste-album { margin: 0; font-size: 0.82rem; color: #aaa; }
.btn-play {
  background: #1db954;
  border: none;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  font-size: 1rem;
  cursor: pointer;
}
.btn-favori {
  background: transparent;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
}
.vide {
  text-align: center;
  padding: 3rem;
  color: #888;
  font-size: 1.2rem;
}
</style>