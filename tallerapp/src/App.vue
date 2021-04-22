
<template>
 <v-app id="tallerapp">
  <main>
    <div class="app-container">
    <header class="app-header">
      <NavBar></NavBar>
    </header>
      <div class="content">
         <router-view></router-view>
      </div>
    </div>
  </main>
  </v-app>
</template>

<script>
import {db} from "./main.js"
import NavBar from "./components/NavBar"

export default {
  name: "App",

  components: {
    NavBar,
  },

  created(){
    db.collection("campuses").get().then((camp) => {
      camp.forEach(doc => {
        this.$store.state.campuses.push(doc.data());
      })
    });

    db.collection("users").get().then((usr) => {
      usr.forEach(doc => {
        this.$store.state.users.push(doc.data());
      })
    });
  },
};
</script>

<style>
  #tallerapp {
    margin-top: 60px;
    font-family: 'Cabin', sans-serif;
    background-image: url("https://cgfrog.com/wp-content/uploads/2019/02/Download-free-gradients-for-photoshop-background-ui-electric-violet.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
  }  
  @import url('https://fonts.googleapis.com/css2?family=Cabin&family=Dancing+Script:wght@600;674&display=swap');
  
</style>
