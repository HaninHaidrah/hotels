<template>
  <v-row justify="center">
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
                v-model="req.hotelName"
                required
                value="hotel.hotelName"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Hotel Descriptions"
                v-model="req.hotelDescription"
                hint="example of helper text only on focus"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Phone Number"
                v-model="req.phone"
                type="number"
                persistent-hint
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-autocomplete
                v-model="selectedRooms"
                :items="rooms"
                item-text="roomName"
                label="select the room "
                multiple
                return-object
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="handleAddHotels">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  name: "Hotel",

  data() {
    return {
      rooms: [],
      selectedRooms: "",
      req: {
        hotelName: "",
        phone: "",
        hotelDescription: "",
      },
      dialog: false,
    };
  },

  props: {
    hotel: Object,
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
    async handleAddHotels() {
      const payload = {
        rooms: this.selectedRooms,
        data: this.req,
      };

      let res = await axios.post(`http://localhost:5000/hotels`, payload);
      console.log(res.data);
    },
  },
};
</script>

<style></style>
