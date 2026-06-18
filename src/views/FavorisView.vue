<script setup>
const props = defineProps({
  favoris: { type: Array, default: () => [] },
  estEnLecture: { type: Boolean, default: false },
  pisteActuelle: { type: Object, default: null } 
})

const emit = defineEmits(['piste-selectionnee', 'toggle-favori'])

function estEnLecturePiste(piste) {
  return props.pisteActuelle?.id === piste.id && props.estEnLecture
}
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
        @click="emit('piste-selectionnee', piste)"
      >
        <img :src="piste.albumCover" class="piste-cover" />
        <div class="piste-infos">
          <p class="piste-titre">{{ piste.titre }}</p>
          <p class="piste-album">{{ piste.albumTitre }} · {{ piste.albumArtiste }}</p>
        </div>
        <button class="btn-play">
          {{ estEnLecturePiste(piste) ? '⏸' : '▶'}}
        </button>
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

/* ── Responsive ── */

@media (max-width: 768px) {
  .container {
    padding: 2rem 1.25rem;
  }

  .piste-card {
    gap: 0.75rem;
    padding: 0.85rem 1rem;
  }

  .piste-cover {
    width: 50px;
    height: 50px;
    border-radius: 8px;
  }

  .piste-titre {
    font-size: 0.95rem;
  }

  .piste-album {
    font-size: 0.78rem;
  }

  .btn-play {
    width: 34px;
    height: 34px;
    font-size: 0.9rem;
  }

  .btn-favori {
    font-size: 1.1rem;
  }

  .vide {
    padding: 2rem 1rem;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 1.5rem 1rem;
  }

  .piste-card {
    gap: 0.6rem;
    padding: 0.75rem 0.85rem;
    border-radius: 12px;
  }

  .piste-cover {
    width: 44px;
    height: 44px;
    border-radius: 8px;
    flex-shrink: 0;
  }

  .piste-titre {
    font-size: 0.88rem;
  }

  .piste-album {
    font-size: 0.72rem;
  }

  .btn-play {
    width: 30px;
    height: 30px;
    font-size: 0.8rem;
    flex-shrink: 0;
  }

  .btn-favori {
    font-size: 1rem;
    flex-shrink: 0;
  }

  .vide {
    padding: 1.5rem 0.5rem;
    font-size: 0.95rem;
  }
}
</style>