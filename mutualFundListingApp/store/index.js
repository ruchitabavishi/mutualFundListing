import Vue from 'vue'
import Vuex from 'vuex'
import Repository from '../services/apiHelper'
const res = 'v3/funds'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    fundsList: [],
    fundDetails : []
  },
  mutations: {
    SET_FUND_LIST(state, data){
        state.fundsList = data
    },
    SET_FUND_DETAIL(state, detailedData){
        state.fundDetails =  detailedData
    }
  },
  actions : {
    getFunds(context){
        Repository.get(`${res}.json`).then(resp => {
            context.commit('SET_FUND_LIST',resp.data)
        })
    },
    getFundDetail(context,fundCode){
        Repository.get(`${res}/${fundCode}.json`).then(resp =>{
            context.commit('SET_FUND_DETAIL', resp.data)
        })
    }
  }  
})