import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCart(state, payload) {
      let oldProduct
      for (let product of state.cartList) {
        if(product.iid === payload.iid) {
          oldProduct = product
        }
      }
      if (oldProduct) {
        oldProduct.count += 1
      } else {
        payload.count = 1
        state.cartList.push(payload)
      }
    }
  },
  actions: {
    addCart({state, getters}, payload) {
      return new Promise(resolve => {
        let oldProduct
        for (let product of state.cartList) {
          if(product.iid === payload.iid) {
            oldProduct = product
          }
        }
        if (oldProduct) {
          oldProduct.count += 1
          resolve('商品数量+1')
        } else {
          payload.count = 1
          state.cartList.push(payload)
          resolve('添加商品到购物车')
        }
      })
    }
  },
  modules: {
  }
})

export default store
