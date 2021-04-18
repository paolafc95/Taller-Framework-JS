<template>
  <div>
    <v-app-bar color="blue" app dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>
        Dennys-Paola
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn to="/" text rounded>Inicio</v-btn>
      <v-btn to="/user" text rounded>Agregar Usuario</v-btn>
      <v-btn to="/campus" text rounded>Agregar Sede</v-btn>
      <v-btn to="/campuses" text rounded>Sedes</v-btn>
      <v-btn to="/users" text rounded>Usuarios</v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "NavBar",

  
};
</script>

<style></style>
