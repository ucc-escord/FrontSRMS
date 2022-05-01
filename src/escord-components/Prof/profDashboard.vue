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

                <div class="name">
                  <h3 class="title">{{profLN}}, {{profFN}} {{profMN}}</h3>
                  <h5>{{profRank}}</h5>
                </div>
              </div>
            </div>
          </div>
          <div class="md-layout md-gutter md-alignment-center">
            <h2 class="md-display-1 md-layout-item">GRADESHEETS</h2>
          </div>

          <div class="buttons">
            <md-button class="md-primary md-wd md-round" @click="classicModal = true">
                    <md-icon class="">add</md-icon>
                 Add Gradesheet</md-button>

                <modal v-if="classicModal" @close="classicModalHide">
                    <template slot="header">
                        <h3 class="title">Modal Header</h3>
                    </template>
                </modal>
          </div>

          <div class="profile-content">
            <div class="cards md-layout md-alignment-center">
              
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "@/components";

export default {
  bodyClass: "profile-page",

  components: {
      Modal
  },

  data() {
    return {
    classicModal: false,

      profLN: "CRUZ",
      profFN: "JOHN",
      profMN: "GONZALES",
      profRank: "Master Teacher III"
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/bg-545454.jpg")
    },
    img: {
      type: String,
      default: require("@/assets/img/escord-team-pictures/prof.png")
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  },

  methods: {
    classicModalHide() {
      this.classicModal = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.section {
  padding: 0;
}
</style>
