<template>
  <input class="input input_size_s" v-model="value" :type="type || 'text'" />
  <div class="error-status">
    {{ errorMessage }}
  </div>
</template>

<script setup>
import { useField } from 'vee-validate'

const inputProps = defineProps({
  name: String,
  type: String,
  modelValue: String
})

const { value, errorMessage } = useField(() => inputProps.name, undefined, {
  syncVModel: true
})
</script>

<style scoped>
@import url('./style.module.scss');
</style>
