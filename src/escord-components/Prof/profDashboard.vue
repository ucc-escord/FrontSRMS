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

                <div class="md-layout md-alignment-center-center">

                  <div class="md-layout-item md-size-100  name">
                    <h3 class="title">{{getCurrentUser.firstname}} {{getCurrentUser.middleinitial}} {{getCurrentUser.lastname}}</h3>
                  <h5>{{getCurrentUser.faculty_rank}}</h5>
                  </div>

                  <div class="md-layout-item md-size-100 ">
                    <md-button
                    class="md-simple md-dense md-esc-darkgrey"
                    @click="updateModal = true">
                        UPDATE ACCOUNT
                    </md-button>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="md-layout md-gutter md-alignment-center-left">
            <h2 class="md-display-1 md-layout-item">GRADESHEETS</h2>
          </div>

          <div class="__buttons md-layout md-gutter md-alignment-center-center">
            <div class="md-layout-item md-size-30 md-layout md-gutter md-alignment-center-center">
              <!-- open modal button -->
              <md-button class="md-esc-accent md-wd md-round md-just-icon" 
              @click="classicModal = true">
                <md-icon>add</md-icon>
                <!-- Add Gradesheet -->
                <md-tooltip md-direction="bottom">Add Gradesheet</md-tooltip>
              </md-button>
            </div>
            <div class="md-layout-item md-size-30 md-layout md-gutter md-alignment-center-center">
              <md-button class="md-esc-darkgrey md-wd md-round md-just-icon"   
              type="submit" 
              @click="cardshowpage">
                <md-icon>refresh</md-icon>
                <!-- Refresh Card  -->
                <md-tooltip md-direction="bottom">Refresh Card Display</md-tooltip>
              </md-button>
            </div>
            <div class="md-layout-item md-size-30 md-layout md-gutter md-alignment-center-center">
              <md-button 
              :to="{ name: 'ProfessorArchieve Table'}"
              class="md-esc-darkgrey md-wd md-round md-just-icon">
                <md-icon>inventory_2</md-icon> 
                <!-- Go to Archive -->
                <md-tooltip md-direction="bottom">View Gradehsheet Archive</md-tooltip>
              </md-button>
            </div>
            <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center">
                <p class="md-body-2 title text-center __info">
                    <md-icon class="_tip">tips_and_updates</md-icon>
                      &nbsp;&nbsp;&nbsp; Click the refresh button above to see your current changes!*
                </p>
            </div>
          </div>
          
          <div>
            <!-- add gradesheet modal -->

            <modal v-if="classicModal" @close="classicModalHide">

              <!-- modal header -->
              <template slot="header">
                  <h3 class="title text-esc-accent">Add New Gradesheet</h3>
              </template>

              <!-- modal body -->
              <template slot="body">
                <form @submit.prevent="addValidate" novalidate class="md-layout md-gutter md-alignment-center-left">

                
                  <!-- subj desc -->
                  <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-space-between">
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

                      <!-- <template slot="md-autocomplete-empty"
                      slot-scope="{ term }">
                        {{term}} does not match any registered subjects.
                      </template> -->

                      <span class="md-error" v-if="!$v.formData.subjDesc.required">Subject description is required.</span>
                    </md-autocomplete>
                  </div>
                  

                  <!-- subj code and unit -->
                  <div class="md-layout-item md-layout md-gutter md-alignment-center-space-between md-size-100">
                    <md-field class="has-esc-accent md-layout-item md-size-50"
                    :md-counter="false" :class="getValidationClass('subjCode')"
                    >
                      <label class="__label">Subject Code</label>
                      <md-input v-model="formData.subjCode" maxlength="10" required :disabled="sending"></md-input>

                      <span class="md-error" v-if="!$v.formData.subjCode.required">Subject code is required.</span>
                    </md-field>

                    <md-field class="has-esc-accent md-layout-item md-size-45"
                    :class="getValidationClass('subjUnit')">
                      <label>Units</label>
                      <md-input v-model="formData.subjUnit" required type="number" :disabled="sending"></md-input>

                      <span class="md-error" v-if="!$v.formData.subjUnit.required">Subject unit is required.</span>

                       <span class="md-error" v-else-if="!$v.formData.subjUnit.minValue">Minimum is 1 unit.</span>
                       <span class="md-error" v-else-if="!$v.formData.subjUnit.maxValue">Maximum is 5 units.</span>
                       <span class="md-error" v-else-if="!$v.formData.subjUnit.integer">Invalid.</span>
                    </md-field>
                  </div>

                  <!-- subj schedule -->
                  <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-space-between">
                    
                    <md-subheader class="md-layout-item md-size-100">Schedule</md-subheader>
                      <md-field
                      class="has-esc-accent md-layout-item md-size-45"
                      :class="getValidationClass('subjDay')">
                      <label>Day</label>
                        <md-input v-model="formData.subjDay" required :disabled="sending"></md-input>
                        <span class="md-error" v-if="!$v.formData.subjDay.required">Set subject day/s.</span>
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
                      
                      <!-- <template slot="md-autocomplete-empty"
                    slot-scope="{ term }">
                      {{term}} is not available in the options.
                    </template> -->

                    <span class="md-error" v-if="!$v.formData.subjSem.required">Required.</span>
                    <span class="md-error" v-else-if="!$v.formData.subjSem.minValue">Minimum value is 1.</span>
                    <span class="md-error" v-else-if="!$v.formData.subjSem.maxValue">Maximum value is 2.</span>
                    <span class="md-error" v-else-if="!$v.formData.subjSem.maxLength">Maximum value is 2.</span>
                    <span class="md-error" v-else-if="!$v.formData.subjSem.integer">Maximum value is 2.</span>
                    </md-autocomplete>
                    
                    <md-field
                    class="has-esc-accent md-layout-item md-size-25" :class="getValidationClass('subjSY_start')">
                      <label>SY Start</label>
                      <md-input v-model="formData.subjSY_start" required type="number" :disabled="sending">
                      </md-input>

                      <span class="md-error" v-if="!$v.formData.subjSY_start.required">Required.</span>

                      <span class="md-error" v-else-if="!$v.formData.subjSY_start.minLength">Format is `XXXX`.</span>

                      <span class="md-error" v-else-if="!$v.formData.subjSY_start.maxLength">Format is `XXXX`.</span>
                    </md-field>

                    <md-field
                    class="has-esc-accent md-layout-item md-size-25" :class="getValidationClass('subjSY_end')">
                      <label>SY End</label>
                      <md-input v-model="formData.subjSY_end" required type="number" :disabled="sending">
                      </md-input>

                      <span class="md-error" v-if="!$v.formData.subjSY_end.required">Required.</span>

                      <span class="md-error" v-else-if="!$v.formData.subjSY_end.minLength">Format is `XXXX`.</span>

                      <span class="md-error" v-else-if="!$v.formData.subjSY_end.maxLength">Format is `XXXX`.</span>
                    </md-field>
                  </div>

                  <!-- class info -->
                  
                  <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-space-between">
                    <md-subheader class="md-layout-item md-size-100">Class</md-subheader>
                    
                    <md-autocomplete
                    md-dense
                    v-model="formData.classProg"
                    :md-options="programs"
                    :md-fuzzy-search="false"
                    class="has-esc-accent md-layout-item md-size-50"
                    required
                    :class="getValidationClass('classProg')"
                  :disabled="sending">
                      <label>Program</label>

                      <!-- <template slot="md-autocomplete-empty"
                    slot-scope="{ term }">
                      {{term}} is not available in the options.
                    </template> -->

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

                      <!-- <template slot="md-autocomplete-empty"
                    slot-scope="{ term }">
                      {{term}} is not available in the options.
                    </template> -->

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

                      <!-- <template slot="md-autocomplete-empty"
                    slot-scope="{ term }">
                      {{term}} is not available in the options.
                    </template> -->

                    <span class="md-error" v-if="!$v.formData.classSec.required">Required.</span>
                    </md-autocomplete>
                  </div>
                  
                  <!-- prof 
                  <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-space-between">

                    <md-field class="has-esc-accent md-layout-item md-size-45" :class="getValidationClass('profName')">
                      <label>Professor</label>
                      <md-input v-model="formData.profName" required :disabled="sending"></md-input>

                      <span class="md-error" v-if="!$v.formData.profName.required">Name is required.</span>
                    </md-field>

                    <md-field class="has-esc-accent md-layout-item md-size-45"
                    :class="getValidationClass('profRank')">
                      <label>Rank/ Position</label>
                      <md-input v-model="formData.profRank" required :disabled="sending"></md-input>

                      <span class="md-error" v-if="!$v.formData.profRank.required">Rank/ position is required.</span>
                    </md-field>
                  </div>-->

                  

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
                    :md-active.sync="gradesheetSaved">
                    Gradesheet for {{addedGradesheetInfo}} has been added successfully!
                  </md-snackbar>

                  <md-snackbar
                    md-position="left"
                    :md-active.sync="gradesheetNotSaved">
                    Gradesheet cannot be added.
                  </md-snackbar>
                </form>
              </template>

              <template slot="footer"></template>
            </modal>

            
          </div>
          
          <div v-if='loadingStatus'>
            <md-progress-spinner class="__gradesheet-header md-layout md-gutter md-alignment-top-space-between md-warning" md-mode="indeterminate"></md-progress-spinner>
          
          </div>


          <!-- GRADESHEET CARDS -->

          <div v-else class="profile-content"> 

            <div class="md-layout md-gutter md-alignment-center-center">
              <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center">
                <div class="md-layout-item md-size-65 md-layout-md-gutter md-alignment-center-right">
                  <md-field class="has-esc-accent">
                    <label>Search</label>
                    <md-input v-model="search"></md-input>
                    <span class="md-helper-text">Search for gradesheet card</span>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-15 md-layout-md-gutter md-alignment-center-center">
                  <md-button class="md-esc-accent md-just-icon md-round" 
                  @click="cardshowpage">
                    <md-icon>search</md-icon>
                  </md-button>
                </div>
              </div>
            </div>

            <div class="md-layout md-gutter md-alignment-center-center __paginate">
              <!-- <pagination
              class="mx-auto"
              type="esc-accent" 
              no-arrows   
              :page-count="gradesheet.last_page" 
              :value="gradesheet.current_page" 
              :total="gradesheet.total" 
              @input="cardshowpage" /> -->
              <pagination
              class="mx-auto"
              type="esc-accent" 
              no-arrows   
              :page-count="gradesheet.last_page" 
              :value="gradesheet.current_page"
              :total="gradesheet.total" 
              @input="cardshowpage" />
            </div>

            <!-- CARDS -->
            <div class="md-layout md-gutter md-alignment-top-left">

              <div class="md-layout-item md-size-25 md-xsmall-size-100 md-small-size-50 md-medium-size-33
               md-layout md-gutter md-alignment-top-center"
              v-for="gs in gradesheet.data"
              :key="gs.gradesheetid">
              <md-card
              md-with-hover
              class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center">
                  <md-card-content>
                    <div class="md-layout md-gutter md-alignment-center-center">
                      <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center">
                        <p class="md-caption text-left"><strong>ID: </strong> {{gs.gradesheetid}}</p>
                      </div>
                      <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center">
                        <p class="title text-center _subjcode">{{gs.subjectcode}}</p>
                      </div>
                      <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center">
                        <p class="title _subjdesc text-center">{{gs.subjectdesc}}</p>
                      </div>
                      <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center">
                        <p class="_subjinfo text-center">{{gs.course_year}}{{gs.course_section}} | {{gs.course_short}}</p>
                      </div>
                      <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center">
                        <p class="_subjinfo text-center md-caption"><strong>Semester: {{gs.semester}}, SY {{gs.sem_startyear}}-{{gs.sem_endyear}}</strong></p>
                      </div>
                    </div>
                    
                    <!-- <span v-if="selectedGS_infoShow === gs.gradesheetid"
                    class="text-info">
                      You have selected the card for {{gs.subjectdesc}} with gradesheet ID of: {{gs.gradesheetid}}.
                    </span> -->
                  </md-card-content>

                  <md-card-actions>
                    <!-- <md-button
                    class="md-simple md-esc-accent"
                    @click="showGS_info(gs.gradesheetid)">
                    SHOW DETAILS
                    </md-button> -->

                    <md-button
                    class="md-simple md-esc-accent"
                    :to="{ name: 'Gradesheet Detail', params: {gradeshid: gs.gradesheetid } }">
                    EDIT GRADESHEET
                    </md-button>


                  <!-- <router-link :to="{ name: 'Gradesheet Detail', params: {gradeshid: gs.gradesheetid } }">Edit Gradesheet..</router-link> -->
                  </md-card-actions>
            </md-card>
            </div>

              

            </div>

          </div>

          <updateModal v-if="updateModal" @close="updateModalHide"/>

        </div>
      </div>
    </div>

    <vue-headful title="Professor | Dashboard"/>
  </div>

  
</template>

<script>
// modal import
import { Modal } from "@/components";
import { mapActions, mapGetters} from "vuex";

import updateModal from '../Prof/AccountProf.vue'



//validation imports
import { validationMixin } from 'vuelidate'

import { required, minLength, maxLength, integer, minValue, maxValue } from 'vuelidate/lib/validators'
import {Pagination} from '@/components'
import axios from 'axios'


export default {
  bodyClass: "profile-page",
  components: {

      Modal,   
  Pagination,
      updateModal

  
  },
 
  mounted() {
        this.$store.dispatch('displayuser');
          this.$store.dispatch('cardinfo',this.$route.params.userid);
     this.cardshowpage()

      },
      created(){
      
      },
  name: 'FormValidation',
  mixins: [validationMixin], // for validation
  data() {
    return {

      
      /*modal default value on load*/
      classicModal: false,

      updateModal: false,
   

      /*modal--form data*/
      formData:{
        classProg:'',
        classYr:'',
        classSec:'',
        subjCode: '',
        subjUnit:'',
        subjDesc:'',
        subjTime:'',
        subjDay:'',
        subjSem:'',
        subjSY_start: new Date().getFullYear(),
        subjSY_end: new Date().getFullYear() + 1,
    //    profRank:'Master Teacher III', //or null
     //   profName: localStorage.getItem('email'),
        profID:  this.$route.params.userid,
    //or null
        },
        gradesheetSaved: false,
        gradesheetNotSaved: false,
        sending: false,
        addedGradesheetInfo: '',

      /**   subject desc, code, and units
       **** or retrieve data from db para alphabetically arranged yung mga options???*/
      subjectOptions: [],
      subjects: [
        {code: "CCS 116", units: "5", desc: "ADVANCED WEB SYSTEMS"},
        {code: "CS 108", units: "3", desc: "SOFTWARE ENGINEERING 1"},
        {code: "CS 110", units: "3", desc: "NETWORKS AND COMMUNICATIONS"},
        {code: "CSE 102", units: "3", desc: "GRAPHICS AND VISUAL COMPUTING"}
      ],

      semester: ["1", "2"],
      programs: [
                  "BS Computer Science", 
                  "BS Information Systems",
                  "BS Information Technology",
                  "BS Entertainment and Multimedia Computing"
                ],
      year: ["1", "2", "3", "4"],
      section: ["A", "B", "C"],

      /* GRADESHEET ARRAY/ INFO FOR GRADEHSHEET CARDS */
      gradesheet: {
                    type:Object,
                    default:null
                },
                currentpage: 1,
                search: '',
    
      selectedGS_infoShow: null,

      form: {
        firstName: null,
        lastName: null,
        gender: null,
        age: null,
        email: null,
      },

         profAcc: {
     
        stdPassword:null,
        stdConfirmPass:null,
    
      },
      userSaved: false,
      lastUser: null
    };
  },
  /* for validation */
  validations: {
    formData: {
      classProg: {required},
      classYr: {required},
      classSec: {required},
      subjCode:  {required},
      subjUnit: {
        required,
        integer,
        minValue: minValue(1),
        maxValue: maxValue(5)},
      subjDesc: {required},
      subjTime: {required},
      subjDay: {required},
      subjSem: {required,
      maxLength: maxLength(1),
      maxValue: maxValue(2),
      minValue: minValue(1),
      integer},
      subjSY_start:  {
        required,
        minLength: minLength(4),
        maxLength: maxLength(4),
        minValue: minValue(2000),
        minLength: minLength(4),
        maxValue: maxValue(2080)},
      subjSY_end:  {
        required, 
        minLength: minLength(4),
        maxLength: maxLength(4),
        minValue: minValue(2000),
        minLength: minLength(4),
        maxValue: maxValue(2080)},
    },


        profAcc: {
        stdPassword:{
          required,
               minLength: minLength(8)
        },
        stdConfirmPass:{
          required,
               minLength: minLength(8)
        },
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
     loadingStatus(){
      return this.$store.getters.loadingStatus
    },
  
    ...mapGetters({getCard: 'getCard'}),
   
    ...mapGetters({getCurrentUser: 'getCurrentUser'}),
    getcurrentpage : {
      get(){
          return 3;
      },

      set(val){
       //     console.log(val)
      }
    }
  },


  methods: {
    /*modal function*/
       ...mapActions({cardinfo: "cardinfo" }),
    
       ...mapActions({addgsinfo: "addgsinfo" }),
       //   ...mapActions({ loggingOut: "loggingOut" }),
    //      ...mapActions({ showDataProf: "showDataProf" }),

    /* show selected gs card info */
   
async cardshowpage(page=1){
           
 
           await    axios.get('/api/paginatecard/'+this.$route.params.userid+'?page='+page+'&search='+this.search).then(({data})=>{
            
                   this.gradesheet = data
                   this.currentpage = page

                
                }).catch(({ response })=>{
             //         console.error(response)
                })
           
},
 

  showDataProfFromEDB(){
    // console.log(this.$store.getters.getCurrentUser.email)
            //  this.showDataProf()
    //this.cardinfo(this.formData.profID)

    this.cardinfo(this.$route.params.userid)
  },

    showGS_info(gsID) {
      this.selectedGS_infoShow === gsID ? this.selectedGS_infoShow = null: this.selectedGS_infoShow = gsID

       // console.log('gsID: '+ this.selectedGS_infoShow)
    },

     /*modal function*/
    classicModalHide() {
      this.classicModal = false;
      this.clearForm()
    },

     /*update modal function*/
    updateModalHide() {
      this.updateModal = false;
    },

    /*get subject desc from `subjects` array*/
    getSubjectOptions(searchterm) {
      //  console.log("getSubjects", searchterm);
      this.subjectOptions = new Promise((resolve) => {
        if (!searchterm) {
          resolve(this.subjects.map((x) => x.desc));
        }
        else {
          const term = searchterm.toLowerCase();
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

    /* gradesheet validation methods */
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
        this.formData.subjDesc = ""
        this.formData.subjCode = ""
        this.formData.subjUnit = ""
        this.formData.subjTime = ""
        this.formData.subjDay = ""
        this.formData.subjSem = ""
        this.formData.classProg = ""
        this.formData.classYr = ""
        this.formData.classSec = ""
      },

   

      addGradesheet () {
        this.sending = true

           this.addgsinfo(this.formData)
     
      
        // Instead of this timeout, here you can call your API
        window.setTimeout(() => {
          this.addedGradesheetInfo = `${this.formData.subjCode} ${this.formData.subjDesc}`
          this.sending = false
          this.clearForm()
        }, 1500)

        this.showDataProfFromEDB()
      },
      addValidate () {
        this.$v.$touch()

        if (!this.$v.formData.$invalid) {
          this.addGradesheet()
          //alert ("Gradesheet added successfully!");
          this.gradesheetSaved = true
          this.gradesheetNotSaved = false
       // console.log("Gradesheet saved and added successfully.")
        }
        else {
          //alert ("Gradesheet cannot be added.");
          this.gradesheetNotSaved = true
          this.gradesheetSaved = false
        //  console.log(this.$v)
      // console.log("Failed to add and save gradesheet. Fill out required fields.");
        }
    },
    pageofArchieve(){
      this.$router.push( '/archievetableprof')
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
  line-height: 0.95em !important;
  text-align: justify;
  font-size: .777rem !important;
}

.md-subheader {
  line-height: 0.1em !important;
  min-height: 1.5em !important;
  margin-top: 0.7em !important;
  padding-left: 0.025em !important;
}

.__modal-buttons {
  margin-top: 1em;
}

.md-input{
  text-transform: uppercase !important;
  max-width: 100%;
}

.md-autocomplete {
  max-width: 100%;
}

.md-card {
  margin: 1em 0;
}

.md-with-hover {
  cursor: context-menu !important;
}

.__buttons {
  margin: 0.85em 0 0.97em 0 !important;
}

.__paginate {
  margin: 0.85em 0 1.2em 0 !important;
}

img {
  border: 0.25em solid #fff !important;
}

.__info {
    margin-bottom: 0 !important;
    color: #494848 !important;
}

._tip {
    color: #37c6de !important;
    font-size: 1.35em !important;
}

._subjdesc {
  font-size: 1.2em !important;
  font-weight: 500 !important;
}

._subjcode {
  margin: 0.85em 0 0 0 !important;
  font-size: 1.2em !important;
  font-weight: 600 !important;
}

._subjinfo {
  font-weight: 400 !important;
}
</style>
