<script setup>
import { computed } from 'vue'
const props = defineProps({
  piste: { type: Object, required: true },
  favoris: { type: Array, default: () => [] }
})
const emit = defineEmits(['selectionner', 'toggle-favori'])

// Est-ce que cette piste est déjà en favori ?
const estFavori = computed(() =>
  props.favoris.some(f => f.id === props.piste.id)
)

function toggleFavori() {
  emit('toggle-favori', props.piste)
}

function jouer() {
  emit('selectionner', props.piste)
}
</script>
```vue
<template>
  <div class="ligne-piste" @click="jouer">

    <!-- Bouton -->
    <div class="play-zone">
      <span class="play">▶</span>
    </div>

    <!-- Infos -->
    <div class="contenu">

      <span class="titre">
        {{ piste.titre }}
      </span>

      <span class="artiste">
        {{ piste.artiste || 'Sunn Khasida' }}
      </span>

    </div>

    <!-- Durée -->
    <span class="duree">
      {{ piste.duree }}
    </span>
      <span class="favori-btn" @click="toggleFavori">
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

transition:
all .28s ease;

background:
transparent;

position:relative;

overflow:hidden;
}


/* Hover */

.ligne-piste:hover{

background:
linear-gradient(
90deg,
rgba(255,255,255,.06),
rgba(255,255,255,.02)
);

transform:
translateX(6px);
}


/* Bouton */

.play-zone{

width:42px;

height:42px;

border-radius:50%;

background:
rgba(255,255,255,.05);

display:flex;

align-items:center;

justify-content:center;

transition:.3s;
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


/* Texte */

.contenu{

display:flex;

flex-direction:column;

flex:1;
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


/* Durée */

.duree{

color:#b3b3b3;

font-size:.82rem;

font-weight:500;

min-width:50px;

text-align:right;
}


/* Barre verte */

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

</style>
```
