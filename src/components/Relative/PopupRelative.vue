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
        <v-form class="px-3" ref="form">
          <v-row>
            <v-col>
              <v-text-field
                label="Nom"
                name="lastname"
                type="text"
                color="blue darken-1"
                prepend-icon="mdi-account"
                :rules="[rules.required]"
              />
            </v-col>
            <v-col>
              <v-text-field
                label="Prenom"
                name="firstname"
                type="text"
                color="blue darken-1"
                prepend-icon="mdi-account"
                :rules="[rules.required]"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                label="Age"
                name="age"
                type="number"
                min="0"
                color="blue darken-1"
                prepend-icon="mdi-calendar"
                :rules="[rules.required]"
              />
            </v-col>
            <v-col>
              <v-select
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
                label="Poids"
                name="weight"
                type="number"
                color="blue darken-1"
                prepend-icon="mdi-weight-kilogram"
                suffix="kg"
                min="0"
                :rules="[rules.required]"
              />
            </v-col>
            <v-col>
              <v-text-field
                label="Taille"
                name="height"
                type="number"
                min="0"
                color="blue darken-1"
                prepend-icon="mdi-human-male-height"
                suffix="cm"
                :rules="[rules.required]"
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
            <v-btn color="green" text outlined @click="submit">Valider</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    title: "",
    content: "",
    inputRules: [(v) => v.length >= 3 || "Minimum lenght is 3 charachters"],
    sexe: ["Homme", "Femme", "Autre"],
    rules: {
      required: (v) => !!v || "Ce champ est requis",
    },
  }),
};
</script>
