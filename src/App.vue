<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top">
      <div class="container">
        <a class="navbar-brand" href="#">
          <img
            src="https://placeholder.pics/svg/150x50/888888/EEE/Logo"
            alt="..."
            height="36"
          />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link
                class="nav-link"
                role="button"
                :class="$route.path === '/teams' ? 'active' : ''"
                to="/teams"
              >
                Teams
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                role="button"
                :class="$route.path === '/cities' ? 'active' : ''"
                to="/cities"
              >
                Cities
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                role="button"
                :class="$route.path === '/countries' ? 'active' : ''"
                to="/countries"
              >
                Countries
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>
<script>
export default {
  mounted() {
    // if (this.$route.path === "" || this.$route.path === "/")
    //   this.$router.push("/teams");
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
