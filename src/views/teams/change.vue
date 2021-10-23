<template>
  <div>
    <h4 class="text-uppercase px-4 py-2">{{ status }}</h4>
    <ValidationObserver v-slot="{ handleSubmit }" slim>
      <form
        novalidate
        id="initialForm"
        @submit.prevent="handleSubmit(onSubmit)"
        class="space-y-2 py-2 px-4"
        style="width: 500px"
      >
        <ValidationProvider
          name="team-name"
          :rules="{ required: true }"
          v-slot="{ errors, classes }"
        >
          <label for="team-title">Name</label>
          <input
            class="form-control form-control-sm"
            :class="
              classes.validated || team.name
                ? 'border-success'
                : 'border-danger'
            "
            type="text"
            v-model="team.name"
          />
          <template v-if="classes.dirty || classes.validated">
            <span
              class="text-danger text-sm"
              v-for="error in errors"
              :key="error"
              >{{ error }}</span
            >
          </template>
        </ValidationProvider>
        <ValidationProvider
          name="city"
          :rules="{ required: true }"
          v-slot="{ errors, classes }"
        >
          <label for="team-title">City</label>
          <v-select
            class="form-select border"
            :class="
              classes.validated || team.city_id
                ? 'border-success'
                : 'border-danger'
            "
            :options="cities"
            label="name"
            :searchable="true"
            :reduce="(city) => city.id"
            v-model="team.city_id"
          >
            <template #list-footer>
              <div class="row">
                <div class="col text-left">
                  <button type="button" class="btn btn-info btn-sm text-white" @click="moveToAll()">
                    All
                  </button>
                </div>

                <div class="col text-right">
                  <button type="button" class="btn btn-info btn-sm text-white" @click="moveToAddNew()">
                    Add new
                  </button>
                </div>
              </div>
            </template>
          </v-select>
          <template v-if="classes.dirty || classes.validated">
            <span
              class="text-danger text-sm"
              v-for="error in errors"
              :key="error"
              >{{ error }}</span
            >
          </template>
        </ValidationProvider>
        <div class="mt-2">
          <button class="btn btn-success" type="submit">Save</button>
        </div>
      </form>
    </ValidationObserver>
    <div class="form-group"></div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { actions, getters } from "../../utils/store_schema";
const _page = "team";
const _city = "city";
const { put, post, getById } = actions(_page);
const { get } = actions(_city);
export default {
  data() {
    return {
      team: {
        id: null,
        name: "",
        city_id: null,
      },
      cities: [],
      status: "",
    };
  },
  mounted() {
    this.status = this.$route.query.status === "edit" ? "Editable" : "New";
    this.fetchCities().then(() => {
      if (this.$route.query.status === "edit") this.fetchTeamDetail();
    });
  },
  computed: {
    ...mapGetters(getters(_page)),
  },
  methods: {
    moveToAll() {
      this.$router.push({
        path: `/cities`,
        query: { status: 'new', from: this.$route.path },
      });
    },
    moveToAddNew() {
      this.$router.push({
        path: `/cities/change`,
        query: { status: 'new', from: this.$route.path },
      });
    },
    onSubmit() {
      this.$store
        .dispatch(this.team.id ? put : post, {
          id: this.team.id,
          data: this.team,
        })
        .then((res) => {
          if (res) {
            this.$router.push({
              path: `/${this.$route.query.from}`,
              query: this.team,
            });
          }
        });
    },
    async fetchCities() {
      await this.$store.dispatch(get).then((res) => {
        this.cities = res;
      });
    },
    async fetchTeamDetail() {
      await this.$store.dispatch(getById, this.$route.query.id).then((res) => {
        this.team = res;
      });
    },
  },
};
</script>
<style scoped>
.hover-color:hover {
  color: blue;
}
select option[value="changing"] {
  color: rgba(50, 108, 231, 0.3);
}
</style>