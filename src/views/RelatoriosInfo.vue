<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const relatorioAtual = ref('');

const todasVendas = computed(() => store.getters.todasVendas);
const todosFornecedores = computed(() => store.getters.todosFornecedores);
const todosPedidos = computed(() => store.getters.todosPedidos);

const gerarRelatorio = (tipo) => {
  relatorioAtual.value = tipo;
};

const relatorioConteudo = computed(() => {
  switch (relatorioAtual.value) {
    case 'produtosVendidos':
      return todasVendas.value.map(venda => venda.produtos.map(produto => produto.name).join(', ')).join('\n');
    case 'estoqueProdutos':
      // Lógica para calcular o estoque de produtos
      return 'Estoque de Produtos';
    case 'consumoProdutos':
      // Lógica para calcular o consumo de produtos
      return 'Consumo de Produtos';
    case 'clientesContribuintes': {
      const clientesContribuintes = {};
      todasVendas.value.forEach(venda => {
        if (!clientesContribuintes[venda.nomeCliente]) {
          clientesContribuintes[venda.nomeCliente] = 0;
        }
        clientesContribuintes[venda.nomeCliente] += venda.valorTotal;
      });
      const clientesOrdenados = Object.entries(clientesContribuintes)
        .sort((a, b) => b[1] - a[1])
        .map(([cliente, total]) => `${cliente}: R$${total.toFixed(2)}`);
      return clientesOrdenados.join('\n');
    }
    case 'fornecedores':
      return todosFornecedores.value.map(fornecedor => fornecedor.nome).join('\n');
    case 'pedidosClientes':
      return todosPedidos.value.map(pedido => 
        `Cliente: ${pedido.nomeCliente}, Data: ${pedido.dataHora}, Itens: ${pedido.itens.map(item => item.nome).join(', ')}, Observações: ${pedido.observacoes}`
      ).join('\n');
    default:
      return '';
  }
});
</script>

<template>
  <div>
    <h1>Relatórios</h1>
    <button @click="gerarRelatorio('produtosVendidos')">Produtos Vendidos</button>
    <button @click="gerarRelatorio('estoqueProdutos')">Estoque de Produtos</button>
    <button @click="gerarRelatorio('consumoProdutos')">Consumo de Produtos</button>
    <button @click="gerarRelatorio('clientesContribuintes')">Clientes que Mais Contribuíram</button>
    <button @click="gerarRelatorio('fornecedores')">Fornecedores</button>
    <button @click="gerarRelatorio('pedidosClientes')">Pedidos de Clientes</button>
    <div v-if="relatorioAtual">
      <h2>{{ relatorioAtual }}</h2>
      <p>{{ relatorioConteudo }}</p>
    </div>
  </div>
</template>

<style scoped>
/* Adicione estilos conforme necessário */
</style>