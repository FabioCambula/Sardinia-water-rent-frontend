<script setup>
import { ref, onMounted } from "vue";
import { Modal } from "bootstrap";
import api from "../axios";
import { useCartStore } from "../stores/cart-stores";

const cartStore = useCartStore();
let modalInstance = null;
const successMsg = ref("");
const loading = ref(false);

onMounted(() => {
  const modalEl = document.getElementById("cartModal");
  modalInstance = new Modal(modalEl, { backdrop: "static" });
});

const confirmOrder = async () => {
  loading.value = true;
  successMsg.value = "";
  try {
    await api.post("/bookings"); // crea prenotazioni
    await cartStore.getCart();   // svuota carrello
    successMsg.value = "✅ Ordine confermato con successo!";
    setTimeout(() => {
      successMsg.value = "";
      closeModal();
    }, 2000);
  } catch (err) {
    console.error(err);
    successMsg.value = "❌ Errore durante la conferma dell’ordine.";
  } finally {
    loading.value = false;
  }
};

// Mostra modal
const openModal = async () => {
  await cartStore.getCart();
  modalInstance?.show();
};

// Chiudi modal
const closeModal = () => {
  modalInstance?.hide();
};

const formatDate = (date) => new Date(date).toLocaleDateString("it-IT");

defineExpose({ openModal, closeModal });
</script>

<template>
  <div class="modal fade" id="cartModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Il tuo Carrello</h5>
          <button type="button" class="x btn-close" @click="closeModal"></button>
        </div>

        <div class="modal-body">
          <div v-if="cartStore.loading">Caricamento...</div>
          <div v-else-if="cartStore.items.length === 0">Il carrello è vuoto.</div>
          <ul v-else class="list-group">
            <li
              v-for="item in cartStore.items"
              :key="item._id"
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              <div class="left">
                <strong>{{ item.product.name }}</strong><br />
                Dal {{ formatDate(item.startDate) }} al {{ formatDate(item.endDate) }}<br />
                Quantità: {{ item.quantity }}
              </div>
              <div class="right">
                {{ item.totalPrice.toFixed(2) }} €
                <button
                  class="btn delete ms-2"
                  @click="cartStore.removeItem(item._id)"
                >
                  Rimuovi
                </button>
              </div>
            </li>
          </ul>

          <!-- 🔹 Messaggio feedback -->
          <p v-if="successMsg" class="mt-3 text-center fw-bold" :class="{
            'text-success': successMsg.includes('✅'),
            'text-danger': successMsg.includes('❌')
          }">
            {{ successMsg }}
          </p>
        </div>

        <div class="modal-footer">
          <div class="totale me-auto fw-bold">
            Totale: {{ cartStore.totalPrice.toFixed(2) }} €
          </div>
          <button class="btn conferma" :disabled="loading" @click="confirmOrder">
            <span v-if="loading">⏳ Conferma in corso...</span>
            <span v-else>Conferma Ordine</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scooped>
div.left{
  font-size: 1rem;
  border-radius: 10px;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
}
.right{
  font-size: 1rem;
  border-radius: 10px;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
}
button.delete{
  border-radius: 8px;
  color: rgb(241, 99, 47);
  font-weight: 600;
  transition: transform 0.4s ease;
}
button.delete:hover{
  transform: scale(1.1);
  color: #d94e0a;
  
}
.btn.conferma {
  background-color: #3dbcaf;
  color: white;
  border: none;
  transition: background 0.3s;
}
.btn.conferma:hover {
  background-color: #33a296;
  color: white;
}
@media (max-width: 576px){
  
  .right{
    text-align: center;
  }
  .totale{
    text-align: center;
    width: 100%;
    font-size: 1.6rem;
  }
}
</style>
