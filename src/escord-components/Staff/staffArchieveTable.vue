<template>
    <div class="md-layout md-gutter md-alignment-center-center">
      
      <!-- <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-space-between">

        <div class="md-layout-item md-size-85 md-layout md-gutter md-alignment-center-center">
            <md-field
            class="has-esc-darkgrey">
                <label>Search..</label>
                <md-input  v-model="search"></md-input>
            </md-field>
        </div>

        <div class="md-layout-item md-size-15 md-layout md-gutter md-alignment-center-center">
            <md-button @click="scholshowarchieve" class="md-just-icon md-round md-esc-darkgrey md-raised">
                <md-icon class="md-size-4x">search</md-icon>
            </md-button>
        </div>

      </div> -->
      <div class="_refresh md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center">
           <md-button @click="scholshowarchieve" class="md-just-icon md-round md-esc-darkgrey md-raised">
                <md-icon>refresh</md-icon>
            </md-button>
      </div>

      <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center">
          <p class="md-body-2 title text-center __info">
              <md-icon class="_tip">tips_and_updates</md-icon>
                &nbsp;&nbsp;&nbsp; Click the refresh button above to see your current changes!*
          </p>
      </div>

      <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center __paginate">
        <pagination 
        type="esc-accent" no-arrows  
        :page-count="getarchschol.last_page" 
        :value="getarchschol.current_page" 
        :total="getarchschol.total" @input="scholshowarchieve" />
      </div>


   <!-- <md-field>
            <label>SEARCH BAR</label>
            <md-input v-model="search"></md-input>
            <span class="md-helper-text">search your data</span>
            <md-button class="md-esc-accent" @click="scholshowarchieve">
              Search
            </md-button>
          </md-field> -->


        <div class="__table md-layout-item md-size-100">
          <md-table v-model="getarchschol.data" md-sort="name" md-sort-order="asc" >
              
            <!-- <h1 class="md-title text-center">Scholastic</h1> -->
            <md-table-row class="title">
              <md-table-head class="text-center">Actions</md-table-head>
              <md-table-head class="text-center">Scholastic ID</md-table-head>
              <md-table-head class="text-center">Student Number</md-table-head>
              <md-table-head class="text-center">Full Name</md-table-head>
              <md-table-head class="text-center">Course, Year and Section</md-table-head>
            </md-table-row>

            <md-table-row   v-for="(_, index) in getarchschol.data"
            :key="index">

              <md-table-cell class="text-center">
                <md-button @click="unArchieveGS(getarchschol.data[index].srms_id)" class="md-just-icon md-round md-esc-darkgrey md-raised md-simple">
                      <md-icon>unarchive</md-icon>
                        <md-tooltip md-direction="bottom">Unarchive Scholastic Record</md-tooltip>
                  </md-button>
                <!-- <div class="md-layout-item md-size-15 md-layout md-gutter md-alignment-center-center">
                  
                </div> -->
              </md-table-cell>

              <md-table-cell class="text-center">
                {{getarchschol.data[index].srms_id}}
              </md-table-cell>

              <md-table-cell class="text-center">
                {{getarchschol.data[index].student_number}}
              </md-table-cell>

              <md-table-cell class="text-center">
                {{getarchschol.data[index].firstname}} {{getarchschol.data[index].middlename}}  {{getarchschol.data[index].surname}}
              </md-table-cell>

              <md-table-cell class="text-center">
                {{getarchschol.data[index].course}}
                {{getarchschol.data[index].section}} 
              </md-table-cell>
                
            </md-table-row>
          </md-table>
        </div>

<!---scholastic-->


   <!---evaluation-->
   <div v-if="defaultvalbutton ==='scholsss'">
    <div class="md-layout-item md-size-80 md-xsmall-size-100 md-small-size-100 md-layout md-gutter md-alignment-center-space-between">

               

         <div class="md-layout-item md-size-85 md-layout md-gutter md-alignment-center-center">
                    <md-field
                    class="has-esc-darkgrey">
                        <label>Search..</label>
                        <md-input  v-model="search"></md-input>
                    </md-field>
                </div>

                <div class="md-layout-item md-size-15 md-layout md-gutter md-alignment-center-center">
                    <md-button @click="evalformshowarchieve" class="md-just-icon md-round md-esc-darkgrey md-raised">
                        <md-icon class="md-size-4x">search</md-icon>
                    </md-button>
                </div>

           </div>


    <!--  <md-field>
            <label>SEARCH BAR</label>
            <md-input v-model="search"></md-input>
            <span class="md-helper-text">search your data</span>
            <md-button class="md-esc-accent" @click="evalformshowarchieve">
              Search
            </md-button>
          </md-field> -->


 <md-table v-model="getarcheval" md-sort="name" md-sort-order="asc" >

 <!-- <h1 class="md-title text-center">Evaluation</h1> -->
        <md-table-row class="title">
              
                <md-table-head class="text-center">Evaluation ID</md-table-head>
                <md-table-head class="text-center">SRMS ID</md-table-head>
                <md-table-head class="text-center">STATUS</md-table-head>
                
              </md-table-row>

        <md-table-row
               v-for="(_, index) in getarcheval.data"
              :key="index">
            

                <md-table-cell class="text-center">
                      {{getarcheval.data[index].evalform_id}}
                </md-table-cell>

                  <md-table-cell class="text-center">
                      {{getarcheval.data[index].srms_id}}
                </md-table-cell>

                   <md-table-cell class="text-center">
                      {{getarcheval.data[index].status_of_ef}}
                </md-table-cell>

            

  
      </md-table-row>
    <pagination no-arrows  :page-count="getarcheval.last_page" :value="getarcheval.current_page" :total="getarcheval.total" @input="evalformshowarchieve" />

    </md-table>
  </div>
  
   <!---evaluation-->
  
 <vue-headful title="Staff | Archive"/>
  </div>
</template>

<script>


  

import axios from 'axios'
import { mapActions, mapGetters} from "vuex";
import {Pagination} from '@/components'



  export default {
  bodyClass: "profile-page",

    name: 'staffArchieve',
    components:{
  Pagination,

    },
   mounted() {
/*
this.$store.dispatch('evalformshowarchieve');
 this.$store.dispatch('gradeshowarchieve');
this.$store.dispatch('scholshowarchieve'); 
*/
   this.evalformshowarchieve()
   this.scholshowarchieve()


   },
    data: () => ({

      defaultvalbutton: '',
      getarcheval: {   
                      type:Object,
                    default:null},
      getarchschol:{  
                     type:Object,
                    default:null},

                  
                        search:'',
                   

    }),

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

    methods:{
        showevaltable(){
            this.defaultvalbutton = '';
           
        },

        showgradeshtable(){
            this.defaultvalbutton = 'gradesh';
        },
        showscholtable(){
            this.defaultvalbutton = 'schol';
        },

         evalformshowarchieve(page=1) {
        axios.get('/api/archieveevalform?page='+page+'&search='+this.search).then(({data})=>{  
   
        this.getarcheval = data
     

             }).catch((errors)=>{
  
             this.error =  errors.response.data;
   
             })
        },

       

    async scholshowarchieve(page=1) {
       await axios.get('/api/archieveschol?page='+page+'&search='+this.search).then(({data})=>{
        
            this.getarchschol = data
     
            
             }).catch((errors)=>{
    
             this.error =  errors.response.data;
     
             })
     },

      unArchieveGS(index){

       
 axios.put('/api/unarchieveSchol/'+index).then(response => {
        //   this.currentUser = response.data
   
   //   console.log("Archieve Succesfully")
        //    console.log(response.data[0]);

       }).catch(()=>{
         //    console.log("Error in getting the user")
       }) 

       alert("Scholastic record has been unarchived successfully!");
    

    },



    },
  }
</script>

<style lang="scss" scoped>
.section {
  padding: 0;
}

.__table {
    margin-top: 1.5em !important;
}

.__info {
    margin-bottom: 0 !important;
    color: #494848 !important;
}

._tip {
    color: #37c6de !important;
    font-size: 1.35em !important;
}
._refresh {
  margin-bottom: 1em !important;
}
</style>