<template>
  <div class="modal fade" id="registerModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Registrati</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <!-- Messaggi di feedback -->
          <p v-if="message" :class="messageType">
            {{ message }}
          </p>

          <form @submit.prevent="register">
            <div class="mb-3">
              <label>Nome</label>
              <input v-model="name" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label>Cognome</label>
              <input v-model="surname" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label>Email</label>
              <input v-model="email" type="email" class="form-control" required />
            </div>
            <div class="mb-3 position-relative">
              <label>Password <span class="span">(min. 6 caratteri)</span></label>
              <div class="input-group">
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  class="form-control"
                  required
                />
                <button type="button" @click="showPassword = !showPassword" class="eye btn btn-outline-secondary">
                <i v-if="showPassword" class="bi bi-eye-slash-fill"></i>
                <i v-else class="bi bi-eye-fill"></i>
                </button>

              </div>
            </div>
            <div class="mb-3">
              <label>Conferma Password</label>
              <input
                v-model="confirmPassword"
                :type="showPassword ? 'text' : 'password'"
                class="form-control"
                required
              />
            </div>
            <button class="registrati btn w-100">Registrati</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref , onMounted} from "vue"
import { useAuthStore } from "../stores/auth-stores"
import { Modal } from 'bootstrap'
import api from "../axios"

const name = ref("")
const surname = ref("")
const email = ref("")
const password = ref("")
const confirmPassword = ref("")
const showPassword = ref(false)

const message = ref("")
const messageType = ref("alert-info")

const authStore = useAuthStore()
let modalInstance = null

onMounted(() => {
  const modalEl = document.getElementById("registerModal")
  modalInstance = new Modal(modalEl)
})

const openModal = () => {
  modalInstance?.show()
}

const closeModal = () => {
  modalInstance?.hide()
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const register = async () => {
  message.value = ""
  if (password.value !== confirmPassword.value) {
    message.value = "Le password non coincidono"
    messageType.value = "alert-danger"
    return
  }
  if (password.value.length < 6) {
  message.value = "La password deve avere almeno 6 caratteri"
  messageType.value = "alert-danger"
  return
}

  try {
    
    const res = await api.post("/users/register", {
      name: name.value,
      surname: surname.value,
      email: email.value,
      password: password.value,
    })
    

    const { user, token } = res.data

    authStore.setUser(user, token)

    // Reset campi
    name.value = ""
    surname.value = ""
    email.value = ""
    password.value = ""
    confirmPassword.value = ""

    message.value = "Registrazione completata! Sei loggato."
    messageType.value = "alert-success"

    // Chiudi modal dopo 1s
    setTimeout(() => {
  const modalEl = document.getElementById("registerModal")
  const modal = Modal.getInstance(modalEl) || new Modal(modalEl)
  modal.hide()
  message.value = ""
}, 1000)

  } catch (err) {
    console.error(err)
    message.value = err.response?.data?.message || "Errore nella registrazione"
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
.span {
  font-size: 0.9rem;
  color: gray;
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
  
}
.form-control:focus {
  border-color: rgb(91, 181, 134);
  box-shadow: 0 0 0 0.2rem rgba(91, 181, 134, 0.25);
}
label{
  margin-bottom: 1rem;
}
.registrati{
  background-color:rgb(91, 181, 134);
  font-size: 1.1rem;
  margin-top: 1rem;
  color: white;
  font-weight: 600;
  border-radius: 0.7rem;
}

</style>
