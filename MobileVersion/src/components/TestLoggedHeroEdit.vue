<template>
  <v-container>
    <v-card class="pa-4">
      <v-card-title>Modifier mon Profil Héro 🦸</v-card-title>

      <v-form @submit.prevent="submit">
        <v-text-field v-model="form.publicName" label="Nom Public" outlined :disabled="noHero"></v-text-field>
        <v-text-field v-model="form.realName" label="Nom Réel" outlined :disabled="noHero"></v-text-field>

        <v-btn @click="addPower" :disabled="noHero">Ajouter un Pouvoir</v-btn>
        <div v-for="(power, index) in form.powers" :key="index" class="mt-4">
          <v-text-field v-model="power.name" label="Nom du Pouvoir" :disabled="noHero"></v-text-field>
          <v-text-field v-model.number="power.type" label="Type" type="number" :disabled="noHero"></v-text-field>
          <v-text-field v-model.number="power.level" label="Niveau" type="number" :disabled="noHero"></v-text-field>
        </div>

        <v-btn type="submit" color="primary" :disabled="noHero">Mettre à jour</v-btn>
        <v-alert v-if="success" type="success" class="mt-2">Mise à jour réussie ! 🎉</v-alert>
        <v-alert v-if="error" type="error" class="mt-2">{{ error }}</v-alert>
        <v-alert v-if="noHero" type="info" class="mt-2">
          La modification du profil est impossible car cet utilisateur n'est pas associé à un héros.
        </v-alert>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import UserService from "@/services/user.service";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      form: {
        _id: "",
        publicName: "",
        realName: "",
        powers: [],
      },
      error: null,
      success: false,
      noHero: false,
    };
  },
  async created() {
    try {
      const user = await UserService.getUserInfo(localStorage.getItem("login"));
      if (user.hero == null) {
        this.error = "🚫 Cet utilisateur n'est pas associé à un héros !";
        this.noHero = true;
        return;
      }
      this.form = {
        _id: user.hero._id,
        publicName: user.hero.publicName || "",
        realName: user.hero.realName || "",
        powers: user.hero.powers || [],
      };
    } catch (e) {
      this.error = "Impossible de charger tes infos 😢";
      console.error(e);
    }
  },
  computed: {
    ...mapState("heroes", ["selectedHero"]),
    ...mapState("errors", ["error"]),
  },
  methods: {
    ...mapActions("errors", ["setError", "clearError"]),

    addPower() {
      this.form.powers.push({ name: "", type: 1, level: 0 });
    },
    async submit() {
      this.success = false;
      this.error = null;
      try {
        const res = await UserService.updateAuthenticatedHero(this.form);
        console.log("Réponse de mise à jour:", res);
        this.success = true;
      } catch (e) {
        this.setError(e.message)
        // this.error = e.message;
      }
    },
  },
};
</script>
