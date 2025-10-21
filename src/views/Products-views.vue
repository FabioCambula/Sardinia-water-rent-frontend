<template>
  <div class="container-fluid">
  <div class="row d-flex">
    <div class="col-md-3 col-6 cursor-pointer justify-content-center text-center"><RouterLink class="nav-link" to="/products/diving-mask">
      <img src="../assets/img/products/maschera.jpg" class="figure-img img-fluid rounded" alt="maschera sub">
      <p>MASCHERA SUB</p>
      <span>Da 6,00 €</span>
     </RouterLink>
    </div>

    <div class="col-md-3 col-6 cursor-pointer justify-content-center text-center">
      <RouterLink class="nav-link" to="/products/kayak-1">
      <img src="../assets/img/products/kayak-1.jpg" class="figure-img img-fluid rounded" alt="maschera sub">
      <p>KAYAK 1 POSTO</p>
      <span>Da 18,00 €</span>
      </RouterLink>
    </div>
    <div class="col-md-3 col-6 cursor-pointer justify-content-center text-center">
      <RouterLink class="nav-link" to="/products/kayak-2">
      <img src="../assets/img/products/kayak.jpg" class="figure-img img-fluid rounded" alt="maschera sub">
      <p>KAYAK 2 POSTI</p>
      <span>Da 22,00 €</span>
      </RouterLink>
    </div>

    <div class="col-md-3 col-6 cursor-pointer justify-content-center text-center">
      <RouterLink class="nav-link" to="/products/kayak-3">
      <img src="../assets/img/products/kayak-3.jpg" class="figure-img img-fluid rounded" alt="maschera sub">
      <p>KAYAK 3 POSTI</p>
      <span>Da 24,00 €</span>
      </RouterLink>
    </div>
    <div class="col-md-3 col-6 cursor-pointer justify-content-center text-center">
      <RouterLink class="nav-link" to="/products/surf">
      <img src="../assets/img/products/surf.jpg" class="figure-img img-fluid rounded" alt="maschera sub">
      <p>TAVOLA SURF</p>
      <span>Da 18,00 €</span>
      </RouterLink>
    </div>
    <div class="col-md-3 col-6 cursor-pointer justify-content-center text-center">
      <RouterLink class="nav-link" to="/products/sup">
      <img src="../assets/img/products/sup.jpg" class="figure-img img-fluid rounded" alt="maschera sub">
      <p>STAND UP PADDLE</p>
      <span>Da 18,00 €</span>
      </RouterLink>
    </div>

    </div>
    </div>

</template>

<style scoped>
p{
  font-size: 1.2rem;
  font-weight: 600;
  color: #3dbcaf;
}
span{
  font-size: 1rem;
}
.row{
  margin: 6rem 0;

}

.col-md-3{
   box-shadow: 5px 5px 10px #cccccc18;
   transition: transform 0.4s ease;
   margin-bottom: 2rem;
}
.col-md-3:hover{
  transform: scale(1.02);
  box-shadow: 5px 5px 10px #cccccc84;
}
@media (max-width: 576px){

  .col-6:hover{
    transform: none;
  }
  p{
    font-size: 0.9rem;
    font-weight: 600;
  }
  span{
    font-size: 0.8rem;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .col-md-3 {
    flex: 0 0 calc(33.333% - 1rem);
    max-width: calc(33.333% - 1rem);
  }

  .row {
    gap: 1rem;
  }
}

</style>