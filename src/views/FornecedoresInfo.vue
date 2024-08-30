<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      novoFornecedor: {
        nome: '',
        produto: '',
        quantidade: 0,
        valorUnit: 0,
        valorTotal: 0
      }
    }
  },
  computed: {
    ...mapGetters(['todosFornecedores'])
  },
  methods: {
    ...mapActions(['registrarFornecedor']),
    adicionarFornecedor() {
      this.novoFornecedor.valorTotal = this.novoFornecedor.quantidade * this.novoFornecedor.valorUnit
      alert('Fornecedor registrado com sucesso!')
      this.registrarFornecedor(this.novoFornecedor)
      this.novoFornecedor = {
        nome: '',
        produto: '',
        quantidade: 0,
        valorUnit: 0,
        valorTotal: 0
      }
    }
  }
}

</script>

<template>
  <div>
    <h1 id="Titulo">Fornecedores</h1>
    <form @submit.prevent="adicionarFornecedor">
      <label for="forneNome">Nome do Fornecedor:</label>
      <input id="forneNome" v-model="novoFornecedor.nome" required />
      <label for="forneProduto">Produto Fornecido:</label>
      <input id="forneProduto" v-model="novoFornecedor.produto" required />
      <label for="forneQuantidade">Quantidade dos produtos fornecidos:</label>
      <input type="number" id="forneQuantidade" v-model="novoFornecedor.quantidade" required />
      <label for="forneValor">Valor unitário:</label>
      <input id="forneValor" v-model="novoFornecedor.valorUnit" type="number" required />
      <button type="submit">Adicionar Fornecedor</button>
    </form>
    <ul id="ListaFornecedor">
      <li v-for="fornecedor in todosFornecedores" :key="fornecedor.id">
        <p>Fornecedor: {{ fornecedor.nome }}</p>
        <p>Produto: {{ fornecedor.produto }}</p>
        <p>Quantidade: {{ fornecedor.quantidade }}</p>
        <p>Valor Total: R${{ fornecedor.valorTotal }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
#ListaFornecedor {


}
</style>
