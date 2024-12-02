<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid"> <!-- Use container-fluid for full width -->
        <!-- Change brand name to Ledger -->
        <a class="navbar-brand" href="#">Ledger</a>

        <!-- Navbar toggle button for small screens -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navbar links (will be hidden on small screens and shown on larger screens) -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/" exact>Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/cex1">Indodax</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/cex2">Tokocrypto</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/cex3">Binance</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/cex4">MexC</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/wallet">Wallet</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- The content of the page is rendered here -->
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
};

</script>

<style scoped>
/* Ensure navbar is full width and properly centered on large screens */
.container-fluid {
  padding-left: 20px;
  padding-right: 20px;
}

</style>
