<script setup>
import { computed } from 'vue'

const props = defineProps({
  piste: { type: Object, required: true },
  favoris: { type: Array, default: () => [] },
  pisteActuelle: { type: Object, default: null }, 
  estEnLecture: { type: Boolean, default: false }
})
const emit = defineEmits(['selectionner', 'toggle-favori'])

const estFavori = computed(() =>
  props.favoris.some(f => f.id === props.piste.id)
)

function toggleFavori() {
  emit('toggle-favori', props.piste)
}

function jouer() {
  emit('selectionner', props.piste)
}

const enLecture = computed(() =>
  props.pisteActuelle?.id === props.piste.id && props.estEnLecture
)
</script>

<template>
  <div class="ligne-piste" :class="{ active: enLecture }" @click="jouer">

    <div class="play-zone">
      <span class="play"> {{ enLecture ? '⏸' : '▶' }}</span>
    </div>

    <div class="contenu">
      <span class="titre">
        {{ piste.titre }}
      </span>
      <span class="artiste">
        {{ piste.artiste || 'Sunn Khasida' }}
      </span>
    </div>

    <span class="duree">
      {{ piste.duree }}
    </span>
    <span class="favori-btn" @click.stop="toggleFavori">
      {{ estFavori ? '❤️' : '🤍' }}
    </span>
  </div>
</template>

<style scoped>

.ligne-piste{
  display:flex;
  align-items:center;
  gap:18px;
  padding:14px 18px;
  border-radius:14px;
  cursor:pointer;
  transition: all .28s ease;
  background: transparent;
  position:relative;
  overflow:hidden;
}

.ligne-piste:hover{
  background: linear-gradient(
    90deg,
    rgba(255,255,255,.06),
    rgba(255,255,255,.02)
  );
  transform: translateX(6px);
}

.play-zone{
  width:42px;
  height:42px;
  border-radius:50%;
  background: rgba(255,255,255,.05);
  display:flex;
  align-items:center;
  justify-content:center;
  transition:.3s;
  flex-shrink: 0;
}

.play{
  color:#1ed760;
  font-size:15px;
  opacity:.7;
  transition:.3s;
}

.ligne-piste:hover .play-zone{
  background:#1db954;
  transform:scale(1.08);
}

.ligne-piste:hover .play{
  color:white;
  opacity:1;
}

.contenu{
  display:flex;
  flex-direction:column;
  flex:1;
  min-width: 0; /* permet à text-overflow de fonctionner */
}

.titre{
  color:white;
  font-size:.96rem;
  font-weight:600;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}

.artiste{
  margin-top:4px;
  font-size:.78rem;
  color:#a0a0a0;
}

.duree{
  color:#b3b3b3;
  font-size:.82rem;
  font-weight:500;
  min-width:50px;
  text-align:right;
  flex-shrink: 0;
}

.ligne-piste::after{
  content:"";
  position:absolute;
  left:0;
  top:0;
  width:4px;
  height:100%;
  background:#1ed760;
  opacity:0;
  transition:.25s;
}

.ligne-piste:hover::after{
  opacity:1;
}

.active {
  background: #1a3a2a;
  border-left: 3px solid #1db954;
}

.active .piste-icone {
  color: #1db954;
}

.favori-btn {
  flex-shrink: 0;
}

/* ── Responsive ── */

@media (max-width: 768px) {
  .ligne-piste {
    gap: 12px;
    padding: 12px 14px;
    border-radius: 12px;
  }

  .play-zone {
    width: 36px;
    height: 36px;
  }

  .play {
    font-size: 13px;
  }

  .titre {
    font-size: 0.9rem;
  }

  .artiste {
    font-size: 0.74rem;
  }

  .duree {
    font-size: 0.78rem;
    min-width: 40px;
  }

  .favori-btn {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .ligne-piste {
    gap: 10px;
    padding: 10px 12px;
    border-radius: 10px;
  }

  .play-zone {
    width: 32px;
    height: 32px;
  }

  .play {
    font-size: 12px;
  }

  .titre {
    font-size: 0.85rem;
  }

  .artiste {
    font-size: 0.70rem;
    margin-top: 2px;
  }

  .duree {
    font-size: 0.74rem;
    min-width: 36px;
  }

  .favori-btn {
    font-size: 0.95rem;
  }
}
</style>