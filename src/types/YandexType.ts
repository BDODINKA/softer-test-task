export type YandexType = {
  status: string
  handler: () => YandexTypeData
}
export type YandexTypeData = {
  access_token: string
  token_type: string
  expires_in: string
  extraData: YandexTypeDataButton
}
export type YandexTypeDataButton = {
  flag: boolean
}
