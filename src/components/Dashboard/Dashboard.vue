<template>
  <div class="team">
    <v-flex>
      <NavDashboard />
    </v-flex>
    <h1 class="subheading grey--text">Dashboard</h1>
    <v-container>
      <v-row>
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
              <v-btn color="teal" rounded dark depressed @click="BPMtoday()"
                >Today</v-btn
              >
              <v-btn text @click="BPMweek()">Week</v-btn>
              <v-btn text @click="BPMmonth()">Month</v-btn>
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
                :auto-line-width="false"
                auto-draw
              ></v-sparkline>
            </template>
          </v-card>
        </v-col>

        <v-col cols="12" sm="4">
          <v-row>
            <v-col cols="12" sm="8">
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
            <v-col cols="12" sm="8">
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
          </v-row>
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
  },
  components: {
    NavDashboard,
  },
};
</script>

<style scoped>
</style>
