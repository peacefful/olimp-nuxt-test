<template>
  <header class="header">
    <div class="header__wrapper">
      <div class="header__title">
        <img src="../assets/icons/Vector.svg" alt="" />
        <img src="../assets/icons/Vector-1.svg" class="header__second-icon" alt="" />
        <div>Телефонный справочник</div>
      </div>
      <Button @click="logout" color="silver" style="padding: 1.2% 2.2%"> ВЫХОД </Button>
    </div>
  </header>
  <main class="main">
    <div class="main__content">
      <Button @click="openUserFormModal" style="padding: 1.2% 2.2%"> ДОБАВИТЬ ЗАПИСЬ </Button>
      <Modal
        @on-user-action="usersStore.addUser"
        @close-modal="closeUserFormModal"
        title="Добавить запись"
        button-title="ДОБАВИТЬ"
        v-if="isUserFormModalOpen"
      />
      <form @submit.prevent="" class="main__form">
        <label v-for="u in userFilter" :key="u.id">
          <div class="main__form-filter">
            <strong>{{ u.title }}</strong>
            <img @click="key = u.key" src="../assets/icons/arrows.svg" alt="" />
          </div>
          <Input :type="u.type" v-model:value="u.value" />
        </label>
      </form>
      <div v-if="usersStore.users.length">
        <ul
          class="main__list"
          v-for="(user, index) in searchUser(sortByKey(key), userFilter)"
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
            <div>
              <img @click="selectUserById(user.id)" src="../assets/icons/edit.svg" alt="" />
              <img
                @click="usersStore.deleteUser(user.id, index)"
                src="../assets/icons/delete.svg"
                alt=""
              />
            </div>
          </div>
        </ul>
      </div>
      <div v-else style="margin-top: 2%; display: flex; justify-content: center">
        <Spinner />
      </div>
      <Modal
        @close-modal="unSelectUserById"
        @on-user-action="usersStore.editUser"
        :user-id="userId"
        v-if="isEditUserModalOpen"
        title="Редактировать пользователя"
        button-title="СОХРАНИТЬ"
      />
      <span v-if="usersStore.successMessage === 'Пользователь удален'">
        {{ usersStore.successMessage }}
      </span>
      <Pagination />
    </div>
  </main>
</template>

<script setup>
import { reactive } from 'vue'

const token = useCookie('token')

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

const userFilter = reactive([
  { id: 1, title: 'Фамилия', value: '', type: 'text', key: 'f' },
  { id: 2, title: 'Имя', value: '', type: 'text', key: 'i' },
  { id: 3, title: 'Отчество', value: '', type: 'text', key: 'o' },
  { id: 4, title: 'Город', value: '', type: 'text', key: 'city' },
  { id: 5, title: 'Адрес', value: '', type: 'text', key: 'address' },
  { id: 6, title: 'Дата рождения', value: '', type: 'date', key: 'birthday' },
  { id: 7, title: 'Номер телефона', value: '', type: 'text', key: 'phone' }
])

const logout = () => {
  token.value = 0
  navigateTo('/')
}
</script>

<style scoped lang="scss">
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

      .header__second-icon {
        position: relative;
        right: 23px;
        bottom: 4px;
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

        img {
          cursor: pointer;
        }
      }
    }

    .main__list {
      display: flex;
      margin-top: 10px;
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

        img {
          cursor: pointer;
        }

        img:nth-child(2) {
          margin: 0% 16px;
        }
      }
    }

    .even {
      background-color: #ededed;
    }
  }

  Input {
    padding: 10px;
    width: 128px;
    margin-top: 15px;
  }
}
</style>
