<template>
  <main class="main">
    <div class="main__content">
      <UIButton @click="openUserFormModal"> ДОБАВИТЬ ЗАПИСЬ </UIButton>
      <UIModal
        @user-action="usersStore.addUser"
        @close-modal="closeUserFormModal"
        button-title="ДОБАВИТЬ"
        title="Добавить запись"
        v-if="isUserFormModalOpen"
      />

      <UserFilters @select-key="selectKey" />
      <div v-if="isNotEmptyUsers">
        <ul
          class="main__list"
          v-for="(user, index) in usersFiltering.searchUser(sortByKey(key))"
          :key="user.id"
        >
          <div class="main__item" :class="isEven(index)">
            <p>{{ user.f }}</p>
            <p>{{ user.i }}</p>
            <p>{{ user.o }}</p>
            <p>{{ user.city }}</p>
            <p>{{ user.address }}</p>
            <p>{{ user.birthday }}</p>
            <p>{{ user.phone }}</p>
            <div class="main__buttons">
              <button :class="isEven(index)" @click="selectUserById(user.id)">
                <EditIcon />
              </button>
              <button :class="isEven(index)" @click="usersStore.deleteUser({ id: user.id, index })">
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
        @user-action="usersStore.editUser"
        :user-id="userId"
        title="Редактировать пользователя"
        button-title="СОХРАНИТЬ"
        v-if="isEditUserModalOpen"
      />
      <div class="success-status" v-if="successMessage === 'Пользователь удален'">
        {{ successMessage }}
      </div>
      <UIPagination />
    </div>
  </main>
</template>

<script setup>
import EditIcon from '@/assets/icons/EditIcon.vue'
import DeleteIcon from '@/assets/icons/DeleteIcon.vue'

definePageMeta({
  layout: 'custom'
})

const key = ref(null)
const userId = ref(0)

const usersStore = useUsersStore()
const usersFiltering = useUsersFiltering()

const { sortByKey } = storeToRefs(usersStore)
const isNotEmptyUsers = computed(() => usersStore.users.length)

usersStore.getUsers()

const selectKey = (prop) => (key.value = prop)
const isEven = (index) => (index % 2 ? 'bg-silver' : '')

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
</script>

<style>
@import url('@/assets/styles/home.scss');
</style>
