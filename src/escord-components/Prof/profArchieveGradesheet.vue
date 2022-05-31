<template>
  <div class="wrapper">
    <parallax
      class="section page-header header-filter"
      :style="headerStyle"
    ></parallax>
    <div class="main main-raised">
      <div class="section profile-content">
        <div class="container">
          
          <div class="__contentWrapper">
            <div class="md-layout md-gutter md-alignment-center-space-between">

              <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center">
                  <p class="title text-center md-display-1 text-esc-darkgrey">Gradesheet Archive</p>
              </div>

              <div class="md-layout-item md-size-33
              md-xsmall-size-100 md-layout md-gutter md-alignment-center-center">
                  <pagination 
                  type = "esc-accent"
                  no-arrows :page-count="getarchgradesh.last_page" :value="getarchgradesh.current_page"  :total="getarchgradesh.total" @input="gradeshowarchieve" >
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
                      <md-button class="md-just-icon md-round md-esc-accent md-raised">
                          <md-icon>search</md-icon>
                      </md-button>
                  </div>
              </div>
            </div>

            <md-table v-model="getarchgradesh.data" md-sort="name" md-sort-order="asc" >

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
            </md-table>
          </div>

        
        </div>
      </div>
    </div>
    <vue-headful title="Gradesheet Archive List "/>
  </div>
</template>

<script>
import axios from 'axios'
import {Pagination} from '@/components'

export default {
  bodyClass: "profile-page",
  name:'ProfessorArchieveTable',
  components:{
    Pagination,
  },
  mounted() {
    this.gradeshowarchieve()
  },
  data() {
    return {
      getarchgradesh:{   
        type:Object,
        default:null
        },
      search: '',
      
    };
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
  methods:{
  async  gradeshowarchieve(page=1) {
     await     axios.get('/api/archievegs/'+this.$route.params.userid+'?page='+page+'&search='+this.search).then(({data})=>{
        this.getarchgradesh = data
          this.currentpageGrade = page

             }).catch((errors)=>{
      
             this.error =  errors.response.data;
             })
     },
    }
};
</script>

<style lang="scss" scoped>
.section {
  padding: 0;
}

.__contentWrapper {
  margin: 1.15em 2.5em 2em 2.5em !important;
}

.md-table {
  margin-top: 2em !important;
}
</style>
