<template>
  <main class="auth">
    <form
      @submit.prevent="useAuth().authorization(userAuth)"
      class="auth__container"
    >
      <Logo />
      <label>
        <p>E-mail</p>
        <UIInputValidation
          name="email" 
          v-model="userAuth.email" 
        />
      </label>
      <label>
        <p>Пароль</p>
        <UIInputValidation
          name="password" 
          type="password" 
          v-model="userAuth.password" 
        />
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

useForm({
  validationSchema: toTypedSchema(
    object({
      email: string([
        minLength(9, 'Почта слишком короткая'),
        emailValidator('Некорректный e-mail')
      ]),
      password: string([minLength(6, 'Пароль слишком короткий')])
    })
  ),
})

const userAuth = reactive({
  email: "",
  password: ""
})
</script>

<style>
@import url("@/assets/styles/auth.scss");
</style>
