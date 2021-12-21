import Vue from "vue";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Nombre Empleado", value: "nombreEmpleado" },
      { text: "Apellidos Empleado", value: "apellidosEmpleado" },
      { text: "Fecha Permiso", value: "fechaPermiso" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      nombreEmpleado: "",
      apellidosEmpleado: "",
      tipoPermisoId: null,
      fechaPermiso: null
    },
    defaultItem: {
      nombreEmpleado: "",
      apellidosEmpleado: "",
      tipoPermisoId: null,
      fechaPermiso: null
    },
    loading: false,
    menu: false,
    permisos: [],
    tiposPermisos: [],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Agregar Permiso" : "Editar Permiso";
    },
    globalError(){
      return !!this.$store.state.error;
    },
    saveBtnText() {
      return this.editedIndex === -1 ? "Agregar" : "Editar";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    async fetchPermisos() {
      const { data } = await Vue.axios("api/permisos");

      this.permisos = data.map((permiso) => {
        permiso.fechaPermiso = permiso.fechaPermiso.substr(0, 10);
        return permiso;
      });
    },

    async fetchTiposPermisos() {
      const { data } = await Vue.axios("api/tipos-permisos");
      this.tiposPermisos = data;
    },

    async initialize() {
      this.loading = true;

      await this.fetchPermisos();
      await this.fetchTiposPermisos();

      this.loading = false;
    },

    editItem(item) {
      this.editedIndex = this.permisos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.permisos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      this.loading = true;
      await Vue.axios({
        url: `api/permisos/${this.editedItem.id}`,
        method: "DELETE",
      });
      this.closeDelete();
      this.initialize();
      this.loading = false;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      if(!await this.$refs.permisosForm.validate() || !this.editedItem.fechaPermiso) return;

      this.loading = true;

      if (this.editedIndex === -1) {
        await Vue.axios({
          url: "api/permisos",
          method: "POST",
          data: this.editedItem,
        });
      } else {
        await Vue.axios({
          url: `api/permisos/${this.editedItem.id}`,
          method: "PUT",
          data: this.editedItem,
        });
      }
      this.close();
      this.initialize();
      this.loading = false;
    },
  },
};
