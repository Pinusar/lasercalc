<template>
  <div class="hello">
    <div class="row">

<!--      ITEM-->
      <div class="col-md-6 mb-5">
        <h1>Item</h1>

        <select v-model="material" class="form-select">
          <option>Carbon steel</option>
          <option>Stainless steel</option>
          <option>Aluminum</option>
          <option>Copper</option>
        </select>

        <div class="form-group row mt-3">
          <label for="length" class="col-sm-2 col-form-label">Length (mm)</label>
          <div class="col-sm-10">
            <input class="form-control" type="text" v-model="length" id="length" @input="removePrecedingZero('length')" inputmode="numeric">
          </div>
        </div>

        <div class="form-group row ">
          <label for="width" class="col-sm-2 col-form-label">Width (mm)</label>
          <div class="col-sm-10">
            <input class="form-control" type="text" id="width" v-model="width" @input="removePrecedingZero('width')" inputmode="numeric">
          </div>
        </div>

        <div class="form-group row ">
          <label for="thickness" class="col-sm-2 col-form-label">Thickness (mm)</label>
          <div class="col-sm-10">
            <input class="form-control" type="text" id="thickness" v-model="thickness" @input="removePrecedingZero('thickness')" inputmode="numeric">
          </div>
        </div>

        <br>
      </div>

<!--      CUT-INS-->
      <div class="col-md-6">
        <div class="d-flex align-items-center">
          <h1>Add cut-in</h1>
          <img :src="getIcon()" alt="Icon" class="icon ml-2" />
        </div>
        <select v-model="cutInType" class="form-select">
          <option>Round</option>
          <option>Square</option>
        </select>
        <div v-if="cutInType === 'Square'">
          <div class="form-group row mt-3">
            <label for="cutInLength" class="col-sm-2 col-form-label">Length (mm)</label>
            <div class="col-sm-10">
              <input class="form-control" type="text" v-model="cutInLength" id="cutInLength" @input="removePrecedingZero('cutInLength')" inputmode="numeric">
            </div>
          </div>
          <div class="form-group row mt-3">
            <label for="cutInWidth" class="col-sm-2 col-form-label">Width (mm)</label>
            <div class="col-sm-10">
              <input class="form-control" type="text" v-model="cutInWidth" id="cutInWidth" @input="removePrecedingZero('cutInWidth')" inputmode="numeric">
            </div>
          </div>
        </div>
        <div v-else-if="cutInType === 'Round'">
          <div class="form-group row mt-3">
            <label for="cutInRadius" class="col-sm-2 col-form-label">Radius (mm)</label>
            <div class="col-sm-10">
              <input class="form-control" type="text" v-model="cutInRadius" id="cutInRadius" @input="removePrecedingZero('cutInRadius')" inputmode="numeric">
            </div>
          </div>
        </div>

        <div class="form-group row mt-3">
          <label for="currentCutInQuantity" class="col-sm-2 col-form-label">pcs</label>
          <div class="col-sm-10">
            <input class="form-control" type="text" v-model="currentCutInQuantity" id="currentCutInQuantity" @input="removePrecedingZero('currentCutInQuantity')" inputmode="numeric">
          </div>
        </div>
        <button @click="addCutIn" class="btn-lg btn-primary m-2">Add</button>
      </div>
    </div>

    <div class="row">
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

      <div class="col-md-6">
        <div class="col-md-6 m-auto">
          <h1>Cut-ins</h1>
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

        <div class="col-md-6 m-auto">
          <h1>Results</h1>
          <div class="row bg-info border-bottom-dark">
            <div class="col">Weight</div>
            <div class="col"><strong>{{ weight }}</strong></div>
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
            <div class="col"><strong>{{ currentCostOfCut.toFixed(2) }}</strong></div>
          </div>
          <div class="row bg-info border-bottom-dark">
            <div class="col">Cost of cut-ins</div>
            <div class="col"><strong>{{ costOfCutIns.toFixed(2) }}</strong></div>
          </div>
          <div class="row bg-info border-bottom-dark">
            <div class="col">Total cost</div>
            <div class="col"><strong>{{ totalCost.toFixed(2) }}</strong></div>
          </div>
          <button @click="downloadResults" class="btn-lg btn-success m-3">Download Results</button>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import costs from "@/repository/costs";
import * as XLSX from "xlsx";
import circleIcon from '@/assets/img/circle.png';
import squareIcon from '@/assets/img/square.png';
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
      currentCutInQuantity: 0,
      cutIns: [],
      costOfCutData: costs
    }
  },
  computed: {
    perimeter() {
      return (this.length * 2 + this.width * 2) / 1000
    },
    weight() {
      return Math.round(this.volume * this.density) / 1000;
    },
    // in cm3
    volume() {
      return this.length / 10 * this.width / 10 * this.thickness / 10
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
      return (this.currentCostOfCutPerMeter * this.cutLength)
    },
    costOfCutIns() {
      if (this.thickness === 0) {
        return 0
      }
      let cost = this.costDataForSelectedMaterial.filter(c => c.thickness == this.thickness)[0]
      let result = (cost?.cutting ?? 0) * this.cutInQuantity;
      return result
    },
    totalCost() {
      return this.currentCostOfCut + this.costOfCutIns
    }
  },
  methods: {
    addCutIn() {
      for (let i = 0; i < this.currentCutInQuantity; i++) {
        this.cutIns.push(
            {
              type: this.cutInType,
              width: this.cutInWidth,
              length: this.cutInLength,
              radius: this.cutInRadius
            }
        )
      }
      this.cutInWidth = 0;
      this.cutInLength = 0;
      this.cutInRadius = 0;
      this.currentCutInQuantity = 0;
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
    },
    downloadResults() {
      const wb = XLSX.utils.book_new();
      const wsData = [
        ['Weight', this.weight + ' kg'],
        ['Cut-in quantity', this.cutInQuantity],
        ['Cut length', this.cutLength],
        ['Cost of cut', this.currentCostOfCut],
        ['Cost of cut-ins', this.costOfCutIns]
      ];
      const ws = XLSX.utils.aoa_to_sheet(wsData);
      XLSX.utils.book_append_sheet(wb, ws, 'Results');
      const wbOptions = { bookType: 'xlsx', type: 'array' };
      const excelData = XLSX.write(wb, wbOptions);
      const blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'results.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    getIcon() {
      return this.cutInType === 'Square' ? squareIcon : circleIcon
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
.icon {
  width: 24px;
  height: 24px;
}
</style>
