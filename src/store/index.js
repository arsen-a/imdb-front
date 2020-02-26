import Vue from 'vue'
import Vuex from 'vuex'

import { AuthModule } from './modules/AuthModule'
import { MovieModule } from './modules/MovieModule'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        AuthModule,
        MovieModule
    }
})