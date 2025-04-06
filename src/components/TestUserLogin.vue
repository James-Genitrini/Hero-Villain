<template>
  <div class="login-container">
    <h2>Authentification</h2>
    <form @submit.prevent="loginUser">
      <div class="form-group">
        <label for="login">Login:</label>
        <input type="text" id="login" v-model="login" required />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Se connecter</button>
    </form>

    <div v-if="successMessage" class="success-banner">
      {{ successMessage }}
    </div>

    <div v-if="error" class="error-banner">
      {{ error }}
    </div>

    <div v-if="user" class="user-info">
      <h3>Bienvenue, {{ user.name }} !</h3>
      <p><strong>XSRF Token:</strong> {{ user.xsrfToken }}</p>
      <p><strong>Refresh Token:</strong> {{ user.refreshToken }}</p>
    </div>

    <div v-if="userInfo" class="user-details">
      <h4>Infos complètes de l'utilisateur :</h4>
      <p><strong>Login:</strong> {{ userInfo.login }}</p>
      <p><strong>Mot de passe:</strong> {{ userInfo.password }}</p>
      <p><strong>Héro associé:</strong> {{ userInfo.hero.name }}</p>
    </div>
  </div>
</template>

<script>
import UserService from '@/services/user.service';
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      login: '',
      password: '',
      error: '',
      successMessage: '',
      user: null,
      userInfo: null,
    };
  },
  created() {
    // Vérifie si l'utilisateur est déjà connecté
    if (this.isAuthenticated()) {
      this.$router.push({ name: 'Home' });
    }
  },
  computed: {
    ...mapState("heroes", ["selectedHero"]),
    ...mapState("errors", ["error"]),
  },
  methods: {
    ...mapActions("errors", ["setError", "clearError"]),

    isAuthenticated() {
      return !!localStorage.getItem('xsrfToken');
    },
    async loginUser() {
      try {
        console.log("Tentative de connexion avec:", this.login);
        this.user = await UserService.login(this.login, this.password);
        this.successMessage = `Connexion réussie pour: ${this.user.name}`;
        this.error = '';
        await this.getUserInfo();
        location.reload();
      } catch (err) {
        this.user = null;
        this.userInfo = null;
        this.successMessage = '';
        this.setError(err.message)
        this.error = this.parseErrorMessage(err.message);
      }
    },
    async getUserInfo() {
      try {
        const info = await UserService.getUserInfo(this.login);
        this.userInfo = info;
        console.log('Infos utilisateur récupérées:', info);
      } catch (err) {
        this.setError(err.message)
        this.error = this.parseErrorMessage(err.message);
        this.userInfo = null;
      }
    },
    parseErrorMessage(message) {
      if (message.includes('login incorrect')) {
        return 'Login ou mot de passe incorrect.';
      } else if (message.includes('Token XSRF manquant')) {
        return 'Veuillez vous reconnecter.';
      } else {
        return message || 'Une erreur inconnue est survenue.';
      }
    },
  },
};
</script>


<style scoped>
.login-container {
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

button:hover {
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

.user-info, .user-details {
  margin-top: 20px;
  text-align: left;
  width: 100%;
  max-width: 400px;
}

.user-info h3, .user-details h4 {
  color: #007bff;
}
</style>
