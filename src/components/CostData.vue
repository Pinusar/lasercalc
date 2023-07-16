<template>
  <div class="d-none d-md-block col-md-6">
    <div class="card">
      <div class="card-body">
        <h1>Costs</h1>
        <div class="row border-bottom-dark">
          <div class="col">Thickness</div>
          <div class="col"><strong>small</strong> </div>
          <div class="col"><strong>medium</strong> </div>
          <div class="col"><strong>large</strong> </div>
          <div class="col"><strong>cutting</strong> </div>
        </div>
        <div v-for="(cost, index) in costData" :key="index" class="row border-bottom-dark">
          <div class="col">{{ cost.thickness }}</div>
          <div class="col"><strong>{{ cost.small }}</strong></div>
          <div class="col"><strong>{{ cost.medium }}</strong></div>
          <div class="col"><strong>{{ cost.large }}</strong></div>
          <div class="col"><strong>{{ cost.cutting }}</strong></div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  name: 'LaserCalculation',
  props: {
    costData: Object
  }
}
</script>