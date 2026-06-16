<script setup>
import { ref, watch, computed, nextTick } from 'vue'

//La prop reçue depuis App.vue
const props = defineProps({
  piste: { type: Object, default: null }
})

// Référence vers la balise <audio> du template
const audioEl = ref(null)

// État local du lecteur
const enLecture = ref(false)
const tempsActuel = ref(0)
const dureeTotal = ref(0)
const volume = ref(0.8)

// ④ Quand la piste change → on charge la nouvelle source et on joue
watch(() => props.piste, async(nouvellePiste) => {
  console.log('watch déclenché')
  console.log(audioEl.value)
  if (!nouvellePiste) return
  await nextTick()
  if (!audioEl.value) return

  audioEl.value.src = nouvellePiste.fichier
  audioEl.value.volume = volume.value
  audioEl.value.play()
  enLecture.value = true
})

// Basculer play / pause
function toggleLecture() {
  if (!audioEl.value) return
  if (enLecture.value) {
    audioEl.value.pause()
  } else {
    audioEl.value.play()
  }
  enLecture.value = !enLecture.value
}

// Avancer dans la chanson en cliquant sur la barre
function seeker(event) {
  if (!audioEl.value || !dureeTotal.value) return
  const barre = event.currentTarget
  const ratio = event.offsetX / barre.offsetWidth
  audioEl.value.currentTime = ratio * dureeTotal.value
}

// Changer le volume
function changerVolume(event) {
  const val = event.target.value / 100
  volume.value = val
  if (audioEl.value) audioEl.value.volume = val
}

// Formater les secondes "3:45"
function formaterTemps(sec) {
  if (!sec || isNaN(sec)) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

// Pourcentage de progression (pour la largeur CSS de la barre)
const progression = computed(() => {
  if (!dureeTotal.value) return 0
  return (tempsActuel.value / dureeTotal.value) * 100
})
</script>

<template>
  <div class="lecteur" v-if="piste">
    <audio
      ref="audioEl"
      @timeupdate="tempsActuel = audioEl.currentTime"
      @loadedmetadata="dureeTotal = audioEl.duration"
      @ended="enLecture = false"
    />

    <!-- Infos sur la piste courante -->
    <div class="piste-info">
      <span class="piste-titre">{{ piste.titre }}</span>
    </div>

    <!-- Contrôles centraux -->
    <div class="controles">
      <button class="btn-play" @click="toggleLecture">
        {{ enLecture ? '⏸' : '▶' }}
      </button>

      <div class="barre-container">
        <span class="temps">{{ formaterTemps(tempsActuel) }}</span>
        <div class="barre" @click="seeker">
          <div class="barre-fill" :style="{ width: progression + '%' }"></div>
        </div>
        <span class="temps">{{ formaterTemps(dureeTotal) }}</span>
      </div>
    </div>

    <!-- Volume -->
    <div class="volume">
      <input type="range" min="0" max="100" :value="volume * 100" @input="changerVolume" />
    </div>
  </div>

  <!-- Message quand aucune piste n'est sélectionnée -->
  <div class="lecteur lecteur-vide" v-else>
    <span>Clique sur une chanson pour lancer la lecture 🎵</span>
  </div>
</template>

<style scoped>
.lecteur {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 72px;
  background: #181818;
  border-top: 1px solid #2a2a2a;
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 0 24px;
  z-index: 100;
}

.lecteur-vide {
  justify-content: center;
  color: #555;
  font-size: 0.9rem;
}

.piste-info {
  min-width: 160px;
  flex: 1;
}

.piste-titre {
  color: #fff;
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}

.controles {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex: 2;
}

.btn-play {
  background: #1db954;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.1s;
}

.btn-play:hover {
  transform: scale(1.1);
}

.barre-container {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.temps {
  color: #888;
  font-size: 0.75rem;
  min-width: 36px;
  text-align: center;
}

.barre {
  flex: 1;
  height: 4px;
  background: #3a3a3a;
  border-radius: 2px;
  cursor: pointer;
}

.barre-fill {
  height: 4px;
  background: #1db954;
  border-radius: 2px;
  transition: width 0.1s linear;
}

.volume {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  justify-content: flex-end;
  color: #aaa;
}

.volume input[type="range"] {
  width: 80px;
  accent-color: #1db954;
}
</style>