<template>
  <div>
    <h1>Fornecedores</h1>
    <form @submit.prevent="adicionarFornecedor">
      <input v-model="novoFornecedor.nome" placeholder="Nome do Fornecedor" required />
      <input v-model="novoFornecedor.produto" placeholder="Produto Fornecido" required />
      <input v-model="novoFornecedor.valor" placeholder="Valor" required />
      <button type="submit">Adicionar Fornecedor</button>
    </form>
    <ul>
      <li v-for="fornecedor in todosFornecedores" :key="fornecedor.id">
        {{ fornecedor.nome }} - {{ fornecedor.produto }} - R${{ fornecedor.valor }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      novoFornecedor: {
        nome: '',
        produto: '',
        valor: 0,
      },
    };
  },
  computed: {
    ...mapGetters(['todosFornecedores']),
  },
  methods: {
    ...mapActions(['registrarFornecedor']),
    adicionarFornecedor() {
      this.registrarFornecedor(this.novoFornecedor);
      this.novoFornecedor = { nome: '', produto: '', valor: 0 };
    },
  },
};
</script>