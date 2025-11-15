<template>
  <div class="container-fluid">
    <RouterLink class="nav-link" to="/products">
      <i class="bi bi-caret-left"></i> Prodotti
    </RouterLink>

    <div v-if="loading" class="text-center my-5">
      <p>Caricamento...</p>
    </div>

    <div v-else-if="product" class="row">
      <div class="col-lg-5">
        <img :src="product.img" class="figure-img img-fluid rounded" :alt="product.name" />
      </div>

      <div class="descrizione col-lg-4 d-flex flex-column justify-content-center">
        <h2>{{ product.name }}</h2>
        <p>{{ product.description }}</p>
        <h4>Da {{ product.price }},00 € al giorno</h4>
        <div class="calendar">
          <Calendar :productId="product._id" />
        </div>
      </div>
    </div>

    <div v-else class="text-center my-5">
      <p>Prodotto non trovato</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/axios'
import Calendar from '@/components/Calendar.vue'

const route = useRoute()
const product = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const { data } = await api.get(`/products/${route.params.id}`)
    product.value = data
  } catch (error) {
    console.error('Errore nel caricamento prodotto:', error)
  } finally {
    loading.value = false
  }
})
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
  margin-top: -10rem;
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
