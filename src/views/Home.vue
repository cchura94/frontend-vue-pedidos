<template>
  <h1>ADMINISTRADOR</h1>
  <div class="card">
    <h3>Bienvenido: {{ $store.state.user.email }}</h3>
  </div>
</template>

<script>
export default {
  mounted() {
        this.$toast.add({severity:'success', summary: 'Success Message', detail:'Order submitted', life: 3000});
    },

}
</script>

<style>

</style>