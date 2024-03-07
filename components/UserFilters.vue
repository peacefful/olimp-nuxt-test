<template>
  <form class="main__form">
    <label v-for="userFilter in userFilters" :key="userFilter.id">
      <div class="main__form-filter">
        <strong>{{ userFilter.title }}</strong>
        <button @click.prevent="key = userFilter.key">
          <ArrowsIcon />
        </button>
      </div>
      <UIInput :type="userFilter.type" v-model:value="userFilter.value" />
    </label>
  </form>
</template>

<script setup>
defineProps({
  key: String
})

const userFilters = reactive([
  { id: 1, 
    title: 'Фамилия', 
    value: '', 
    type: 'text', 
    key: 'f' 
  },
  { id: 2, 
    title: 'Имя', 
    value: '', 
    type: 'text', 
    key: 'i' 
  },
  { id: 3, 
    title: 'Отчество', 
    value: '', 
    type: 'text', 
    key: 'o' 
  },
  { id: 4, 
    title: 'Город', 
    value: '', 
    type: 'text', 
    key: 'city' 
  },
  { id: 5, 
    title: 'Адрес', 
    value: '', 
    type: 'text', 
    key: 'address' 
  },
  { id: 6, 
    title: 'Дата рождения', 
    value: '', 
    type: 'date', 
    key: 'birthday' 
  },
  { id: 7, 
    title: 'Номер телефона', 
    value: '', 
    type: 'text', 
    key: 'phone' 
  }
])
</script>