<template>
  <v-card>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">Nombre sede</th>
            <th class="text-center">Ciudad</th>
            <th class="text-center">Dirección</th>
            <th class="text-center">Zipcode</th>
            <th class="text-center">Nombre contacto</th>
            <th class="text-center">Email contacto</th>
            <th class="text-center">Celular contacto</th>
            <th class="text-center">¿Está activo?</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(itemCampus, index) in campuses" :key="index">
            <td>{{ itemCampus.name }}</td>
            <td>{{ itemCampus.location_city }}</td>
            <td>{{ itemCampus.location_address }}</td>
            <td>{{ itemCampus.location_zipcode }}</td>
            <td>{{ itemCampus.contact_name }}</td>
            <td>{{ itemCampus.contact_email }}</td>
            <td>{{ itemCampus.contact_phone }}</td>
            <td>
              <v-icon :color="itemCampus.active ? 'green darken-2' : 'red'">{{
                itemCampus.active ? "verified" : "unpublished"
              }}</v-icon>
            </td>
            <td>
              <v-icon small @click="viewCampus(itemCampus)">visibility</v-icon>
              <v-icon small @click="viewEditCampus(itemCampus)">edit</v-icon>
              <v-icon small @click="viewDeleteCampus(itemCampus)">delete</v-icon>
            </td>
          </tr>
        </tbody>

        <!-- Ver Campus-->

        <v-dialog v-model="dialogCampusesView" max-width="500px">
          <v-card>
            <v-card-title class="headline justify-center"
              >Details of {{ itemCampusView.name }}</v-card-title
            >
            <v-form>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      required
                      label="Nombre"
                      :value= itemCampusView.name
                      disabled
                      prepend-icon="perm_identity"
                    />
                  </v-col>

                  <v-col cols="12" md="6">
                    <p class="text--disabled">¿Está activo?</p>
                    <v-icon
                      :color="itemCampusView.active ? 'green darken-2' : 'red'"
                      >{{
                        itemCampusView.active ? "verified" : "unpublished"
                      }}</v-icon
                    >
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      required
                      label="Ciudad Sede"
                      :value= itemCampusView.location_city
                      disabled
                      prepend-icon="location_on"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      required
                      label="Dirección Sede"
                      :value= itemCampusView.location_address
                      disabled
                      prepend-icon="location_on"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      required
                      label="Zipcode Sede"
                      :value= itemCampusView.location_zipcode
                      disabled
                      prepend-icon="location_on"
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      required
                      label="Nombre Contacto"
                      :value= itemCampusView.contact_name
                      disabled
                      prepend-icon="perm_identity"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      required
                      label="Email Contacto"
                      :value= itemCampusView.contact_email
                      disabled
                      prepend-icon="perm_identity"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      required
                      label="Celular Contacto"
                      :value= itemCampusView.contact_phone
                      disabled
                      prepend-icon="perm_identity"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="deep-purple lighten-2"
                @click="dialogCampusesView = false"
                text
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Termina Ver Campus -->

        <!-- Inicia el editar Campus-->

        <v-dialog v-model="dialogCampusesEdit" max-width="500px">
          <v-card>
            <v-card-title class="headline justify-center"
              >Editar una sede</v-card-title
            >
            <v-form>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model= itemCampusEdit.name
                      :value= itemCampusEdit.name
                      required
                      :rules="nameRules"
                      label="Nombre"
                      prepend-icon="perm_identity"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-switch
                      v-model= itemCampusEdit.active
                      label="¿Está activo?"
                      color="success"
                      :value= itemCampusEdit.active
                      prepend-icon="check_circle"
                      hide-details
                    ></v-switch>
                  </v-col>
                </v-row>

                <!-- -->

                <!-- -->

                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model= itemCampusEdit.location_city
                      :value= itemCampusEdit.location_city
                      required
                      :rules="locationRules"
                      label="Ciudad Sede"
                      prepend-icon="location_on"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model= itemCampusEdit.location_address
                      :value= itemCampusEdit.location_address
                      required
                      :rules="locationRules"
                      label="Dirección Sede"
                      prepend-icon="location_on"
                    />
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model= itemCampusEdit.location_zipcode
                      :value= itemCampusEdit.location_zipcode
                      required
                      :rules="locationRules"
                      label="ZipCode Sede"
                      prepend-icon="location_on"
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model= itemCampusEdit.contact_name
                      :value= itemCampusEdit.contact_name
                      required
                      :rules="locationRules"
                      label="Nombre Contacto"
                      prepend-icon="perm_identity"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model= itemCampusEdit.contact_email
                      :value= itemCampusEdit.contact_email
                      required
                      :rules="locationRules"
                      label="Email Contacto"
                      prepend-icon="perm_identity"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model= itemCampusEdit.contact_phone
                      :value= itemCampusEdit.contact_phone
                      required
                      :rules="locationRules"
                      label="Celular Contacto"
                      prepend-icon="perm_identity"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="deep-purple lighten-2"
                @click="editCampuses(itemCampusEdit)"
                text
                >Editar</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Termina el editar Campus-->

        <!-- Inicia el dialog para cuando todo se hizo bien -->

        <v-dialog v-model="dialogSuccess" max-width="500px">
          <v-card>
            <v-card-title class="headline">Operación exitosa</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogSuccess = false"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Termina -->
        <!-- Inicia el dialog para-->

        <v-dialog v-model="dialogUsers" max-width="1200px">
          <v-card>
            <v-card-title class="headline"
              >Usuarios
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="dialogUsers = false">OK</v-btn>
            </v-card-title>
            <v-simple-table height="300px">
              <thead>
                <tr>
                  <th class="text-center">Nombre</th>
                  <th class="text-center">Apellido</th>
                  <th class="text-center">Email</th>
                  <th class="text-center">Fecha final</th>
                  <th class="text-center">¿Está activo?</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(itemUsers, index) in itemCampusView.users"
                  :key="index"
                >
                  <td>{{ itemUsers.name }}</td>
                  <td>{{ itemUsers.lastname }}</td>
                  <td>{{ itemUsers.email }}</td>
                  <td>{{ itemUsers.finalDate }}</td>
                  <td>
                    <v-icon
                      :color="itemUsers.active ? 'green darken-2' : 'red'"
                      >{{ item.active ? "how_to_reg" : "unpublished" }}</v-icon
                    >
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card>
        </v-dialog>

        <!-- Termina -->

        <!-- Dialog advertencia de que vas a eliminar una sede -->
        <v-dialog v-model="dialogCampusesDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >¿Seguro de que quiere eliminar esta sede?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="dialogCampusesDelete = false"
                >Cancel</v-btn
              >
              <v-btn
                color="blue darken-1"
                text
                @click="deleteCampuses(itemCampusDelete)"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Error cuando una sede tiene usuarios asociados -->
        <v-dialog v-model="dialogCampusesError" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >No se puede eliminar. La sede tiene asociado al menos un
              usuario.</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="dialogCampusesError = false"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- -->
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      itemCampusView: Object,
      itemCampusEdit: Object,
      itemCampusDelete: Object,
      dialogCampusesView: false,
      dialogUsers: false,
      dialogCampusesEdit: false,
      dialogCampusesDelete: false,
      dialogCampusesError: false,
      dialogSuccess: false,
    };
  },

  methods: {
        viewCampus(itemCampus) {
         this.itemCampusView = itemCampus;
         this.dialogCampusesView = true;
        },
        viewEditCampus(itemCampus) {
            this.dialogCampusesEdit = true;
            this.itemCampusEdit = Object.assing({}, itemCampus);
        },
        viewDeleteCampus(itemCampus) {
            this.dialogCampusesDelete = true;
            this.itemCampusDelete = Object.assign({}, itemCampus);
        },
        editCampuses(itemCampus) {
            this.dialogCampusesEdit = false;
            this.$store.dispatch("editCampuses", itemCampus);
            this.dialogSuccess = true;
        },
        deleteCampuses(itemCampus){
            if(itemCampus.users.length <= 0){
                this.dialogCampusesDelete = false;
                this.$store.dispatch("deleteCampuses", itemCampus);
                this.dialogSuccess = true;
            } else {
                this.dialogCampusesDelete = false;
                this.dialogCampusesError = true;
            }
        },
    },
    computed: {
        dependencies() {
            return this.$store.state.dependencies;
        },
    },
};
</script>

<style>
</style>