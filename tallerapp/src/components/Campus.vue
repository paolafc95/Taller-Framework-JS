<template>
  <v-card max-width="800" elevation="15" class="mx-auto mt-12">
    <v-card-title class="justify-center">Registrar nueva sede</v-card-title>
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
              :rules="name_rules"
              label="Nombre"
              prepend-icon="business"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-switch
              v-model="campus.active"
              label="¿Está activo?"
              class="ma-2 white--text"
              color="deep-purple darken-2"
              :value="campus.active"
              prepend-icon="verified_user"
              hide-details
              required
            ></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="campus.location_city"
              required
              :rules="location_city_rules"
              label="Ciudad Sede"
              prepend-icon="location_city"
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="campus.location_address"
              required
              :rules="location_address_rules"
              label="Dirección Sede"
              prepend-icon="location_on"
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="campus.location_zipcode"
              required
              :rules="location_zipcode_rules"
              label="Zipcode Sede"
              prepend-icon="location_on"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="campus.contact_name"
              required
              :rules="contact_name_rules"
              label="Nombre Contacto"
              prepend-icon="person"
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="campus.contact_email"
              required
              :rules="contact_email_rules"
              label="Email Contacto"
              prepend-icon="alternate_email"
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="campus.contact_phone"
              required
              :rules="contact_phone_rules"
              label="Celular Contacto"
              prepend-icon="phone_iphone"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
              :disabled="!isValid"
              class="ma-2 white--text"
              color="deep-purple darken-2"
              @click="addToCampuses"
              >Registrar</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <!-- Show user has been added! -->
    <v-dialog v-model="dialogCampusAdded" max-width="500px">
      <v-card>
        <v-card-title class="headline">
          La sede se ha agregado de forma exitosa</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="ma-2 white--text"
            color="deep-purple darken-2"
            text
            @click="dialogCampusAdded = false"
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
      dialogCampusAdded: false,
      isValid: true,
      dialog: false,
      name_rules: [
        (name) => !!name || "El nombre de la sede es requerido.",
        (name) => name.length >= 2 || "El nombre debe tener más de dos caracteres",
      ],
      contact_name_rules: [
        (contact_name) => !!contact_name || "El nombre del contacto es requerido.",
        (contact_name) =>
          contact_name.length >= 3 ||
          "El nombre de contacto debe tener más de 3 carácteres.",
      ],
      contact_email_rules: [
        (contact_email) => !!contact_email || "El email de contacto es requerido.",
        (contact_email) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(contact_email) ||
          "El email de contacto es inválido.",
      ],
      location_address_rules: [
          (location_address) => !!location_address || "La dirección de la sede es requerida.",
      ],
      location_city_rules: [
          (location_city) => !!location_city || "La ciudad de ubicación de la sede es requerida.",
      ],
      location_zipcode_rules: [
          (location_zipcode) => !!location_zipcode || "El zipcode es requerido.",
          (location_zipcode) => location_zipcode >= 3 || "El zipcode debe tener más de 3 carácteres.",
      ],
      contact_phone_rules: [
        (contact_phone) => contact_phone.length == 10 || "El celular de contacto debe tener 10 números."
      ]

    };
  },
  methods: {
    refresh() {
      this.campus = {
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
      };
    },
    addToCampuses() {
      this.dialogCampusAdded = false;
      this.$store.dispatch("addToCampuses", this.campus);
      this.refresh();
      this.dialogCampusAdded = true;
    },
  },
};
</script>