<template>
  <div>


     <div>
  <md-button @click="showscholtable">Archieve Scholastic</md-button>
  <md-button @click="showgradeshtable">Archieve Gradesheet</md-button>
  <md-button @click="showevaltable">Archieve Evaluation</md-button>
  
  </div>

<!---gradesheet-->
  <div v-if="defaultvalbutton ==='gradesh'">
    <md-table v-model="getarchgradesh.data" md-sort="name" md-sort-order="asc" >
  
    <h1 class="md-title text-center">Gradesheet</h1>
        <md-table-row class="title">
                <md-table-head class="text-center">Actions</md-table-head>
                <md-table-head class="text-center">Gradesheet ID</md-table-head>
                <md-table-head class="text-center">Course</md-table-head>
                <md-table-head class="text-center">Year</md-table-head>
                <md-table-head class="text-center">Section</md-table-head>

                
              </md-table-row>

       <md-table-row v-for="(_, index) in getarchgradesh.data" :key="index">

              
 <md-table-cell class="text-center">
               
              <router-link :to="{ name: 'GradesheetArchieve', params: {archievegs: getarchgradesh.data[index].gradesheetid } }">VIEW</router-link>
                 
            </md-table-cell>


                
                   <md-table-cell class="text-center">
                      {{getarchgradesh.data[index].gradesheetid}}
                </md-table-cell>

                   <md-table-cell class="text-center">
                      {{getarchgradesh.data[index].course_short}}
                </md-table-cell>

                <md-table-cell class="text-center">
                      {{getarchgradesh.data[index].course_year}}
                </md-table-cell>
              <md-table-cell class="text-center">
                      {{getarchgradesh.data[index].course_section}}
                </md-table-cell>
                 
    
      </md-table-row>

    <pagination no-arrows  :page-count="getarchgradesh.last_page" :value="currentpageGrade" :total="getarchgradesh.total" @input="gradeshowarchieve" />

    </md-table>

  </div>

  <!---gradesheet-->


<!---scholastic-->
  <div  v-else-if="defaultvalbutton ==='schol'">
  

 <md-table v-model="getarchschol.data" md-sort="name" md-sort-order="asc" >
    
   <h1 class="md-title text-center">Scholastic</h1>
       <md-table-row class="title">
                <md-table-head class="text-center">Actions</md-table-head>
                <md-table-head class="text-center">Scholastic ID</md-table-head>
                <md-table-head class="text-center">Student Number</md-table-head>
                <md-table-head class="text-center">Fullname</md-table-head>
                <md-table-head class="text-center">Course, Year and Section</md-table-head>
                
              </md-table-row>

      <md-table-row   v-for="(_, index) in getarchschol.data"
              :key="index">

              <md-table-cell class="text-center">
                                <label class="text-center">VIEW</label>
              </md-table-cell>

                  <md-table-cell class="text-center">
                      {{getarchschol.data[index].srms_id}}
                </md-table-cell>

                   <md-table-cell class="text-center">
                      {{getarchschol.data[index].student_number}}
                </md-table-cell>

                <md-table-cell class="text-center">
                      {{getarchschol.data[index].firstname}} ,  {{getarchschol.data[index].surname}} {{getarchschol.data[index].middlename}}
                </md-table-cell>
              <md-table-cell class="text-center">
                      {{getarchschol.data[index].course}}
                      {{getarchschol.data[index].section}} 
                </md-table-cell>
                 

              
      
      </md-table-row>

    <pagination no-arrows  :page-count="getarchschol.last_page" :value="currentpageSchol" :total="getarchschol.total" @input="scholshowarchieve" />

    </md-table>
  </div>

<!---scholastic-->


   <!---evaluation-->
   <div v-else>
 <md-table v-model="getarcheval" md-sort="name" md-sort-order="asc" >

 <h1 class="md-title text-center">Evaluation</h1>
        <md-table-row class="title">
                <md-table-head class="text-center">Actions</md-table-head>
                <md-table-head class="text-center">Evaluation ID</md-table-head>
                <md-table-head class="text-center">SRMS ID</md-table-head>
                <md-table-head class="text-center">STATUS</md-table-head>
                
              </md-table-row>

  <md-table-row
               v-for="(_, index) in getarcheval.data"
              :key="index">
              <md-table-cell class="text-center">
                                <label class="text-center">VIEW</label>
              </md-table-cell>

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
    <pagination no-arrows  :page-count="getarcheval.last_page" :value="currentpageEval" :total="getarcheval.total" @input="evalformshowarchieve" />

    </md-table>
  </div>
   <!---evaluation-->

  </div>
</template>

<script>


  

import axios from 'axios'
import { mapActions, mapGetters} from "vuex";
import {Pagination} from '@/components'



  export default {
    name: 'archieve',
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
   this.gradeshowarchieve()
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
      getarchgradesh:{   
                  type:Object,
                    default:null},

                        currentpageEval: 1,
                        currentpageSchol: 1,
                        currentpageGrade: 1,

    }),

    computed: {
/* ...mapGetters({getarch_eval: 'getarch_eval'}),
 ...mapGetters({getarchschol.data: 'getarch_schol'}),
 ...mapGetters({getarch_gradesh: 'getarch_gradesh'}), 
 */

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
        axios.get('/api/archieveevalform?page='+page).then(({data})=>{  
   
        this.getarcheval = data
        this.currentpageEval = page

             }).catch((errors)=>{
  
             this.error =  errors.response.data;
   
             })
        },

         gradeshowarchieve(page=1) {
        axios.get('/api/archievegs?page='+page).then(({data})=>{
        this.getarchgradesh = data
          this.currentpageGrade = page

             }).catch((errors)=>{
      
             this.error =  errors.response.data;
             })
     },

     scholshowarchieve(page=1) {
        axios.get('/api/archieveschol?page='+page).then(({data})=>{
        
            this.getarchschol = data
          this.currentpageSchol = page
            
             }).catch((errors)=>{
    
             this.error =  errors.response.data;
     
             })
     },



    },
  }
</script>