<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <template v-slot:activator="{ on }">
        <v-btn outlined color="black" dark v-on="on">Ajouter un Médecin</v-btn>
      </template>
      <v-card>
        <v-card-title class="justify-center">
          Ajouter un nouveau médecin</v-card-title
        >
        <v-form class="px-3" ref="form" v-model="form">
          <div>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="doctors.prenom"
                  label="Prenom"
                  name="prenom"
                  type="text"
                  color="blue darken-1"
                  prepend-icon="mdi-account"
                  :rules="[rules.required, rules.space, rules.letter]"
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="doctors.nom"
                  label="Nom"
                  name="nom"
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
                  v-model="doctors.telephone"
                  label="Téléphone"
                  name="telephone"
                  type="number"
                  color="blue darken-1"
                  prepend-icon="mdi-phone"
                  :rules="[rules.required, rules.phoneNumber(10), rules.space]"
                />
              </v-col>
              <v-col>
                <v-select
                  v-model="doctors.specialite"
                  label="Spécialité"
                  name="specialite"
                  :items="specialite"
                  color="blue darken-1"
                  prepend-icon="mdi-doctor"
                  :rules="[rules.required]"
                ></v-select>
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
                @click="dialog = false"
                :disabled="!form"
                >Valider</v-btn
              >
            </v-card-actions>
          </div>
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
    form: false,
    doctors: {
      prenom: "",
      nom: "",
      specialite: "",
      telephone: "",
    },
    specialite: [
      "allergologie",
      "andrologie",
      "cardiologie",
      "chirurgie",
      "anesthésiologie",
      "dermatologie",
      "généraliste",
      "neurologie",
      "radiologie",
      "urologie",
      "ophtalmologie",
      "infectiologie",
      "pneumologie",
      "podologie",
      "rhumatologie",
      "gynécologie",
      "gastro-entérologie",
      "hématologie",
      "hépatologie",
      "autres",
    ],
    rules: {
      required: (v) => !!v || "Ce champ est requis",
      letter: (v) => isNaN(v) || "chiffres interdits",
      space: (v) => (v || "").indexOf(" ") < 0 || "espaces interdits",
      phoneNumber: (taille) => (v) =>
        (v || "").toString().length == taille.toString() ||
        `Veuillez rentrer un nombre correct`,
    },
    BASEURL: "https://ter-garmin.herokuapp.com/api/relatives",
  }),
    props: {
    lists: {
      type: Array,
    },
  },
  methods: {
    createDoctors: async function() {
      this.body = {
        userEmail: localStorage.email,
        firstname: this.doctors.prenom,
        lastname: this.doctors.nom,
        phone: this.doctors.telephone,
        specialities: this.doctors.specialite,
      };

      const result = await fetch(this.BASEURL + "", {
        method: "POST",
        body: JSON.stringify(this.body),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (result.ok) {
        this.dialog = false;
        let newDoctors = {
          icon: "mdi-doctor",
          text: [
            this.body.firstname,
            this.body.lastname,
            this.body.phone,
            this.body.specialities,
          ],
          route: "Dashboard",
        };
        this.listDoctors.push(newDoctors);
        alert("Ajout du docteur : " + this.body.lastname + " reussi");
        location.reload();
      }
    },
  },
};
</script>
