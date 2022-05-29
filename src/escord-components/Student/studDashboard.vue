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
                    <h3 class="title">{{getCurrentUser.firstName}} {{getCurrentUser._MI}} {{getCurrentUser.lastName}}</h3>
                  <h5>{{getCurrentUser.studentNum}}  {{studProg}} | {{studYr}}{{studSec}}</h5>
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
          <!-- <div class="">
            <h2 class="md-display-1">YOUR FILES</h2>
          </div> -->

          <div class="md-layout md-gutter md-alignment-center-space-between">
            <div class="md-layout-item md-size-66">
              <h2 class="md-display-1">YOUR FILES</h2>
            </div>
          </div>

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
                
                <div class="md-layout-item md-medium-size-50 md-small-size-75 md-xsmall-size-100"  @click="showEF_prev">
                  <md-card  class="md-with-hover">
                      <md-card-content>
                        <p class="md-title title text-center">Summary of Grades</p>
                        <p class="text-center">Click to view and download your evaluation form</p>
                      </md-card-content>
                  </md-card>
                </div>

                <!-- PREVIEW -->
                <div v-if="showSR" class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center">
                 
                  <stud-scol/>
                  
                </div>

                <div v-else-if="showEF" class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center">
                  <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center">
                    <md-button @click="printEF">Download</md-button>
                  </div>
                  <stud-eval/>

                  <vue-to-pdf
                  :manual-pagination = "true"
                  :enable-download= "true"
                  ref = "downloadEF_content">
                    <section slot="pdf-content">
                      <stud-eval/>
                    </section>
                  </vue-to-pdf>
                </div>

            </div>
          </div>
        </div>
        
      </div>
      

      <updateModal v-if="updateModal" @close="updateModalHide"/>
    
    </div>
    
    <vue-headful title="Dashboard | STUDENT"/>
  </div>
</template>

<script>
import { mapActions, mapGetters} from "vuex";

import studScol from './studScholastic.vue'
import studEval from './studEvaluation.vue'

// modal import
import updateModal from './AccountStudent.vue'

//import vuehtml2pdf
import VueHtml2pdf from 'vue-html2pdf'


export default {
  bodyClass: "profile-page",
 components: {
    studScol,
    studEval,
    updateModal,

    "vue-to-pdf": VueHtml2pdf
  },
  mounted(){
  this.$store.dispatch('displayuser');

  },
  data() {
    return {
      /*modal default value on load*/
      updateModal: false,

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

    /* DOWNLOAD EF */
    printEF() {
      this.$refs.downloadEF_content.generatePdf()
    },
  }
};
</script>

<style lang="scss" scoped>
.section {
  padding: 0;
}
</style>
