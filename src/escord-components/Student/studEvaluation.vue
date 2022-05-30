<template>
  <md-card class="md-layout-item">

    <md-card-content>

      <!-- HEADER -->
      <p class="_top md-headline text-esc-darkgrey text-center">
        <strong>UNIVERSITY OF CALOOCAN CITY</strong>
      </p>

      <p class="md-subheading text-esc-darkgrey text-center">
        Computer Studies Department
      </p><br>

      <p class="md-subheading title text-center text-esc-darkgrey _formName">
        <strong>SUMMARY OF GRADES</strong>
      </p>

      <div v-if="getScholRecord.semester === 1">
      <p class="md-body-2 text-center text-esc-darkgrey">
        {{getScholRecord.semester}}ST SEMESTER, SY. {{getScholRecord.sem_startyear}} -  {{getScholRecord.sem_endyeaer}}
      </p><br><br>
      </div>

       <div v-if="getScholRecord.semester === 2">
      <p class="md-body-2 text-center text-esc-darkgrey">
        {{getScholRecord.semester}}ND SEMESTER, SY. {{getScholRecord.sem_startyear}} -  {{getScholRecord.sem_endyeaer}}
      </p><br><br>
      </div>

      <!-- STUDENT INFO -->
      <div class="md-layout md-gutter md-alignment-center-center">

        <!-- FIRST ROW -->
        <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-top-space-between">
          <div class="md-layout-item md-size-50 md-layout md-gutter md-alignment-top-left">
            <p class="md-body-2 md-layout-item md-size-50">
              STUDENT NO.:
            </p>
            <p class="md-body-1 md-layout-item md-size-50">
             {{getScholRecord.student_number}}
            </p>
          </div>

          <div class="md-layout-item md-size-50 md-layout md-gutter md-alignment-top-left">
            <p class="md-body-2 md-layout-item md-size-50">
              COURSE:
            </p>
            <p class="md-body-1 md-layout-item md-size-50">
              {{getScholRecord.course}}
            </p>
          </div>
        </div>

        <!-- SECOND ROW -->
        <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-top-space-between">
          <div class="md-layout-item md-size-50 md-layout md-gutter md-alignment-top-left">
            <p class="md-body-2 md-layout-item md-size-50">
              LAST NAME:
            </p>
            <p class="md-body-1 md-layout-item md-size-50">
                 {{getScholRecord.surname}}
            </p>
          </div>

          <div class="md-layout-item md-size-50 md-layout md-gutter md-alignment-top-left">
            <p class="md-body-2 md-layout-item md-size-50">
              YEAR:
            </p>
            <p class="md-body-1 md-layout-item md-size-50">
               {{getScholRecord.section}}
            </p>
          </div>
        </div>

        <!-- THIRD ROW -->
        <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-top-space-between">
          <div class="md-layout-item md-size-50 md-layout md-gutter md-alignment-top-left">
            <p class="md-body-2 md-layout-item md-size-50">
              FIRST NAME:
            </p>
            <p class="md-body-1 md-layout-item md-size-50">
               {{getScholRecord.firstname}}
            </p>
          </div>

          <div class="md-layout-item md-size-50 md-layout md-gutter md-alignment-top-left">
            <p class="md-body-2 md-layout-item md-size-50">
              SECTION:
            </p>
            <p class="md-body-1 md-layout-item md-size-50">
              A
            </p>
          </div>
        </div>

        <!-- FOURTH ROW -->
        <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-top-space-between">
          <div class="md-layout-item md-size-50 md-layout md-gutter md-alignment-top-left">
            <p class="md-body-2 md-layout-item md-size-50">
              MIDDLE NAME:
            </p>
            <p class="md-body-1 md-layout-item md-size-50">
              {{getScholRecord.middlename}}
            </p>
          </div>

          <div class="md-layout-item md-size-50 md-layout md-gutter md-alignment-top-left">
            <p class="md-body-2 md-layout-item md-size-50">
              STATUS:
            </p>
            <p class="md-body-1 md-layout-item md-size-50">
              REGULAR
            </p>
          </div>
        </div>
      </div> <br><br>

      <!-- GRADES -->
      <md-table
      md-sort="subjCode"
      md-sort-by="asc"
      v-model="grades"
      class="mx-auto">

        <md-table-row 
        class="md-layout md-gutter md-alignment-center-space-between">
          <md-table-cell
          class="_tableHead md-layout-item md-size-15 md-layout md-gutter md-alignment-center-center text-center">
            SUBJECT CODE
          </md-table-cell>
          <md-table-cell
          class="_tableHead md-layout-item md-size-30 md-layout md-gutter md-alignment-center-left">
            SUBJECT DESCRIPTION
          </md-table-cell>
          <md-table-cell
          class="_tableHead md-layout-item md-size-15 md-layout md-gutter md-alignment-center-center text-center">
            UNITS
          </md-table-cell>
          <md-table-cell
          class="_tableHead md-layout-item md-size-15 md-layout md-gutter md-alignment-center-center text-center">
            FINAL GRADE
          </md-table-cell>
          <md-table-cell
          class="_tableHead md-layout-item md-size-15 md-layout md-gutter md-alignment-center-center text-center">
            FG x UNITS
          </md-table-cell>
        </md-table-row>

        <md-table-row
        class=" _subjDesc md-layout md-gutter md-alignment-center-space-between"
        v-for="(grade,index) in grades"
        :key="index">
          
          <md-table-cell 
          class="md-body-1 md-layout-item md-size-15 md-layout md-gutter md-alignment-center-center">
            {{grade.subjCode}}
          </md-table-cell>

          <md-table-cell 
          class="md-body-1 md-layout-item md-size-30 md-layout md-gutter md-alignment-center-left">
            {{grade.subjDesc}}
          </md-table-cell>

          <md-table-cell 
          class="md-body-1 md-layout-item md-size-15 md-layout md-gutter md-alignment-center-center">
            {{grade.subjUnit}}
          </md-table-cell>

          <md-table-cell 
          class="md-body-1 md-layout-item md-size-15 md-layout md-gutter md-alignment-center-center">
            {{grade.subjFG}}
          </md-table-cell>

          <md-table-cell 
          class="md-body-1 md-layout-item md-size-15 md-layout md-gutter md-alignment-center-center">
            {{FGxUnitsResult(grade)}}
          </md-table-cell>
        </md-table-row>
      </md-table>
      <br>

      <div class="md-layout md-gutter md-alignment-center-right">
        <div class="md-layout-item md-size-50 md-layout md-gutter md-alignment-center-left">
          <p 
          class="md-body-2 md-layout-item md-size-50">
            Total Units:
          </p>
          <p 
          class="md-body-1 md-layout-item md-size-50">
            {{totalUnits}}
          </p>
        </div>
      </div>
      <div class="md-layout md-gutter md-alignment-center-right">
        <div class="md-layout-item md-size-50 md-layout md-gutter md-alignment-center-left">
          <p 
          class="md-body-2 md-layout-item md-size-50">
            Total FGxUnits:
          </p>
          <p 
          class="md-body-1 md-layout-item md-size-50">
            {{total}}
          </p>
        </div>
      </div>
      <md-divider></md-divider>
      <div class="md-layout md-gutter md-alignment-center-right">
        <div class="md-layout-item md-size-50 md-layout md-gutter md-alignment-center-left">
          <p 
          class="md-body-2 md-layout-item md-size-50">
            GWA:
          </p>
          <p 
          class="md-body-1 md-layout-item md-size-50">
            {{gwa}}
          </p>
        </div>
      </div>
      <br><br><br>

      <div class="md-layout md-gutter md-alignment-bottom-space-between">
        <div class="md-layout-item md-size-50 md-layout md-gutter md-alignment-center-center">
          <p class="md-body-2">
            Verified by: _______________________________
          </p>
        </div>
        <div class="md-layout-item md-size-50 md-layout md-gutter md-alignment-center-center">
          <p class="md-layout-item md-size-100 text-center md-body-2 _sign">
            <u>TRIZHALYN L. MAGLANGIT</u>
          </p>
          <p class="md-layout-item md-size-100 text-center caption">
            Student's Signature
          </p>
        </div>


      </div>
    </md-card-content>

  </md-card>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { mapActions, mapGetters} from "vuex";

export default {
    name: 'EvaluationForm',
    mixins: [validationMixin],
    components:{

    },
    mounted(){
          //  this.$store.dispatch('displayuser');

            this.$store.dispatch('getScholasticRecord',this.$route.params.student_number);
    },
    data () {
      return {
        /* TEST DISPLAY --> GRADES */
        grades: [
          {
            subjCode: "CCS 123",
            subjDesc: "SUBJECT 1: MORE SUBJECT NAME",
            subjUnit: 3,
            subjFG: 3,
          },
          {
            subjCode: "CCS 121",
            subjDesc: "SUBJECT 2",
            subjUnit: 3,
            subjFG: 1.54,
          },
          {
            subjCode: "CCS 113",
            subjDesc: "SUBJECT 3",
            subjUnit: 5,
            subjFG: 1.20,
          }
        ],
        semester: "1st Semester",
        schoolyr: "2021-2022"
      };
    },
    computed:{
  ...mapGetters({getScholRecord: 'getScholRecord'}),

  totalUnits() {
    return this.grades.reduce((sum, grade) => 
    sum + grade.subjUnit, 0);
  },
  total() {
    return this.grades.reduce((acc, item) =>
    acc + (item.subjUnit * item.subjFG), 0);
  },
  gwa() {
    return (this.total/ this.totalUnits).toFixed(2);
  }
  },

  methods: {
    FGxUnitsResult(grade) {
      return grade.subjUnit * grade.subjFG
    }
  }
  }
</script>

<style lang="scss" scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }

  .md-divider {
    margin-bottom: 0.75em !important;
  }

  .md-card {
    max-width: 37em !important;
  }

  ._top {
    margin-top: 1.5em !important;
  }

  ._formName, ._sign {
    margin-bottom: 0 !important;
  }

  ._tableHead {
    margin-top: 0 !important;
    font-size: 1.05em !important;
    font-weight: bold !important;
    margin-bottom: 1.12em !important;
  }

  ._subjDesc {
    margin-bottom: 0.75em !important;  
  }

  ._desc {
    margin-top: 0 !important;
  }
</style>