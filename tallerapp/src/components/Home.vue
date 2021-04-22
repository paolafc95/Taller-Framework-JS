<template>
  <div>
    <v-main wrap >
      <v-card width="700" elevation="17" flat class="mx-auto mt-9">
        <v-card-title class="justify-center">Unirse ahora</v-card-title>
        <!-- <v-card-subtitle class="justify-center">welcome</v-card-subtitle> -->
        <v-form v-model="isValid">
          <v-card-text>
            <v-text-field
              required
              v-model="itemUser.email"
              label="Correo"
              :rules="emailRules"
              prepend-icon="alternate_email"
            />
            <v-text-field
              label="Contraseña"
              v-model="itemUser.password"
              :type="showPassword ? 'text' : 'password'"
              prepend-icon="lock"
              :append-icon="showPassword ? 'visibility' : 'visibility_off'"
              @click:append="showPassword = !showPassword"
              :rules="passwordRules"
              required
            />
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-center">
            <v-btn color="deep-purple lighten-2" :disabled="!isValid" @click="verifyLogin()"
              >Ingresar</v-btn
            >
          </v-card-actions>
          <v-card-actions class="justify-center">
            <v-btn to="/user" text>Registrarse</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
      <!-- Loader -->
      <v-dialog v-model="dialogLoader" hide-overlay persistent width="300">
        <v-card color="deep-purple lighten-2" dark>
          <v-card-text>
            Buscando en la Base de Datos...
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>

      <!-- Revisar si el usuario se encuentra en la BD -->
      <v-dialog
        v-if="!dialogLoader"
        v-model="dialogLogin"
        :loading="dialogLogin"
        max-width="500px"
      >
        <v-card>
          <v-card-title v-if="isUser" class="headline"
            >¡Se ha encontrado en la Base de Datos!
          </v-card-title>
          <v-card-title v-else class="headline"
            >Correo o contraseña inválido.
          </v-card-title>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="deep-purple lighten-1" text @click="refresh()">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </div>
</template>

<script>
import { db } from "../main";

export default {
  data() {
    return {
      dialogLogin: false,
      dialogErrorEmail: false,
      dialogErrorPassword: false,
      dialogLoader: false,
      showPassword: false,
      isValid: true,
      itemUser: {
        email: "",
        password: "",
      },
      isUser: false,
      emailRules: [
        (email) => !!email || "Correo requerido.",
        (email) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) ||
          "Correo no válido.",
      ],
      passwordRules: [
        (password) => !!password || "Contraseña requerida.",
        (password) =>
          password.length >= 8 || "La contraseña debe tener al menos 8 caracteres.",
      ],
    };
  },
  watch: {
    dialogLoader(val) {
      if (!val) return;

      setTimeout(() => (this.dialogLoader = false), 3000);
    },
  },
  methods: {
    verifyLogin() {
      this.dialogLoader = true;
      this.isUser = false;
      db.collection("users")
        .get()
        .then((up) => {
          up.forEach((doc) => {
            var CryptoJS = require("crypto-js");
            var bytes = CryptoJS.AES.decrypt(
              doc.data().password,
              "secret key 123"
            );
            var originaltext = bytes.toString(CryptoJS.enc.Utf8);
            if (
              doc.data().email === this.itemUser.email &&
              originaltext === this.itemUser.password
            ) {
              this.isUser = true;
            }
          });
        });

      this.dialogLogin = true;
    },
    refresh() {
      this.isUser = false;
      this.dialogLogin = false;
    },
  },
};
</script>

<style>
#home-bg {
  background-image: url("https://cgfrog.com/wp-content/uploads/2019/02/Download-free-gradients-for-photoshop-background-ui-electric-violet.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  
/* background: #FEAC5E;  fallback for old browsers */
/* background: -webkit-linear-gradient(to top, #4BC0C8, #C779D0, #FEAC5E);  Chrome 10-25, Safari 5.1-6 */
/* background: linear-gradient(to top, #4BC0C8, #C779D0, #FEAC5E); W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>