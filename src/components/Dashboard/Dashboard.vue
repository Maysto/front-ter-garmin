<template>
  <v-app id="dashboard">
    <v-container>
      <v-flex>
        <NavDashboard
          v-bind:relative="relative"
          :demarrage="demarrage"
          @update-demarrage="update"
        />
      </v-flex>
      <v-flex v-if="demarrage">
        <v-flex>
          <v-card class="text-center mt-0 mb-0">
            <v-card-title class="layout justify-center"
              >{{ relative.prenom }} {{ relative.nom }}</v-card-title
            >

            <!-- button copy a voir si on laisse-->
            <v-tooltip left>
              <template #activator="{ on }">
                <v-btn color="primary" @click="giveRelativeID" v-on="on" class="mr-5">
                  <v-icon>mdi-content-copy</v-icon>
                </v-btn>
              </template>
              <span>Cliquez ici pour copier l'id de votre proche !</span>
            </v-tooltip>

            <v-dialog v-model="dialog2" max-width="380">
              <template v-slot:activator="{ on: dialog }">
                <v-tooltip right>
                  <template v-slot:activator="{ on : tooltip }">
                    <v-btn v-on="{ ...tooltip, ...dialog }" color="success" @click="shareRelative">
                  <v-icon> mdi-account-group</v-icon>
                </v-btn>
                </template>
                <span>Découvrez qui partage ce proche.</span>
              </v-tooltip>
              </template>
              
              <v-card>
                <v-card-title class="justify-center blue--text">
                  Partagé par
                </v-card-title>
                <v-card-text class="text-center ">
                  <li v-for="(item, index) in userList" :key="index">
                    {{ item }}
                  </li>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialog2 = false">
                    Ok
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-list>
              <v-list-item class="mt-n6">
                <v-list-item-title class="teal--text"
                  >Age : {{ relative.age }}</v-list-item-title
                >
                <v-list-item-title class="teal--text"
                  >Sexe : {{ relative.sexe }}</v-list-item-title
                >
                <v-list-item-title class="teal--text"
                  >Taille : {{ relative.taille }} cm</v-list-item-title
                >
                <v-list-item-title class="teal--text"
                  >Poids : {{ relative.poids }} kg</v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-card>
        </v-flex>
        <v-flex>
          <v-row cols="12">
            <v-col sm="4" xs="3">
              <v-card>
                <v-app-bar color="rgba(0,0,0,0)" flat class="ma-8">
                  <v-icon large>mdi-weather-night </v-icon>
                  <h3>Temps de sommeil</h3>
                  <v-spacer></v-spacer>
                  <v-chip-group
                    v-model="selection2"
                    active-class="teal accent-4 white--text"
                    class="ma-8"
                    mandatory
                  >
                    <v-chip @click="Sleeptoday()">Aujourd'hui</v-chip>

                    <v-chip @click="Sleepweek()">Semaine</v-chip>
                  </v-chip-group>
                </v-app-bar>
                <v-progress-circular
                  rotate="-90"
                  size="100"
                  width="15"
                  :value="valSleep"
                  color="teal"
                  class="mt-n5 ml-5 mb-2"
                >
                  {{ valSleepH / 10 }}/{{ valSleepTotal }}
                </v-progress-circular>
              </v-card>
            </v-col>
            <v-col sm="4" xs="3">
              <v-card>
                <v-app-bar color="rgba(0,0,0,0)" flat class="mt-8">
                  <v-icon large class="mr-2">mdi-shoe-print </v-icon>
                  <h3>Nombre de pas</h3>
                  <v-spacer></v-spacer>
                  <v-chip-group
                    v-model="selection4"
                    active-class="teal accent-4 white--text"
                    class="ma-8"
                    mandatory
                  >
                    <v-chip>Aujourd'hui</v-chip>

                    <v-chip>Semaine</v-chip>
                  </v-chip-group>            
                </v-app-bar>
                <v-card-text>        
                  Pas éffectué : 
                  <b>{{ relative.dailies[0][0].steps }}</b> Pas <br>
                  Objectif : 
                  <b>{{ relative.dailies[0][0].stepsGoal }}</b> Pas 
                   <!-- <span class="colorT"> pour colorPas qui doit etre appellé au bon moment mais j'y arrive pas putain
                     faut l'appeler quand relative n'est pas null comme moi   red--text au lieu de error dans colorPas-->
                </v-card-text>
                <v-divider></v-divider>
                <v-app-bar color="rgba(0,0,0,0)" flat >
                  <v-icon large class="mr-2">mdi-map-marker-distance </v-icon>
                  <h3>Distance parcourue</h3>
                </v-app-bar>
                <v-card-text>
                  <b>{{relative.dailies[0][0].distanceInMeters}}</b> mètres
                </v-card-text>
                <v-divider></v-divider>
                <v-app-bar color="rgba(0,0,0,0)" flat >
                  <v-icon large class="mr-2">mdi-stairs-up </v-icon>
                  <h3>Etages montés</h3>
                </v-app-bar>
                <v-card-text>
                  Etage montés :
                  <b>{{ relative.dailies[0][0].floorsClimbed }}</b> étages<br>
                  Objectif :  
                  <b>{{ relative.dailies[0][0].floorsClimbedGoal }}</b> étages
                </v-card-text>
              </v-card>
            </v-col>
            <v-col sm="4" xs="3">
              <v-card>
                <v-app-bar color="rgba(0,0,0,0)" flat class="ma-8">
                  <v-icon large class="mr-2">mdi-map-marker-distance </v-icon>
                  <h3>Distance parcourue</h3>
                  <v-spacer></v-spacer>
                  <v-chip-group
                    v-model="selection3"
                    active-class="teal accent-4 white--text"
                    class="ma-8"
                    mandatory
                  >
                    <v-chip>Aujourd'hui</v-chip>

                    <v-chip>Semaine</v-chip>
                  </v-chip-group>
                </v-app-bar>
              </v-card>
            </v-col>
          </v-row>
          <v-row cols="12">
            <v-col sm="5" xs="3">
              <v-card>
                <v-app-bar color="rgba(0,0,0,0)" flat class="ma-8">
                  <v-icon large class="mr-2">mdi-heart-pulse </v-icon>
                  <h3>Rythme cardiaque</h3>
                  <v-spacer></v-spacer>
                  <v-chip-group
                    v-model="selection"
                    active-class="teal accent-4 white--text"
                    class="ma-8"
                    mandatory
                  >
                    <v-chip @click="BPMtoday()">Aujourd'hui</v-chip>

                    <v-chip @click="BPMweek()">Semaine</v-chip>

                    <v-chip @click="BPMmonth()">Mois</v-chip>
                  </v-chip-group>
                </v-app-bar>
                <template>
                  <v-sparkline
                    :value="valueBPM"
                    color="teal"
                    :smooth="10 || false"
                    :padding="8"
                    :line-width="2"
                    :stroke-linecap="'round'"
                    :fill="false"
                    :type="'trend'"
                    :gradient="['#f72047', '#ffd200', '#1feaea']"
                    :auto-line-width="false"
                    auto-draw
                  ></v-sparkline>
                </template>
              </v-card>
            </v-col>
            <v-col sm="3">
              <v-card>
                <v-app-bar color="rgba(0,0,0,0)" flat class="ma-8">
                  <v-icon large class="mr-2">mdi-food</v-icon>
                  <h3>Calories</h3>
                  <v-spacer></v-spacer>
                  <v-chip-group
                    v-model="selection5"
                    active-class="teal accent-4 white--text"
                    class="ma-8"
                    mandatory
                  >
                    <v-chip>Aujourd'hui</v-chip>

                    <v-chip>Semaine</v-chip>
                  </v-chip-group>
                </v-app-bar>
              </v-card>
            </v-col>
            <v-col sm="3">
              <v-card>
                <v-app-bar color="rgba(0,0,0,0)" flat class="ma-8">
                  <v-icon large class="mr-2">mdi-flash-alert-outline</v-icon>
                  <h3>Stress</h3>
                  <v-spacer></v-spacer>
                  <v-chip-group
                    v-model="selection6"
                    active-class="teal accent-4 white--text"
                    class="ma-8"
                    mandatory
                  >
                    <v-chip>Aujourd'hui</v-chip>

                    <v-chip>Semaine</v-chip>
                  </v-chip-group>
                </v-app-bar>
                <v-card-text>
                  {{ relative.dailies[0][0].averageStressLevel }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-flex>
      </v-flex>
    </v-container>
  </v-app>
</template>

<script>
import NavDashboard from "./NavDashboard.vue";

export default {
  data: () => ({
    //colorT: '',
    drawer: true,
    valueBPM: [2, 3, 4, 5, 10],
    value: [2, 2, 5, 2, 2],
    valSleep: 80,
    valSleepH: 80,
    valSleepTotal: 10,
    selection: 0,
    selection2: 0,
    selection3: 0,
    selection4: 0,
    selection5: 0,
    selection6: 0,
    demarrage: false,
    dialog: false,
    dialog2: false,
    relative: {
      prenom: "",
      nom: "",
      age: "",
      sexe: "",
      poids: "",
      taille: "",
      stress: "",
      sleep: "",
      activities: "",
      dailies: "",
    },
    relativeID: "",
    userList: [],
  }),
  methods: {
    BPMtoday: function() {
      this.valueBPM = [2, 3, 4, 5, 10];
    },
    BPMweek: function() {
      this.valueBPM = [9, 5, 6, 4, 2, 1];
    },
    BPMmonth: function() {
      this.valueBPM = [1, 2, 3, 8, 3, 2, 1];
    },
    Sleeptoday: function() {
      this.valSleep = 80;
      (this.valSleepH = this.valSleep), (this.valSleepTotal = 10);
    },
    Sleepweek: function() {
      this.valSleep = 90;
      (this.valSleepH = this.valSleep * 7), (this.valSleepTotal = 70);
    },
    update(demarrage) {
      this.demarrage = demarrage;
    },
    giveRelativeID: async function() {
      let url = `https://ter-garmin.herokuapp.com/api/users/${localStorage.email}`;
      await fetch(url)
        .then((responseJSON) => {
          responseJSON.json().then((user) => {
            user.relatives.forEach((rel) => {
              if (this.relative.prenom == rel.firstname) {
                this.relativeID = rel._id;
                this.doCopy();
              }
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    shareRelative: async function() {
      let url = `https://ter-garmin.herokuapp.com/api/users/getAll`;
      await fetch(url)
        .then((responseJSON) => {
          responseJSON.json().then((user) => {
            if (this.userList.length == 0) {
              user.forEach((rel) => {
                rel.relatives.forEach((r) => {
                  if (r.firstname == this.relative.prenom) {
                    this.userList.push(rel.firstname + " " + rel.lastname);
                  }
                });
              });
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    doCopy: function() {
      this.$copyText(this.relativeID).then(
        function(e) {
          alert("Copie reussi");
          console.log(e);
        },
        function(e) {
          alert("echec de la copie");
          console.log(e);
        }
      );
    },
    // colorPas: function(){
    //   console.log(this.colorT)
    //   if(this.relative.dailies[0][0].steps < (this.relative.dailies[0][0].stepsGoal/2)){
    //     this.colorT = "error"
    //     console.log(this.colorT)
    //     return
    //   }
    //   if(this.relative.dailies[0][0].steps < (this.relative.dailies[0][0].stepsGoal/1.25)){
    //     this.colorT = "deep-orange"
    //     console.log(this.colorT)
    //     return
    //   }
    //   if(this.relative.dailies[0][0].steps < (this.relative.dailies[0][0].stepsGoal)){
    //     this.colorT = "yellow"
    //     console.log(this.colorT)
    //     return
    //   }
    //   if(this.relative.dailies[0][0].steps > (this.relative.dailies[0][0].stepsGoal)){
    //     this.colorT = "success"
    //     console.log(this.colorT)
    //     return
    //   }
    // }
  },

  components: {
    NavDashboard,
  },
  watch: {
    dialog2: function(val) {
      if (val == false) {
        const longeur = this.userList.length;
        for (let i = 0; i < longeur; i++) {
          this.userList.pop();
        }
      }
    },
  },
};
</script>

<style scoped>
#dashboard {
  background-color: #add8e6;
}
</style>
