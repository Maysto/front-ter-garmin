<template>
  <v-row class="fill-height">
    <v-col>
        <v-dialog v-model="dialog" persistent max-width="1000px" max-height="2000px">
      <template v-slot:activator="{ on }">
        <v-btn outlined color="black" class="fill-height" dark v-on="on">Calendrier de l'utilisateur</v-btn>
      </template>
      <v-sheet height="64">
        <v-toolbar
          flat
        >
          <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="setToday"
          >
            Today
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-btn color="blue darken-1" text 
                >Fermer</v-btn
              >
              <v-btn color="blue darken-1" text 
                >Ajouter un evenement</v-btn
              >

          <v-spacer></v-spacer>
          <v-menu
            bottom
            right
          >
           
           
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="400">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
         
         
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
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
        dialog : false,
      focus: '',
      type: 'week',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      stackInfo:undefined,
      
    }),
    
    methods: {
        
      
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      getFuckingId: async function() {
      let url = `https://ter-garmin.herokuapp.com/api/users/${localStorage.email}`;
      await fetch(url).then((responseJSON) => {
        responseJSON.json().then((body) => {
            if(body.erreur){
                this.stackInfo = null;
            } else {
                this.stackInfo = body;
                console.log("MESINFOS",this.stackInfo);
                console.log(this.stackInfo.firstname);
            }
        })
      });
    },
      
    },
    mounted () {
        this.getFuckingId()
      this.$refs.calendar.checkChange()
      
    },
  }
</script>

<style>
.fill-height{
    text-align: center;
}
</style>