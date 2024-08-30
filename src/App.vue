<template>
  <div id="app">
    <nav class="navbar">
      <router-link to="/">Registro de Vendas</router-link>
      <router-link to="/pedidos">Pedidos de Clientes</router-link>
      <router-link to="/fornecedores">Fornecedores</router-link>
      <router-link to="/relatorios">Relatórios</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup>
</script>

<style>
nav {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
</style>