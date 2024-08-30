<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
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
          return todasVendas.value.map(venda => 
            `Cliente: ${venda.NomeCliente}, Produto: ${venda.produtos.map(p => p.name).join(', ')}, Quantidade: ${venda.produtos.map(p => p.quantity).join(', ')}, Valor Total: R$${venda.quantidadeTotal}`
          ).join('\n');
        case 'estoqueProdutos':
          return 'Estoque de Produtos';
        case 'consumoProdutos':
          return 'Consumo de Produtos';
        case 'clientesContribuintes': {
          const clientesContribuintes = {};
          todasVendas.value.forEach(venda => {
            if (!clientesContribuintes[venda.NomeCliente]) {
              clientesContribuintes[venda.NomeCliente] = 0;
            }
            clientesContribuintes[venda.NomeCliente] += venda.quantidadeTotal;
          });
          const clientesOrdenados = Object.entries(clientesContribuintes)
            .sort((a, b) => b[1] - a[1])
            .map(([cliente, total]) => `${cliente}: R$${total.toFixed(2)}`);
          return clientesOrdenados.join('\n');
        }
        case 'fornecedores':
          return todosFornecedores.value.map(fornecedor => 
            `${fornecedor.nome} - ${fornecedor.produto} - R$${fornecedor.valorTotal}`
          ).join('\n');
        case 'pedidosClientes':
          return todosPedidos.value.map(pedido => 
            `Cliente: ${pedido.nomeCliente}, Data: ${pedido.dataHora}, Itens: ${pedido.itens.map(item => item.nome).join(', ')}, Observações: ${pedido.observacoes}`
          ).join('\n');
        default:
          return '';
      }
    });

    return {
      gerarRelatorio,
      relatorioConteudo,
    };
  },
};
</script>

<template>
   <h1 id="Titulo">Relatórios</h1>
  <div id="Relatoriobtn">
   
    <button @click="gerarRelatorio('produtosVendidos')">Produtos Vendidos</button>
    <button @click="gerarRelatorio('estoqueProdutos')">Estoque de Produtos</button>
    <button @click="gerarRelatorio('consumoProdutos')">Consumo de Produtos</button>
    <button @click="gerarRelatorio('clientesContribuintes')">Clientes Contribuintes</button>
    <button @click="gerarRelatorio('fornecedores')">Fornecedores</button>
    <button @click="gerarRelatorio('pedidosClientes')">Pedidos de Clientes</button>
    <pre>{{ relatorioConteudo }}</pre>
  </div>
</template>

<style scoped>

</style>
