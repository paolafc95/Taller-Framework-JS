<template>
  <v-card width="700"  elevation="17" class="mx-auto mt-9">
    <v-card-title class="justify-center">Registrar Usuario</v-card-title>
    <v-card-subtitle class="justify-center"
      >Registrar usuario</v-card-subtitle
    >
    <v-form v-model="isValid">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="user.name"
              required
              label="Nombre"
              :rules="nameRules"
              prepend-icon="badge"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="user.lastname"
              required
              :rules="lastNameRules"
              label="Apellido"
              prepend-icon="badge"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="user.email"
              required
              :rules="emailRules"
              label="Correo"
              prepend-icon="alternate_email"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="user.password"
              required
              :rules="passwordRules"
              label="Contraseña"
              prepend-icon="lock"
            />
          </v-col>
        </v-row>

        <v-row> 
          <v-col cols="12" md="6">
            <v-menu
              ref="menu2"
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="user.finalDate"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :rules="dateRules"
                  v-model="user.finalDate"
                  label="Válido hasta"
                  prepend-icon="event_available"
                  readonly
                  v-on="on"
                  required
                ></v-text-field>
              </template>
              <v-date-picker
                :rules="dateRules"
                v-model="user.finalDate"
                no-title
                scrollable
                required
              >
                <v-spacer></v-spacer>
                <v-btn color="deep-purple lighten-2" @click="menu2 = false">Cancelar</v-btn>
                <v-btn color="deep-purple lighten-2" @click="$refs.menu2.save(user.finalDate)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              v-model="user.campus"
              menu-props="auto"
              label="Sede"
              :items="campuses"
              item-text="name"
              item-value="id"
              hide-details
              prepend-icon="business"
              :rules="campusRules"
              single-line
              required
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-switch
              v-model="user.active"
              label="¿Está activo?"
              color="deep-purple darken-2"
              :value="user.active"
              prepend-icon="verified_user"
              hide-details
              required
            ></v-switch>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn :disabled="!isValid" class="deep-purple lighten-2" @click="addToUsers"
              >Registrar</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <!-- Show user has been added! -->
    <v-dialog v-model="dialogUserAdded" max-width="500px">
      <v-card>
        <v-card-title class="headline"> ¡Usuario agregado con éxito!</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogUserAdded = false"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      user: {
        id: 0,
        name: "",
        lastname: "",
        email: "",
        password: "",
        finalDate: null,
        campus: "",
        active: false,
      },
      dialogUserAdded: false,
      isValid: true,
      menu1: false,
      menu2: false,
      nameRules: [
        (name) => !!name || "Nombre requerido.",
        (name) => name.length >= 3 || "El nombre debe tener al menos 3 caracteres.",
      ],
      lastNameRules: [
        (lastName) => !!lastName || "Apellido requerido.",
        (lastName) =>
          lastName.length >= 3 || "El apellido debe tener al menos 3 caracteres.",
      ],
      emailRules: [
        (email) => !!email || "El correo debe tener al menos 3 caracteres.",
        (email) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) ||
          "Correo no es válido.",
      ],
      passwordRules: [
        (password) => !!password || "Contraseña requerida.",
        (password) =>
          password.length >= 8 || "La contraseña debe tener al menos 8 caracteres.",
      ],
      dateRules: [(date) => !!date || "Fecha requerida."],
      campusRules: [
        (campus) => !!campus || "Sede requerida.",
      ],
    };
  },
  computed: {
    campuses() {
      return this.$store.state.campuses;
    },
  },
  methods: {
    refresh() {
      this.user = {
        id: 0,
        name: "",
        lastname: "",
        email: "",
        password: "",
        initDate: null,
        finalDate: null,
        campus: "",
        active: false,
      };
    },
    addToUsers() {
      this.dialogUserAdded = false;
      var CryptoJS = require("crypto-js");
      var ciphertext = CryptoJS.AES.encrypt(
        this.user.password,
        "secret key 123"
      ).toString();
      this.user.password = ciphertext;
      this.$store.dispatch("addToUsers", this.user);
      this.refresh();
      this.dialogUserAdded = true;
    },
  },
};
</script>

<style>
</style>