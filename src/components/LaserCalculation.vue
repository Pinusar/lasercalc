<template>
  <div>
    <div class="row">

<!--      ITEM-->
      <div class="col-md-6">
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

        <div class="form-group row ">
          <label for="costOfMaterialPerKg" class="col-sm-2 col-form-label">Material cost (per kg)</label>
          <div class="col-sm-10">
            <input class="form-control" type="text" id="costOfMaterialPerKg" v-model="costOfMaterialPerKg" @input="removePrecedingZero('costOfMaterialPerKg')" inputmode="decimal">
          </div>
        </div>

        <br>
      </div>
<!--     END ITEM-->


<!--      CUT-INS-->
      <div class="col-md-6">
        <h1>Cut-ins</h1>
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Add cut-ins
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <div class="d-flex justify-content-center align-items-center">
                  <div class="d-flex">
                    <h1>Add cut-in</h1>
                    <img :src="getIcon()" alt="Icon" class="icon ml-2"/>
                  </div>

                </div>
                <select v-model="cutInType" class="form-select">
                  <option>Round</option>
                  <option>Square</option>
                </select>
                <div v-if="cutInType === 'Square'">
                  <div class="form-group row mt-3">
                    <label for="cutInLength" class="col-sm-2 col-form-label">Length (mm)</label>
                    <div class="col-sm-10">
                      <input class="form-control" type="text" v-model="cutInLength" id="cutInLength"
                             @input="removePrecedingZero('cutInLength')" inputmode="numeric">
                    </div>
                  </div>
                  <div class="form-group row mt-3">
                    <label for="cutInWidth" class="col-sm-2 col-form-label">Width (mm)</label>
                    <div class="col-sm-10">
                      <input class="form-control" type="text" v-model="cutInWidth" id="cutInWidth"
                             @input="removePrecedingZero('cutInWidth')" inputmode="numeric">
                    </div>
                  </div>
                </div>
                <div v-else-if="cutInType === 'Round'">
                  <div class="form-group row mt-3">
                    <label for="cutInRadius" class="col-sm-2 col-form-label">Radius (mm)</label>
                    <div class="col-sm-10">
                      <input class="form-control" type="text" v-model="cutInRadius" id="cutInRadius"
                             @input="removePrecedingZero('cutInRadius')" inputmode="numeric">
                    </div>
                  </div>
                </div>

                <div class="form-group row mt-3">
                  <label for="currentCutInQuantity" class="col-sm-2 col-form-label">pcs</label>
                  <div class="col-sm-10">
                    <input class="form-control" type="text" v-model="currentCutInQuantity" id="currentCutInQuantity"
                           @input="removePrecedingZero('currentCutInQuantity')" inputmode="numeric">
                  </div>
                </div>
                <button @click="addCutIn" class="btn-lg btn-primary m-2">Add</button>

                <div class="card bg-warning">
                  <div class="card-body">
                    <div class="col-md-6 m-auto">
                      <h1>Cut-ins</h1>
                      <div class="row border-bottom-dark">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
<!--      END CUT-INS-->

    </div>



    <div class="row">
      <div class="col-md-6">
        <NozzleInfo :gas="gas" :nozzle-diameter="nozzleDiameter" :nozzle-type="nozzleType" />
        <CostData :cost-data="costDataForSelectedMaterial" />
      </div>

      <div class="col-md-6">


        <Results
            :weight="weight"
            :cut-in-quantity="cutInQuantity"
            :cut-length="cutLength"
            :cost-of-cut="currentCostOfCut"
            :cost-of-cut-ins="costOfCutIns"
            :cost-of-material="costOfMaterial"
        />
      </div>

    </div>
  </div>
</template>

<script>
import materialData from "@/repository/costs";
import circleIcon from '@/assets/img/circle.png';
import squareIcon from '@/assets/img/square.png';
import CostData from "@/components/CostData.vue";


import Results from "@/components/Results.vue";
import {getCirclePerimeter, getSquarePerimeter} from "@/service/geometryService";
import NozzleInfo from "@/components/NozzleInfo.vue";

export default {
  name: 'LaserCalculation',
  components: {NozzleInfo, Results, CostData},
  props: {
    msg: String
  },
  data() {
    return {
      material: 'Carbon steel',
      length: 0,
      width: 0,
      thickness: 0,
      cutInType: 'Square',
      cutInLength: 0,
      cutInWidth: 0,
      cutInRadius: 0,
      currentCutInQuantity: 0,
      cutIns: [],
      costOfCutData: materialData,
      costOfMaterialPerKg: 0,
    }
  },
  computed: {
    perimeter() {
      return (this.length * 2 + this.width * 2) / 1000
    },
    weight() {
      return Math.round(this.volume * this.densityForSelectedMaterial) / 1000;
    },
    // in cm3
    volume() {
      return this.length / 10 * this.width / 10 * this.thickness / 10
    },
    cutInQuantity() {
      return this.cutIns.length + 1
    },
    cutLength() {
      const length = this.perimeter + this.cutIns.reduce( (result, cutIn) => cutIn.type === 'Square' ?
          result + this.getSquarePerimeter(cutIn.width, cutIn.length)
          : result + this.getCirclePerimeter(cutIn.radius), 0);
      return length;
    },
    dataForSelectedMaterial() {
      return this.costOfCutData[this.material]
    },
    costDataForSelectedMaterial() {
      return this.dataForSelectedMaterial.costs;
    },
    densityForSelectedMaterial() {
      return this.dataForSelectedMaterial.density
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
    costOfMaterial() {
      return this.costOfMaterialPerKg * this.weight
    },
    gas() {
      return this.dataForSelectedMaterial.gas;
    },
    nozzleType() {
      return this.dataForSelectedMaterial.nozzleType;
    },
    nozzleDiameter() {
      let data = this.costDataForSelectedMaterial.filter(c => c.thickness == this.thickness)[0]
      return data?.nozzleDiameter ?? '-'
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
      return getSquarePerimeter(width, length) / 1000
    },
    getCirclePerimeter(radius) {
      return getCirclePerimeter(radius) / 1000
    },
    removePrecedingZero(field) {
      if (this[field].startsWith('0')) {
        this[field] = this[field].replace(/^0+/, '');
      }
    },

    getIcon() {
      return this.cutInType === 'Square' ? squareIcon : circleIcon
    }
  },
  mounted() {
    this.costOfCutData = materialData
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
