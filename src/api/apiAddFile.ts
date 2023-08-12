import axios from 'axios'

import { api } from './config/apiConfig'

export const apiAddFile = async (path: string, data: File, token: string) => {
  const res = await api.get(path, { headers: { Authorization: `OAuth ${token}` } })

  return await axios.put(res.data.href, data)
}
