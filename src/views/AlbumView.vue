<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import albumsData from '../data/album.js'
import LignePiste from '@/components/LignePiste.vue'

const route = useRoute()

const album = computed(() =>
  albumsData.find(a => a.id === Number(route.params.id))
)

const emit = defineEmits(['piste-selectionnee'])

function gererSelection(piste) {
  emit('piste-selectionnee', {
    ...piste,
    albumId: album.value.id
  })
}
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

    <div class="tracklist">
      <LignePiste
        v-for="piste in album.chansons"
        :key="piste.id"
        :piste="piste"
        @selectionner="gererSelection"
      />
    </div>
  </div>
  <div v-else class="not-found">Album introuvable.</div>
</template>

<style scoped>
.album-detail { max-width: 800px; margin: 0 auto; }
.album-header { display: flex; gap: 2rem; align-items: center; margin-bottom: 2rem; }
.album-cover-large { width: 200px; height: 200px; border-radius: 12px; object-fit: cover; }
.artiste { color: #aaa; font-size: 1.1rem; }
.genre-tag { display: inline-block; margin-top: 0.5rem; padding: 0.2rem 0.6rem; background: #1db954; border-radius: 10px; font-size: 0.75rem; }
.tracklist { display: flex; flex-direction: column; gap: 0.3rem; }
.not-found { text-align: center; margin-top: 2rem; color: #888; }
</style>