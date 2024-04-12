export const useFetchApi = (url, options = {}) => {
  const TOKEN = useCookie('token').value
  const BASE_URL = useRuntimeConfig().public.BASE_URL

  return $fetch(url, {
    ...options,
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${TOKEN}` }
  })
}