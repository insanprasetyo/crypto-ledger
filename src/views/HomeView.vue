<template>
  <div class="container">
    <h1>Compound Trading Calculator</h1>

    <!-- Compound Calculator Form -->
    <form @submit.prevent="calculateResults">
      <div class="mb-3">
        <label for="principal" class="form-label">Modal Awal</label>
        <input type="number" id="principal" class="form-control" v-model="principal" required />
      </div>
      <div class="mb-3">
        <label for="tradingPerDay" class="form-label">Trades Per Day</label>
        <input type="number" id="tradingPerDay" class="form-control" v-model="tradingPerDay" required />
      </div>
      <div class="mb-3">
        <label for="tradingPerWeek" class="form-label">Trades Per Week (biasanya 5 hari seminggu)</label>
        <input type="number" id="tradingPerWeek" class="form-control" v-model="tradingPerWeek" required />
      </div>
      <div class="mb-3">
        <label for="percentage" class="form-label">Keuntungan yg diharapkan Per Trade (dalam percent)</label>
        <input type="number" id="percentage" class="form-control" v-model="percentage" step="0.01" required />
      </div>
      <div class="mb-3">
        <label for="months" class="form-label">Jumlah Bulan</label>
        <input type="number" id="months" class="form-control" v-model="numberOfMonths" required />
      </div>
      <div class="mb-3">
        <label for="takeProfitPercentage" class="form-label">Keuntungan yg akan diambil perbulan (dalam percent)</label>
        <input
          type="number"
          id="takeProfitPercentage"
          class="form-control"
          v-model="takeProfitPercentage"
          placeholder="Enter percentage (e.g., 50 for 50%)"
          required
        />
      </div>

      <button type="submit" class="btn btn-primary">Hitung</button>
    </form>

    <!-- Results Table -->
    <div v-if="results.length" class="mt-4">
      <h3>Results</h3>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Bulan</th>
            <th scope="col">Modal</th>
            <th scope="col">Total Compound</th>
            <th scope="col">Margin</th>
            <th scope="col">Take Profit</th>
            <th scope="col">Tambahan Modal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(result, index) in results" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ formatNumber(result.initialCapital) }}</td>
            <td>{{ formatNumber(result.totalCompound) }}</td>
            <td>{{ formatNumber(result.margin) }}</td>
            <td>{{ formatNumber(result.takeProfit) }}</td>
            <td>{{ formatNumber(result.additionalCapital) }}</td>
          </tr>
        </tbody>
      </table>

      <div>
        <p>Total Profit (yang diambil) dalam {{ numberOfMonths }} Bulan: {{ formatNumber(totalProfit) }}</p>
        <p><small>({{ toWords(totalProfit) }})</small></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      principal: 0,
      tradingPerDay: 8,
      tradingPerWeek: 5,
      percentage: 0,
      numberOfMonths: 12, // Default value for months
      takeProfitPercentage: 50, // Default take profit percentage (50%)
      results: [],
      totalProfit: 0,
    };
  },
  methods: {
    calculateResults() {
      let amount = this.principal;
      const dailyTrades = this.tradingPerDay;
      const weeklyTrades = this.tradingPerWeek;
      const percentage = this.percentage / 100;

      this.results = [];
      this.totalProfit = 0;

      for (let month = 1; month <= this.numberOfMonths; month++) {
        let initialCapital = amount;
        let totalCompound = amount;

        for (let day = 0; day < 20; day++) {
          totalCompound += totalCompound * (dailyTrades * percentage);
        }

        for (let week = 0; week < 4; week++) {
          totalCompound += totalCompound * (weeklyTrades * percentage);
        }

        let margin = totalCompound - initialCapital;
        let takeProfit = margin * (this.takeProfitPercentage / 100);
        let additionalCapital = initialCapital + (margin - takeProfit);

        this.results.push({
          initialCapital: this.roundToNearestThousand(initialCapital),
          totalCompound: this.roundToNearestThousand(totalCompound),
          margin: this.roundToNearestThousand(margin),
          takeProfit: this.roundToNearestThousand(takeProfit),
          additionalCapital: this.roundToNearestThousand(additionalCapital),
        });

        this.totalProfit += this.roundToNearestThousand(takeProfit);
        amount = this.roundToNearestThousand(additionalCapital);
      }

      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      const data = {
        principal: this.principal,
        tradingPerDay: this.tradingPerDay,
        tradingPerWeek: this.tradingPerWeek,
        percentage: this.percentage,
        numberOfMonths: this.numberOfMonths,
        takeProfitPercentage: this.takeProfitPercentage,
        results: this.results,
        totalProfit: this.totalProfit,
      };
      localStorage.setItem("compoundCalculatorData", JSON.stringify(data));
    },
    loadFromLocalStorage() {
      const savedData = localStorage.getItem("compoundCalculatorData");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        this.principal = parsedData.principal;
        this.tradingPerDay = parsedData.tradingPerDay;
        this.tradingPerWeek = parsedData.tradingPerWeek;
        this.percentage = parsedData.percentage;
        this.numberOfMonths = parsedData.numberOfMonths;
        this.takeProfitPercentage = parsedData.takeProfitPercentage;
        this.results = parsedData.results;
        this.totalProfit = parsedData.totalProfit;
      }
    },
    roundToNearestThousand(number) {
      return Math.floor(number / 1000) * 1000;
    },
    formatNumber(number) {
      return new Intl.NumberFormat().format(number);
    },
    toWords(number) {
  const angka = [
    "",
    "satu",
    "dua",
    "tiga",
    "empat",
    "lima",
    "enam",
    "tujuh",
    "delapan",
    "sembilan",
    "sepuluh",
    "sebelas",
    "dua belas",
    "tiga belas",
    "empat belas",
    "lima belas",
    "enam belas",
    "tujuh belas",
    "delapan belas",
    "sembilan belas",
  ];
  const tingkat = ["", "ribu", "juta", "milyar", "triliun"];
  let words = "";
  let i = 0;

  if (number === 100) {
    return "seratus"; // Special case for 100
  }

  do {
    let sisa = number % 1000;
    if (sisa !== 0) {
      let str = "";
      if (Math.floor(sisa / 100) > 0) {
        if (Math.floor(sisa / 100) === 1 && i === 0) {
          str += "seratus "; // If the first 100, use "seratus"
        } else {
          str += angka[Math.floor(sisa / 100)] + " ratus ";
        }
      }
      sisa %= 100;
      if (sisa > 0) {
        if (sisa < 20) {
          str += angka[sisa]; // for numbers 1-19
        } else {
          str += angka[Math.floor(sisa / 10)] + " puluh ";
          if (sisa % 10 > 0) str += angka[sisa % 10];
        }
      }
      words = str + " " + tingkat[i] + " " + words;
    }
    number = Math.floor(number / 1000);
    i++;
  } while (number > 0);

  return words.trim();
}
,
  },
  mounted() {
    this.loadFromLocalStorage();
  },
  watch: {
    principal: "saveToLocalStorage",
    tradingPerDay: "saveToLocalStorage",
    tradingPerWeek: "saveToLocalStorage",
    percentage: "saveToLocalStorage",
    numberOfMonths: "saveToLocalStorage",
    takeProfitPercentage: "saveToLocalStorage",
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin-top: 50px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

form {
  margin-bottom: 30px;
}

table {
  margin-top: 20px;
}

th,
td {
  text-align: end;
}
</style>
