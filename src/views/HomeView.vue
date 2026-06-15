<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
<div class="container">

<a class="navbar-brand fw-bold" href="#">
🎵 Sunu-Khasida
</a>

<button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu">
<span class="navbar-toggler-icon"></span>
</button>

<div class="collapse navbar-collapse" id="menu">

<ul class="navbar-nav ms-auto">

<li class="nav-item">
<a class="nav-link" href="#">Accueil</a>
</li>

<li class="nav-item">
<a class="nav-link" href="#">Albums</a>
</li>

<li class="nav-item">
<a class="nav-link" href="#">Favoris</a>
</li>

</ul>

</div>

</div>
</nav>

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

<div class="col-md-4">
<div class="card album-card">

<img
src="https://picsum.photos/400/300?1"
class="card-img-top"
>

<div class="card-body">

<h5>Matlaboul Fawzayni</h5>

<p class="text-muted">
Cheikh Ahmadou Bamba
</p>

</div>

</div>
</div>

<div class="col-md-4">
<div class="card album-card">

<img
src="https://picsum.photos/400/300?2"
class="card-img-top"
>

<div class="card-body">

<h5>Jazbul Qulub</h5>

<p class="text-muted">
Khassaïdes
</p>

</div>

</div>
</div>

<div class="col-md-4">
<div class="card album-card">

<img
src="https://picsum.photos/400/300?3"
class="card-img-top"
>

<div class="card-body">

<h5>Mawahibou</h5>

<p class="text-muted">
Récitations
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
</template>