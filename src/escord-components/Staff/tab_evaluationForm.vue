<template>
  <div class="">
      <div class="md-layout md-gutter md-alignment-center-center">

          <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center">
            <pagination
                type = "esc-accent"
                no-arrows
                v-model="tab_EFMS_defaultPagination"
                :page-count="5">
            </pagination>
          </div>

          <div class="__table md-layout-item md-size-100">

              <md-table
                v-model="studentList"
                md-sort="studLN"
                md-sort-order="asc">

                <md-table-row class="title">
                    <md-table-head class="text-center">Actions</md-table-head>
                    <md-table-head class="text-center">Student Number</md-table-head>
                    <md-table-head class="text-center">Name</md-table-head>
                    <md-table-head class="text-center">Status</md-table-head>
                </md-table-row>

                <md-table-row
                 v-for="(student,index) in studentList"
                 :key="index">

                    <md-table-cell class="text-center">
                        <md-button
                         class="md-simple md-esc-darkgrey">
                            VIEW
                         </md-button>
                    </md-table-cell>

                    <md-table-cell  class="text-center">
                        {{student.studNum}}
                    </md-table-cell>

                    <md-table-cell class="text-left">
                        {{student.studFN}} {{student.studMI}}. {{student.studLN}}
                    </md-table-cell>

                    <md-table-cell>
                        {{student.studStatus}}
                    </md-table-cell>

                </md-table-row>

              </md-table>
          
          </div>
      </div>
  </div>
</template>

<script>
import {Pagination} from '@/components'

export default {
    components: {
        Pagination
    },
    data(){
        return{
            tab_EFMS_defaultPagination: 1,

            studentList:[
                {
                    studNum: "20191172",
                    studLN: "MAGLANGIT",
                    studFN: "TRIZHALYN",
                    studMI: "L",
                    studStatus: "REGULAR"
                },
                {
                    studNum: "20191173",
                    studLN: "ZARZOSO",
                    studFN: "EDELINE",
                    studMI: "J",
                    studStatus: "REGULAR"
                },
                {
                    studNum: "20191174",
                    studLN: "LUNA",
                    studFN: "JESSICA",
                    studMI: "L",
                    studStatus: "REGULAR"
                }
            ]
        };
    }

}
</script>

<style>

.__table {
    margin-top: 3em !important;
}

</style>