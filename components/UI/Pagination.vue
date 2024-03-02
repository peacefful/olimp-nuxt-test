<template>
  <div class="pagination">
    <div class="pagination__list">
      <div class="pagination__items" v-if="pageCount > 5">
        <button @click="backPage" class="pagination__navigate" :disabled="currentPage === 1">
          <LeftArrowIcon />
        </button>
        <ul v-for="pageNumber in visiblePages" :key="pageNumber">
          <button
            @click="selectPage(pageNumber)"
            class="pagination__button"
            :class="{ active: currentPage === pageNumber }"
            :disabled="currentPage === pageNumber"
          >
            {{ pageNumber }}
          </button>
        </ul>
        <button
          @click="nextPage"
          class="pagination__navigate"
          :disabled="currentPage === pageCount"
        >
          <RightArrowIcon />
        </button>
      </div>
      <div class="pagination__items" v-else>
        <ul v-for="pageNumber in pageCount" :key="pageNumber">
          <button
            @click="selectPage(pageNumber)"
            class="pagination__button"
            :class="{ active: currentPage === pageNumber }"
          >
            {{ pageNumber }}
          </button>
        </ul>
      </div>
    </div>
    <div v-if="totalCount" class="pagination__note">
      {{ notes }}
    </div>
  </div>
</template>

<script setup>
import RightArrowIcon from '@/assets/icons/RightArrowIcon.vue'
import LeftArrowIcon from '@/assets/icons/LeftArrowIcon.vue'
import { ref, computed } from 'vue'

const currentPage = ref(1)

const usersStore = useUsersStore()

const totalCount = computed(() => usersStore.pagination.totalCount)
const pageCount = computed(() => usersStore.pagination.pageCount)

const notes = computed(() => {
  const currentNotes = usersStore.users.length
  return `Показаны записи 1-${currentNotes} из ${totalCount.value}`
})

const visiblePages = computed(() => {
  const startPage = Math.max(1, currentPage.value - 2)
  const endPage = Math.min(pageCount.value, startPage + 4)
  const pages = []

  for (let i = endPage - 4; i <= endPage; i++) {
    if (i > 0) {
      pages.push(i)
    }
  }

  return pages
})

const backPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--
    usersStore.getUsers(currentPage)
  }
}

const nextPage = () => {
  if (currentPage.value < pageCount.value) {
    currentPage.value++
    usersStore.getUsers(currentPage.value)
  }
}

const selectPage = (page) => {
  currentPage.value = page
  usersStore.getUsers(currentPage.value)
}
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .pagination__list {
    margin-top: 24px;
    display: flex;
    gap: 5px;

    .pagination__items {
      display: flex;
      gap: 5px;
    }

    .active {
      background-color: #0098da;
      color: white;
    }

    .pagination__button {
      width: 32px;
      height: 32px;
      border: 1px solid #2c2e3526;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &:hover {
        transition: all ease-in 100ms;
        background-color: #01a3e9;
        color: white;
      }

      &:active {
        background-color: #31c1ff;
      }
    }

    .pagination__navigate {
      width: 32px;
      height: 32px;
      border: 1px solid #2c2e3526;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &:hover {
        background-color: #dbdbdb;
      }

      &:active {
        background-color: #e5e5e5;
      }

      &:disabled {
        cursor: default;
        background-color: #dbdbdbc8;
      }
    }
  }

  .pagination__note {
    margin-top: 25px;
    color: #00000080;
  }
}
</style>
