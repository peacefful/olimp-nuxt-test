export const useFetchApi = (url, options = {}) => {
  const token = useCookie('token').value
  const BASE_URL = useRuntimeConfig().public.BASE_URL

  return $fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: { Authorization: `Bearer ${token}` }
  })
}