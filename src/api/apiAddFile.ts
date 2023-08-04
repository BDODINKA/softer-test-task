import axios from 'axios'

import { api } from './config/apiConfig'

export const apiAddFile = (path: string, data: File) =>
  api.get(path).then(res => axios.put(res.data.href, data))
