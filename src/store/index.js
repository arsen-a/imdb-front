import Vue from 'vue'
import Vuex from 'vuex'

import { AuthStoreModule } from './modules/AuthStoreModule'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        AuthStoreModule
    }
})