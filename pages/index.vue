<template>
  <main class="auth">
    <form
      @submit.prevent="authorizationStore.authorization(email, password)"
      class="auth__conntainer"
    >
      <img src="../assets/icons/blue-book.svg" alt="" />
      <label>
        <p>E-mail</p>
        <Input v-model:value="email" v-bind="emailAttrs" type="text" />
        <div style="color: red">{{ errors.email }}</div>
      </label>
      <label style="margin-top: 8%">
        <p>Пароль</p>
        <Input v-model:value="password" v-bind="passwordAttrs" type="password" />
        <div style="color: red">{{ errors.password }}</div>
      </label>
      <Button style="margin-top: 8%; width: 100%; padding: 5%"> ВОЙТИ </Button>
    </form>
  </main>
</template>

<script setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/valibot'
import { email as emailValidator, string, minLength, object } from 'valibot'

definePageMeta({
  middleware: ['redirect']
})

const authorizationStore = useAuthorizationStore()

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

<style scoped lang="scss">
.auth {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &__conntainer {
    img {
      margin-top: 24px;
    }

    display: flex;
    flex-direction: column;
    padding: 15px 24px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0px 12px 24px 0px #00000026;

    Input {
      height: 40px;
      padding: 0% 5%;
      width: 90%;
    }
  }
}
</style>
