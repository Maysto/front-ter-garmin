<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn outlined color="yellow darken-1" text v-on="on">
          <span >Premium</span>
          <v-icon right>mdi-star</v-icon>
        </v-btn>
      </template>
      <div v-if="this.mois">
        <v-card class="mx-auto" max-width="500">
          <v-card-title> 
            <h2 class="display-1">{{ this.selectOffre.nom }}</h2>
            <v-spacer></v-spacer>
            <span class="title">{{ this.selectOffre.prix }} €</span>
          </v-card-title>

          <v-card-text>
            {{ this.selectOffre.text }} <br />
            Achetez le Premium pour ajouter plus de proches !<br />
            A CHANGER !!!!!
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-text>
            <span class="subheading">Durée de l'abonnement</span>

            <v-chip-group
              v-model="selection"
              active-class="teal accent-4 white--text"
              mandatory
            >
              <v-chip @click="select1mois()">1 Mois</v-chip>
              <v-chip @click="select3mois()">3 Mois</v-chip>
              <v-chip @click="select6mois()">6 Mois</v-chip>
              <v-chip @click="select1an()">1 An</v-chip>
            </v-chip-group>
          </v-card-text>

          <v-card-actions>
            <v-btn
              block
              class="white--text"
              color="blue darken-1"
              @click="setPay()"
            >
              Valider
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div v-if="this.pay">
        <v-form ref="form" v-model="form">
          <v-card>
            <v-card-title class="justify-center blue darken-1 white--text">
              <h3>Enregistrez vos informations banquaire :</h3>
            </v-card-title>
            <v-col>
              <v-text-field
                label="Nom de la Carte"
                name="name"
                type="text"
                color="blue darken-1"
                prepend-icon="mdi-account"
                :rules="[
                  rules.required,
                  rules.length,
                  rules.space,
                  rules.letter,
                ]"
              />
              <v-text-field
                label="Numéro de Carte"
                name="num"
                type="text"
                color="blue darken-1"
                prepend-icon="mdi-credit-card"
                :rules="[
                  rules.required,
                  rules.length(16),
                  rules.space,
                  rules.chiffre,
                ]"
              />
              <v-text-field
                label="Date d'Expiration"
                name="date"
                type="date"
                color="blue darken-1"
                prepend-icon="mdi-calendar-range"
              />
              <v-text-field
                label="CVC"
                name="cvc"
                type="text"
                color="blue darken-1"
                prepend-icon="mdi-credit-card-outline"
                :rules="[
                  rules.required,
                  rules.length(3),
                  rules.space,
                  rules.chiffre,
                ]"
              />
            </v-col>
            <v-card-actions>
              <v-btn color="red" text @click="$refs.form.reset()">
                Reset
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="setMois()">
                Retour
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="
                  dialog = false;
                  setMois();
                "
                >Fermer</v-btn
              >
              <v-btn
                color="green"
                text
                outlined
                :disabled="!form"
                @click="
                  getPremium();
                  dialog = false;
                  setMois();
                "
                >Valider</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-form>
      </div>
    </v-dialog>
  </v-row>
</template>




<script>
export default {
  data: () => ({
    selection: 0,
    dialog: false,
    pay: false,
    mois: true,
    form: false,
    selectOffre: {
      nom: "1 Mois",
      prix: "9.99",
      text: "",
    },
    rules: {
      required: (v) => !!v || "Ce champ est requis",
      letter: (v) => isNaN(v) || "Chiffres interdits",
      chiffre: (v) => !isNaN(v) || "Lettre interdits",
      space: (v) => (v || "").indexOf(" ") < 0 || "espaces interdits",
      length: (taille) => (v) =>
        (v || "").toString().length == taille.toString() ||
        `Veuillez rentrer un nombre correct`,
    },
  }),
  props: {
    user: {},
  },
  methods: {
    select1mois() {
      this.selectOffre = {
        tier: 1,
        nom: "1 Mois",
        prix: "9.99",
        text: "",
      };
    },
    select3mois() {
      this.selectOffre = {
        tier: 2,
        nom: "3 Mois",
        prix: "27.99",
        text: "Economisez 2€ !",
      };
    },
    select6mois() {
      this.selectOffre = {
        tier: 3,
        nom: "6 Mois",
        prix: "52.99",
        text: "Economisez 7€ !",
      };
    },
    select1an() {
      this.selectOffre = {
        tier: 4,
        nom: "1 An",
        prix: "99.99",
        text: "Economisez 20€ !",
      };
    },
    setPay() {
      this.pay = true;
      this.mois = false;
    },
    setMois() {
      this.pay = false;
      this.mois = true;
    },
    async getPremium() {
      this.user.premium = new Date;
      switch (this.selectOffre.tier) {
        case 1:
          this.user.premium.setMonth(this.user.premium.getMonth() + 1);
          break;
        case 2:
          this.user.premium.setMonth(this.user.premium.getMonth() + 3);
          break;
        case 3:
          this.user.premium.setMonth(this.user.premium.getMonth() + 6);
          break;
        case 4:
          this.user.premium.setYear(this.user.premium.getYear() + 1);
          break;
        default:
          break;
      }
      let body = {
        email: this.user.email,
        premiumDate: this.user.premium,
      };
      console.log(body);
      let token = this.$session.get("token");
      const res = await fetch(
        "https://ter-garmin.herokuapp.com/api/users/updatePremium",
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            Authorization: token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        console.log("You're a premium member !");
      }
    },
  },
};
</script>
