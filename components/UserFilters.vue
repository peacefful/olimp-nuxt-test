<template>
  <form class="main__form">
    <label v-for="(userFilter, index) in usersFiltering.filter" :key="index">
      <div class="main__form-filter">
        <strong>{{ userFilter.title }}</strong>
        <button @click.prevent="$emit('select-key', userFilter.key)">
          <ArrowsIcon />
        </button>
      </div>
      <UIInput
        class="main__form-input"
        :type="userFilter.type" 
        v-model:value="userFilter.value" 
      />
    </label>
  </form>
</template>

<script setup>
import ArrowsIcon from '@/assets/icons/ArrowsIcon.vue'

defineEmits(['select-key'])

const usersFiltering = useUsersFiltering()
</script>