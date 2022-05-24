<template>
  <div>


     <div>
  <md-button @click="showstafftable">Staff Account</md-button>
  <md-button @click="showproftable">Prof Account</md-button>
  <md-button @click="showstudenttable">Student Account</md-button>
  
  </div>

<!---prof-->
  <div v-if="defaultvalbutton ==='prof'">
    <md-table v-model="getprofessor" md-sort="name" md-sort-order="asc" >
  
    <h1 class="md-title">Professor</h1>
        <md-table-row class="title">
                <md-table-head class="text-center">Actions</md-table-head>
                <md-table-head class="text-center">Firstname</md-table-head>
                <md-table-head class="text-center">Lastname</md-table-head>
                <md-table-head class="text-center">Faculty Rank</md-table-head>
                
              </md-table-row>

       <md-table-row v-for="(_, index) in getprofessor" :key="index">

              
 <div class="md-layout-item md-xsmall-size-25 md-small-size-50 md-large-size-25">
                    <md-button
                    class="md-esc-darkgrey md-raised md-round md-just-icon">
                        <md-icon>save</md-icon>
                        <md-tooltip md-direction="bottom">save</md-tooltip>
                    </md-button>
                </div>

                  <md-table-cell class="text-center">
                      {{getprofessor[index].firstname}}
                  </md-table-cell>
                   <md-table-cell class="text-center">
                      {{getprofessor[index].lastname}}
                  </md-table-cell>
                   <md-table-cell class="text-center">
                      {{getprofessor[index].faculty_rank}}
                  </md-table-cell>
    
      </md-table-row>
    </md-table>

  </div>

  <div  v-else-if="defaultvalbutton ==='staff'">
  <!---staff-->

 <md-table v-model="getstaff" md-sort="name" md-sort-order="asc" >
    
   <h1 class="md-title">Staff</h1>
       <md-table-row class="title">
                <md-table-head class="text-center">Actions</md-table-head>
                <md-table-head class="text-center">Student Number</md-table-head>
                <md-table-head class="text-center">Firstname</md-table-head>
                <md-table-head class="text-center">Lastname</md-table-head>
                
              </md-table-row>

      <md-table-row   v-for="(_, index) in getstaff"
              :key="index">

                 <div class="md-layout-item md-xsmall-size-25 md-small-size-50 md-large-size-25">
                    <md-button
                    class="md-esc-darkgrey md-raised md-round md-just-icon">
                        <md-icon>save</md-icon>
                        <md-tooltip md-direction="bottom">save</md-tooltip>
                    </md-button>
                </div>

                   <md-table-cell class="text-center">
                      {{getstaff[index].student_number}}
                </md-table-cell>

                    <md-table-cell class="text-center">
                      {{getstaff[index].firstname}}
                </md-table-cell>
                   <md-table-cell class="text-center">
                      {{getstaff[index].lastname}}
                </md-table-cell>
              
      
      </md-table-row>
    </md-table>
  </div>


   <div v-else>

     <!---student-->
 <md-table v-model="getstudent" md-sort="name" md-sort-order="asc" >

 <h1 class="md-title">Student</h1>
        <md-table-row class="title">
                <md-table-head class="text-center">Actions</md-table-head>
                <md-table-head class="text-center">Student Number</md-table-head>
                <md-table-head class="text-center">Email</md-table-head>
                
              </md-table-row>

  <md-table-row
               v-for="(_, index) in getstudent"
              :key="index">

                <div class="md-layout-item md-xsmall-size-25 md-small-size-50 md-large-size-25">
                    <md-button
                    class="md-esc-darkgrey md-raised md-round md-just-icon">
                        <md-icon>save</md-icon>
                        <md-tooltip md-direction="bottom">save</md-tooltip>
                    </md-button>
                </div>

                   <md-table-cell class="text-center">
                      {{getstudent[index].student_number}}
                </md-table-cell>

                    <md-table-cell class="text-center">
                      {{getstudent[index].email}}
                </md-table-cell>


  
      </md-table-row>
    </md-table>
  </div>

  </div>
</template>

<script>


  

import axios from 'axios'
import { mapActions, mapGetters} from "vuex";


  export default {
    name: 'TableFixed',
   mounted() {

this.$store.dispatch('showstudent');
this.$store.dispatch('showStaff');
this.$store.dispatch('showProf'); 


   },
    data: () => ({

      defaultvalbutton: '',
    }),

    computed: {
 ...mapGetters({getstudent: 'getstudent'}),
 ...mapGetters({getstaff: 'getstaff'}),
 ...mapGetters({getprofessor: 'getprofessor'}),


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

    },
  }
</script>