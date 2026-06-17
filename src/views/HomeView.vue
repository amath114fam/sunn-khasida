<script setup>
import { ref, onMounted, computed } from 'vue'
import albumsData from '../data/album.js'
import { useRouter } from 'vue-router'
const router = useRouter()

const albums = ref([])

onMounted(() => {
  setTimeout(() => {
    albums.value = albumsData
  }, 300)
})

function detailAlbum(id) {
  router.push(`/album/${id}`)
  
}

const recherche = ref('')

const albumsFiltres = computed(() => {
  const texte = recherche.value.toLowerCase()
  return albums.value.filter(album =>
    album.titre.toLowerCase().includes(texte) ||
    album.artiste.toLowerCase().includes(texte)
  )
})

const chansonsFiltrees = computed(() => {
  if (!recherche.value.trim()) return []           // rien à afficher si vide
  const texte = recherche.value.toLowerCase()

  const resultats = []
  albums.value.forEach(album => {
    album.chansons                                 // on entre dans chaque album
      ?.filter(chanson => chanson.titre.toLowerCase().includes(texte))
      .forEach(chanson => {
        resultats.push({
          id:           chanson.id,  
          chansonTitre: chanson.titre,
          albumTitre:   album.titre,
          albumId:      album.id,
          albumCover:   album.cover
        })
      })
  })
  return resultats
})
function allerAChanson(albumId, chansonId) {
  router.push(`/album/${albumId}?chanson=${chansonId}`)
}


</script>


<template>
<section class="hero">
<div>

<h1 class="display-3 fw-bold">
Sunu-Khasida
</h1>

<p class="lead">
La plus grande bibliothèque numérique de Khassaïdes
</p>

<button class="btn btn-warning btn-lg">
Découvrir les albums
</button>

</div>
</section>

<section class="py-5">

<div class="container">

<div class="search-box mb-5">
<input
type="text"
class="form-control form-control-lg"
placeholder="Rechercher un Khassaïde..."
v-model="recherche"
>
</div>
<!-- Résultats chansons — visible uniquement quand il y a des correspondances -->
<div v-if="chansonsFiltrees.length" class="mb-5">
  <h2 class="mb-3 fw-bold">🎵 Chansons trouvées</h2>

  <ul class="list-group">
    <li
        v-for="r in chansonsFiltrees"
        :key="r.id"
        class="list-group-item d-flex align-items-center gap-3"
        @click="allerAChanson(r.albumId, r.id)" 
        style="cursor:pointer"
    >
      <img :src="r.albumCover" style="width:48px;height:48px;object-fit:cover;border-radius:8px">
      <div>
        <div class="fw-semibold">{{ r.chansonTitre }}</div>
        <small class="text-muted">Album : {{ r.albumTitre }}</small>
      </div>
    </li>
  </ul>
</div>

<h2 class="mb-4 fw-bold">
Albums populaires
</h2>

<div class="row g-4">
<div class="col-md-4" v-for="album in albumsFiltres" @click="detailAlbum(album.id)">
<div class="card album-card" >

<img
:src="album.cover"
class="card-img-top"
>

<div class="card-body">

<h5>{{ album.titre }}</h5>

<p class="text-muted">
{{ album.artiste }}
</p>
</div>

</div>
</div>

</div>

</div>

</section>

<footer class="py-4 text-center">

<h4>Sunu-Khasida</h4>

<p>
La plateforme moderne dédiée aux Khassaïdes.
</p>

</footer>
</template>
    <style scoped>

body{
    background:#f8f9fa;
}

.hero{
    height:70vh;
    background:
    linear-gradient(rgba(0,0,0,.6),
    rgba(0,0,0,.6)),
    url("https://images.unsplash.com/photo-1512632578888-169bbbc64f33");
    background-size:cover;
    background-position:center;
    color:white;

    display:flex;
    align-items:center;
    justify-content:center;
    text-align:center;
}

.album-card{
    border:none;
    border-radius:20px;
    overflow:hidden;
    transition:.3s;
    box-shadow:0 4px 20px rgba(0,0,0,.1);
}

.album-card:hover{
    transform:translateY(-8px);
}

.album-card img{
    height:220px;
    object-fit:cover;
}

.search-box{
    max-width:700px;
    margin:auto;
}

footer{
    background:#111;
    color:white;
}

</style>