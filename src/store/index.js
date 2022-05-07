import Vue from 'vue'
import Vuex from 'vuex'

import currentUser from './modules/currentUser'
import gradeSheet from './modules/gradeSheet'
import ArchieveFile from './modules/ArchieveFile'
import ShowUser from './modules/ShowUser'




Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        currentUser,
        gradeSheet,ArchieveFile,ShowUser
    }
})