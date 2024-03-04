<template>
  <div class="modal">
    <div class="modal__container">
      <div class="modal__container-title">
        <div>{{ title }}</div>
        <button @click="$emit('closeModal')">
          <CloseIcon />
        </button>
      </div>
      <form
        @submit.prevent="
          $emit('onUserAction', {
            surname,
            name,
            middleName,
            phone,
            city,
            address,
            birthday,
            errors,
            userId
          })
        "
      >
        <div v-if="isEmptyObj(usersStore.user)" class="modal__container-form">
          <label v-for="userInput in userForm" :key="userInput.id">
            <div v-if="userInput.label !== 'Отчество'"><span>*</span> {{ userInput.label }}</div>
            <div v-else>
              {{ userInput.label }}
            </div>
            <div>
              {{ userInput.defaultValue }}
              <UIInput
                v-model:value="userInput.value"
                v-bind="userInput.attrs"
                :type="userInput.type"
              />
            </div>
            <span>{{ errors[userInput.errorName] }}</span>
          </label>
        </div>
        <div v-else class="modal__container-form">
          <label v-for="userInput in userForm" :key="userInput.id">
            <div v-if="userInput.label !== 'Отчество'"><span>*</span> {{ userInput.label }}</div>
            <div v-else>
              {{ userInput.label }}
            </div>
            <div>
              <UIInput
                v-model:value="userInput.value"
                v-bind="userInput.attrs"
                :type="userInput.type"
              />
            </div>
            <span>{{ errors[userInput.errorName] }}</span>
          </label>
        </div>

        <UIButton type="submit" color="green" class="modal__container-button">
          {{ buttonTitle }}
        </UIButton>
        <div class="success-message">
          {{ successMessage }}
        </div>
        <div class="error-message">
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

defineEmits(['closeModal', 'onUserAction'])

const usersStore = useUsersStore()

if (modalProps.userId) await usersStore.getUser(modalProps.userId)

const { errors, defineField } = useForm({
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
  ),
  initialValues: modalProps.userId
    ? {
        surname: usersStore.user.f,
        name: usersStore.user.i,
        middleName: usersStore.user.o,
        phone: usersStore.user.phone,
        city: usersStore.user.city,
        address: usersStore.user.address,
        birthday: usersStore.user.birthday
      }
    : {
        surname: '',
        name: '',
        middleName: '',
        phone: '',
        city: '',
        address: '',
        birthday: ''
      }
})

const [surname, surnameAttrs] = defineField('surname')
const [name, nameAttrs] = defineField('name')
const [middleName, middleNameAttrs] = defineField('middleName')
const [phone, phoneAttrs] = defineField('phone')
const [city, cityAttrs] = defineField('city')
const [address, addressAttrs] = defineField('address')
const [birthday, birthdayAttrs] = defineField('birthday')

const userForm = reactive([
  {
    id: 1,
    label: 'Фамилия',
    value: surname,
    attrs: surnameAttrs,
    type: 'text',
    errorName: 'surname'
  },
  { id: 2, label: 'Имя', value: name, attrs: nameAttrs, type: 'text', errorName: 'name' },
  {
    id: 3,
    label: 'Отчество',
    value: middleName,
    attrs: middleNameAttrs,
    type: 'text',
    errorName: 'middleName'
  },
  { id: 4, label: 'Город', value: city, attrs: cityAttrs, type: 'text', errorName: 'city' },
  {
    id: 5,
    label: 'Адрес',
    value: address,
    attrs: addressAttrs,
    type: 'text',
    errorName: 'address'
  },
  {
    id: 6,
    label: 'Дата рождения',
    value: birthday,
    attrs: birthdayAttrs,
    type: 'date',
    errorName: 'birthday'
  },
  {
    id: 7,
    label: 'Номер телефона',
    value: phone,
    attrs: phoneAttrs,
    type: 'text',
    errorName: 'phone'
  }
])
</script>

<style scoped>
@import url("./style.module.scss");
</style>
