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
                    @click="toNewCity()"
                  >
                    <i class="text-lg bx bx-plus-medical"></i>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(city, index) in cities" :key="index">
                <td>{{ city.id }}</td>
                <td>
                  <div class="text-dark">{{ city.name }}</div>
                </td>
                <td class="text-center">
                  <button
                    class="btn btn-sm btn-info pull-right"
                    @click="toDetailCity(city)"
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
const _page = "city";
const { get } = actions(_page);
export default {
  data() {
    return {
      cities: [],
    };
  },
  mounted() {
    this.fetchCities();
  },
  computed: {
    ...mapGetters(getters(_page)),
  },
  methods: {
    toDetailCity(city) {
      this.$router.push({
        path: `/cities/change`,
        query: { id: city.id, status: 'edit', from: 'cities' },
      });
    },
    toNewCity() {
      this.$router.push({
        path: `/cities/change`,
        query: { status: "new", from: this.$route.path },
      });
    },
    async fetchCities() {
      await this.$store.dispatch(get).then((res) => {
        this.cities = res;
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
