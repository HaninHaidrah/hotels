<template>
  <v-row>
    <v-btn class="mx-2" fab dark color="indigo" @click="dialog = ture">
      <v-icon dark> mdi-plus </v-icon>
    </v-btn>

    <v-card style="margin-top: 5%">
      <v-card-title>
        <span class="text-h5">Hotels</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Hotel Name"
                v-model="hotel.hotelName"
                required
                value="hotel.hotelName"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Hotel Descriptions"
                v-model="hotel.hotelDescription"
                hint="example of helper text only on focus"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Phone Number"
                v-model="hotel.phone"
                type="number"
                persistent-hint
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- <v-row>
            <v-col cols="12"> <h3>Rooms</h3> </v-col>
            <div :key="room.id" v-for="room in rooms" style="width: 100%">
              <v-col cols="4" sm="6" md="4">
                <h4>{{ room.roomName }}</h4>
                <v-text-field
                  label="Room Name"
                  v-model="roomReq.roomName"
                  persistent-hint
                  return-object
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <h4>{{ room.roomDescription }}</h4>
                <v-text-field
                  label="Room Description"
                  v-model="roomReq.roomDescription"
                  persistent-hint
                    return-object
                  required
                ></v-text-field>
              </v-col>
            </div>
          </v-row> -->
        </v-container>

        <small>*indicates required field</small>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="handleUpdateHotels">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  name: "UpdateHotel",

  data() {
    return {
      rooms: [],

      selectedRooms: "",
      hotel: {
        hotelName: "",
        phone: "",
        hotelDescription: "",
      },
      dialog: false,
    };
  },
  props: {
    hotel: Object,
    rooms: Array,
  },

  mounted() {
    const roomsData = async () => {
      let res = await axios.get("http://localhost:5000/rooms");
      this.rooms = res.data;
    };
    roomsData();
  },

  updated() {},

  methods: {
    async handleUpdateHotels() {
      console.log(this.hotel);

      const data = this.hotel;

      let res = await axios.put(
        `http://localhost:5000/hotels/${this.hotel.hotelId}`,
        data
      );
      this.hotel = res.data;
      console.log(res.data);
    },
  },
};
</script>

<style></style>
