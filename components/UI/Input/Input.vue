<template>
  <input class="input" :type="type" v-model="value" />
</template>

<script setup>
const inputProps = defineProps({
  type: {
    type: String,
    default: 'text'
  }
})

const value = defineModel('value')
</script>

<style>
@import url('./style.module.scss');
</style>
