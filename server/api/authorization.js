const BASE_URL = useRuntimeConfig().public.BASE_URL

export default defineEventHandler(async (event) => {
  try {
    const authUser = await readBody(event)

    const data = await $fetch(`${BASE_URL}/auth/signin`, {
      method: 'POST',
      body: { ...authUser }
    })

    if (data?.access_token) {
      return { access_token: data.access_token }
    } else {
      return { error: 'Ошибка' }
    }
  } catch (error) {
    console.error(error)
  }
})
