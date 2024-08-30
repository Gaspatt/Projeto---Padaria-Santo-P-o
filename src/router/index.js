import { createRouter, createWebHistory } from 'vue-router';
import VendasForm from '../views/VendasForm.vue';
import FornecedoresInfo from '../views/FornecedoresInfo.vue';
import RelatoriosInfo from '../views/RelatoriosInfo.vue';
import PedidosForm from '../views/PedidosForm.vue';

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