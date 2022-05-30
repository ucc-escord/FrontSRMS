<template>
<div class="wrapper">
    <parallax
    class="section page-header header-filter"
    :style="headerStyle"></parallax>

    <div class="main main-raised" ref="DownloadComp">
        <div class="section profile-content">
            <div class="container">

                <p class="title md-display-1 text-esc-darkgrey text-center">Evaluation Form Detail</p>

                <div class="_wrapDiv mx-auto md-layout md-gutter md-alignment-center-space-between">
            
                <md-subheader><strong>STUDENT INFO</strong></md-subheader>

                    <!-- FIRST ROW -->
                    <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center">
                        <!-- STUDENT NUMBER -->
                        <div class="md-layout-item md-size-25 md-layout md-gutter md-alignment-center-center">
                            <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center">
                                <md-field
                                :class="getValidationClass('studNum')"
                                class="has-esc-accent md-layout-item">
                                    <label>Student Number</label>
                                    <md-input
                                    :disabled = "sending"
                                    v-model="studNum"></md-input>

                                    <span class="md-error" v-if="!$v.studNum.required">Required.</span>
                                </md-field>
                            </div>
                        </div>
                        <!-- STUDENT NAME -->
                        <div class="md-layout-item md-size-75 md-layout md-gutter md-alignment-center-left">
                             <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-space-between">
                                 <md-field
                                :class="getValidationClass('studFN')"
                                class="has-esc-accent md-layout-item md-size-40">
                                    <label>First Name</label>
                                    <md-input
                                    :disabled = "sending"
                                    v-model="studFN"></md-input>

                                    <span class="md-error" v-if="!$v.studFN.required">Required.</span>
                                    <span class="md-error" v-else-if="!$v.studFN.minLength">Invalid.</span>
                                </md-field>

                                <md-field
                                :class="getValidationClass('studMI')"
                                class="has-esc-accent md-layout-item md-size-10">
                                    <label>MI</label>
                                    <md-input
                                    :disabled = "sending"
                                    v-model="studMI"></md-input>
                                </md-field>

                                <md-field
                                :class="getValidationClass('studLN')"
                                class="has-esc-accent md-layout-item md-size-40">
                                    <label>Last Name</label>
                                    <md-input
                                    :disabled = "sending"
                                    v-model="studLN"></md-input>

                                    <span class="md-error" v-if="!$v.studLN.required">Required.</span>
                                    <span class="md-error" v-else-if="!$v.studLN.minLength">Invalid.</span>
                                </md-field>
                             </div>
                        </div>
                    </div>
                    <!-- SECOND ROW -->
                    <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center">
                        <div class="md-layout-item md-size-25 md-layout md-gutter md-alignment-center-center">
                            <div class="md-layout-item md-size-100 md-layout mdgutter md-alignment-center-space-between">
                                <md-field
                                :class="getValidationClass('studYr_Sec')"
                                class="has-esc-accent">
                                    <label>Year and Section</label>
                                    <md-input
                                    :disabled = "sending"
                                    v-model="studYr_Sec"></md-input>

                                    <span class="md-error" v-if="!$v.studYr_Sec.required">Required.</span>
                                    <span class="md-error" v-else-if="!$v.studYr_Sec.maxLength">Invalid.</span>
                                </md-field>
                            </div>
                        </div>
                        <div class="md-layout-item md-size-75 md-layout md-gutter md-alignment-center-left">
                            <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-space-between">
                                <md-field
                                :class="getValidationClass('studProg')"
                                class="has-esc-accent md-layout-item">
                                    <label>Program</label>
                                    <md-input
                                    :disabled = "sending"
                                    v-model="studProg"></md-input>

                                    <span class="md-error" v-if="!$v.studProg.required">Required.</span>
                                </md-field>
                            </div>
                        </div>
                    </div>
                    <!-- THIRD ROW -->
                    <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center">
                        <div class="md-layout-item md-size-25 md-layout md-gutter md-alignment-center-center">
                            <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center">
                                <md-field
                                :class="getValidationClass('semester')"
                                class="has-esc-accent md-layout-item">
                                    <label>Semester</label>
                                    <md-input
                                    type="number"
                                    maxlength="1"
                                    md-counter = "false"
                                    :disabled = "sending"
                                    v-model="semester">{{semSuffix}}</md-input>
                                    <span class="md-helper-text">
                                        Accepts number only.*
                                    </span>

                                    <span class="md-error" v-if="!$v.semester.required">Required.</span>
                                </md-field>
                            </div>
                        </div>
                        <div class="md-layout-item md-size-75 md-layout md-gutter md-alignment-center-center">
                            <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-space-between">
                                <md-field
                                :class="getValidationClass('sy_Start')"
                                class="has-esc-accent md-layout-item md-size-45">
                                    <label>SY (start)</label>
                                    <md-input
                                    type="number"
                                    maxlength="4"
                                    md-counter="false"
                                    :disabled = "sending"
                                    v-model="sy_Start"></md-input>

                                    <span class="md-error" v-if="!$v.sy_Start.required">Required.</span>
                                </md-field>

                                <md-field
                                :class="getValidationClass('sy_End')"
                                class="has-esc-accent md-layout-item md-size-45">
                                    <label>SY (end)</label>
                                    <md-input
                                    type="number"
                                    maxlength="4"
                                    md-counter="false"
                                    :disabled = "sending"
                                    v-model="sy_End"></md-input>

                                    <span class="md-error" v-if="!$v.sy_End.required">Required.</span>
                                </md-field>
                            </div>
                        </div>

                        <md-button 
                        class="md-dense md-round md-success md-simple _save"
                        @click="studEvalDetail_Validate">
                            save
                        </md-button>
                    </div>
                </div>

                <md-divider></md-divider>

                <div class="_wrapDiv _frmBtn mx-auto md-layout md-gutter md-alignment-center-center">
            
                <md-subheader class="md-layout-item md-size-100">
                    <strong>FORM ACTIONS</strong>
                </md-subheader>
                
                    <div class="md-layout-item md-size-60 md-layout md-gutter md-alignment-center-center">
                        <div class="md-layout-item md-size-45 md-xsmall-size-100 md-layout md-gutter md-alignment-center-center">
                            <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center">
                                <md-button
                                class="md-round md-esc-accent md-wd md-dense"
                                @click="addSubjModal = true">
                                    add subject
                                </md-button>
                            </div>
                        </div>
                        <div class="md-layout-item md-size-45 md-xsmall-size-100 md-layout md-gutter md-alignment-center-center">
                            <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center">
                                <md-button
                                class="_archive md-round md-esc-darkgrey md-wd md-dense md-simple">
                                    archive
                                </md-button>
                            </div>
                        </div>
                    </div>
                </div>

                <md-divider></md-divider>

                <div class="_wrapDiv mx-auto md-layout md-gutter md-alignment-center-center">
                    <eval-form class="md-layout-item md-size-100"/>
                </div>

                <!-- ADD SUBJECT MODAL -->
                <add-subj-modal v-if="addSubjModal" @close="addSubjModalHide"/>


            </div>
        </div>    
    </div>
    <vue-headful title="Evaluation Form Detail"/>
</div>
</template>

<script>
// modal import
import addSubjModal from '../Staff/evalAddSubject.vue';

import { mapActions, mapGetters, mapMutations} from "vuex";
import axios from "axios"


//validation imports
import { validationMixin } from 'vuelidate'
import  EvalFormtab from './tab_evaluationForm'
import { required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators'

export default {
  bodyClass: "profile-page",
  name:'Gradesheetpage',
  components: {
      "eval-form":EvalFormtab,
      addSubjModal
  },
  mounted() {

            this.$store.dispatch('getScholasticRecord',this.$route.params.studnum);

       //   this.$store.dispatch('showgsinfo',{ route: this.$route.params.gradeshid });
         // let studentrow = this.$store.getters.getrow;

        //  studentrow.forEach(student => this.studentList = student);
     // console.log(this.studentList)
          
      },
      created(){
        //  this.studentGrade = this.$store.getters.getrow;
      },
  data() {
    return {
      /* TITLE/ STUDENT DATA */
      studNum: "20191172",
      studFN: "TRIZHALYN",
      studMI: "L",
      studLN: "MAGLANGIT",
      studYr_Sec: "3A",
      studProg: "BACHELOR OF SCIENCE IN COMPUTER SCIENCE",

      semester: "2",
      semSuffix: "",
      sy_Start: "2020",
      sy_End: "2021",

       /*modal default value on load*/
      addSubjModal: false,

      evalUpdated: false,
      sending: false,
      studInfo: '',
   
     
    };
  },

  mixins: [validationMixin], // for validation

   /* for validation */
   validations: {
        studNum: {required},
        studFN: {
            required,
            minLength: minLength(3)},
        studLN: {
            required,
            minLength: minLength(3)},
        studYr_Sec: {
            required,
            maxLength: maxLength(2)},
        studProg: {required},

        semester: {required},
        sy_Start: {required},
        sy_End: {required},
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
  ...mapGetters({getScholRecord: 'getScholRecord'}),

    /*    ...mapGetters({getrow : 'getrow'}),
     ...mapGetters({getGS : 'getGS'}), */
  },

  methods: {

      setSuffix() {
          if(this.semester=="1") {
              this.semSuffix = "st"
          }
          else if (this.semester=="2") {
              this.semSuffix = "nd"
          }
      },
      
      addSubjModalHide() {
      this.addSubjModal = false;
    },


    /* validation methods */
    getValidationClass (fieldName) {
      const field = this.$v[fieldName]

      if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      validateEval () {
        this.sending = true

        // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
          this.studInfo = `Evaluation form of : ${this.studLN}, ${this.studFN} ${this.studMI} has been updated successfully!`
          this.evalUpdated = true
          this.sending = false
        }, 1500)  
      },

      studEvalDetail_Validate () {
        this.$v.$touch()
        if (!this.$v.$invalid) {
            this.validateEval()
            console.log("Field can be updated successfully.")
        }
        else {
            console.log("Field can not be updated.");
        }
    },

      archievebtn(){
       
        
      axios.put('api/archievegs/'+ this.$route.params.gradeshid, { 
            status_archieve: '1', }).then((response)=>{
          
       
               //     console.log('archieve successfull');
                  
                //add notification time out here 

       
    
    }).catch((errors)=>{
          
                 //  console.log('error in archeiveing');
    
          
       
                 })  
 
           },
    
    

        

     
  }
};
</script>

<style lang="scss" scoped>
.section {
  padding: 0;
}

._wrapDiv {
    width: 100% !important;
    max-width: 50em !important;
}

.md-icon {
    color: red !important;
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
  text-align: justify;
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

._save, ._archive {
    font-size: 1em !important;
    font-weight: bold !important;
}

._frmBtn {
    margin-bottom: 0.75em !important;
}
</style>
