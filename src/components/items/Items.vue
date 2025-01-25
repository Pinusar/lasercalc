<template>
  <div>
    <router-link to="/">Home</router-link>

    <table class="table table-striped mb-0">
      <thead style="background-color: #002d72;">
      <tr>
        <th scope="col">Material</th>
        <th scope="col">Length</th>
        <th scope="col">Width</th>
        <th scope="col">Thickness</th>
        <th scope="col">Weight</th>
        <th scope="col">Area</th>
        <th scope="col">Total price</th>
      </tr>
      </thead>
      <tbody>

      <tr v-for="item of items">
        <td>{{ item.material }}</td>
        <td>{{ item.length }}</td>
        <td>{{ item.width }}</td>
        <td>{{ item.thickness }}</td>
        <td>{{ item.weight }}</td>
        <td>{{ item.area }}</td>
        <td>{{ 50.00 }}</td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import CostData from "@/components/CostData.vue";

import Results from "@/components/Results.vue";
import NozzleInfo from "@/components/NozzleInfo.vue";
import {useItemsStore} from "@/stores/itemStore";
import {mapStores} from "pinia";

export default {
  name: 'ItemsComponent',
  components: {NozzleInfo, Results, CostData},
  props: {
    msg: String,
    items: Array
  },
  data() {
    return {
      itemsStore: null, // Initialize store reference as null
    }
  },
  computed: {
    // Map Pinia store state to computed properties
    ...mapStores(useItemsStore),
    items() {
      return this.itemsStore ? this.itemsStore.items : [];
    },
  },
  created() {
    this.itemsStore = useItemsStore();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.icon {
  width: 24px;
  height: 24px;
}
</style>
