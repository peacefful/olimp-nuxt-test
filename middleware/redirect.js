export default defineNuxtRouteMiddleware((from, to) => {
  const token = useCookie('token').value
  const isNotCurrentParams = token && to.path == '/'
  
  return isNotCurrentParams ? navigateTo('/home') : null
})
