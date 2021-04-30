<template>
  <v-app id="dashboard">
    <v-container>
      <v-flex>
        <NavDashboard />
      </v-flex>
      <v-flex>
        <v-card class="text-center mt-0 mb-0">
          <v-card-title class="layout justify-center"
            >Arouf Gangsta</v-card-title
          >
          <v-list>
            <v-list-item class="mt-n6">
              <v-list-item-title class="teal--text">Age : 45</v-list-item-title>
              <v-list-item-title class="teal--text"
                >Sexe : Homme</v-list-item-title
              >
              <v-list-item-title class="teal--text"
                >Taille : 175cm</v-list-item-title
              >
              <v-list-item-title class="teal--text"
                >Poids : 56kg</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-card>
      </v-flex>
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
            <v-app-bar color="rgba(0,0,0,0)" flat class="ma-8">
              <v-icon large>mdi-shoe-print </v-icon>
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
          </v-card>
        </v-col>
        <v-col sm="4" xs="3">
          <v-card>
            <v-app-bar color="rgba(0,0,0,0)" flat class="ma-8">
              <v-icon large>mdi-map-marker-distance </v-icon>
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
              <v-icon large>mdi-heart-pulse </v-icon>
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
              <v-icon large>mdi-food</v-icon>
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
              <v-icon large>mdi-flash-alert-outline</v-icon>
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
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import NavDashboard from "./NavDashboard.vue";

export default {
  data: () => ({
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
  }),
  methods: {
    BPMtoday: function () {
      this.valueBPM = [2, 3, 4, 5, 10];
    },
    BPMweek: function () {
      this.valueBPM = [9, 5, 6, 4, 2, 1];
    },
    BPMmonth: function () {
      this.valueBPM = [1, 2, 3, 8, 3, 2, 1];
    },
    Sleeptoday: function () {
      this.valSleep = 80;
      (this.valSleepH = this.valSleep), (this.valSleepTotal = 10);
    },
    Sleepweek: function () {
      this.valSleep = 90;
      (this.valSleepH = this.valSleep * 7), (this.valSleepTotal = 70);
    },
  },
  components: {
    NavDashboard,
  },
};
</script>

<style scoped>
#dashboard {
  background-color: #add8e6;
}
</style>
