<template>
    <div class="md-layout md-gutter md-alignment-center-space-between">
        <table class="_header">
            <tr>
                <th>FIRST YEAR | SY: {{firstYearSY.startYr}} - {{firstYearSY.endYr}}</th> 
            </tr>
        </table>
        
        <div class="_wraptbl md-layout-item md-size-100 md-layout md-alignment-top-space-between">
            <div class="md-layout-item md-size-50 md-layout md-gutter md-alignment-center-center">
                <table class="_1stSem">
                    <tr class="title text-esc-darkgrey">
                        <th colspan=5>1st Semester</th>
                    </tr>
                    <tr>
                        <th colspan=1 class="text-left">CODE</th>
                        <th colspan=2 class="text-left">DESCRIPTION</th>
                        <th colspan=1>UNITS</th>
                        <th colspan=1>GRADE</th>
                    </tr>
                    <tr v-for="(_firstSem, index) in firstsem" :key="index">
                        <td colspan=1>{{_firstSem.subjectcode}}</td>
                        <td colspan=2>{{_firstSem.subjectdesc}}</td>
                        <td colspan=1 class="text-center">{{_firstSem.units}}</td>
                        <td colspan=1 class="text-center">{{_firstSem.finalgrade}}</td>
                    </tr>

                    <tr class="_total">
                        <th colspan="3" class="text-center">TOTAL</th>
                        <td colspan="1" class="md-body-2 text-center">
                            <strong>
                                {{totalUnits_1st}}
                            </strong>
                        </td>
                        <td colspan="1" class="md-body-2 text-center">
                            <strong>
                                {{gwa_1st()}}
                            </strong>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="md-layout-item md-size-50 md-layout md-gutter md-alignment-center-center">
                <table class="_2ndSem">
                    <tr class="title text-esc-darkgrey">
                        <th colspan=5>2nd Semester</th>
                    </tr>
                    <tr>
                        <th colspan=1 class="text-left">CODE</th>
                        <th colspan=2 class="text-left">DESCRIPTION</th>
                        <th colspan=1>UNITS</th>
                        <th colspan=1>GRADE</th>
                    </tr>
                    <tr v-for="(_secondSem, index) in secondsem" :key="index">
                        <td colspan=1>{{_secondSem.subjectcode}}</td>
                        <td colspan=2>{{_secondSem.subjectdesc}}</td>
                        <td colspan=1 class="text-center">{{_secondSem.units}}</td>
                        <td colspan=1 class="text-center">{{_secondSem.finalgrade}}</td>
                    </tr>
                    <tr class="_total">
                        <th colspan="3" class="text-center">TOTAL</th>
                        <td colspan="1" class="md-body-2 text-center">
                            <strong>
                                {{totalUnits_2nd}}
                            </strong>
                        </td>
                        <td colspan="1" class="md-body-2 text-center">
                            <strong>
                                {{gwa_2nd()}}
                            </strong>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
export default {
    name:'firstTable',

    mounted(){
        this.tablefirstyear()
    },
    data(){
        return{
            semester:'',

            firstYearSY: {
                startYr: '',
                endYr: ''
            },

            firstsem: [                
            ],

            secondsem: [
            ]
        }
    },
    computed: {
        totalUnits_1st() {
            return this.firstsem.reduce((acc, item) =>
            acc + parseInt(item.units) , 0);
        },

        totalUnits_2nd() {
            return this.secondsem.reduce((acc, item) =>
            acc + parseInt(item.units), 0);
        },
    },

    methods:{
    
    gwa_1st() {
        /**if it has PASSED**/
        if(this.firstsem.filter(item => item.finalgrade.toLowerCase() ===  'passed').length > 0) {
            //if it has PASSED && UD
            if(this.firstsem.filter(item => item.finalgrade.toLowerCase() ===  'ud').length > 0) {
                return "UD";
            }
            //if it has PASSED && INC
            else if(this.firstsem.filter(item => item.finalgrade.toLowerCase() ===  'inc').length > 0) {
                return "INC";
            }
            //else; just PASSED
            else {
                return "PASSED";
            }
        }
        /**if it has UD**/
        else if(this.firstsem.filter(item => item.finalgrade.toLowerCase() ===  'ud').length > 0) {
            return "UD";
        }
        /**if it has INC**/
        else if(this.firstsem.filter(item => item.finalgrade.toLowerCase() ===  'inc').length > 0) {
            return "INC";
        }
        /**it it has NO STRING REMARKS**/
        else {
            const divider = this.firstsem.reduce((acc, item) =>
            (acc + parseFloat(item.units)), 0);;

            const gwabyunits = this.firstsem.reduce((acc, item) =>
            (acc + (parseFloat(item.finalgrade) * item.units)), 0);

            const gwa = gwabyunits/ divider;
            return gwa.toFixed(2);
        }

    },

        gwa_2nd() {
        /**if it has PASSED**/
        if(this.secondsem.filter(item => item.finalgrade.toLowerCase() ===  'passed').length > 0) {
            //if it has PASSED && UD
            if(this.secondsem.filter(item => item.finalgrade.toLowerCase() ===  'ud').length > 0) {
                return "UD";
            }
            //if it has PASSED && INC
            else if(this.secondsem.filter(item => item.finalgrade.toLowerCase() ===  'inc').length > 0) {
                return "INC";
            }
            //else; just PASSED
            else {
                return "PASSED";
            }
        }
        /**if it has UD**/
        else if(this.secondsem.filter(item => item.finalgrade.toLowerCase() ===  'ud').length > 0) {
            return "UD";
        }
        /**if it has INC**/
        else if(this.secondsem.filter(item => item.finalgrade.toLowerCase() ===  'inc').length > 0) {
            return "INC";
        }
        /**it it has NO STRING REMARKS**/
        else {
            const divider = this.secondsem.reduce((acc, item) =>
            (acc + parseFloat(item.units)), 0);;

            const gwabyunits = this.secondsem.reduce((acc, item) =>
            (acc + (parseFloat(item.finalgrade) * item.units)), 0);

            const gwa = gwabyunits/ divider;
            return gwa.toFixed(2);
        }

    },

    
    
    async tablefirstyear(){
           
 
           await axios.get('/api/perstudentschol/'+this.$route.params.student_number).then(({data})=>{
              //      console.log(data)
               this.firstsem = data.first;
                 this.secondsem = data.firstSecondSem;

               this.firstYearSY.startYr = data.first[0].sem_startyear
                 this.firstYearSY.endYr = data.first[0].sem_endyear
 
               
                }).catch(({ response })=>{
                   // console.error(response)
                })
           
},

    },

}
</script>

<style lang="scss" scoped>
._header {
    border-collapse: collapse;
    width: 100% !important;
    background-color: #ebe6e6 !important;
}

._total {
    border-top: 0.2em solid #bdbcbc !important;
}

._wraptbl {
    border-bottom: 0.3em solid #bdbcbc !important;
}

._1stSem, ._2ndSem {
    border-collapse: collapse;
    width: 100% !important;
}

._1stSem th, ._2ndSem th {
    font-size: 0.85em !important;
}

._1stSem td, ._2ndSem td {
    font-size: 0.83em !important;
    font-weight: 400 !important;
}
</style>