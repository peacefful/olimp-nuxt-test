<template>
  <main class="main">
    <div class="main__content">
      <UIButton @click="openUserFormModal"> ДОБАВИТЬ ЗАПИСЬ </UIButton>
      <UIModal
        @on-user-action="usersStore.addUser"
        @close-modal="closeUserFormModal"
        button-title="ДОБАВИТЬ"
        title="Добавить запись"
        v-if="isUserFormModalOpen"
      />
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
      <div v-if="isNotEmptyUsers">
        <ul
          class="main__list"
          v-for="(user, index) in searchUser(sortByKey(key), userFilters)"
          :key="user.id"
        >
          <div class="main__item" :class="{ 'bg-silver': isEven(index) }">
            <p>{{ user.f }}</p>
            <p>{{ user.i }}</p>
            <p>{{ user.o }}</p>
            <p>{{ user.city }}</p>
            <p>{{ user.address }}</p>
            <p>{{ user.birthday }}</p>
            <p>{{ user.phone }}</p>
            <div class="main__buttons">
              <button :class="{ 'bg-silver': isEven(index) }" @click="selectUserById(user.id)">
                <EditIcon />
              </button>
              <button
                :class="{ 'bg-silver': isEven(index) }"
                @click="usersStore.deleteUser({ id: user.id, index })"
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        </ul>
      </div>
      <div v-else class="main__spinner">
        <UISpinner />
      </div>
      <UIModal
        @close-modal="unSelectUserById"
        @on-user-action="usersStore.editUser"
        :user-id="userId"
        title="Редактировать пользователя"
        button-title="СОХРАНИТЬ"
        v-if="isEditUserModalOpen"
      />
      <div class="success-message" v-if="successMessage === 'Пользователь удален'">
        {{ successMessage }}
      </div>
      <UIPagination />
    </div>
  </main>
</template>

<script setup>

import ArrowsIcon from '@/assets/icons/ArrowsIcon.vue'
import EditIcon from '@/assets/icons/EditIcon.vue'
import DeleteIcon from '@/assets/icons/DeleteIcon.vue'
import { reactive } from 'vue'

definePageMeta({
  layout: "custom"
})

const key = ref(null)
const userId = ref(0)

const usersStore = useUsersStore()
const { sortByKey } = storeToRefs(usersStore)

usersStore.getUsers()

const isNotEmptyUsers = computed(() => usersStore.users.length)
const isEven = (index) => index % 2

const {
  isOpenModal: isUserFormModalOpen,
  openModal: openUserFormModal,
  closeModal: closeUserFormModal
} = useToogleModal()

const {
  isOpenModal: isEditUserModalOpen,
  openModal: openEditUserModal,
  closeModal: closeEditUserModal
} = useToogleModal()

const selectUserById = (id) => {
  userId.value = id
  openEditUserModal()
}

const unSelectUserById = () => {
  usersStore.user = {}
  closeEditUserModal()
}

const userFilters = reactive([
  { id: 1, title: 'Фамилия', value: '', type: 'text', key: 'f' },
  { id: 2, title: 'Имя', value: '', type: 'text', key: 'i' },
  { id: 3, title: 'Отчество', value: '', type: 'text', key: 'o' },
  { id: 4, title: 'Город', value: '', type: 'text', key: 'city' },
  { id: 5, title: 'Адрес', value: '', type: 'text', key: 'address' },
  { id: 6, title: 'Дата рождения', value: '', type: 'date', key: 'birthday' },
  { id: 7, title: 'Номер телефона', value: '', type: 'text', key: 'phone' }
])

</script>

<style>
@import url('@/assets/styles/home.scss');
</style>
