import { StatusType } from './StatusType'

export type AddTypeFile = {
  id: string
  status: StatusType
  errorMessage: string | null
  file: File
}
