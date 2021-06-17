<template>
  <v-row class="fill-height">
    <v-col>
      <v-dialog
        v-model="dialog"
        persistent
        max-width="1000px"
        max-height="2000px"
      >
        <template v-slot:activator="{ on }">
          <v-btn outlined color="teal" class="fill-height" dark v-on="on"
            >Voir le calendrier</v-btn
          >
        </template>
        <v-sheet height="64">
          <v-toolbar flat>
            <v-btn
              outlined
              class="mr-4"
              color="grey darken-2"
              @click="setToday"
            >
              Today
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small>
                mdi-chevron-left
              </v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small>
                mdi-chevron-right
              </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-btn color="blue darken-1" text @click="dialog = false"
              >Fermer</v-btn
            >
            <v-dialog
              v-model="dialogEvt"
              persistent
              max-width="1000px"
              max-height="2000px"
            >
              <template v-slot:activator="{ on }">
                <v-btn color="blue darken-1" text v-on="on"
                  >Ajouter un evenement</v-btn
                >
              </template>
              <v-card>
                <v-card-title class="justify-center">
                  Ajouter un évenement</v-card-title
                >
                <v-form class="px-3" ref="form" v-model="form">
                  <div>
                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="evenement.nom"
                          label="Nom de l'évenement"
                          name="nom"
                          type="text"
                          color="blue darken-1"
                        />
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="evenement.debut"
                          label="Debut"
                          name="debut"
                          type="datetime-local"
                          color="blue darken-1"
                        />
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="evenement.fin"
                          label="Fin"
                          name="fin"
                          type="datetime-local"
                          color="blue darken-1"
                        />
                      </v-col>
                    </v-row>
                    <v-divider class="mt-12"></v-divider>
                    <v-card-actions>
                      <v-btn color="red" text @click="$refs.form.reset()">
                        Reset
                      </v-btn>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="dialogEvt = false"
                        >Fermer</v-btn
                      >
                      <v-btn
                        color="green"
                        text
                        outlined
                        :disabled="!form"
                        @click="addEvent"
                        >Valider</v-btn
                      >
                    </v-card-actions>
                  </div>
                </v-form>
              </v-card>
            </v-dialog>
            <v-spacer></v-spacer>
            <v-menu bottom right> </v-menu>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="400">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :type="type"
          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card color="grey lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-btn icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.details"></span>
              </v-card-text>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogEvt: false,
    focus: "",
    form: false,
    type: "week",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    evenement: {
      nom: "",
      debut: "",
      fin: "",
    },
    events: [
],
    stackInfo: undefined,
  }),

  methods: {
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    addEvent: function() {
      this.body = {
        name: this.evenement.nom,
        startdate: this.evenement.debut,
        enddate: this.evenement.fin,
      };

      let newEvent = {
        name: this.body.name,
        start: this.body.startdate.replace("T", " "),
        end: this.body.enddate.replace("T", " "),
      };

      this.events.push(newEvent);
      this.dialogEvt = false;
      console.log(this.events);
    },
    getFuckingId: async function() {
      let url = `https://ter-garmin.herokuapp.com/api/users/${localStorage.email}`;
      await fetch(url).then((responseJSON) => {
        responseJSON.json().then((body) => {
          if (body.erreur) {
            this.stackInfo = null;
          } else {
            this.stackInfo = body;
            console.log("MESINFOS", this.stackInfo);
            console.log(this.stackInfo.firstname);
          }
        });
      });
    },
  },
  mounted() {
    this.getFuckingId();
    this.$refs.calendar.checkChange();
    this.addEvent();
  },
};
</script>

<style>
.fill-height {
  text-align: center;
}
</style>
