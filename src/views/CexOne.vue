<template>
  <div class="container mt-0p-1">
    <h5 class="text-center my-3">Indodax Ledger</h5>
    <p>Spot only IDR pairing</p>
    <!-- Table Name with Margin IDR Total -->
    <div class="d-flex justify-content-between align-items-center">
      <h6 class="text-center mb-2 mx-2">Bulan {{ currentTable }}</h6>
      <p :class="totalMarginIdr >= 0 ? 'text-info' : 'text-warning'" class="mb-2 mx-2">
        <span v-if="totalMarginIdr > 0">
          <small><i class="bi bi-chevron-up text-info"></i></small>
        </span>
        <span v-if="totalMarginIdr < 0">
          <small><i class="bi bi-chevron-down text-warning"></i></small>
        </span>
        IDR {{ formatNumber(totalMarginIdr) }}
      </p>
      <p>
        <button class="btn btn-sm btn-secondary" @click="showModal = true"><i class="bi bi-percent"></i></button>
      </p> 
    </div>

    <!-- Table -->
    <div class="table-responsive">
      <table class="table table-striped">
        <thead class="">
          <tr>
            <th>#</th>
            <th>
              Coin
            </th>
            <th>
              Buy
            </th>
            <th>
              Sell
            </th>
          </tr>
        </thead>
        <tbody class="">
          <tr v-for="(row, index) in tables[currentTable - 1]" :key="index">
            <td>
              <span :class="{
              'bg-info': row.margin_idr > 0,
              'bg-warning': row.margin_idr < 0
              }"
              class="p-1">{{ index + 1 }}</span>
            </td>
            <td>
              <div class="d-flex flex-column">
                <div class="input-group">
                  <input v-model="row.coin" class="form-control" />
                  <input type="date" v-model="row.buy_date" class="form-control" />
                </div>
                <div class="input-group">
                  <input type="text" class="form-control" :value="formatNumber(row.margin_idr)" readonly />
                  <input type="text" class="form-control" :value="row.margin_percent ? row.margin_percent.toFixed(2) + '%' : '0.00%'" disable readonly />
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex flex-column">
                <div class="input-group">
                  <input type="number" step="0.0001" v-model.number="row.buy_volume" class="form-control" @input="updateCalculations(row)" />
                  <input type="number" step="0.0001" v-model.number="row.buy_price" class="form-control" @input="updateCalculations(row)" />
                </div>
                <div class="input-group">
                  <input type="text" class="form-control" :value="formatNumber(row.buy_fee)" readonly />
                  <input type="text" class="form-control" :value="formatNumber(row.buy_amount)" readonly />
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex flex-column">
                <div class="input-group">
                  <input type="number" step="0.0001" v-model.number="row.sell_volume" class="form-control" @input="updateCalculations(row)" />
                  <input type="number" step="0.0001" v-model.number="row.sell_price" class="form-control" @input="updateCalculations(row)" />
                </div>
                <div class="input-group">
                  <input type="text" class="form-control" :value="formatNumber(row.sell_fee)" readonly />
                  <input type="text" class="form-control" :value="formatNumber(row.sell_amount)" readonly />
                </div>
              </div>
            </td>

          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Popup -->
    <div v-if="showModal" class="modal-backdrop">
      <div class="modal-content">
        <div class="modal-header mb-2">
          <p class="text-light">Selling price calculation</p>
          <button type="button" class="close text-light" @click="showModal = false"><i class="bi bi-x-lg"></i></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="calculateResult">
            <div class="form-group input-group mb-2">
              <span class="input-group-text w-25">Buy @</span><input type="number" step="0.01" id="input1" v-model.number="input1" class="form-control" required />
            </div>
            <div class="form-group input-group mb-2">
              <span class="input-group-text w-25">TP %</span><input type="number" step="0.01" id="input2" v-model.number="input2" class="form-control" required />
            </div>
            <div class="form-group mb-2">
              <span class="text-light">Selling price: </span><span class="text-light" @click="copyToClipboard">{{ formattedResult }}</span>
            </div>
            <button type="submit" class="btn btn-sm btn-primary">Calculate</button>
          </form>
        </div>
      </div>
    </div>

    <!-- Buttons Below Table -->
    <div class="d-flex justify-content-between mt-3">
      <div class="d-flex gap-1">
        <button class="btn btn-sm btn-success" @click="addRow"><i class="bi bi-plus-lg"></i></button>
        <button class="btn btn-sm btn-danger" @click="deleteRow"><i class="bi bi-dash-lg"></i></button>
        <button class="btn btn-sm btn-primary" :disabled="currentTable === 1" @click="prevTable">
          <i class="bi bi-arrow-left"></i>
        </button>
        <button class="btn btn-sm btn-primary" :disabled="currentTable === totalTables" @click="nextTable">
          <i class="bi bi-arrow-right"></i>
        </button>
        <button class="btn btn-sm btn-warning" @click="exportToCSV"><i class="bi bi-arrow-down"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'CexOne',
      currentTable: 1,
      totalTables: 12,
      tables: [],
      showModal: false,
      input1: 0,
      input2: 0,
      result: 0,
    };
  },
  computed: {
    // Total sum of Margin IDR for the active table
    totalMarginIdr() {
      const currentTableData = this.tables[this.currentTable - 1] || [];
      return currentTableData.reduce((sum, row) => sum + row.margin_idr, 0);
    },
    formattedResult() {
      return this.result.toFixed(2); // Ensure two decimal places
    }
  },
  methods: {
    initializeTables() {
      const storedData = localStorage.getItem("editableTables");
      if (storedData) {
        this.tables = JSON.parse(storedData);
      } else {
        this.tables = Array.from({ length: this.totalTables }, () => []);
        this.saveToLocalStorage();
      }
    },

    async copyToClipboard() {
      try {
        await navigator.clipboard.writeText(this.formattedResult);
        alert('Text copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    },

    calculateResult() {
      this.result = this.input1 * (1 + this.input2 / 100);
    },

    updateCalculations(row) {
      const buyFeeRate = 0.002322; // 0.2322%
      const sellFeeRate = 0.002222; // 0.2222%

      const buyVolume = row.buy_volume || 0;
      const buyPrice = row.buy_price || 0;
      const sellVolume = row.sell_volume || 0;
      const sellPrice = row.sell_price || 0;

      const buyFee = Math.ceil(buyVolume * buyPrice * buyFeeRate);
    //  const buyAmount = Math.ceil(buyVolume * buyPrice + buyFee);
      const buyAmount = Math.ceil(buyVolume * buyPrice);
      const sellFee = Math.ceil(sellVolume * sellPrice * sellFeeRate);
      const sellAmount = Math.ceil(sellVolume * sellPrice - sellFee);
      const marginIdr = sellAmount - buyAmount;

      const marginPercent = buyAmount > 0 ? (marginIdr / buyAmount) * 100 : 0;

      row.buy_fee = buyFee;
      row.buy_amount = buyAmount;
      row.sell_fee = sellFee;
      row.sell_amount = sellAmount;
      row.margin_idr = marginIdr;
      row.margin_percent = marginPercent || 0;

      this.saveToLocalStorage();
    },
    formatNumber(num) {
      if (typeof num !== "number" || isNaN(num)) {
        return "0"; // Default to "0" if num is not a valid number
      }
      return num.toLocaleString("en-US", {
        maximumFractionDigits: 0,
      });
    },
    addRow() {
      if (!Array.isArray(this.tables[this.currentTable - 1])) {
        this.tables[this.currentTable - 1] = [];
      }

      const newRow = {
        coin: "",
        buy_date: "",
        buy_volume: 0,
        buy_price: 0,
        buy_fee: 0,
        buy_amount: 0,
        sell_volume: 0,
        sell_price: 0,
        sell_fee: 0,
        sell_amount: 0,
        margin_idr: 0,
        margin_percent: 0,
      };

      this.tables[this.currentTable - 1].push(newRow);
      this.saveToLocalStorage();
    },
    deleteRow() {
      if (this.tables[this.currentTable - 1].length > 0) {
        this.tables[this.currentTable - 1].pop();
        this.saveToLocalStorage();
      }
    },
    prevTable() {
      if (this.currentTable > 1) {
        this.currentTable--;
      }
    },
    nextTable() {
      if (this.currentTable < this.totalTables) {
        this.currentTable++;
      }
    },
    saveToLocalStorage() {
      localStorage.setItem("editableTables", JSON.stringify(this.tables));
    },
    // Method to Export Table Data to CSV
    exportToCSV() {
      const tableData = this.tables[this.currentTable - 1];
      if (!tableData || tableData.length === 0) return;

      const header = [
        "Coin", "Buy Date", "Buy Volume", "Buy Price", "Buy Fee", "Buy Amount",
        "Sell Volume", "Sell Price", "Sell Fee", "Sell Amount", "Margin (IDR)", "Margin (%)"
      ];

      const rows = tableData.map(row => [
        row.coin, row.buy_date, row.buy_volume, row.buy_price, row.buy_fee, row.buy_amount,
        row.sell_volume, row.sell_price, row.sell_fee, row.sell_amount, row.margin_idr, row.margin_percent
      ]);

      const csvContent = [header, ...rows]
        .map(row => row.join(","))
        .join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `table_${this.currentTable}.csv`;
      link.click();
    },
  },
  mounted() {
    this.initializeTables();
  },
};
</script>

<style>
body {
  /*background-color: #121212;
  color: #ffffff;*/
}

@media (max-width: 576px) {
  input.form-control {
    min-width: 150px; /* Allow slightly smaller inputs on very narrow screens */
  }
  .input-group {
    min-width: 250px; /* Allow slightly smaller inputs on very narrow screens */
  }
}

.table th,
.table td {
  vertical-align: middle;
}

.d-flex.gap-2 button {
  flex: 1;
  min-width: 150px;
}

.kecil {
      font-size: 85%; /* 90% of 16px = 12.8px */
    }

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /*background: rgba(0, 0, 0, 0.5);*/
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  /*background: #121212;*/
  padding: 10px;
  border-radius: 0px;
  width: 300px; /* Adjusted width */
  max-width: 90%; /* Ensures responsiveness */
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close {
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
}


</style>

