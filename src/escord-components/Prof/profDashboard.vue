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
                <form @submit.prevent="addValidate" novalidate class="md-layout md-gutter md-alignment-center-left">

                  <!-- gradesheet id 
                  <md-field class="has-esc-accent md-layout-item">
                    <label>Gradesheet ID</label>
                    <md-input v-model="gsNum" readonly></md-input>
                  </md-field>-->

                  <!-- subj desc -->
                  <md-autocomplete
                  md-dense
                  v-model="formData.subjDesc"
                  :md-options="subjectOptions"
                  :md-fuzzy-search="false"
                  @md-changed="getSubjectOptions"
                  @md-opened="getSubjectOptions"
                  @md-selected="getSelected"
                  class="has-esc-accent md-layout-item md-size-100"
                  required
                  :class="getValidationClass('subjDesc')"
                  :disabled="sending"
                  >
                    <label class="__label">Subject Description</label>

                    <template slot="md-autocomplete-empty"
                    slot-scope="{ term }">
                      {{term}} does not match any registered subjects.
                    </template>

                    <span class="md-error" v-if="!$v.formData.subjDesc.required">Subject description is required.</span>
                  </md-autocomplete>

                  <!-- subj code and unit -->
                  <div class="md-layout-item md-layout md-gutter md-alignment-center-space-between md-size-100">
                    <md-field class="has-esc-accent md-layout-item md-size-50" :md-counter="false" :class="getValidationClass('subjCode')"
                    >
                      <label class="__label">Subject Code</label>
                      <md-input v-model="formData.subjCode" maxlength="10" readonly required :disabled="sending"></md-input>

                      <span class="md-error" v-if="!$v.formData.subjCode.required">Subject code is required.</span>
                    </md-field>

                    <md-field class="has-esc-accent md-layout-item md-size-45" :md-counter="false"
                    :class="getValidationClass('subjUnit')">
                      <label>Units</label>
                      <md-input v-model="formData.subjUnit" maxlength="2" required :disabled="sending"></md-input>

                      <span class="md-error" v-if="!$v.formData.subjUnit.required">Subject unit is required.</span>
                    </md-field>
                  </div>

                  <!-- subj schedule -->
                  <md-subheader>Schedule</md-subheader>

                  <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-space-between">
                    
                    <md-field
                    class="has-esc-accent md-layout-item md-size-45"
                    :class="getValidationClass('subjDay')">
                    <label>Day</label>
                      <md-input v-model="formData.subjDay" required :disabled="sending"></md-input>

                       <span class="md-error" v-if="!$v.formData.subjDay.required">Set subject day/s.</span>
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
                    class="has-esc-accent md-layout-item md-size-45"
                    :class="getValidationClass('subjTime')">
                      <label>Time</label>
                      <md-input v-model="formData.subjTime" required :disabled="sending"></md-input>

                      <span class="md-error" v-if="!$v.formData.subjTime.required">Set subject time/s.</span>
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
                    required
                    :class="getValidationClass('subjSem')"
                    :disabled="sending">
                      <label>Semester</label>
                      
                      <template slot="md-autocomplete-empty"
                    slot-scope="{ term }">
                      {{term}} is not available in the options.
                    </template>

                    <span class="md-error" v-if="!$v.formData.subjSem.required">Required.</span>
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
                    required
                    :class="getValidationClass('classProg')"
                  :disabled="sending">
                      <label>Program</label>

                      <template slot="md-autocomplete-empty"
                    slot-scope="{ term }">
                      {{term}} is not available in the options.
                    </template>

                    <span class="md-error" v-if="!$v.formData.classProg.required">Required.</span>
                    </md-autocomplete>

                    <md-autocomplete
                    md-dense
                    v-model="formData.classYr"
                    :md-options="year"
                    :md-fuzzy-search="false"
                    class="has-esc-accent md-layout-item md-size-20"
                    required
                    :class="getValidationClass('classYr')"
                  :disabled="sending">
                      <label>Year</label>

                      <template slot="md-autocomplete-empty"
                    slot-scope="{ term }">
                      {{term}} is not available in the options.
                    </template>

                    <span class="md-error" v-if="!$v.formData.classYr.required">Required.</span>
                    </md-autocomplete>

                    <md-autocomplete
                    md-dense
                    v-model="formData.classSec"
                    :md-options="section"
                    :md-fuzzy-search="false"
                    class="has-esc-accent md-layout-item md-size-20"
                    required
                    :class="getValidationClass('classSec')"
                  :disabled="sending">
                      <label>Section</label>

                      <template slot="md-autocomplete-empty"
                    slot-scope="{ term }">
                      {{term}} is not available in the options.
                    </template>

                    <span class="md-error" v-if="!$v.formData.classSec.required">Required.</span>
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

                  <md-divider></md-divider>

                  <!-- modal footer -->
                  <div class="md-layout md-gutter md-alignment-center-space-between">


                    <div class="md-layout-item md-layout md-alignment-center-center">
                        <md-button class="md-esc-darkgrey md-raised md-dense md-round md-layout-item md-size-75" @click="classicModalHide">
                          CANCEL
                        </md-button>
                      </div>

                      <div class="md-layout-item md-layout md-alignment-center-center">
                        <md-button class="md-esc-accent md-raised md-dense md-round md-layout-item md-size-75"
                        type="submit"
                        :disabled="sending"
                        >
                          <md-icon>add</md-icon>
                          ADD
                        </md-button>
                      </div>
                  </div>
                  
                  <md-snackbar
                    :md-active.sync="gradesheetSaved">
                    Gradesheet for {{addedGradesheet}} is addded.
                  </md-snackbar>
                </form>
              </template>

              <template slot="footer" class="modal-footer"></template>
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
// modal import
import { Modal } from "@/components";

//validation imports
import { validationMixin } from 'vuelidate'
import { required, minLenght, maxLength  } from 'vuelidate/lib/validators'

export default {
  bodyClass: "profile-page",
  components: {
      Modal
  },
  mixins: [validationMixin], // for validation
  data() {
    return {
      /*modal default value on load*/
      classicModal: false,

      /*modal--form data*/
      formData:{
        classProg:null,
        classYr:null,
        classSec:null,
        subjCode: null,
        subjUnit:null,
        subjDesc:null,
        subjTime:null,
        subjDay:null,
        subjSem:null,
        subjSY_start: new Date().getFullYear(),
        subjSY_end: new Date().getFullYear() + 1,
        profRank:'Master Teacher III', //or null
        profName: 'JOHN GONZALES CRUZ' //or null
        },
        gradesheetSaved: false,
        sending: false,
        addedGradesheet: null,

      /**   subject desc, code, and units
       **** or retrieve data from db para alphabetically arranged yung mga options???*/
      subjectOptions: [],
      subjects: [
        {code: "CCS 116", units: "5", desc: "ADVANCED WEB SYSTEMS"},
        {code: "CS 108", units: "3", desc: "SOFTWARE ENGINEERING 1"},
        {code: "CS 110", units: "3", desc: "NETWORKS AND COMMUNICATIONS"},
        {code: "CSE 102", units: "3", desc: "GRAPHICS AND VISUAL COMPUTING"}
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
  /* for validation */
  validations: {
    formData: {
      classProg: {required},
      classYr: {required},
      classSec: {required},
      subjCode:  {required},
      subjUnit: {required},
      subjDesc: {required},
      subjTime: {required},
      subjDay: {required},
      subjSem: {required},
      // subjSY_start:  {
      //   required,
      //   minLenght: minLenght(4), 
      //   maxLength: maxLength(4)},
      // subjSY_end:  {
      //   required, 
      //   minLenght: minLenght(4), 
      //   maxLength: maxLength(4)},
      // profRank: {required},
      // profName:  {required}
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
    }
  },

  methods: {
    /*modal function*/
    classicModalHide() {
      this.classicModal = false;
    },

    /*get subject desc from `subjects` array*/
    getSubjectOptions(searchTerm) {
      console.log("getCustomers", searchTerm);
      this.subjectOptions = new Promise((resolve) => {
        if (!searchTerm) {
          resolve(this.subjects.map((x) => x.desc));
        }
        else {
          const term = searchTerm.toLowerCase();
          this.subjectOptions = this.subjects
          .filter(({ desc }) => {
            return desc.toLowerCase().includes(term);
          })
          .map((x) => x.desc);
        resolve(this.subjectOptions);
        }
      });
    },

    /* bind the `units` and `code` of selected subject to input component */
    getSelected() {
      const selectedSubjDetails = this.subjects.find(
        (obj) => obj.desc === this.formData.subjDesc
      );
      this.formData.subjCode = selectedSubjDetails.code;
      this.formData.subjUnit = selectedSubjDetails.units;
    },

    /* validation methods */
    getValidationClass (fieldName) {
      const field = this.$v.formData[fieldName]

      if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.formData.subjDesc = null
        this.formData.subjCode = null
        this.formData.subjUnit = null
        this.formData.subjTime = null
        this.formData.subjDay = null
        this.formData.subjSem = null
        this.formData.subjSY_start = null
        this.formData.subjSY_end = null
        this.formData.classProg = null
        this.formData.classYr = null
        this.formData.classSec = null
      },
      addGradesheet () {
        this.sending = true

        // Instead of this timeout, here you can call your API
        window.setTimeout(() => {
          this.addedGradesheet = `${this.formData.subjCode} ${this.formData.subjDesc}`
          this.gradesheetSaved = true
          this.sending = false
          this.clearForm()
        }, 1500)
      },
      addValidate () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.addGradesheet()
          console.log("Gradesheet saved and added successfully.")
        }
        else {
          console.log("Failed to add and save gradesheet. Fill out required fields.");
        }
    }
  },
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

.md-error {
  position: absolute !important;
  top: 3.07em !important;
  left: 0 !important;
  line-height: 0.75em !important;
  text-align: justify;
  font-size: .777rem !important;
}

.md-subheader {
  line-height: 0.1em !important;
  min-height: 1.5em !important;
  padding-top: 1em !important;
  padding-left: 0.025em !important;
}

.modal-footer {
  padding: 0 !important;
}
</style>
