<template>
  <div class="wrapper">
    <parallax
      class="section page-header header-filter"
      :style="headerStyle"
    ></parallax>
  
    <div class="main main-raised" ref="DownloadComp">
      <div class="section profile-content">
        <div class="container">

          <div class="md-layout md-gutter md-alignment-center-center">
            <p class="title text-center md-display-1 text-esc-darkgrey">Gradesheet Detail</p>
          </div>
       
          <div class="__gradesheet-header md-layout md-gutter md-alignment-center-center">

            <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-space-between">
              <div class="md-layout-item md-size-25 md-layout md-gutter md-alignment-center-center">
                <md-field
                class="has-esc-accent"
                :class="getValidationClass('subjectcode')">
                <label>Code</label>
                  <md-input 
                  class="text-center"
                  v-model="getGS.subjectcode"></md-input>

                  <span class="md-error" v-if="!$v.getGS.subjectcode.required">Required.</span>
                </md-field>
              </div>
              <div class="md-layout-item md-size-75 md-layout md-gutter md-alignment-center-left">
                <md-field
                class="has-esc-accent"
                :class="getValidationClass('subjectdesc')">
                <label>Description</label>
                  <md-input 
                  class=""
                  v-model="getGS.subjectdesc"></md-input>

                  <span class="md-error" v-if="!$v.getGS.subjectdesc.required">Required.</span>
                </md-field>
              </div>
            </div>

            <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-space-between">
              <div class="md-layout-item md-size-70 md-layout md-gutter md-alignment-center-center">
                <md-field
                class="has-esc-accent"
                :class="getValidationClass('course_short')">
                <label>Program</label>
                  <md-input 
                  class="text-left"
                  v-model="getGS.course_short"></md-input>

                  <span class="md-error" v-if="!$v.getGS.course_short.required">Required.</span>
                </md-field>
              </div>
              <div class="md-layout-item md-size-15 md-layout md-gutter md-alignment-center-center">
                <md-field
                class="has-esc-accent"
                :class="getValidationClass('course_year')">
                <label>Year</label>
                  <md-input 
                  class="text-center"
                  type="number"
                  v-model="getGS.course_year"></md-input>

                  <span class="md-error" v-if="!$v.getGS.course_year.required">Required.</span>
                  <span class="md-error" v-else-if="!$v.getGS.course_year.minValue">Minimum is 1.</span>
                  <span class="md-error" v-else-if="!$v.getGS.course_year.maxValue">Maximum is 4.</span>
                  <span class="md-error" v-else-if="!$v.getGS.course_year.maxLength">Invalid</span>
                  <span class="md-error" v-else-if="!$v.getGS.course_year.integer">Invalid.</span>
                </md-field>
              </div>
              <div class="md-layout-item md-size-15 md-layout md-gutter md-alignment-center-left">
                <md-field
                class="has-esc-accent"
                :class="getValidationClass('course_section')">
                <label>Section</label>
                  <md-input 
                  class="text-center"
                  v-model="getGS.course_section"></md-input>

                  <span class="md-error" v-if="!$v.getGS.course_section.required">Required.</span>
                  <span class="md-error" v-else-if="!$v.getGS.course_section.maxLength">Invalid.</span>
                </md-field>
                
              </div>
            </div>

            <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-space-between">
              <div class="md-layout-item md-size-25 md-layout md-gutter md-alignment-center-center">
                <md-field
                class="has-esc-accent"
                :class="getValidationClass('day')">
                <label>Day</label>
                  <md-input 
                  class="text-left"
                  v-model="getGS.day"></md-input>

                  <span class="md-error" v-if="!$v.getGS.day.required">Required.</span>
                </md-field>
              </div>
              <div class="md-layout-item md-size-25 md-layout md-gutter md-alignment-center-center">
                <md-field
                class="has-esc-accent"
                :class="getValidationClass('time')">
                <label>Time</label>
                  <md-input 
                  class="text-left"
                  v-model="getGS.time"></md-input>

                  <span class="md-error" v-if="!$v.getGS.time.required">Required.</span>
                </md-field>
              </div>
              <div class="md-layout-item md-size-10 md-layout md-gutter md-alignment-center-left">
                <md-field
                class="has-esc-accent"
                :class="getValidationClass('semester')">
                <label>Sem</label>
                  <md-input 
                  class="text-center"
                  v-model="getGS.semester"></md-input>

                  <span class="md-error" v-if="!$v.getGS.semester.required">Required.</span>
                  <span class="md-error" v-else-if="!$v.getGS.semester.maxLength">Invalid.</span>
                  <span class="md-error" v-else-if="!$v.getGS.semester.minValue">Invalid.</span>
                  <span class="md-error" v-else-if="!$v.getGS.semester.maxValue">Invalid.</span>
                  <span class="md-error" v-else-if="!$v.getGS.semester.integer">Invalid.</span>
                </md-field>
              </div>
              <div class="md-layout-item md-size-20 md-layout md-gutter md-alignment-center-left">
                <md-field
                class="has-esc-accent"
                :class="getValidationClass('sem_startyear')">
                <label>SY (start)</label>
                  <md-input 
                  class="text-center"
                  v-model="getGS.sem_startyear"></md-input>

                  <span class="md-error" v-if="!$v.getGS.sem_startyear.required">Required.</span>
                  <span class="md-error" v-else-if="!$v.getGS.sem_startyear.minValue">Invalid.</span>
                  <span class="md-error" v-else-if="!$v.getGS.sem_startyear.maxValue">Invalid.</span>
                  <span class="md-error" v-else-if="!$v.getGS.sem_startyear.integer">Invalid.</span>
                </md-field>
              </div>
              <div class="md-layout-item md-size-20 md-layout md-gutter md-alignment-center-left">
                <md-field
                class="has-esc-accent"
                :class="getValidationClass('sem_endyear')">
                <label>SY (end)</label>
                  <md-input 
                  class="text-center"
                  v-model="getGS.sem_endyear"></md-input>

                  <span class="md-error" v-if="!$v.getGS.sem_endyear.required">Required.</span>
                  <span class="md-error" v-else-if="!$v.getGS.sem_endyear.minValue">Invalid.</span>
                  <span class="md-error" v-else-if="!$v.getGS.sem_endyear.maxValue">Invalid.</span>
                  <span class="md-error" v-else-if="!$v.getGS.sem_endyear.integer">Invalid.</span>
                </md-field>
              </div>
            </div>

            <div class="_btnTop  md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center">
              <div class="md-layout-item md-size-25 md-layout md-gutter md-alignment-center-center">
                <md-button @click="updateGradesheetInfo"
                class="md-esc-darkgrey md-raised md-round md-wd md-dense">
                Save
                    <md-tooltip md-direction="bottom">Update Gradesheet Info</md-tooltip>
                </md-button>
              </div>
            </div>

            <hr>
            <md-divider></md-divider>

            <div class="_btnTop _frmaction md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center">
              <div class="md-layout-item md-size-25 md-layout md-gutter md-alignment-center-center">
                <md-button 
                class="md-esc-accent md-raised md-round md-just-icon"
                @click="classicModal = true">
                    <md-icon>person_add</md-icon>
                    <md-tooltip md-direction="bottom">Add Student</md-tooltip>
                </md-button>
              </div>
              <div class="md-layout-item md-size-25 md-layout md-gutter md-alignment-center-center">
                <md-button  @click="archievebtn"
                class="md-danger md-raised md-round md-just-icon">
                    <md-icon>inventory</md-icon>
                    <md-tooltip md-direction="bottom">Archive Gradesheet</md-tooltip>
                </md-button>
              </div>
            </div>

            <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center">
                <p class="md-body-2 title text-center __info">
                    <md-icon class="_tip">tips_and_updates</md-icon>
                      &nbsp;&nbsp;&nbsp; Refresh the page to see your current changes!*
                </p>
            </div>
          </div>

          <md-divider></md-divider>

           <div v-if='loadingStatus'>
            <md-progress-spinner class="__gradesheet-header md-layout md-gutter md-alignment-top-space-between" md-mode="indeterminate"></md-progress-spinner>
          
          </div>

          <div  v-else  class="__gradesheet-table">

            <md-table 
              v-model="studentList"
              md-sort="studLN"
              md-sort-order="asc">

              <md-table-row class="title">
                <md-table-head class="text-center">Actions</md-table-head>
                <md-table-head class="text-center _col1">Student #</md-table-head>
                <md-table-head class="text-center">Name</md-table-head>
                <md-table-head class="text-center _col1">Midterm</md-table-head>
                <md-table-head class="text-center _col1">Final Term</md-table-head>
                <md-table-head class="text-center _col1">Remarks</md-table-head>
                
              </md-table-row>

              <md-table-row
              v-for="(_, index) in getrow"
              :key="index">

              <div class="md-layout md-gutter md-alignment-center-center">
                <div class="md-layout-item md-size-25 md-layout md-gutter md-alignment-center-center">
                  <md-button @click.prevent="sendArrayofData(getrow[index])"
                  class="md-success md-raised md-round md-just-icon md-simple">
                      <md-icon>save</md-icon>
                      <md-tooltip md-direction="bottom">Save Changes</md-tooltip>
                  </md-button>
                </div>
                <div class="md-layout-item md-size-25 md-layout md-gutter md-alignment-center-center">
                  <md-button
                  @click="deletedrowStudent(getrow[index])"
                  class="md-danger md-raised md-round md-just-icon md-simple">
                      <md-icon>delete</md-icon>
                      <md-tooltip md-direction="bottom">Remove Row</md-tooltip>
                  </md-button>
                </div>
              </div>

               <!-- <div class="md-layout-item md-xsmall-size-25 md-small-size-50 md-large-size-25">
                    <md-button @click.prevent="sendArrayofData(getrow[index])"
                    class="md-esc-darkgrey md-raised md-round md-just-icon">
                        <md-icon>save</md-icon>
                        <md-tooltip md-direction="bottom">save</md-tooltip>
                    </md-button>

                    
                    <md-button
                    @click="deletedrowStudent(getrow[index])"
                    class="md-esc-darkgrey md-raised md-round md-just-icon">
                        <md-icon>error</md-icon>
                    </md-button>
               
                </div> -->
                
                <md-table-cell>

                <md-field
                  class="has-esc-accent">
                    <md-input 
                    class="text-center"
                    v-model="getrow[index].student_number"></md-input>
                  </md-field>

                  <!--<md-vuelidated
                  :key="index"
                  :messages="{required: 'Field cannot be blank.'}" 
                  field="md-field" 
                  class="has-esc-accent">
                    <md-input 
                    class="text-center"
                    v-model="getrow[index].student_number"></md-input>
                  </md-vuelidated> -->
                  <!-- {{getrow[index].student_number}} -->
                </md-table-cell>



                <md-table-cell>

                <md-field
                  class="has-esc-accent">
                    <md-input 
                    class=""
                    v-model="getrow[index].studentname"></md-input>
                  </md-field>

                  <!--<md-vuelidated
                  :key="index"
                  :messages="{required: 'Field cannot be blank.'}" 
                  field="md-field" 
                  class="has-esc-accent">
                    <md-input 
                    class="text-left"
                    v-model="getrow[index].studentname"></md-input>
                  </md-vuelidated> -->
               <!-- {{getrow[index].studentname}} -->
                </md-table-cell>

               <md-table-cell>

                <md-field
                  class="has-esc-accent">
                    <md-input 
                    class="text-center"
                    v-model="getrow[index].midterm"></md-input>
                  </md-field>
              
                 <!--<md-vuelidated
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
                     v-model="getrow[index].midterm"
                   ></md-input> 
                  </md-vuelidated> -->
               
                </md-table-cell>

                <md-table-cell>

                  <md-field
                  class="has-esc-accent">
                    <md-input 
                    class="text-center"
                    v-model="getrow[index].finalterm"></md-input>
                  </md-field>
                
                <!-- <md-vuelidated
                  :key="index"
                  :messages="{
                    required: 'Field cannot be blank.',
                    maxLength: 'Input cannot be more than 4 characters.',
                    minValue: 'Field only accepts value from `1.00` to `5.00`.',
                    maxValue: 'Field only accepts value from `1.00` to `5.00`.'
                  }" 
                  field="md-field" 
                  :class="getValidationClass('finalterm')"
                  class="has-esc-accent">
                    <md-input 
                    type="number"
                    class="text-center"
                    v-model="getrow[index].finalterm"></md-input>
                  </md-vuelidated> -->
                 
                </md-table-cell>

                <md-table-cell>

                  <md-field
                  class="has-esc-accent">
                    <md-input 
                    class="text-center"
                    :value="remarkCompute(index)"></md-input>
                  </md-field>

                  <!-- <md-vuelidated
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
                    v-model="getrow[index].finalgrade" 
                    :value="remarkCompute(index)"></md-input>
                  </md-vuelidated>  -->

                  <!-- <md-field class="has-esc-accent">
                  <md-input
                  v-model="getrow[index].finalgrade" 
                    :value="remarkCompute(index)"></md-input> -test display-
                  </md-field> -->
                </md-table-cell>
                
              </md-table-row>

            </md-table>

          </div>

          <div class="__addStudentModal">
            <!-- modal -->
            <modal v-if="classicModal" @close="classicModalHide">

              <!-- modal header -->
              <template slot="header">
                  <h3 class="title text-esc-accent">Add Student</h3>
              </template>

              <!-- modal body -->
              <template slot="body">
                <form @submit.prevent="addValidate" novalidate class="md-layout md-gutter md-alignment-center-left">


                  <!-- addStud modal inputs -->
                  <div class="md-layout-item md-layout md-gutter md-alignment-center-space-between md-size-100">

                    <md-field class="has-esc-accent"
                    :class="getValidationClass('studNum')">
                      <label>Student Number</label>
                      <md-input v-model="addStud.studNum"
                      :disabled="sending"
                      type="number"></md-input>

                      <span class="md-error" v-if="!$v.addStud.studNum.required">Student number is required.</span>
                    </md-field>

                    <div class="md-layout-item md-layout md-gutter md-alignment-center-space-between">

                      <md-field class="has-esc-accent md-layout-item md-size-40"
                      :class="getValidationClass('studLN')">
                        <label>Last Name</label>
                        <md-input v-model="addStud.studLN"
                        :disabled="sending"></md-input>

                        <span class="md-error" v-if="!$v.addStud.studLN.required">Last name is required.</span>
                      </md-field>

                      <md-field class="has-esc-accent md-layout-item md-size-40"
                      :class="getValidationClass('studFN')">
                        <label>First Name</label>
                        <md-input  v-model="addStud.studFN"
                        :disabled="sending"></md-input>

                        <span class="md-error" v-if="!$v.addStud.studFN.required">First name is required.</span>
                      </md-field>
                      
                      <md-field class="has-esc-accent md-layout-item md-size-15">
                        <label>MI</label>
                        <md-input v-model="addStud.studMI"></md-input>
                      </md-field>
                    </div>


                    <div class="md-layout-item md-layout md-gutter md-alignment-center-space-between md-size-100">

                      <md-field class="has-esc-accent md-layout-item md-size-45"
                      :class="getValidationClass('studMG')">
                        <label>Midterm Grade</label>
                        <md-input
                        type="number" v-model="addStud.studMG"
                        :disabled="sending"></md-input>

                        <span class="md-error" v-if="!$v.addStud.studMG.required">Midterm grade is required.</span>
                      </md-field>

                      <md-field class="has-esc-accent md-layout-item md-size-45"
                      :class="getValidationClass('studFG')">
                        <label>Final Term Grade</label>
                        <md-input
                        type="number" v-model="addStud.studFG"
                        :disabled="sending"></md-input>

                        <span class="md-error" v-if="!$v.addStud.studFG.required">Final term grade is required.</span>
                      </md-field>
                    </div>

                    
                  </div>

                  
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
                          <md-icon>add</md-icon>
                          ADD 
                        </md-button>
                      </div>
                  </div>
                  
                  <md-snackbar
                    md-position="left"
                    :md-active.sync="studAdded">
                    {{addedStudentInfo}} is added to the gradesheet.
                  </md-snackbar>
                </form>
              </template>

              <template slot="footer"></template>
            </modal>
          </div>

        </div>
      </div>
    </div>
    <vue-headful title="Professor | Gradesheet Detail"/>
  </div>
</template>

<script>
// modal import
import { Modal } from "@/components";
import { mapActions, mapGetters, mapMutations} from "vuex";
import axios from "axios"


//validation imports
import { validationMixin } from 'vuelidate'
import { required, maxLength, minValue, maxValue, integer } from 'vuelidate/lib/validators'

export default {
  bodyClass: "profile-page",
  name:'Gradesheetpage',
  components: {
      Modal,
    
 
  },
  mounted() {
          this.$store.dispatch('showgsinfo',{ route: this.$route.params.gradeshid });
         // let studentrow = this.$store.getters.getrow;

        //  studentrow.forEach(student => this.studentList = student);
     // console.log(this.studentList)
          
      },
      created(){
          this.studentGrade = this.$store.getters.getrow;
      },
  data() {
    return {
      /* GRADESHEET TABLE DATA */
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
      successmessage: '',
    

      studentList: [
    
      ],
      studentGrade: [],


       /*modal default value on load*/
      classicModal: false,

      /*modal--form data*/
      addStud: {
        studNum: null,
        studLN: null,
        studFN: null,
        studMI: null,
        studMG: null,
        studFG: null,
        gradesheetid: this.$route.params.gradeshid,
        finalgrade: 0, //this is for testing only
      },
      studAdded: false,
      sending: false,
      addedStudentInfo: '',
   
     
    };
  },

  mixins: [validationMixin], // for validation

   /* for validation */
   validations: {
       getrow: {
         $each: {
           student_number: {required},
           studentname: {required},
           finalgrade: {
             required,
             maxLength: maxLength(4),
             minValue: minValue(1.00),
             maxValue: maxValue(5.00)},
           midterm: {
             required,
             maxLength: maxLength(4),
             minValue: minValue(1.00),
             maxValue: maxValue(5.00)},
           finalterm: {
             required,
             maxLength: maxLength(4),
             minValue: minValue(1.00),
             maxValue: maxValue(3.00)},
         }
       },

       addStud: {
        studNum: {required},
        studLN: {required},
        studFN: {required},
        studMG: {required},
        studFG: {required}
      },

      getGS: {
        subjectcode: {required},
        subjectdesc: {required},
        course_short: {required},
        course_year: {required,
                      minValue: minValue(1),
                      maxValue: maxValue(4),
                      maxLength: maxLength(1),
                      integer},
        course_section: {required,
                      maxLength: maxLength(1)},
        day: {required},
        time: {required},
        semester: {required,
                  minValue: minValue(1),
                  maxValue: maxValue(2),
                  maxLength: maxLength(1),
                  integer},
        sem_startyear: {required,
                      maxLength: maxLength(4),
                      minValue: minValue(2000),
                      maxValue: maxValue(2080),
                      integer},
        sem_endyear: {required,
                      maxLength: maxLength(4),
                      minValue: minValue(2000),
                      maxValue: maxValue(2080),
                      integer},
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
    },
    loadingStatus(){
      return this.$store.getters.loadingStatus
    },
       ...mapGetters({getrow : 'getrow'}),
     ...mapGetters({getGS : 'getGS'}),

  
  },

  methods: {
    remarkCompute(index){
      // return this.getrow[index].finalgrade = ((this.getrow[index].finalterm + this.getrow[index].midterm) / 2).toFixed(2);

      // return this.getrow[index].finalgrade = (this.getrow[index].finalterm + this.getrow[index].midterm) / 2

      const ave = ((parseFloat(this.getrow[index].finalterm) + parseFloat(this.getrow[index].midterm)) / 2).toFixed(2); 
      return ave;
    },

     updateGradesheetInfo(){

       this.$v.getGS.$touch()

        if (!this.$v.getGS.$invalid) {
            
        //    console.log("Student is added successfully.")
        

  axios.put('/api/updateGradesheet/'+this.$route.params.gradeshid,{
          subjectcode: this.getGS.subjectcode,
          subjectdesc: this.getGS.subjectdesc,
          course_year: this.getGS.course_year,
          course_section: this.getGS.course_section,
          course_short: this.getGS.course_short,
          day: this.getGS.day,
          time: this.getGS.time,
          semester: this.getGS.semester,
          sem_startyear: this.getGS.sem_startyear,
          sem_endyear:this.getGS.sem_endyear,


  }).then((response)=>{
        

     
 this.successmessage = response.data.message;
           
           alert(this.successmessage);
            
             }).catch((errors)=>{
  
             this.error =  errors.response.data;
   
             })

             //alert("Gradesheet info has been updated successfully!");

     }
        else {

          alert('Data Invalid');
          alert("Cannot update gradesheet info.");
       //   console.log(this.$v)
         //   console.log("Cannot add student to the gradesheet.");
        }

    },

    /*modal function*/
          ...mapActions({ archgradesheet: "archgradesheet" }),
          ...mapActions({ refreshGS: "showgsinfo" }),

          ...mapActions({ addStudGradesheet: "addStudGradesheet" }),
          ...mapActions({ updateGradesheetData: "updateGradesheetData" }),

 // ...mapMutations(['setspeciGS']),
    sendArrayofData(index){
        //UPDATE 
        //  console.log(index);

   // this.updateGradesheetData({route:index.id}, this.index);

        // this.$v.getrow.$each[index].$touch()

        // if (!this.$v.getrow.$each[index].$invalid) {
  
        //   alert('row updated');

          axios.put('/api/addgs/'+index.id, index).then((response)=>{
        

         //     console.log('create professor accounts' , response.data);
          //        alert(response);
  //            console.log(response);
             }).catch((errors)=>{
  
             this.error =  errors.response.data;
   
             })

             alert("Row has been updated successfully!");
            
        //    console.log("Student is added successfully.")
        // }
        // else {

        //   alert('row not updated');
        //  //   console.log("Cannot add student to the gradesheet.");
        // }

  
        
    },

    classicModalHide() {
      this.classicModal = false;
    },

    refreshGradesheet(){
        this.refreshGS({ route: this.$route.params.gradeshid })
    },

     fgxunit_prod(subj) {
        return (subj.units * subj.grade).toFixed(2);
    },



    /* add student modal validation methods */
    getValidationClass (fieldName) {
      const field = this.$v.addStud[fieldName] || this.$v.getGS[fieldName] 
      // || this.$v.getrow.$each[fieldName]

      if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.addStud.studNum = null
        this.addStud.studLN = null
        this.addStud.studFN = null
        this.addStud.studMI = null
        this.addStud.studMG = null
        this.addStud.studFG = null
      },
      addStudent () {
        this.sending = true
     
       this.addStudGradesheet(this.addStud)
       
   
      
        // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
          this.addedStudentInfo = `${this.addStud.studLN}, ${this.addStud.studFN} ${this.addStud.studMI}`
          this.studAdded = true
          this.sending = false
          this.clearForm()
        }, 1500)  

        this.refreshGradesheet();
      },
      addValidate () {
        this.$v.addStud.$touch()

        if (!this.$v.addStud.$invalid) {
  
          this.addStudent()
            
        //    console.log("Student is added successfully.")
        }
        else {

          alert('Gradesheet Cant Add');
         //   console.log("Cannot add student to the gradesheet.");
        }
    },

      archievebtn(){
       
        
      axios.put('api/archievegs/'+ this.$route.params.gradeshid, { 
            status_archieve: '1', }).then((response)=>{
          
       
                //    console.log('archieve successfull');
                  
                //add notification time out here 
              //  alert(response.data.message)
       
    
    }).catch((errors)=>{
          
                 //  console.log('error in archeiveing');
    
          
       
                 })  

                 alert("Gradesheet has been archived successfully! \nPlease return to the  dashboard.");
 
           },

             deletedrowStudent(index){

  axios.delete('/api/deleteRowGradesheet/'+index.id).then((response)=>{
        

        //   console.log(response);

            
             }).catch((errors)=>{
  
             this.error =  errors.response.data;
   
             })

             alert("Row has been deleted successfully!");

    },

   
        

     
  }
};
</script>

<style lang="scss" scoped>
.section {
  padding: 0;
}

.__gradesheet-table {
    margin: 2rem 0 1.5rem 0 !important;
}

.__gradesheet-header {
  max-width: 50em !important;
  margin: auto !important;
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
.__info {
    margin-bottom: 0 !important;
    color: #494848 !important;
}

._tip {
    color: #37c6de !important;
    font-size: 1.35em !important;
}
._btnTop {
  margin-top: 1.5em !important;
}
._col1 {
  width: 4em !important;
  // max-width: 4em !important;
}

._frmaction {
  max-width: 10em !important;
  margin: auto !important;
}
</style>
