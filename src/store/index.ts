// store/index.ts

import * as Vuex from 'vuex'
import { createStore, Module } from 'vuex-smart-module'
import {MapModule} from "./modules/map";




// The 1st argument is root module.
// Vuex store options should be passed to the 2nd argument.
const root = new Module({
  modules: {
    MapModule,
  }
})
// export type State = CategoriesState & BaseState;
export const store = createStore(root);
// Root module
// baseModule,

export type Store = typeof store;
export const {
  state,
  getters,
  mutations,
  actions,
  modules,
  plugins
} = root.getStoreOptions()