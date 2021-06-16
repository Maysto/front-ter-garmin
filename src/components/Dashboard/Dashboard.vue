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
                <v-btn
                  color="primary"
                  @click="giveRelativeID"
                  v-on="on"
                  class="mr-5"
                >
                  <v-icon>mdi-content-copy</v-icon>
                </v-btn>
              </template>
              <span>Cliquez ici pour copier l'id de votre proche !</span>
            </v-tooltip>

            <v-dialog v-model="dialog2" max-width="380">
              <template v-slot:activator="{ on: dialog }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on: tooltip }">
                    <v-btn
                      v-on="{ ...tooltip, ...dialog }"
                      color="success"
                      @click="shareRelative"
                    >
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

            <v-dialog v-model="dialog3" max-width="380">
              <template v-slot:activator="{ on: dialog }">
                <v-tooltip right>
                  <template v-slot:activator="{ on: tooltip }">
                    <v-btn
                      v-on="{ ...tooltip, ...dialog }"
                      color="error"
                      class="ml-5"
                    >
                      <v-icon> mdi-delete-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Cliquez ici pour supprimer ce proche !</span>
                </v-tooltip>
              </template>

              <v-card>
                <v-card-title class="justify-center">
                  Etes vous sur de vouloir supprimer ce proche ?
                </v-card-title>
                <v-card-actions>
                  <v-btn color="error" text @click="dialog3 = false">
                    Non
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="deleteRelatve">
                    Oui
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
              <v-card v-if="relative.sleep[0] != undefined">
                <v-img
                  height="220"
                  src="https://i.ibb.co/TcFp2KK/depositphotos-277879810-stock-photo-front-view-active-senior-caucasian.jpg"
                ></v-img>
                <v-app-bar color="rgba(0,0,0,0)" flat class="mt-8">
                  <v-icon large class="mr-2" color="indigo"
                    >mdi-weather-night
                  </v-icon>
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
                <v-card-text>
                  Durée du sommeil :
                  <b>{{ dataConverted[0] }}</b> Heures
                  <br />
                  Heure de début :
                  <b
                    >{{ dataConverted[1] }}:{{ dataConverted[2] }}:{{
                      dataConverted[3]
                    }}</b
                  >
                  <br />
                  Heure de fin :
                  <b
                    >{{ dataConverted[4] }}:{{ dataConverted[5] }}:{{
                      dataConverted[6]
                    }}</b
                  >
                </v-card-text>
                <v-divider></v-divider>
                <v-app-bar color="rgba(0,0,0,0)" flat>
                  <v-icon large class="mr-2" color="amber">mdi-trophy </v-icon>
                  <h3>Score du sommeil</h3>
                </v-app-bar>
                <v-card-text>
                  Durée totale :
                  <b>{{
                    relative.sleep[0][0].sleepScores.totalDuration.qualifierKey
                  }}</b>
                  <br />
                  Stress :
                  <b>{{
                    relative.sleep[0][0].sleepScores.stress.qualifierKey
                  }}</b>
                  <br />
                  Agitation :
                  <b>{{
                    relative.sleep[0][0].sleepScores.restlessness.qualifierKey
                  }}</b>
                  <br />
                  Nombre d'éveil :
                  <b>{{
                    relative.sleep[0][0].sleepScores.awakeCount.qualifierKey
                  }}</b>
                  <br />
                  <br />
                  <v-icon medium color="yellow">mdi-star </v-icon>
                  Score global du sommeil :
                  <b>{{
                    relative.sleep[0][0].overallSleepScore.qualifierKey
                  }}</b>
                </v-card-text>
              </v-card>
              <v-card v-if="relative.sleep[0] == undefined">
                <v-card-title class="mt-8">
                  Les données n'ont pas encore étaient récupérées</v-card-title
                >
              </v-card>
            </v-col>
            <v-col sm="4" xs="3">
              <v-card v-if="relative.dailies[0] != undefined">
                <v-img
                  height="220"
                  src="https://i.ibb.co/6Y7HL9p/650x350-do-you-know-the-benefits-of-walking-rmq.webp"
                ></v-img>
                <v-app-bar color="rgba(0,0,0,0)" flat class="mt-8">
                  <v-icon large class="mr-2" color="brown"
                    >mdi-shoe-print
                  </v-icon>
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
                  Pas éffectués :
                  <b>{{ relative.dailies[0][0].steps }}</b> Pas <br />
                  <v-icon medium color="error">mdi-bullseye-arrow </v-icon>
                  Objectif :
                  <b>{{ relative.dailies[0][0].stepsGoal }}</b> Pas
                  <!-- <span class="colorT"> pour colorPas qui doit etre appellé au bon moment mais j'y arrive pas putain
                     faut l'appeler quand relative n'est pas null comme moi   red--text au lieu de error dans colorPas-->
                </v-card-text>
                <v-divider></v-divider>
                <v-app-bar color="rgba(0,0,0,0)" flat>
                  <v-icon large class="mr-2" color="blue-grey"
                    >mdi-map-marker-distance
                  </v-icon>
                  <h3>Distance parcourue</h3>
                </v-app-bar>
                <v-card-text>
                  Distance effectuée :
                  <b>{{ relative.dailies[0][0].distanceInMeters }}</b> mètres
                </v-card-text>
                <v-divider></v-divider>
                <v-app-bar color="rgba(0,0,0,0)" flat>
                  <v-icon large class="mr-2">mdi-stairs-up </v-icon>
                  <h3>Etages montés</h3>
                </v-app-bar>
                <v-card-text>
                  Etages montés :
                  <b>{{ relative.dailies[0][0].floorsClimbed }}</b> étages<br />
                  <v-icon medium color="error">mdi-bullseye-arrow </v-icon>
                  Objectif :
                  <b>{{ relative.dailies[0][0].floorsClimbedGoal }}</b> étages
                </v-card-text>
              </v-card>
              <v-card v-if="relative.dailies[0] == undefined">
                <v-card-title class="mt-8">
                  Les données n'ont pas encore étaient récupérées</v-card-title
                >
              </v-card>
            </v-col>
            <v-col sm="3" xs="3">
              <v-card>
                <v-app-bar color="rgba(0,0,0,0)" flat class="mt-8">
                  <v-icon large class="mr-2" color="teal">mdi-doctor </v-icon>
                  <h3>Liste des médecins du proche</h3>
                  <v-spacer></v-spacer>
                </v-app-bar>
                <v-divider></v-divider>
                <v-list flat>
                  <v-list-item
                    v-for="doctor in listDoctors"
                    :key="doctor.text[0]"
                  >
                    <v-list-item-action>
                      <v-icon>{{ doctor.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <span>
                        Docteur. {{ doctor.text[0] }} {{ doctor.text[1] }}
                      </span>
                      <br />
                      <span> Spécialité : {{ doctor.text[3] }}</span> <br />
                      <span> Téléphone : {{ doctor.text[2] }}</span>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <PopupDoctors
                  v-bind:listDoctors="listDoctors"
                  v-bind:relative="relative"
                />
              </v-card>
              <v-card>
                <v-app-bar color="rgba(0,0,0,0)" flat class="mt-8">
                  <v-icon large class="mr-2" color="teal">mdi-calendar</v-icon>
                  <h3>Calendrier du proche</h3>
                  <v-spacer></v-spacer>
                </v-app-bar>
                <v-divider></v-divider>
               <CalendarDashboard>
               </CalendarDashboard>
              </v-card>
            </v-col>
            
          </v-row>
          <v-row cols="12">
            <v-col sm="5" xs="3">
              <v-card v-if="relative.dailies[0] != undefined">
                <v-img
                  height="150"
                  src="https://i.ibb.co/6Y7HL9p/650x350-do-you-know-the-benefits-of-walking-rmq.webp"
                ></v-img>
                <v-app-bar color="rgba(0,0,0,0)" flat class="mt-8">
                  <v-icon large class="mr-2" color="error"
                    >mdi-heart-pulse
                  </v-icon>
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
              <v-card v-if="relative.dailies[0] == undefined">
                <v-card-title class="mt-8">
                  Les données n'ont pas encore étaient récupérées</v-card-title
                >
              </v-card>
            </v-col>
            <v-col sm="3">
              <v-card v-if="relative.dailies[0] != undefined">
                <v-img
                  height="150"
                  src="https://i.ibb.co/DpwD38v/Calories-1200x628-1200x610.jpg"
                ></v-img>
                <v-app-bar color="rgba(0,0,0,0)" flat class="mt-8">
                  <v-icon large class="mr-2" color="green">mdi-food</v-icon>
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
                <v-card-text>
                  Calories actives :
                  <b>{{ relative.dailies[0][0].activeKilocalories }}</b> <br />
                  BMR Kilocalories :
                  <b>{{ relative.dailies[0][0].bmrKilocalories }}</b
                  ><br />
                  <v-icon medium color="error">mdi-bullseye-arrow </v-icon>
                  Objectif :
                  <b>{{ relative.dailies[0][0].netKilocaloriesGoal }}</b
                  ><br />
                </v-card-text>
              </v-card>
              <v-card v-if="relative.dailies[0] == undefined">
                <v-card-title class="mt-8">
                  Les données n'ont pas encore étaient récupérées</v-card-title
                >
              </v-card>
            </v-col>
            <v-col sm="3">
              <v-card v-if="relative.dailies[0] != undefined">
                <v-img
                  height="150"
                  src="https://i.ibb.co/Fx4Dzmv/10204e2cf94ed01b71805a97cdf1047b.jpg"
                ></v-img>
                <v-app-bar color="rgba(0,0,0,0)" flat class="mt-8">
                  <v-icon large class="mr-2" color="deep-orange"
                    >mdi-flash-alert-outline</v-icon
                  >
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
                  Niveau de stress moyen :
                  <b> {{ relative.dailies[0][0].averageStressLevel }} </b>
                  <br />
                  Niveau de stress maximal :
                  <b> {{ relative.dailies[0][0].maxStressLevel }} </b>
                  <br />
                  Heure de début :
                  <b
                    >{{ dataConverted[7] }}:{{ dataConverted[8] }}:{{
                      dataConverted[9]
                    }}</b
                  >
                  <br />
                  Heure de fin :
                  <b
                    >{{ dataConverted[10] }}:{{ dataConverted[11] }}:{{
                      dataConverted[12]
                    }}</b
                  >
                  <br />
                  Durée du stress :
                  <b>
                    {{ relative.stress[0][0].durationInSeconds }}
                    secondes
                  </b>
                  <br />
                </v-card-text>
              </v-card>
              <v-card v-if="relative.dailies[0] == undefined">
                <v-card-title class="mt-8">
                  Les données n'ont pas encore étaient récupérées</v-card-title
                >
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
import PopupDoctors from "../Doctors/PopupDoctors.vue";
import CalendarDashboard from "./CalendarDashboard.vue";

export default {
  data: () => ({
    //colorT: '',
    dataConverted: [],
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
    dialog3: false,
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
      id: "",
    },
    relativeID: "",
    userList: [],
    listDoctors: [],
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
    deleteRelatve: async function() {
      this.dialog3 = false;
      let url = `https://ter-garmin.herokuapp.com/api/users/deleteRelative`;
      await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: localStorage.email,
          id: this.relative.id,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      location.reload();
    },
    convertData: async function() {
      let url = `https://ter-garmin.herokuapp.com/api/users/${localStorage.email}`;
      await fetch(url)
        .then((responseJSON) => {
          responseJSON.json().then((user) => {
            user.relatives.forEach((rel) => {
              let data1 = rel.sleep[0][0].durationInSeconds;
              data1 = data1 / 3600;
              this.dataConverted.push(data1.toFixed(0));

              let debutSommeil = new Date(
                rel.sleep[0][0].startTimeInSeconds * 1000 +
                  rel.sleep[0][0].startTimeOffsetInSeconds * 1000
              );
              let finalSommeil = new Date(
                rel.sleep[0][0].startTimeInSeconds * 1000 +
                  rel.sleep[0][0].startTimeOffsetInSeconds * 1000 +
                  rel.sleep[0][0].durationInSeconds * 1000
              );

              this.dataConverted.push(
                debutSommeil.getHours(),
                debutSommeil.getMinutes(),
                debutSommeil.getSeconds()
              );
              this.dataConverted.push(
                finalSommeil.getHours(),
                finalSommeil.getMinutes(),
                finalSommeil.getSeconds()
              );

              let debutStress = new Date(
                rel.stress[0][0].startTimeInSeconds * 1000 +
                  rel.stress[0][0].startTimeOffsetInSeconds * 1000
              );

              let finalStress = new Date(
                rel.stress[0][0].startTimeInSeconds * 1000 +
                  rel.stress[0][0].startTimeOffsetInSeconds * 1000 +
                  rel.stress[0][0].durationInSeconds * 1000
              );

              this.dataConverted.push(
                debutStress.getHours(),
                debutStress.getMinutes(),
                debutStress.getSeconds()
              );
              this.dataConverted.push(
                finalStress.getHours(),
                finalStress.getMinutes(),
                finalStress.getSeconds()
              );
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  mounted() {
    this.convertData();
    console.log(this.dataConverted);
    this.$refs.calendar.checkChange();
  },
  props: {
    doctors: {
      type: Object,
    },
  },
  components: {
    NavDashboard,
    PopupDoctors,
    CalendarDashboard,
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
