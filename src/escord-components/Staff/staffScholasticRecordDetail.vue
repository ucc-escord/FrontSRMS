<template>
  <div class="wrapper">
    <parallax
      class="section page-header header-filter"
      :style="headerStyle"
    ></parallax>
    <div class="main main-raised">
      <div class="section profile-content">
        <div class="container">
          
          <!-- TOP SECTION -->
          <div class="__top md-layout md-gutter md-size-100">
           <h4 class="md-display-1">
             <strong>{{classProg}}</strong> | {{classYr}}{{classSec}}
           </h4>
          </div>

          <md-divider></md-divider>

          <!-- MIDDLE SECTION  >> SEARCH BAR & BUTTONS-->
          <div class="__mid">
          </div>

          <!-- BOTTOM SECTION >> TABLE -->
          <div class="__bottom">
            
            <md-table
              v-model="itemList"
              md-sort="studLN"
              md-sort-order="asc"
              @md-selected="onSelect">

              <!-- <md-table-row class="title">
                <md-table-head class="text-center">item Number</md-table-head>
                <md-table-head class="text-center">Last Name</md-table-head>
                <md-table-head class="text-center">First Name</md-table-head>
                <md-table-head class="text-center">MI</md-table-head>
              </md-table-row> -->

              <md-table-row
              slot="md-table-row" slot-scope="{ item }"
              :class="getClass(item)"
              md-selectable="single">

                <md-table-cell md-label="Student Number" class="__id">
                  {{item.studNum}}
                </md-table-cell>

                <md-table-cell
                md-label="Last Name">
                  {{item.studLN}}
                </md-table-cell>

                <md-table-cell
                md-label="First Name">
                  {{item.studFN}}
                </md-table-cell>

                <md-table-cell
                md-label="MI">
                  {{item.studMI}}
                </md-table-cell>

              </md-table-row>

            </md-table>

              <p>Selected Info: {{ selectedInfo }}</p>
            
          </div>

        </div>
      </div>
    </div>
    <vue-headful title="Scholatic Record Detail"/>
  </div>
</template>

<script>

export default {
  bodyClass: "profile-page",
  data() {
    return {
      /* CLASS INFO */
      classProg: "BS Computer Science",
      classYr: "3",
      classSec: "A",

      /* item LIST */
      itemList: [
        {
          studNum: 20190001,
          studLN: "LUCAS",
          studFN: "TRIZHALYN",
          studMI: "L",
          classID: 1
          
        },
        {
          studNum: 20190002,
          studLN: "MAGLANGIT",
          studFN: "TRIZHA",
          studMI: "F",
          classID: 1
          
        },
        {
          studNum: 20190003,
          studLN: "FRANCISCO",
          studFN: "TRIZH",
          studMI: "M",
          classID: 1
          
        }
      ],
      isSelected: false,
      selectedInfo: null
    };
  },
  methods: {
    getClass: ({ classID }) => ({
        'md-esc-darkgrey': classID === 1,
      }),
      onSelect (item) {
        this.selectedInfo = item
      }
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
  }
};
</script>

<style lang="scss" scoped>
.section {
  padding: 0;
}

.__id {
  padding-left: 2.5em !important;
  width: min-content !important;
}
</style>
