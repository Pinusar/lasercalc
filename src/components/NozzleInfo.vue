<template>
  <section class="intro my-3">
    <div class="bg-image" style="background-color: #f5f7fa;">
      <div class="mask d-flex align-items-center h-100">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12">
              <div class="card">
                <div class="card-body p-0">
                  <div class="table-responsive table-scroll" data-mdb-perfect-scrollbar="true" style="position: relative;">
                    <table class="table table-striped mb-0">
                      <thead style="background-color: #002d72;">
                      <tr>
                        <th scope="col">Gas</th>
                        <th scope="col">Nozzle</th>
                        <th scope="col">Diameter</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>{{ gas }}</td>
                        <td>{{ nozzleType }}</td>
                        <td>{{ nozzleDiameter }}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import downloadExcel from "@/service/excelService";

export default {
  name: 'NozzleInfo',
  props: ['gas', 'nozzleType', 'nozzleDiameter'],
}
</script>
