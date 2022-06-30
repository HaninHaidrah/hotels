<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Room Details : </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <!-- <h6>{{ room.roomName }}</h6> -->
                <v-text-field
                  label="Room Name"
                  v-model="room.roomName"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <!-- <h4>{{ room.roomDescription }}</h4> -->

                <v-text-field
                  label="Room Describtions"
                  v-model="room.roomDescription"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4"> </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="handleUpdateRooms">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import axios from "axios";
export default {
  name: "PopUp",
  data() {
    return {
      room: {
        roomName: "",
        roomDescription: "",
      },
      dialog: false,
    };
  },

  props: {
    room: Object,
  },
  methods: {
    async handleUpdateRooms() {
      console.log(this.room);

      const data = this.room;

      let res = await axios.put(
        `http://localhost:5000/rooms/${this.room.roomId}`,
        data
      );
      this.room = res.data;
      console.log(res.data);
    },
  },
};
</script>
