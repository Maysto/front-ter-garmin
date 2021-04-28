<template>
  <div class="team">
    <v-flex>
      <NavDashboard />
    </v-flex>
    <v-container>
      <v-row>
        <v-col cols="12" sm="4">
          <v-card>
            <v-app-bar color="rgba(0,0,0,0)" flat class="ma-8">
                    <h4>Sleeping Time</h4>
                    <v-spacer></v-spacer>
              <v-chip-group
                v-model="selection3"
                active-class="teal accent-4 white--text"
              >
                <v-chip @click="Sleeptoday()">Today</v-chip>

                <v-chip @click="Sleepweek()">Week</v-chip>

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
                    {{valSleepH / 10}}/{{valSleepTotal}}
                  </v-progress-circular>
          </v-card>
        </v-col>

        <v-col cols="12" sm="4">
          <v-card>
            <v-app-bar color="rgba(0,0,0,0)" flat class="ma-8">
              <h5>Statistics of your health</h5>
              <v-spacer></v-spacer>
              <v-btn color="teal" text
                >2019
                <v-icon right> mdi-chevron-down </v-icon>
              </v-btn>
              <v-btn color="teal" rounded dark depressed>Year</v-btn>
              <v-btn text>Mounth</v-btn>
              <v-btn text>Day</v-btn>
            </v-app-bar>
            <template>
              <v-sparkline
                :value="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
                color="teal"
                :smooth="10 || false"
                :padding="8"
                :line-width="2"
                :stroke-linecap="'round'"
                :fill="false"
                :type="'trend'"
                :auto-line-width="false"
                auto-draw
              ></v-sparkline>
            </template>
          </v-card>
        </v-col>

        <v-col cols="12" sm="4">
          <v-card>
            <v-app-bar color="rgba(0,0,0,0)" flat class="ma-8">
              <h5>Statistics of your health</h5>
              <v-spacer></v-spacer>
              <v-btn color="teal" text
                >2019
                <v-icon right> mdi-chevron-down </v-icon>
              </v-btn>
              <v-btn color="teal" rounded dark depressed>Year</v-btn>
              <v-btn text>Mounth</v-btn>
              <v-btn text>Day</v-btn>
            </v-app-bar>
            <template>
              <v-sparkline
                :value="value"
                color="teal"
                :smooth="10 || false"
                :padding="8"
                :line-width="2"
                :stroke-linecap="'round'"
                :fill="false"
                :type="'trend'"
                :auto-line-width="false"
                auto-draw
              ></v-sparkline>
            </template>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6">
          <v-card>
            <v-app-bar color="rgba(0,0,0,0)" flat class="ma-8">
              <v-icon large>mdi-heart-pulse </v-icon>
              <h2>BPM</h2>
              <v-spacer></v-spacer>
              <v-chip-group
                v-model="selection"
                active-class="teal accent-4 white--text"
              >
                <v-chip @click="BPMtoday()">Today</v-chip>

                <v-chip @click="BPMweek()">Week</v-chip>

                <v-chip @click="BPMmonth()">Month</v-chip>
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

        <v-col cols="12" sm="6">
          <v-card>
            <v-app-bar color="rgba(0,0,0,0)" flat class="ma-8">
              <h5>Statistics of your health</h5>
              <v-spacer></v-spacer>
              <v-btn color="teal" text
                >2019
                <v-icon right> mdi-chevron-down </v-icon>
              </v-btn>
              <v-chip-group
                v-model="selection2"
                active-class="teal  accent-4 white--text"
                
              >
                <v-chip @click="BPMtoday()">Today</v-chip>

                <v-chip @click="BPMweek()">Week</v-chip>

                <v-chip @click="BPMmonth()">Month</v-chip>
              </v-chip-group>
            </v-app-bar>
            <template>
              <v-sparkline
                :value="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
                color="teal"
                :smooth="10 || false"
                :padding="8"
                :line-width="2"
                :stroke-linecap="'round'"
                :fill="false"
                :type="'trend'"
                :auto-line-width="false"
                auto-draw
              ></v-sparkline>
            </template>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import NavDashboard from "./NavDashboard.vue";

export default {
  data: () => ({
    drawer: true,
    valueBPM: [2, 3, 4, 5, 10],
    value: [2, 2, 5, 2, 2],
    valSleep: 75,
    valSleepH: 30,
    valSleepTotal: 10,
    selection: 1,
    selection2: 2,
    selection3: 3,
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
      this.valSleep = 75;
      this.valSleepH = 80,
      this.valSleepTotal = 10;
    },
    Sleepweek: function () {
      this.valSleep = 90;
      this.valSleepH = this.valSleep*7,
      this.valSleepTotal = 70;
    }
  },
  components: {
    NavDashboard,
  },
};
</script>

<style scoped>
</style>
