<template>
  <v-card width="500" shaped elevation="17" class="mx-auto mt-9">
    <v-card-title class="justify-center">Sign Up</v-card-title>
    <v-card-subtitle class="justify-center"
      >Registre una nueva sede</v-card-subtitle
    >
    <v-form v-model="isValid">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="campus.name"
              :value="campus.name"
              required
              :rules="nameRules"
              label="Nombre"
              prepend-icon="perm_identity"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-switch
              v-model="campus.active"
              label="¿Está activo?"
              color="success"
              :value="campus.active"
              prepend-icon="check_circle"
              hide-details
              required
            ></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="campus.location_city"
              required
              :rules="locationRules"
              label="Ciudad Sede"
              prepend-icon="location_on"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="campus.location_address"
              required
              :rules="locationRules"
              label="Dirección Sede"
              prepend-icon="location_on"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="campus.location_zipcode"
              required
              :rules="locationRules"
              label="Zipcode Sede"
              prepend-icon="location_on"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="campus.contact_name"
              required
              :rules="locationRules"
              label="Nombre Contacto"
              prepend-icon="perm_identity"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="campus.contact_email"
              required
              :rules="locationRules"
              label="Email Contacto"
              prepend-icon="perm_identity"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="campus.contact_phone"
              required
              :rules="locationRules"
              label="Celular Contacto"
              prepend-icon="perm_identity"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
              :disabled="!isValid"
              class="primary"
              @click="addToDependencies"
              >Registrar</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <!-- Show user has been added! -->
    <v-dialog v-model="dialogDependencyAdded" max-width="500px">
      <v-card>
        <v-card-title class="headline">
          La sede se ha agregado de forma exitosa</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialogDependencyAdded = false"
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
      campus: {
        id: 0,
        name: "",
        users: [],
        location_city: "",
        location_address: "",
        location_zipcode: "",
        contact_name: "",
        contact_email: "",
        contact_phone: 0,
        active: "",
      },
      dialogDependencyAdded: false,
      isValid: true,
      dialog: false,
      nameRules: [
        (name) => !!name || "Name is required",
        (name) => name.length >= 3 || "Name must be at least 3 characters",
      ],
    };
  },
  methods: {
    
  },
};
</script>