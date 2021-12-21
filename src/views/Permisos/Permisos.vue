<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="permisos"
      class="elevation-1"
      :loading="loading && !globalError"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Permisos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Agregar Permiso
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-observer ref="permisosForm">
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-provider name="nombre empleado" rules="required">
                          <div slot-scope="{ errors }">
                            <v-text-field
                              v-model="editedItem.nombreEmpleado"
                              label="Nombre Empleado"
                            ></v-text-field>
                            <span class="red--text">{{ errors[0] }}</span>
                          </div>
                        </v-provider>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-provider name="apellidos empleado" rules="required">
                          <div slot-scope="{ errors }">
                            <v-text-field
                              v-model="editedItem.apellidosEmpleado"
                              label="Apellidos Empleado"
                            ></v-text-field>
                            <span class="red--text">{{ errors[0] }}</span>
                          </div>
                        </v-provider>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-provider name="tipo permiso" rules="required">
                          <div slot-scope="{ errors }">
                            <v-autocomplete
                              label="Tipo Permiso"
                              item-text="descripcion"
                              item-value="id"
                              :items="tiposPermisos"
                              v-model="editedItem.tipoPermisoId"
                            >
                            </v-autocomplete>
                            <span class="red--text">{{ errors[0] }}</span>
                          </div>
                        </v-provider>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-provider name="fecha permiso" rules="required">
                          <div slot-scope="{ errors }">
                            <v-menu
                              ref="menu"
                              v-model="menu"
                              :close-on-content-click="false"
                              :return-value.sync="editedItem.fechaPermiso"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  v-model="editedItem.fechaPermiso"
                                  label="Fecha Permiso"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                                <span class="red--text">{{ errors[0] }}</span>
                              </template>

                              <v-date-picker
                                v-model="editedItem.fechaPermiso"
                                no-title
                                scrollable
                              >
                                <v-spacer></v-spacer>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="menu = false"
                                >
                                  Cancelar
                                </v-btn>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="
                                    $refs.menu.save(editedItem.fechaPermiso)
                                  "
                                >
                                  OK
                                </v-btn>
                              </v-date-picker>
                            </v-menu>
                          </div>
                        </v-provider>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-observer>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancelar
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                  :loading="loading && !globalError"
                >
                  {{ saveBtnText }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >¿Seguro desea eliminar este permiso?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancelar</v-btn
                >
                <v-btn
                  color="blue darken-1"
                  text
                  @click="deleteItemConfirm"
                  :loading="loading && !globalError"
                >
                  OK
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> edit </v-icon>
        <v-icon small @click="deleteItem(item)"> delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script src="./Permisos.js"></script>
