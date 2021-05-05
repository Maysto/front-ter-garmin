<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <template v-slot:activator="{ on }">
        <v-btn outlined color="white" dark v-on="on">Ajouter un proche</v-btn>
      </template>
      <v-card>
        <v-card-title class="justify-center">
          <h3>Nouveau proche</h3>
        </v-card-title>
        <v-divider class="mt-4"></v-divider>
        <v-form class="px-3" ref="form" v-model="form">
          <v-row>
            <v-col>
              <v-text-field
                v-model="relatives.nom"
                label="Nom"
                name="lastname"
                type="text"
                color="blue darken-1"
                prepend-icon="mdi-account"
                :rules="[rules.required, rules.space, rules.letter]"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="relatives.prenom"
                label="Prenom"
                name="firstname"
                type="text"
                color="blue darken-1"
                prepend-icon="mdi-account"
                :rules="[rules.required, rules.space, rules.letter]"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="relatives.age"
                label="Age"
                name="age"
                type="number"
                min="0"
                color="blue darken-1"
                prepend-icon="mdi-calendar"
                :rules="[rules.required, rules.length(3)]"
              />
            </v-col>
            <v-col>
              <v-select
                v-model="relatives.sexe"
                label="Sexe"
                name="sexe"
                :items="sexe"
                color="blue darken-1"
                prepend-icon="mdi-gender-transgender"
                :rules="[rules.required]"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="relatives.poids"
                label="Poids"
                name="weight"
                type="number"
                color="blue darken-1"
                prepend-icon="mdi-weight-kilogram"
                suffix="kg"
                min="0"
                :rules="[rules.required, rules.poids(3)]"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="relatives.taille"
                label="Taille"
                name="height"
                type="number"
                min="0"
                color="blue darken-1"
                prepend-icon="mdi-human-male-height"
                suffix="cm"
                :rules="[rules.required, rules.taille(3)]"
              />
            </v-col>
          </v-row>
          <v-divider class="mt-12"></v-divider>
          <v-card-actions>
            <v-btn color="red" text @click="$refs.form.reset()">
              Reset
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false"
              >Fermer</v-btn
            >
            <v-btn
              color="green"
              text
              outlined
              @click="createRelative"
              :disabled="!form"
              >Valider</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "Test",
  data: () => ({
    dialog: false,
    title: "",
    content: "",
    form: false,
    relatives: {
      prenom: "",
      nom: "",
      age: "",
      sexe: "",
      poids: "",
      taille: "",
    },
    inputRules: [(v) => v.length >= 3 || "Minimum lenght is 3 charachters"],
    sexe: ["Homme", "Femme", "Autre"],
    rules: {
      required: (v) => !!v || "Ce champ est requis",
      letter: (v) => isNaN(v) || "chiffres interdits",
      space: (v) => (v || "").indexOf(" ") < 0 || "espaces interdits",
      length: (taille) => (v) =>
        ((v || "").toString().length <= taille.toString() &&
          (v || "").toString() > 0 &&
          (v || "").toString() <= 125) ||
        `Veuillez rentrer un nombre correct`,
      taille: (taille) => (v) =>
        ((v || "").toString().length <= taille.toString() &&
          (v || "").toString() > 0 &&
          (v || "").toString() <= 250) ||
        `Veuillez rentrer un nombre correct`,
      poids: (taille) => (v) =>
        ((v || "").toString().length <= taille.toString() &&
          (v || "").toString() > 0 &&
          (v || "").toString() <= 200) ||
        `Veuillez rentrer un nombre correct`,
    },
  }),
  props: {
    links: {
      type: Array,
    },
  },
  methods: {
    createRelative() {
      let newRelative = { icon: "mdi-account", text: [this.relatives.prenom,this.relatives.nom,this.relatives.age,this.relatives.sexe,this.relatives.poids,this.relatives.taille], route: "Dashboard" };
      this.links.push(newRelative);
      this.dialog = false;
    },
  },
};
</script>
