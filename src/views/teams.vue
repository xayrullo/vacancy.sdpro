<template>
  <div>
    <div v-if="!loading" class="row">
      <div class="col-lg-12">
        <div class="table-responsive p-4">
          <table id="datatable" class="table table-striped table-bordered">
            <thead>
              <tr>
                <th style="width: 5%">№</th>
                <th style="width: 50%">Name</th>
                <th style="width: 30%">City</th>
                <th style="width: 15%" class="text-center"><button class="btn btn-sm btn-success pull-right text-light" @click="toNewTeam()"><i class="text-lg bx bx-plus-medical"></i></button></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(team, index) in teams" :key="index">
                <td>{{ index + 1 }}</td>
                <td>
                  <div class="text-dark">{{ team.name }}</div>
                </td>
                <td>
                  <div class="text-dark">{{ cities.find(city => city.id === team.city_id).name }}</div>
                </td>
                <td class="text-center">
                  <button
                    class="btn btn-sm btn-info pull-right"
                    @click="toDetailTeam(team)"
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
// import $ from "jquery";
const _page = "team";
const { get } = actions(_page);
export default {
  data() {
    return {
      loading: true,
      teams: [],
      cities: []
    };
  },
  mounted() {
    this.fetchTeams().then(() => {
      this.fetchCities()
    });
  },
  computed: {
    ...mapGetters(getters(_page)),
  },
  methods: {
    toDetailTeam(team) {
      this.$router.push({
        path: `/teams/change`,
        query: { id: team.id, status: 'edit', from: 'teams' },
      });
    },
    toNewTeam() {
      this.$router.push({
        path: `/teams/change`,
        query: { status: 'new', from: this.$route.path },
      });
    },
    async fetchTeams() {
      await this.$store.dispatch(get).then((res) => {
        this.teams = res;
        // setTimeout(() => {
        //   $("#datatable").DataTable({
        //     lengthMenu: [
        //       [5, 10, 25, 50, -1],
        //       [5, 10, 25, 50, "All"],
        //     ],
        //     pageLength: 5,
        //   });
        // });
      });
    },
    async fetchCities() {
      await this.$store.dispatch('getCity').then((res) => {
        this.cities = res;
        this.loading = false
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
