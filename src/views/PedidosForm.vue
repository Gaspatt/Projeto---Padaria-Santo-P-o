<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const nomeCliente = ref('')
const dataHora = ref(new Date().toISOString().slice(0, 16))
const itens = ref([{ nome: '', quantidade: 1 }])
const observacoes = ref('')

const addItem = () => {
  itens.value.push({ nome: '', quantidade: 1 })
}

const registrarPedido = () => {
  alert('Pedido registrado com sucesso!')
  const pedido = {
    nomeCliente: nomeCliente.value,
    dataHora: dataHora.value,
    itens: itens.value,
    observacoes: observacoes.value
  }
  store.dispatch('registrarPedido', pedido)
  nomeCliente.value = ''
  itens.value = [{ nome: '', quantidade: 1 }]
  dataHora.value = new Date().toISOString().slice(0, 16)
  observacoes.value = ''
}
</script>

<template>
  <div>
    <h1 id=Titulo>Registro de Pedidos de Clientes</h1>
    <form @submit.prevent="registrarPedido">
      <div>
        <label for="nomeCliente">Nome do Cliente:</label>
        <input id="nomeCliente" v-model="nomeCliente" type="text" required />
      </div>
      <div>
        <label for="dataHora">Data e Hora:</label>
        <input id="dataHora" v-model="dataHora" type="datetime-local" required />
      </div>
      <div v-for="(item, index) in itens" :key="index">
        <label for="itemNome">Item:</label>
        <input id="itemNome" v-model="item.nome" type="text" required />
        <label for="itemQuantidade">Quantidade:</label>
        <input id="itemQuantidade" v-model="item.quantidade" type="number" min="1" required />
      </div>
      <button type="button" @click="addItem">Adicionar Item</button>
      <div>
        <label for="observacoes">Observações:</label>
        <textarea id="observacoes" v-model="observacoes"></textarea>
      </div>
      <button type="submit">Registrar Pedido</button>
    </form>
  </div>
</template>

<style scoped>

</style>
