export const useAsset = (path: string) => {
  const config = useAppConfig()
  const base = import.meta.env.BASE_URL || '/me/'
  return `${base}${path}`.replace('//', '/')
}