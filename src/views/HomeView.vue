<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import albumsData from '../data/album.js'
import { useRouter } from 'vue-router'
const router = useRouter()

const albums = ref([])
const recherche = ref('')

onMounted(() => {
  setTimeout(() => {
    albums.value = albumsData
  }, 300)
})

function detailAlbum(id) {
  router.push(`/album/${id}`)
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
>
</div>

<h2 class="mb-4 fw-bold">
Albums populaires
</h2>

<div class="row g-4">
<div class="col-md-4" v-for="album in albums" @click="detailAlbum(album.id)">
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