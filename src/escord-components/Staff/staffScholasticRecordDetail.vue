<template>
  <div class="wrapper">
    <parallax
      class="section page-header header-filter"
      :style="headerStyle"
    ></parallax>
    <div class="main main-raised">
      <div class="section profile-content">
        <div class="container">
          
          <!-- TOP SECTION -->
          <div class="__top md-layout md-gutter md-size-100 md-layout md-gutter md-alignment-center-space-between">

            <div class="md-layout-item md-size-100">
              <h4 class="md-display-1">
                <strong>{{classProg}}</strong> | {{classYr}}{{classSec}}
              </h4>
            </div>

            <div class="md-layout-item md-size-100
            md-layout md-gutter md-alignment-center-space-between">
              <!-- BUTTONS -->
              <div class="md-layout-item md-size-45 md-layout md-gutter md-alignment-center-space-between">
                
                <div class="md-layout-item md-size-50 md-layout md-gutter md-alignment-center-center">
                  <md-button
                  class="md-success md-round md-dense md-raised md-simple">
                    Download All
                  </md-button>
                </div>

                <div class="md-layout-item md-size-50 md-layout md-gutter md-alignment-center-center">
                  <md-button
                  class="md-danger md-round md-dense md-raised md-simple">
                    Archive All
                  </md-button>
                </div>

              </div>

              <!-- SEARCH BAR -->
              <div class="md-layout-item md-size-50 md-layout md-gutter md-alignment-center-space-between">
                
                <div class="md-layout-item">
                  <input type="text" name="" id="" placeholder="Search...">
                </div>
              </div>
            </div>

            

          </div>

          <md-divider></md-divider>

          <!-- MIDDLE SECTION  >> SEARCH BAR & BUTTONS-->
          <div class="__mid">
          </div>

          <!-- BOTTOM SECTION >> TABLE -->
          <div class="__bottom __table">
            
            <md-table
              v-model="studentList"
              md-sort="studLN"
              md-sort-order="asc">

              <md-table-row class="title">
                <md-table-head>Student Number</md-table-head>
                <md-table-head>Name</md-table-head>
                <!-- <md-table-head>First Name</md-table-head>
                <md-table-head>MI</md-table-head> -->
                <md-table-head>Actions</md-table-head>
              </md-table-row>

              <md-table-row
              v-for="(student,index) in studentList"
              :key="index"
              >

                <md-table-cell 
                class="__id">
                  {{student.studNum}}
                </md-table-cell>

                <md-table-cell>
                  {{student.studLN}}, {{student.studFN}} {{student.studMN}}
                </md-table-cell>

                <!-- <md-table-cell
                md-label="First Name">
                  
                </md-table-cell>

                <md-table-cell
                md-label="MI">
                  
                </md-table-cell> -->

                <md-table-cell>
                  <!-- EDIT BUTTON -->
                  <md-button
                  @click="editStudentInfo(studentList[index])"
                  class="md-simple md-info md-just-icon md-round">
                    <md-icon>edit</md-icon>
                  </md-button>

                  <!-- DOWNLOAD BUTTON -->
                  <md-button
                  @click="downloadIndividualSR(studentList[index])"
                  class="md-simple md-success md-just-icon md-round">
                    <md-icon>arrow_downward</md-icon>
                  </md-button>

                  <!-- ARCHIVE BUTTON -->
                  <md-button
                  @click="archiveStudent(studentList[index])"
                  class="md-simple md-danger md-just-icon md-round">
                    <md-icon>close</md-icon>
                  </md-button>
                </md-table-cell>

              </md-table-row>

            </md-table>

          </div>

          <!-- EDIT STUDENT INFO MODAL -->
          <div class="__edit-stud-info-modal">
            <!-- modal -->
            <modal v-if="classicModal" @close="classicModalHide">

              <!-- modal header -->
              <template slot="header">
                  <h3 class="title text-esc-accent">Edit Student Info</h3>
              </template>

              <!-- modal body -->
              <template slot="body">

                
                <form 
                @submit.prevent="editStudInfoValidate"
                novalidate 
                class="md-layout md-gutter md-alignment-center-left">
                
                <div class="__body-modal">

                  <!-- EDIT STUD-INFO INPUTS -->
                  <div class="md-layout-item md-size-100
                  md-layout md-gutter md-alignment-center-space-between">

                    <!-- STUDNUM & PROGRAM + SECTION -->
                    <div class="md-layout-item md-size-100
                    md-layout md-gutter md-alignment-top-space-between">

                      <md-field class="has-esc-accent
                      md-layout-item md-size-33"
                      :class="getValidationClass('studNum')"
                      :disabled="sending">
                        <label>Student Number (readonly)</label>
                        <md-input v-model="modalInfo.studNum"
                        readonly></md-input>
                      </md-field>

                      <div class="md-layout-item md-size-66 md-layout md-gutter md-alignment-space-between">

                        <div class="md-layout-item md-size-66">
                          <md-field class="has-esc-accent"
                          :class="getValidationClass('studProgram')"
                          :disabled="sending">
                            <label>Program</label>
                            <md-input v-model="modalInfo.studProgram"></md-input>

                            <span class="md-error" v-if="!$v.modalInfo.studProgram.required">Program is required.</span>
                          </md-field>
                        </div>

                        <div class="md-layout-item md-size-33">
                          <md-field class="has-esc-accent"
                          :class="getValidationClass('studSection')"
                          :disabled="sending">
                            <label>Section</label>
                            <md-input v-model="modalInfo.studSection"></md-input>

                            <span class="md-error" v-if="!$v.modalInfo.studSection.required">Section is required.</span>
                          </md-field>
                        </div>
                      </div>
                    </div>

                    <!-- NAME -->
                    <div class="__name
                    md-layout-item md-size-100 md-layout md-gutter md-alignment-center-space between">

                    <div class=" md-layout-item md-size-33">
                      <md-field class="has-esc-accent"
                      :class="getValidationClass('studFN')">
                        <label>First Name</label>
                        <md-input v-model="modalInfo.studFN"
                        :disabled="sending"></md-input>

                        <span class="md-error" v-if="!$v.modalInfo.studFN.required">First name is required.</span>
                      </md-field>
                    </div>

                    <div class=" md-layout-item md-size-33">
                      <md-field class="has-esc-accent">
                        <label>Middle Name</label>
                        <md-input v-model="modalInfo.studMN"></md-input>
                      </md-field>
                    </div>

                    <div class=" md-layout-item md-size-33">
                      <md-field class="has-esc-accent"
                      :class="getValidationClass('studLN')">
                        <label>Last Name</label>
                        <md-input v-model="modalInfo.studLN"
                        :disabled="sending"></md-input>

                        <span class="md-error" v-if="!$v.modalInfo.studLN.required">Last name is required.</span>
                      </md-field>
                    </div>
                    
                    </div>

                    <!-- OTHER INFO -->
                    <md-subheader>OTHER INFORMATION</md-subheader>

                    <div class="md-layout-item md-size-100
                    md-layout md-gutter md-alignment-center-space-between">

                      <!-- BIRTHDAY & CONTACT NUMBER -->
                      <div class="md-layout-item md-size-100
                      md-layout md-gutter md-alignment-center-space-between">
                      
                        <div class="md-layout-item md-size-50">
                          <md-field class="has-esc-accent"
                          :class="getValidationClass('studBirthday')">
                            <label>Birthday (readonly)</label>
                            <md-input v-model="modalInfo.studBirthday"
                            readonly
                            :disabled="sending"></md-input>

                            <span class="md-error" v-if="!$v.modalInfo.studBirthday.required">Birthday is required.</span>
                          </md-field>
                        </div>

                        <div class="md-layout-item md-size-50">
                          <md-field class="has-esc-accent"
                          :class="getValidationClass('studContactNum')">
                            <label>Contact Number</label>
                            <md-input v-model="modalInfo.studContactNum"
                            :disabled="sending"></md-input>

                            <span class="md-error" v-if="!$v.modalInfo.studContactNum.required">Contact number is required.</span>
                          </md-field>
                        </div>

                      </div>

                      <!-- HOME ADDRESS -->
                      <div class="md-layout-item md-size-100 
                      md-layout md-gutter md-alignment-center-space-between">

                        <div class="md-layout-item md-size-100">
                          <md-field class="has-esc-accent"
                          :class="getValidationClass('studAddress')">
                            <label>Address</label>
                            <md-input v-model="modalInfo.studAddress"
                            :disabled="sending"></md-input>

                            <span class="md-error" v-if="!$v.modalInfo.studAddress.required">Address is required.</span>
                          </md-field>
                        </div>
                        
                      </div>

                      <!-- SCHOOL -->
                      <md-subheader>PREVIOUS SCHOOL</md-subheader>
                      <div class="md-layout-item md-size-100
                      md-layout md-gutter md-alignment-center-space-between">

                        <!-- ELEMENTARY -->
                        <div class="md-layout-item md-size-100
                        md-layout md-gutter md-alignment-center-space-between">

                          <div class="md-layout-item md-size-66">
                            <md-field class="has-esc-accent"
                            :class="getValidationClass('studElemSchool')">
                              <label>Elementary School</label>
                              <md-input v-model="modalInfo.studElemSchool"
                              :disabled="sending"></md-input>

                              <span class="md-error" v-if="!$v.modalInfo.studElemSchool.required">Elementary school is required.</span>
                            </md-field>
                          </div>

                          <div class="md-layout-item md-size-33">
                            <md-field class="has-esc-accent"
                            :class="getValidationClass('studElemGradYr')">
                              <label>Graduation Year</label>
                              <md-input
                              type="number" v-model="modalInfo.studElemGradYr"
                              :disabled="sending"></md-input>

                              <span class="md-error" v-if="!$v.modalInfo.studElemGradYr.required">Field is required.</span>
                            </md-field>
                          </div>

                        </div>

                        <!-- HIGH SCHOOL -->
                        <div class="md-layout-item md-size-100
                        md-layout md-gutter md-alignment-center-space-between">

                          <div class="md-layout-item  md-size-66">
                            <md-field class="has-esc-accent"
                            :class="getValidationClass('studHighSchool')">
                              <label>High School</label>
                              <md-input v-model="modalInfo.studHighSchool"
                              :disabled="sending"></md-input>

                              <span class="md-error" v-if="!$v.modalInfo.studHighSchool.required">High school is required.</span>
                            </md-field>
                          </div>

                          <div class="md-layout-item md-size-33">
                            <md-field class="has-esc-accent"
                            :class="getValidationClass('studHighSchoolGradYr')">
                              <label>Graduation Year</label>
                              <md-input
                              type="number" v-model="modalInfo.studHighSchoolGradYr"
                              :disabled="sending"></md-input>

                              <span class="md-error" v-if="!$v.modalInfo.studHighSchoolGradYr.required">Field is required.</span>
                            </md-field>
                          </div>

                        </div>
                        
                      </div>

                    </div>
                    
                  </div>
                  </div> 
                  <!-- end of __body-modal -->

                  <!-- modal footer -->
                  <div class="md-layout md-gutter md-alignment-center-space-between __modal-buttons">

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
                          UPDATE
                        </md-button>
                      </div>
                  </div>
                  
                  <md-snackbar
                    md-position="left"
                    :md-active.sync="studEditted">
                     Student info of: {{edittedStudInfo}} is successfully updated.
                  </md-snackbar>

                  <md-snackbar
                    md-position="left"
                    :md-active.sync="studNotEditted">
                     Student info cannot be updated.
                  </md-snackbar>

                </form>

              </template>

              <template slot="footer"></template>
            </modal>
          </div>

        </div>
      </div>
    </div>
    <vue-headful title="Scholastic Record Detail"/>
  </div>
</template>
-
<script>
// modal import
import { Modal } from "@/components";

//validation imports
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  bodyClass: "profile-page",
   components: {
      Modal
  },
  data() {
    return {
      /* MODAL DEFAULT DISPLAY STATE */
      classicModal: false,

      /* CLASS INFO */
      classProg: "BS Computer Science",
      classYr: "3",
      classSec: "A",

      /* STUDENT LIST */
      studentList: [
        {
          studNum: 20190001,
          studProgram: "BS Computer Science",
          studSection: "A",
          studLN: "LUCAS",
          studFN: "TRIZHALYN",
          studMN: "LUCAS",
          studBirthday: "05-01-01",
          studAddress: "CALOOCAN CITY",
          studContactNum: "0999 777 8888",
          studElemSchool: "CAMARIN D ELEMENTARY SCHOOL",
          studElemGradYr: "2013",
          studHighSchool: "CAMARIN HIGH SCHOOL", 
          studHighSchoolGradYr: "2019",

          
        },
        {
          studNum: 20190002,
          studProgram: "BS Computer Science",
          studSection: "A",
          studLN: "MAGLANGIT",
          studFN: "TRIZHA",
          studMN: "FRANCISCO",
          studBirthday: "05-01-00",
          studAddress: "CALOOCAN CITY",
          studContactNum: "0999 777 8888",
          studElemSchool: "CAMARIN D ELEMENTARY SCHOOL",
          studElemGradYr: "2013",
          studHighSchool: "CAMARIN HIGH SCHOOL", 
          studHighSchoolGradYr: "2019",

          
        },
        {
          studNum: 20190003,
          studProgram: "BS Computer Science",
          studSection: "A",
          studLN: "FRANCISCO",
          studFN: "TRIZH",
          studMN: "MAGLANGIT",
          studBirthday: "05-03-01",
          studAddress: "CALOOCAN CITY",
          studContactNum: "0999 777 8888",
          studElemSchool: "CAMARIN D ELEMENTARY SCHOOL",
          studElemGradYr: "2013",
          studHighSchool: "CAMARIN HIGH SCHOOL", 
          studHighSchoolGradYr: "2019",

          
        }
      ],

      /* MODAL STUDENT INFO */
      modalInfo: {
       studNum: null,
       studProgram: null,
       studSection: null,
       studLN: null,
       studFN: null,
       studMN: null,
       studBirthday: null,
       studAddress: null,
       studContactNum: null,
       studElemSchool: null,
       studElemGradYr: null,
       studHighSchool: null, 
       studHighSchoolGradYr: null,
      },
      studEditted: false,
      studNotEditted: false,
      edittedStudInfo: null,
      sending: false,
    };
  },

  mixins: [validationMixin], // for validation

   /* for validation */
   validations: {
       
    modalInfo: {
      studNum: {required},
      studProgram: {required},
      studSection: {required},
      studLN: {required},
      studFN: {required},
      studMN: {required},
      studBirthday: {required},
      studAddress: {required},
      studContactNum: {required},
      studElemSchool: {required},
      studElemGradYr: {required},
      studHighSchool: {required}, 
      studHighSchoolGradYr: {required},
    }

   },

  props: {
    header: {
      type: String,
      default: require("@/assets/img/bg-545454.jpg")
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
      this.studNotEditted = false;
      this.clearForm();
    },
    /* edit button in row is clicked */
    editStudentInfo(studentInfo) {
      this.classicModal = true;
      console.log("Row is selected. \nEditing Student Info.\n\n" + 
      "Student Number: " + studentInfo.studNum + 
      "\nStudent Name: " + studentInfo.studFN + " " + studentInfo.studMN + " " + studentInfo.studLN);

      this.modalInfo.studNum = studentInfo.studNum
      this.modalInfo.studLN = studentInfo.studLN
      this.modalInfo.studFN = studentInfo.studFN
      this.modalInfo.studMN = studentInfo.studMN
      this.modalInfo.studProgram = studentInfo.studProgram
      this.modalInfo.studSection = studentInfo.studSection

      this.modalInfo.studBirthday = studentInfo.studBirthday
      this.modalInfo.studContactNum = studentInfo.studContactNum
      this.modalInfo.studAddress = studentInfo.studAddress

      this.modalInfo.studElemSchool = studentInfo.studElemSchool
      this.modalInfo.studElemGradYr = studentInfo.studElemGradYr
      this.modalInfo.studHighSchool = studentInfo.studHighSchool
      this.modalInfo.studHighSchoolGradYr = studentInfo.studHighSchoolGradYr
    },

    /* download button in row is clicked */
    downloadIndividualSR(studentInfo) {
      console.log("Row is selected. \nDownloading specific SR.\n\n" + 
      "Student Number: " + studentInfo.studNum + 
      "\nStudent Name: " + studentInfo.studFN + " " + studentInfo.studMN + " " + studentInfo.studLN);
    },

    /* archive button in row is clicked */
    archiveStudent(studentInfo) {
      console.log("Row is selected. \nArchiving Student.\n\n" + 
      "Student Number: " + studentInfo.studNum + 
      "\nStudent Name: " + studentInfo.studFN + " " + studentInfo.studMN + " " + studentInfo.studLN);
    },

    /* modal methods && validations */
    getValidationClass (fieldName) {
    const field = this.$v.modalInfo[fieldName]

    if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    clearForm () {
      this.$v.$reset()
      this.modalInfo.studNum = null
      this.modalInfo.studLN = null
      this.modalInfo.studFN = null
      this.modalInfo.studMN = null
      this.modalInfo.studProgram = null
      this.modalInfo.studSection = null
      this.modalInfo.studBirthday = null
      this.modalInfo.studContactNum = null
      this.modalInfo.studAddress = null
      this.modalInfo.studElemSchool= null
      this.modalInfo.studElemGradYr = null
      this.modalInfo.studHighSchool = null
      this.modalInfo.studHighSchoolGradYr = null
    },
    editStudent () {
      this.sending = true
      
      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.edittedStudInfo = `${this.modalInfo.studLN}, ${this.modalInfo.studFN} ${this.modalInfo.studMN}`
        this.studNotEditted = false
        this.studEditted = true
        this.sending = false
      }, 1500)
    },
    
    editStudInfoValidate () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.editStudent()
          console.log("Student info is updated successfully.")
        }
        else {
          this.studNotEditted = true
          console.log("Cannot update student info.");
        }
    }

  }
};
</script>

<style lang="scss" scoped>
.section {
  padding: 0;
}

.__id {
  padding-left: 2.75em !important;
}

.md-input {
  width: 0.05rem;
  max-width: 100%;
}

.md-error {
  position: absolute !important;
  top: 3.07em !important;
  left: 0 !important;
  line-height: 0.95em !important;
  text-align: left;
  font-size: .777rem !important;
}

h3, .h3 {
  font-size: 1.5em !important;
  line-height: 1em !important;
  margin-bottom: 0px !important;
}

.__modal-buttons {
  margin-top: 1em;
}

.__table {
  margin: 2rem 0 1.5rem 0 !important;
}

.__name {
  margin-top: 1.25em !important;
}

.__body-modal {
  max-height: 60vh !important;
  overflow: auto;
}

</style>
