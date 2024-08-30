<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const fornecedores = ref([{ name: '', products: [], prices: [] }]);

const addFornecedor = () => {
  fornecedores.value.push({ name: '', products: [], prices: [] });
};

const registrarFornecedor = () => {
  fornecedores.value.forEach(fornecedor => {
    store.dispatch('registrarFornecedor', fornecedor);
  });
};
</script>

<template>
  <div>
    <h1>Gerenciamento de Fornecedores</h1>
    <form @submit.prevent="registrarFornecedor">
      <div v-for="(fornecedor, index) in fornecedores" :key="index">
        <label for="fornecedorName">Nome do Fornecedor:</label>
        <input id="fornecedorName" v-model="fornecedor.name" type="text" required />
        <div v-for="(pIndex) in fornecedor.products" :key="pIndex">
          <label for="productName">Produto:</label>
          <input id="productName" v-model="fornecedor.products[pIndex]" type="text" required />
          <label for="productPrice">Preço:</label>
          <input id="productPrice" v-model="fornecedor.prices[pIndex]" type="number" min="0" required />
        </div>
      </div>
      <button type="button" @click="addFornecedor">Adicionar Fornecedor</button>
      <button type="submit">Registrar Fornecedores</button>
    </form>
  </div>
</template>

<style scoped>
/* Adicione estilos conforme necessário */
</style>