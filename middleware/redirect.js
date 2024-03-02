export default defineNuxtRouteMiddleware((from, to) => {
  const token = useCookie('token').value

  if (token && to.path == '/') return navigateTo('/home')
})
