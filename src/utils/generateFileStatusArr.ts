import { AddTypeFile } from '../types/AddTypeFile'
import { StatusType } from '../types/StatusType'

export const generateFileStatusArr = (
  arr: AddTypeFile[],
  id: string,
  status: StatusType,
  err: string | null
): AddTypeFile[] => {
  return arr.map(el =>
    el.id === id
      ? {
          ...el,
          status,
          errorMessage: err,
        }
      : el
  )
}
