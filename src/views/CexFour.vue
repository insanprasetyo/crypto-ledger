<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Cryptocurrency Prices</h1>
    <div class="mb-3">
      <input v-model="searchQuery" type="text" class="form-control" placeholder="Search by coin symbol (e.g., BTC, ETH, XRP)...">
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-bordered">
        <thead class="table-dark">
          <tr>
            <th>
              <input type="checkbox" v-model="showWatchlistOnly" />
              Watchlist
            </th>
            <th @click="sortBy('symbol')" style="cursor: pointer;">
              Cryptocurrency <span v-if="sortColumn === 'symbol'">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th @click="sortBy('current_price')" style="cursor: pointer;">
              Current Price (USD) <span v-if="sortColumn === 'current_price'">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th @click="sortBy('ath')" style="cursor: pointer;">
              ATH Price (USD) <span v-if="sortColumn === 'ath'">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th @click="sortBy('percent_to_ath')" style="cursor: pointer;">
              % to ATH <span v-if="sortColumn === 'percent_to_ath'">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th @click="sortBy('x_from_ath')" style="cursor: pointer;">
              x to ATH <span v-if="sortColumn === 'x_from_ath'">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="crypto in filteredCryptos" :key="crypto.id">
            <td>
              <input type="checkbox" v-model="watchlist" :value="crypto.id" @change="updateWatchlist" />
            </td>
            <td>{{ crypto.symbol.toUpperCase() }}</td>
            <td>{{ formatPrice(crypto.current_price) }}</td>
            <td>{{ formatPrice(crypto.ath) }}</td>
            <td :class="{'text-success': crypto.percent_to_ath > 0, 'text-danger': crypto.percent_to_ath <= 0}" class="text-end">
              {{ crypto.percent_to_ath.toFixed(2) }} %
            </td>
            <td class="text-end">{{ crypto.x_from_ath.toFixed(2) }} x</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="d-flex justify-content-between mt-3">
      <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-primary">Previous</button>
      <span>Page {{ currentPage }}</span>
      <button @click="nextPage" :disabled="!hasNextPage" class="btn btn-primary">Next</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CexFour',
  data() {
    return {
      cryptos: [],
      searchQuery: '',
      currentPage: 1,
      perPage: 30,
      hasNextPage: true,
      watchlist: JSON.parse(localStorage.getItem('watchlist')) || [],
      showWatchlistOnly: false,
      sortColumn: '',
      sortDirection: 'asc',
      intervalId: null,
    };
  },
  computed: {
    filteredCryptos() {
      let filtered = this.cryptos;

      if (this.showWatchlistOnly) {
        filtered = filtered.filter(crypto => this.watchlist.includes(crypto.id));
      }

      filtered = filtered.filter(crypto => 
        crypto.symbol.toLowerCase().includes(this.searchQuery.toLowerCase())
      );

      if (this.sortColumn) {
        if (this.sortColumn === 'symbol') {
          filtered = filtered.sort((a, b) => {
            if (a[this.sortColumn] < b[this.sortColumn]) return this.sortDirection === 'asc' ? -1 : 1;
            if (a[this.sortColumn] > b[this.sortColumn]) return this.sortDirection === 'asc' ? 1 : -1;
            return 0;
          });
        } else {
          filtered = filtered.sort((a, b) => {
            const modifier = this.sortDirection === 'asc' ? 1 : -1;
            if (a[this.sortColumn] < b[this.sortColumn]) return -1 * modifier;
            if (a[this.sortColumn] > b[this.sortColumn]) return 1 * modifier;
            return 0;
          });
        }
      }

      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return filtered.slice(start, end);
    },
  },
  methods: {
  async fetchCryptos() {
    try {
      const coinsPerPage = 250; // Max allowed by the API
      const totalPages = Math.ceil(1500 / coinsPerPage); // Calculate how many pages needed
      const promises = [];

      for (let page = 1; page <= totalPages; page++) {
        promises.push(
          axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: coinsPerPage,
              page: page,
              sparkline: false,
            },
          })
        );
      }

      const responses = await Promise.all(promises);
      this.cryptos = responses.flatMap(response => 
        response.data.map(crypto => {
          const percent_to_ath = ((crypto.ath / crypto.current_price) * 100) - 100;
          const x_from_ath = crypto.ath / crypto.current_price;

          return {
            id: crypto.id,
            symbol: crypto.symbol,
            current_price: crypto.current_price,
            ath: crypto.ath,
            percent_to_ath,
            x_from_ath,
          };
        })
      );

      this.updatePagination();
    } catch (error) {
      console.error('Error fetching cryptocurrency data:', error);
    }
  },

    nextPage() {
      this.currentPage++;
      this.updatePagination();
    },
    prevPage() {
      this.currentPage--;
      this.updatePagination();
    },
    updatePagination() {
      const start = this.currentPage * this.perPage;
      this.hasNextPage = start < this.cryptos.length;
    },
    formatPrice(price) {
      if (price < 0.01) {
        return `$${price.toFixed(6).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
      }
      return `$${price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
    },
    updateWatchlist() {
      localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
    },
    sortBy(column) {
      if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        if (column === 'symbol' && this.sortDirection === 'desc') {
          this.sortColumn = ''; // Reset to default ranking order
        }
      } else {
        this.sortColumn = column;
        this.sortDirection = 'asc';
      }
    },
  },
  mounted() {
    this.fetchCryptos();
    this.intervalId = setInterval(this.fetchCryptos, 30000); // Refresh data every 30 seconds
  },
  unmounted() {
    clearInterval(this.intervalId);
  },
};
</script>

<style>
body {
  background-color: #f8f9fa;
}
</style>
