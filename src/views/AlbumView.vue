<script setup>
import { computed } from 'vue'
import { useRoute , useRouter} from 'vue-router'
import albumsData from '../data/album.js'
import LignePiste from '@/components/LignePiste.vue'

const route = useRoute()
const router = useRouter()  

const album = computed(() =>
  albumsData.find(a => a.id === Number(route.params.id))
)

const props = defineProps({
  favoris: { type: Array, default: () => [] },
  pisteActuelle: { type: Object, default: null },
  estEnLecture: { type: Boolean, default: false }
})

const emit = defineEmits(['piste-selectionnee', 'toggle-favori'])

function gererFavori(piste) {
  emit('toggle-favori', {
    ...piste,
    albumId: album.value.id,
    albumTitre: album.value.titre,
    albumArtiste: album.value.artiste,
    albumCover: album.value.cover
  })
}
function gererSelection(piste) {
  emit('piste-selectionnee', {
    ...piste,
    albumId: album.value.id,
  })
}

const chansonCible = computed(() => route.query.chanson || null)

const chansonsAffichees = computed(() => {
  if (!chansonCible.value) return album.value?.chansons || []
  return album.value?.chansons.filter(c => c.id == chansonCible.value) || []
})
</script>

<template>
  <div v-if="album" class="album-detail">
    <div class="album-header">
      <img :src="album.cover" :alt="album.titre" class="album-cover-large" />
      <div>
        <h1>{{ album.titre }}</h1>
        <p class="artiste">{{ album.artiste }}</p>
        <span class="genre-tag">{{ album.genre }}</span>
      </div>
    </div>
    <div v-if="chansonCible" class="mb-3">
      <button
        class="btn btn-outline-secondary btn-sm"
        @click="router.push(`/album/${route.params.id}`)"
      >
        ← Voir toutes les chansons
      </button>
    </div>

    <div class="tracklist">
      <LignePiste
        v-for="piste in chansonsAffichees"
        :key="piste.id"
        :piste="piste"
        :favoris="favoris"
        :est-en-lecture="estEnLecture"
        :piste-actuelle="pisteActuelle"
        @selectionner="gererSelection"
        @toggle-favori="gererFavori"
      />
    </div>
  </div>
  <div v-else class="not-found">Album introuvable.</div>
</template>

<style scoped>
.album-detail { max-width: 800px; margin: 0 auto; }
.album-header {
  display: flex;
  gap: 2rem;
  align-items: center;
  margin-bottom: 2rem;
  background: linear-gradient(
    135deg,
    rgba(25, 230, 140, 0.12),
    rgba(0, 0, 0, 0.85)
  );
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 24px;
  backdrop-filter: blur(16px);
  box-shadow:0 5px 10px rgba(0, 0, 0, 0.5);
}
.album-cover-large { width: 200px; height: 200px; border-radius: 12px; object-fit: cover; }
.artiste { color: #aaa; font-size: 1.1rem; }
.genre-tag { display: inline-block; margin-top: 0.5rem; padding: 0.2rem 0.6rem; background: #1db954; border-radius: 10px; font-size: 0.75rem; }
.tracklist { display: flex; flex-direction: column; gap: 0.3rem; }
.not-found { text-align: center; margin-top: 2rem; color: #888; }

/* ── Responsive ── */

@media (max-width: 768px) {
  .album-detail {
    padding: 0 1.25rem;
  }

  .album-header {
    gap: 1.25rem;
    padding: 18px;
    border-radius: 18px;
  }

  .album-cover-large {
    width: 140px;
    height: 140px;
    border-radius: 10px;
    flex-shrink: 0;
  }

  .album-header h1 {
    font-size: 1.4rem;
  }

  .artiste {
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .album-detail {
    padding: 0 1rem;
  }

  .album-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
    padding: 16px;
    border-radius: 16px;
  }

  .album-cover-large {
    width: 160px;
    height: 160px;
  }

  .album-header h1 {
    font-size: 1.3rem;
    margin-bottom: 0.3rem;
  }

  .artiste {
    font-size: 0.9rem;
  }

  .genre-tag {
    font-size: 0.7rem;
  }
}
</style>