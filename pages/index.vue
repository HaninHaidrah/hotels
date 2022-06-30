<template>
  <div>
    <AddHotel />
    <Hotel :hotels="hotels" />
  </div>
</template>

<script>
import AddHotel from "../components/AddHotel.vue";
import axios from "axios";
import Hotel from "../components/Hotels.vue";
import io from "socket.io-client";
import moment from "moment";

export default {
  components: { AddHotel, Hotel },
  name: "IndexPage",

  data() {
    return {
      hotels: "",
    };
  },
  created() {
    this.connectToServer();
  },
  mounted() {
    const allData = async () => {
      let res = await axios.get("http://localhost:5000/hotels/");
      this.hotels = res.data;
    };

    allData();
  },
  methods:{
    connectToServer(){
      this.socket=io.connect(``,{secure:true})

      
    }
  }
};
</script>
