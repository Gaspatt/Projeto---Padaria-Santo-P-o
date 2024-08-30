<template>
  <div>
    <h1>Registro de Vendas - Padaria Santo Pão</h1>
    <form @submit.prevent="registrarVenda">
      <div>
        <label for="NomeCliente">Nome do Cliente:</label>
        <input id="NomeCliente" v-model="NomeCliente" type="text" required />
      </div>
      <div>
        <label for="dataHora">Data e Hora:</label>
        <input id="dataHora" v-model="dataHora" type="datetime-local" required />
      </div>
      <div v-for="(product, index) in produtos" :key="index">
        <label for="productName">Produto:</label>
        <input id="productName" v-model="product.name" type="text" required />
        <label for="quantity">Quantidade:</label>
        <input id="quantity" v-model="product.quantity" type="number" min="1" required />
        <label for="unitPrice">Valor Unitário:</label>
        <input id="unitPrice" v-model="product.unitPrice" type="number" min="0" required />
        <p>Total: {{ product.totalPrice }}</p>
      </div>
      <button type="button" @click="addProduct">Adicionar Produto</button>
      <div>
        <label for="desconto">Desconto:</label>
        <input id="desconto" v-model="desconto" type="number" min="0" />
      </div>
      <div>
        <label for="observacoes">Observações:</label>
        <textarea id="observacoes" v-model="observacoes"></textarea>
      </div>
      <div>
        <p>Valor Total: {{ quantidadeTotal }}</p>
      </div>
      <button type="submit">Registrar Venda</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const NomeCliente = ref('');
const produtos = ref([{ name: '', quantity: 1, unitPrice: 0, totalPrice: 0 }]);
const desconto = ref(0);
const quantidadeTotal = ref(0);
const dataHora = ref(new Date().toISOString().slice(0, 16));
const observacoes = ref('');

const addProduct = () => {
  produtos.value.push({ name: '', quantity: 1, unitPrice: 0, totalPrice: 0 });
};

const calculateTotal = () => {
  quantidadeTotal.value = produtos.value.reduce((sum, product) => {
    product.totalPrice = product.quantity * product.unitPrice;
    return sum + product.totalPrice;
  }, 0) - desconto.value;
};

const registrarVenda = () => {
  calculateTotal();
  const venda = {
    NomeCliente: NomeCliente.value,
    produtos: produtos.value,
    desconto: desconto.value,
    quantidadeTotal: quantidadeTotal.value,
    dataHora: dataHora.value,
    observacoes: observacoes.value,
  };
  store.dispatch('registrarVenda', venda);
  // Limpar os campos do formulário após o registro
  NomeCliente.value = '';
  produtos.value = [{ name: '', quantity: 1, unitPrice: 0, totalPrice: 0 }];
  desconto.value = 0;
  quantidadeTotal.value = 0;
  dataHora.value = new Date().toISOString().slice(0, 16);
  observacoes.value = '';
};
</script>

<style scoped>
/* Adicione estilos conforme necessário */
</style>