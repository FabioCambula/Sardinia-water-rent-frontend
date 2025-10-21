<script setup>
import { onMounted } from "vue";
import { Modal } from "bootstrap";
import { useCartStore } from "../stores/cart-stores";

const cartStore = useCartStore();
let modalInstance = null;

onMounted(() => {
  const modalEl = document.getElementById("cartModal");
  modalInstance = new Modal(modalEl, { backdrop: "static" });
});

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

// Esponi funzioni per la navbar
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
        </div>

        <div class="modal-footer">
          <div class="totale me-auto fw-bold">
            Totale: {{ cartStore.totalPrice.toFixed(2) }} €
          </div>
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
