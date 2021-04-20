<template>
  <v-card width="1300"  elevation="17" class="mx-auto mt-9">
    <v-card-title>
      <v-select
        v-model="filter"
        :items="items"
        attach
        chips
        label="Filtrar por: "
      >
        <template v-slot:selection="data">
          <v-chip
            :key="JSON.stringify(data.item)"
            v-bind="data.attrs"
            :input-value="data.selected"
            :disabled="data.disabled"
            @click:close="data.parent.selectItem(data.item)"
          >
            <v-avatar
              class="accent white--text"
              left
              v-text="data.item.slice(0, 1).toUpperCase()"
            ></v-avatar>
            {{ data.item }}
          </v-chip>
        </template>
      </v-select>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" label="Buscar" single-line hide-details>
      </v-text-field>
      <v-icon @click="searchUsers()">search</v-icon>
    </v-card-title>

    <v-simple-table height="350px">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">Nombre</th>
            <th class="text-center">Apellido</th>
            <th class="text-center">Correo</th>
            <th class="text-center">Válido hasta</th>
            <th class="text-center">Sede</th>
            <th class="text-center">¿Está activo?</th>
            <th class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in users" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.lastname }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.finalDate }}</td>
            <td>
              {{ campuses.find((dep) => dep.id === item.campus).name }}
            </td>
            <td>
              <v-icon :color="item.active ? 'deep-purple darken-2' : 'red'">{{
                item.active ? "how_to_reg" : "unpublished"
              }}</v-icon>
            </td>
            <td>
              <v-icon small @click="viewUser(item)">visibility</v-icon>
              <v-icon small @click="viewEdit(item)">edit</v-icon>
              <v-icon small @click="getUserDelete(item)">delete</v-icon>
            </td>
          </tr>
        </tbody>
        <!-- Dialogo detalles del usuario-->
        <v-dialog v-model="dialogDetails" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Detalles del usuario {{ itemView.name }}</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="deep-purple lighten-2" text @click="viewItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Dialogo advertencia -->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >¿Seguro que quiere eliminar este item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="deep-purple lighten-2" text @click="closeDelete"
                >Cancelar</v-btn
              >
              <v-btn color="deep-purple lighten-2" text @click="deleteUsers(itemDelete)"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Dialogo para editar un usuario-->
        <v-dialog v-model="dialogEdit" max-width="500px">
          <v-card shaped elevation="17">
            <v-card-title class="headline justify-center"
              >Editar usuarios</v-card-title
            >
            <v-form>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="itemEdit.name"
                      required
                      label="Nombre"
                      :rules="nameRules"
                      prepend-icon="badge"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="itemEdit.lastname"
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
                      v-model="itemEdit.email"
                      required
                      :rules="emailRules"
                      label="Correo"
                      prepend-icon="alternate_email"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="itemEdit.password"
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
                      :return-value.sync="itemEdit.finalDate"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          :rules="dateRules"
                          v-model="itemEdit.finalDate"
                          label="Válido hasta"
                          prepend-icon="event_available"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        :rules="dateRules"
                        v-model="itemEdit.finalDate"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn color="" @click="menu2 = false"
                          >Cancelar</v-btn
                        >
                        <v-btn
                          color="deep-purple lighten-2"
                          @click="$refs.menu2.save(itemEdit.finalDate)"
                          >OK</v-btn
                        >
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="itemEdit.campus"
                      menu-props="auto"
                      label="Sede"
                      :items="campuses"
                      item-text="name"
                      item-value="id"
                      hide-details
                      prepend-icon="business"
                      :rules="campusRules"
                      single-line
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-switch
                      v-model="itemEdit.active"
                      label="¿Está activo?"
                      color="deep-purple darken-2"
                      :value="itemEdit.active"
                      prepend-icon="verified_user"
                      hide-details
                    ></v-switch>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="deep-purple lighten-2" @click="editUsers(itemEdit)" text
                >Actualizar</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Dialogo de operación exitosa -->
        <v-dialog v-model="dialogSuccess" max-width="500px">
          <v-card>
            <v-card-title class="headline">Operación concluida con éxito</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="deep-purple lighten-2" text @click="dialogSuccess = false"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Dialogo error en búsqueda -->
        <v-dialog v-model="dialogError" max-width="500px">
          <v-card>
            <v-card-title class="headline justify-center"
              >Ha ocurrido un error, por favor revisar la búsqueda.</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="deep-purple lighten-2" text @click="dialogError = false"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Dialogo con resultados de la búsqueda -->
        <v-dialog v-model="dialogSearch" max-width="1200px">
          <v-card>
            <v-card-title class="headline justify-center"
              >Cuadro de resultados</v-card-title
            >

            <v-simple-table height="350px">
              <thead>
                <tr>
                  <th class="text-center">Nombre</th>
                  <th class="text-center">Apellido</th>
                  <th class="text-center">Correo</th>
                  <th class="text-center">Válido hasta</th>
                  <th class="text-center">Sede</th>
                  <th class="text-center">¿Está activo?</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in results" :key="index">
                  <td>{{ item.name }}</td>
                  <td>{{ item.lastname }}</td>
                  <td>{{ item.email }}</td>
                  <td>{{ item.initDate }}</td>
                  <td>{{ item.finalDate }}</td>
                  <td>
                    {{
                      campuses.find((dep) => dep.id === item.campus)
                        .name
                    }}
                  </td>
                  <td>
                    <v-icon :color="item.active ? 'deep-purple darken-2' : 'red'">{{
                      item.active ? "how_to_reg" : "unpublished"
                    }}</v-icon>
                  </td>
                </tr>
              </tbody></v-simple-table
            >

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="deep-purple lighten-2" text @click="dialogSearch = false"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
    </v-simple-table>
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
    <!-- Dialogo no resultados encontrados -->
    <v-dialog v-model="dialogEmptyResults" max-width="500px">
      <v-card>
        <v-card-title class="headline justify-center"
          >No se han encontrado resultados en la Base de Datos.</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="deep-purple lighten-2" text @click="dialogEmptyResults = false"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
//import { db } from "../main";
export default {
  data() {
    return {
      items: ["name", "campus"],
      itemView: Object,
      filter: "",
      search: "",
      results: [],
      dialogLoader: false,
      dialogDelete: false,
      dialogDetails: false,
      dialogEdit: false,
      dialogSuccess: false,
      dialogError: false,
      dialogSearch: false,
      dialogEmptyResults: false,
      itemDelete: Object,
      itemEdit: Object,
      menu1: false,
      menu2: false,
      nameRules: [
        (name) => !!name || "Name is required",
        (name) => name.length >= 3 || "Name must be at least 3 characters",
      ],
      lastNameRules: [
        (lastName) => !!lastName || "Lastname is required",
        (lastName) =>
          lastName.length >= 3 || "Lastname must be at least 3 characters",
      ],
      emailRules: [
        (email) => !!email || "Email is required.",
        (email) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) ||
          "Email is invalid",
      ],
      passwordRules: [
        (password) => !!password || "Password is required",
        (password) =>
          password.length >= 8 || "Password must be at least 8 characters",
      ],
      dateRules: [(date) => !!date || "Date is required"],
      campusRules: [
        (campus) => !!campus || "Campus is required",
      ],
    };
  },
  watch: {
    dialogLoader(val) {
      if (!val) return;

      setTimeout(() => (this.dialogLoader = false), 4000);
    },
  },
  methods: {
    closeDelete() {
      this.dialogDelete = false;
    },
    viewUser(item) {
      this.itemView = item;
      this.dialogDetails = true;
    },
    viewItemConfirm() {
      this.dialogDetails = false;
    },
    getUserDelete(item) {
      this.itemDelete = item;
      this.dialogDelete = true;
    },
    deleteUsers(payload) {
      this.$store.dispatch("deleteUsers", payload);
      this.dialogDelete = false;
      this.dialogSuccess = true;
    },
    viewEdit(item) {
      this.dialogEdit = true;
      this.itemEdit = Object.assign({}, item);
      var CryptoJS = require("crypto-js");
      var bytes = CryptoJS.AES.decrypt(
        this.itemEdit.password,
        "secret key 123"
      );
      var originaltext = bytes.toString(CryptoJS.enc.Utf8);
      this.itemEdit.password = originaltext;
    },
    editUsers(payload) {
      this.dialogEdit = false;
      var CryptoJS = require("crypto-js");
      var ciphertext = CryptoJS.AES.encrypt(
        payload.password,
        "secret key 123"
      ).toString();
      payload.password = ciphertext;
      this.$store.dispatch("editUsers", payload);
      this.dialogSuccess = true;
    },
    searchUsers() {
      this.results = [];
      this.dialogEmptyResults = false;
      this.dialogError = false;
      this.dialogSearch = false;

      if (this.filter === "name") {
        this.$store.state.users.forEach((up) => {
          if (up.name === this.search) {
            this.results.push(up);
          }
        });
        if (this.results.length <= 0) {
          this.dialogEmptyResults = true;
        } else {
          this.dialogSearch = true;
        }
      } else if (this.filter === "campus") {
        this.$store.state.campuses.forEach((up) => {
          if (up.name === this.search) {
            this.results = up.users;
          }
        });
        if (this.results.length <= 0) {
          this.dialogEmptyResults = true;
        } else {
          this.dialogSearch = true;
        }
      } else if (this.filter === "") {
        this.dialogError = true;
      }
    },
  },

  computed: {
    users() {
      return this.$store.state.users;
    },
    campuses() {
      return this.$store.state.campuses;
    },
  },
};
</script>

<style>
</style>