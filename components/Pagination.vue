<template>
  <div class="pagination">
    <div class="pagination__list">
      <div style="display: flex; gap: 5px" v-if="usersStore.pagination.pageCount > 5">
        <button @click="backPage" class="pagination__navigate" :disabled="currentPage === 1">
          <img src="../assets/icons/left-arrow.svg" alt="" />
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
          :disabled="currentPage === usersStore.pagination.pageCount"
        >
          <img src="../assets/icons/right-arrow.svg" alt="" />
        </button>
      </div>
      <div style="display: flex; gap: 5px" v-else>
        <ul v-for="pageNumber in usersStore.pagination.pageCount" :key="pageNumber">
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
    <div v-if="usersStore.pagination.totalCount" class="pagination__note">
      {{ notes }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const usersStore = useUsersStore()

const notes = computed(() => {
  const totalCount = usersStore.pagination.totalCount
  const currentNotes = usersStore.users.length

  return `Показаны записи 1-${currentNotes} из ${totalCount}`
})

const currentPage = ref(1)

const visiblePages = computed(() => {
  const startPage = Math.max(1, currentPage.value - 2)
  const endPage = Math.min(usersStore.pagination.pageCount, startPage + 4)
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
  if (currentPage.value < usersStore.pagination.pageCount) {
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
        // opacity: 0.5;
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
