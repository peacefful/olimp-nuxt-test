<template>
  <header class="header">
    <div class="header__wrapper">
      <div class="header__title">
        <SilverBookIcon />
        <div>Телефонный справочник</div>
      </div>
      <UIButton @click="logout" color="silver"> ВЫХОД </UIButton>
    </div>
  </header>
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
        <label v-for="userFilter in usersFilter" :key="userFilter.id">
          <div class="main__form-filter">
            <strong>{{ userFilter.title }}</strong>
            <button @click.prevent="key = userFilter.key">
              <ArrowsIcon />
            </button>
          </div>
          <UIInput :type="userFilter.type" v-model:value="userFilter.value" />
        </label>
      </form>
      <div v-if="usersStore.users.length">
        <ul
          class="main__list"
          v-for="(user, index) in searchUser(sortByKey(key), usersFilter)"
          :key="user.id"
        >
          <div class="main__item" :class="{ even: index % 2 !== 0 }">
            <p>{{ user.f }}</p>
            <p>{{ user.i }}</p>
            <p>{{ user.o }}</p>
            <p>{{ user.city }}</p>
            <p>{{ user.address }}</p>
            <p>{{ user.birthday }}</p>
            <p>{{ user.phone }}</p>
            <div class="main__buttons">
              <button :class="{ even: index % 2 !== 0 }" @click="selectUserById(user.id)">
                <EditIcon />
              </button>
              <button
                :class="{ even: index % 2 !== 0 }"
                @click="usersStore.deleteUser(user.id, index)"
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
      <span v-if="usersStore.successMessage === 'Пользователь удален'">
        {{ usersStore.successMessage }}
      </span>
      <UIPagination />
    </div>
  </main>
</template>

<script setup>
import SilverBookIcon from '@/assets/icons/SilverBookIcon.vue'
import ArrowsIcon from '@/assets/icons/ArrowsIcon.vue'
import EditIcon from '@/assets/icons/EditIcon.vue'
import DeleteIcon from '@/assets/icons/DeleteIcon.vue'
import { reactive } from 'vue'

const key = ref(null)
const userId = ref(0)

const usersStore = useUsersStore()
const { sortByKey } = storeToRefs(usersStore)

usersStore.getUsers()

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

const usersFilter = reactive([
  { id: 1, title: 'Фамилия', value: '', type: 'text', key: 'f' },
  { id: 2, title: 'Имя', value: '', type: 'text', key: 'i' },
  { id: 3, title: 'Отчество', value: '', type: 'text', key: 'o' },
  { id: 4, title: 'Город', value: '', type: 'text', key: 'city' },
  { id: 5, title: 'Адрес', value: '', type: 'text', key: 'address' },
  { id: 6, title: 'Дата рождения', value: '', type: 'date', key: 'birthday' },
  { id: 7, title: 'Номер телефона', value: '', type: 'text', key: 'phone' }
])

const token = useCookie('token')

const logout = () => {
  token.value = 0
  navigateTo('/')
}
</script>

<style scoped lang="scss">
Button {
  padding: 1.2% 2.2%;
}

header {
  box-shadow: 0px 12px 24px 0px #00000026;

  .header__wrapper {
    max-width: 1200px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    padding: 0.5% 0%;

    .header__title {
      display: flex;
      align-items: center;

      div {
        font-size: 16px;
      }
    }
  }
}

.main {
  max-width: 1200px;
  margin: auto;

  &__content {
    margin-top: 15px;
    padding: 24px 15px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0px 12px 24px 0px #00000026;

    span {
      margin-top: 1%;
      display: block;
      color: red;
    }

    .main__form {
      margin-top: 25px;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;

      .main__form-filter {
        font-size: 14px;
        display: flex;
        justify-content: space-between;
      }
    }

    .main__list {
      display: flex;
      margin-top: 10px;
    }

    .main__buttons {
      padding: 0% 1%;
      display: flex;
      gap: 5px;
    }

    .main__item {
      display: flex;
      width: 100%;
      justify-content: space-between;
      gap: 10px;

      p {
        padding: 1% 0.5%;
        width: 148px;
      }

      div {
        display: flex;

        img:nth-child(2) {
          margin: 0% 16px;
        }
      }
    }

    .even {
      background-color: #ededed;
    }

    .main__spinner {
      margin-top: 2%;
      display: flex;
      justify-content: center;
    }
  }

  Input {
    padding: 10px;
    width: 128px;
    margin-top: 15px;
  }
}
</style>
