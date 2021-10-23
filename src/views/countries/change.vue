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
          name="country-name"
          :rules="{ required: true }"
          v-slot="{ errors, classes }"
        >
          <label for="country-title">Name</label>
          <input
            class="form-control form-control-sm"
            :class="
              classes.validated || country.name
                ? 'border-success'
                : 'border-danger'
            "
            type="text"
            v-model="country.name"
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
const _page = "country";
const { put, post, getById } = actions(_page);
export default {
  data() {
    return {
      country: {
        id: null,
        name: "",
      },
      status: "",
    };
  },
  mounted() {
    this.status =
      this.$route.query.status === "edit" ? "Edit Country" : "New Country";
    if (this.$route.query.status === "edit") this.fetchCountryDetail();
  },
  computed: {
    ...mapGetters(getters(_page)),
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(this.country.id ? put : post, {
          id: this.country.id,
          data: this.country,
        })
        .then((res) => {
          if (res) {
            if (this.$route.query.action === "select") {
              if (this.$route.query.city_id)
                this.$router.push({
                  path: `/${this.$route.query.from}`,
                  query: { status: "edit", id: this.$route.query.city_id, country_id: res.id },
                });
              else
                this.$router.push({
                  path: `/${this.$route.query.from}`,
                  query: { status: "new", country_id: res.id },
                });
            } else {
              this.$router.push({
                path: `/countries`,
              });
            }
          }
        });
    },
    async fetchCountryDetail() {
      await this.$store.dispatch(getById, this.$route.query.id).then((res) => {
        this.country = res;
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