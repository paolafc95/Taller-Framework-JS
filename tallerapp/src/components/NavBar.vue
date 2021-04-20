
<template>
  <div>
    <v-app-bar color="deep-purple lighten-2" app dark src="../assets/img-fondo.jpg">
    
      <v-app-bar-nav-icon to="/" plain > <v-icon>auto_awesome</v-icon> </v-app-bar-nav-icon>
      <v-toolbar-title id="title">
        Dennys & Paola
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items id="items">
      <v-btn to="/" plain >Inicio</v-btn> 
      <!-- <v-btn to="/user" plain><router-link to="/user">Agregar Usuario</router-link> </v-btn> -->
      <v-btn to="/user" plain >Agregar Usuario</v-btn>
      <v-btn to="/campus" plain >Agregar Sede</v-btn>
      <v-btn to="/campuses" plain >Sedes</v-btn>
      <v-btn to="/users" plain >Usuarios</v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "NavBar",

  
};
</script>

<style>
#title{
  font-family: 'Dancing Script', cursive;
  font-size: 45px
}
#items{
  font-family: 'Cabin', sans-serif;
  font-style: bold
  
}
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;674&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cabin&family=Dancing+Script:wght@600;674&display=swap');
</style>