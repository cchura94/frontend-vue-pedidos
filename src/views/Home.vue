<template>
  <h1>ADMINISTRADOR</h1>
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