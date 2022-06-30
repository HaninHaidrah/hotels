<template>
  <div>
    <v-row>
      <v-col cols="4">
        <v-card
          class="mx-auto my-12"
          max-width="700"
          :key="hotel.id"
          v-for="hotel in hotels"
        >
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img
            height="250"
            src="https://media.istockphoto.com/photos/luxury-resort-picture-id104731717?k=20&m=104731717&s=612x612&w=0&h=40INtJRzhmU1O4Rj24zdY8vj4aGsWpPaEfojaVQ8xBo="
          ></v-img>

          <v-card-title>{{ hotel.hotelName }}</v-card-title>

          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                :value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ms-4">4.5 (413)</div>
            </v-row>

            <div class="my-4 text-subtitle-1">$ •Hotels, Rooms</div>

            <div>
              {{ hotel.hotelDescription }}
            </div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-title>Tonight's availability Rooms </v-card-title>

          <v-card-text>
            <v-list dense>
              <v-subheader>Rooms</v-subheader>
              <v-list-item-group color="primary">
                <v-list-item v-for="(room, i) in hotel.rooms" :key="i">
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="room.roomName"
                      @click="handleclickedrooms(room)"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>

          <v-card-actions>
            <v-btn color="deep-purple lighten-2" text> Reserve </v-btn>

            <v-btn
              class="mx-2"
              fab
              dark
              large
              color="cyan"
              @click="handleUpdate(hotel)"
            >
              <v-icon dark> mdi-pencil </v-icon>
            </v-btn>
          </v-card-actions>

          <update-hotel v-if="showToggle" :hotel="hotel" :rooms="hotel.rooms" />
        </v-card> </v-col
    ></v-row>

    <PopUP v-if="showPopUp" :room="roomDetails" />
  </div>
</template>

<script>
import UpdateHotel from "./UpdateHotel.vue";
import PopUP from "./PopUp.vue";
export default {
  components: { UpdateHotel, PopUP },
  data() {
    return {
      showToggle: false,
      hotel: {},
      showPopUp: false,
      roomDetails:""
    };
  },
  props: {
    hotels: Array,
  },

  methods: {
    handleUpdate(hotel) {
      this.showToggle = !this.showToggle;
      console.log(hotel);
    },
    handleclickedrooms(room) {
      this.showPopUp = true;
      this.roomDetails=room
      console.log(this.roomDetails)
    },
  },
};
</script>

<style></style>
