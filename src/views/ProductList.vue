<template>
  <div class="container-fluid">
    <div v-if="loading" class="text-center my-5">
      <p>Caricamento prodotti...</p>
    </div>
    
    <div v-else class="row d-flex">
      <div
        v-for="product in products"
        :key="product._id"
        class="col-md-3 col-6 cursor-pointer justify-content-center text-center"
      >
        <RouterLink class="nav-link" :to="`/products/${product._id}`">
          <img :src="product.img" class="figure-img img-fluid rounded" :alt="product.name" />
          <p>{{ product.name }}</p>
          <span>Da {{ product.price }},00 €</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/axios'

const products = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const { data } = await api.get('/products')
    products.value = data
  } catch (error) {
    console.error('Errore nel caricamento prodotti:', error)
  } finally {
    loading.value = false
  }
})
</script>

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