<template>
  <div class="col-md-6 m-auto">
    <div class="card bg-info mt-3">
      <div class="card-body">
        <h1>Results</h1>
        <div class="row bg-info border-bottom-dark">
          <div class="col">Weight</div>
          <div class="col"><strong>{{ weight.toFixed(2) }}</strong></div>
        </div>
        <div class="row bg-info border-bottom-dark">
          <div class="col">Cut-in quantity</div>
          <div class="col"><strong>{{ cutInQuantity }}</strong></div>
        </div>
        <div class="row bg-info border-bottom-dark">
          <div class="col">Cut length (m)</div>
          <div class="col"><strong>{{ cutLength }}</strong></div>
        </div>
        <div class="row bg-info border-bottom-dark">
          <div class="col">Cost of cut</div>
          <div class="col"><strong>{{ costOfCut.toFixed(2) }}</strong></div>
        </div>
        <div class="row bg-info border-bottom-dark">
          <div class="col">Cost of cut-ins</div>
          <div class="col"><strong>{{ costOfCutIns.toFixed(2) }}</strong></div>
        </div>
        <div class="row bg-info border-bottom-dark">
          <div class="col">Cost of material</div>
          <div class="col"><strong>{{ costOfMaterial.toFixed(2) }}</strong></div>
        </div>
        <div class="row bg-primary text-white border-bottom-dark">
          <div class="col">Total cost</div>
          <div class="col"><strong>{{ totalCost.toFixed(2) }}</strong></div>
        </div>
        <button @click="downloadResults" class="btn-lg btn-success m-3">Download Results</button>
      </div>
    </div>
  </div>
</template>
<script>
import downloadExcel from "@/service/excelService";

export default {
  name: 'Results',
  props: ['weight', 'cutInQuantity', 'cutLength', 'costOfCut', 'costOfCutIns', 'costOfMaterial'],
  computed: {
    totalCost() {
      return this.costOfCut + this.costOfCutIns + this.costOfMaterial
    }
  },
  methods: {
    downloadResults() {
      const wsData = [
        ['Weight', this.weight + ' kg'],
        ['Cut-in quantity', this.cutInQuantity],
        ['Cut length', this.cutLength],
        ['Cost of cut', this.costOfCut],
        ['Cost of cut-ins', this.costOfCutIns],
        ['', ''], // Empty row for spacing
        ['Total', { t: 'n', f: '=SUM(B4:B5)', s: { font: { bold: true } }}] // Formula for the wow effect
      ];
      const cutInsData = [
        ['Cut-in ID', 'Length', 'Width'],
        [1, 10, 5],
        [2, 8, 3],
        [3, 15, 7]
      ];
      downloadExcel(wsData, cutInsData);
    },
  }
}
</script>