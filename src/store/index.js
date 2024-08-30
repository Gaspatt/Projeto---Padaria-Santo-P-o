// store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    vendas: [],
    fornecedores: [],
    pedidos: [],
  },
  mutations: {
    adicionarVenda(state, venda) {
      state.vendas.push(venda);
    },
    adicionarFornecedor(state, fornecedor) {
      state.fornecedores.push(fornecedor);
    },
    adicionarPedido(state, pedido) {
      state.pedidos.push(pedido);
    },
  },
  actions: {
    registrarVenda({ commit }, venda) {
      commit('adicionarVenda', venda);
    },
    registrarFornecedor({ commit }, fornecedor) {
      commit('adicionarFornecedor', fornecedor);
    },
    registrarPedido({ commit }, pedido) {
      commit('adicionarPedido', pedido);
    },
  },
  getters: {
    todasVendas: (state) => state.vendas,
    todosFornecedores: (state) => state.fornecedores,
    todosPedidos: (state) => state.pedidos,
  },
});