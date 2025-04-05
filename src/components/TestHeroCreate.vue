<template>
  <v-container class="test-hero-create">
    <v-card class="pa-4">
      <v-card-title>Création d'un Nouveau Héros</v-card-title>

      <v-form @submit.prevent="createHero">
        <v-text-field
            v-model="form.publicName"
            label="Nom Public"
            required
            outlined
        ></v-text-field>

        <v-text-field
            v-model="form.realName"
            label="Nom Réel"
            required
            outlined
        ></v-text-field>

        <v-divider class="my-4"></v-divider>

        <v-btn color="blue darken-2" class="white--text" @click="addPower">
          Ajouter un Pouvoir
        </v-btn>

        <div v-for="(power, index) in form.powers" :key="index" class="mt-4">
          <v-card outlined class="pa-3">
            <v-card-title>Pouvoir {{ index + 1 }}</v-card-title>

            <v-text-field
                v-model="power.name"
                label="Nom du Pouvoir"
                required
                outlined
            ></v-text-field>

            <v-text-field
                v-model.number="power.type"
                label="Type (1 à 7)"
                type="number"
                min="1"
                max="7"
                required
                outlined
            ></v-text-field>

            <v-text-field
                v-model.number="power.level"
                label="Niveau (0 à 100)"
                type="number"
                min="0"
                max="100"
                required
                outlined
            ></v-text-field>

            <v-btn color="red" class="white--text mt-2" @click="removePower(index)">
              Supprimer ce Pouvoir
            </v-btn>
          </v-card>
        </div>

        <v-divider class="my-4"></v-divider>

        <v-btn type="submit" color="green darken-2" class="white--text" :loading="loading">
          Créer le Héros
        </v-btn>
      </v-form>
    </v-card>

    <v-divider class="my-5"></v-divider>

    <v-card v-if="selectedHero" class="pa-4 mt-5">
      <v-card-title>Héros Stocké dans le Store</v-card-title>
      <v-card-text>
        <p><strong>Nom Public :</strong> {{ selectedHero.publicName }}</p>
        <p><strong>Nom Réel :</strong> {{ selectedHero.realName }}</p>

        <v-divider class="my-3"></v-divider>

        <p><strong>Pouvoirs :</strong></p>
        <v-list>
          <v-list-item v-for="(power, index) in selectedHero.powers" :key="index">
            <v-list-item-content>
              <v-list-item-title>🔹 {{ power.name }}</v-list-item-title>
              <v-list-item-subtitle>Type : {{ power.type }} | Niveau : {{ power.level }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import heroService from "@/services/hero.service";

export default {
  name: "TestHeroCreate",
  data() {
    return {
      form: {
        publicName: "",
        realName: "",
        powers: [],
      },
      successMessage: null,
      loading: false,
    };
  },
  computed: {
    ...mapState("heroes", ["selectedHero"]),
    ...mapState("errors", ["error", "isError"]),
  },
  methods: {
    ...mapActions("heroes", ["setSelectedHero"]),
    ...mapActions("errors", ["setError", "clearError"]),

    addPower() {
      this.form.powers.push({ name: "", type: null, level: null });
    },
    removePower(index) {
      this.form.powers.splice(index, 1);
    },

    async createHero() {
      this.loading = true;
      this.clearError();
      this.successMessage = null;

      try {
        const heroData = await heroService.createHero(this.form);
        this.setSelectedHero(heroData.data);

        this.successMessage = "Héros créé avec succès !";

        this.form = { publicName: "", realName: "", powers: [] };
      } catch (err) {
        this.setError("Erreur lors de la création du héros : " + err.message);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.test-hero-create {
  max-width: 600px;
  margin: auto;
}
</style>
