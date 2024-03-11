<template>
  <div class="modal">
    <div class="modal__container">
      <div class="modal__container-title">
        <div>{{ title }}</div>
        <button @click="$emit('close-modal')">
          <CloseIcon />
        </button>
      </div>
      <form @submit.prevent="$emit('user-action', { data: userForm, errors, userId })">
        <div class="modal__container-form">
          <label v-for="(userInput, index) in userForm" :key="index" class="modal__container-row">
            <div v-if="userInput.title !== 'Отчество'"><span>*</span>{{ userInput.title }}</div>
            <div v-else>{{ userInput.title }}</div>
            <UIInputValidation
              :name="userInput.name"
              :type="userInput.type"
              v-model="userInput.value"
            />
          </label>
        </div>
        <UIButton type="submit" color="green" class="modal__container-button">
          {{ buttonTitle }}
        </UIButton>
        <div class="success-status">
          {{ successMessage }}
        </div>
        <div class="error-status">
          {{ errorMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import CloseIcon from '@/assets/icons/CloseIcon.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/valibot'
import { string, minLength, object, maxLength } from 'valibot'

const modalProps = defineProps({
  title: String,
  buttonTitle: String,
  userId: Number | null
})

defineEmits(['close-modal', 'user-action'])

const usersStore = useUsersStore()

modalProps.userId && await usersStore.getUser(modalProps.userId)

const { errors } = useForm({
  validationSchema: toTypedSchema(
    object({
      surname: string([
        minLength(2, 'Фамилия слишком короткая'),
        maxLength(20, 'Слишком длинная фамилия')
      ]),
      name: string([minLength(2, 'Имя слишком короткое'), maxLength(15, 'Слишком длинное имя')]),
      middleName: string([minLength(5, 'Отчество слишком короткое')]),
      phone: string([
        minLength(12, 'Некорректный номер телефона'),
        maxLength(13, 'Слишком длинный номер')
      ]),
      city: string([
        minLength(2, 'Название города слишком короткое'),
        maxLength(20, 'Слишком длинное название города')
      ]),
      address: string([minLength(5, 'Некорректный адрес')]),
      birthday: string([minLength(9, 'Дата некорректная')])
    })
  )
})

const userForm = reactive([
  {
    title: 'Фамилия',
    name: 'surname',
    value: isEmptyValue(usersStore.user.f)
  },
  {
    title: 'Имя',
    name: 'name',
    value: isEmptyValue(usersStore.user.i)
  },
  {
    title: 'Отчество',
    name: 'middleName',
    value: isEmptyValue(usersStore.user.o)
  },
  {
    title: 'Город',
    name: 'city',
    value: isEmptyValue(usersStore.user.city)
  },
  {
    title: 'Адрес',
    name: 'address',
    value: isEmptyValue(usersStore.user.address)
  },
  {
    title: 'Дата рождения',
    name: 'birthday',
    type: "Date",
    value: isEmptyValue(usersStore.user.birthday)
  },
  {
    title: 'Номер телефона',
    name: 'phone',
    value: isEmptyValue(usersStore.user.phone)
  }
])
</script>

<style>
@import url('./style.module.scss');
</style>