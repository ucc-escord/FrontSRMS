<template>
  <div class="wrapper">
    <parallax
      class="section page-header header-filter"
      :style="headerStyle"
    ></parallax>
    <div class="main main-raised">
      <div class="section profile-content">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-75 mx-auto">
              <div class="profile">

                <div class="avatar">
                  <img
                    :src="img"
                    alt="CircleIMG PFP"
                    class="img-raised rounded-circle img-fluid"
                  />
                </div>

                <div class="name">
                  <h3 class="title">{{formData.profName}}</h3>
                  <h5>{{formData.profRank}}</h5>
                </div>
              </div>
            </div>
          </div>
          <div class="md-layout md-gutter md-alignment-center">
            <h2 class="md-display-1 md-layout-item">GRADESHEETS</h2>
          </div>

          <div class="buttons">
            <!-- open modal button -->
            <md-button class="md-esc-accent md-wd md-round" @click="classicModal = true">
                    <md-icon>add</md-icon> Add Gradesheet
            </md-button>

            <!-- modal -->
            <modal v-if="classicModal" @close="classicModalHide">

              <!-- modal header -->
              <template slot="header">
                  <h3 class="title text-esc-accent">Add New Gradesheet</h3>
              </template>

              <!-- modal body -->
              <template slot="body">
                <form @submit.prevent="" novalidate class="md-layout md-gutter md-alignment-center-left">

                  <!-- gradesheet id 
                  <md-field class="has-esc-accent md-layout-item">
                    <label>Gradesheet ID</label>
                    <md-input v-model="gsNum" readonly></md-input>
                  </md-field>-->

                  <!-- subj desc -->
                  <md-autocomplete
                  md-dense
                  v-model="formData.subjDesc"
                  :md-options="subjects1"
                  :md-fuzzy-search="false"
                  class="has-esc-accent md-layout-item md-size-100"
                  required>
                    <label>Subject Description</label>

                    <template slot="md-autocomplete-empty"
                    slot-scope="{ term }">
                      {{term}} does not match any registered subjects.
                    </template>

                    <span class="md-error">This is a required field.</span>
                  </md-autocomplete>

                  <!-- subj code and unit -->
                  <div class="md-layout-item md-layout md-gutter md-alignment-center-space-between md-size-100">
                    <md-field class="has-esc-accent md-layout-item md-size-50" :md-counter="false">
                      <label>Subject Code</label>
                      <md-input v-model="formData.subjCode" maxlength="10" readonly required></md-input>
                    </md-field>

                    <md-field class="has-esc-accent md-layout-item md-size-45" :md-counter="false">
                      <label>Units</label>
                      <md-input v-model="formData.subjUnit" maxlength="2" required></md-input>
                    </md-field>
                  </div>

                  <!-- subj schedule -->
                  <md-subheader>Schedule</md-subheader>

                  <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-space-between">
                    
                    <md-field
                    class="has-esc-accent md-layout-item md-size-45">
                    <label>Day</label>
                      <md-input v-model="formData.subjDay" required></md-input>
                      <!-- <label for="schedDay">Day</label>
                      
                      <md-select
                      v-model="selectedDay"
                      name="schedDay"
                      id="schedDay"
                      multiple
                      md-dense>

                        <md-option value="Monday">
                          MON
                        </md-option>
                        <md-option value="Tuesday">
                          Tuesday
                        </md-option>
                        <md-option value="Wednesday">
                          Wednesday
                        </md-option>
                        <md-option value="Thursday">
                          Thursday
                        </md-option>
                        <md-option value="Friday">
                          Friday
                        </md-option>
                        <md-option value="Saturday">
                          Saturday
                        </md-option>
                        <md-option value="Sunday">
                          Sunday
                        </md-option>

                      </md-select> -->
                    </md-field>

                    <md-field
                    class="has-esc-accent md-layout-item md-size-45">
                      <label>Time</label>
                      <md-input v-model="formData.subjTime" required></md-input>
                    </md-field>
                  </div>

                  <!-- subj SY -->
                  <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-space-between">

                    <md-autocomplete
                    md-dense
                    v-model="formData.subjSem"
                    :md-options="semester"
                    :md-fuzzy-search="false"
                    class="has-esc-accent md-layout-item md-size-45"
                    required>
                      <label>Semester</label>
                      
                      <template slot="md-autocomplete-empty"
                    slot-scope="{ term }">
                      {{term}} is not available in the options.
                    </template>
                    </md-autocomplete>
                    
                    <md-field
                    class="has-esc-accent md-layout-item md-size-25">
                      <label>SY Start</label>
                      <md-input v-model="formData.subjSY_start" required>
                      </md-input>
                    </md-field>

                    <md-field
                    class="has-esc-accent md-layout-item md-size-25">
                      <label>SY End</label>
                      <md-input v-model="formData.subjSY_end" required>
                      </md-input>
                    </md-field>
                  </div>

                  <!-- class info -->
                  <md-subheader>Class</md-subheader>

                  <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-space-between">
                    
                    <md-autocomplete
                    md-dense
                    v-model="formData.classProg"
                    :md-options="programs"
                    :md-fuzzy-search="false"
                    class="has-esc-accent md-layout-item md-size-45"
                    required>
                      <label>Program</label>

                      <template slot="md-autocomplete-empty"
                    slot-scope="{ term }">
                      {{term}} is not available in the options.
                    </template>
                    </md-autocomplete>

                    <md-autocomplete
                    md-dense
                    v-model="formData.classYr"
                    :md-options="year"
                    :md-fuzzy-search="false"
                    class="has-esc-accent md-layout-item md-size-20"
                    required>
                      <label>Year</label>

                      <template slot="md-autocomplete-empty"
                    slot-scope="{ term }">
                      {{term}} is not available in the options.
                    </template>
                    </md-autocomplete>

                    <md-autocomplete
                    md-dense
                    v-model="formData.classSec"
                    :md-options="section"
                    :md-fuzzy-search="false"
                    class="has-esc-accent md-layout-item md-size-20"
                    required>
                      <label>Section</label>

                      <template slot="md-autocomplete-empty"
                    slot-scope="{ term }">
                      {{term}} is not available in the options.
                    </template>
                    </md-autocomplete>
                  </div>
                  
                  <!-- prof -->
                  <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-space-between">

                    <md-field class="has-esc-accent md-layout-item md-size-45">
                      <label>Professor</label>
                      <md-input v-model="formData.profName" required></md-input>
                    </md-field>

                    <md-field class="has-esc-accent md-layout-item md-size-45">
                      <label>Rank/ Position</label>
                      <md-input v-model="formData.profRank" required></md-input>

                      <!-- <span v-if="v$.formData.profRank.$error">
                        {{v$.formData.facultyrank.$errors[0].$message}}
                      </span> -->
                    </md-field>
                  </div>
                  
                </form>

                <br>
                <md-divider></md-divider>
              </template>

              <!-- modal footer -->
              <template slot="footer" class="md-layout md-gutter md-alignment-center-space-between">


                <div class="md-layout-item md-layout md-alignment-center-center">
                    <md-button class="md-esc-darkgrey md-raised md-dense md-round md-layout-item md-size-75" @click="classicModalHide">
                      CANCEL
                    </md-button>
                  </div>

                  <div class="md-layout-item md-layout md-alignment-center-center">
                    <md-button class="md-esc-accent md-raised md-dense md-round md-layout-item md-size-75"
                    type="submit"
                    @click="addtest">
                      <md-icon>add</md-icon>
                      ADD
                    </md-button>
                  </div>
              </template>
            </modal>
          </div>

          <div class="profile-content">
            <div class="cards md-layout md-alignment-center">
              
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "@/components";

//validation
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { mapActions} from "vuex";

export default {
  bodyClass: "profile-page",

  components: {
      Modal
  },

  setup: () => ({ v$: useVuelidate() }),

  data() {
    return {
      //modal default value on load
      classicModal: false,

      //modal--form data
      formData:{
        classProg:null,
        classYr:null,
        classSec:null,
        subjCode: '',
        subjUnit:'',
        subjDesc:null,
        subjTime:'',
        subjDay:'',
        subjSem:null,
        subjSY_start: new Date().getFullYear(),
        subjSY_end: new Date().getFullYear() + 1,
        profRank:'Master Teacher III',
        profName: 'JOHN GONZALES CRUZ'
        },
        error:{
        },

      //subject desc and subject code

      /*----or retrieve data from db para alphabetically arranged yung mga options---
      subjects: [
        {code: "CCS 116", units: "5", desc: "ADVANCED WEB SYSTEMS"},
        {code: "CS 108", units: "3", desc: "SOFTWARE ENGINEERING 1"},
        {code: "CS 110", units: "3", desc: "NETWORKS AND COMMUNICATIONS"},
        {code: "CSE 102", units: "3", desc: "GRAPHICS AND VISUAL COMPUTING"}
      ],*/

      subjects1: [
        "ADVANCED WEB SYSTEMS",
        "SOFTWARE ENGINEERING 1",
        "NETWORKS AND COMMUNICATIONS",
        "GRAPHICS AND VISUAL COMPUTING"
      ],
      semester: ["1st Semester", "2nd Semester"],
      programs: [
                  "BS in Computer Science", 
                  "BS in Information Systems",
                  "BS in Information Technology",
                  "BS in Entertainment and Multimedia Computing"
                ],
      year: ["1", "2", "3", "4"],
      section: ["A", "B", "C"]
    };
  },

  validations(){
    return{
      formData:{
        classProg: {required},
        classYr: {required},
        classSec: {required},
        subjCode: {required},
        subjUnit: {required},
        subjDesc: {required},
        subjTime: {required},
        subjDay: {required},
        subjSem: {required},
        subjSY_start: {required},
        subjSY_end: {required},
        profRank: {required},
        profName: {required}
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
      default: require("@/assets/img/escord-team-pictures/prof.png")
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    },
    /*profName: {
      get() {
        return `${this.profFN} ${this.profMN} ${this.profLN}`
      }
    }*/
  },

  methods: {
       ...mapActions({ addgsinfo: "addgsinfo" }),
     addgs(){
            this.v$.$validate()

            if(!this.v$.$error){

              
      this.addgsinfo(this.formData);

            }else{
              console.log(this.v$);
            }

     },

    classicModalHide() {
      this.classicModal = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.section {
  padding: 0;
}

h3, .h3 {
  font-size: 1.5em !important;
  line-height: 1em !important;
  margin-bottom: 0px !important;
}
</style>
