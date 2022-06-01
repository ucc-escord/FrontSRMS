<template>
  <div class="wrapper">
    <parallax
      class="section page-header header-filter"
      :style="headerStyle"
    ></parallax>
   
    <div class="main main-raised">
    

          <div class="profile-content">
            <div class="cards md-layout md-alignment-center">
              
              <div class="md-layout-item md-medium-size-50 md-small-size-75 md-xsmall-size-100" @click="showSR_prev">
                  <md-card class="md-with-hover">
                      <md-card-content>
                        <p class="md-title title text-center">Scholastic Record</p>
                        <p class="text-center">Click to view your scholastic record form</p>
                      </md-card-content>
                  </md-card>
                   
                </div>

                <!-- PREVIEW -->
                <div v-if="showSR" class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center">
                  
                  <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center">
                    <md-button @click="printSR" class="md-raised md-esc-darkgrey md-round md-dense">Download</md-button>
                  </div>

                  <stud-scol/>

                  <vue-to-pdf
                  filename = "ScholasticRecord"
                  pdf-format="letter"
                  :preview-modal = "false"
                  :manual-pagination = "true"
                  :pdf-quality = "2"
                  :enable-download= "true"
                  ref = "downloadSR_content">
                    <section slot="pdf-content">
                      <div class="md-layout md-alignment-center-center">
                        <stud-scol class="md-layout-item md-size-85"/>  
                      </div> 
                    </section>
                  </vue-to-pdf>
                  
                </div>

        
                
             
      </div>
      

          </div>
    
    </div>
    
    <vue-headful title="Manager | Scholastic Record Detail"/>
  </div>
</template>

<script>
import { mapActions, mapGetters} from "vuex";

import studScol from './adminScholastic.vue'
/* import studEval from './studEvaluation.vue'
import studTableEval from './studEvalTable.vue'


// modal import
import updateModal from './AccountStudent.vue' */
import axios from 'axios'
import router from '../../route'

//import vuehtml2pdf
import VueHtml2pdf from 'vue-html2pdf'


export default {
  bodyClass: "profile-page",
 components: {
   
    studScol,
    "vue-to-pdf": VueHtml2pdf
  },
  mounted(){
 // this.$store.dispatch('displayuser');
            this.$store.dispatch('getScholasticRecord',this.$route.params.student_number);

  //this.getsrms_id()
  },
  data() {
    return {
      /*modal default value on load*/
      updateModal: false,
      srms_id:'',
     /*  studLN: "DELA CRUZ",
      studFN: "JUAN",
      studMN: "GONZALES", */

      // studLN: "DELA CRUZ",
      // studFN: "JUAN",
      // studMN: "GONZALES",
      studProg: "Bachelor of Science in Computer Science",
      studYr: "3",
      studSec:"A",

      //showForm
      showSR: false,
      showEF: false
    
    };
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
      ...mapGetters({getCurrentUser: 'getCurrentUser'}),
  ...mapGetters({getScholRecord: 'getScholRecord'}),

  },
  methods: {
    /* show SR */
    showSR_prev () {
      this.showSR = !this.showSR;
      this.showEF = false;
    },

    /* show EF */
    showEF_prev () {
      this.showEF = !this.showEF;
      this.showSR = false;
    },

     /*modal function*/
    updateModalHide() {
      this.updateModal = false;
    },
   getsrms_id(){ 
/*            await axios.get('/api/getsrmsid/'+this.$route.params.student_number).then(({data})=>{
                    this.srms_id = data[0].srms_id

                    //  console.log(this.srms_id)
                }).catch(({ response })=>{
                    //  console.error(response) */
        },

        /* DOWNLOAD EF */
    printEF() {
      this.$refs.downloadEF_content.generatePdf()
    },

    /* DOWNLOAD SR  */
    printSR() {
      this.$refs.downloadSR_content.generatePdf()
    },
           
},
    

    


  
};
</script>

<style lang="scss" scoped>
.section {
  padding: 0;
}
</style>
