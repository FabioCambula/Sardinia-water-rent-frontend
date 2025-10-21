<template>
  <div class="container py-5">
    <h2>Dashboard Admin</h2>

    <!-- Prenotazioni -->
    <h3 class="mt-4">Prenotazioni</h3>

    <!-- Tabs -->
    <ul class="nav nav-tabs mb-3">
      <li class="nav-item">
        <button
          class="nav-link"
          :class="{ active: showActive }"
          @click="showActive = true"
        >
          Attive
        </button>
      </li>
      <li class="nav-item">
        <button
          class="nav-link"
          :class="{ active: !showActive }"
          @click="showActive = false"
        >
          Completate
        </button>
      </li>
    </ul>

    <div class="booking-list-container">
      <ul
        v-if="visibleBookings.length"
        class="list-group mb-0"
      >
        <li
          v-for="booking in visibleBookings"
          :key="booking._id"
          class="list-group-item"
        >
          <div>
            <strong>Utente:</strong>
            {{ booking.user.name }} ({{ booking.user.email }})
          </div>
          <div>
            <strong>Prodotti:</strong>
            <ul>
              <li class="prodotti" v-for="item in booking.products" :key="item._id">
                {{ item.product.name }} x {{ item.quantity }}
                ({{ formatDate(item.startDate) }} - {{ formatDate(item.endDate) }})
                <span
                  class="badge ms-2"
                  :class="statusClass(item.status)"
                >
                  {{ item.status }}
                </span>
                <button
                  v-if="item.status === 'confirmed'"
                  class="prodotti btn  ms-3"
                  @click="completeBookingItem(booking._id, item._id)"
                >
                  Completa
                </button>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <div v-else class="p-3">Nessuna prenotazione trovata.</div>
    </div>

    <!-- Prodotti in stock -->
    <h3 class="mt-4">Prodotti in stock</h3>
    <div v-if="loadingProducts">Caricamento prodotti...</div>
    <ul v-else class="stock list-group">
      <li
        v-for="product in products"
        :key="product._id"
        class="stock list-group-item d-flex justify-content-between"
      >
        {{ product.name }}
        <span>Stock: {{ product.stock }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import api from "../axios";

const bookings = ref([]);
const products = ref([]);
const loadingProducts = ref(true);
const showActive = ref(true);

const fetchBookings = async () => {
  try {
    const { data } = await api.get("/bookings"); // admin-only
    bookings.value = data;
  } catch (err) {
    console.error(err);
  }
};

const fetchProducts = async () => {
  loadingProducts.value = true;
  try {
    const { data } = await api.get("/products");
    products.value = data;
  } catch (err) {
    console.error(err);
  } finally {
    loadingProducts.value = false;
  }
};

// filtra in base al tab selezionato
const visibleBookings = computed(() => {
  return bookings.value.filter((b) =>
    b.products.some((item) =>
      showActive.value ? item.status === "confirmed" : item.status === "completed"
    )
  );
});

const completeBookingItem = async (bookingId, itemId) => {
  try {
    await api.put(`/bookings/${bookingId}/items/${itemId}`, {
      status: "completed",
    });
    await fetchBookings();
    await fetchProducts();
  } catch (err) {
    console.error(err);
  }
};

const formatDate = (d) => new Date(d).toLocaleDateString();

const statusClass = (status) => {
  switch (status) {
    case "confirmed":
      return "badge bg-warning";
    case "completed":
      return "badge bg-success";
    default:
      return "badge bg-secondary";
  }
};

onMounted(() => {
  fetchBookings();
  fetchProducts();
});
</script>

<style scoped>
.booking-list-container {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 18px;
  margin-bottom: 2rem;
  margin-top: 1rem;
}
h2{
  margin-top: 60px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 4rem;
}
h3{
  font-weight: 600;
  margin-bottom: 2rem;
}
li.prodotti{
  margin-bottom: 1rem;
}
/* button.prodotti{
  border-radius: 10px;
  border-bottom: solid #339a8f 3px;
  transition: transform 0.4s ease;
  color: #339a8f;
  font-weight: 600;
} */
 button.prodotti{
  position: absolute;
  right: 1rem;
  border-radius: 10px;
  border: none;
  font-size: 0.9rem;
  background-color: #3dbcaf;
  color: white;
  font-weight: 600;
  transition: transform 0.4s ease, background-color 0.4s ease;
}
button.prodotti:hover{
  transform: scale(1.1);
  color: white;
  background-color: #339a8f;
}
li.stock{
  padding: 1rem;
  font-size: 1.2rem;
}
ul.stock{
  border-radius: 18px;
}
button.nav-link{
  font-size: 1.1rem;
  color: rgb(106, 145, 223);
  font-weight: 600;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  transition: transform 0.4s ease;
}
.nav-link.active{
  color:#339a8f!important;
}
span{
  font-weight: 600;
}
@media (max-width: 576px){
  .booking-list-container {
    max-height: 300px; /* regola come preferisci */
    overflow-y: auto;
    border: 1px solid #ddd;
    border-radius: 18px;
    margin-bottom: 2rem;
    margin-top: 1rem;
  }
  h2{
    font-size: 1.4rem;
    margin-top: 30px;
    margin-bottom: 2rem;
  }
  h3{
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  li.stock{
    padding: 1rem;
    font-size: 1rem;
  }
  button.nav-link{
    font-size: 1rem;
    padding: 0.5rem;
  }
  li.prodotti{
    font-size: 0.8rem;
    padding: 1rem;
    
  }
  button.prodotti{
    font-size: 0.8rem;
    padding: 0.3rem 0.6rem;
  }
}
</style>
