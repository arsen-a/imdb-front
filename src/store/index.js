import Vue from 'vue'
import Vuex from 'vuex'

import { AuthStoreModule } from './modules/AuthStoreModule'
import { MovieStoreModule } from './modules/MovieStoreModule'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        AuthStoreModule,
        MovieStoreModule
    }
})