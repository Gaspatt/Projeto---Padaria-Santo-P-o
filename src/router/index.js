import { createRouter, createWebHistory } from 'vue-router';
import VendasForm from '../components/VendasForm.vue';
import FornecedoresInfo from '../components/FornecedoresInfo.vue';
import RelatoriosInfo from '../components/RelatoriosInfo.vue';
import PedidosForm from '../components/PedidosForm.vue';

const routes = [
  { path: '/', component: VendasForm },
  { path: '/fornecedores', component: FornecedoresInfo },
  { path: '/relatorios', component: RelatoriosInfo },
  { path: '/pedidos', component: PedidosForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;