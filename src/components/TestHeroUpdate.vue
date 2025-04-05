<template>
  <v-container class="test-hero-update">
    <v-card class="pa-4">
      <v-card-title>Mise à jour d'un Héros</v-card-title>

      <v-form @submit.prevent="updateHero">
        <v-text-field
            v-model="form._id"
            label="ID du Héros"
            required
            outlined
        ></v-text-field>

        <v-text-field
            v-model="form.publicName"
            label="Nom Public"
            outlined
        ></v-text-field>

        <v-text-field
            v-model="form.realName"
            label="Nom Réel"
            outlined
        ></v-text-field>

        <v-text-field
            v-model="form.orgSecret"
            label="Clé Secrète de l'Organisation"
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
                outlined
            ></v-text-field>

            <v-text-field
                v-model.number="power.type"
                label="Type (1 à 7)"
                type="number"
                min="1"
                max="7"
                outlined
            ></v-text-field>

            <v-text-field
                v-model.number="power.level"
                label="Niveau (0 à 100)"
                type="number"
                min="0"
                max="100"
                outlined
            ></v-text-field>

            <v-btn color="red" class="white--text mt-2" @click="removePower(index)">
              Supprimer ce Pouvoir
            </v-btn>
          </v-card>
        </div>

        <v-divider class="my-4"></v-divider>

        <v-btn type="submit" color="green darken-2" class="white--text" :loading="loading">
          Mettre à jour le Héros
        </v-btn>

      </v-form>
    </v-card>

    <v-card v-if="updatedHero" class="mt-5 pa-4">
      <v-card-title>Héros Mis à Jour</v-card-title>

      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>ID du Héros: {{ updatedHero._id }}</v-list-item-title>
            <v-list-item-subtitle>Nom Public: {{ updatedHero.publicName }}</v-list-item-subtitle>
            <v-list-item-subtitle>Nom Réel: {{ updatedHero.realName }}</v-list-item-subtitle>

            <v-list-item-subtitle>
              Pouvoirs:
              <ul>
                <li v-for="(power, index) in updatedHero.powers" :key="index">
                  {{ power.name }} (Type: {{ power.type }}, Niveau: {{ power.level }})
                </li>
              </ul>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>

    <v-card class="mt-5 pa-4">
      <v-card-title>État du Store (selectedHero)</v-card-title>
      <v-divider></v-divider>
      <pre v-if="selectedHero">{{ selectedHero }}</pre>
      <v-alert v-else type="info" dense>
        Aucun héros sélectionné pour le moment.
      </v-alert>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import heroService from "@/services/hero.service";

export default {
  name: "TestHeroUpdate",
  data() {
    return {
      form: {
        _id: "",
        publicName: "",
        realName: "",
        powers: [],
        orgSecret: "",
      },
      loading: false,
      updatedHero: null,
    };
  },
  computed: {
    ...mapState("heroes", ["selectedHero"]),
    ...mapState("errors", ["error"]), 
  },
  created() {
    if (this.selectedHero) {
      this.form._id = this.selectedHero._id || "";
    }
  },
  methods: {
    ...mapActions("heroes", ["updateHero"]),
    ...mapActions("errors", ["setError", "clearError"]),

    addPower() {
      this.form.powers.push({ name: "", type: null, level: null });
    },
    removePower(index) {
      this.form.powers.splice(index, 1);
    },
    async updateHero() {
      this.loading = true;
      this.clearError(); 

      try {
        const heroData = { ...this.form };

        if (!heroData.publicName) delete heroData.publicName;
        if (!heroData.realName) delete heroData.realName;
        if (heroData.powers.length === 0) delete heroData.powers;

        const response = await heroService.updateHero(heroData, this.form.orgSecret);

        this.updatedHero = response.data;

        this.form = { _id: "", publicName: "", realName: "", powers: [], orgSecret: "" };
      } catch (err) {
        this.setError(err.message);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.test-hero-update {
  max-width: 600px;
  margin: auto;
}

pre {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  overflow-x: auto;
}
</style>
