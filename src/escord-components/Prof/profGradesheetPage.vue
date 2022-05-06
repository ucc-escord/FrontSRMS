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

            <md-table>

              <md-table-row class="title">
                <md-table-head class="text-center">Student Number</md-table-head>
                <md-table-head class="text-center">Name</md-table-head>
                <md-table-head class="text-center">Midterm</md-table-head>
                <md-table-head class="text-center">Final Term</md-table-head>
                <md-table-head class="text-center">Remarks</md-table-head>
              </md-table-row>

              <md-table-row
              v-for="student in studentList"
              :key="student.studNum">
                
                <md-table-cell>
                  {{student.studNum}}
                </md-table-cell>

                <md-table-cell>
                  {{student.studLN}}, {{student.studFN}} {{student.studMI}}
                </md-table-cell>

                <md-table-cell>
                  <md-field class="has-esc-accent">
                    <md-input
                    type="number"
                    class="text-center"
                    :value="student.studMG"></md-input>

                    <!-- <span class="md-error" v-if="!$v.studentList.$each.$iter.studMG.required">
                      Field cannot be blank.
                    </span>

                    <span class="md-error" v-if="!$v.studentList.$each.studMG.maxLength">
                      Input reached maximum length.
                    </span>

                    <span class="md-error" v-if="!$v.studentList.$each.studMG.minValue">
                      Start from `1.0`.
                    </span>

                    <span class="md-error" v-if="!$v.studentList.$each.studMG.maxValue">
                      Only accepts until `5.0`.
                    </span> -->
                  </md-field>
                </md-table-cell>

                <md-table-cell>
                  <md-field class="has-esc-accent">
                    <md-input
                    type="number"
                    class="text-center"
                    :value="student.studFG"></md-input>
                  </md-field>
                </md-table-cell>

                <md-table-cell>
                  <md-field class="has-esc-accent">
                    <md-input
                    :value="student.studRemark"></md-input>
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
import { maxLength, minValue, maxValue } from 'vuelidate/lib/validators'

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
          studLN: "MAGLANGIT",
          studFN: "TRIZHALYN",
          studMI: "L",
          studMG: "1",
          studFG: "6",
          studRemark: ""
          
        },
        {
          studNum: 20190002,
          studLN: "LUCAS",
          studFN: "TRIZHA",
          studMI: "F",
          studMG: "2",
          studFG: "5",
          studRemark: ""
          
        },
        {
          studNum: 20190003,
          studLN: "FRANCISCO",
          studFN: "TRIZH",
          studMI: "M",
          studMG: "3",
          studFG: "3",
          studRemark: ""
          
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
            minValue: minValue(1),
            maxValue: maxValue(5)}
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

  methods: {

    /* validation methods */
    // getValidationClass (fieldName) {
    //   const field = this.$v.studentList.$each[fieldName]

    //   if (field) {
    //       return {
    //         'md-invalid': field.$invalid && field.$dirty
    //       }
    //     }
    //   },
    //   saveChangesValidate () {
    //     this.$v.$touch()

    //     if (!this.$v.$invalid) {
    //       console.log("Successfully saved changes.")
    //     }
    //     else {
    //       console.log("Changes cannot be saved. Review your inputs.");
    //     }
    // },
  }
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

.md-error {
  position: absolute !important;
  top: 3.07em !important;
  left: 2.25rem !important;
  line-height: 0.95em !important;
  text-align: justify;
  font-size: .777rem !important;
}
</style>
