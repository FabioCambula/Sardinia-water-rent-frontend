<template>
  <nav class="navbar navbar-expand-lg navbar-light px-3 fixed-top">
    <div class="container-fluid">
      <!-- Brand -->
      <RouterLink class="navbar-brand" to="/" @click="closeMenu">
        Sardinia Water Rent
      </RouterLink>
      <button
            v-if="auth.isLoggedIn && !auth.isAdmin"
            class="bag position-relative"
            @click="cartModalRef.openModal()"
          >
            <i class="bi bi-bag"></i>
            <span
              v-if="cart.items.length > 0"
              class="numero position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            >
              {{ cart.items.length }}
            </span>
          </button>

      <!-- Bottone per toggle su mobile -->
      <button
        class="navbar-toggler"
        type="button"
        @click="toggleMenu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Links -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/" @click="closeMenu">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/products" @click="closeMenu">Prodotti</RouterLink>
          </li>
          <li v-if="auth.isLoggedIn && !auth.isAdmin" class="nav-item">
            <RouterLink class="nav-link" to="/bookings" @click="closeMenu">Prenotazioni</RouterLink>
          </li>
          <li v-if="auth.isAdmin" class="nav-item">
            <RouterLink class="nav-link" to="/dashboard" @click="closeMenu">Dashboard</RouterLink>
          </li>
        </ul>

        <!-- Azioni a destra -->
        <div class="d-flex align-items-center gap-4">
          <!-- Carrello (solo se loggato come utente) -->
          

          <!-- Utente loggato -->
          <div v-if="auth.isLoggedIn">
            <span class="saluto me-3">Ciao, {{ auth.user.name }}</span>
            <button @click="logout" class="logout ms-3">Logout</button>
          </div>

          <!-- Utente NON loggato -->
          <div v-else>
            <button class="accedi" @click="loginModalRef.openModal()">Accedi</button>
            <button class="registrati" @click="registerModalRef.openModal()">Registrati</button>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Modali sempre presenti nel DOM -->
  <LoginModal ref="loginModalRef" />
  <RegisterModal ref="registerModalRef" />
  <CartModal ref="cartModalRef" />
</template>

<script setup>
import { RouterLink } from "vue-router"
import { useAuthStore } from "../stores/auth-stores"
import { useCartStore } from "../stores/cart-stores"
import { ref, watchEffect, onMounted } from "vue"
import * as bootstrap from "bootstrap"

import LoginModal from "./LoginModal.vue"
import RegisterModal from "./RegisterModal.vue"
import CartModal from "./CartModal.vue"

const loginModalRef = ref(null)
const registerModalRef = ref(null)
const cartModalRef = ref(null)

const auth = useAuthStore()
const cart = useCartStore()

let collapseInstance = null

onMounted(() => {
  const navbar = document.getElementById("navbarNav")
  collapseInstance = new bootstrap.Collapse(navbar, { toggle: false })
})

const toggleMenu = () => {
  const navbar = document.getElementById("navbarNav")
  if (collapseInstance) {
    if (navbar.classList.contains("show")) {
      collapseInstance.hide()
    } else {
      collapseInstance.show()
    }
  }
}

const closeMenu = () => {
  if (collapseInstance) collapseInstance.hide()
}

// 🔹 Quando l'utente è loggato, carica subito il carrello
watchEffect(() => {
  if (auth.isLoggedIn && !auth.isAdmin) {
    cart.getCart()
  }
})

const logout = () => {
  auth.logout()
}
</script>

<style scoped>
* {
  font-family: "Montserrat", sans-serif;
  font-size: 1.2rem;
  max-width: 100vw;
}
.navbar {
  padding: 1.5rem;
  background-color: white;
}
.navbar-brand {
  font-size: 1.4rem;
  font-weight: 700;
  color: #3dbcaf !important;
}
.nav-link {
  transition: color 0.3s ease-in-out;
  font-weight: 600;
}
.nav-link:hover {
  color: #3dbcaf;
}
.router-link-active {
  color: #3dbcaf !important;
}
.bag {
  background-color: white;
  border: none;
  margin-right: 1rem;
  color: #3dbcaf;
  transition: transform 0.4s ease;
}
.bag:hover {
  color: #339a8f;
  transform: scale(1.1);
}
.accedi {
  background-color:white;
  font-size: 1.2rem;
  margin: 10px;
  color: rgb(241, 99, 47);
  font-weight: 600;
  border: none;
  transition: transform 0.4s ease;
}
.accedi:hover {
  transform: scale(1.1);
  color: #d94e0a;
}
.registrati {
  background-color: white;
  font-size: 1.2rem;
  margin: 10px;
  color: #3dbcaf;
  font-weight: 600;
  border: none;
  transition: transform 0.4s ease;
}
.registrati:hover {
  color: #339a8f;
  transform: scale(1.1);
}
.logout {
  background-color:white;
  font-size: 1.2rem;
  margin-right: 1rem;
  color: rgb(241, 99, 47);
  font-weight: 600;
  border:none;
  transition: transform 0.4s ease;
  border-bottom: #d94e0a solid 2px;
  border-radius: 10px;
}
.logout:hover {
  transform: scale(1.1);
  color: #d94e0a;
}
.saluto{
  font-size: 1.2rem;
  text-transform: capitalize;

}
.numero{
  font-size: 0.7rem;
}
@media (max-width: 1024px) {
  .navbar {
    padding: 1.8rem 1rem;
  }

  .navbar-brand {
    font-size: 1.2rem;
    margin-right: 0;
    flex-grow: 1; /* spinge il brand a sinistra */
  }

  .navbar-toggler {
    border: none;
    font-size: 1.2rem;
    margin-left: auto; /* spinge il toggler verso destra */
  }
  .navbar-toggler:focus {
    box-shadow: none; /* rimuove il bordo di focus */
  }

  /* Nascondiamo il testo di saluto su mobile */
  .saluto {
    display: none;
  }

  /* Bottoni dentro menu -> testo più piccolo */
  .accedi,
  .registrati,
  .logout {
    font-size: 1.1rem;
    width: 100%;
    text-align: left;
    margin: 0 !important;;
    padding-left: 0;
    border: none;
  }

  /* Icona carrello rimane visibile accanto al toggler */
  .bag {
    font-size: 1.2rem;
    margin-right: 0.5rem;
  }

  .numero {
    font-size: 0.7rem;
  }
  .nav-link {
    font-size: 1.2rem;
  }
}
@media (min-width: 768px) and (max-width: 1024px){
  .accedi{
    margin: 0;
    padding-left: 0;
  }
}
</style>
