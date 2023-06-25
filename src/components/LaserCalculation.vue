<template>
  <div class="hello">
    <div class="row">
      <div class="col-6 mb-5">
        <h1>Item creation</h1>

        <select v-model="material" class="form-select">
          <option>Carbon steel</option>
          <option>Chromed steel</option>
          <option>Aluminum</option>
          <option>Copper</option>
        </select>

        <label>Length (mm)</label>
        <input class="form-control" type="text" v-model="length" @input="removePrecedingZero('length')">

        <label>Width (mm)</label>
        <input class="form-control" type="text" v-model="width" @input="removePrecedingZero('width')">

        <label>Thickness (mm)</label>
        <input class="form-control" type="text" v-model="thickness" @input="removePrecedingZero('thickness')">

        <br>
      </div>

      <div class="col-6">
        <h1>Add cut-in</h1>
        <select v-model="cutInType" class="form-select">
          <option>Circle</option>
          <option>Square</option>
        </select>
        <div v-if="cutInType === 'Square'">
          <p>Length</p>
          <input v-model="cutInLength" class="form-control" type="number">
          <p>Width</p>
          <input v-model="cutInWidth" class="form-control" type="number">
        </div>
        <div v-else-if="cutInType === 'Circle'">
          <p>Radius</p>
          <input v-model="cutInRadius" class="form-control" type="number">
        </div>

        <p>Quantity</p>
        <input class="form-control" type="number">
        <button @click="addCutIn" class="btn-lg btn-primary m-2">Add</button>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
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
            <div v-for="(cost, index) in costDataForSelectedMaterial" :key="index" class="row border-bottom-dark">
              <div class="col">{{ cost.thickness }}</div>
              <div class="col"><strong>{{ cost.small }}</strong></div>
              <div class="col"><strong>{{ cost.medium }}</strong></div>
              <div class="col"><strong>{{ cost.large }}</strong></div>
              <div class="col"><strong>{{ cost.cutting }}</strong></div>
            </div>
          </div>

        </div>
      </div>

      <div class="col-6">
        <h1>Cut-ins</h1>
        <div class="w-50 m-auto">
          <div class="row bg-warning border-bottom-dark">
            <div class="col">Cut-in type</div>
            <div class="col"><strong>width</strong> mm</div>
            <div class="col"><strong>length</strong> mm</div>
            <div class="col"><strong>radius</strong> mm</div>
          </div>
          <div v-for="(cutIn, index) in cutIns" :key="index" class="row bg-warning border-bottom-dark">
            <div class="col">{{ cutIn.type }}</div>
            <div class="col"><strong>{{ cutIn.width }}</strong> mm</div>
            <div class="col"><strong>{{ cutIn.length }}</strong> mm</div>
            <div class="col"><strong>{{ cutIn.radius }}</strong> mm</div>
          </div>
        </div>
        <h1>Results</h1>
        <div class="w-50 m-auto">
          <div class="row bg-info border-bottom-dark">
            <div class="col">Volume</div>
            <div class="col"><strong>{{ volume }}</strong> mm3</div>
          </div>
          <div class="row bg-info border-bottom-dark">
            <div class="col">Weight</div>
            <div class="col"><strong>{{ weight }}</strong> kg</div>
          </div>
          <div class="row bg-info border-bottom-dark">
            <div class="col">Perimeter</div>
            <div class="col"><strong>{{ perimeter }}</strong> m</div>
          </div>
          <div class="row bg-info border-bottom-dark">
            <div class="col">Cut-in quantity</div>
            <div class="col"><strong>{{ cutInQuantity }}</strong></div>
          </div>
          <div class="row bg-info border-bottom-dark">
            <div class="col">Cut length</div>
            <div class="col"><strong>{{ cutLength }}</strong></div>
          </div>
          <div class="row bg-info border-bottom-dark">
            <div class="col">Cost of cut</div>
            <div class="col"><strong>{{ currentCostOfCut }}</strong></div>
          </div>
          <div class="row bg-info border-bottom-dark">
            <div class="col">Cost of cut-ins</div>
            <div class="col"><strong>{{ costOfCutIns }}</strong></div>
          </div>
        </div>
      </div>
    </div>







    <!--    <p>Cost of cut-ins (stoimost vrezok): kolvo vrezom, v zavisimosti ot tolshinq i metala</p>-->
  </div>
</template>

<script>
import costs from "@/repository/costs";
export default {
  name: 'LaserCalculation',
  props: {
    msg: String
  },
  data() {
    return {
      material: 'Carbon steel',
      length: 0,
      width: 0,
      thickness: 0,
      density: 7.85,
      cutInType: 'Square',
      cutInLength: 0,
      cutInWidth: 0,
      cutInRadius: 0,
      cutIns: [],
      costOfCutData: costs
    }
  },
  computed: {
    perimeter() {
      return this.length * 2 + this.width * 2 / 1000
    },
    weight() {
      return Math.round(this.volume / 1000 * this.density) / 100
    },
    volume() {
      return this.length * this.width * this.thickness
    },
    cutInQuantity() {
      return this.cutIns.length + 1
    },
    cutLength() {
      return this.perimeter + this.cutIns.reduce( (result, cutIn) => cutIn.type === 'Square' ?
          result + this.getSquarePerimeter(cutIn.width, cutIn.length)
          : result + this.getCirclePerimeter(cutIn.radius), 0)
    },
    costDataForSelectedMaterial() {
      return this.costOfCutData[this.material];
    },
    currentCostOfCutPerMeter() {
      if (this.thickness === 0) {
        return 0
      }
      let cost = this.costDataForSelectedMaterial.filter(c => c.thickness == this.thickness)[0]
      return cost?.small ?? 0
    },
    currentCostOfCut() {
      return Math.round(this.currentCostOfCutPerMeter * this.cutLength) / 100
    },
    costOfCutIns() {
      if (this.thickness === 0) {
        return 0
      }
      let cost = this.costDataForSelectedMaterial.filter(c => c.thickness == this.thickness)[0]
      return (cost?.cutting ?? 0) * this.cutInQuantity
    }
  },
  methods: {
    addCutIn() {
      this.cutIns.push(
          {
            type: this.cutInType,
            width: this.cutInWidth,
            length: this.cutInLength,
            radius: this.cutInRadius
          }
      )
      this.cutInWidth = 0;
      this.cutInLength = 0;
      this.cutInRadius = 0;
    },
    getSquarePerimeter(width, length) {
      return 2 * width + 2 * length
    },
    getCirclePerimeter(radius) {
      return Math.round(Math.PI * radius * 2 * 100) / 100
    },
    removePrecedingZero(field) {
      if (this[field].startsWith('0')) {
        this[field] = this[field].replace(/^0+/, '');
      }
    }
  },
  mounted() {
    this.costOfCutData = costs
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
</style>
