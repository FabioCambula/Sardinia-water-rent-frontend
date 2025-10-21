<template>
  <div class="container">
    <h2 class="mb-4">Il tuo carrello</h2>
    <div v-if="cart.loading">Caricamento carrello...</div>
    <div v-else-if="cart.items.length === 0">Il carrello è vuoto.</div>
    <ul v-else class="list-group mb-3">
      <li
        v-for="item in cart.items"
        :key="item._id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        {{ item.product.name }} x {{ item.quantity }}
        ({{ formatDate(item.startDate) }} - {{ formatDate(item.endDate) }})

        <div class="row d-flex align-items-center">
          <div class="prezzo col-md-3">{{ item.totalPrice.toFixed(2) }}€</div>
          <div class="col-md-3"><button
            class="delete btn ms-2"
            @click="cart.removeItem(item._id)"
          >
            Rimuovi
          </button></div>
          
        </div>
      </li>
    </ul>
    <p class="avviso">ATTEZIONE, controlla attentamente i dati: dopo la conferma non potranno più essere modificati. <br>
    I pagamenti verranno effettuati in sede al momento del ritiro.</p>

    <div v-if="cart.items.length > 0" class="mb-4">
      <strong>Totale: {{ cart.totalPrice.toFixed(2) }} €</strong>
      <button class="confirm btn ms-3" @click="confirmOrder">
        Conferma Ordine
      </button>
    </div>

    <h2>I tuoi ordini</h2>
     <div v-if="loadingOrders">Caricamento ordini...</div> 
     <div v-else-if="orders.length === 0">Non hai ancora ordini.</div> <ul v-else class="list-group my-4"> 
      <li v-for="order in orders" :key="order._id" class="list-group-item "> 
        <div v-for="item in order.products" :key="item._id" class="mb-4"> {{ item.product.name }} x {{ item.quantity }} ({{ formatDate(item.startDate) }} - {{ formatDate(item.endDate) }}) </div> <strong>Totale: {{ order.totalPrice.toFixed(2) }} €</strong> <span class="badge bg-info ms-2">{{ order.status }}</span> 
        </li> 
        </ul>
         </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../axios";
import { useCartStore } from "../stores/cart-stores";

const cart = useCartStore();

const orders = ref([]);
const loadingOrders = ref(true);

const fetchOrders = async () => {
  loadingOrders.value = true;
  try {
    const { data } = await api.get("/bookings/mine");
    orders.value = data || [];
  } catch (err) {
    console.error(err);
  } finally {
    loadingOrders.value = false;
  }
};

const confirmOrder = async () => {
  try {
    await api.post("/bookings"); // crea prenotazioni dal carrello
    await cart.getCart();        // svuota carrello
    await fetchOrders();         // aggiorna lista ordini
  } catch (err) {
    console.error(err);
  }
};

const formatDate = (d) => new Date(d).toLocaleDateString();

onMounted(() => {
  cart.getCart();
  fetchOrders();
});
</script>
<style scooped>
div.container{
  padding-top: 100px;
  
}
.avviso{
  color: rgb(238, 69, 69);
  font-weight: bold;
}

button.delete{
  border-radius: 10px;
  border-bottom: #d94e0a 2px solid;
  color: rgb(241, 99, 47);
  font-weight: 600;
  transition: transform 0.4s ease;
}
button.delete:hover{
  border-bottom: #d94e0a 2px solid;
  transform: scale(1.1);
  color: #d94e0a;
  
}
h2{
  font-weight: 600 !important;
}
ul.list-group{
  border-radius: 18px;
}
button.confirm{
  background-color: white;
  color: #3dbcaf;
  border-bottom: #339a8f 2px solid;
  border-radius: 10px;
  font-weight: 600;
  transition: transform 0.4s ease;
}
button.confirm:hover{
  transform: scale(1.1);
  color: #339a8f;
  border-bottom: #339a8f 2px solid;
}
@media (max-width: 576px){
  .prezzo{
    text-align: center;
  }
}
</style>
