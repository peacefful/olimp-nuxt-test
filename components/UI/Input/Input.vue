<template>
  <input class="input" v-model="value" :type="type" />
</template>

<script setup>
const inputProps = defineProps({
  value: String,
  type: {
    type: String,
    default: 'text'
  }
})

const inputEmits = defineEmits(['update:value'])

const value = computed({
  get() {
    return inputProps.value
  },
  set(value) {
    inputEmits('update:value', value)
  }
})
</script>

<style>
@import url("./style.module.scss");
</style>
