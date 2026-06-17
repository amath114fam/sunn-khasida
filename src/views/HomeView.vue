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
```vue
<template>

<div class="home">

<!-- HERO -->

  <section class="hero">

  <div class="overlay"/>

    <div class="hero-content">

      <span class="badge-app">

      🎵 Bibliothèque numérique

      </span>

      <h1>

      Sunu
      <span>Khasida</span>

      </h1>

      <p>

      Découvrez, écoutez et explorez
      les Khassaïdes dans une expérience moderne.

      </p>

      <button
      class="hero-btn"
      >

      Découvrir les albums

      </button>

    </div>

  </section>


  <!-- CONTENU -->

  <section class="contenu">

    <div class="container">


    <!-- RECHERCHE -->

    <div class="search-box">

    <input
    type="text"
    placeholder="Rechercher un album ou une chanson..."
    v-model="recherche"
    />

    </div>


    <!-- RESULTAT -->

    <div
    v-if="chansonsFiltrees.length"
    class="resultats"
    >

    <h2>

    🎧 Résultats

    </h2>

    <div
    class="result-card"

    v-for="r in chansonsFiltrees"

    :key="r.id"

    @click="allerAChanson(r.albumId,r.id)"

    >

    <img :src="r.albumCover"/>

    <div>

    <h5>

    {{ r.chansonTitre }}

    </h5>

    <p>

    {{ r.albumTitre }}

    </p>

    </div>

    </div>

    </div>


    <!-- ALBUM -->

    <div class="albums">

      <div class="titre">

      Albums populaires

      </div>

      <div class="grille">

        <div
        class="album"

        v-for="album in albumsFiltres"

        :key="album.id"

        @click="detailAlbum(album.id)"
        >

        <div class="image">

          <img
          :src="album.cover"
          />

          </div>

          <div class="infos">

          <h5>

          {{ album.titre }}

          </h5>

          <p>

          {{ album.artiste }}

          </p>

        </div>

      </div>

      </div>

    </div>

    </div>

  </section>


  <footer>

  <h3>

  Sunu-Khasida

  </h3>

  <p>

  Une expérience moderne dédiée aux Khassaïdes

  </p>

  </footer>

</div>

</template>



<style scoped>

.home{

background:

#090909;

color:white;

min-height:100vh;

}


/* HERO */

.hero{

height:85vh;

position:relative;

display:flex;

justify-content:center;

align-items:center;

text-align:center;

overflow:hidden;

background:url("https://images.unsplash.com/photo-1512632578888-169bbbc64f33")
center/cover;
}

.overlay{

position:absolute;

inset:0;

background:linear-gradient(
180deg,
rgba(0,0,0,.2),
rgba(9,9,9,.95)
);
}

.hero-content{

position:relative;

max-width:900px;

padding:20px;
}

.badge-app{

padding:10px 18px;

background:rgba(255,255,255,.08);

backdrop-filter:

blur(14px);

border-radius:999px;

display:inline-block;

margin-bottom:30px;
}

.hero h1{

font-size:6rem;

font-weight:900;

line-height:.95;

margin-bottom:22px;
}

.hero span{

color:#1ed760;
}

.hero p{

font-size:1.3rem;

color:#d0d0d0;

margin-bottom:40px;
}

.hero-btn{

background:linear-gradient(
135deg,
#1ed760,
#149a44
);

padding:18px 40px;

border:none;

border-radius:999px;

font-size:1.05rem;

font-weight:700;

cursor:pointer;

transition:.3s;
}

.hero-btn:hover{

transform:translateY(-4px);

box-shadow:0 10px 20px rgba(30,215,96,.25);

}


/* SECTION */

.contenu{

padding:80px 0;
background-color: #010917;
}

.search-box{

max-width:820px;

margin:auto;

margin-bottom:60px;
}

.search-box input{

width:100%;

background:rgba(255,255,255,.05);

border:none;

color:white;

padding:22px;

border-radius:20px;

font-size:1rem;

backdrop-filter:

blur(12px);

outline:none;
}


/* RESULTAT */

.resultats{

margin-bottom:70px;
}

.resultats h2{

margin-bottom:30px;
}

.result-card{

display:flex;

align-items:center;

gap:18px;

padding:18px;

margin-bottom:12px;

border-radius:18px;

background:rgba(255,255,255,.04);

cursor:pointer;

transition:.3s;
}

.result-card:hover{

transform:

translateX(8px);

background:rgba(255,255,255,.08);
}

.result-card img{

width:70px;

height:70px;

border-radius:14px;

object-fit:cover;
}

.result-card p{

color:#aaa;

margin:0;
}


/* ALBUM */

.titre{

font-size:2rem;

font-weight:800;

margin-bottom:30px;
}

.grille{

display:grid;

grid-template-columns:

repeat(
auto-fill,
minmax(260px,1fr)
);

gap:28px;
}

.album{

cursor:pointer;

background-color: #141926;

border-radius:24px;

overflow:hidden;

transition:.35s;
}

.album:hover{

transform:

translateY(-12px);
}

.image{

overflow:hidden;
}

.image img{

width:100%;

height:320px;

object-fit:cover;

transition:.5s;
}

.album:hover img{

transform:

scale(1.08);
}

.infos{

padding:20px;
}

.infos p{

color:#aaa;
}


/* FOOTER */

footer{

padding:60px;

text-align:center;

border-top:1px solid rgba(255,255,255,.05);

color:#aaa;
background-color: #021128;
}


/* MOBILE */

@media(max-width:768px){

.hero h1{

font-size:3rem;
}

.hero p{

font-size:1rem;
}

}

</style>
```
