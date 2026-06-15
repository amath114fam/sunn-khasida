<script setup>
const props = defineProps({
  piste: { type: Object, required: true }
})

const emit = defineEmits(['selectionner'])

function jouer() {
  emit('selectionner', props.piste)
}
</script>

<template>
  <div class="ligne-piste" @click="jouer">
    <span class="piste-icone">▶</span>
    <span class="piste-titre">{{ piste.titre }}</span>
    <span class="piste-duree">{{ piste.duree }}</span>
  </div>
</template>

<style scoped>
.ligne-piste {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}
.ligne-piste:hover { background: #2a2a2a; }
.piste-titre { flex: 1; }
.piste-duree { color: #888; font-size: 0.85rem; }
</style>