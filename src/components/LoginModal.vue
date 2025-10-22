<template>
  <div class="modal fade" id="loginModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Login</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <!-- Messaggi di feedback -->
          <p v-if="message" :class="messageType">
            {{ message }}
          </p>

          <form @submit.prevent="login">
            <div class="mb-3">
              <label>Email</label>
              <input v-model="email" type="email" class="form-control" required />
            </div>
            <div class="mb-3">
              <label>Password</label>
              <input v-model="password" type="password" class="form-control" required />
            </div>
            <button class="accedi btn w-100">Accedi</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useAuthStore } from "../stores/auth-stores"
import { Modal } from "bootstrap"
import api from "../axios"

const email = ref("")
const password = ref("")
const authStore = useAuthStore()

const message = ref("")
const messageType = ref("alert-info")

let modalInstance = null

onMounted(() => {
  const modalEl = document.getElementById("loginModal")
  modalInstance = new Modal(modalEl)
})

const openModal = () => {
  modalInstance?.show()
}

const closeModal = () => {
  modalInstance?.hide()
}

const login = async () => {
  message.value = ""
  try {
    const res = await api.post("/users/login", {
      email: email.value,
      password: password.value,
    })

    const { user, token } = res.data
    authStore.setUser(user, token)

    message.value = "Login riuscito!"
    messageType.value = "alert-success"

    setTimeout(() => {
      closeModal()
      message.value = ""
    }, 1000)
  } catch (err) {
    console.error(err)
    message.value = err.response?.data?.message || "Credenziali errate"
    messageType.value = "alert-danger"
  }
}

defineExpose({ openModal, closeModal })
</script>

<style scoped>
.alert-success {
  color: green;
  font-weight: 600;
}

.alert-danger {
  color: red;
  font-weight: 600;
}
h5.modal-title {
  font-weight: 600;
  font-size: 1.5rem;
}
.form-control {
  border-radius: 0.7rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.accedi{
  background-color:rgb(106, 145, 223);
  font-size: 1.1rem;
  margin-top: 1rem;
  color: white;
  font-weight: 600;
  border-radius: 0.7rem;
}
</style>