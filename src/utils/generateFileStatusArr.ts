import { AddTypeFile } from '../types/AddTypeFile'

export const generateFileStatusArr = (
  arr: AddTypeFile[],
  id: string,
  status: 'idle' | 'success' | 'error',
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
