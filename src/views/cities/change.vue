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
          name="city-name"
          :rules="{ required: true }"
          v-slot="{ errors, classes }"
        >
          <label for="city-title">Name</label>
          <input
            class="form-control form-control-sm"
            :class="
              classes.validated || city.name
                ? 'border-success'
                : 'border-danger'
            "
            type="text"
            v-model="city.name"
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
          <label for="team-title">Country</label>
          <v-select
            class="form-select border"
            :class="
              classes.validated || city.country_id
                ? 'border-success'
                : 'border-danger'
            "
            :options="countries"
            label="name"
            :searchable="true"
            :reduce="(country) => country.id"
            v-model="city.country_id"
          >
            <template #list-footer>
              <div class="row">
                <div class="col text-left">
                  <button
                    type="button"
                    class="btn btn-info btn-sm text-white"
                    @click="moveToAll()"
                  >
                    All
                  </button>
                </div>

                <div class="col text-right">
                  <button
                    type="button"
                    class="btn btn-info btn-sm text-white"
                    @click="moveToAddNew()"
                  >
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
const _page = "city";
const _city = "country";
const { put, post, getById } = actions(_page);
const { get } = actions(_city);
export default {
  data() {
    return {
      city: {
        id: null,
        name: "",
        country_id: null,
      },
      countries: [],
      status: "",
    };
  },
  mounted() {
    this.status =
      this.$route.query.status === "edit" ? "Edit City" : "New City";
    console.log("From Select", this.$route.query);
    if (this.$route.query.country_id) {
      this.city.country_id = parseInt(this.$route.query.country_id);
    }
    this.fetchCountries().then(() => {
      if (this.$route.query.status === "edit") this.fetchCityDetail();
    });
  },
  computed: {
    ...mapGetters(getters(_page)),
  },
  methods: {
    moveToAll() {
      this.$router.push({
        path: `/countries`,
      });
    },
    moveToAddNew() {
      this.$router.push({
        path: `/countries/change`,
        query: {
          action: "select",
          city_id: this.city.id,
          from: this.$route.path,
        },
      });
    },
    onSubmit() {
      this.$store
        .dispatch(this.city.id ? put : post, {
          id: this.city.id,
          data: this.city,
        })
        .then((res) => {
          if (res) {
            if (this.$route.query.action === "select")
              this.$router.push({
                path: `/${this.$route.query.from}`,
                query: { status: "edit", id: res.id },
              });
            else
              this.$router.push({
                path: `/cities`,
              });
          }
        });
    },
    async fetchCountries() {
      await this.$store.dispatch(get).then((res) => {
        this.countries = res;
      });
    },
    async fetchCityDetail() {
      await this.$store.dispatch(getById, this.$route.query.id).then((res) => {
        this.city = res;
        if (this.$route.query.country_id) {
          this.city.country_id = parseInt(this.$route.query.country_id);
        }
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