<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="table-responsive p-4">
          <table id="datatable" class="table table-striped table-bordered">
            <thead>
              <tr>
                <th style="width: 5%">ID</th>
                <th style="width: 80%">Name</th>
                <th style="width: 15%" class="text-center">
                  <button
                    class="btn btn-sm btn-success pull-right text-light"
                    @click="toNewCountry()"
                  >
                    <i class="text-lg bx bx-plus-medical"></i>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(country, index) in countries" :key="index">
                <td>{{ country.id }}</td>
                <td>
                  <div class="text-dark">{{ country.name }}</div>
                </td>
                <td class="text-center">
                  <button
                    class="btn btn-sm btn-info pull-right"
                    @click="toDetailCountry(country)"
                    type="submit"
                  >
                    <i class="text-lg bx bx-edit"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { actions, getters } from "../utils/store_schema";
const _page = "country";
const { get } = actions(_page);
export default {
  data() {
    return {
      countries: [],
    };
  },
  mounted() {
    console.log('fadsfasdfdsa');
    this.fetchCountries();
  },
  computed: {
    ...mapGetters(getters(_page)),
  },
  methods: {
    toDetailCountry(country) {
      this.$router.push({
        path: `/countries/change`,
        query: { id: country.id, status: 'edit' },
      });
    },
    toNewCountry() {
      this.$router.push({
        path: `/countries/change`,
        query: { status: "new" },
      });
    },
    async fetchCountries() {
      await this.$store.dispatch(get).then((res) => {
        this.countries = res;
      });
    },
  },
};
</script>
<style scoped>
.background :hover {
  background-color: lightgray;
}
</style>
