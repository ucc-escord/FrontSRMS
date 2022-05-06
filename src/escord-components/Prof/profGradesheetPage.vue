<template>
  <div class="wrapper">
    <parallax
      class="section page-header header-filter"
      :style="headerStyle"
    ></parallax>

    <div class="main main-raised">
      <div class="section profile-content">
        <div class="container">

          <div class="__gradesheet-header md-layout md-gutter md-alignment-top-space-between">

            <div class="__gradesheet-subject md-layout-item md-size-100">
                <h4>
                    <strong>{{subjCode}}</strong>
                    {{subjDesc}}
                </h4>
            </div>
            
            <div class="__gradesheet-info md-layout-item md-xsmall-size-100 md-size-70">

                    <h5 class="md-subheading">
                        {{classYr}}{{classSec}} | {{classProg}}
                    </h5>
                    <p class="md-caption __top-md-caption">
                        {{subjDay}}, {{subjTime}}
                    </p>
                    <p class="md-caption">
                        {{subjSem}},  SY. {{subjSY_start}}-{{subjSY_end}}
                    </p>

            </div>
            
            <div class="__gradesheet-buttons md-layout-item md-xsmall-size-100 md-size-30 md-layout md-gutter md-alignment-center-space-between">

                <div class="md-layout-item md-xsmall-size-25 md-small-size-50 md-large-size-25">
                    <md-button 
                    class="md-esc-accent md-raised md-round md-just-icon">
                        <md-icon>person_add</md-icon>
                        <md-tooltip md-direction="bottom">Add Student</md-tooltip>
                    </md-button>
                </div>

                <div class="md-layout-item md-xsmall-size-25 md-small-size-50 md-large-size-25">
                    <md-button
                    class="md-esc-darkgrey md-raised md-round md-just-icon">
                        <md-icon>save</md-icon>
                        <md-tooltip md-direction="bottom">Save Changes </md-tooltip>
                    </md-button>
                </div>

                <div class="md-layout-item md-xsmall-size-25 md-small-size-50 md-large-size-25">
                    <md-button
                    class="md-esc-darkgrey md-raised md-round md-just-icon">
                        <md-icon>inventory</md-icon>
                        <md-tooltip md-direction="bottom">Archive Gradesheet</md-tooltip>
                    </md-button>
                </div>

                <div class="md-layout-item md-xsmall-size-25 md-small-size-50 md-large-size-25">
                    <md-button
                    class="md-esc-darkgrey md-raised md-round md-just-icon">
                        <md-icon>download</md-icon>
                        <md-tooltip md-direction="bottom">Download Gradesheet</md-tooltip>
                    </md-button>
                </div>

            </div>

          </div>

          <md-divider></md-divider>

          <div class="__gradesheet-table">

            <md-table
            v-model="studentList"
              md-sort="studLN"
              md-sort-order="asc">

              <md-table-row class="title">
                <md-table-head class="text-center">Student Number</md-table-head>
                <md-table-head class="text-center">Name</md-table-head>
                <md-table-head class="text-center">Midterm</md-table-head>
                <md-table-head class="text-center">Final Term</md-table-head>
                <md-table-head class="text-center">Remarks</md-table-head>
              </md-table-row>

              <md-table-row
              v-for="(_, index) in studentList"
              :key="index">
                
                <md-table-cell class="text-center">
                  {{studentList[index].studNum}}
                </md-table-cell>

                <md-table-cell>
                  {{studentList[index].studLN}}, {{studentList[index].studFN}} {{studentList[index].studMI}}
                </md-table-cell>

               <md-table-cell>
                  <md-vuelidated
                  :key="index"
                  :messages="{
                    required: 'Field cannot be blank.',
                    maxLength: 'Input cannot be more than 4 characters.',
                    minValue: 'Field only accepts value from `1.00` to `5.00`.',
                    maxValue: 'Field only accepts value from `1.00` to `5.00`.'
                  }" 
                  field="md-field" 
                  class="has-esc-accent">
                    <md-input
                    type="number"
                    class="text-center"
                    v-model="studentList[index].studMG"></md-input>
                  </md-vuelidated>
                </md-table-cell>

                <md-table-cell>
                  <md-vuelidated
                  :key="index"
                  :messages="{
                    required: 'Field cannot be blank.',
                    maxLength: 'Input cannot be more than 4 characters.',
                    minValue: 'Field only accepts value from `1.00` to `5.00`.',
                    maxValue: 'Field only accepts value from `1.00` to `5.00`.'
                  }" 
                  field="md-field" 
                  class="has-esc-accent">
                    <md-input
                    type="number"
                    class="text-center"
                    v-model="studentList[index].studFG"></md-input>
                  </md-vuelidated>
                </md-table-cell>

                <md-table-cell>
                  <md-field class="has-esc-accent">
                    <md-input
                    v-model="studentList[index].studRemark"></md-input>
                  </md-field>
                </md-table-cell>                
                
              </md-table-row>

            </md-table>

          </div>

          <div class="profile-content"></div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
//validation imports
import { validationMixin } from 'vuelidate'
import { required, maxLength, minValue, maxValue } from 'vuelidate/lib/validators'

export default {
  bodyClass: "profile-page",
  data() {
    return {
      subjCode: "CS 108 ",
      subjUnit: "3",
      subjDesc: "SOFTWARE ENGINEERING 1",
      subjDay: "THU",
      subjTime: "10AM - 1PM",
      subjSem: "1ST SEMESTER",
      subjSY_start: "2021",
      subjSY_end: "2022",
      classProg: "BS COMPUTER SCIENCE",
      classYr: "3",
      classSec: "A",
      profName: "JOEMEN BARRIOS",
      profRank: "MASTER TEACHER III",

      studentList: [
        {
          studNum: 20190001,
          studLN: "LUCAS",
          studFN: "TRIZHALYN",
          studMI: "L",
          studMG: "5",
          studFG: "5",
          studRemark: "PASSED"
          
        },
        {
          studNum: 20190002,
          studLN: "MAGLANGIT",
          studFN: "TRIZHA",
          studMI: "F",
          studMG: "2",
          studFG: "5",
          studRemark: "PASSED"
          
        },
        {
          studNum: 20190003,
          studLN: "FRANCISCO",
          studFN: "TRIZH",
          studMI: "M",
          studMG: "3",
          studFG: "3",
          studRemark: "PASSED"
          
        }
      ]
    };
  },

  mixins: [validationMixin], // for validation

   /* for validation */
   validations: {
       studentList: {
         $each: {
           studMG: {
             required,
             maxLength: maxLength(4),
             minValue: minValue(1.00),
             maxValue: maxValue(5.00)},

           studFG: {
             required,
             maxLength: maxLength(4),
             minValue: minValue(1.00),
             maxValue: maxValue(5.00)}
         }
       }
   },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/bg-545454.jpg")
    },
    img: {
      type: String,
      default: require("@/assets/img/escord-team-pictures/stud.png")
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  },
};
</script>

<style lang="scss" scoped>
.section {
  padding: 0;
}

.__gradesheet-header, .__gradesheet-table {
    margin: 2rem 0 1.5rem 0 !important;
}

h4 {
    margin: 0 !important;
    width: max-content !important;
}

.md-subheading, .md-caption {
    margin-bottom: 0.25rem !important;
}

.__top-md-caption {
    margin-top: 1rem !important;
}

.md-icon {
    color: red !important;
}

.__gradesheet-info {
    padding-bottom: 1.5rem !important;
}

.md-input {
  width: 0.05rem;
}
</style>
