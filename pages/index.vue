<template>
  <main class="auth">
    <form
      @submit.prevent="useAuth().authorization({ email, password })"
      class="auth__container"
    >
      <Logo />
      <label>
        <p>E-mail</p>
        <UIInput v-model:value="email" v-bind="emailAttrs" type="text" />
        <div class="auth__error">{{ errors.email }}</div>
      </label>
      <label>
        <p>Пароль</p>
        <UIInput v-model:value="password" v-bind="passwordAttrs" type="password" />
        <div class="auth__error">{{ errors.password }}</div>
      </label>
      <UIButton> ВОЙТИ </UIButton>
    </form>
  </main>
</template>

<script setup>
import Logo from '@/assets/icons/LogoIcon.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/valibot'
import { email as emailValidator, string, minLength, object } from 'valibot'

definePageMeta({
  middleware: ['redirect']
})

const { errors, defineField } = useForm({
  validationSchema: toTypedSchema(
    object({
      email: string([
        minLength(9, 'Почта слишком короткая'),
        emailValidator('Некорректный e-mail')
      ]),
      password: string([minLength(6, 'Пароль слишком короткий')])
    })
  ),
  initialValues: {
    email: '',
    password: ''
  }
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
</script>

<style>
@import url("@/assets/styles/auth.scss");
</style>
