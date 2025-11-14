<template>
  <div class="modal fade" id="registerModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <h5 class="modal-title">Registrati</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <div class="modal-body">

          <!-- Messaggio globale -->
          <div v-if="globalMessage" :class="['alert', globalType]">
            {{ globalMessage }}
          </div>

          <form @submit.prevent="register">

            <!-- Nome -->
            <div class="mb-3">
              <label>Nome</label>
              <input 
                v-model="name"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.name }"
              />
              <div v-if="errors.name" class="invalid-feedback">
                {{ errors.name }}
              </div>
            </div>

            <!-- Cognome -->
            <div class="mb-3">
              <label>Cognome</label>
              <input 
                v-model="surname"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.surname }"
              />
              <div v-if="errors.surname" class="invalid-feedback">
                {{ errors.surname }}
              </div>
            </div>

            <!-- Email -->
            <div class="mb-3">
              <label>Email</label>
              <input 
                v-model="email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors.email }"
              />
              <div v-if="errors.email" class="invalid-feedback">
                {{ errors.email }}
              </div>
            </div>

            <!-- Password -->
            <div class="mb-3">
              <label>Password <span class="span">(min. 6 caratteri)</span></label>

              <div class="input-group">
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  class="form-control"
                  :class="{ 'is-invalid': errors.password }"
                />
                <button type="button" @click="showPassword = !showPassword" class="btn btn-outline-secondary">
                  <i v-if="showPassword" class="bi bi-eye-slash-fill"></i>
                  <i v-else class="bi bi-eye-fill"></i>
                </button>

                <div v-if="errors.password" class="invalid-feedback d-block">
                  {{ errors.password }}
                </div>
              </div>
            </div>

            <!-- Conferma password -->
            <div class="mb-3">
              <label>Conferma Password</label>
              <input
                v-model="confirmPassword"
                :type="showPassword ? 'text' : 'password'"
                class="form-control"
                :class="{ 'is-invalid': errors.confirmPassword }"
              />
              <div v-if="errors.confirmPassword" class="invalid-feedback">
                {{ errors.confirmPassword }}
              </div>
            </div>

            <button 
              class="btn btn-primary w-100"
              :disabled="loading"
            >
              <span v-if="loading">Registrazione...</span>
              <span v-else>Registrati</span>
            </button>

          </form>
        </div>

      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import api from "../axios";
import { useAuthStore } from "../stores/auth-stores";
import { Modal } from "bootstrap";

const name = ref("");
const surname = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);

const authStore = useAuthStore();
let modalInstance = null;

const errors = ref({
  name: null,
  surname: null,
  email: null,
  password: null,
  confirmPassword: null,
});

const globalMessage = ref("");
const globalType = ref("alert-danger");
const loading = ref(false);

onMounted(() => {
  modalInstance = new Modal(document.getElementById("registerModal"));
});

const openModal = () => modalInstance.show();
const closeModal = () => modalInstance.hide();

const validateFields = () => {
  errors.value = {};

  if (!name.value.trim()) errors.value.name = "Inserisci il nome";
  if (!surname.value.trim()) errors.value.surname = "Inserisci il cognome";

  if (!email.value.trim()) errors.value.email = "Inserisci una email valida";
  else if (!/^\S+@\S+\.\S+$/.test(email.value))
    errors.value.email = "Formato email non valido";

  if (password.value.length < 6)
    errors.value.password = "La password deve avere almeno 6 caratteri";

  if (confirmPassword.value !== password.value)
    errors.value.confirmPassword = "Le password non coincidono";

  return Object.keys(errors.value).length === 0;
};

const register = async () => {
  globalMessage.value = "";

  if (!validateFields()) return;

  loading.value = true;

  try {
    const res = await api.post("/users/register", {
      name: name.value,
      surname: surname.value,
      email: email.value,
      password: password.value,
    });

    const { user, token } = res.data;
    authStore.setUser(user, token);

    globalMessage.value = "Registrazione completata!";
    globalType.value = "alert-success";

    setTimeout(() => {
      closeModal();
      globalMessage.value = "";
    }, 900);
  } catch (err) {
    globalMessage.value = err.response?.data?.message || "Errore nella registrazione";
    globalType.value = "alert-danger";
  } finally {
    loading.value = false;
  }
};

defineExpose({ openModal, closeModal });
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
