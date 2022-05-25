<template>
<div class="wrapper">
    <parallax
      class="section page-header header-filter"
      :style="headerStyle"
    ></parallax>
    <div class="main main-raised">
      <div class="section profile-content">
        <div class="container">
            
            <div class="md-layout md-gutter md-alignment-center-center">

                <div class="__name md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center">
                    <h3 class="title">{{ admName }}</h3>
                </div>

                <div class="__desc md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center">
                    <h5>MIS Manager</h5>
                </div>

                <div class="__desc md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center">
                    <md-button
                    class="md-simple md-dense md-esc-darkgrey"
                    @click="updateModal = true">
                        UPDATE ACCOUNT
                    </md-button>
                </div>
            </div>

            <div class="__tabs md-layout">

                <nav-tabs-card no-label tabs-plain>
                <template slot="content">
                    <md-tabs
                    md-sync-route
                    class="md-darkgrey" md-alignment="centered">

                        <md-tab id="tab-overview" md-label="Overview"
                        to="/overview" exact>
                        
                        </md-tab>

                        <md-tab id="tab-manage-account" md-label="Manage Account">
                        <p>
                            I will be the leader of a company that ends up being worth
                            billions of dollars, because I got the answers. I understand
                            culture. I am the nucleus. I think that’s a responsibility
                            that I have, to push possibilities, to show people, this is
                            the level that things could be at. I think that’s a
                            responsibility that I have, to push possibilities, to show
                            people, this is the level that things could be at.
                        </p>
                        </md-tab>

                        <md-tab id="tab-audit-trail" md-label="Audit Trail">
                        <p>
                            I think that’s a responsibility that I have, to push
                            possibilities, to show people, this is the level that things
                            could be at. I will be the leader of a company that ends up
                            being worth billions of dollars, because I got the answers.
                            I understand culture. I am the nucleus. I think that’s a
                            responsibility that I have, to push possibilities, to show
                            people, this is the level that things could be at.
                        </p>
                        </md-tab>
                    </md-tabs>
                </template>
            </nav-tabs-card>
            
                <router-view/>

                <!-- <div class="md-layout-item md-size-100">

                    <md-tabs
                    md-sync-route
                    class="__tabs">

                        <md-tab
                        id="tab-overview"
                        md-label="Overview"
                        to = ""
                        exact>hfghghf</md-tab>

                        <md-tab 
                        id="tab-manage-account"
                        md-label="Manage Account"
                        to = "">ghf</md-tab>

                    </md-tabs>
                </div> -->


                <!-- <tabs
                    :tab-name="['Overview', 'Manage Accounts', 'Audit Trail']"
                    :tab-icon="['dashboard', 'schedule', 'list']"
                    plain
                    nav-pills-icons
                    color-button="success">

                     here you can add your content for tab-content

                    <template slot="tab-pane-1">
                        
                    </template>

                    <template slot="tab-pane-2">
                    
                    </template>
                </tabs> -->

            </div>
                

            <updateModal v-if="updateModal" @close="updateModalHide"/>
        </div>
      </div>
    </div>
    <vue-headful title="Dashboard | MANAGER"/>
 

    <div>
    
      <div>
              <admin-acc/>
      </div>

       <div>
              <admin-new-user/>
      </div>
    

       
    </div>

    
   

</template>

<script>
import { NavTabsCard } from "@/components";

// modal import
import updateModal from '../Manager/AccountManager.vue'

import adminAcc from './adminAccount.vue'
import adminNewUser from './adminAddNewUser.vue'

export default {
  bodyClass: "profile-page",
  components: {
    updateModal, 
    NavTabsCard,
    adminAcc,adminNewUser
   },
  data() {
    return {
        /*modal default value on load*/
      updateModal: false,

       /* ADMIN INFO */
       admName: "JUAN DELA CRUZ",
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

  methods: {
    /*modal function*/
    updateModalHide() {
      this.updateModal = false;
    },
  }
};
</script>

<style lang="scss" scoped>
.section {
  padding: 0;
}

.__name h3 {
    margin-bottom: 0 !important;
}

.__tabs {
    margin: 1.75em 1em 1.5em 1em !important;
}


</style>
