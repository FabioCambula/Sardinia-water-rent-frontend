<template>
  <div v-if="auth.isLoggedIn && !auth.isAdmin">
    <div class="data">
      <VueDatePicker
        v-model="date"
        :min-date="new Date()"
        :enable-time-picker="false"
        locale="it"
        cancel-text="cancella"
        select-text="seleziona"
        range
        :multi-calendars="{ static: false }"
        :format="formatDate"
      />
    </div>

    <p class="my-3">Orario ritiro dalle 7:00, riconsegna entro le 20:00.</p>

    <!-- 🔹 Selettore quantità -->
    <div class="mb-3">
      <label for="quantity" class="form-label"><strong>Quantità:</strong></label>

      <!-- Desktop -->
      <div v-if="!isMobile" class="selector-box" @click="toggleDropdown">
        {{ quantity ? quantity : 'Seleziona una quantità' }}
        <i class="bi" :class="showDropdown ? 'bi-chevron-up' : 'bi-chevron-down'"></i>

        <transition name="fade">
          <ul v-if="showDropdown" class="options">
            <li
              v-for="n in 4"
              :key="n"
              @click.stop="selectQuantity(n)"
            >
              {{ n }}
            </li>
          </ul>
        </transition>
      </div>

      <!-- Mobile -->
      <div v-else>
        <button class="btn-picker" @click="showPicker = true">
          {{ quantity || 'Seleziona quantità' }}
        </button>

        <transition name="fade">
          <div v-if="showPicker" class="quantity-modal">
            <div class="picker-content">
              <h3>Seleziona la quantità</h3>
              <div class="picker-options">
                <button
                  v-for="n in 4"
                  :key="n"
                  @click="selectQuantity(n)"
                  class="picker-option"
                >
                  {{ n }}
                </button>
              </div>
              <button class="close-btn" @click="showPicker = false">Chiudi</button>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- 🔹 Messaggi utente -->
    <p v-if="msg" class="feedback-message">{{ msg }}</p>

    <!-- Pulsante prenotazione -->
    <button class="btn" @click="prenota">
      Aggiungi al carrello
    </button>
  </div>

  <div v-else>
    <p class="avviso">Registrati o effettua il login per prenotare i prodotti.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useCartStore } from "../stores/cart-stores";
import { useAuthStore } from "../stores/auth-stores";

const auth = useAuthStore();
const props = defineProps({ productId: { type: String, required: true } });

const date = ref();
const quantity = ref("");
const cart = useCartStore();
const msg = ref("");

// Stati per il selettore quantità
const showDropdown = ref(false);
const showPicker = ref(false);
const isMobile = ref(false);

onMounted(() => {
  isMobile.value = window.innerWidth <= 576;
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 1));
  date.value = [startDate, endDate];
});

// Dropdown desktop
function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

// Seleziona quantità
function selectQuantity(n) {
  quantity.value = n;
  showDropdown.value = false;
  showPicker.value = false;
}

// Formattazione date
const formatSingleDate = (d) => {
  const dt = d instanceof Date ? d : new Date(d);
  if (!dt || isNaN(dt.getTime())) return "";
  const day = String(dt.getDate()).padStart(2, "0");
  const month = String(dt.getMonth() + 1).padStart(2, "0");
  const year = dt.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatDate = (val) => {
  if (!val) return "";
  if (Array.isArray(val)) {
    const [s, e] = val;
    const fs = formatSingleDate(s);
    const fe = formatSingleDate(e);
    return fe ? `${fs} - ${fe}` : fs;
  }
  return formatSingleDate(val);
};

// 🔹 Prenotazione con messaggi
async function prenota() {
  msg.value = ""; // reset

  if (!date.value || !date.value[0] || !date.value[1]) {
    msg.value = "⚠️ Seleziona un intervallo di date valido.";
    return;
  }

  if (!quantity.value || quantity.value < 1) {
    msg.value = "⚠️ Seleziona una quantità valida.";
    return;
  }

  const [startDate, endDate] = date.value;

  try {
    await cart.addItem(
      props.productId,
      Number(quantity.value),
      startDate.toISOString(),
      endDate.toISOString()
    );
    msg.value = "✅ Prodotto aggiunto al carrello!";
    setTimeout(() => (msg.value = ""), 2500);
  } catch (err) {
    console.error(err);
    msg.value = "❌ Errore durante l'aggiunta al carrello.";
  }
}
</script>


<style scoped>
/* Bottone principale */
.btn {
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1.6rem;
  background-color: #3dbcaf;
  color: white;
  transition: transform 0.8s ease;
}
.btn:hover {
  background-color: #319b90;
  color: white;
  
}

/* Desktop select */
.custom-select {
  border-radius: 18px;
  border: 2px solid #3dbcaf;
  background-color: #f8fffd;
  padding: 0.8rem;
  transition: all 0.3s ease;
}
.custom-select:focus {
  border-color: #339a8f;
  box-shadow: 0 0 0 3px rgba(61, 188, 175, 0.3);
}

/* Mobile picker */
.btn-picker {
  width: 100%;
  border-radius: 18px;
  border: 2px solid #3dbcaf;
  background-color: #ffffff;
  color: #3dbcaf;
  font-weight: 600;
  padding: 0.7rem;
  text-align: left;
  transition: transform 0.3s ease;
}
.btn-picker:hover {
  transform: scale(1.02);
}

/* Modal mobile fullscreen */
.quantity-modal {
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.98);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.picker-content {
  text-align: center;
  width: 90%;
  max-width: 400px;
}
.picker-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;
}
.picker-option {
  background: #3dbcaf;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 18px;
  padding: 1rem;
  font-size: 1.3rem;
  transition: background 0.3s ease;
}
.picker-option:hover {
  background: #339a8f;
}
.close-btn {
  border: none;
  background: transparent;
  color: #d94e0a;
  font-size: 1.2rem;
  font-weight: 600;
}

/* Animazione */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 🌈 Datepicker personalizzato */
:global(:root) {
  --dp-font-family: "Montserrat", sans-serif;
  --dp-border-radius: 16px;
  --dp-cell-border-radius: 10px;
  --dp-primary-color: #3dbcaf;
  --dp-primary-text-color: #fff;
  --dp-background-color: #ffffff;
  --dp-text-color: #333;
  --dp-border-color-hover: #3dbcaf;
}
:deep(.dp__menu) {
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  border-radius: 16px;
  padding: 1rem;
}
:deep(.dp__cell_inner:hover) {
  background: #1976d2;
  transform: scale(1.05);
  border-radius: 8px;
}

/* Dropdown desktop */
.form-label{
  font-size: 1.2rem;
  font-weight: 600;
}
.selector-box {
  position: relative;
  border: 2px solid #3dbcaf;
  border-radius: 18px;
  margin-top: 1rem;
  padding: 0.8rem 1rem;
  font-weight: 600;
  background-color: #f8fffd;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.selector-box:hover {
  border-color: #339a8f;
  box-shadow: 0 2px 8px rgba(61, 188, 175, 0.2);
}

.selector-box i {
  font-size: 1.2rem;
  color: #3dbcaf;
  transition: transform 0.3s ease;
}

.options {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 5px;
  list-style: none;
  padding: 0;
  background: #ffffff;
  border: 2px solid #3dbcaf;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  overflow: hidden;
  z-index: 10;
}

.options li {
  padding: 0.8rem 1rem;
  transition: background 0.3s ease;
  cursor: pointer;
}

.options li:hover {
  background: #3dbcaf;
  color: white;
}

/* Transizione fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
/* Messaggi utente */
.feedback-message {
  margin-top: 1rem;
  font-weight: 600;
  font-size: 1rem;
}
.feedback-message:has(.success) {
  color: green;
}
.feedback-message:has(.error) {
  color: red;
}

/* Responsive full screen datepicker */
@media (max-width: 1024px) {
  :deep(.dp__menu) {
    position: fixed !important;
    top: 0;
    left: 0;
    width: 100vw !important;
    height: 100vh !important;
    border-radius: 0 !important;
    z-index: 2000;
  }
  .btn{
    width: 100%;
    font-size: 1rem;
    display: block;
    margin: 2rem auto 0;
  }
  .btn-picker{
    text-align: center;
    margin-top: 1rem;
  }
}
</style>
