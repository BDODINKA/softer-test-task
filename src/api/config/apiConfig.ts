import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://cloud-api.yandex.net/v1/disk/resources/upload?path=',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})
