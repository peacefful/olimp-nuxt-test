<template>
  <input v-model="value" :type="type" />
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

<style scoped lang="scss">
input {
  margin-top: 5px;
  box-shadow: 0px 0px 4px 0px #00000026 inset;
  border-radius: 4px;
}
</style>
