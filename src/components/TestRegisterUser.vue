<template>
  <div class="register-container">
    <h2>Enregistrement</h2>
    <form @submit.prevent="registerUser">
      <div class="form-group">
        <label for="login">Login:</label>
        <input type="text" id="login" v-model="login" required />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div class="form-group">
        <label for="hero">Nom du héros:</label>
        <input type="text" id="hero" v-model="hero" required />
      </div>
      <div class="form-group">
        <vue-recaptcha
            :sitekey="captchaSiteKey"
            @verify="onCaptchaVerified"
            @expired="onCaptchaExpired"
        ></vue-recaptcha>
      </div>
      <button type="submit" :disabled="!captchaVerified">S'enregistrer</button>
    </form>

    <div v-if="successMessage" class="success-banner">
      {{ successMessage }}
    </div>

    <div v-if="error" class="error-banner">
      {{ error }}
    </div>
  </div>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';
import UserService from '@/services/user.service';
import { captchaSiteKey } from '@/commons/config';

export default {
  components: { VueRecaptcha },
  data() {
    return {
      login: '',
      password: '',
      hero: '',
      captchaToken: '',
      captchaVerified: false,
      error: '',
      successMessage: '',
      captchaSiteKey: captchaSiteKey,
    };
  },
  methods: {
    onCaptchaVerified(response) {
      this.captchaToken = response;
      this.captchaVerified = true;
    },
    onCaptchaExpired() {
      this.captchaToken = '';
      this.captchaVerified = false;
    },
    async registerUser() {
      try {
        const response = await UserService.register({
          login: this.login,
          password: this.password,
          hero: this.hero,
          captchaToken: this.captchaToken,
        });
        console.log(response);
        this.successMessage = 'Enregistrement réussi !';
        this.error = '';
        // Rediriger ou effectuer d'autres actions après l'enregistrement
      } catch (err) {
        this.successMessage = '';
        this.error = this.parseErrorMessage(err.message);
      }
    },
    parseErrorMessage(message) {
      if (message.includes('login déjà pris')) {
        return 'Le login est déjà pris.';
      } else if (message.includes('nom du héros inexistant')) {
        return 'Le nom du héros fourni n\'existe pas.';
      } else if (message.includes('héros déjà associé')) {
        return 'Le héros est déjà associé à un utilisateur.';
      } else {
        return message || 'Une erreur inconnue est survenue.';
      }
    },
  },
};
</script>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
  font-family: 'Arial', sans-serif;
}

h2 {
  color: #333;
  margin-bottom: 20px;
}

form {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

button:hover:enabled {
  background-color: #0056b3;
}

.success-banner {
  background-color: #d4edda;
  color: #155724;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
}

.error-banner {
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
}
</style>
