<script setup>
import { ref, watch, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  piste: { type: Object, default: null }
})

const audioEl = ref(null)

const emit = defineEmits(['update:enLecture'])

const enLecture = ref(false)
const tempsActuel = ref(0)
const dureeTotal = ref(0)
const volume = ref(0.8)

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
  emit('update:enLecture', true)
})

function toggleLecture() {
  if (!audioEl.value) return
  if (enLecture.value) {
    audioEl.value.pause()
  } else {
    audioEl.value.play()
  }
  enLecture.value = !enLecture.value
  emit('update:enLecture', enLecture.value)
}

function seeker(event) {
  if (!audioEl.value || !dureeTotal.value) return
  const barre = event.currentTarget
  const ratio = event.offsetX / barre.offsetWidth
  audioEl.value.currentTime = ratio * dureeTotal.value
}

function changerVolume(event) {
  const val = event.target.value / 100
  volume.value = val
  if (audioEl.value) audioEl.value.volume = val
}

function formaterTemps(sec) {
  if (!sec || isNaN(sec)) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

const progression = computed(() => {
  if (!dureeTotal.value) return 0
  return (tempsActuel.value / dureeTotal.value) * 100
})

function detailAlbum(id) {
  router.push(`/album/${id}`)
}
</script>

<template>
  <div class="lecteur" v-if="piste">

    <audio
      ref="audioEl"
      @timeupdate="tempsActuel = audioEl.currentTime"
      @loadedmetadata="dureeTotal = audioEl.duration"
      @ended="enLecture = false; emit('update:enLecture', false)"
    />

    <!-- Album -->
    <div class="album" @click="detailAlbum(piste.albumId)">
      <div class="infos">
        <h3>{{ piste.titre }}</h3>
        <p>{{ piste.artiste || 'Sunn Khasida' }}</p>
      </div>
    </div>

    <!-- Contrôle -->
    <div class="controles">

      <button class="btn-play" @click.stop="toggleLecture">
        {{ enLecture ? '⏸' : '▶' }}
      </button>

      <div class="timeline">

        <span>
          {{ formaterTemps(tempsActuel) }}
        </span>

        <div class="barre" @click="seeker">
          <div
            class="barre-fill"
            :style="{ width: progression + '%' }"
          />
        </div>

        <span>
          {{ formaterTemps(dureeTotal) }}
        </span>

      </div>

    </div>

    <!-- Volume -->
    <div class="volume">

      🔊

      <input
        type="range"
        min="0"
        max="100"
        :value="volume*100"
        @input="changerVolume"
      />

    </div>

  </div>
</template>

<style scoped>

.lecteur{
position:fixed;

bottom:14px;
left:14px;
right:14px;

height:90px;

background-color: #010917;

backdrop-filter:blur(18px);

border:1px solid rgba(255,255,255,.05);

border-radius:20px;

padding:0 22px;

display:flex;

align-items:center;

justify-content:space-between;

box-shadow:0 10px 40px rgba(0,0,0,.45);

z-index:999;
}


/* ALBUM */

.album{
display:flex;

align-items:center;

gap:14px;

width:260px;

cursor:pointer;
}

.album img{

width:60px;

height:60px;

border-radius:12px;

object-fit:cover;

box-shadow:
0 6px 16px rgba(0,0,0,.5);

transition:.3s;
}

.album:hover img{
transform:scale(1.05);
}

.infos h3{
margin:0;

color:white;

font-size:.95rem;
}

.infos p{

margin-top:4px;

color:#b3b3b3;

font-size:.8rem;
}


/* CONTROLES */

.controles{

display:flex;

flex-direction:column;

align-items:center;

width:45%;
}

.btn-play{

width:52px;

height:52px;

border:none;

border-radius:50%;

background:
linear-gradient(
135deg,
#1ed760,
#1db954
);

font-size:20px;

cursor:pointer;

transition:.3s;

box-shadow:
0 8px 24px rgba(30,215,96,.35);
}

.btn-play:hover{

transform:
scale(1.12);
}

.timeline{

display:flex;

align-items:center;

gap:12px;

width:100%;

margin-top:10px;
}

.timeline span{

font-size:.75rem;

color:#b3b3b3;

width:40px;
}

.barre{

flex:1;

height:6px;

background:#353535;

border-radius:999px;

overflow:hidden;

cursor:pointer;
}

.barre-fill{

height:100%;

background:
linear-gradient(
90deg,
#1ed760,
#50ff91
);

border-radius:999px;

transition:
width .2s;
}


/* VOLUME */

.volume{

display:flex;

align-items:center;

gap:10px;

width:180px;

justify-content:end;
}

.volume input{

width:100px;

accent-color:#1ed760;
}


/* VIDE */

.vide{

position:fixed;

bottom:14px;

left:14px;

right:14px;

height:90px;

background:#111;

border-radius:20px;

display:flex;

justify-content:center;

align-items:center;

color:#777;

}

/* ── Responsive ── */

@media (max-width: 768px) {
  .lecteur {
    padding: 0 14px;
    height: 80px;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .album {
    width: auto;
    max-width: 160px;
  }

  .infos h3 {
    font-size: 0.82rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 140px;
  }

  .infos p {
    font-size: 0.72rem;
  }

  .controles {
    width: 50%;
  }

  .btn-play {
    width: 42px;
    height: 42px;
    font-size: 17px;
  }

  .timeline {
    gap: 8px;
    margin-top: 7px;
  }

  .timeline span {
    font-size: 0.68rem;
    width: 32px;
  }

  .volume input {
    width: 70px;
  }

  .volume {
    width: auto;
    gap: 6px;
  }
}

@media (max-width: 480px) {
  .lecteur {
    padding: 0 12px;
    height: 72px;
    bottom: 8px;
    left: 8px;
    right: 8px;
    border-radius: 16px;
  }

  .album {
    max-width: 110px;
  }

  .infos h3 {
    font-size: 0.78rem;
    max-width: 100px;
  }

  .infos p {
    font-size: 0.68rem;
    margin-top: 2px;
  }

  .controles {
    width: 55%;
  }

  .btn-play {
    width: 36px;
    height: 36px;
    font-size: 15px;
  }

  .timeline {
    gap: 6px;
    margin-top: 6px;
  }

  .timeline span {
    font-size: 0.62rem;
    width: 28px;
  }

  .barre {
    height: 4px;
  }

  /* Volume caché sur très petit écran : on garde la place pour les contrôles */
  .volume {
    display: none;
  }
}
</style>