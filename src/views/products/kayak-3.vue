<template>
    <RouterLink class="nav-link" to="/products"><i class="bi bi-caret-left"></i>Prodotti</RouterLink>
  <div class="container-fluid">
    <div class="row">
      <!-- Immagine -->
      <div class="col-lg-5">
        <img
          src="../../assets/img/products/kayak-3.jpg"
          class="figure-img img-fluid rounded"
          alt="Kayak 1 posto"
        />
      </div>

      <!-- Dettagli prodotto -->
      <div class="descrizione col-lg-4 d-flex flex-column justify-content-center">
        <h2>KAYAK 3 POSTI</h2>
        <p>
          Spazioso e sicuro, adatto a famiglie o gruppi di amici. Consente di pagaiare insieme e godersi il mare in totale relax.
        </p>
        <h4>Da 24,00 € al giorno</h4>
        <div class="calendar"><Calendar productId="68d3f1b5ccd38cdf9c2d505b"/></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Calendar from '@/components/Calendar.vue';
</script>

<style scoped>
.calendar{
  height: 450px;
}
.descrizione{
  padding-top: 4rem;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.nav-link{
  color: #3dbcaf;
  font-weight: bold;
  font-size: 1.4rem;
  margin-left: 2rem;
  padding-top: 100px;
  
}
.nav-link:hover{
  color: #339a8f;
  transition: color 0.3s ease-in-out;
}
h2{
  font-weight: 600;
  font-size: 1.6rem;
  color:rgb(241, 99, 47)
}
h4{
  font-weight: 600;
  font-size: 1.3rem;
}
img{
  margin-top: -6rem;
  object-fit:fill;
}
p{
  font-size: 1.2rem;
}
@media (max-width: 1023px){

  .nav-link{
    padding-top: 80px;
    margin-left: 0rem;
    font-size: 1.2rem;
  }
  img{
    margin-top: 2rem;
  }
  p{
    font-size: 1rem;
  }
  h2{
    padding-bottom: 1rem;
    font-size: 1.2rem;
  }
  h4{
    font-size: 1rem;
    padding-bottom: 1rem;
  }
}
</style>
