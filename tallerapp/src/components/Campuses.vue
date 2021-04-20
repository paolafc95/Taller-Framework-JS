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
              <v-icon small @click="viewEdit(itemCampus)">edit</v-icon>
              <v-icon small @click="viewDelete(itemCampus)">delete</v-icon>
            </td>
          </tr>
        </tbody>

        <!-- Ver Campus-->

        <v-dialog v-model="dialogDetails" max-width="500px">
          <v-card>
            <v-card-title class="headline justify-center"
              >Details of {{ itemView.name }}</v-card-title
            >
            <v-form>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      required
                      label="Nombre"
                      :value="itemCampusView.name"
                      disabled
                      prepend-icon="perm_identity"
                    />
                  </v-col>

                  <v-col cols="12" md="6">
                    <p class="text--disabled">¿Está activo?</p>
                    <v-icon
                      :color="itemView.active ? 'green darken-2' : 'red'"
                      >{{
                        itemView.active ? "verified" : "unpublished"
                      }}</v-icon
                    >
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      required
                      label="Ciudad Sede"
                      :value="itemCampusView.location_city"
                      disabled
                      prepend-icon="record_voice_over"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      required
                      label="Dirección Sede"
                      :value="itemCampusView.location_address"
                      disabled
                      prepend-icon="location_on"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      required
                      label="Zipcode Sede"
                      :value="itemCampusView.location_zipcode"
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
                      :value="itemCampusView.contact_name"
                      disabled
                      prepend-icon="perm_identity"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      required
                      label="Email Contacto"
                      :value="itemCampusView.contact_email"
                      disabled
                      prepend-icon="perm_identity"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      required
                      label="Celular Contacto"
                      :value="itemCampusView.contact_phone"
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
                @click="dialogDetails = false"
                text
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Termina Ver Campus -->

        <!-- Inicia el editar Campus-->

        <v-dialog v-model="dialogEdit" max-width="500px">
          <v-card>
            <v-card-title class="headline justify-center"
              >Editar una sede</v-card-title
            >
            <v-form>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="itemCampusEdit.name"
                      :value="itemCampusEdit.name"
                      required
                      :rules="nameRules"
                      label="Nombre"
                      prepend-icon="perm_identity"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-switch
                      v-model="itemCampusEdit.active"
                      label="¿Está activo?"
                      color="success"
                      :value="itemEdit.active"
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
                      v-model="itemCampusEdit.location_city"
                      :value="itemCampusEdit.location_city"
                      required
                      :rules="locationRules"
                      label="Ciudad Sede"
                      prepend-icon="location_on"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="itemCampusEdit.location_address"
                      :value="itemCampusEdit.location_address"
                      required
                      :rules="locationRules"
                      label="Dirección Sede"
                      prepend-icon="location_on"
                    />
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="itemCampusEdit.location_zipcode"
                      :value="itemCampusEdit.location_zipcode"
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
                        v-model="itemCampusEdit.contact_name"
                        :value="itemCampusEdit.contact_name"
                        required
                        :rules="locationRules"
                        label="Nombre Contacto"
                        prepend-icon="perm_identity"
                        />
                  </v-col>
                  <v-col cols="12" md="6">
                        <v-text-field
                        v-model="itemCampusEdit.contact_email"
                        :value="itemCampusEdit.contact_email"
                        required
                        :rules="locationRules"
                        label="Email Contacto"
                        prepend-icon="perm_identity"
                        />
                  </v-col>
                  <v-col cols="12" md="6">
                        <v-text-field
                        v-model="itemCampusEdit.contact_phone"
                        :value="itemCampusEdit.contact_phone"
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
                @click="editDependency(itemCampusEdit)"
                text>Editar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Termina el editar Campus-->

        
      </template>
    </v-simple-table>
  </v-card>
</template>
