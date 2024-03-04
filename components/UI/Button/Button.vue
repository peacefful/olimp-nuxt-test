<template>
  <button :class="['button', `button_${color}`]">
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  color: String
})
</script>

<style>
@import url("./style.module.scss");
</style>
