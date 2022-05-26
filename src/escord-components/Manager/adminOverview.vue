<template>
  <div class="">

    <div class="__wrap md-layout md-gutter"> 

       <md-subheader>USERS</md-subheader> 

      <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-space-between">

          <md-card
          class="md-layout-item md-size-30 md-xsmall-size-100"
          v-for="cardInfo in overviewCards" :key="cardInfo.category">

            <md-card-content>
                <div class="md-layout md-gutter md-alignment-center-space-between">

                    <div class="md-layout-item md-size-50 md-small-size-100 md-layout md-gutter md-alignment-center-center">
                        <h3 class="title">{{cardInfo.category}}</h3>
                    </div>

                    <div class="md-layout-item md-size-50 md-small-size-100 md-layout">
                        <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center">
                            <h3 class="__total" v-if="cardInfo.total==0">{{totalStudents}}</h3>

                            <h3 class="__total" v-else>{{cardInfo.total}}</h3>
                        </div>

                        <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center">
                            <p class="md-caption">TOTAL</p>
                        </div>
                    </div>
 
                </div>
            </md-card-content>
          </md-card>
        </div>

        <md-subheader>STUDENTS</md-subheader>

        <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-space-between">

          <md-card
          class="md-layout-item md-size-20 md-xsmall-size-45"
          v-for="studentInfo in studentCards" :key="studentInfo.program">

            <md-card-content>
                <div class="md-layout md-gutter md-alignment-center-space-between">

                    <div class="md-layout-item md-size-50 md-small-size-100 md-layout md-gutter md-alignment-center-center">
                        <h3 class="title">{{studentInfo.program}}</h3>
                    </div>

                    <div class="md-layout-item md-size-50 md-small-size-100 md-layout">
                        <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center">
                            <h3 class="__total">{{studentInfo.total}}</h3>
                        </div>

                        <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center">
                            <p class="md-caption">TOTAL</p>
                        </div>
                    </div>
 
                </div>
            </md-card-content>
          </md-card>
        </div>

    </div>
      
  </div>
</template>

<script>
export default {

    data() {
        return {
            overviewCards: [
                {
                    category: "Student",
                    total: 0
                },
                {
                    category: "Professor",
                    total: 7
                },
                {
                    category: "Staff",
                    total: 7
                }
            ],

            studentCards: [
                {
                    program: "BSCS",
                    total: 7
                },
                {
                    program: "BSIS",
                    total: 7
                },
                {
                    program: "BSIT",
                    total: 7
                },
                {
                    program: "BSEMC",
                    total: 7
                }
            ]
        }
    },

    computed: {
        totalStudents() {
            return this.studentCards.reduce((acc, item) => acc + item.total, 0);
        }
    }

}


</script>

<style>
.__wrap {
    padding: 2em !important;
}

.title {
    margin-bottom: 0 !important;
}

.__total {
    margin: 0.25em 0 !important;
    font-size: 3em;
}
</style>