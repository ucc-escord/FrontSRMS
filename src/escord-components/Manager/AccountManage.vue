<template>
  <div>

<div class="md-layout md-gutter md-alignment-center-space-between"></div>
     <!-- <div>
  <md-button class="md-simple md-esc-accent" @click="showstafftable">Staff Account</md-button>
  <md-button  class="md-simple md-esc-accent" @click="showproftable">Prof Account</md-button>
  <md-button  class="md-simple md-esc-accent"  @click="showstudenttable">Student Account</md-button>
  
  </div> -->

  <div class="__addButtons md-layout-item md-size-100 md-layout md-gutter md-alignment-center-space-between">

                <div class="md-layout-item md-size-25 md-xsmall-size-100 md-layout md-gutter md-alignment-center-center">
                    <md-button
                    class="md-round md-raised md-dense md-wd md-esc-accent"
                    @click="showstudenttable">
                        STUDENT
                        <md-tooltip md-direction="bottom">
                            View Registered Students
                        </md-tooltip>
                    </md-button>
                </div>

                <div class="md-layout-item md-size-25 md-xsmall-size-100 md-layout md-gutter md-alignment-center-center">
                    <md-button
                    class="md-round md-raised md-dense md-wd md-esc-accent"
                    @click="showstafftable">
                        STAFF
                        <md-tooltip md-direction="bottom">
                            View Registered Staff
                        </md-tooltip>
                    </md-button>
                </div>

                <div class="md-layout-item md-size-25 md-xsmall-size-100 md-layout md-gutter md-alignment-center-center">
                    <md-button
                    class="md-round md-raised md-dense md-wd md-esc-accent"
                    @click="showproftable">
                        PROFESSOR
                        <md-tooltip md-direction="bottom">
                            View Registered Professors
                        </md-tooltip>
                    </md-button>
                </div>
            </div>

            <!---prof-->
            <div v-if="defaultvalbutton ==='prof'" class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-space-between">
              <div class="md-layout-item md-size-100">
                <h1 class="text-center md-title title">Registered Professors</h1>
              </div>

              <div class="__midSec md-layout-item md-size-100 md-layout md-gutter md-alignment-center-space-between">
                <div class="md-layout-item md-size-33 
                  md-xsmall-size-100 md-layout md-gutter md-alignment-center-center">
                      <pagination 
                      type = "esc-accent"
                      no-arrows :page-count="professor.last_page" :value="professor.current_page" :total="professor.total" @input="profmis" >
                      </pagination>
                  </div>

                  <div class="md-layout-item md-size-66 md-xsmall-size-100 md-layout md-gutter md-alignment-center-space-between">
                    <div class="md-layout-item md-size-85">
                        <md-field
                        class="has-esc-accent">
                            <label>Search..</label>
                            <md-input v-model="search"></md-input>
                        </md-field>
                    </div>

                    <div class="md-layout-item md-size-15 md-layout md-gutter md-alignment-center-center">
                        <md-button  @click="profmis" class="md-just-icon md-round md-esc-accent md-raised">
                            <md-icon>search</md-icon>
                        </md-button>
                    </div>
                </div>
              </div>
    
    <md-table v-model="professor.data" md-sort="name" md-sort-order="asc"
    class="md-layout-item md-size-100">
  
    
        <md-table-row class="title">
                <md-table-head class="text-center">Firstname</md-table-head>
                <md-table-head class="text-center">Lastname</md-table-head>
                <md-table-head class="text-center">Faculty Rank</md-table-head>
                
              </md-table-row>

       <md-table-row v-for="(_, index) in professor.data" :key="index">



                  <md-table-cell class="text-center">
                      {{professor.data[index].firstname}}
                  </md-table-cell>
                   <md-table-cell class="text-center">
                      {{professor.data[index].lastname}}
                  </md-table-cell>
                   <md-table-cell class="text-center">
                      {{professor.data[index].faculty_rank}}
                  </md-table-cell>
    
      </md-table-row>
    </md-table>

  </div>

  <div  v-else-if="defaultvalbutton ==='staff'" class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-space-between">
  <!---staff-->
      <div class="md-layout-item md-size-100">
        <h1 class="text-center md-title title">Registered Staff</h1>
      </div>

      <div class="__midSec md-layout-item md-size-100 md-layout md-gutter md-alignment-center-space-between">
        <div class="md-layout-item md-size-33
            md-xsmall-size-100 md-layout md-gutter md-alignment-center-center">
                <pagination 
                type = "esc-accent"
                no-arrows :page-count="staff.last_page" :value="staff.current_page" :total="staff.total" @input="staffmis" >
                </pagination>
            </div>

            <div class="md-layout-item md-size-66 md-xsmall-size-100 md-layout md-gutter md-alignment-center-space-between">
                <div class="md-layout-item md-size-85">
                    <md-field
                    class="has-esc-accent">
                        <label>Search..</label>
                        <md-input v-model="search"></md-input>
                    </md-field>
                </div>

                <div class="md-layout-item md-size-15 md-layout md-gutter md-alignment-center-center">
                    <md-button  @click="staffmis" class="md-just-icon md-round md-esc-accent md-raised">
                        <md-icon>search</md-icon>
                    </md-button>
                </div>
                
            </div>
      </div>

            

 <md-table v-model="staff.data" md-sort="name" md-sort-order="asc" 
 class="md-layout-item md-size-100">

       <md-table-row class="title">
                <md-table-head class="text-center">Student Number</md-table-head>
                <md-table-head class="text-center">Firstname</md-table-head>
                <md-table-head class="text-center">Lastname</md-table-head>
                
              </md-table-row>

      <md-table-row   v-for="(_, index) in staff.data"
              :key="index">

             

                   <md-table-cell class="text-center">
                      {{staff.data[index].student_number}}
                </md-table-cell>

                    <md-table-cell class="text-center">
                      {{staff.data[index].firstname}}
                </md-table-cell>
                   <md-table-cell class="text-center">
                      {{staff.data[index].lastname}}
                </md-table-cell>
              
      
      </md-table-row>
    </md-table>
  </div>


   <div v-else class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-space-between">

     <div class="md-layout-item md-size-100">
        <h1 class="text-center md-title title">Registered Students</h1>
      </div>

      <div class="__midSec md-layout-item md-size-100 md-layout md-gutter md-alignment-center-space-between">
        <div class="md-layout-item md-size-33
            md-xsmall-size-100 md-layout md-gutter md-alignment-center-center">
                <pagination 
                type = "esc-accent"
                no-arrows :page-count="student.last_page" :value="student.current_page" :total="student.total" @input="studmis" >
                </pagination>
            </div>

            <div class="md-layout-item md-size-66 md-xsmall-size-100 md-layout md-gutter md-alignment-center-space-between">
                <div class="md-layout-item md-size-85">
                    <md-field
                    class="has-esc-accent">
                        <label>Search..</label>
                        <md-input v-model="search"></md-input>
                    </md-field>
                </div>

                <div class="md-layout-item md-size-15 md-layout md-gutter md-alignment-center-center">
                    <md-button @click="studmis" class="md-just-icon md-round md-esc-accent md-raised">
                        <md-icon>search</md-icon>
                    </md-button>
                </div>
                
            </div>
      </div>


     <!---student-->
 <md-table v-model="student.data" md-sort="name" md-sort-order="asc" class="md-layout-item md-size-100">

        <md-table-row class="title">
                <md-table-head class="text-center">Actions</md-table-head>
                <md-table-head class="text-center">Student Number</md-table-head>
                <md-table-head class="text-center">Email</md-table-head>
                
              </md-table-row>

  <md-table-row
               v-for="(_, index) in student.data"
              :key="index">
             <md-table-cell class="text-center">

               <md-button
               :to="{ name: 'DownloadSRMS', params: {student_number: student.data[index].student_number} }"
               class="md-just-icon md-success md-simple">
               <md-icon>visibility</md-icon>
               <md-tooltip md-direction="bottom">View Scholastic Record</md-tooltip>
               </md-button>
                   
              <!-- <router-link :to="{ name: 'DownloadSRMS', params: {student_number: student.data[index].student_number} }">SCHOLASTIC RECORD</router-link> -->

                </md-table-cell>


                   <md-table-cell class="text-center">
                      {{student.data[index].student_number}}
                </md-table-cell>

                    <md-table-cell class="text-center">
                      {{student.data[index].email}}
                </md-table-cell>


  
      </md-table-row>
    </md-table>
  </div>

  </div>
</template>

<script>


  

import axios from 'axios'
import { mapActions, mapGetters} from "vuex";
import {Pagination} from '@/components'



  export default {
    name: 'TableFixed',
     components:{
  Pagination,

  },
   mounted() {

     this.studmis()
     this.staffmis()
     this.profmis()

/* this.$store.dispatch('showstudent');
this.$store.dispatch('showStaff');
this.$store.dispatch('showProf');  */


   },
    data: () => ({

      defaultvalbutton: '',
      search:'',

        student: {
          type:Object,
        default:null
      },

        staff: {
          type:Object,
        default:null
      },

        professor: {
          type:Object,
        default:null
      },
    }),

    computed: {
/*  ...mapGetters({getstudent: 'getstudent'}),
 ...mapGetters({getstaff: 'getstaff'}),
 ...mapGetters({getprofessor: 'getprofessor'}), */


    },

    methods:{
        showstudenttable(){
            this.defaultvalbutton = '';
        },

        showstafftable(){
            this.defaultvalbutton = 'staff';

        },
        showproftable(){
            this.defaultvalbutton = 'prof';
        },

          async studmis(studpage=1){
           
 
           await    axios.get('/api/showuseraccount?page='+studpage+'&search='+this.search).then(({data})=>{
            
                   this.student = data
              //     this.currentpage = page

                
                }).catch(({ response })=>{
                    // console.error(response)
                })

           
            },

                async staffmis(staffpage=1){
           
 
             await    axios.get('/api/showadminaccount?page='+staffpage+'&search='+this.search).then(({data})=>{
            
                   this.staff = data
              //     this.currentpage = page

                
                }).catch(({ response })=>{
                    // console.error(response)
                })

           
            },

              async profmis(staffpage=1){
           
 
             await    axios.get('/api/showprofaccount?page='+staffpage+'&search='+this.search).then(({data})=>{
            
                   this.professor = data
              //     this.currentpage = page

                
                }).catch(({ response })=>{
                    // console.error(response)
                })

           
            },



    },
  }
</script>

<style lang="scss" scoped>
.__addButtons {
    margin: 2em 0 !important;
}

.__midSec {
  margin: 0.85em 0 1.25em 0 !important;
}

</style>